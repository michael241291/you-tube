// e23 — Minyak terbakar disiram air. Adegan canvas bergerak (dipanggil tiap frame).
ANIM.wajan=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm;
  const chicken=[[-120,4,34,.3],[-30,10,30,-.2],[60,2,36,.5],[150,8,28,0]];
  const view=s.view;

  /* ===== 1. DAPUR: api menyala, disiram, bola api ===== */
  if(view==='dapur1'){
    const pour0=T(11),pour1=T(13);const hit=T(14)+0.25;
    const fb=P(t,hit,hit+0.5);const fbDecay=P(t,hit+1.6,T(21));
    let z=AL.mix(1.0,1.22,sm(P(t,0,T(9))));z=AL.mix(z,0.82,sm(P(t,hit,hit+0.6)));
    const [sx,sy]=AL.shake(t,26*fb*(1-0.6*fbDecay));
    AL.cam(c,540+sx,830+sy-40*fb,z);
    const fireI=sm(P(t,T(7)-0.1,T(8)+0.3));
    AL.kitchen(c,{warm:fireI*0.6+fb*1.2});
    AL.stove(c,{t,gas:1});
    const wk=AL.wok(c,{t,chicken,hot:fb*0.6});
    // api biasa
    AL.fire(c,t,{x0:wk.L+70,x1:wk.R-70,base:wk.base,h:300,I:fireI*(1-0.3*fb)+P(t,T(21),T(26))*0.5,n:80});
    AL.smoke(c,t,{x:540,y:560,w:200,h:500,n:16,a:.18*fireI,r:50});
    // gayung datang & tuang
    const inA=sm(P(t,T(10),pour0+0.2)),outA=sm(P(t,hit+0.2,hit+1.0));
    if(inA>0&&outA<1){const x=AL.mix(1350,830,inA)+outA*500,y=AL.mix(660,600,inA)-outA*200;const rot=-1.05*sm(P(t,pour0+0.3,pour1+0.1));
      AL.dipper(c,x,y,rot);const lip=[x-70*Math.cos(rot)+60*Math.sin(rot),y-70*Math.sin(rot)-60*Math.cos(rot)];
      AL.waterStream(c,t,lip[0]-20,lip[1]+10,620,wk.ry,P(t,pour1-0.1,pour1+0.2)*(1-P(t,hit+0.05,hit+0.3)))}
    // BOLA API
    if(fb>0){const g=1-fbDecay*0.55;
      AL.fire(c,t,{x0:wk.L-80,x1:wk.R+80,base:x=>wk.ry,h:1050*g,I:1.5*fb*g,n:140,size:200*g,speed:1.6,seed:300});
      const rr=AL.mix(80,620,sm(fb))*g;const cy=wk.ry-AL.mix(60,420,sm(fb));c.save();c.globalCompositeOperation='lighter';
      c.fillStyle=AL.rg(c,540,cy,rr*.1,rr,[[0,`rgba(255,240,190,${.9*g})`],[.45,`rgba(255,150,40,${.6*g})`],[1,'rgba(255,60,0,0)']]);c.beginPath();c.arc(540,cy,rr,0,6.283);c.fill();
      // tetesan minyak terbakar terlempar
      for(let i=0;i<40;i++){const el=t-hit;if(el<0)break;const a=-Math.PI/2+(AL.r(i,1)-.5)*2.4;const v=600+700*AL.r(i,2);const x=540+Math.cos(a)*v*el,y=wk.ry+Math.sin(a)*v*el+500*el*el;const r=10+12*AL.r(i,3);
        if(el>2.2)break;c.fillStyle=AL.rg(c,x,y,0,r*2.2,[[0,'rgba(255,230,150,.95)'],[1,'rgba(255,90,0,0)']]);c.beginPath();c.arc(x,y,r*2.2,0,6.283);c.fill()}
      c.restore();AL.smoke(c,t,{x:540,y:420,w:700,h:600,n:26,a:.35*fb*g,r:120,seed:90,col:'40,32,30'})}
    // flash merah ke kamera saat bahaya
    c.setTransform(1,0,0,1,0,0);if(fb>0){c.fillStyle=`rgba(255,120,40,${.25*fb*(1-fbDecay)})`;c.fillRect(0,0,1080,1920)}
    return}

  /* ===== 2. POTONGAN WAJAN ===== */
  if(view==='potong'){
    const CX=540,CY=600,R=440,OY=700;
    const z=AL.mix(1.35,1,sm(P(t,T(27),T(33))));
    const erupt=P(t,T(73),T(73)+0.6),eDecay=P(t,T(79),T(83));
    const [sx,sy]=AL.shake(t,22*erupt*(1-eDecay*0.5));
    AL.cam(c,540+sx,820+sy,z);
    // latar gelap hangat
    c.fillStyle=AL.rg(c,540,700,50,1100,[[0,'#3b2414'],[1,'#0d0806']]);c.fillRect(-800,-800,2700,3500);
    // tetes air & uap
    const drop0=T(39),hitS=T(41),bot=T(45);const flash=P(t,T(59),T(63)),big=sm(P(t,T(66),T(72)));
    const bulge=AL.mix(0,120,big)*(1-erupt);
    const surf=x=>OY-bulge*Math.exp(-Math.pow((x-CX)/180,2))+Math.sin(x*.02+t*3)*4*(1+erupt*4)-erupt*60*Math.exp(-Math.pow((x-CX)/220,2));
    // api di atas permukaan
    const heatI=1+0.25*P(t,T(50),T(57))+1.6*erupt*(1-eDecay*0.4);
    // minyak (clip mangkuk)
    c.save();c.beginPath();c.arc(CX,CY,R,0,Math.PI);c.lineTo(CX-R,CY);c.closePath();c.clip();
    c.beginPath();c.moveTo(CX-R,surf(CX-R));for(let x=CX-R;x<=CX+R;x+=10)c.lineTo(x,surf(x));c.lineTo(CX+R,1200);c.lineTo(CX-R,1200);c.closePath();
    c.fillStyle=AL.lg(c,0,OY-120,0,CY+R,[[0,'#ffcf5a'],[.25,'#f0a52a'],[.7,'#c26a12'],[1,'#7a3a08']]);c.fill();
    // arus panas (garis berkilau)
    c.strokeStyle='rgba(255,236,170,.25)';c.lineWidth=5;for(let k=0;k<7;k++){c.beginPath();const yy=OY+40+k*45;for(let x=CX-R;x<=CX+R;x+=20){const y=yy+Math.sin(x*.015+t*2.4+k)*10;x===CX-R?c.moveTo(x,y):c.lineTo(x,y)}c.stroke()}
    // tetes air jatuh -> tenggelam -> genangan
    const fall=P(t,drop0,hitS),sink=sm(P(t,hitS,bot));
    if(t>=drop0&&flash<1){let x=CX-40,y,rx=46,ry=52;
      if(t<hitS){y=AL.mix(330,OY,fall*fall)}else{y=AL.mix(OY+20,CY+R-70,sink);const sq=P(t,bot-0.3,bot+0.3);rx=AL.mix(46,120,sq);ry=AL.mix(52,26,sq)}
      const a=1-flash;c.fillStyle=AL.rg(c,x-14,y-16,4,rx*1.2,[[0,`rgba(225,245,255,${a})`],[.5,`rgba(90,170,255,${a})`],[1,`rgba(30,90,200,${a})`]]);
      c.beginPath();if(t<hitS){c.moveTo(x,y-ry*1.5);c.bezierCurveTo(x+rx,y-ry*.2,x+rx,y+ry,x,y+ry);c.bezierCurveTo(x-rx,y+ry,x-rx,y-ry*.2,x,y-ry*1.5)}else c.ellipse(x,y,rx,ry,0,0,6.283);c.fill();
      c.fillStyle=`rgba(255,255,255,${.7*a})`;c.beginPath();c.ellipse(x-rx*.35,y-ry*.3,rx*.18,ry*.25,-.4,0,6.283);c.fill()}
    // gelembung uap
    if(flash>0){const n=Math.round(10+40*flash);for(let i=0;i<n;i++){const el=Math.max(0,t-T(59)-AL.r(i,1)*1.2);const r=(8+30*AL.r(i,2))*(1+el*0.8);const x=CX-40+(AL.r(i,3)-.5)*240*(1+el*.4);const y=CY+R-70-el*120*AL.r(i,4)-r*.5;
        c.fillStyle=AL.rg(c,x-r*.3,y-r*.3,1,r,[[0,'rgba(255,255,255,.85)'],[.7,'rgba(230,235,240,.45)'],[1,'rgba(255,255,255,.1)']]);c.beginPath();c.arc(x,y,r,0,6.283);c.fill()}}
    if(big>0&&erupt<1){const r=AL.mix(40,330,big);const y=CY+R-60-r*.75;c.fillStyle=AL.rg(c,CX-r*.3,y-r*.3,r*.1,r,[[0,'rgba(255,255,255,.95)'],[.75,'rgba(225,232,240,.75)'],[1,'rgba(200,210,220,.35)']]);c.globalAlpha=1-erupt;c.beginPath();c.arc(CX,y,r,0,6.283);c.fill();c.globalAlpha=1}
    c.restore();
    // logam wajan (potongan)
    c.lineWidth=34;c.strokeStyle=AL.lg(c,0,CY,0,CY+R,[[0,'#9a9ea6'],[.5,'#4b4e55'],[1,'#25272b']]);c.beginPath();c.arc(CX,CY,R+17,-0.05,Math.PI+0.05);c.stroke();
    c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=4;c.beginPath();c.arc(CX,CY,R+3,0.2,Math.PI-0.2);c.stroke();
    // api kompor di bawah
    for(let i=0;i<14;i++){const x=CX-260+i*40;const h=40+14*Math.sin(t*20+i);c.save();c.globalCompositeOperation='lighter';c.fillStyle=AL.rg(c,x,CY+R+60-h*.5,0,h,[[0,'rgba(140,200,255,.9)'],[1,'rgba(40,80,255,0)']]);c.beginPath();c.ellipse(x,CY+R+60-h*.5,9,h,0,0,6.283);c.fill();c.restore()}
    // api di permukaan
    AL.fire(c,t,{x0:CX-R+40,x1:CX+R-40,base:surf,h:260,I:heatI,n:110,seed:10});
    // percikan api + uap menyembur
    if(erupt>0){const el=t-T(73);AL.smoke(c,t,{x:CX,y:OY-20,w:260,h:900,n:30,a:.5*(1-eDecay*0.7),r:90,col:'235,235,240',life:1.2,seed:200});
      c.save();c.globalCompositeOperation='lighter';for(let i=0;i<55;i++){const ph=((el*0.9+AL.r(i,1)))%1;const a=-Math.PI/2+(AL.r(i,2)-.5)*1.5;const v=900+500*AL.r(i,3);const x=CX+Math.cos(a)*v*ph,y=OY+Math.sin(a)*v*ph+700*ph*ph;const r=12+10*AL.r(i,4);
        c.fillStyle=AL.rg(c,x,y,0,r*2.5,[[0,'rgba(255,235,160,.95)'],[.4,'rgba(255,140,30,.7)'],[1,'rgba(255,60,0,0)']]);c.beginPath();c.arc(x,y,r*2.5,0,6.283);c.fill()}c.restore()}
    // termometer
    const th=sm(P(t,T(47),T(47)+0.5))*(1-P(t,T(59),T(59)+0.4));
    if(th>0){c.save();c.globalAlpha=th;const tx=820,ty0=470,ty1=960;c.fillStyle='rgba(255,255,255,.85)';AL.rrect(c,tx-18,ty0,36,ty1-ty0,18);c.fill();c.beginPath();c.arc(tx,ty1,34,0,6.283);c.fill();
      const lvl=AL.mix(0.15,0.92,sm(P(t,T(50),T(54)+0.4)));c.fillStyle='#e8322a';c.beginPath();c.arc(tx,ty1,26,0,6.283);c.fill();c.fillRect(tx-10,AL.mix(ty1,ty0+20,lvl),20,ty1-AL.mix(ty1,ty0+20,lvl));
      const y100=AL.mix(ty1,ty0+20,0.5);c.setLineDash([14,10]);c.strokeStyle='#5ab8ff';c.lineWidth=5;c.beginPath();c.moveTo(150,y100);c.lineTo(tx-24,y100);c.stroke();c.setLineDash([]);
      if(t>T(56))AL.text(c,'100°C  air mendidih',300,y100-36,{size:34,pill:true,color:'#7cc8ff'});
      AL.text(c,Math.round(AL.mix(30,180,sm(P(t,T(50),T(54)+0.4))))+'°C',tx-130,AL.mix(ty1,ty0+20,lvl),{size:46,pill:true,color:'#ffd23f'});c.restore()}
    c.setTransform(1,0,0,1,0,0);
    // keterangan di bawah mangkuk
    const d1=P(t,T(34),T(34)+0.4)*(1-P(t,T(47)-0.3,T(47)));
    if(d1>0){c.globalAlpha=d1;AL.text(c,'AIR 1,0 kg/L  >  MINYAK ±0,9 kg/L',540,1150,{size:36,pill:true,color:'#fff'});c.globalAlpha=1}
    const d2=P(t,T(68),T(68)+0.4)*(1-P(t,T(75),T(76)));
    if(d2>0){c.globalAlpha=d2;AL.text(c,'1 tetes air  →  ±1.700× jadi uap',540,1150,{size:38,pill:true,color:'#fff'});c.globalAlpha=1}
    if(flash>0&&flash<1){c.fillStyle=`rgba(255,255,255,${.5*Math.sin(flash*Math.PI)})`;c.fillRect(0,0,1080,1920)}
    return}

  /* ===== 3. BOLA API DI DAPUR ===== */
  if(view==='ledak'){
    const el=lt;const fb=P(el,0,0.45),dec=P(t,T(86),T(88));
    const [sx,sy]=AL.shake(t,30*(1-dec*0.7));AL.cam(c,540+sx,760+sy,0.8);
    AL.kitchen(c,{warm:1.4-dec*0.5});AL.stove(c,{t});const wk=AL.wok(c,{t,chicken,hot:1});
    const g=1-dec*0.5;
    AL.fire(c,t,{x0:wk.L-120,x1:wk.R+120,base:x=>wk.ry,h:1200*g,I:1.7*fb*g,n:160,size:230*g,speed:1.5,seed:500});
    c.save();c.globalCompositeOperation='lighter';const rr=AL.mix(150,700,sm(fb))*g;const cy=wk.ry-AL.mix(100,520,sm(fb));
    c.fillStyle=AL.rg(c,540,cy,rr*.1,rr,[[0,'rgba(255,245,200,.9)'],[.5,'rgba(255,140,30,.55)'],[1,'rgba(255,50,0,0)']]);c.beginPath();c.arc(540,cy,rr,0,6.283);c.fill();c.restore();
    AL.smoke(c,t,{x:540,y:330,w:900,h:500,n:30,a:.45,r:150,seed:700,col:'35,28,26'});
    c.setTransform(1,0,0,1,0,0);c.fillStyle=`rgba(255,110,30,${.18*(1-dec)})`;c.fillRect(0,0,1080,1920);return}

  /* ===== 4. CARA YANG BENAR ===== */
  if(view==='benar'){
    const kn0=T(98),kn1=T(99)+0.3,lid0=T(101)-0.2,lid1=T(103)+0.1,cool0=T(112);
    const toKnob=sm(P(t,kn0-0.3,kn0+0.3))*(1-sm(P(t,T(100)-0.1,T(100)+0.4)));
    const cx=AL.mix(540,760,toKnob),cy=AL.mix(820,1000,toKnob),z=AL.mix(1.3,1.9,toKnob);AL.cam(c,cx,cy,z);
    const gas=1-P(t,kn1-0.2,kn1+0.2);const lidP=sm(P(t,lid0,lid1));const fireI=1-sm(P(t,lid1-0.1,lid1+1.3));const hot=1-P(t,cool0,T(116));
    AL.kitchen(c,{warm:0.55*fireI});AL.stove(c,{t,gas,knob:-1.7*sm(P(t,kn0,kn1))});
    const wk=AL.wok(c,{t,chicken:lidP>0.95?[]:chicken,oil:lidP<0.95,hot:0.5*hot});
    // aliran udara ke api
    const air=P(t,T(88),T(88)+0.5)*(1-P(t,T(97),T(98)));
    if(air>0){c.save();c.globalAlpha=air;for(const side of[-1,1]){for(let i=0;i<14;i++){const ph=((t*0.7+AL.r(i,side+3))%1);const x=540+side*AL.mix(520,120,ph);const y=AL.mix(560,820,ph)+Math.sin(ph*6+i)*20;c.fillStyle=AL.rg(c,x,y,0,22,[[0,'rgba(170,225,255,.9)'],[1,'rgba(120,190,255,0)']]);c.beginPath();c.arc(x,y,22,0,6.283);c.fill()}
      AL.text(c,'O₂',540+side*380,560,{size:56,color:'#9fd8ff'})}c.restore()}
    // api (di bawah tutup)
    AL.fire(c,t,{x0:wk.L+70,x1:wk.R-70,base:wk.base,h:320*(1-lidP*0.75),I:fireI,n:80});
    if(lidP>0){const y=AL.mix(300,wk.ry+4,lidP);AL.lid(c,540,y,wk.R-wk.L+30);
      if(lidP>=1)AL.smoke(c,t,{x:540,y:wk.ry-10,w:520,h:280,n:14,a:.22*(1-P(t,T(112),T(116))),r:40,seed:900,col:'90,85,85'})}
    // tangan memutar kenop
    if(toKnob>0.05){const a=-1.7*sm(P(t,kn0,kn1));c.save();c.translate(760,1030);c.rotate(a);c.fillStyle='#d79a72';c.beginPath();c.ellipse(0,-58,20,36,0,0,6.283);c.fill();c.beginPath();c.ellipse(34,-40,18,32,.5,0,6.283);c.fill();c.restore()}
    // kain basah
    const tw=P(t,T(107),T(107)+0.4);if(tw>0){c.save();c.globalAlpha=tw;c.translate(900,930);c.fillStyle=AL.lg(c,-80,0,80,0,[[0,'#4f7ea8'],[1,'#2d5577']]);AL.rrect(c,-80,-60,160,120,18);c.fill();
      c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=4;for(let k=0;k<4;k++){c.beginPath();c.moveTo(-70,-40+k*26);c.lineTo(70,-40+k*26);c.stroke()}
      for(let i=0;i<4;i++){const ph=(t*1.2+i*.25)%1;c.fillStyle='rgba(150,210,255,.9)';c.beginPath();c.arc(-50+i*33,60+ph*70,7,0,6.283);c.fill()}c.restore()}
    // jam tunggu
    const ck=P(t,cool0,cool0+0.4);if(ck>0){c.setTransform(1,0,0,1,0,0);c.save();c.globalAlpha=ck;const X=860,Y=640,r=70;c.fillStyle='rgba(20,20,24,.9)';c.beginPath();c.arc(X,Y,r+14,0,6.283);c.fill();
      c.strokeStyle='#3ddc84';c.lineWidth=14;c.beginPath();c.arc(X,Y,r-6,-Math.PI/2,-Math.PI/2+6.283*P(t,cool0,T(117)));c.stroke();
      c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(X,Y);const ha=-Math.PI/2+t*4;c.lineTo(X+Math.cos(ha)*44,Y+Math.sin(ha)*44);c.stroke();c.restore()}
    return}
};
