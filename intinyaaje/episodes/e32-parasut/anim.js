// e32 — Kenapa penumpang nggak dikasih parasut?
const C32={};
C32.plane=(c,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);c.rotate(o.rot||0);
  c.fillStyle=AL.lg(c,0,-60,0,60,[[0,'#ffffff'],[1,'#c9d1d8']]);c.beginPath();c.moveTo(-420,-30);c.lineTo(330,-46);c.bezierCurveTo(430,-44,470,0,430,30);c.lineTo(-400,34);c.quadraticCurveTo(-440,0,-420,-30);c.fill();
  c.fillStyle='#d6272f';c.beginPath();c.moveTo(-330,-30);c.lineTo(-430,-190);c.lineTo(-360,-190);c.lineTo(-240,-36);c.fill();
  c.fillStyle='#b9c2ca';c.beginPath();c.moveTo(-40,10);c.lineTo(-200,130);c.lineTo(-120,130);c.lineTo(80,14);c.fill();
  c.fillStyle='#2a3b4c';for(let i=0;i<14;i++)c.fillRect(-280+i*44,-18,18,16);
  if(o.door){c.fillStyle='#111';c.fillRect(200,-40,40,64*o.door)}
  c.fillStyle='#d6272f';c.fillRect(-400,8,780,8);c.restore()};
C32.seatRow=(c,y,s,t,o={})=>{for(const sg of[-1,1])for(let k=0;k<3;k++){const x=540+sg*(130+k*130)*s;c.fillStyle='#2e4a6e';AL.rrect(c,x-55*s,y-150*s,110*s,170*s,24*s);c.fill();c.fillStyle='#3f6390';AL.rrect(c,x-55*s,y-150*s,110*s,40*s,14*s);c.fill();
  if(o.people){c.fillStyle=AL.rg(c,x,y-170*s,4*s,40*s,[[0,'#e8b08a'],[1,'#b97a55']]);c.beginPath();c.arc(x,y-170*s,36*s,0,6.283);c.fill();c.fillStyle='#2a1c14';c.beginPath();c.arc(x,y-182*s,36*s,Math.PI,0);c.fill()}
  if(o.mask>0){const my=y-AL.mix(320,200,o.mask)*s+Math.sin(t*3+k)*6*s;c.strokeStyle='#ddd';c.lineWidth=3;c.beginPath();c.moveTo(x,y-330*s);c.lineTo(x,my);c.stroke();c.fillStyle='#ffd23f';c.beginPath();c.arc(x,my,18*s,0,6.283);c.fill()}
  if(o.chute>0){c.globalAlpha=o.chute;c.fillStyle='#5e7d3a';AL.rrect(c,x-40*s,y-110*s,80*s,90*s,16*s);c.fill();AL.text(c,'?',x,y-66*s,{size:40*s,color:'#fff'});c.globalAlpha=1}}};

ANIM.parasut=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='kabin'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,300,0,1300,[[0,'#e9e6df'],[1,'#b8b2a6']]);c.fillRect(-600,-800,2300,3600);
    c.fillStyle='#d8d3c8';c.beginPath();c.moveTo(-100,300);c.lineTo(1180,300);c.lineTo(760,600);c.lineTo(320,600);c.fill();
    c.fillStyle='#6d7a8a';c.beginPath();c.moveTo(440,1300);c.lineTo(640,1300);c.lineTo(580,620);c.lineTo(500,620);c.fill();
    const mask=sm(P(t,T(7),T(8)+0.3)),chute=sm(P(t,T(16),T(17)+0.3))*(1-P(t,T(24),T(24)+0.4));
    [[640,.45],[760,.62],[920,.85],[1120,1.15]].forEach(([y,sc])=>C32.seatRow(c,y,sc,t,{people:true,mask,chute}));
    // pramugari dengan pelampung
    const v1=P(t,T(5),T(5)+0.3);if(v1>0){c.globalAlpha=v1;AL.person(c,540,1180,420,{shirt:'#1f3c6e',shirt2:'#132a50',pants:'#132a50',arms:0.3,face:'senang'});c.fillStyle='#ffd23f';AL.rrect(c,490,880,100,120,30);c.fill();c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(11),T(11)+0.4)*(1-P(t,T(22),T(22)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'MASKAPAI PELIT?',540,560,{size:42,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(22),T(22)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'PILOT: PARASUT NGGAK BERGUNA',540,560,{size:36,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='tinggi'){AL.cam(c,540,860,1);AL.sky(c,'#0d2a5c','#7fb8ea',-800,1300);
    c.fillStyle='#7aa36a';c.fillRect(-600,1250,2300,800);AL.clouds(c,t,{y:1180,n:8,s:120,v:-40,h:40});
    C32.plane(c,540,700,0.8,{});
    c.strokeStyle='#ffd23f';c.lineWidth=6;c.setLineDash([16,12]);c.beginPath();c.moveTo(960,720);c.lineTo(960,1250);c.stroke();c.setLineDash([]);
    const h=P(t,T(41),T(41)+0.4);if(h>0){c.globalAlpha=h;AL.text(c,'11 km',960,980,{size:44,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    // kotak oksigen: atas tipis vs bawah padat
    const ox=P(t,T(46),T(46)+0.4)*(1-P(t,T(51),T(51)+0.3));if(ox>0){c.setTransform(1,0,0,1,0,0);c.globalAlpha=ox;for(const [x,n,lab] of[[300,6,'DI 11 km'],[780,40,'DI DARAT']]){c.fillStyle='rgba(16,16,20,.88)';AL.rrect(c,x-180,860,360,240,24);c.fill();for(let i=0;i<n;i++){c.fillStyle='#7cc8ff';c.beginPath();c.arc(x-150+AL.r(i,x)*300+Math.sin(t*2+i)*6,890+AL.r(i,x+1)*180,8,0,6.283);c.fill()}AL.text(c,lab,x,1140,{size:32,pill:true})}c.globalAlpha=1}
    const p2=P(t,T(51),T(51)+0.4);if(p2>0){c.setTransform(1,0,0,1,0,0);c.globalAlpha=p2;c.fillStyle='rgba(16,16,20,.9)';c.beginPath();c.arc(540,980,130,0,6.283);c.fill();c.strokeStyle='#ff4d5e';c.lineWidth=14;c.beginPath();c.arc(540,980,100,-Math.PI/2,-Math.PI/2+6.283*((t-T(51))/6%1));c.stroke();AL.text(c,'PINGSAN DALAM DETIK',540,1140,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='pintu'){const door=sm(P(t,T(67),T(68)+0.3));const [sx,sy]=AL.shake(t,6*door);AL.cam(c,540+sx,860+sy,1);
    AL.sky(c,'#2d66b0','#a9d2f2',-800,2600);AL.clouds(c,t,{y:1150,n:10,s:150,v:-900,h:80});AL.clouds(c,t,{y:500,n:4,s:90,v:-600,h:60,a:.6});
    C32.plane(c,560,760,1.25,{door});
    // garis angin
    c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=5;for(let i=0;i<18;i++){const y=500+AL.r(i,1)*800;const x=((AL.r(i,2)*1500-t*2600)%1500+1500)%1500-200;c.beginPath();c.moveTo(x,y);c.lineTo(x+220,y);c.stroke()}
    // tubuh terlempar ke ekor
    const fly=P(t,T(74),T(80));if(door>0.5&&fly>0){const x=AL.mix(820,120,fly),y=AL.mix(760,800,fly)-Math.sin(fly*3)*40;c.save();c.translate(x,y);c.rotate(fly*8);AL.person(c,0,60,130,{arms:1,shirt:'#e05a3c'});c.restore()}
    c.setTransform(1,0,0,1,0,0);
    const k=P(t,T(59),T(59)+0.4);if(k>0){AL.text(c,Math.round(AL.mix(0,900,sm(P(t,T(59),T(65)))))+' km/jam',540,560,{size:48,pill:true,color:'#ffd23f'})}
    if(t>T(69)&&t<T(74))AL.text(c,'ANGINNYA SAJA BISA MENCEDERAI',540,1140,{size:34,pill:true,color:'#ff8a96'});
    if(fly>0.1)AL.text(c,'BISA MENGHANTAM SAYAP / EKOR',540,1140,{size:34,pill:true,color:'#ff8a96'});
    return}
  if(v==='fase'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#1d2a3f'],[1,'#080c14']]);c.fillRect(-600,-800,2300,3600);
    const gx0=90,gx1=990,gy0=1080,gy1=620;const prof=x=>{const u=(x-gx0)/(gx1-gx0);return u<.2?AL.mix(gy0,gy1,AL.sm(u/.2)):u>.8?AL.mix(gy1,gy0,AL.sm((u-.8)/.2)):gy1};
    c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=3;c.beginPath();c.moveTo(gx0,gy0);c.lineTo(gx1,gy0);c.stroke();
    const draw=sm(P(t,T(81),T(83)));c.strokeStyle='#7cc8ff';c.lineWidth=10;c.beginPath();for(let x=gx0;x<=AL.mix(gx0,gx1,draw);x+=6){const y=prof(x);x===gx0?c.moveTo(x,y):c.lineTo(x,y)}c.stroke();
    const px=AL.mix(gx0,gx1,draw);C32.plane(c,px,prof(px)-10,0.18,{});
    const red=P(t,T(84),T(84)+0.4);if(red>0){c.fillStyle=`rgba(255,77,94,${.35*red})`;c.fillRect(gx0,gy1-40,(gx1-gx0)*.2,gy0-gy1+40);c.fillRect(gx1-(gx1-gx0)*.2,gy1-40,(gx1-gx0)*.2,gy0-gy1+40);
      AL.text(c,'LEPAS LANDAS',gx0+90,gy1-80,{size:28,pill:true,color:'#ff8a96'});AL.text(c,'MENDARAT',gx1-90,gy1-80,{size:28,pill:true,color:'#ff8a96'})}
    const low=P(t,T(90),T(90)+0.4);if(low>0){c.strokeStyle=`rgba(255,210,63,${low})`;c.setLineDash([16,10]);c.lineWidth=5;c.beginPath();c.moveTo(gx0,gy0-90);c.lineTo(gx1,gy0-90);c.stroke();c.setLineDash([]);c.globalAlpha=low;AL.text(c,'TERLALU RENDAH BUAT PARASUT',540,1140,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
};
