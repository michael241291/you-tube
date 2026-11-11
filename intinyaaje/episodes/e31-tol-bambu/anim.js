// e31 — Jalan tol kok pakai bambu?
const B31={};
B31.mud=(c,t,y,o={})=>{c.fillStyle=AL.lg(c,0,y,0,y+900,[[0,o.top||'#6b5a43'],[1,o.bot||'#3a2f22']]);c.fillRect(-600,y,2300,1400);
  c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=6;for(let i=0;i<10;i++){c.beginPath();for(let x=-600;x<1700;x+=40){const yy=y+40+i*70+Math.sin(x*.01+i+t*.4)*8;x===-600?c.moveTo(x,yy):c.lineTo(x,yy)}c.stroke()}};
B31.bamboo=(c,x0,y0,x1,y1,w=16)=>{c.strokeStyle='#c9a24a';c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();c.strokeStyle='rgba(90,60,20,.5)';c.lineWidth=w*.25;const n=Math.floor(Math.hypot(x1-x0,y1-y0)/60);for(let k=1;k<n;k++){const x=AL.mix(x0,x1,k/n),y=AL.mix(y0,y1,k/n);c.beginPath();c.moveTo(x-(y1-y0)/Math.hypot(x1-x0,y1-y0)*w*.6,y+(x1-x0)/Math.hypot(x1-x0,y1-y0)*w*.6);c.lineTo(x+(y1-y0)/Math.hypot(x1-x0,y1-y0)*w*.6,y-(x1-x0)/Math.hypot(x1-x0,y1-y0)*w*.6);c.stroke()}};
B31.mat=(c,y,x0,x1,layers,prog=1)=>{for(let l=0;l<layers;l++){const yy=y+l*26;const n=Math.floor((x1-x0)/30);for(let k=0;k<n;k++){if(k/n>prog*layers-l)break;B31.bamboo(c,x0+k*30,yy-8,x0+k*30+20,yy+8,10)}B31.bamboo(c,x0,yy,AL.mix(x0,x1,Math.max(0,Math.min(1,prog*layers-l))),yy,12)}};
B31.car=(c,x,y,col)=>{c.fillStyle=col;AL.rrect(c,x-60,y-40,120,40,12);c.fill();AL.rrect(c,x-36,y-66,72,30,10);c.fill();c.fillStyle='#222';c.beginPath();c.arc(x-34,y,12,0,6.283);c.arc(x+34,y,12,0,6.283);c.fill()};

ANIM.tol=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='laut'){const cut=sm(P(t,T(14),T(18)));AL.cam(c,540,AL.mix(860,960,cut),1);
    AL.sky(c,'#5aa0e0','#d2e8f6',-800,800);AL.clouds(c,t,{y:300,n:6,s:120,v:10});
    // laut
    B31.mud(c,t,1150);c.fillStyle=AL.lg(c,0,800,0,1100,[[0,'#3c8fb5'],[1,'#2b6a86']]);c.fillRect(-600,800,2300,360);
    c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=4;for(let i=0;i<14;i++){const x=((i*160+t*30)%2300)-600;c.beginPath();c.moveTo(x,840+i%5*50);c.quadraticCurveTo(x+30,830+i%5*50,x+60,840+i%5*50);c.stroke()}
    // tanggul tol
    c.fillStyle='#8f8a7d';c.beginPath();c.moveTo(-600,880);c.lineTo(1700,880);c.lineTo(1700,980);c.lineTo(-600,980);c.fill();c.fillStyle='#3e4146';c.fillRect(-600,850,2300,40);c.fillStyle='#f4f1e4';for(let i=0;i<14;i++)c.fillRect(((i*200-t*300)%2300+2300)%2300-600,866,80,6);
    for(let i=0;i<4;i++){const x=((i*560+t*(i%2?260:-200))%2600+2600)%2600-600;B31.car(c,x,860,['#e23b2e','#f2f2f2','#2f6fb5','#ffd23f'][i])}
    // potongan bawah: lumpur + matras bambu
    if(cut>0){c.save();c.globalAlpha=cut;B31.mud(c,t,980);B31.mat(c,1000,-100,1200,3,1);for(let k=0;k<14;k++)B31.bamboo(c,-80+k*90,1070,-80+k*90,1070+AL.mix(0,260,cut),12);c.restore()}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(9),T(9)+0.4)*(1-P(t,T(13),T(13)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'SEMARANG – DEMAK',540,560,{size:42,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const b=P(t,T(19),T(19)+0.4)*(1-P(t,T(30),T(30)+0.3));if(b>0){c.globalAlpha=b;AL.text(c,'KATA ORANG: BAMBU GAMPANG LAPUK',540,560,{size:34,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const d=P(t,T(30),T(30)+0.4);if(d>0){c.globalAlpha=d;AL.text(c,'INSINYUR: DI SINI PALING KUAT',540,560,{size:36,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='ambles'){AL.cam(c,540,860,1);AL.sky(c,'#9cc6e6','#dceef8',-800,760);
    B31.mud(c,t,760,{top:'#6f5d45',bot:'#3a2f22'});
    const sink=sm(P(t,T(50),T(55)));const tilt=0.12*sink;
    c.save();c.translate(540,760+120*sink);c.rotate(tilt);c.fillStyle=AL.lg(c,0,-200,0,60,[[0,'#b39b6d'],[1,'#7d6a49']]);c.beginPath();c.moveTo(-420,40);c.lineTo(-260,-180);c.lineTo(260,-180);c.lineTo(420,40);c.fill();
    c.fillStyle='#3e4146';c.fillRect(-260,-200,520,24);if(sink>0.5){c.strokeStyle='#222';c.lineWidth=6;c.beginPath();c.moveTo(-40,-200);c.lineTo(-10,-120);c.lineTo(-50,-60);c.lineTo(-20,20);c.stroke()}c.restore();
    // truk menimbun
    const dump=P(t,T(49),T(51));if(dump>0&&dump<1){for(let i=0;i<20;i++){c.fillStyle='#9a845c';c.beginPath();c.arc(540+(AL.r(i,1)-.5)*400,AL.mix(300,600,(dump+AL.r(i,2))%1),14,0,6.283);c.fill()}}
    c.setTransform(1,0,0,1,0,0);
    AL.text(c,'LUMPUR LUNAK',540,1140,{size:36,pill:true,color:'#d9c4a0'});
    if(sink>0.3)AL.text(c,'TIMBUNAN BIASA → AMBLES TIDAK RATA',540,560,{size:32,pill:true,color:'#ff8a96'});
    return}
  if(v==='matras'){AL.cam(c,540,860,1);AL.sky(c,'#9cc6e6','#dceef8',-800,760);
    B31.mud(c,t,800);
    const weave=P(t,T(58),T(63));const pile=sm(P(t,T(64),T(67)+0.4));const load=sm(P(t,T(68),T(70)));
    for(let k=0;k<12;k++){const x=100+k*80;const y=AL.mix(500,820,pile);B31.bamboo(c,x,y,x,y+330,14)}
    // palu menancap
    if(pile>0&&pile<1){c.fillStyle='#555';c.fillRect(100+Math.floor(pile*12)*80-40,AL.mix(420,700,pile)-60+Math.abs(Math.sin(t*14))*-30,80,50)}
    B31.mat(c,790,60,1020,3,weave);
    if(load>0){c.save();c.globalAlpha=load;c.fillStyle=AL.lg(c,0,560,0,780,[[0,'#b39b6d'],[1,'#7d6a49']]);c.beginPath();c.moveTo(80,780);c.lineTo(260,AL.mix(780,580,load));c.lineTo(820,AL.mix(780,580,load));c.lineTo(1000,780);c.fill();c.fillStyle='#3e4146';c.fillRect(260,AL.mix(780,560,load),560,24);B31.car(c,540,AL.mix(780,560,load),'#e23b2e');c.restore();
      // panah sebaran beban
      const sp=P(t,T(72),T(73)+0.5);if(sp>0){c.strokeStyle=`rgba(255,210,63,${sp})`;c.lineWidth=8;for(const dx of[-1,-.5,0,.5,1]){c.beginPath();c.moveTo(540,640);c.lineTo(540+dx*420*sp,880);c.stroke()}}}
    // sepatu salju
    const sn=P(t,T(74),T(74)+0.4)*(1-P(t,T(80),T(80)+0.3));if(sn>0){c.setTransform(1,0,0,1,0,0);c.globalAlpha=sn;c.fillStyle='rgba(20,20,24,.9)';AL.rrect(c,620,500,400,300,24);c.fill();c.fillStyle='#f4f6f8';c.fillRect(640,700,360,80);
      c.fillStyle='#3a2f22';AL.rrect(c,670,630+20*Math.sin(t*3),60,100,14);c.fill();c.fillStyle='#8a5a3a';c.fillRect(870,690,110,14);c.fillStyle='#3a2f22';AL.rrect(c,895,600,60,92,14);c.fill();AL.text(c,'TANPA',700,540,{size:26,color:'#ff8a96'});AL.text(c,'SEPATU SALJU',925,540,{size:26,color:'#3ddc84'});c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);
    const L=(txt,w0,w1,col)=>{const a=P(t,T(w0),T(w0)+0.4)*(1-P(t,T(w1),T(w1)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,txt,540,1140,{size:36,pill:true,color:col});c.globalAlpha=1}};
    L('MATRAS BAMBU BERLAPIS',58,64,'#ffd23f');L('+ TIANG BAMBU (CERUCUK)',64,68,'#ffd23f');L('MENGAPUNG & SEBAR BEBAN',68,80,'#3ddc84');L('TERENDAM LUMPUR = AWET',80,999,'#7cc8ff');
    return}
  if(v==='pvd'){AL.cam(c,540,860,1);AL.sky(c,'#9cc6e6','#dceef8',-800,760);
    const dry=sm(P(t,T(92),T(98)));B31.mud(c,t,780+30*dry,{top:dry>.5?'#5e4e3a':'#6b5a43'});
    for(let k=0;k<7;k++){const x=140+k*130;const ins=sm(P(t,T(89)+k*0.12,T(89)+k*0.12+0.5));c.fillStyle='#e8e8e8';c.fillRect(x-8,780,16,520*ins);}
    for(let i=0;i<40;i++){const k=i%7;const ph=((t*0.6+AL.r(i,1))%1);const x=140+k*130+(AL.r(i,2)-.5)*12;const y=AL.mix(1250,770,ph);if(t<T(92))continue;c.fillStyle='rgba(90,170,255,.85)';c.beginPath();c.arc(x,y,9,0,6.283);c.fill()}
    c.setTransform(1,0,0,1,0,0);AL.text(c,'SALURAN TEGAK: AIR KELUAR, LUMPUR MEMADAT',540,1140,{size:30,pill:true,color:'#7cc8ff'});
    return}
  if(v==='angka'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#3b2d1a'],[1,'#120c06']]);c.fillRect(-600,-800,2300,3600);
    const n=Math.round(AL.mix(0,6000000,sm(P(t,T(103),T(107)))));
    for(let i=0;i<Math.min(60,Math.floor(n/100000));i++){B31.bamboo(c,140+(i%12)*68,1040-Math.floor(i/12)*30,190+(i%12)*68,1040-Math.floor(i/12)*30,14)}
    c.setTransform(1,0,0,1,0,0);AL.text(c,'± '+n.toLocaleString('id-ID')+' batang',540,640,{size:62,color:'#ffd23f'});
    const m=P(t,T(109),T(109)+0.4);if(m>0){c.globalAlpha=m;AL.text(c,'BIAYA 30–40% LEBIH MURAH',540,1140,{size:40,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    AL.text(c,'Sumber: Bina Marga PUPR',540,760,{size:28,color:'#cfc3ad'});
    return}
};
