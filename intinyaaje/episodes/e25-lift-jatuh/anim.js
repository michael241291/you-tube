// e25 — Lift jatuh, lompat biar selamat?
const L25={};
L25.shaft=(c,off,o={})=>{c.fillStyle=AL.lg(c,0,0,1080,0,[[0,'#3c3f44'],[.5,'#55595f'],[1,'#3a3d42']]);c.fillRect(-600,-1200,2300,4400);
  for(let i=-6;i<12;i++){const y=((i*420+off)%5040+5040)%5040-1400;c.fillStyle='#2b2d31';c.fillRect(-600,y,2300,40);c.fillStyle='rgba(255,255,255,.08)';c.fillRect(-600,y,2300,4);
    if(o.floors){const n=o.floors-Math.floor((off+ (i*420))/420);}}
  for(const x of[230,850]){c.fillStyle=AL.lg(c,x-14,0,x+14,0,[[0,'#7d8288'],[.5,'#dfe3e7'],[1,'#6c7177']]);c.fillRect(x-14,-1200,28,4400)}};
L25.car=(c,x,y,o={})=>{// y = lantai kabin
  const W=560,H=640;c.save();c.translate(x,y);
  c.fillStyle='#1f2226';c.fillRect(-W/2-20,-H-20,W+40,H+40);
  c.fillStyle=AL.lg(c,0,-H,0,0,[[0,'#cfd3d8'],[1,'#8e949b']]);c.fillRect(-W/2,-H,W,H);
  c.fillStyle=AL.rg(c,0,-H+20,10,420,[[0,'rgba(255,250,230,.6)'],[1,'rgba(255,250,230,0)']]);c.fillRect(-W/2,-H,W,H);
  c.fillStyle='#a9aeb4';c.fillRect(-W/2,-14,W,14);c.fillStyle='#2b2e33';c.fillRect(W/2-90,-H*.62,50,90);c.fillStyle='#ff4d5e';c.beginPath();c.arc(W/2-65,-H*.62+60,12,0,6.283);c.fill();
  c.restore()};
L25.cables=(c,x,yTop,yCar,n,cut=0)=>{for(let k=0;k<n;k++){const cx=x-50*(n-1)/2+k*50;c.strokeStyle=k<cut?'rgba(0,0,0,0)':'#c9ccd0';c.lineWidth=10;c.beginPath();c.moveTo(cx,yTop);c.lineTo(cx,yCar);c.stroke();c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=3;c.stroke()}};

ANIM.lift=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='jatuh'){
    const f0=T(6);const fall=t>f0?Math.pow(t-f0,2)*260:0;const hitT=T(19)+0.2;
    const jump=sm(P(t,T(13),T(14)))*(1-sm(P(t,T(16),T(18))));const crouch=sm(P(t,T(12),T(13)))*(1-P(t,T(13),T(13)+0.15));
    const hit=P(t,hitT,hitT+0.15);const [sx,sy]=AL.shake(t,(t>f0&&t<hitT?6:0)+30*hit*(1-P(t,hitT+0.4,hitT+1.2)));
    AL.cam(c,540+sx,860+sy,1);
    const off=Math.min(fall,fall);L25.shaft(c,-off+(t>hitT?0:0));
    // lantai dasar muncul mendekati tumbukan
    const bot=AL.mix(2400,1150,sm(P(t,hitT-1.4,hitT)));c.fillStyle='#1a1b1e';c.fillRect(-600,bot,2300,800);c.fillStyle='#e0b02a';for(let i=0;i<14;i++){c.save();c.translate(-200+i*120,bot);c.fillRect(0,0,60,26);c.restore()}
    const carY=t<hitT?1100:1100+0;L25.cables(c,540,-1200,carY-680,4,t>f0?4:0);
    L25.car(c,540,carY);
    AL.person(c,540,carY-14,330,{crouch,arms:jump*0.6+(t>f0&&t<T(12)?0.9:0),lift:jump*120+(t>f0&&t<T(12)?20:0),face:t>f0?'kaget':''});
    // garis kecepatan
    if(t>f0&&t<hitT){c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=4;for(let i=0;i<14;i++){const x=AL.r(i,1)*1080;const y=((AL.r(i,2)*1920+t*2400)%1920);c.beginPath();c.moveTo(x,y);c.lineTo(x,y+140);c.stroke()}}
    c.setTransform(1,0,0,1,0,0);if(hit>0){c.fillStyle=`rgba(255,255,255,${.6*(1-P(t,hitT,hitT+0.5))})`;c.fillRect(0,0,1080,1920)}
    const q=P(t,T(19),T(19)+0.3)*(1-P(t,T(24),T(24)+0.3));if(q>0){c.globalAlpha=q;AL.text(c,'PASTI SELAMAT?',540,540,{size:48,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const ph=P(t,T(24),T(24)+0.3);if(ph>0){c.globalAlpha=ph;AL.text(c,'KATA FISIKA: NYARIS PERCUMA',540,540,{size:40,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='hitung'){AL.cam(c,540,860,1);
    c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#2a3446'],[1,'#0b0f17']]);c.fillRect(-600,-800,2300,3600);
    // gedung 20 lantai + lift turun
    const k=sm(P(t,T(37),T(46)));for(let i=0;i<20;i++){const y=1100-i*32;c.fillStyle=i%2?'#3b4658':'#465368';c.fillRect(120,y-30,260,30);AL.text(c,String(i+1),95,y-15,{size:18,color:'#9fb0c8'})}
    c.fillStyle='#ffd23f';c.fillRect(220,AL.mix(1100-19*32-30,1070,k),60,30);
    // speedometer angka besar
    const spd=Math.round(AL.mix(0,100,sm(P(t,T(41),T(51)))));c.globalAlpha=1-P(t,T(60),T(60)+0.3);AL.text(c,spd+' km/jam',720,700,{size:80,color:spd>90?'#ff4d5e':'#fff'});AL.text(c,'saat menghantam dasar',720,780,{size:30,color:'#cfd8e3'});c.globalAlpha=1;
    // batang lompatan
    const b=P(t,T(52),T(52)+0.5)*(1-P(t,T(60),T(60)+0.3));if(b>0){c.globalAlpha=b;const y0=960;AL.text(c,'TANPA LOMPAT',720,y0-40,{size:28,color:'#fff'});c.fillStyle='#ff4d5e';c.fillRect(480,y0,480*1,40);
      const j=sm(P(t,T(56),T(59)));AL.text(c,'DENGAN LOMPAT',720,y0+90,{size:28,color:'#fff'});c.fillStyle='#ff8a5c';c.fillRect(480,y0+130,480*AL.mix(1,.85,j),40);if(j>0.5)AL.text(c,'−15%',900,y0+150,{size:40,color:'#3ddc84'});c.globalAlpha=1}
    // melayang
    const fl=P(t,T(60),T(60)+0.4);if(fl>0){c.globalAlpha=fl;AL.person(c,720,1060,240,{arms:1,lift:40+Math.sin(t*3)*20,face:'kaget'});AL.text(c,'MELAYANG, SULIT TEPAT WAKTU',720,1140,{size:32,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='aman'){AL.cam(c,540,860,1);
    const trip=P(t,T(90),T(90)+0.3);const drop=t<T(83)?0:Math.min(1,(t-T(83))/(T(90)-T(83)));const yCar=1100+(trip>0?110:drop*drop*110);
    L25.shaft(c,(t>T(83)&&trip<=0)?-(t-T(83))*900:0);
    // governor di atas
    c.save();c.translate(950,560);const spin=t*(1+ (t>T(83)?8:0)*(trip>0?0:1));c.rotate(spin);c.fillStyle='#7d8288';c.beginPath();c.arc(0,0,70,0,6.283);c.fill();c.strokeStyle='#ddd';c.lineWidth=8;for(let k=0;k<3;k++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(k*2.1)*70,Math.sin(k*2.1)*70);c.stroke()}c.restore();
    const ca=P(t,T(77),T(80));L25.cables(c,540,-200,yCar-680,Math.round(1+5*ca));
    L25.car(c,540,yCar);AL.person(c,540,yCar-14,330,{face:'senang'});c.save();c.translate(950,560);c.rotate(t*(1+(t>T(83)&&trip<=0?8:0)));c.fillStyle='#9aa0a6';c.beginPath();c.arc(0,0,70,0,6.283);c.fill();c.strokeStyle='#333';c.lineWidth=8;for(let k=0;k<3;k++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(k*2.1)*70,Math.sin(k*2.1)*70);c.stroke()}c.restore();
    // rem mencengkeram rel
    if(trip>0){for(const sg of[-1,1]){const x=540+sg*290;c.fillStyle='#ffd23f';c.fillRect(x-30*sg-(sg>0?0:0)-18,yCar-640,36,80);c.save();c.globalCompositeOperation='lighter';for(let i=0;i<12;i++){const a=AL.r(i,1)*6.28,r=40*AL.r(i,2)*(1-P(t,T(90),T(93)));c.fillStyle='rgba(255,200,80,.9)';c.beginPath();c.arc(x+Math.cos(a)*r,yCar-600+Math.sin(a)*r,4,0,6.283);c.fill()}c.restore()}}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(77),T(77)+0.4)*(1-P(t,T(87),T(87)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'BEBERAPA KABEL BAJA',540,1140,{size:40,pill:true});c.globalAlpha=1}
    const g=P(t,T(87),T(87)+0.4)*(1-P(t,T(91),T(91)+0.3));if(g>0){c.globalAlpha=g;AL.text(c,'PENGATUR KECEPATAN (KANAN ATAS)',540,1140,{size:32,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    if(trip>0){c.globalAlpha=trip;AL.text(c,'REM DARURAT MENCENGKERAM REL',540,1140,{size:36,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='otis'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,0,0,1920,[[0,'#d8c49a'],[1,'#8e7a55']]);c.fillRect(-600,-800,2300,3600);
    // menara kayu
    for(const x of[260,820]){c.fillStyle='#6b4a2f';c.fillRect(x-16,300,32,900);for(let i=0;i<14;i++){c.fillStyle='#3e2a1b';c.fillRect(x-16+(x<540?28:-8),340+i*60,8,30)}}
    const cut=P(t,T(114),T(114)+0.2);const dropY=cut>0?Math.min(40,(t-T(114))*400):0;const py=880+dropY;
    if(cut<=0){c.strokeStyle='#8a7350';c.lineWidth=10;c.beginPath();c.moveTo(540,300);c.lineTo(540,py-400);c.stroke()}else{c.strokeStyle='#8a7350';c.lineWidth=10;c.beginPath();c.moveTo(540,300);c.lineTo(540,420-cut*60);c.stroke()}
    c.fillStyle='#5e4632';c.fillRect(260,py,560,30);c.fillStyle='#a0896a';for(let i=0;i<4;i++)c.fillRect(300+i*120,py-60,90,60);
    AL.person(c,600,py,300,{shirt:'#2f2a26',shirt2:'#1b1815',pants:'#1b1815',arms:cut>0?1:0.2,face:'senang'});
    // kapak
    if(t>T(112)){c.save();c.translate(470,AL.mix(300,430,P(t,T(113),T(114))));c.fillStyle='#6b4a2f';c.fillRect(-6,0,12,120);c.fillStyle='#999';c.fillRect(-30,0,40,40);c.restore()}
    c.setTransform(1,0,0,1,0,0);c.fillStyle='rgba(120,90,40,.15)';c.fillRect(0,0,1080,1920);
    const a=P(t,T(101),T(101)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'ELISHA OTIS · 1852',540,540,{size:44,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    if(cut>0.5){AL.text(c,'TALI DIPOTONG, TETAP AMAN',540,1140,{size:36,pill:true,color:'#3ddc84'})}
    return}
};
