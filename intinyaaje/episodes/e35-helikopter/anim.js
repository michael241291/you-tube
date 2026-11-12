// e35 — Mesin helikopter mati, pasti jatuh?
const H35={};
H35.heli=(c,t,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);c.rotate(o.tilt||0);
  // ekor
  c.fillStyle=AL.lg(c,0,-20,0,20,[[0,'#e7562f'],[1,'#a5321a']]);c.beginPath();c.moveTo(-60,-30);c.lineTo(-420,-12);c.lineTo(-420,6);c.lineTo(-60,30);c.fill();
  c.fillStyle='#a5321a';c.beginPath();c.moveTo(-400,-10);c.lineTo(-450,-90);c.lineTo(-420,-90);c.lineTo(-380,-10);c.fill();
  const tr=(o.phase||t*30)*1.7;c.strokeStyle='rgba(40,40,40,.8)';c.lineWidth=8;c.beginPath();c.moveTo(-430+Math.cos(tr)*50,-60+Math.sin(tr)*50);c.lineTo(-430-Math.cos(tr)*50,-60-Math.sin(tr)*50);c.stroke();
  // badan
  c.fillStyle=AL.lg(c,0,-120,0,90,[[0,'#ff7a4a'],[1,'#c13d1e']]);c.beginPath();c.ellipse(40,0,170,100,0,0,6.283);c.fill();
  c.fillStyle=AL.lg(c,80,-90,200,40,[[0,'#bfe4f7'],[1,'#3d7fa8']]);c.beginPath();c.moveTo(60,-90);c.quadraticCurveTo(200,-80,205,10);c.lineTo(80,10);c.closePath();c.fill();
  c.fillStyle='rgba(255,255,255,.4)';c.beginPath();c.ellipse(130,-50,30,12,-.5,0,6.283);c.fill();
  // poros + skid
  c.fillStyle='#333';c.fillRect(20,-130,30,40);c.strokeStyle='#333';c.lineWidth=10;c.beginPath();c.moveTo(-60,90);c.lineTo(-40,130);c.moveTo(120,90);c.lineTo(100,130);c.stroke();c.lineWidth=12;c.beginPath();c.moveTo(-120,130);c.lineTo(180,130);c.quadraticCurveTo(210,130,215,110);c.stroke();
  // baling-baling utama (tampak samping)
  const ph=o.phase??t*25;const L=380;c.strokeStyle='#222';c.lineWidth=12;c.lineCap='round';
  for(let k=0;k<2;k++){const a=ph+k*Math.PI;const ext=Math.cos(a)*L;c.beginPath();c.moveTo(35,-130);c.lineTo(35+ext,-130+Math.sin(a)*6);c.stroke()}
  c.fillStyle='rgba(40,40,40,.15)';c.beginPath();c.ellipse(35,-130,L,14,0,0,6.283);c.fill();
  if(o.smoke){AL.smoke(c,t,{x:20,y:-120,w:40,h:300,n:14,a:.4*o.smoke,r:40,col:'60,60,60',life:1.6,dx:-200})}
  c.restore()};
H35.gauge=(c,x,y,v,lab,col)=>{c.save();c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,x-110,y-40,220,80,20);c.fill();c.fillStyle='#333';c.fillRect(x-90,y+4,180,16);c.fillStyle=col;c.fillRect(x-90,y+4,180*Math.max(0,Math.min(1,v)),16);AL.text(c,lab,x,y-16,{size:22,color:'#fff'});c.restore()};

ANIM.heli=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='jatuh'){AL.cam(c,540,860,1);AL.sky(c,'#4f8fd6','#cfe6f5',-800,2600);
    const off=t>T(15)?0:0;AL.clouds(c,t,{y:500,n:7,s:140,v:-120});AL.clouds(c,t,{y:1250,n:7,s:160,v:-200,h:60});
    const dead=t>T(3);const fall=sm(P(t,T(11),T(14)))*(1-P(t,T(15),T(15)+0.3));
    // bayangan "jatuh kayak batu"
    if(fall>0){c.globalAlpha=.55*(1-P(t,T(15),T(15)+0.3));H35.heli(c,t,560,AL.mix(760,1500,fall),0.85,{phase:0,tilt:0.3});c.globalAlpha=1;c.strokeStyle='#ff4d5e';c.lineWidth=8;c.setLineDash([20,14]);c.beginPath();c.moveTo(560,780);c.lineTo(560,1450);c.stroke();c.setLineDash([])}
    else H35.heli(c,t,540+Math.sin(t)*20,760+Math.sin(t*1.3)*10,0.95,{phase:dead?t*25-(t-T(3))*8:t*25,smoke:dead?1:0});
    c.setTransform(1,0,0,1,0,0);
    if(dead&&t<T(6)){AL.text(c,'MESIN MATI!',540,1140,{size:46,pill:true,color:'#ff8a96'})}
    const a=P(t,T(6),T(6)+0.4)*(1-P(t,T(15),T(15)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'KATA ORANG: JATUH KAYAK BATU',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(15),T(15)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'PILOT: WAJIB LATIHAN TANPA MESIN',540,1140,{size:34,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='rotor'){AL.cam(c,540,860,1);
    const desc=sm(P(t,T(44),T(46)));AL.sky(c,'#4f8fd6','#cfe6f5',-800,2600);
    // awan bergerak ke atas saat turun
    for(let i=0;i<8;i++){const y=((AL.r(i,1)*2000-t*200*desc)%2000+2000)%2000-200;AL.cloud(c,AL.r(i,2)*1080,y,110,['rgba(255,255,255,.9)','rgba(230,230,240,0)'])}
    const eng=1-P(t,T(36),T(37));H35.heli(c,t,540,860,1.05,{phase:t*24,smoke:eng<1?0.6:0});
    // gaya angkat
    const lift=P(t,T(30),T(30)+0.4)*(1-P(t,T(44),T(44)+0.3));if(lift>0){c.fillStyle=`rgba(61,220,132,${lift})`;for(const dx of[-250,0,250]){c.beginPath();c.moveTo(575+dx,520);c.lineTo(545+dx,580);c.lineTo(605+dx,580);c.fill();c.fillRect(565+dx,580,20,60)}}
    // udara dari bawah memutar rotor
    const air=P(t,T(47),T(48));if(air>0){for(let i=0;i<30;i++){const ph=(t*1.1+AL.r(i,1))%1;const x=180+AL.r(i,2)*780;const y=AL.mix(1300,700,ph);c.strokeStyle=`rgba(255,255,255,${.7*air*(1-ph)})`;c.lineWidth=5;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-70);c.stroke()}}
    // penampang bilah (inset)
    c.setTransform(1,0,0,1,0,0);const pi=P(t,T(38),T(38)+0.4);if(pi>0){c.globalAlpha=pi;c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,620,520,400,220,24);c.fill();AL.text(c,'SUDUT BILAH',820,555,{size:24,color:'#fff'});
      const ang=AL.mix(-0.5,0.02,sm(P(t,T(40),T(43))));c.save();c.translate(820,650);c.rotate(ang);c.fillStyle='#ddd';c.beginPath();c.ellipse(0,0,130,18,0,0,6.283);c.fill();c.restore();
      c.strokeStyle='#ffd23f';c.lineWidth=4;c.beginPath();c.moveTo(680,650);c.lineTo(960,650);c.stroke();AL.text(c,ang<-0.1?'BESAR':'DITURUNKAN',820,712,{size:24,color:'#ffd23f'});c.globalAlpha=1}
    H35.gauge(c,200,960,eng>0.5?0.9:0.15,'MESIN',eng>0.5?'#3ddc84':'#ff4d5e');H35.gauge(c,200,1050,0.85+0.05*Math.sin(t*3),'PUTARAN ROTOR','#3ddc84');
    if(t>T(57)){c.save();c.translate(930,1000);c.rotate(t*3);c.fillStyle='#fff';for(let k=0;k<4;k++){c.rotate(Math.PI/2);c.beginPath();c.moveTo(0,0);c.lineTo(80,-16);c.lineTo(80,16);c.fill()}c.restore();c.fillStyle='#8a6a4a';c.fillRect(920,1000,20,120)}
    if(t>T(60)){AL.text(c,'AUTOROTASI',600,1140,{size:46,pill:true,color:'#ffd23f'})}
    else if(air>0){AL.text(c,'UDARA DARI BAWAH MEMUTAR ROTOR',600,1140,{size:32,pill:true,color:'#fff'})}
    return}
  if(v==='turun'){AL.cam(c,540,860,1);AL.sky(c,'#4f8fd6','#cfe6f5',-800,1200);AL.ground(c,1150,'#7fae5a','#3f6a2c');
    for(let i=0;i<6;i++)AL.tree(c,60+i*190,1150,120,t,2);
    const k=sm(P(t,T(62),T(90)));const x=AL.mix(160,700,k),y=AL.mix(420,1020,k);const flare=sm(P(t,T(72),T(75)))*(1-sm(P(t,T(88),T(91))));
    const land=P(t,T(89),T(91));
    H35.heli(c,t,x,y,0.55,{phase:t*AL.mix(24,10,land),tilt:-0.35*flare+0.1*(1-flare)*(1-land)});
    if(t>T(76)&&t<T(92))AL.smoke(c,t,{x:x,y:1150,w:300,h:120,n:14,a:.35,r:50,col:'170,150,120',life:1});
    c.strokeStyle='rgba(255,255,255,.6)';c.setLineDash([14,12]);c.lineWidth=4;c.beginPath();c.moveTo(160,420);c.quadraticCurveTo(500,700,700,1020);c.stroke();c.setLineDash([]);
    c.setTransform(1,0,0,1,0,0);
    const alt=Math.round(AL.mix(500,0,k));AL.text(c,alt+' m',880,560,{size:44,pill:true,color:'#fff'});
    H35.gauge(c,880,680,AL.mix(1,0.15,sm(P(t,T(81),T(91)))),'TENAGA PUTARAN','#ffd23f');
    let lab='KETINGGIAN → TENAGA PUTARAN',col='#ffd23f';if(t>T(72)){lab='FLARE: HIDUNG DIANGKAT';col='#7cc8ff'}if(t>T(81)){lab='PUTARAN DIPAKAI MENGEREM';col='#ffd23f'}if(t>T(91)){lab='MENDARAT PELAN ✓';col='#3ddc84'}if(t>T(92)){lab='WAJIB DIKUASAI SEBELUM LISENSI';col='#3ddc84'}
    AL.text(c,lab,540,1140,{size:34,pill:true,color:col});
    return}
};
