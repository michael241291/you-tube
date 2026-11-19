const {chromium}=require('/opt/node22/lib/node_modules/playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});await p.goto('file://'+path.resolve(process.argv[2]));await p.evaluate(()=>window.assetsReady);
const S=await p.evaluate(()=>window.SCENES());console.log(S.map(s=>((s.t0+Math.min(s.t1,s.t0+30))/2+ (s.t1-s.t0>8?2:0)).toFixed(1)).join(','));await b.close()})();
