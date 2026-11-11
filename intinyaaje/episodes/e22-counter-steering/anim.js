// e22 — Countersteering motor
const M22={};
// jalan perspektif: hy horizon, curve = geser titik hilang
M22.road=(c,t,o={})=>{const hy=o.hy||640,vx=540+(o.curve||0)*600,sp=o.speed??1;
  AL.sky(c,'#5aa0e0','#cfe6f5',-800,hy+10);AL.clouds(c,t,{y:hy-260,n:6,s:120,v:8});
  c.fillStyle=AL.lg(c,0,hy,0,1920,[[0,'#7fae5a'],[1,'#3f6a2c']]);c.fillRect(-500,hy,2100,1500);
  // aspal
  c.fillStyle=AL.lg(c,0,hy,0,1920,[[0,'#6a6d72'],[1,'#33363a']]);c.beginPath();c.moveTo(vx-20,hy);c.lineTo(vx+20,hy);c.quadraticCurveTo(540+(o.curve||0)*260,1300,1500,1920);c.lineTo(-420,1920);c.quadraticCurveTo(540+(o.curve||0)*260,1300,vx-20,hy);c.fill();
  // garis tengah bergerak
  c.fillStyle='#f4f1e4';for(let i=0;i<12;i++){const ph=((i/12+t*0.55*sp)%1);const k=ph*ph;const y=AL.mix(hy,1920,k);const x=AL.mix(vx,540,Math.pow(ph,.7))+(o.curve||0)*260*(1-Math.abs(ph*2-1));const w=AL.mix(2,26,k),h=AL.mix(4,120,k);c.fillRect(x-w/2,y,w,h)}
  // tiang pinggir
  for(let s of[-1,1])for(let i=0;i<6;i++){const ph=((i/6+t*0.55*sp)%1);const k=ph*ph;const y=AL.mix(hy,1920,k);const x=AL.mix(vx+s*30,540+s*1100,k);const h=AL.mix(6,260,k);c.fillStyle='#e9e9e9';c.fillRect(x-AL.mix(1,14,k)/2,y-h,AL.mix(1,14,k),h);c.fillStyle='#e8402a';c.fillRect(x-AL.mix(1,14,k)/2,y-h,AL.mix(1,14,k),h*.15)}};
// motor tampak belakang; (x,y)=titik kontak ban; lean radian (+ = kanan); bar = putar setang (+ kanan)
M22.rear=(c,t,x,y,lean,o={})=>{c.save();c.translate(x,y);c.rotate(lean);c.scale(.78,.78);
  c.fillStyle='rgba(0,0,0,.35)';c.beginPath();c.ellipse(0,4,90,16,0,0,6.283);c.fill();
  c.fillStyle='#111';AL.rrect(c,-34,-230,68,230,30);c.fill();c.fillStyle='#2b2b2b';AL.rrect(c,-24,-220,48,200,20);c.fill();
  // knalpot & badan
  c.fillStyle=AL.lg(c,40,0,110,0,[[0,'#bfc3c8'],[1,'#6f7378']]);AL.rrect(c,38,-210,62,26,12);c.fill();
  c.fillStyle=AL.lg(c,-120,0,120,0,[[0,'#8e1414'],[.5,'#e23b2e'],[1,'#7a1010']]);c.beginPath();c.moveTo(-110,-250);c.lineTo(110,-250);c.lineTo(80,-340);c.lineTo(-80,-340);c.closePath();c.fill();
  c.fillStyle='#ff2a2a';AL.rrect(c,-50,-270,100,20,8);c.fill();c.save();c.globalCompositeOperation='lighter';c.fillStyle=AL.rg(c,0,-260,2,90,[[0,'rgba(255,60,40,.6)'],[1,'rgba(255,0,0,0)']]);c.fillRect(-90,-350,180,180);c.restore();
  c.fillStyle='#1a1a1a';AL.rrect(c,-70,-370,140,40,16);c.fill();
  // pengendara
  c.fillStyle=AL.lg(c,-110,0,110,0,[[0,'#16324f'],[.5,'#2f5f8f'],[1,'#132b44']]);AL.rrect(c,-95,-600,190,250,60);c.fill();
  c.fillStyle='#1e2a36';AL.rrect(c,-90,-380,70,80,20);c.fill();AL.rrect(c,20,-380,70,80,20);c.fill();
  // setang & lengan
  const b=o.bar||0;c.save();c.translate(0,-560);c.rotate(b*0.25);c.strokeStyle='#222';c.lineWidth=14;c.beginPath();c.moveTo(-170,0);c.lineTo(170,0);c.stroke();
  c.fillStyle='#111';[-170,170].forEach(px=>{AL.rrect(c,px-26,-14,52,28,10);c.fill()});
  if(o.pushR){c.fillStyle=`rgba(255,210,63,${o.pushR})`;c.beginPath();c.arc(170,0,40+8*Math.sin(t*10),0,6.283);c.fill()}c.restore();
  c.strokeStyle='#2f5f8f';c.lineWidth=40;c.lineCap='round';[-1,1].forEach(s=>{c.beginPath();c.moveTo(s*80,-560);c.lineTo(s*165,-560+(s>0?-b*40:b*40));c.stroke()});
  c.fillStyle=AL.rg(c,-20,-700,10,90,[[0,'#f7f7f7'],[1,'#9aa0a6']]);c.beginPath();c.arc(0,-680,78,0,6.283);c.fill();c.fillStyle='#222';AL.rrect(c,-60,-690,120,28,12);c.fill();
  c.restore()};
// motor tampak atas; arah ke atas layar; steer radian (+ kanan)
M22.top=(c,t,x,y,rot,steer,o={})=>{c.save();c.translate(x,y);c.rotate(rot);c.scale(1.3,1.3);
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(10,10,70,250,0,0,6.283);c.fill();
  c.fillStyle='#151515';AL.rrect(c,-24,90,48,150,20);c.fill();
  c.save();c.translate(0,-150);c.rotate(steer);c.fillStyle='#151515';AL.rrect(c,-24,-100,48,150,20);c.fill();
  c.strokeStyle='#222';c.lineWidth=14;c.beginPath();c.moveTo(-150,0);c.lineTo(150,0);c.stroke();c.fillStyle='#111';[-150,150].forEach(px=>{AL.rrect(c,px-30,-14,60,28,10);c.fill()});
  if(o.push){const a=o.push;c.fillStyle=`rgba(255,210,63,${a})`;c.beginPath();c.moveTo(150,-40-30*a);c.lineTo(185,10-30*a);c.lineTo(115,10-30*a);c.closePath();c.fill();c.fillRect(140,8-30*a,20,60)}
  c.restore();
  c.fillStyle=AL.lg(c,-70,0,70,0,[[0,'#8e1414'],[.5,'#e23b2e'],[1,'#7a1010']]);AL.rrect(c,-62,-170,124,290,50);c.fill();
  c.fillStyle='#1a1a1a';AL.rrect(c,-46,-20,92,120,30);c.fill();
  c.fillStyle='#2f5f8f';AL.rrect(c,-95,-60,190,90,40);c.fill();
  c.fillStyle=AL.rg(c,-15,-30,6,60,[[0,'#ffffff'],[1,'#9aa0a6']]);c.beginPath();c.arc(0,-20,55,0,6.283);c.fill();
  c.restore()};
M22.asphaltTop=(c,t,sp)=>{c.fillStyle='#4a4d52';c.fillRect(-600,-800,2300,3600);c.fillStyle='#3f8a3a';c.fillRect(-600,-800,330,3600);c.fillRect(1350,-800,500,3600);
  c.fillStyle='#f4f1e4';for(let i=0;i<14;i++){const y=((i*200+t*sp)%2800)-800;c.fillRect(530,y,20,110)}};
M22.speedo=(c,x,y,v,max=60)=>{c.save();c.fillStyle='rgba(16,16,20,.9)';c.beginPath();c.arc(x,y,130,0,6.283);c.fill();c.strokeStyle='#555';c.lineWidth=14;c.beginPath();c.arc(x,y,100,Math.PI*.75,Math.PI*2.25);c.stroke();
  c.strokeStyle='#3ddc84';c.beginPath();c.arc(x,y,100,Math.PI*.75+Math.PI*1.5*20/max,Math.PI*2.25);c.stroke();
  const a=Math.PI*.75+Math.PI*1.5*Math.min(1,v/max);c.strokeStyle='#ff4d5e';c.lineWidth=8;c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*90,y+Math.sin(a)*90);c.stroke();
  AL.text(c,Math.round(v)+'',x,y+55,{size:46});AL.text(c,'km/jam',x,y+95,{size:22});c.restore()};

ANIM.motor=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='belakang'){AL.cam(c,540,860,1);M22.road(c,t,{hy:620});
    const bar=sm(P(t,T(8),T(9)+0.3))*(1-P(t,T(13),T(13)+0.4));
    M22.rear(c,t,540+Math.sin(t*1.3)*8,1180,Math.sin(t*1.1)*0.02,{bar});
    c.setTransform(1,0,0,1,0,0);if(bar>0.05){c.globalAlpha=bar;AL.text(c,'REFLEKS: PUTAR KE KANAN',540,530,{size:38,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const q=P(t,T(13),T(13)+0.4);if(q>0){c.globalAlpha=q;AL.text(c,'PEMBALAP: KEBALIKANNYA!',540,530,{size:38,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='atas'){AL.cam(c,540,860,1);M22.asphaltTop(c,t,500);
    const push=sm(P(t,T(20),T(23)+0.3)),st=-0.22*sm(P(t,T(26),T(31)));
    M22.top(c,t,540,900,0,st,{push});
    c.setTransform(1,0,0,1,0,0);
    if(push>0){c.globalAlpha=push;AL.text(c,'SETANG KANAN DIDORONG',540,530,{size:38,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    if(st<-0.02){const a=P(t,T(27),T(27)+0.4);c.globalAlpha=a;// panah arah roda
      c.save();c.translate(540,705);c.rotate(st);c.strokeStyle='#ff4d5e';c.lineWidth=12;c.setLineDash([24,14]);c.beginPath();c.moveTo(0,0);c.lineTo(0,-260);c.stroke();c.setLineDash([]);c.restore();
      AL.text(c,'RODA DEPAN → KIRI',400,1120,{size:38,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='miring'){
    const lean=0.5*sm(P(t,T(60),T(69)+0.2))+0.12*sm(P(t,T(46),T(49)))*(1-P(t,T(50),T(50)+0.3));const curve=0.35*sm(P(t,T(70),T(78)));
    const step=-60*sm(P(t,T(54),T(59)))*(1-sm(P(t,T(66),T(70))));
    AL.cam(c,540,860,1);M22.road(c,t,{hy:620,curve});
    const push=sm(P(t,T(50),T(53)))*(1-P(t,T(60),T(61)));
    // bayangan posisi ban sebelum
    if(step<-5){c.fillStyle='rgba(255,255,255,.35)';AL.rrect(c,540-34,1180-60,68,60,20);c.fill()}
    M22.rear(c,t,540+step,1180,lean,{bar:-0.3*push,pushR:push});
    c.setTransform(1,0,0,1,0,0);
    const x1=P(t,T(40),T(40)+0.3)*(1-P(t,T(46),T(46)+0.3));if(x1>0){c.globalAlpha=x1;AL.text(c,'✗ BUKAN PUTAR SETANG',540,530,{size:40,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const x2=P(t,T(46),T(46)+0.3)*(1-P(t,T(50),T(50)+0.3));if(x2>0){c.globalAlpha=x2;AL.text(c,'✓ TAPI MIRING',540,530,{size:40,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    if(step<-5){c.globalAlpha=P(t,T(54),T(55));AL.text(c,'BAN NYELONONG KIRI',300,1120,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    if(lean>0.15){const deg=Math.round(lean*57.3);c.strokeStyle='#ffd23f';c.lineWidth=8;c.beginPath();c.arc(540+step,1180,240,-Math.PI/2,-Math.PI/2+lean);c.stroke();AL.text(c,deg+'°',780,700,{size:56,color:'#ffd23f'})}
    if(curve>0.05){c.globalAlpha=P(t,T(70),T(70)+0.4);AL.text(c,'MIRING = BELOK',540,530,{size:42,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='cepat'){AL.cam(c,540,860,1);
    const slow=sm(P(t,T(98),T(99)+0.4));const spd=slow>0?AL.mix(40,8,slow):AL.mix(0,40,sm(P(t,T(83),T(91))));
    M22.asphaltTop(c,t,spd*20);
    if(slow<0.5){const k=Math.sin(t*1.2);M22.top(c,t,540+k*120,940,k*0.25,-k*0.06,{})}
    else{// parkir: belok pelan dengan setang diputar besar
      c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=8;for(let i=0;i<4;i++){c.strokeRect(100+i*230,520,200,360)}
      const st=0.45*Math.sin(t*1.5);M22.top(c,t,540,1000,st*0.3,st,{})}
    c.setTransform(1,0,0,1,0,0);M22.speedo(c,850,620,spd);
    const a=P(t,T(87),T(87)+0.4)*(1-P(t,T(98),T(98)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'> 20 km/jam = COUNTERSTEERING',540,1140,{size:34,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    if(slow>0.3){c.globalAlpha=slow;AL.text(c,'PELAN: SETANG DIPUTAR BIASA',540,1140,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
};
