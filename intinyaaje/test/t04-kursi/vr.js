// node vr.js <outdir> [stills]  — server di 127.0.0.1:8766
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
(async()=>{const [out,stills]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const K=stills?1:2;let N=0;
 await Promise.all([...Array(K)].map(async(_,w)=>{const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('E',e.message));
  await p.goto('http://127.0.0.1:8766/v.html');await p.waitForFunction(()=>window.ready,null,{timeout:180000});
  const END=await p.evaluate(()=>window.END);N=Math.ceil(END*30);
  const list=stills?stills.split(',').map(Number):[...Array(N).keys()].filter(f=>f%K===w);
  for(const f of list){const t=stills?f:f/30;await p.evaluate(t=>window.render(t),t);await p.screenshot({path:path.join(out,stills?`s_${t}.png`:`f_${String(f).padStart(5,'0')}.png`)})}}));
 await b.close();console.log('done',N)})();
