// e33 — Ngantuk di mobil gara-gara tombol AC ini?
const D33={};
D33.car=(c,t,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,10,420,24,0,0,6.283);c.fill();
  c.fillStyle=AL.lg(c,0,-260,0,0,[[0,'#3a7bd5'],[1,'#1d4f8f']]);c.beginPath();c.moveTo(-420,-40);c.lineTo(-400,-130);c.lineTo(-250,-150);c.lineTo(-150,-260);c.lineTo(170,-260);c.lineTo(280,-150);c.lineTo(410,-130);c.lineTo(430,-40);c.closePath();c.fill();
  // jendela + penumpang
  c.save();c.beginPath();c.moveTo(-230,-150);c.lineTo(-140,-245);c.lineTo(10,-245);c.lineTo(10,-150);c.closePath();c.moveTo(30,-150);c.lineTo(30,-245);c.lineTo(160,-245);c.lineTo(250,-150);c.closePath();
  c.fillStyle=o.fog?`rgba(170,190,205,${.9})`:'rgba(160,200,230,.85)';c.fill();c.clip();
  [-110,110].forEach((hx,k)=>{const dr=(o.sleepy||0)*(0.5+0.2*Math.sin(t*1.5+k));c.save();c.translate(hx,-150);c.rotate(dr*(k?1:-1)*0.6);c.fillStyle=AL.rg(c,0,-50,4,40,[[0,'#e8b08a'],[1,'#b97a55']]);c.beginPath();c.arc(0,-50,36,0,6.283);c.fill();c.fillStyle='#2a1c14';c.beginPath();c.arc(0,-62,36,Math.PI,0);c.fill();c.restore()});
  if(o.co2>0){for(let i=0;i<Math.round(40*o.co2);i++){c.fillStyle='rgba(110,110,120,.75)';c.beginPath();c.arc(-220+AL.r(i,1)*460+Math.sin(t+i)*8,-240+AL.r(i,2)*90+Math.cos(t*1.3+i)*6,7,0,6.283);c.fill()}}
  c.restore();
  c.fillStyle='#111';for(const wx of[-250,250]){c.beginPath();c.arc(wx,-30,62,0,6.283);c.fill();c.fillStyle='#9aa0a6';c.beginPath();c.arc(wx,-30,30,0,6.283);c.fill();c.fillStyle='#111'}
  c.fillStyle='#ffe9a8';c.fillRect(395,-110,24,20);c.fillStyle='#ff4d5e';c.fillRect(-425,-110,16,20);c.restore()};
D33.button=(c,x,y,on,mode)=>{c.save();c.translate(x,y);c.fillStyle='#1c1d21';AL.rrect(c,-120,-80,240,160,30);c.fill();c.fillStyle=on?'#3ddc84':'#444';c.fillRect(-30,-64,60,8);
  c.strokeStyle='#fff';c.lineWidth=8;c.beginPath();if(mode==='dalam'){c.ellipse(0,10,62,30,0,0.4,5.9);c.stroke();c.beginPath();c.moveTo(56,-6);c.lineTo(64,12);c.lineTo(42,14);c.stroke()}else{c.moveTo(-70,30);c.lineTo(0,30);c.quadraticCurveTo(50,30,50,-10);c.stroke();c.beginPath();c.moveTo(36,-6);c.lineTo(50,-22);c.lineTo(64,-6);c.stroke()}
  c.fillStyle='#ccc';AL.rrect(c,-80,24,40,10,4);c.restore()};

ANIM.ac=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  const road=sp=>{AL.sky(c,'#69aee6','#dceef8',-800,900);for(let i=0;i<6;i++){const x=((i*400-t*sp*0.3)%2400+2400)%2400-600;c.fillStyle='#8fb07a';c.beginPath();c.moveTo(x-260,900);c.lineTo(x,700);c.lineTo(x+260,900);c.fill()}
    AL.ground(c,900,'#7fae5a','#3f6a2c');c.fillStyle='#55595e';c.fillRect(-600,1020,2300,240);c.fillStyle='#f4f1e4';for(let i=0;i<12;i++)c.fillRect(((i*260-t*sp)%2600+2600)%2600-600,1130,140,12)};
  if(v==='mobil'){AL.cam(c,540,950,1.3);road(700);
    const sleepy=sm(P(t,T(17),T(19)+0.4));D33.car(c,t,540,1100,1.05,{sleepy});
    if(sleepy>0.3){AL.text(c,'z',440,800-(t*40%80),{size:48,color:'#fff'});AL.text(c,'z',680,780-((t*40+40)%80),{size:40,color:'#fff'})}
    c.setTransform(1,0,0,1,0,0);
    const b=P(t,T(5),T(5)+0.3)*(1-P(t,T(14),T(14)+0.3));if(b>0){c.globalAlpha=b;D33.button(c,540,620,t>T(9),'dalam');AL.text(c,'SIRKULASI DALAM',540,740,{size:32,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    const h=P(t,T(14),T(14)+0.3)*(1-P(t,T(21),T(21)+0.3));if(h>0){c.globalAlpha=h;AL.text(c,'1 JAM KEMUDIAN…',540,620,{size:44,pill:true,color:'#fff'});c.globalAlpha=1}
    const a=P(t,T(21),T(21)+0.4)*(1-P(t,T(26),T(26)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'KATA ORANG: KECAPEKAN',540,620,{size:38,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const d=P(t,T(26),T(26)+0.4);if(d>0){c.globalAlpha=d;AL.text(c,'SENSOR: NAPAS SENDIRI',540,620,{size:38,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='kabin'){AL.cam(c,540,820,1.7);road(300);const co2=sm(P(t,T(55),T(62)+0.5));D33.car(c,t,540,1000,1,{co2});
    // aliran udara melingkar di dalam
    c.save();for(let i=0;i<16;i++){const a=t*1.6+i/16*6.283;const x=540+Math.cos(a)*190,y=880+Math.sin(a)*45;c.fillStyle='rgba(124,200,255,.9)';c.beginPath();c.arc(x,y,7,0,6.283);c.fill()}c.restore();
    // udara luar tertahan
    if(t<T(55)){for(let i=0;i<8;i++){const ph=(t*.8+i/8)%1;const x=AL.mix(150,300,ph);c.fillStyle='rgba(124,200,255,.5)';c.beginPath();c.arc(x,820+i*10,6,0,6.283);c.fill()}c.strokeStyle='#ff4d5e';c.lineWidth=8;c.beginPath();c.moveTo(300,790);c.lineTo(330,860);c.moveTo(330,790);c.lineTo(300,860);c.stroke()}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(44),T(44)+0.4)*(1-P(t,T(55),T(55)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'UDARA YANG SAMA DIPUTAR',540,1140,{size:38,pill:true,color:'#7cc8ff'});c.globalAlpha=1}
    const b=P(t,T(55),T(55)+0.4)*(1-P(t,T(63),T(63)+0.3));if(b>0){c.globalAlpha=b;AL.text(c,'TIAP NAPAS = CO₂ NUMPUK',540,1140,{size:38,pill:true,color:'#cfd2d8'});c.globalAlpha=1}
    const o=P(t,T(63),T(63)+0.4);if(o>0){c.globalAlpha=o;AL.text(c,'UDARA LUAR ± 400 ppm',540,1140,{size:38,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='grafik'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#1d2a3f'],[1,'#080c14']]);c.fillRect(-600,-800,2300,3600);
    const k=sm(P(t,T(76),T(85)));const ppm=Math.round(AL.mix(400,2000,k));const gx0=120,gx1=960,gy0=1080,gy1=620;
    c.strokeStyle='rgba(255,255,255,.3)';c.lineWidth=3;c.beginPath();c.moveTo(gx0,gy1);c.lineTo(gx0,gy0);c.lineTo(gx1,gy0);c.stroke();
    c.strokeStyle=ppm>1500?'#ff4d5e':ppm>1000?'#ffd23f':'#3ddc84';c.lineWidth=10;c.beginPath();for(let u=0;u<=k;u+=0.01){const x=AL.mix(gx0,gx1,u),y=AL.mix(gy0-60,gy1,Math.pow(u,0.8));u?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
    c.setTransform(1,0,0,1,0,0);AL.text(c,ppm+' ppm',740,560,{size:60,pill:true,color:ppm>1500?'#ff8a96':'#fff'});AL.text(c,Math.round(20*k)+' menit · 4 orang',300,1140,{size:32,pill:true});
    const sy=P(t,T(89),T(89)+0.3);if(sy>0){['SUSAH FOKUS','PUSING','NGANTUK'].forEach((w,i)=>{const a=P(t,T([92,93,95][i]),T([92,93,95][i])+0.3);if(a>0){c.globalAlpha=a;AL.text(c,w,780,760+i*90,{size:36,pill:true,color:'#ff8a96'});c.globalAlpha=1}})}
    return}
  if(v==='solusi'){AL.cam(c,540,950,1.3);road(700);const fresh=sm(P(t,T(106),T(108)));
    D33.car(c,t,540,1100,1.05,{co2:1-fresh});
    if(fresh>0){for(let i=0;i<10;i++){const ph=(t*.9+i/10)%1;c.fillStyle='rgba(124,200,255,.9)';c.beginPath();c.arc(AL.mix(1000,700,ph),900+i*6,8,0,6.283);c.fill();c.fillStyle='rgba(110,110,120,.8)';c.beginPath();c.arc(AL.mix(200,-100,ph),900+i*6,8,0,6.283);c.fill()}}
    c.setTransform(1,0,0,1,0,0);
    D33.button(c,380,640,fresh<0.5,'dalam');D33.button(c,700,640,fresh>=0.5,'luar');AL.text(c,'DALAM',380,760,{size:28,color:'#fff'});AL.text(c,'LUAR',700,760,{size:28,color:'#fff'});
    const lab=t<T(105)?'DALAM: SEBENTAR BUAT DINGIN':'LALU PINDAH KE UDARA LUAR';AL.text(c,lab,540,1180-40,{size:36,pill:true,color:t<T(105)?'#7cc8ff':'#3ddc84'});
    return}
};
