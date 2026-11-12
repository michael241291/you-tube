// e37 — Motor baru kok nggak ada selah?
const K37={};
K37.scooter=(c,t,x,y,s,o={})=>{c.save();c.translate(x,y);c.scale(s,s);
  c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(0,10,330,22,0,0,6.283);c.fill();
  for(const wx of[-220,230]){c.fillStyle='#151515';c.beginPath();c.arc(wx,-70,80,0,6.283);c.fill();c.fillStyle='#9aa0a6';c.beginPath();c.arc(wx,-70,44,0,6.283);c.fill();c.fillStyle='#555';for(let k=0;k<5;k++){const a=(o.spin||0)+k*1.256;c.fillRect(wx+Math.cos(a)*30-4,-70+Math.sin(a)*30-4,8,8)}}
  // bodi
  c.fillStyle=AL.lg(c,0,-330,0,-60,[[0,'#f2f2f2'],[1,'#bfc4c9']]);c.beginPath();c.moveTo(-300,-120);c.quadraticCurveTo(-320,-260,-150,-280);c.lineTo(40,-280);c.quadraticCurveTo(60,-150,140,-140);c.lineTo(200,-160);c.lineTo(230,-330);c.lineTo(290,-340);c.quadraticCurveTo(300,-180,260,-110);c.lineTo(-100,-90);c.closePath();c.fill();
  c.fillStyle='#d6272f';c.beginPath();c.moveTo(-290,-170);c.lineTo(20,-200);c.lineTo(30,-180);c.lineTo(-285,-150);c.fill();
  c.fillStyle='#1b1b1b';AL.rrect(c,-260,-320,280,50,24);c.fill();
  c.strokeStyle='#333';c.lineWidth=14;c.beginPath();c.moveTo(270,-330);c.lineTo(250,-420);c.stroke();c.lineWidth=10;c.beginPath();c.moveTo(210,-420);c.lineTo(300,-430);c.stroke();
  c.fillStyle='#ffe9a8';c.beginPath();c.ellipse(292,-300,16,26,0,0,6.283);c.fill();
  // mesin + knalpot
  c.fillStyle='#4a4f55';AL.rrect(c,-200,-150,200,70,20);c.fill();c.fillStyle=AL.lg(c,0,-110,0,-80,[[0,'#c9ccd0'],[1,'#6f7378']]);AL.rrect(c,-330,-120,200,34,16);c.fill();
  // selah (kick starter)
  if((o.kick??0)>0){c.save();c.globalAlpha=o.kick;c.translate(-90,-120);c.rotate(o.kickRot||0.9);c.fillStyle='#222';AL.rrect(c,-8,0,16,110,8);c.fill();AL.rrect(c,-30,100,46,16,6);c.fill();c.restore()}
  c.restore()};
K37.bubble=(c,x,y,txt,a,col='#fff')=>{if(a<=0)return;c.save();c.globalAlpha=a;c.font='800 32px Poppins';const w=c.measureText(txt).width+50;c.fillStyle='#fff';AL.rrect(c,x-w/2,y-40,w,80,30);c.fill();c.beginPath();c.moveTo(x-20,y+38);c.lineTo(x-40,y+70);c.lineTo(x+10,y+38);c.fill();c.fillStyle='#222';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,x,y+2);c.restore()};
K37.battery=(c,x,y,lvl,col)=>{c.save();c.fillStyle='#222';AL.rrect(c,x-70,y-40,140,80,12);c.fill();c.fillRect(x-40,y-54,22,16);c.fillRect(x+18,y-54,22,16);c.fillStyle=col;c.fillRect(x-60,y-30,120*lvl,60);c.restore()};

ANIM.selah=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  const garage=()=>{c.fillStyle=AL.lg(c,0,0,0,1920,[[0,'#d9d3c7'],[1,'#a39b8c']]);c.fillRect(-600,-800,2300,3600);c.fillStyle='#7c776e';c.fillRect(-600,1080,2300,900);c.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<5;i++)c.fillRect(-100+i*300,1150,200,12)};
  if(v==='parkir'){AL.cam(c,540,860,1);garage();
    K37.scooter(c,t,540,1080,1.15,{kick:0});
    // kaki mencari selah
    const seek=P(t,T(0),T(9));if(seek>0&&t<T(9)){const k=Math.sin(t*5);c.save();c.translate(420,880);c.rotate(0.6+0.35*k);c.fillStyle='#2d3a4f';AL.rrect(c,-20,0,40,190,18);c.fill();c.fillStyle='#222';AL.rrect(c,-24,180,70,30,12);c.fill();c.restore();AL.text(c,'?',360,820,{size:90,color:'#ff5c6c'})}
    K37.bubble(c,300,560,'Pabrik pelit!',P(t,T(10),T(10)+0.3)*(1-P(t,T(21),T(21)+0.3)));
    K37.bubble(c,760,660,'Aki tekor, ke bengkel deh',P(t,T(13),T(13)+0.3)*(1-P(t,T(21),T(21)+0.3)));
    if(t>T(14)&&t<T(21))K37.battery(c,820,900,0.1+0.05*Math.sin(t*8),'#ff4d5e');
    c.setTransform(1,0,0,1,0,0);const h=P(t,T(21),T(21)+0.4);if(h>0){c.globalAlpha=h;AL.text(c,'KATA HONDA: DARI PEMAKAINYA',540,1140,{size:36,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    else if(t<T(9))AL.text(c,'SELAHNYA MANA?',540,1140,{size:40,pill:true,color:'#ffd23f'});
    return}
  if(v==='survei'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#1d3a2f'],[1,'#07130e']]);c.fillRect(-600,-800,2300,3600);
    const g=sm(P(t,T(39),T(44)));const x0=140,y0=1000;
    c.fillStyle='rgba(255,255,255,.3)';c.fillRect(x0,y0,800,4);
    c.fillStyle='#3ddc84';c.fillRect(x0+60,y0-AL.mix(0,420,g),300,AL.mix(0,420,g));c.fillStyle='#ff5c6c';c.fillRect(x0+460,y0-AL.mix(0,30,g),300,AL.mix(0,30,g));
    AL.text(c,'TOMBOL STARTER',x0+210,y0+50,{size:28,color:'#fff'});AL.text(c,'SELAH',x0+610,y0+50,{size:28,color:'#fff'});
    if(g>0.6)AL.text(c,'HAMPIR NGGAK PERNAH',x0+610,y0-110,{size:28,pill:true,color:'#ff8a96'});
    // selah dihapus
    const del=P(t,T(50),T(52));if(del>0){c.save();c.translate(860,640);c.globalAlpha=1-del*0.6;c.rotate(0.9);c.fillStyle='#ddd';AL.rrect(c,-10,0,20,140,8);c.fill();c.restore();c.strokeStyle=`rgba(255,77,94,${del})`;c.lineWidth=14;c.beginPath();c.moveTo(780,600);c.lineTo(940,780);c.moveTo(940,600);c.lineTo(780,780);c.stroke()}
    c.setTransform(1,0,0,1,0,0);AL.text(c,'SURVEI AHM: PEMILIK MATIC PREMIUM',540,540,{size:32,pill:true,color:'#fff'});
    if(del>0.3)AL.text(c,'FITUR SELAH DIHAPUS',540,1140,{size:38,pill:true,color:'#ff8a96'});
    return}
  if(v==='acg'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#2b2f36'],[1,'#0b0d10']]);c.fillRect(-600,-800,2300,3600);
    const press=P(t,T(54),T(55)),run=P(t,T(67),T(68));const spin=t>T(55)?(t-T(55))*12:0;
    // poros engkol + ACG
    c.fillStyle='#6f757c';c.fillRect(120,800,840,40);
    c.save();c.translate(540,820);c.rotate(spin);c.fillStyle=AL.rg(c,0,0,40,220,[[0,'#9aa0a6'],[1,'#4a4f55']]);c.beginPath();c.arc(0,0,220,0,6.283);c.fill();
    for(let k=0;k<12;k++){c.rotate(Math.PI/6);c.fillStyle=k%2?'#d6272f':'#1f6fbf';c.fillRect(150,-24,60,48)}c.restore();
    c.fillStyle='#c98a3e';for(let k=0;k<16;k++){const a=k/16*6.283;c.fillRect(540+Math.cos(a)*120-10,820+Math.sin(a)*120-10,20,20)}
    // aliran listrik ke/dari aki
    K37.battery(c,880,560,0.8,'#3ddc84');
    if(t>T(55)){c.strokeStyle='#ffd23f';c.lineWidth=6;c.setLineDash([16,10]);c.lineDashOffset=(t>T(60)?1:-1)*t*80;c.beginPath();c.moveTo(800,560);c.quadraticCurveTo(600,560,600,640);c.stroke();c.setLineDash([])}
    c.setTransform(1,0,0,1,0,0);
    if(t>T(54)&&t<T(60))AL.text(c,'TOMBOL STARTER DITEKAN',540,1140,{size:36,pill:true,color:'#ffd23f'});
    if(t>T(60)&&t<T(67))AL.text(c,'DINAMO = STARTER SEKALIGUS PENGISI AKI',540,1140,{size:30,pill:true,color:'#3ddc84'});
    if(t>T(67)){AL.text(c,'TANPA GIGI → NYALA HALUS',540,1140,{size:36,pill:true,color:'#3ddc84'})}
    AL.text(c,'STARTER ACG',300,560,{size:36,pill:true,color:'#fff'});
    return}
  if(v==='volt'){AL.cam(c,540,860,1);c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#1d2a3f'],[1,'#080c14']]);c.fillRect(-600,-800,2300,3600);
    let V=12.0;if(t>T(85))V=AL.mix(12,11.6,sm(P(t,T(85),T(89))));if(t>T(103))V=AL.mix(11.6,11.0,sm(P(t,T(103),T(106))));
    // panel speedometer
    c.fillStyle='#111';AL.rrect(c,120,600,840,420,60);c.fill();c.fillStyle='#0f2a22';AL.rrect(c,160,640,760,340,40);c.fill();
    AL.text(c,'0 km/jam',360,720,{size:44,color:'#7cfcb6'});
    const red=V<11.75;const blink=red&&Math.sin(t*8)>0;
    c.save();c.translate(300,880);c.fillStyle=red?(blink?'#ff3b30':'#5a1a18'):'#2e5a48';AL.rrect(c,-60,-30,120,60,10);c.fill();c.fillRect(-36,-42,16,12);c.fillRect(20,-42,16,12);c.restore();
    AL.text(c,V.toFixed(1).replace('.',',')+' V',650,880,{size:80,color:V>11.75?'#7cfcb6':V>11.2?'#ffd23f':'#ff5c6c'});
    // ISS off
    if(t>T(98)){c.fillStyle='rgba(255,210,63,.9)';AL.rrect(c,620,690,280,56,28);c.fill();AL.text(c,'IDLING STOP: OFF',760,718,{size:26,color:'#111'})}
    c.setTransform(1,0,0,1,0,0);
    let lab='NORMAL ± 12 V',col='#3ddc84';if(t>T(85)){lab='11,6 V: LAMPU AKI MERAH, MASIH HIDUP';col='#ffd23f'}if(t>T(103)){lab='11 V: NGGAK BISA DISTARTER';col='#ff8a96'}if(t>T(111)){lab='BAWA KE BENGKEL RESMI';col='#ff8a96'}
    if(t>T(78))AL.text(c,lab,540,1140,{size:32,pill:true,color:col});
    if(t<T(80))AL.text(c,'INDIKATOR AKI DI SPEEDOMETER',540,540,{size:34,pill:true});
    return}
};
