// e27 — Lidah putih tanda panas dalam?
const T27={};
T27.mouth=(c,t,x,y,s,white,o={})=>{c.save();c.translate(x,y);c.scale(s,s);
  // wajah bawah
  c.fillStyle=AL.rg(c,-60,-200,40,520,[[0,'#f0c29c'],[1,'#c48a63']]);c.beginPath();c.ellipse(0,-120,400,460,0,0,6.283);c.fill();
  // hidung bayangan
  c.fillStyle='rgba(150,90,60,.35)';c.beginPath();c.ellipse(0,-430,70,40,0,0,6.283);c.fill();
  // mulut terbuka
  c.fillStyle='#4a0f14';c.beginPath();c.ellipse(0,-160,210,150,0,0,6.283);c.fill();
  c.fillStyle='#f6f2ea';c.beginPath();c.ellipse(0,-285,180,30,0,0,Math.PI);c.fill();
  // lidah keluar
  const out=o.out??1;c.fillStyle=AL.rg(c,-30,-80+out*60,20,260,[[0,'#f48a92'],[1,'#c84a5a']]);c.beginPath();c.ellipse(0,-90+out*80,170,150+out*40,0,0,6.283);c.fill();
  c.strokeStyle='rgba(150,40,60,.5)';c.lineWidth=6;c.beginPath();c.moveTo(0,-180);c.lineTo(0,-20+out*80);c.stroke();
  if(white>0){c.save();c.beginPath();c.ellipse(0,-90+out*80,160,140+out*40,0,0,6.283);c.clip();for(let i=0;i<160;i++){const a=AL.r(i,1)*6.283,r=Math.sqrt(AL.r(i,2))*150;c.fillStyle=`rgba(250,248,240,${.55*white})`;c.beginPath();c.arc(Math.cos(a)*r,-60+out*80+Math.sin(a)*r*.9,10+10*AL.r(i,3),0,6.283);c.fill()}c.restore()}
  // bibir
  c.strokeStyle='#b5555a';c.lineWidth=26;c.beginPath();c.ellipse(0,-160,214,154,0,0,6.283);c.stroke();
  c.restore()};
T27.papillae=(c,t,o)=>{const n=o.n||16,base=o.base||1050,sw=o.swell||0;
  c.fillStyle=AL.lg(c,0,base-80,0,base+600,[[0,'#e8707e'],[1,'#a83a4c']]);c.fillRect(-600,base-20,2300,900);
  for(let i=-10;i<n+10;i++){const x=40+i*(1000/(n-1));const h=(220+60*AL.r(i,1))*(1+0.45*sw);const w=(48+10*AL.r(i,2))*(1+0.35*sw);const b=Math.sin(t*1.4+i)*8;
    c.fillStyle=AL.lg(c,x-w,0,x+w,0,[[0,'#d85566'],[.45,'#f7a3ad'],[1,'#c44658']]);c.beginPath();c.moveTo(x-w,base);c.bezierCurveTo(x-w,base-h*.6,x-w*.5+b,base-h,x+b,base-h);c.bezierCurveTo(x+w*.5+b,base-h,x+w,base-h*.6,x+w,base);c.fill();
    c.fillStyle='rgba(255,255,255,.25)';c.beginPath();c.ellipse(x-w*.35+b*.5,base-h*.65,w*.15,h*.2,0,0,6.283);c.fill()}};

ANIM.lidah=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='cermin'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,0,0,1920,[[0,'#cfe0e6'],[1,'#90a8b0']]);c.fillRect(-600,-800,2300,3600);for(let x=-600;x<1700;x+=120)for(let y=-800;y<2800;y+=120){c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=3;c.strokeRect(x,y,120,120)}
    c.fillStyle='#8a6a4a';AL.rrect(c,90,470,900,760,40);c.fill();c.fillStyle=AL.lg(c,0,500,0,1200,[[0,'#e8f2f5'],[1,'#b9ccd3']]);AL.rrect(c,120,500,840,700,30);c.fill();
    c.save();AL.rrect(c,120,500,840,700,30);c.clip();const out=sm(P(t,T(2),T(3)));T27.mouth(c,t,540,1150+(1-out)*40,0.95,sm(P(t,T(4),T(8))),{out});
    c.fillStyle='rgba(255,255,255,.18)';c.beginPath();c.moveTo(160,520);c.lineTo(320,520);c.lineTo(140,900);c.lineTo(130,780);c.fill();c.restore();
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(12),T(12)+0.4)*(1-P(t,T(19),T(19)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'KATA ORANG: PANAS DALAM',540,1140,{size:38,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(19),T(19)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'DOKTER GIGI: CUMA KOTOR',540,1140,{size:38,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='zoom'){const z=AL.mix(0.35,1,sm(P(t,T(31),T(36))))*AL.mix(1,0.45,sm(P(t,T(71),T(74))));AL.cam(c,540,860,z);
    c.fillStyle='#3a0c14';c.fillRect(-2000,-2000,5000,6000);
    const sw=sm(P(t,T(65),T(70)));T27.papillae(c,t,{n:14,base:1080,swell:sw});
    // partikel menyangkut
    const kinds=[[T(45),'#a0662e','sisa makanan'],[T(47),'#f4efe0','sel mati'],[T(51),'#6fcf63','bakteri']];
    kinds.forEach(([t0,col],k)=>{if(t<t0)return;for(let i=0;i<18;i++){const s0=t0+i*0.08;if(t<s0)continue;const el=Math.min(1,(t-s0)/0.8);const x=40+((i*3+k)%13+0.5)*(1000/13)+(AL.r(i,k)-.5)*20;const y=AL.mix(300,1040-30*(AL.r(i,k+3))-k*28,el*el);
      c.fillStyle=col;if(k===2){c.save();c.translate(x,y);c.rotate(i);AL.rrect(c,-14,-5,28,10,5);c.fill();c.restore()}else{c.beginPath();c.ellipse(x,y,k?12:10,k?6:10,i,0,6.283);c.fill()}}});
    // tumpukan putih saat kering
    if(sw>0){for(let i=0;i<60;i++){const x=40+(i%13+0.5)*(1000/13)+(AL.r(i,9)-.5)*30;const y=1040-AL.r(i,8)*220*sw;c.fillStyle=`rgba(250,248,240,${.8*sw})`;c.beginPath();c.arc(x,y,12+8*AL.r(i,7),0,6.283);c.fill()}
      c.strokeStyle=`rgba(255,220,150,${.5*sw})`;c.lineWidth=5;for(let i=0;i<5;i++){c.beginPath();c.moveTo(100+i*200,380);c.quadraticCurveTo(140+i*200,330,180+i*200,380);c.stroke()}}
    c.setTransform(1,0,0,1,0,0);
    const zb=P(t,T(71),T(74));if(zb>0){c.fillStyle=`rgba(245,242,235,${.55*zb})`;c.fillRect(0,0,1080,1920)}
    const L=(txt,w0,w1,col)=>{const a=P(t,T(w0),T(w0)+0.4)*(1-P(t,T(w1),T(w1)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,txt,540,1140,{size:38,pill:true,color:col});c.globalAlpha=1}};
    L('PAPILA = TONJOLAN KECIL',38,45,'#ffd23f');L('SISA MAKANAN · SEL MATI · BAKTERI',45,56,'#fff');L('MULUT KERING → MEMBENGKAK',56,71,'#ff8a96');L('DARI JAUH: PUTIH',71,999,'#fff');
    return}
  if(v==='pagi'){AL.cam(c,540,860,1);
    const dawn=sm(P(t,T(76),T(81)));
    AL.sky(c,`rgb(${AL.mix(15,250,dawn)|0},${AL.mix(20,190,dawn)|0},${AL.mix(50,120,dawn)|0})`,`rgb(${AL.mix(40,255,dawn)|0},${AL.mix(50,230,dawn)|0},${AL.mix(90,190,dawn)|0})`,-800,1500);
    c.fillStyle='#d8cbb8';c.fillRect(-600,1060,2300,1400);c.fillStyle=dawn<0.5?'#f4f1d8':'#ffd23f';c.beginPath();c.arc(AL.mix(820,800,dawn),AL.mix(560,620,dawn),70,0,6.283);c.fill();
    // kasur + orang tidur mangap (tampak samping)
    c.fillStyle='#e8e2d6';AL.rrect(c,80,980,920,120,30);c.fill();c.fillStyle='#7aa3c8';AL.rrect(c,420,930,560,110,40);c.fill();c.fillStyle='#fff';AL.rrect(c,110,920,240,80,30);c.fill();
    c.fillStyle=AL.rg(c,230,880,10,90,[[0,'#e8b08a'],[1,'#b97a55']]);c.beginPath();c.arc(240,880,80,0,6.283);c.fill();c.fillStyle='#2a1c14';c.beginPath();c.arc(260,850,80,Math.PI*1.1,Math.PI*1.9);c.fill();
    c.fillStyle='#4a0f14';c.beginPath();c.ellipse(175,905,22,16+6*Math.sin(t*2),0,0,6.283);c.fill();
    for(let i=0;i<3;i++){const ph=(t*.6+i/3)%1;c.strokeStyle=`rgba(255,255,255,${.6*(1-ph)})`;c.lineWidth=4;c.beginPath();c.arc(140-ph*80,900,20+ph*40,2,4.2);c.stroke()}
    if(dawn<0.6){AL.text(c,'z',330-Math.sin(t)*10,760-(t*40%120),{size:50,color:'#cfd8e3'})}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(77),T(77)+0.4)*(1-P(t,T(82),T(82)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'PAGI = PALING PUTIH',540,1140,{size:40,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const b=P(t,T(82),T(82)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'"PANAS DALAM" BUKAN DIAGNOSIS',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='beres'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,0,0,1920,[[0,'#d7eef5'],[1,'#9cc3d0']]);c.fillRect(-600,-800,2300,3600);
    const clean=sm(P(t,T(99),T(101)+0.4));
    // lidah besar di bawah
    c.save();c.beginPath();c.ellipse(540,1000,330,200,0,0,6.283);c.fillStyle=AL.rg(c,500,960,20,340,[[0,'#f48a92'],[1,'#c84a5a']]);c.fill();c.clip();
    for(let i=0;i<120;i++){const x=540+(AL.r(i,1)-.5)*640,y=1000+(AL.r(i,2)-.5)*380;if(x<540-330+clean*700&&clean>0)continue;c.fillStyle='rgba(250,248,240,.6)';c.beginPath();c.arc(x,y,12,0,6.283);c.fill()}c.restore();
    // pengerok lidah
    if(t>T(99)){const x=540-330+clean*660;c.fillStyle='#3ddc84';AL.rrect(c,x-14,780,28,240,10);c.fill();c.fillStyle='#2bb36a';AL.rrect(c,x-60,1000,120,22,10);c.fill()}
    // gelas air
    const w=P(t,T(92),T(95));c.save();c.translate(230,560);c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();c.moveTo(-60,-110);c.lineTo(-48,110);c.lineTo(48,110);c.lineTo(60,-110);c.stroke();
    c.fillStyle='rgba(90,170,255,.7)';const lv=AL.mix(110,-80,w);c.beginPath();c.moveTo(-48+ (lv+110)/220*-12,lv);c.lineTo(48+(lv+110)/220*12,lv);c.lineTo(48,110);c.lineTo(-48,110);c.fill();c.restore();
    // sikat gigi
    const br=P(t,T(96),T(96)+0.4);if(br>0){c.save();c.globalAlpha=br;c.translate(820+Math.sin(t*14)*30,560);c.rotate(-0.4);c.fillStyle='#2e86de';AL.rrect(c,-150,-14,300,28,14);c.fill();c.fillStyle='#fff';for(let k=0;k<6;k++)c.fillRect(90+k*10,-50,6,40);c.restore()}
    c.setTransform(1,0,0,1,0,0);
    const lab=t<T(96)?'1. MINUM CUKUP':t<T(98)?'2. SIKAT GIGI':'3. BERSIHKAN LIDAH';AL.text(c,lab,540,1300-160,{size:42,pill:true,color:'#ffd23f'});
    return}
};
