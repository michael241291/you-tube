// animlib.js — primitif gambar canvas semi-realistis untuk adegan "anim" (dipanggil per frame, deterministik terhadap t)
const AL={};
AL.r=(i,k)=>{const v=Math.sin(i*127.1+k*311.7)*43758.5453;return v-Math.floor(v)};
AL.p=(t,a,b)=>Math.min(1,Math.max(0,(t-a)/(b-a)));
AL.sm=x=>x*x*(3-2*x);
AL.mix=(a,b,k)=>a+(b-a)*k;
AL.cam=(c,cx,cy,z,fy=860)=>c.setTransform(z,0,0,z,540-cx*z,fy-cy*z);
AL.shake=(t,amt)=>[Math.sin(t*71)*amt+Math.sin(t*37)*amt*.5,Math.cos(t*63)*amt+Math.cos(t*29)*amt*.5];
AL.rg=(c,x,y,r0,r,stops)=>{const g=c.createRadialGradient(x,y,r0,x,y,r);stops.forEach(s=>g.addColorStop(s[0],s[1]));return g};
AL.lg=(c,x0,y0,x1,y1,stops)=>{const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach(s=>g.addColorStop(s[0],s[1]));return g};
AL.rrect=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};

// warna api menurut umur partikel (0 = baru, 1 = habis)
AL.fireCol=(ph,a)=>{let r,g,b;if(ph<.15){r=255;g=250;b=AL.mix(220,140,ph/.15)}else if(ph<.45){const k=(ph-.15)/.3;r=255;g=AL.mix(235,140,k);b=AL.mix(140,30,k)}else{const k=(ph-.45)/.55;r=AL.mix(255,170,k);g=AL.mix(140,40,k);b=AL.mix(30,10,k)}
  return `rgba(${r|0},${g|0},${b|0},${a})`};
// api partikel: base(x)->y permukaan; h tinggi; I intensitas 0..1+
AL.fire=(c,t,o)=>{const I=o.I??1;if(I<=0.01)return;const n=Math.round((o.n||90)*Math.min(1.4,I));const H=o.h*I;
  c.save();c.globalCompositeOperation='lighter';
  // cahaya latar
  const mx=(o.x0+o.x1)/2,by=o.base(mx);
  c.fillStyle=AL.rg(c,mx,by-H*.35,0,Math.max(60,(o.x1-o.x0)*.9+H*.6),[[0,`rgba(255,150,40,${.35*Math.min(1,I)})`],[1,'rgba(255,90,0,0)']]);
  c.fillRect(mx-2000,by-2000,4000,4000);
  for(let i=0;i<n;i++){const s=(o.seed||0)+i;const L=.55+.6*AL.r(s,3);const ph=((t*(o.speed||1)+AL.r(s,4)*9)/L)%1;
    const x0=AL.mix(o.x0,o.x1,AL.r(s,1));const cxw=(o.x1-o.x0)/2;const centr=1-Math.abs(x0-mx)/Math.max(1,cxw);
    const hh=H*(0.35+0.85*AL.r(s,2))*(0.45+0.55*centr);
    const x=x0+(mx-x0)*ph*.35+Math.sin(t*4+s)*14*ph+(o.wind||0)*ph*hh*.01;
    const y=o.base(x0)-hh*Math.pow(ph,.85);
    const sz=(o.size||H*.22)*(0.55+0.7*AL.r(s,5))*(1-ph*.65)*(0.6+0.4*centr);
    const a=(ph<.1?ph/.1:1)*(1-ph)*0.55;
    c.fillStyle=AL.rg(c,x,y,0,sz,[[0,AL.fireCol(ph,a)],[1,AL.fireCol(Math.min(1,ph+.2),0)]]);
    c.beginPath();c.arc(x,y,sz,0,6.283);c.fill()}
  c.restore()};
// asap/uap (normal blending)
AL.smoke=(c,t,o)=>{const n=o.n||24;c.save();for(let i=0;i<n;i++){const s=(o.seed||50)+i;const L=(o.life||2.6)*(0.7+0.6*AL.r(s,1));const ph=((t+AL.r(s,2)*9)/L)%1;
    const x=o.x+(AL.r(s,3)-.5)*o.w+Math.sin(t*1.3+s)*30*ph+(o.dx||0)*ph;const y=o.y-(o.h||400)*ph;const r=(o.r||40)*(0.5+1.6*ph);
    const a=(o.a??.25)*(ph<.15?ph/.15:1)*(1-ph);const col=o.col||'60,55,55';
    c.fillStyle=AL.rg(c,x,y,0,r,[[0,`rgba(${col},${a})`],[1,`rgba(${col},0)`]]);c.beginPath();c.arc(x,y,r,0,6.283);c.fill()}c.restore()};

// ---------- dapur ----------
AL.kitchen=(c,o={})=>{const warm=o.warm||0;
  c.fillStyle=AL.lg(c,0,0,0,1100,[[0,'#3a3330'],[.6,'#5b514a'],[1,'#6c6058']]);c.fillRect(-600,-600,2300,1700);
  // keramik dinding
  c.strokeStyle='rgba(0,0,0,.18)';c.lineWidth=3;for(let x=-600;x<1700;x+=110){c.beginPath();c.moveTo(x,-600);c.lineTo(x,1000);c.stroke()}for(let y=-600;y<1000;y+=80){c.beginPath();c.moveTo(-600,y);c.lineTo(1700,y);c.stroke()}
  c.fillStyle='rgba(255,255,255,.04)';for(let x=-600;x<1700;x+=110)for(let y=-600;y<1000;y+=80)c.fillRect(x+6,y+6,40,10);
  // cahaya api di dinding
  if(warm>0){c.fillStyle=AL.rg(c,540,760,0,900,[[0,`rgba(255,140,40,${.45*warm})`],[1,'rgba(255,120,30,0)']]);c.fillRect(-600,-600,2300,1700)}
  // kap kompor
  c.fillStyle=AL.lg(c,0,80,0,330,[[0,'#2a2c30'],[1,'#44474d']]);c.beginPath();c.moveTo(180,80);c.lineTo(900,80);c.lineTo(1000,330);c.lineTo(80,330);c.closePath();c.fill();
  c.fillStyle='#1b1c1f';c.fillRect(80,330,920,22);c.fillStyle='rgba(255,255,255,.08)';c.fillRect(180,90,720,8);
  // meja
  c.fillStyle=AL.lg(c,0,990,0,1050,[[0,'#7d7b78'],[1,'#4a4846']]);c.fillRect(-600,990,2300,60);
  c.fillStyle='rgba(255,255,255,.18)';c.fillRect(-600,990,2300,4);
  c.fillStyle=AL.lg(c,0,1050,0,1920,[[0,'#6b4a2f'],[1,'#3e2a1b']]);c.fillRect(-600,1050,2300,1000);
  c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=6;[[-560,1080,520,700],[-20,1080,520,700],[520,1080,520,700],[1060,1080,520,700]].forEach(r=>{AL.rrect(c,r[0]+20,r[1],r[2]-40,r[3],18);c.stroke()});
  c.fillStyle='#c9b48a';[[460,1300],[620,1300]].forEach(p=>{AL.rrect(c,p[0]-8,p[1],16,90,8);c.fill()});
};
AL.stove=(c,o={})=>{// badan kompor 2 tungku, fokus tungku tengah
  c.fillStyle=AL.lg(c,0,955,0,1000,[[0,'#2b2d31'],[1,'#141518']]);AL.rrect(c,200,950,680,52,14);c.fill();
  c.fillStyle='rgba(255,255,255,.12)';c.fillRect(214,954,652,3);
  // panel depan + kenop
  c.fillStyle='#1d1e21';AL.rrect(c,220,1000,640,60,10);c.fill();
  [[320,0],[760,o.knob||0]].forEach(([x,rot],k)=>{c.save();c.translate(x,1030);c.fillStyle=AL.rg(c,-6,-6,2,30,[[0,'#d8d8d8'],[1,'#7a7a7a']]);c.beginPath();c.arc(0,0,26,0,6.283);c.fill();
    c.rotate(rot);c.fillStyle='#333';AL.rrect(c,-6,-24,12,30,5);c.fill();c.restore()});
  // api biru kompor
  const g=o.gas??1;if(g>0.02){c.save();c.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const a=i/26*Math.PI*2;const x=540+Math.cos(a)*120,y=948+Math.sin(a)*14;const h=(16+10*AL.r(i,1))*g*(0.8+0.2*Math.sin((o.t||0)*30+i));
    c.fillStyle=AL.rg(c,x,y-h*.5,0,h,[[0,`rgba(140,200,255,${.8*g})`],[1,'rgba(40,80,255,0)']]);c.beginPath();c.ellipse(x,y-h*.5,6,h,0,0,6.283);c.fill()}c.restore()}
};
// wajan: rim di (cx,ry) lebar w; kembalikan fungsi permukaan minyak
AL.wok=(c,o)=>{const cx=o.cx||540,ry=o.ry||880,w=o.w||560,d=o.d||120,hot=o.hot||0;const L=cx-w/2,R=cx+w/2;
  // gagang kayu
  c.save();c.translate(L+10,ry+16);c.rotate(-0.12);c.fillStyle=AL.lg(c,0,-14,0,14,[[0,'#6a4426'],[1,'#3b2414']]);AL.rrect(c,-300,-16,310,32,14);c.fill();c.fillStyle='#9a9ca1';c.fillRect(-20,-12,40,24);c.restore();
  c.strokeStyle='#5e6066';c.lineWidth=12;c.beginPath();c.arc(R+28,ry+12,26,-1.4,1.4);c.stroke();
  // badan
  c.beginPath();c.moveTo(L,ry);c.bezierCurveTo(L+30,ry+d*1.15,R-30,ry+d*1.15,R,ry);c.closePath();
  c.fillStyle=AL.lg(c,L,0,R,0,[[0,'#2c2e33'],[.35,'#5c5f66'],[.55,'#3a3c41'],[1,'#1f2024']]);c.fill();
  if(hot>0){c.fillStyle=`rgba(255,70,20,${.35*hot})`;c.fill()}
  // bibir dalam
  c.fillStyle=AL.lg(c,0,ry-20,0,ry+22,[[0,'#2a2b2f'],[1,'#121315']]);c.beginPath();c.ellipse(cx,ry,w/2,26,0,0,6.283);c.fill();
  c.strokeStyle='#8d9097';c.lineWidth=5;c.beginPath();c.ellipse(cx,ry,w/2,26,0,0,6.283);c.stroke();
  // minyak
  if(o.oil!==false){const ow=w/2-22;c.fillStyle=AL.rg(c,cx-60,ry+4,10,ow,[[0,'#f5c04a'],[.6,'#d98c1c'],[1,'#8a4a0c']]);c.beginPath();c.ellipse(cx,ry+5,ow,18,0,0,6.283);c.fill();
    c.strokeStyle='rgba(255,240,180,.45)';c.lineWidth=3;for(let k=0;k<3;k++){c.beginPath();c.ellipse(cx+Math.sin((o.t||0)*2+k)*30,ry+5,ow*(.3+.2*k),6+3*k,0,3.4,6);c.stroke()}
    (o.chicken||[]).forEach(p=>{c.fillStyle=AL.rg(c,cx+p[0]-6,ry+p[1]-6,2,p[2],[[0,'#c98a3e'],[1,'#7a4517']]);c.beginPath();c.ellipse(cx+p[0],ry+p[1],p[2],p[2]*.55,p[3]||0,0,6.283);c.fill()})}
  return {L,R,cx,ry,base:x=>ry+2-6*Math.cos((x-cx)/(w/2)*1.5)}};
// tutup panci: y posisi bawah tutup
AL.lid=(c,cx,y,w)=>{c.fillStyle=AL.lg(c,cx-w/2,0,cx+w/2,0,[[0,'#8e9299'],[.4,'#e3e6ea'],[.6,'#b7bbc2'],[1,'#6f737a']]);c.beginPath();c.ellipse(cx,y,w/2,28,0,Math.PI,0);c.bezierCurveTo(cx+w/2-40,y-110,cx-w/2+40,y-110,cx-w/2,y);c.fill();
  c.strokeStyle='#5d6168';c.lineWidth=6;c.beginPath();c.ellipse(cx,y,w/2,26,0,0,Math.PI);c.stroke();
  c.fillStyle='#222';AL.rrect(c,cx-50,y-118,100,26,12);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.ellipse(cx-w*.18,y-60,w*.12,10,-.3,0,6.283);c.fill()};
// gayung + tangan: (x,y) pusat cangkir, rot radian
AL.dipper=(c,x,y,rot)=>{c.save();c.translate(x,y);c.rotate(rot);
  // gagang
  c.fillStyle=AL.lg(c,0,-12,0,12,[[0,'#3fa3e8'],[1,'#1c64a8']]);AL.rrect(c,60,-14,300,28,14);c.fill();
  // tangan
  c.fillStyle=AL.rg(c,250,0,10,110,[[0,'#e2a77d'],[1,'#a8694a']]);c.beginPath();c.ellipse(260,6,70,52,0,0,6.283);c.fill();
  c.fillStyle='#c98a63';for(let k=0;k<4;k++){c.beginPath();c.ellipse(215+k*26,-34,14,26,-.2,0,6.283);c.fill()}
  c.fillStyle=AL.lg(c,300,0,700,0,[[0,'#c98a63'],[1,'#8a5a40']]);c.fillRect(300,-36,500,86);
  // cangkir
  c.fillStyle=AL.lg(c,-80,0,80,0,[[0,'#1c64a8'],[.4,'#4cb2f0'],[1,'#17508a']]);AL.rrect(c,-80,-70,160,150,26);c.fill();
  c.fillStyle='#0e3d6b';c.beginPath();c.ellipse(0,-70,80,20,0,0,6.283);c.fill();
  c.fillStyle='rgba(120,190,255,.9)';c.beginPath();c.ellipse(0,-66,66,14,0,0,6.283);c.fill();
  c.restore()};
AL.waterStream=(c,t,x0,y0,x1,y1,a)=>{if(a<=0)return;c.save();c.strokeStyle=`rgba(150,205,255,${.75*a})`;c.lineWidth=22;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.quadraticCurveTo(x0-40,(y0+y1)/2-20,x1,y1);c.stroke();
  c.strokeStyle=`rgba(255,255,255,${.5*a})`;c.lineWidth=6;c.stroke();
  for(let i=0;i<18;i++){const ph=((t*2.2+AL.r(i,1))%1);const x=AL.mix(x0,x1,ph)+Math.sin(i*3)*14;const y=AL.mix(y0,y1,ph*ph);c.fillStyle=`rgba(190,225,255,${.8*a})`;c.beginPath();c.arc(x,y,4+5*AL.r(i,2),0,6.283);c.fill()}c.restore()};
AL.text=(c,txt,x,y,o={})=>{c.save();c.font=`800 ${o.size||40}px Poppins`;c.textAlign=o.align||'center';c.textBaseline='middle';
  if(o.pill){const w=c.measureText(txt).width+44;c.fillStyle=o.bg||'rgba(20,20,24,.9)';AL.rrect(c,x-(o.align==='left'?0:w/2),y-(o.size||40)*.8,w,(o.size||40)*1.6,(o.size||40)*.8);c.fill();c.fillStyle=o.color||'#fff';c.fillText(txt,o.align==='left'?x+22:x,y+2)}
  else{c.lineWidth=(o.size||40)*.22;c.strokeStyle='#000';c.lineJoin='round';c.strokeText(txt,x,y);c.fillStyle=o.color||'#fff';c.fillText(txt,x,y)}c.restore()};
