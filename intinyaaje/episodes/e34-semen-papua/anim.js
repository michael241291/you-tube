// e34 — Semen Rp2 juta, pedagangnya serakah?
const E34={};
E34.bag=(c,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=AL.lg(c,-80,0,80,0,[[0,'#b9b1a2'],[.5,'#e6dfd0'],[1,'#a59d8e']]);AL.rrect(c,-80,-120,160,120,20);c.fill();
  c.fillStyle='#c0392b';c.fillRect(-80,-80,160,30);AL.text(c,'SEMEN',0,-65,{size:24,color:'#fff'});AL.text(c,'40–50 kg',0,-22,{size:20,color:'#333'});c.restore()};
E34.tag=(c,x,y,txt,col='#ffd23f',sc=1)=>{c.save();c.translate(x,y);c.scale(sc,sc);c.rotate(-0.08);c.fillStyle=col;c.beginPath();c.moveTo(-40,-40);c.lineTo(200,-40);c.lineTo(200,40);c.lineTo(-40,40);c.lineTo(-80,0);c.closePath();c.fill();c.fillStyle='#111';c.beginPath();c.arc(-40,0,10,0,6.283);c.fill();AL.text(c,txt,80,2,{size:40,color:'#111'});c.restore()};
E34.mountains=(c,t,y,col1,col2,n=5,seed=0)=>{for(let i=0;i<n;i++){const x=-300+i*(1700/(n-1))+(AL.r(i,seed)-.5)*120,h=380+AL.r(i,seed+1)*360;c.fillStyle=AL.lg(c,0,y-h,0,y,[[0,col1],[1,col2]]);c.beginPath();c.moveTo(x-360,y);c.lineTo(x-60,y-h*.85);c.lineTo(x,y-h);c.lineTo(x+80,y-h*.8);c.lineTo(x+380,y);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.moveTo(x-40,y-h*.9);c.lineTo(x,y-h);c.lineTo(x+40,y-h*.9);c.fill()}};
E34.plane=(c,x,y,s,rot=0)=>{c.save();c.translate(x,y);c.scale(s,s);c.rotate(rot);c.fillStyle='#f4f4f4';AL.rrect(c,-140,-24,280,48,24);c.fill();c.fillStyle='#d6272f';c.fillRect(-140,-4,280,8);c.fillStyle='#ddd';c.fillRect(-30,-90,40,180);c.beginPath();c.moveTo(-130,-20);c.lineTo(-160,-70);c.lineTo(-120,-70);c.lineTo(-100,-20);c.fill();c.fillStyle='#1e2a36';for(let k=0;k<5;k++)c.fillRect(20+k*22,-14,12,10);c.restore()};

ANIM.semen=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='harga'){const pap=sm(P(t,T(9),T(10)+0.3));AL.cam(c,540,860,1);
    if(pap<1){c.save();c.translate(-1080*pap,0);
      AL.sky(c,'#69aee6','#dceef8',-800,900);AL.ground(c,900,'#8fb07a','#5c7a4a');c.fillStyle='#55595e';c.fillRect(-600,1000,2300,120);
      for(let i=0;i<5;i++){c.fillStyle=['#d9cbb3','#c7684d','#9fb4c8','#e8d6a8','#b9c7a8'][i];c.fillRect(-40+i*230,620,190,380);c.fillStyle='rgba(40,60,80,.6)';for(let k=0;k<3;k++)c.fillRect(-10+i*230,660+k*90,50,50),c.fillRect(70+i*230,660+k*90,50,50)}
      const tx=((t*160)%1700)-400;c.fillStyle='#e0b02a';AL.rrect(c,tx,980,200,90,10);c.fill();c.fillStyle='#3f6ea8';AL.rrect(c,tx+200,1000,80,70,10);c.fill();c.fillStyle='#222';c.beginPath();c.arc(tx+40,1075,22,0,6.283);c.arc(tx+230,1075,22,0,6.283);c.fill();
      E34.bag(c,400,1150,1.6);E34.tag(c,560,1000,'Rp70 rb','#3ddc84');c.restore()}
    if(pap>0){c.save();c.translate(1080*(1-pap),0);AL.sky(c,'#5f8ec4','#cfe0ee',-800,1150);E34.mountains(c,t,1150,'#4f6b4a','#2e3f2c',5,3);AL.ground(c,1150,'#5e7d4a','#2e3f2c');
      for(let i=0;i<4;i++){const x=640+i*120;c.fillStyle='#7a5a3a';c.beginPath();c.ellipse(x,1150,52,34,0,Math.PI,0);c.fill()}
      const pr=P(t,T(17),T(18)+0.2);const [sx,sy]=AL.shake(t,12*pr*(1-P(t,T(19),T(20))));E34.bag(c,330+sx,1150+sy,1.6);if(pr>0)E34.tag(c,480+sx,980+sy,'Rp2 JUTA','#ff5c6c',AL.mix(0.4,1.15,AL.sm(pr)));
      c.restore()}
    c.setTransform(1,0,0,1,0,0);
    if(t<T(9)&&t>T(0))AL.text(c,'JAWA',540,560,{size:40,pill:true});
    if(pap>0.5){AL.text(c,'ILAGA, PEGUNUNGAN PAPUA',540,560,{size:36,pill:true,color:'#ffd23f'});AL.text(c,'Jawa: Rp70 rb',880,640,{size:28,pill:true,color:'#3ddc84'})}
    const a=P(t,T(22),T(22)+0.4)*(1-P(t,T(27),T(27)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'PEDAGANG SERAKAH?',540,1140,{size:40,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(27),T(27)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'YANG MAHAL: JALANNYA',540,1140,{size:40,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='udara'){AL.cam(c,540,860,1);AL.sky(c,'#5f8ec4','#dceef8',-800,1300);
    E34.mountains(c,t,1150,'#5d7a55','#2e3f2c',6,9);AL.ground(c,1150,'#5e7d4a','#2e3f2c');
    // jalan putus
    c.strokeStyle='#8a8f96';c.lineWidth=26;c.beginPath();c.moveTo(-200,1250);c.lineTo(220,1150);c.stroke();const nr=P(t,T(44),T(44)+0.4);if(nr>0){c.strokeStyle=`rgba(255,77,94,${nr})`;c.lineWidth=14;c.beginPath();c.moveTo(200,1080);c.lineTo(280,1180);c.moveTo(280,1080);c.lineTo(200,1180);c.stroke()}
    // landasan Ilaga
    c.fillStyle='#8a7f6a';c.fillRect(760,1135,260,16);AL.text(c,'ILAGA',890,1100,{size:30,pill:true,color:'#ffd23f'});AL.text(c,'← TIMIKA',140,700,{size:30,pill:true});
    const fl=P(t,T(48),T(56));if(fl>0){const x=AL.mix(-100,900,fl),y=AL.mix(700,1110,Math.pow(fl,1.6))-Math.sin(fl*Math.PI)*160;E34.plane(c,x,y,0.9,0.15*fl);
      for(let k=0;k<3;k++){c.fillStyle='#b9b1a2';c.fillRect(x-60+k*36,y+30,28,20)}}
    const fuel=P(t,T(63),T(63)+0.4);if(fuel>0){c.setTransform(1,0,0,1,0,0);c.globalAlpha=fuel;c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,700,520,300,190,24);c.fill();c.fillStyle='#ff4d5e';c.fillRect(740,600,220*0.85,40);c.strokeStyle='#fff';c.lineWidth=4;c.strokeRect(740,600,220,40);AL.text(c,'AVTUR MAHAL',850,560,{size:28,color:'#fff'});AL.text(c,'MUATAN SEDIKIT',850,680,{size:26,color:'#ffd23f'});c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);if(nr>0&&t<T(56)){c.globalAlpha=nr;AL.text(c,'BELUM ADA JALAN DARAT',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    if(t>=T(56)){AL.text(c,'SEMUA BARANG NAIK PESAWAT',540,1140,{size:36,pill:true,color:'#ffd23f'})}
    return}
  if(v==='timbang'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#2b2442'],[1,'#0e0b18']]);c.fillRect(-600,-800,2300,3600);
    // timbangan
    const w=sm(P(t,T(69),T(75)));c.fillStyle='#7d8288';AL.rrect(c,160,900,420,40,12);c.fill();c.fillRect(350,940,40,120);AL.rrect(c,250,1060,240,30,10);c.fill();
    E34.bag(c,370,900-0+w*6,1.5);c.fillStyle='rgba(16,16,20,.9)';AL.rrect(c,300,1100-50,140,0,0);AL.text(c,Math.round(AL.mix(0,50,w))+' kg',370,640,{size:56,pill:true,color:'#ffd23f'});
    // batang harga: semen vs ongkos terbang
    const b=sm(P(t,T(76),T(81)));const X=700,Y0=1080;c.fillStyle='#3ddc84';c.fillRect(X,Y0-40,100,40);AL.text(c,'semen',X+50,Y0+30,{size:24,color:'#fff'});
    c.fillStyle='#ff5c6c';c.fillRect(X+140,Y0-AL.mix(40,460,b),100,AL.mix(40,460,b));AL.text(c,'ongkos',X+190,Y0+30,{size:24,color:'#fff'});AL.text(c,'terbang',X+190,Y0+58,{size:24,color:'#fff'});
    c.setTransform(1,0,0,1,0,0);if(b>0.5)AL.text(c,'ONGKOS TERBANG > HARGA SEMEN',540,1140+40,{size:34,pill:true,color:'#ff8a96'});
    return}
  if(v==='mie'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#4a2c18'],[1,'#140a04']]);c.fillRect(-600,-800,2300,3600);
    c.fillStyle='#f4efe6';c.beginPath();c.ellipse(540,900,300,90,0,0,Math.PI*2);c.fill();c.fillStyle=AL.lg(c,240,0,840,0,[[0,'#d9d2c4'],[.5,'#fff'],[1,'#cfc8ba']]);c.beginPath();c.moveTo(240,900);c.quadraticCurveTo(260,1120,540,1130);c.quadraticCurveTo(820,1120,840,900);c.fill();
    c.fillStyle='#e8b04a';c.beginPath();c.ellipse(540,905,270,70,0,0,6.283);c.fill();c.strokeStyle='#f6d07a';c.lineWidth=8;for(let i=0;i<14;i++){c.beginPath();c.moveTo(320+i*30,880+Math.sin(i)*20);c.bezierCurveTo(340+i*30,920,300+i*30,940,330+i*30,950);c.stroke()}
    c.fillStyle='#3c9a45';c.beginPath();c.arc(640,880,22,0,6.283);c.fill();c.fillStyle='#fff7d6';c.beginPath();c.ellipse(450,890,40,26,0,0,6.283);c.fill();c.fillStyle='#ffb52e';c.beginPath();c.arc(450,890,14,0,6.283);c.fill();
    AL.smoke(c,t,{x:540,y:820,w:300,h:300,n:16,a:.3,r:40,col:'255,255,255',life:2});
    const p=P(t,T(91),T(92));if(p>0)E34.tag(c,600,640,'Rp30.000','#ff5c6c',AL.mix(.3,1,AL.sm(p)));
    return}
  if(v==='solusi'){AL.cam(c,540,860,1);AL.sky(c,'#5f8ec4','#dceef8',-800,1300);E34.mountains(c,t,1150,'#5d7a55','#2e3f2c',6,9);AL.ground(c,1150,'#5e7d4a','#2e3f2c');
    const rd=sm(P(t,T(106),T(110)+0.4));if(rd>0){c.strokeStyle='#8a8f96';c.lineWidth=26;c.beginPath();for(let u=0;u<=rd;u+=0.01){const x=AL.mix(-100,1180,u),y=1200-Math.sin(u*Math.PI*3)*60-u*40;u?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
      const tu=((t*0.15)%1)*rd;const tx=AL.mix(-100,1180,tu),ty=1200-Math.sin(tu*Math.PI*3)*60-tu*40;c.fillStyle='#e0b02a';AL.rrect(c,tx-50,ty-60,100,50,8);c.fill()}
    const p1=P(t,T(98),T(98)+0.4);if(p1>0){c.globalAlpha=p1;E34.plane(c,300+Math.sin(t)*20,620,0.8);AL.text(c,'SUBSIDI ANGKUTAN UDARA',300,720,{size:28,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const p2=P(t,T(103),T(103)+0.4);if(p2>0){c.globalAlpha=p2;c.fillStyle='#d6272f';AL.rrect(c,760,560,120,180,14);c.fill();c.fillStyle='#fff';c.fillRect(780,590,80,50);c.strokeStyle='#222';c.lineWidth=8;c.beginPath();c.moveTo(880,620);c.quadraticCurveTo(940,620,930,700);c.stroke();AL.text(c,'BBM SATU HARGA',820,780,{size:28,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);if(rd>0.1)AL.text(c,'JALAN TRANS PAPUA',540,1140,{size:38,pill:true,color:'#3ddc84'});
    return}
};
