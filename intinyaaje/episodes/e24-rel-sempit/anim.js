// e24 — Kenapa kereta kita mungil? (lebar rel)
const K24={};
K24.trackTop=(c,t,g,scroll,o={})=>{// rel tampak atas, vertikal di x=540; g = jarak rel (px)
  c.fillStyle=o.bg||'#8a7f70';c.fillRect(-600,-800,2300,3600);
  for(let i=-2;i<40;i++){const y=((i*90+scroll)%3600)-800;c.fillStyle='#5e4632';c.fillRect(540-g/2-90,y,g+180,40);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(540-g/2-90,y+34,g+180,6)}
  for(const s of[-1,1]){const x=540+s*g/2;c.fillStyle=AL.lg(c,x-12,0,x+12,0,[[0,'#6d7177'],[.5,'#e4e7ea'],[1,'#5a5e63']]);c.fillRect(x-12,-800,24,3600)}};
K24.trainSide=(c,t,x,y,o={})=>{const L=o.len||900,H=o.h||230,kind=o.kind||'kci';c.save();c.translate(x,y);
  if(kind==='steam'){c.fillStyle='#1d1d1f';AL.rrect(c,0,-H*.75,L*.62,H*.55,20);c.fill();c.fillStyle='#2c2c30';c.fillRect(L*.6,-H*1.05,L*.3,H*.85);c.fillStyle='#d9b44a';c.fillRect(L*.64,-H*.95,L*.1,H*.25);
    c.fillStyle='#111';c.fillRect(L*.08,-H*1.15,50,H*.45);c.fillStyle='#8a1e1e';c.fillRect(0,-H*.22,L*.92,22);
    for(let k=0;k<4;k++){const wx=L*.12+k*L*.2,r=k<3?62:46;c.save();c.translate(wx,-r*0.25);c.rotate(-(o.roll||0)/r);c.fillStyle='#2a2a2a';c.beginPath();c.arc(0,0,r,0,6.283);c.fill();c.strokeStyle='#888';c.lineWidth=5;for(let j=0;j<6;j++){c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(j)*r,Math.sin(j)*r);c.stroke()}c.restore()}
    c.restore();return}
  const body=kind==='whoosh'?['#f4f6f8','#c9d0d6']:['#f2f2f2','#c8ccd0'];
  c.fillStyle=AL.lg(c,0,-H,0,0,[[0,body[0]],[1,body[1]]]);c.beginPath();
  if(kind==='whoosh'){c.moveTo(0,-H);c.lineTo(L-260,-H);c.bezierCurveTo(L-60,-H,L,-H*.35,L,-30);c.lineTo(L,-20);c.lineTo(0,-20);}else{c.moveTo(0,-H);c.lineTo(L,-H);c.lineTo(L,-20);c.lineTo(0,-20)}c.closePath();c.fill();
  c.fillStyle=kind==='whoosh'?'#c8102e':'#d6272f';c.fillRect(0,-H*.42,kind==='whoosh'?L-40:L,kind==='whoosh'?14:26);
  c.fillStyle='#1e2a36';for(let k=0;k<Math.floor((L-(kind==='whoosh'?280:60))/120);k++)AL.rrect(c,40+k*120,-H*.82,86,H*.3,10),c.fill();
  c.fillStyle='#222';for(const wx of[90,190,L-200,L-100]){c.beginPath();c.arc(wx,-14,30,0,6.283);c.fill()}
  c.restore()};

ANIM.rel=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='depan'){AL.cam(c,540,860,1);AL.sky(c,'#79b4e8','#dceaf3',-800,700);AL.ground(c,700,'#8fb066','#506d36');
    const wide=t<T(11);const g=wide?1:0.74;const k=wide?sm(P(t,0,T(10))):sm(P(t,T(11),T(22)));
    // rel perspektif
    const vx=540,hy=700;c.fillStyle='#7d7062';c.beginPath();c.moveTo(vx-6,hy);c.lineTo(vx+6,hy);c.lineTo(540+620*g,1920);c.lineTo(540-620*g,1920);c.fill();
    for(let i=0;i<14;i++){const ph=((i/14+t*0.25)%1);const y=AL.mix(hy,1920,ph*ph);const w=AL.mix(6,1100*g,ph*ph);c.fillStyle='#5a4230';c.fillRect(540-w/2,y,w,AL.mix(1,40,ph*ph))}
    for(const sg of[-1,1]){c.strokeStyle='#d6d9dc';c.lineWidth=10;c.beginPath();c.moveTo(vx+sg*3,hy);c.lineTo(540+sg*420*g,1920);c.stroke()}
    // kereta mendekat (tampak depan)
    const sc=AL.mix(0.25,1.05,k);const W=600*g*sc,H=640*sc,yb=AL.mix(760,1260,k);
    c.fillStyle=AL.lg(c,0,yb-H,0,yb,[[0,wide?'#e8eaec':'#f2f2f2'],[1,wide?'#9aa3ab':'#b9bec4']]);AL.rrect(c,540-W/2,yb-H,W,H,40*sc);c.fill();
    c.fillStyle='#1e2a36';AL.rrect(c,540-W*.4,yb-H*.85,W*.8,H*.32,16*sc);c.fill();
    c.fillStyle=wide?'#1f5fa8':'#d6272f';c.fillRect(540-W/2,yb-H*.42,W,H*.08);
    c.save();c.globalCompositeOperation='lighter';for(const sg of[-1,1]){c.fillStyle=AL.rg(c,540+sg*W*.32,yb-H*.2,2,90*sc,[[0,'rgba(255,250,220,.95)'],[1,'rgba(255,240,180,0)']]);c.beginPath();c.arc(540+sg*W*.32,yb-H*.2,90*sc,0,6.283);c.fill()}c.restore();
    c.setTransform(1,0,0,1,0,0);
    if(wide){c.globalAlpha=P(t,T(2),T(2)+0.3);AL.text(c,'LUAR NEGERI: GAGAH & LEBAR',540,540,{size:38,pill:true});c.globalAlpha=1}
    else{c.globalAlpha=P(t,T(14),T(14)+0.3);AL.text(c,'KITA: MUNGIL?',540,540,{size:40,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='sejarah'){AL.cam(c,540,860,1);
    AL.sky(c,'#c9b48a','#efe2c4',-800,1000);AL.ground(c,1000,'#a99a72','#6e6248');
    c.fillStyle='#7a6a55';c.fillRect(-600,1000,2300,26);for(let i=0;i<30;i++){c.fillStyle='#5a4a38';c.fillRect(((i*90-t*240)%2400+2400)%2400-600,1020,40,18)}
    const x=AL.mix(1300,120,sm(P(t,T(22),T(36))));K24.trainSide(c,t,x,1000,{kind:'steam',len:820,h:300,roll:-t*240});
    AL.smoke(c,t,{x:x+90,y:620,w:60,h:500,n:26,a:.45,r:70,col:'230,225,215',life:2.4,dx:300});
    c.setTransform(1,0,0,1,0,0);c.fillStyle='rgba(120,90,40,.12)';c.fillRect(0,0,1080,1920);
    const a=P(t,T(27),T(27)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'1867 · SEMARANG',540,540,{size:46,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const b=P(t,T(37),T(37)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'REL PERTAMA = LEBAR',540,1140,{size:42,pill:true,color:'#fff'});c.globalAlpha=1}
    return}
  if(v==='ukur'){AL.cam(c,540,860,1);
    const narrow=sm(P(t,T(65),T(74)));const g=AL.mix(560,416,narrow);const bend=sm(P(t,T(79),T(84)));
    if(bend<0.01){K24.trackTop(c,t,g,t*160)}else{// rel berkelok di pegunungan
      c.fillStyle='#6f8f4a';c.fillRect(-600,-800,2300,3600);for(let i=0;i<9;i++){const x=AL.r(i,1)*1200-60,y=AL.r(i,2)*1300+300;c.fillStyle=AL.rg(c,x,y,10,200,[[0,'#8a8f7a'],[1,'#4e5a3a']]);c.beginPath();c.moveTo(x-180,y+100);c.lineTo(x,y-150);c.lineTo(x+180,y+100);c.fill()}
      c.globalAlpha=bend;for(const off of[-g/2,g/2]){c.strokeStyle='#dfe2e5';c.lineWidth=18;c.beginPath();for(let k=0;k<=60;k++){const yy=AL.mix(300,1300,k/60);const xx=540+Math.sin(k/60*Math.PI*2.2+t*.4)*260+off;k?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()}c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);
    const mA=P(t,T(45),T(45)+0.4)*(1-bend);if(mA>0){c.globalAlpha=mA;const y=880;c.strokeStyle='#ffd23f';c.lineWidth=8;c.beginPath();c.moveTo(540-g/2+14,y);c.lineTo(540+g/2-14,y);c.stroke();
      for(const sg of[-1,1]){c.fillStyle='#ffd23f';c.beginPath();c.moveTo(540+sg*(g/2-14),y);c.lineTo(540+sg*(g/2-44),y-18);c.lineTo(540+sg*(g/2-44),y+18);c.fill()}
      const mm=narrow>0.97?1067:Math.round(AL.mix(1435,1067,narrow));if(t>T(51))AL.text(c,mm.toLocaleString('id-ID')+' mm',540,820,{size:58,pill:true,color:mm<1200?'#ff8a96':'#3ddc84'});c.globalAlpha=1}
    const cA=P(t,T(75),T(75)+0.4)*(1-P(t,T(85),T(85)+0.3));if(cA>0){c.globalAlpha=cA;AL.text(c,'LEBIH MURAH · MUDAH BERKELOK',540,1140,{size:36,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='jepang'){AL.cam(c,540,860,1);
    const k=sm(P(t,T(88),T(97)));const g=AL.mix(560,416,k);K24.trackTop(c,t,g,0,{bg:'#8a8070'});
    // pekerja menggeser rel (palu bergerak)
    for(const sg of[-1,1]){const hx=540+sg*(g/2+60),hy=700+Math.sin(t*8)*10;c.fillStyle='#6b4a2f';c.fillRect(hx-8,hy-80,16,90);c.fillStyle='#555';c.fillRect(hx-30,hy-100+Math.abs(Math.sin(t*8))*20,60,26)}
    const tr=P(t,T(98),T(102));if(tr>0){c.save();c.translate(540,AL.mix(1700,-500,tr));c.fillStyle=AL.lg(c,-g/2-60,0,g/2+60,0,[[0,'#c8ccd0'],[.5,'#f4f4f4'],[1,'#b5babf']]);AL.rrect(c,-g/2-70,-400,g+140,800,40);c.fill();c.fillStyle='#d6272f';c.fillRect(-g/2-70,-60,g+140,30);c.restore()}
    c.setTransform(1,0,0,1,0,0);const a=P(t,T(86),T(86)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'1942–1945: REL LEBAR → SEMPIT',540,1140,{size:36,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='whoosh'){AL.cam(c,540,860,1);
    AL.sky(c,'#5aa0e0','#d2e8f6',-800,1000);AL.clouds(c,t,{y:500,n:6,s:120,v:-200});
    for(let i=0;i<6;i++){const x=((i*400-t*900)%2400+2400)%2400-600;c.fillStyle='#7aa36a';c.beginPath();c.moveTo(x-200,1000);c.lineTo(x,780);c.lineTo(x+200,1000);c.fill()}
    AL.ground(c,1000,'#7fae5a','#3f6a2c');c.fillStyle='#9a9ea3';c.fillRect(-600,990,2300,30);
    const x=AL.mix(1300,-350,sm(P(t,T(103),T(110))));K24.trainSide(c,t,x,1000,{kind:'whoosh',len:1400,h:250});
    c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=4;for(let i=0;i<10;i++){const y=760+i*24;const xx=((i*170-t*1600)%1600+1600)%1600-200;c.beginPath();c.moveTo(xx,y);c.lineTo(xx+180,y);c.stroke()}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(105),T(105)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'WHOOSH · SUMATRA · SULAWESI',540,540,{size:38,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const b=P(t,T(113),T(113)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'KEMBALI KE 1.435 mm',540,1140,{size:42,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
};
