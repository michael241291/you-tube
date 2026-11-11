// e28 — Pesawat 900 km/jam kok terasa diam?
const A28={};
A28.plane=(c,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s*(o.flip?-1:1),s);c.rotate(o.rot||0);
  c.fillStyle=AL.lg(c,0,-60,0,60,[[0,'#ffffff'],[1,'#c9d1d8']]);c.beginPath();c.moveTo(-420,-30);c.lineTo(330,-46);c.bezierCurveTo(430,-44,470,0,430,30);c.lineTo(-400,34);c.quadraticCurveTo(-440,0,-420,-30);c.fill();
  c.fillStyle='#1f6fbf';c.beginPath();c.moveTo(-330,-30);c.lineTo(-430,-190);c.lineTo(-360,-190);c.lineTo(-240,-36);c.fill();
  c.fillStyle='#b9c2ca';c.beginPath();c.moveTo(-40,10);c.lineTo(-200,130);c.lineTo(-120,130);c.lineTo(80,14);c.fill();
  c.fillStyle='#2a3b4c';for(let i=0;i<14;i++)c.fillRect(-280+i*44,-18,18,16);c.fillStyle='#1e2a36';c.beginPath();c.moveTo(380,-30);c.lineTo(420,-20);c.lineTo(400,-6);c.lineTo(370,-12);c.fill();
  c.fillStyle='#1f6fbf';c.fillRect(-400,8,780,8);c.restore()};

ANIM.pesawat=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  if(v==='kabin'){AL.cam(c,540,860,1);
    // dinding kabin
    c.fillStyle=AL.lg(c,0,0,1080,0,[[0,'#d9d6cf'],[1,'#b9b5ac']]);c.fillRect(-600,-800,2300,3600);
    c.save();c.beginPath();c.ellipse(540,830,250,340,0,0,6.283);c.clip();
    AL.sky(c,'#3d7fd1','#bfe0f7',400,1200);AL.clouds(c,t,{y:1050,n:9,s:160,v:12,h:80});c.fillStyle='rgba(120,150,110,.5)';c.fillRect(0,1120,1080,200);c.restore();
    c.strokeStyle='#efece6';c.lineWidth=40;c.beginPath();c.ellipse(540,830,270,360,0,0,6.283);c.stroke();c.strokeStyle='rgba(0,0,0,.15)';c.lineWidth=6;c.beginPath();c.ellipse(540,830,292,382,0,0,6.283);c.stroke();
    c.setTransform(1,0,0,1,0,0);
    const n=Math.round(AL.mix(0,900,sm(P(t,T(16),T(20)))));if(t>T(15)){AL.text(c,n+' km/jam',540,1140,{size:56,pill:true,color:'#ffd23f'})}
    const q=P(t,T(24),T(24)+0.4);if(q>0){c.globalAlpha=q;AL.text(c,'KOK NGGAK KERASA?',540,560,{size:42,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    return}
  if(v==='motor'){AL.cam(c,540,860,1);AL.sky(c,'#69aee6','#dceef8',-800,900);AL.ground(c,900,'#7fae5a','#3f6a2c');
    c.fillStyle='#55595e';c.beginPath();c.moveTo(500,900);c.lineTo(580,900);c.lineTo(1400,1920);c.lineTo(-320,1920);c.fill();
    // pohon jauh (lambat) & dekat (cepat)
    for(let i=0;i<8;i++){const x=((i*170-t*40)%1360+1360)%1360-140;AL.tree(c,x,900,90,t,2)}
    for(let i=0;i<5;i++){const ph=((i/5+t*0.9)%1);const k=ph*ph;const x=AL.mix(470,-500,k),y=AL.mix(900,1900,k);AL.tree(c,x,y,AL.mix(80,1000,k),t,2);const x2=AL.mix(610,1580,k);AL.tree(c,x2,y,AL.mix(80,1000,k),t,2)}
    c.setTransform(1,0,0,1,0,0);c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=5;for(let i=0;i<10;i++){const y=AL.r(i,1)*1000+500;const x=((AL.r(i,2)*1080-t*1500)%1080+1080)%1080;c.beginPath();c.moveTo(x,y);c.lineTo(x+120,y);c.stroke()}
    const a=P(t,T(47),T(47)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'PATOKAN DEKAT → TERASA NGEBUT',540,1140,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    else{const b=P(t,T(37),T(37)+0.4);c.globalAlpha=b;AL.text(c,'OTAK BUTUH PATOKAN DEKAT',540,1140,{size:36,pill:true});c.globalAlpha=1}
    return}
  if(v==='langit'){AL.cam(c,540,860,1);AL.sky(c,'#1b4f9c','#9fcdf0',-800,1500);
    // daratan jauh bergerak pelan
    c.fillStyle=AL.lg(c,0,1150,0,1920,[[0,'#8fb07a'],[1,'#56794a']]);c.fillRect(-600,1150,2300,900);
    for(let i=0;i<12;i++){const x=((i*150-t*30)%1800+1800)%1800-300;c.fillStyle='#d9cfbf';c.fillRect(x,1170+AL.r(i,1)*40,24,14)}
    AL.clouds(c,t,{y:1050,n:8,s:130,v:-60,h:60});
    A28.plane(c,520,780,0.9,{});
    c.strokeStyle='#ffd23f';c.lineWidth=6;c.setLineDash([16,12]);c.beginPath();c.moveTo(900,830);c.lineTo(900,1150);c.stroke();c.setLineDash([]);
    const a=P(t,T(57),T(57)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'± 10 km',900,990,{size:44,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);const b=P(t,T(71),T(71)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'DI MATA: GERAKNYA PELAN',540,1140,{size:38,pill:true});c.globalAlpha=1}
    return}
  if(v==='dorong'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,0,1080,0,[[0,'#d9d6cf'],[1,'#b9b5ac']]);c.fillRect(-600,-800,2300,3600);
    const acc=sm(P(t,T(86),T(88)))*(1-sm(P(t,T(92),T(94))));
    // kursi
    c.fillStyle='#2e4a6e';AL.rrect(c,560,560,160,500,40);c.fill();AL.rrect(c,330,960,380,110,30);c.fill();
    // penumpang (samping, condong ke belakang saat akselerasi)
    c.save();c.translate(520,1000);c.rotate(-0.0-0.12*acc);c.translate(-520,-1000);
    c.fillStyle='#e05a3c';AL.rrect(c,470-40*acc,640,140,340,50);c.fill();c.fillStyle=AL.rg(c,520,580,6,70,[[0,'#e8b08a'],[1,'#b97a55']]);c.beginPath();c.arc(540-40*acc,570,70,0,6.283);c.fill();
    c.fillStyle='#2d3a4f';AL.rrect(c,380,960,240,60,24);c.fill();AL.rrect(c,340,960,60,200,24);c.fill();c.restore();
    if(acc>0.05){c.fillStyle=`rgba(255,77,94,${acc})`;c.beginPath();c.moveTo(440,800);c.lineTo(340,740);c.lineTo(340,860);c.fill();c.fillRect(200,780,140,40)}
    // grafik kecepatan
    const gx=120,gy=1140;c.setTransform(1,0,0,1,0,0);
    const spd=AL.mix(0,900,sm(P(t,T(86),T(94))));AL.text(c,'Kecepatan: '+Math.round(spd)+' km/jam',540,520+20,{size:38,pill:true,color:'#ffd23f'});
    const lab=acc>0.3?'BERUBAH → TERASA (TERDORONG)':t>T(94)?'STABIL → SEPERTI DI RUMAH':'TUBUH RASAKAN PERUBAHAN';AL.text(c,lab,540,1140,{size:34,pill:true,color:acc>0.3?'#ff8a96':'#3ddc84'});
    return}
  if(v==='bayang'){AL.cam(c,540,860,1);
    c.fillStyle='#8a9a7a';c.fillRect(-600,-800,2300,3600);
    // kota tampak atas
    for(let gx=-2;gx<8;gx++)for(let gy=-2;gy<12;gy++){const x=gx*200,y=gy*200;c.fillStyle='#5e6268';c.fillRect(x,y,200,40);c.fillRect(x,y,40,200);c.fillStyle=['#c7684d','#d9cbb3','#9fb4c8','#c99a5b'][(gx*3+gy)%4];c.fillRect(x+60,y+60,120,120);c.fillStyle='rgba(0,0,0,.15)';c.fillRect(x+60,y+150,120,30)}
    const k=(Math.max(0,t-T(103)+0.6)*0.42)%1.25;const x=AL.mix(-500,1600,k),y=AL.mix(1500,200,k);
    c.save();c.translate(x,y);c.rotate(-0.9);c.fillStyle='rgba(0,0,0,.45)';c.beginPath();c.ellipse(0,0,60,420,0,0,6.283);c.fill();c.beginPath();c.moveTo(-40,-40);c.lineTo(-380,60);c.lineTo(-380,120);c.lineTo(40,40);c.lineTo(380,120);c.lineTo(380,60);c.lineTo(40,-40);c.fill();c.restore();
    c.setTransform(1,0,0,1,0,0);const a=P(t,T(113),T(113)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'BAYANGAN MELESAT = KECEPATAN ASLI',540,1140,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
};
