// e36 — Kapal selam menyelam didorong mesin?
const S36={};
S36.sea=(c,t,dy=0)=>{c.fillStyle=AL.lg(c,0,-800,0,2600,[[0,'#2a8fc4'],[.5,'#0f4f80'],[1,'#051b33']]);c.fillRect(-800,-800,2700,3500);
  c.save();c.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const x=AL.r(i,1)*1200-60+Math.sin(t*.3+i)*40;c.fillStyle=AL.lg(c,0,-200,0,1400,[[0,'rgba(180,230,255,.12)'],[1,'rgba(180,230,255,0)']]);c.beginPath();c.moveTo(x-30,-200);c.lineTo(x+30,-200);c.lineTo(x+200,1400);c.lineTo(x+60,1400);c.fill()}c.restore();
  for(let i=0;i<40;i++){const y=((AL.r(i,2)*2400-t*60+dy)%2400+2400)%2400-300;c.fillStyle='rgba(220,240,255,.25)';c.beginPath();c.arc(AL.r(i,3)*1080,y,3+3*AL.r(i,4),0,6.283);c.fill()}};
S36.sub=(c,t,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);const L=420,R=110;
  // badan luar
  c.fillStyle=AL.lg(c,0,-R,0,R,[[0,'#5d6b78'],[.5,'#2f3a44'],[1,'#1b232b']]);c.beginPath();c.moveTo(-L,0);c.bezierCurveTo(-L,-R,-L+80,-R,-L+120,-R);c.lineTo(L-120,-R);c.bezierCurveTo(L+40,-R,L+60,-20,L+40,0);c.bezierCurveTo(L+60,20,L+40,R,L-120,R);c.lineTo(-L+120,R);c.bezierCurveTo(-L+80,R,-L,R,-L,0);c.fill();
  // menara
  c.fillStyle='#2f3a44';AL.rrect(c,-60,-R-110,160,120,30);c.fill();c.fillStyle='#55626e';c.fillRect(20,-R-170,10,60);
  // sirip + baling2
  c.fillStyle='#24303a';c.beginPath();c.moveTo(-L+20,-10);c.lineTo(-L-60,-90);c.lineTo(-L-30,0);c.lineTo(-L-60,90);c.lineTo(-L+20,10);c.fill();
  const pr=o.prop??1;c.save();c.translate(-L-40,0);c.fillStyle='#b08d4a';const a=t*12*pr;for(let k=0;k<3;k++){const yy=Math.sin(a+k*2.09)*50;c.fillRect(-6,Math.min(0,yy),12,Math.abs(yy))}c.restore();
  if(o.cut){// penampang: lambung dalam + tangki atas/bawah
    c.fillStyle='#e8e2d4';AL.rrect(c,-L+80,-R+50,2*L-200,2*R-100,40);c.fill();c.fillStyle='rgba(0,0,0,.12)';for(let k=0;k<6;k++)c.fillRect(-L+120+k*110,-R+40,8,2*R-80);
    const f=o.fill||0;for(const top of[true,false]){const y0=top?-R+8:R-46,h=38;c.fillStyle='rgba(10,20,30,.9)';c.fillRect(-L+100,y0,2*L-220,h);c.fillStyle='#3aa0ff';c.fillRect(-L+100,y0+h*(1-f),2*L-220,h*f);c.fillStyle='rgba(230,240,250,.9)';c.fillRect(-L+100,y0,2*L-220,h*(1-f)*0.999)}
    AL.text(c,'TANGKI PEMBERAT',0,-R+27,{size:22,color:'#ffd23f'});
    if(o.air){c.fillStyle='#3ddc84';for(let k=0;k<3;k++)AL.rrect(c,-160+k*90,-30,60,90,20),c.fill();AL.text(c,'UDARA BERTEKANAN',-70,90,{size:20,color:'#3ddc84'})}
  }
  c.restore()};
S36.arrows=(c,x,y,down,up)=>{c.save();for(const [v,dir,col,lab] of[[down,1,'#ff5c6c','BERAT'],[up,-1,'#3ddc84','GAYA ANGKAT AIR']]){const len=50+130*v;c.fillStyle=col;const yy=y+dir*150;c.fillRect(x-14,yy,28,dir*len);c.beginPath();c.moveTo(x-40,yy+dir*len);c.lineTo(x+40,yy+dir*len);c.lineTo(x,yy+dir*(len+50));c.fill();AL.text(c,lab,x+170,yy+dir*len*0.6,{size:26,pill:true,color:col})}c.restore()};

ANIM.selam=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='laut'){AL.cam(c,540,860,1);S36.sea(c,t);
    const push=P(t,T(13),T(14))*(1-P(t,T(22),T(22)+0.3));const hover=P(t,T(22),T(23));
    for(let i=0;i<5;i++){const x=((AL.r(i,5)*1400+t*60*(i%2?1:-1))%1400+1400)%1400-200;c.fillStyle='#ffb52e';c.beginPath();c.ellipse(x,1100+i*40,22,10,0,0,6.283);c.fill();c.beginPath();c.moveTo(x-20*(i%2?1:-1),1100+i*40);c.lineTo(x-38*(i%2?1:-1),1088+i*40);c.lineTo(x-38*(i%2?1:-1),1112+i*40);c.fill()}
    const y=820+push*80*Math.sin(t)+Math.sin(t*.8)*8;S36.sub(c,t,540,y,0.95,{prop:hover>0?Math.max(0,1-(t-T(22))*2):1});
    if(push>0){c.fillStyle=`rgba(255,92,108,${push})`;c.fillRect(526,y+120,28,140);c.beginPath();c.moveTo(500,y+260);c.lineTo(580,y+260);c.lineTo(540,y+310);c.fill()}
    c.setTransform(1,0,0,1,0,0);
    if(t<T(10))AL.text(c,'RIBUAN TON · BAJA',540,560,{size:38,pill:true});
    if(push>0){c.globalAlpha=push;AL.text(c,'KATANYA: DIDORONG MESIN?',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    if(hover>0){c.globalAlpha=hover;AL.text(c,'TAPI BISA DIAM MELAYANG',540,1140,{size:38,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='potong'){AL.cam(c,540,860,1);
    const fill=sm(P(t,T(53),T(57)))*(1-sm(P(t,T(74),T(79))));const sink=sm(P(t,T(66),T(68)+0.6)),rise=sm(P(t,T(80),T(85)));
    S36.sea(c,t,(sink-rise)*600);
    const y=820+AL.mix(0,160,sink)-AL.mix(0,160,rise);
    S36.sub(c,t,540,y,1.05,{cut:true,fill,air:t>T(71),prop:.5});
    // gelembung keluar dari katup atas saat menyelam
    if(t>T(49)&&t<T(58)){for(let i=0;i<16;i++){const ph=(t*1.4+AL.r(i,1))%1;c.fillStyle='rgba(230,245,255,.8)';c.beginPath();c.arc(260+AL.r(i,2)*560,y-130-ph*360,6+8*AL.r(i,3),0,6.283);c.fill()}}
    // air keluar dari bawah saat naik
    if(t>T(74)&&t<T(80)){for(let i=0;i<16;i++){const ph=(t*1.4+AL.r(i,1))%1;c.fillStyle='rgba(120,190,255,.7)';c.beginPath();c.arc(260+AL.r(i,2)*560,y+130+ph*200,6,0,6.283);c.fill()}}
    c.setTransform(1,0,0,1,0,0);
    const ar=P(t,T(58),T(58)+0.4);if(ar>0){c.globalAlpha=ar;S36.arrows(c,540,820,AL.mix(.5,1,fill)*(1-rise*.5),AL.mix(.5,.3,fill)+rise*.7);c.globalAlpha=1}
    let lab='',col='#fff';if(t>T(37))lab='DUA LAPIS LAMBUNG';if(t>T(48)){lab='KATUP DIBUKA: UDARA KELUAR';col='#7cc8ff'}if(t>T(53)){lab='AIR LAUT MASUK';col='#7cc8ff'}if(t>T(58)){lab='LEBIH BERAT → TENGGELAM';col='#ff8a96'}if(t>T(71)){lab='UDARA DISEMBURKAN, AIR KELUAR';col='#3ddc84'}if(t>T(80)){lab='LEBIH RINGAN → NAIK';col='#3ddc84'}
    if(lab)AL.text(c,lab,540,1140,{size:36,pill:true,color:col});
    return}
  if(v==='layang'){AL.cam(c,540,860,1);S36.sea(c,t,0);
    S36.sub(c,t,540,820+Math.sin(t*1.2)*6,1.05,{cut:true,fill:0.5,prop:0});
    c.setTransform(1,0,0,1,0,0);S36.arrows(c,540,820,0.6,0.6);
    AL.text(c,'TERISI SEBAGIAN: BERAT = GAYA ANGKAT',540,1140,{size:32,pill:true,color:'#ffd23f'});
    const ar=P(t,T(103),T(103)+0.4);if(ar>0){c.globalAlpha=ar;c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,660,520,380,240,24);c.fill();c.fillStyle='#4fc3f7';c.fillRect(680,640,340,100);AL.person(c,850,700,140,{arms:1,lift:0,shirt:'#ffd23f'});
      c.fillStyle='rgba(79,195,247,.6)';c.fillRect(680,660,340,80);AL.text(c,'HUKUM ARCHIMEDES',850,550,{size:24,color:'#fff'});c.globalAlpha=1}
    // pengukur kedalaman tetap
    c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,40,520,250,90,20);c.fill();AL.text(c,'KEDALAMAN TETAP',165,565,{size:26,color:'#3ddc84'});
    return}
};
