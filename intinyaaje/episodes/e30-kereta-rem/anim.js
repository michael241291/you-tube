// e30 — Masinis kok nggak ngerem?
const R30={};
R30.car=(c,x,y,L,H,o={})=>{c.save();c.translate(x,y);c.rotate(o.rot||0);
  c.fillStyle=AL.lg(c,0,-H,0,0,[[0,'#f2f2f2'],[1,'#c4c8cc']]);AL.rrect(c,0,-H,L,H-20,18);c.fill();
  c.fillStyle='#d6272f';c.fillRect(0,-H*.42,L,22);c.fillStyle='#1f6fbf';c.fillRect(0,-H*.42+22,L,10);
  c.fillStyle='#1e2a36';for(let k=0;k<Math.floor((L-40)/110);k++){AL.rrect(c,30+k*110,-H*.85,80,H*.3,10);c.fill()}
  if(o.loco){c.fillStyle='#1e2a36';AL.rrect(c,L-120,-H*.85,100,H*.35,12);c.fill();c.save();c.globalCompositeOperation='lighter';c.fillStyle=AL.rg(c,L-10,-H*.3,2,80,[[0,'rgba(255,250,220,.9)'],[1,'rgba(255,240,180,0)']]);c.beginPath();c.arc(L-10,-H*.3,80,0,6.283);c.fill();c.restore()}
  c.fillStyle='#222';for(const wx of[60,130,L-130,L-60]){c.beginPath();c.arc(wx,-12,24,0,6.283);c.fill()}
  if(o.spark){c.save();c.globalCompositeOperation='lighter';for(const wx of[60,130,L-130,L-60])for(let i=0;i<8;i++){const a=Math.PI+AL.r(i,wx)*1.2,r=20+50*AL.r(i+wx,(o.t*20|0));c.fillStyle='rgba(255,200,80,.9)';c.beginPath();c.arc(wx+Math.cos(a)*r,-2+Math.sin(a)*r*.4,4,0,6.283);c.fill()}c.restore()}
  c.restore()};
R30.rails=(c,y,scroll=0)=>{c.fillStyle='#8a7f70';c.fillRect(-1200,y-6,4000,60);for(let i=0;i<60;i++){c.fillStyle='#5e4632';c.fillRect(((i*70-scroll)%4200+4200)%4200-1200,y+4,40,18)}c.fillStyle='#c9ccd0';c.fillRect(-1200,y-2,4000,10)};

ANIM.kereta=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='lintasan'){
    const arrive=sm(P(t,0,T(23)));const tx=AL.mix(1500,560,Math.pow(arrive,0.7));const brake=t>T(16);
    const [sx,sy]=AL.shake(t,brake?4:0);AL.cam(c,540+sx,930+sy,1.12);
    AL.sky(c,'#69aee6','#dceef8',-800,1000);AL.ground(c,1000,'#7fae5a','#3f6a2c');
    c.fillStyle='#55595e';c.fillRect(380,1000,320,900);R30.rails(c,1080,0);
    // palang + lampu
    c.fillStyle='#ddd';c.fillRect(300,780,20,300);c.save();c.translate(310,800);c.rotate(0);c.fillStyle='#fff';c.fillRect(0,-12,360,24);for(let k=0;k<6;k++){c.fillStyle='#e8402a';c.fillRect(k*60,-12,30,24)}c.restore();
    const blink=Math.sin(t*10)>0;c.fillStyle=blink?'#ff3b30':'#5a1a18';c.beginPath();c.arc(280,740,26,0,6.283);c.fill();c.fillStyle=!blink?'#ff3b30':'#5a1a18';c.beginPath();c.arc(340,740,26,0,6.283);c.fill();
    if(blink){c.save();c.globalCompositeOperation='lighter';c.fillStyle=AL.rg(c,280,740,2,90,[[0,'rgba(255,60,40,.6)'],[1,'rgba(255,0,0,0)']]);c.fillRect(190,650,180,180);c.restore()}
    // kereta datang dari kanan
    R30.car(c,tx,1080,900,300,{loco:true,spark:brake,t});R30.car(c,tx+910,1080,900,300,{});
    // pengendara motor nyelonong (lewat cepat di depan)
    const bx=AL.mix(-200,1400,sm(P(t,T(0)+0.2,T(9))));c.save();c.translate(bx,1200);c.fillStyle='#111';c.beginPath();c.arc(-70,0,34,0,6.283);c.arc(70,0,34,0,6.283);c.fill();c.fillStyle='#e23b2e';AL.rrect(c,-80,-70,160,50,20);c.fill();AL.person(c,0,-40,200,{shirt:'#2f6fb5',shirt2:'#1d4f86'});c.restore();
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(10),T(10)+0.4)*(1-P(t,T(14),T(14)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'NETIZEN: KOK NGGAK NGEREM?',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(16),T(16)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'MASINIS: SUDAH NGEREM!',540,1140,{size:38,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='berat'){AL.cam(c,540,860,1);
    AL.sky(c,'#2a3446','#5a6a82',-800,1100);AL.ground(c,1100,'#4f5a44','#2c3326');R30.rails(c,1100,0);
    if(t<T(45)){const n=Math.min(12,Math.floor(AL.mix(1,12.99,P(t,T(31),T(39)))));const L=150;for(let k=0;k<n;k++)R30.car(c,1000-k*(L+8)-L,1100,L,140,{loco:k===0});
      c.setTransform(1,0,0,1,0,0);AL.text(c,n+' GERBONG',540,700,{size:56,pill:true,color:'#ffd23f'});const ton=Math.round(AL.mix(0,600,sm(P(t,T(40),T(44)))));if(t>T(40))AL.text(c,'± '+ton+' TON',540,820,{size:70,color:'#fff'});return}
    // rem udara: silinder, piston, sepatu rem ke roda
    const pr=sm(P(t,T(47),T(52)+0.6));c.setTransform(1,0,0,1,0,0);
    c.fillStyle='#3a3f46';AL.rrect(c,140,700,380,160,30);c.fill();c.fillStyle='#7cc8ff';c.globalAlpha=.6;AL.rrect(c,150,710,360*pr,140,24);c.fill();c.globalAlpha=1;
    c.fillStyle='#bfc4c9';c.fillRect(510,760,120+120*pr,40);c.fillStyle='#8a5a3a';AL.rrect(c,620+120*pr,700,40,160,10);c.fill();
    c.save();c.translate(820,780);c.rotate(t*(4-3*pr));c.fillStyle='#2a2a2a';c.beginPath();c.arc(0,0,150,0,6.283);c.fill();c.strokeStyle='#888';c.lineWidth=10;for(let j=0;j<6;j++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(j)*150,Math.sin(j)*150);c.stroke()}c.restore();
    for(let i=0;i<12;i++){const ph=(t*1.2+i/12)%1;c.fillStyle='rgba(180,220,255,.8)';c.beginPath();c.arc(AL.mix(60,500,ph*pr),780+Math.sin(i)*40,8,0,6.283);c.fill()}
    AL.text(c,'TEKANAN UDARA',330,660,{size:34,pill:true,color:'#7cc8ff'});AL.text(c,'NGGAK LANGSUNG MENCENGKERAM',540,1140,{size:34,pill:true,color:'#ffd23f'});
    return}
  if(v==='jarak'){AL.cam(c,540,860,1);
    c.fillStyle='#5f8a4a';c.fillRect(-600,-800,2300,3600);
    const k=sm(P(t,T(62),T(69)));const field=P(t,T(70),T(74));
    // penggaris jarak vertikal (atas = jauh)
    const y0=1180,y1=520;c.fillStyle='#8a7f70';c.fillRect(500,y1-60,80,y0-y1+120);for(let i=0;i<20;i++){c.fillStyle='#5e4632';c.fillRect(480,y1+i*34,120,12)}c.fillStyle='#d8dbde';c.fillRect(515,y1-60,10,y0-y1+120);c.fillRect(555,y1-60,10,y0-y1+120);
    const ty=AL.mix(y0,y1,k);c.fillStyle='#f2f2f2';AL.rrect(c,505,ty-10,70,160,16);c.fill();c.fillStyle='#d6272f';c.fillRect(505,ty+40,70,14);
    c.strokeStyle='#ffd23f';c.lineWidth=8;c.beginPath();c.moveTo(680,y0);c.lineTo(680,ty);c.stroke();
    c.setTransform(1,0,0,1,0,0);AL.text(c,Math.round(505*k)+' m',820,AL.mix(y0,y1,k)+20,{size:52,pill:true,color:'#ffd23f'});
    AL.text(c,'100 km/jam → REM',300,y0+0,{size:30,pill:true});
    if(field>0){for(let i=0;i<5;i++){const a=P(t,T(70)+i*0.15,T(70)+i*0.15+0.3);if(a<=0)continue;c.globalAlpha=a;const y=y0-(i+1)*(y0-y1)/5;c.fillStyle='#3d9a45';c.fillRect(150,y,260,(y0-y1)/5-8);c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(150,y,260,(y0-y1)/5-8);c.beginPath();c.moveTo(150,y+(y0-y1)/10-4);c.lineTo(410,y+(y0-y1)/10-4);c.stroke();c.globalAlpha=1}
      AL.text(c,'= 5 LAPANGAN BOLA',540,1140+0,{size:38,pill:true,color:'#3ddc84'})}
    return}
  if(v==='anjlok'){const k=sm(P(t,T(76),T(81)));const [sx,sy]=AL.shake(t,14*k);AL.cam(c,540+sx,860+sy,0.9);
    AL.sky(c,'#2a3446','#5a6a82',-800,1100);AL.ground(c,1100,'#4f5a44','#2c3326');R30.rails(c,1100,0);
    const L=320;for(let i=0;i<4;i++){const rot=(i%2?1:-1)*0.18*k*(i>0?1:0);const lift=i>0?-60*k*(i%2):0;R30.car(c,820-i*(L+10)-L+i*40*k,1100+lift,L,220,{loco:i===0,spark:k>0&&k<1,t,rot})}
    AL.smoke(c,t,{x:500,y:1080,w:700,h:300,n:20,a:.35*k,r:80,col:'150,140,130',life:1.6});
    c.setTransform(1,0,0,1,0,0);if(k>0.3)AL.text(c,'REM MENDADAK → ANJLOK',540,1140,{size:38,pill:true,color:'#ff8a96'});
    return}
  if(v==='pov'){AL.cam(c,540,860,1);AL.sky(c,'#69aee6','#dceef8',-800,700);AL.ground(c,700,'#7fae5a','#3f6a2c');
    c.fillStyle='#8a7f70';c.beginPath();c.moveTo(530,700);c.lineTo(550,700);c.lineTo(900,1920);c.lineTo(180,1920);c.fill();
    for(let i=0;i<14;i++){const ph=((i/14+t*0.35)%1);const y=AL.mix(700,1920,ph*ph);const w=AL.mix(20,900,ph*ph);c.fillStyle='#5a4230';c.fillRect(540-w/2,y,w,AL.mix(1,30,ph*ph))}
    for(const sg of[-1,1]){c.strokeStyle='#d6d9dc';c.lineWidth=8;c.beginPath();c.moveTo(540+sg*4,700);c.lineTo(540+sg*300,1920);c.stroke()}
    const near=sm(P(t,T(89),T(96)));const y=AL.mix(740,900,near);AL.person(c,560,y,AL.mix(30,120,near),{shirt:'#ffd23f'});
    // kaca kabin
    c.setTransform(1,0,0,1,0,0);c.strokeStyle='#1d2228';c.lineWidth=60;c.strokeRect(0,0,1080,1920);c.fillStyle='#1d2228';c.fillRect(0,1500,1080,420);
    const a=P(t,T(89),T(89)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,Math.round(AL.mix(800,300,near))+' m lagi',820,620,{size:44,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    if(t>T(96))AL.text(c,'SUDAH TERLAMBAT',540,1140,{size:44,pill:true,color:'#ff8a96'});
    return}
};
