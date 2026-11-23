const {chromium}=require('/opt/node22/lib/node_modules/playwright');const path=require('path');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1080,height:1920}});p.on('console',m=>console.log('C',m.text()));p.on('pageerror',e=>console.log('E',e.message));
await p.goto('http://127.0.0.1:8765/t.html');await p.waitForFunction(()=>window.ready,null,{timeout:120000});
for(const t of [0,1]){const t0=Date.now();await p.evaluate(t=>window.render(t),t);await p.screenshot({path:`r${t}.png`});console.log('frame',t,Date.now()-t0,'ms')}
await b.close()})();
