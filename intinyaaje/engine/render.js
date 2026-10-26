// node render.js <episode_dir> <duration_sec> <frames_out_dir> [t1,t2,... for stills]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{
  const [dir,durS,out,stills]=process.argv.slice(2);
  const FPS=30,N=Math.round(FPS*parseFloat(durS));
  fs.mkdirSync(out,{recursive:true});
  const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:1080,height:1920}});
  const url='file://'+path.resolve(dir,'index.html');
  const list=stills?stills.split(',').map(Number):null;
  const frames=list?list:[...Array(N).keys()];
  const K=list?1:4;
  await Promise.all([...Array(K)].map(async(_,w)=>{
    const p=await ctx.newPage();
    p.on('pageerror',e=>console.log('PAGEERR',e.message));
    await p.goto(url);await p.evaluate(()=>document.fonts.ready);
    await p.evaluate(()=>Promise.all([window.facesReady,window.assetsReady]));
    for(let j=w;j<frames.length;j+=K){
      const f=frames[j];const t=list?f:f/FPS;
      await p.evaluate(t=>window.render(t),t);
      const name=list?`still_${String(t).replace('.','_')}.jpg`:`f_${String(f).padStart(5,'0')}.jpg`;
      await p.screenshot({path:path.join(out,name),type:'jpeg',quality:list?85:92});
    }
  }));
  await b.close();console.log('done',frames.length);
})();
