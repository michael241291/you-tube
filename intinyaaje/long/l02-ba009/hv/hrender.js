// node hrender.js <html> <dur> <outdir> [stills]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
(async()=>{const [html,durS,out,stills]=process.argv.slice(2);const FPS=30,N=Math.round(FPS*parseFloat(durS));fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1920,height:1080}});
 const list=stills?stills.split(',').map(Number):null;const frames=list||[...Array(N).keys()];const K=list?1:4;
 await Promise.all([...Array(K)].map(async(_,w)=>{const p=await ctx.newPage();p.on('pageerror',e=>console.log('PAGEERR',e.message));
  await p.goto('file://'+path.resolve(html));await p.evaluate(()=>window.assetsReady);
  if(w===0&&!list)fs.writeFileSync(path.join(out,'..','scenes.json'),JSON.stringify(await p.evaluate(()=>window.SCENES())));
  for(let j=w;j<frames.length;j+=K){const f=frames[j];const t=list?f:f/FPS;await p.evaluate(t=>window.render(t),t);
   await p.screenshot({path:path.join(out,list?`s_${t}.png`:`f_${String(f).padStart(5,'0')}.png`),omitBackground:true});}}));
 await b.close();console.log('done',frames.length)})();
