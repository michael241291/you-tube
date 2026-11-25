// node engine3d/render.js <ep-dir relatif intinyaaje> [stills t1,t2]  (server: python3 -m http.server 8770 di folder intinyaaje)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
(async()=>{const [ep,stills]=process.argv.slice(2);const out=path.join(__dirname,'..',ep,stills?'st':'fr');fs.mkdirSync(out,{recursive:true});
 const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const K=stills?1:2;let N=0,meta=null;
 await Promise.all([...Array(K)].map(async(_,w)=>{const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('pageerror',e=>console.log('E',e.message));p.on('console',m=>{if(m.type()==='error')console.log('C',m.text())});
  await p.goto(`http://127.0.0.1:8770/engine3d/page.html?ep=${ep}`);await p.waitForFunction(()=>window.ready,null,{timeout:240000});
  const END=await p.evaluate(()=>window.END);N=Math.ceil(END*30);if(w==0)meta=await p.evaluate(()=>({END:window.END,CLIPS:window.CLIPS}));
  const list=stills?stills.split(',').map(Number):[...Array(N).keys()].filter(f=>f%K===w&&f>=(+process.env.FROM||0)&&f<=(+process.env.TO||1e9));
  for(const f of list){const t=stills?f:f/30;await p.evaluate(t=>window.render(t),t);await p.screenshot({path:path.join(out,stills?`s_${t}.png`:`f_${String(f).padStart(5,'0')}.png`),omitBackground:true})}}));
 fs.writeFileSync(path.join(__dirname,'..',ep,'meta.json'),JSON.stringify(meta));
 await b.close();console.log('done',N)})();
