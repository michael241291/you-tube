// lib2.js — gambar tambahan untuk L03 GA421 (dipakai setelah hlib.js)
// pesawat 2 mesin (tampak atas)
function twin(x,y,size,rot,col='#e8eef8',eng=[1,1],glow=0){X.save();X.translate(x,y);X.rotate(rot);X.scale(size/100,size/100);
 X.fillStyle=col;X.shadowColor='rgba(0,0,0,.5)';X.shadowBlur=20;
 X.beginPath();X.ellipse(0,0,8,56,0,0,Math.PI*2);X.fill();
 X.beginPath();X.moveTo(-6,-8);X.lineTo(-58,22);X.lineTo(-58,29);X.lineTo(-6,12);X.lineTo(6,12);X.lineTo(58,29);X.lineTo(58,22);X.lineTo(6,-8);X.closePath();X.fill();
 X.beginPath();X.moveTo(-3,40);X.lineTo(-22,54);X.lineTo(-22,59);X.lineTo(0,52);X.lineTo(22,59);X.lineTo(22,54);X.lineTo(3,40);X.closePath();X.fill();X.shadowBlur=0;
 [[-26,6],[26,6]].forEach(([ex,ey],k)=>{const on=eng[k];X.fillStyle=on>=.5?col:'#555';X.beginPath();X.roundRect(ex-5,ey-10,10,22,4);X.fill();
  if(glow){const gc=on>=.5?'rgba(80,255,140,':'rgba(255,60,60,';const r=X.createRadialGradient(ex,ey,1,ex,ey,18);r.addColorStop(0,gc+(.9*glow)+')');r.addColorStop(1,gc+'0)');X.fillStyle=r;X.beginPath();X.arc(ex,ey,18,0,7);X.fill()}});
 X.restore()}
// orang kecil (ikon)
function person(x,y,s,col){X.fillStyle=col;X.beginPath();X.arc(x,y-s*0.55,s*0.22,0,7);X.fill();X.beginPath();X.roundRect(x-s*0.24,y-s*0.3,s*0.48,s*0.62,s*0.18);X.fill()}
// grid 60 orang: n hijau, sisanya abu
function peopleGrid(t,t0,cx,cy,nOk,total=60,cols=15,s=46,a=1){X.save();X.globalAlpha*=a;for(let i=0;i<total;i++){const r=Math.floor(i/cols),c=i%cols;const x=cx+(c-(cols-1)/2)*s*1.15,y=cy+r*s*1.3;const k=clamp((t-t0-i*0.025)/.3);if(k<=0)continue;X.globalAlpha=a*k;person(x,y,s,i<nOk?GRN:'#6b7280')}X.restore()}
// penampang mesin jet: flame 0..1, rain 0..1, steam
function engineCut(t,cx,cy,sc,{flame=1,rain=0,ice=0,labels=1,rpm=1}={}){X.save();X.translate(cx,cy);X.scale(sc,sc);
 // casing
 X.fillStyle='#2a3448';X.beginPath();X.moveTo(-420,-150);X.lineTo(300,-110);X.lineTo(420,-80);X.lineTo(420,80);X.lineTo(300,110);X.lineTo(-420,150);X.closePath();X.fill();
 X.fillStyle='#0d1422';X.beginPath();X.moveTo(-400,-125);X.lineTo(300,-90);X.lineTo(400,-62);X.lineTo(400,62);X.lineTo(300,90);X.lineTo(-400,125);X.closePath();X.fill();
 // kipas & kompresor
 const rot=t*12*rpm;for(let k=0;k<6;k++){const x=-360+k*55;const h=120-k*12;X.save();X.translate(x,0);X.strokeStyle=k==0?'#9fb3d1':'#7186a6';X.lineWidth=k==0?10:7;for(let j=0;j<5;j++){const yy=((j/5+rot*0.05)%1-0.5)*2*h;X.beginPath();X.moveTo(-8,yy-10);X.lineTo(8,yy+10);X.stroke()}X.restore()}
 // ruang bakar
 X.fillStyle='#1c2436';X.fillRect(0,-70,170,140);
 if(flame>0.02){for(let i=0;i<3;i++){const fy=(i-1)*42;const L=40+130*flame*(0.85+0.15*Math.sin(t*20+i));const g=X.createRadialGradient(20,fy,2,20+L*0.4,fy,L);g.addColorStop(0,`rgba(255,240,180,${.95*flame})`);g.addColorStop(.4,`rgba(255,140,40,${.8*flame})`);g.addColorStop(1,'rgba(255,60,0,0)');X.fillStyle=g;X.beginPath();X.ellipse(20+L*0.45,fy,L*0.6,16+14*flame,0,0,7);X.fill()}}
 // turbin
 for(let k=0;k<3;k++){const x=210+k*45;X.strokeStyle='#8a7b6a';X.lineWidth=7;for(let j=0;j<4;j++){const yy=((j/4+rot*0.05)%1-0.5)*2*(70+k*6);X.beginPath();X.moveTo(x-8,yy+10);X.lineTo(x+8,yy-10);X.stroke()}}
 // hujan / es masuk
 const n=Math.round(60*rain);for(let i=0;i<n;i++){const r1=Math.sin(i*12.9898)*43758.5453,f1=r1-Math.floor(r1),r2=Math.sin(i*78.233)*12345.678,f2=r2-Math.floor(r2);const ph=(t*0.9+f1)%1;const x=-560+ph*620;const y=(f2-0.5)*230*(1-ph*0.5);
  const isIce=i%5==0&&ice>0;const nearFlame=x>-20;const steam=nearFlame&&flame>0.3;
  if(steam){X.fillStyle='rgba(230,240,255,.35)';X.beginPath();X.arc(x+40,y,10+ph*8,0,7);X.fill()}else{X.fillStyle=isIce?'#ffffff':'#6cc8ff';if(isIce)X.fillRect(x-6,y-6,12,12);else{X.beginPath();X.ellipse(x,y,7,4,0,0,7);X.fill()}}}
 if(labels){const L=[['SEDOT',-360,-190],['PADATKAN',-200,-190],['BAKAR',85,-190],['DORONG',300,-190]];L.forEach(([s,x,y],i)=>txt(s,x,y,30,i==2?'#ffb703':'#fff',{al:'center',a:clamp((labels-i*0.25)/.3)}))}
 X.restore()}
// aki
function battery(x,y,level,volt,a=1,col=null){X.save();X.globalAlpha*=a;X.fillStyle='#1b2333';X.strokeStyle='#cfd8e6';X.lineWidth=6;X.beginPath();X.roundRect(x-160,y-90,320,180,18);X.fill();X.stroke();X.fillStyle='#cfd8e6';X.fillRect(x+160,y-30,20,60);
 const c=col||(level>0.5?GRN:level>0.2?YEL:RED);X.fillStyle=c;X.fillRect(x-145,y-75,290*clamp(level),150);X.restore();if(volt!=null)txt(volt,x,y+150,56,'#fff',{al:'center',a})}
// awan badai penampang
function stormCloud(t,cx,base,top,a=1){X.save();X.globalAlpha*=a;const g=X.createLinearGradient(0,top,0,base);g.addColorStop(0,'#e6ebf2');g.addColorStop(.5,'#8a96a8');g.addColorStop(1,'#2f3746');X.fillStyle=g;
 X.beginPath();X.moveTo(cx-260,base);for(let i=0;i<=8;i++){const yy=base-(base-top)*(0.4+0.6*Math.sin(i/8*Math.PI));X.quadraticCurveTo(cx-260+i*65-30,yy-40,cx-260+i*65,yy)}X.lineTo(cx+260,base);X.closePath();X.fill();
 // anvil
 X.beginPath();X.ellipse(cx,top+20,420,50,0,0,7);X.fill();
 // hujan
 X.strokeStyle='rgba(120,180,255,.7)';X.lineWidth=3;for(let i=0;i<40;i++){const x=cx-220+i*11;const ph=(t*1.5+i*0.13)%1;X.beginPath();X.moveTo(x,base+ph*60);X.lineTo(x-6,base+ph*60+30);X.stroke()}X.restore()}
// sayap (airfoil) dengan aliran udara
function airfoil(t,cx,cy,sc,a=1,lift=1){X.save();X.globalAlpha*=a;X.translate(cx,cy);X.scale(sc,sc);
 X.strokeStyle='rgba(108,200,255,.75)';X.lineWidth=3;for(let j=-4;j<=4;j++){if(j==0)continue;X.beginPath();for(let x=-520;x<=520;x+=10){const bump=Math.exp(-Math.pow(x/260,2))*(j<0?70:30)*(1/Math.abs(j))*Math.sign(j)*-1;const y=j*45+bump*(j<0?1:0.6);x==-520?X.moveTo(x,y):X.lineTo(x,y)}X.stroke();
  const ph=((t*0.6+j*0.17)%1+1)%1;const px=-520+ph*1040;const bump=Math.exp(-Math.pow(px/260,2))*(j<0?70:30)*(1/Math.abs(j))*Math.sign(j)*-1;X.fillStyle='#fff';X.beginPath();X.arc(px,j*45+bump*(j<0?1:0.6),6,0,7);X.fill()}
 X.fillStyle='#e8eef8';X.beginPath();X.moveTo(-300,8);X.bezierCurveTo(-300,-60,-120,-80,60,-55);X.bezierCurveTo(200,-35,300,-8,330,6);X.bezierCurveTo(200,14,0,24,-300,8);X.fill();
 if(lift>0){X.fillStyle=GRN;X.globalAlpha*=lift;X.fillRect(-14,-230,28,170);X.beginPath();X.moveTo(-40,-230);X.lineTo(40,-230);X.lineTo(0,-280);X.closePath();X.fill();txt('GAYA ANGKAT',0,-320,34,GRN,{al:'center',a:lift})}
 X.restore()}
// sungai tampak atas dengan dua jembatan
function riverTop(t,k,a=1){X.save();X.globalAlpha*=a;X.fillStyle='#3f7d3a';X.fillRect(0,0,W,H);for(let i=0;i<60;i++){const r=Math.sin(i*33.3)*999,f=r-Math.floor(r),r2=Math.sin(i*71.7)*999,f2=r2-Math.floor(r2);X.fillStyle='rgba(30,70,30,.5)';X.beginPath();X.arc(f*W,f2*H,20+f*30,0,7);X.fill()}
 X.fillStyle='#8a6a3e';X.beginPath();X.moveTo(0,330);X.bezierCurveTo(500,300,900,380,1920,330);X.lineTo(1920,600);X.bezierCurveTo(900,650,500,570,0,600);X.closePath();X.fill();
 X.strokeStyle='rgba(255,255,255,.12)';X.lineWidth=3;for(let i=0;i<8;i++){const y=380+i*28;X.beginPath();X.moveTo(((t*40+i*90)%300)-300,y);for(let x=0;x<W;x+=300)X.lineTo(x+((t*40+i*90)%300),y+Math.sin(x)*4);X.stroke()}
 for(const bx of [260,1660]){X.fillStyle='#5b6170';X.fillRect(bx-22,260,44,420);X.strokeStyle='#2b2f38';X.lineWidth=4;for(let y=270;y<670;y+=30){X.beginPath();X.moveTo(bx-22,y);X.lineTo(bx+22,y+30);X.stroke()}}
 txt('JEMBATAN BESI',260,230,26,'#fff',{al:'center'});txt('JEMBATAN BESI',1660,230,26,'#fff',{al:'center'});
 const px=lerpN(1500,760,clamp(k));twin(px,470,260*(1-0.15*clamp(k)),-Math.PI/2,'#e8eef8',[0,0]);
 if(k>0.05){X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=10;X.setLineDash([2,18]);X.beginPath();X.moveTo(1560,470);X.lineTo(px+120,470);X.stroke();X.setLineDash([])}X.restore()}
const lerpN=(a,b,k)=>a+(b-a)*k;
// tuas gas
function throttle(x,y,pos,a=1,label=true){X.save();X.globalAlpha*=a;X.fillStyle='#1b2333';X.beginPath();X.roundRect(x-90,y-230,180,460,24);X.fill();X.fillStyle='#0b0f18';X.fillRect(x-12,y-200,24,400);
 const yy=y+180-360*pos;X.fillStyle='#cfd8e6';X.beginPath();X.roundRect(x-70,yy-24,140,48,14);X.fill();X.restore();
 if(label){txt('MAKS',x-120,y-180,28,'rgba(255,255,255,.6)',{a,al:'right'});txt('IDLE',x-120,y+180,28,pos<0.1?YEL:'rgba(255,255,255,.6)',{a,al:'right'})}}
// pilihan (kartu)
function optionCard(x,y,w,h,title,sub,mark,a=1,col='#1b2333'){if(a<=0)return;X.save();X.globalAlpha*=a;X.fillStyle=col;X.beginPath();X.roundRect(x-w/2,y-h/2,w,h,28);X.fill();X.restore();txt(title,x,y-h/2+70,52,'#fff',{al:'center',a});
 (sub||[]).forEach((s,i)=>txt(s,x,y-h/2+150+i*50,30,'rgba(255,255,255,.8)',{al:'center',a,w:600}));
 if(mark){X.save();X.globalAlpha=a*mark.a;txt(mark.ok?'✓':'✗',x,y+h/2-70,96,mark.ok?GRN:RED,{al:'center',a:a*mark.a});X.restore()}}
// panel kokpit (layar mati satu per satu)
function panel(t,off,a=1){X.save();X.globalAlpha*=a;X.fillStyle='#0b0e16';X.fillRect(0,0,W,H);X.fillStyle='#161c28';X.fillRect(160,250,1600,560);
 for(let i=0;i<6;i++){const x=240+i*250,y=330;const on=clamp(1-(off-i*0.15)/0.15);X.fillStyle=on>0.5?`rgba(30,60,110,${0.6+0.4*on})`:'#05070b';X.fillRect(x,y,200,170);if(on>0.5){X.strokeStyle='rgba(108,200,255,.8)';X.lineWidth=3;X.beginPath();X.arc(x+100,y+85,55,Math.PI*0.8,Math.PI*0.8+Math.PI*1.4*on);X.stroke()}
  for(let j=0;j<4;j++){X.fillStyle=on>0.5?(j%2?'#5dff9a':'#ffd23f'):'#222';X.beginPath();X.arc(x+30+j*45,y+230,10,0,7);X.fill()}}X.restore()}
// gelombang suara (CVR)
function wave(t,x,y,w,h,amp,a=1,col=BLU){X.save();X.globalAlpha*=a;X.strokeStyle=col;X.lineWidth=4;X.beginPath();for(let i=0;i<=w;i+=6){const v=Math.sin(i*0.09+t*14)*Math.sin(i*0.023+t*3)*amp*(0.5+0.5*Math.sin(i*0.31+t*20));i==0?X.moveTo(x+i,y+v*h):X.lineTo(x+i,y+v*h)}X.stroke();X.restore()}
// urutan adegan berdasarkan frasa: [{at:'frasa'|0, k:'anim'|'video', d:(t,lt,s)=>{}, clip, off, grade, y}]
function seq(arr){const t0s=arr.map(a=>a.at===0?0:T(a.at)-0.15);arr.forEach((a,i)=>{const t1=i+1<arr.length?t0s[i+1]:null;sc(t0s[i],t1,a.k||'anim',a.d||null,{clip:a.clip,off:a.off||0,grade:a.grade||'',y:a.y==null?.5:a.y})})}
const TT=p=>T(p);
