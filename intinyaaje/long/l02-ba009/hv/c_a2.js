// BAB 2 — empat mesin mati
window.FADEIN=false;window.FADEOUT=false;
OVER.push(t=>chapterCard(t,0,2,'EMPAT MESIN MATI',3.0));
sc(0,WT(26),'video',(t,lt,s)=>{vign(.5);pill('ASAP ROKOK?',W/2,200,40,'rgba(10,14,22,.82)','#fff',inout(t,WT(7)-.1,WT(18)),'center');pill('BAU BELERANG',W/2,200,44,'#e0b400','#111',inout(t,WT(25)-.1,s.t1),'center')},{clip:'66481'});
sc(WT(26),WT(45),'anim',(t,lt,s)=>{bgDark();const blue=fin(t,WT(38)-.2,.5);const fl=k=>(.55+.45*Math.abs(Math.sin(t*(7+k*2.3)+k)))*blue;
 const gc=[0,1,2,3].map(k=>`rgba(110,180,255,`);plane(W/2,540,540,0,'#e8eef8',[1,1,1,1],0);
 if(blue>0){X.save();X.globalCompositeOperation='lighter';[[-44,17],[-24,6],[24,6],[44,17]].forEach(([ex,ey],k)=>{const x=W/2+ex*5.4,y=540+ey*5.4,r=110*fl(k);const g=X.createRadialGradient(x,y,4,x,y,r);g.addColorStop(0,'rgba(170,215,255,.95)');g.addColorStop(.4,'rgba(90,150,255,.55)');g.addColorStop(1,'rgba(60,100,255,0)');X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,7);X.fill()});X.restore()}
 pill('DILIHAT DARI JENDELA',W/2,170,34,'rgba(10,14,22,.82)','#fff',fin(t,WT(29)-.1));pill('MESIN MENYALA BIRU',W/2,870,40,'#3d7bff','#fff',fin(t,WT(38)-.1))});
sc(WT(45),WT(87),'anim',(t,lt,s)=>{const f=[WT(56),WT(69),WT(73),WT(77)];const order=[3,1,0,2];const eng=[1,1,1,1];order.forEach((k,j)=>{eng[k]=t<f[j]?1:0});const dead=eng.filter(e=>!e).length;
 bgDark(dead===4?1:0);const shake=(f.some(x=>t>x&&t<x+.35))?Math.sin(t*90)*5:0;plane(700+shake,540,520,0,'#e8eef8',eng,1);
 clockPill('20.42 WIB',t,WT(46)-.1,s.t1+1);
 txt('MESIN HIDUP',1200,370,32,'rgba(255,255,255,.7)',{w:700,ls:4,a:fin(t,WT(51)-.2)});txt(`${4-dead} / 4`,1196,500,150,dead===4?RED:(dead?YEL:'#fff'),{a:fin(t,WT(51)-.2)});
 const lab=['','MESIN 4 MATI','MESIN 2 MATI','MESIN 1 MATI','MESIN 3 MATI'][dead];if(dead)pill(lab,1200,660,36,dead===4?RED:'rgba(255,77,77,.25)',dead===4?'#fff':RED,1,'left');
 if(t>WT(84)-.1)txt('KEEMPATNYA.',1200,780,64,RED,{a:fin(t,WT(84)-.1)})});
sc(WT(87),WT(99),'anim',(t,lt,s)=>{bgDark(1);for(let i=0;i<90;i++){const r=Math.sin(i*91.7)*1000,fx=r-Math.floor(r),r2=Math.sin(i*37.1)*1000,fy=r2-Math.floor(r2);X.fillStyle='rgba(255,255,255,.45)';X.fillRect(((fx*W)-lt*40+W*3)%W,fy*H,2,2)}
 sideplane(W/2-100,420+lt*14,1.6,1,0.06);txt('RATUSAN TON',W/2,760,80,'#fff',{al:'center',a:fin(t,WT(89)-.1)});pill('TANPA TENAGA SAMA SEKALI',W/2,860,38,RED,'#fff',fin(t,WT(95)-.1))});
function node(x,y,label,sub,col,a=1){if(a<=0)return;X.save();X.globalAlpha*=a;X.fillStyle='rgba(255,255,255,.06)';X.strokeStyle=col;X.lineWidth=4;X.beginPath();X.roundRect(x-190,y-70,380,140,28);X.fill();X.stroke();X.restore();txt(label,x,y-14,40,'#fff',{al:'center',a});if(sub)txt(sub,x,y+34,24,col,{al:'center',w:700,ls:3,a})}
function wave(x0,y0,x1,y1,t,t0,col,lab){const k=clamp((t-t0)/1.2);if(k<=0)return;for(let i=0;i<3;i++){const kk=clamp(k*1.3-i*.15);if(kk<=0)continue;const x=x0+(x1-x0)*kk,y=y0+(y1-y0)*kk;X.save();X.globalAlpha=1-kk*.5;X.strokeStyle=col;X.lineWidth=5;X.beginPath();X.arc(x,y,24+i*14,-0.9,0.9);X.stroke();X.restore()}if(lab)pill(lab,(x0+x1)/2,(y0+y1)/2-60,34,col,'#111',fin(t,t0))}
sc(WT(99),WT(154),'anim',(t,lt,s)=>{bgDark();const Ax=330,Ay=620,Bx=1590,By=620,Gx=960,Gy=300;
 node(Ax,Ay,'BA 009','747 · 4 MESIN MATI',RED);node(Bx,By,'JAKARTA','LALU LINTAS UDARA',BLU);
 X.save();X.setLineDash([12,14]);X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=3;X.beginPath();X.moveTo(Ax+190,Ay);X.lineTo(Bx-190,By);X.stroke();X.restore();
 wave(Ax+200,Ay,Bx-200,By,t,WT(103),YEL,'MAYDAY');
 if(t>WT(118)-.1){const a=fin(t,WT(118)-.1)*(t<WT(135)?1:.25);X.save();X.globalAlpha=a;for(let i=0;i<60;i++){const x=Ax+260+Math.random()*(Bx-Ax-520),y=Ay-30+Math.random()*60;X.fillStyle='rgba(255,255,255,.5)';X.fillRect(x,y,8,3)}X.restore();if(t<WT(135))pill('GANGGUAN RADIO',W/2,Ay+110,32,'rgba(255,255,255,.12)','#fff',a)}
 if(t>WT(124)-.1)pill('“1 MESIN MATI?”',Bx,By-150,38,'#fff','#111',fin(t,WT(124)-.1));
 if(t>WT(133)-.1)pill('SEBENARNYA: 4 MESIN',Ax,Ay-150,38,RED,'#fff',fin(t,WT(133)-.1));
 const ga=fin(t,WT(137)-.1);if(ga>0){node(Gx,Gy,'PESAWAT GARUDA','DI DEKAT SITU',GRN,ga);X.save();X.globalAlpha=ga;X.setLineDash([10,12]);X.strokeStyle='rgba(93,255,154,.5)';X.lineWidth=3;X.beginPath();X.moveTo(Ax+120,Ay-75);X.lineTo(Gx-150,Gy+75);X.moveTo(Gx+150,Gy+75);X.lineTo(Bx-120,By-75);X.stroke();X.restore();
  wave(Ax+120,Ay-75,Gx-150,Gy+75,t,WT(146),GRN,'');wave(Gx+150,Gy+75,Bx-120,By-75,t,WT(147)+.6,GRN,'')}
 if(t>WT(150)-.1)pill('GAWAT!',Bx,By+150,44,RED,'#fff',fin(t,WT(150)-.1))});
sc(WT(154),WT(164),'anim',(t,lt,s)=>{bgDark();radar(620,520,330,t,[],1);txt('RADAR JAKARTA',1100,400,40,'rgba(255,255,255,.7)',{w:700,ls:5});txt('TIDAK',1096,500,110,RED,{a:fin(t,WT(158)-.1)});txt('TERLIHAT',1096,610,110,RED,{a:fin(t,WT(159)-.1)})});
sc(WT(164),WT(204),'anim',(t,lt,s)=>{bgDark();txt('KAPTEN ERIC MOODY KE PENUMPANG',W/2,200,34,YEL,{al:'center',w:800,ls:4,a:fin(t,WT(165)-.1)});
 const L=['“Selamat malam, ini kapten Anda.','Kita punya sedikit masalah.','Keempat mesin berhenti.','Kami sedang berusaha sekuat tenaga','untuk menyalakannya lagi.”'];const Tm=[WT(182),WT(187),WT(191),WT(194),WT(199)];
 L.forEach((l,k)=>txt(l,W/2,330+k*92,56,k===1&&t>WT(202)-.1?YEL:'#fff',{al:'center',w:700,it:true,a:fin(t,Tm[k]-.15,.4)}));
 if(t<WT(182)-.2)txt('… dengan suara yang luar biasa tenang',W/2,520,48,'rgba(255,255,255,.8)',{al:'center',it:true,a:fin(t,WT(173))});
 if(t>WT(202)-.1)pill('“SEDIKIT” MASALAH?',W/2,850,42,YEL,'#111',fin(t,WT(202)-.1))});
function masks(t,t0){const k=t-t0;for(let r=0;r<2;r++)for(let i=0;i<9;i++){const x=200+i*190+r*95,top=140+r*40;const d=clamp((k-(i*.06+r*.12))/.6);const y=top+ease(d)*(360+r*40)+Math.sin(t*3+i)*6*d;
 X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=3;X.beginPath();X.moveTo(x,top);X.lineTo(x,y);X.stroke();X.fillStyle='#f5c518';X.beginPath();X.ellipse(x,y+26,34,26,0,0,7);X.fill();X.fillStyle='#d9a400';X.beginPath();X.ellipse(x,y+26,22,14,0,0,7);X.fill()}}
sc(WT(204),WT(219),'anim',(t,lt,s)=>{bgDark();X.fillStyle='#0d1322';X.fillRect(0,0,W,140);masks(t,WT(212)-.3);txt('TEKANAN UDARA KABIN TURUN',W/2,800,56,'#fff',{al:'center',a:fin(t,WT(205)-.1)});pill('MASKER OKSIGEN JATUH',W/2,890,36,'#f5c518','#111',fin(t,WT(212)-.1))});
sc(WT(219),WT(247),'anim',(t,lt,s)=>{bgDark(1);const d0=WT(230);const km=11-clamp((t-d0)/14)*1.6;
 pill('MASKER OKSIGEN KOPILOT RUSAK',W/2,170,36,RED,'#fff',fin(t,WT(221)-.1));
 const ang=t>d0?-0.32*fin(t,d0,.8):0;sideplane(620,520+(t>d0?Math.sin(t*2)*6:0),1.5,1,-ang);
 altimeter(1340,470,km,'KETINGGIAN',fin(t,WT(228)-.2),'#fff');pill('TUKIK ± 1,8 KM / MENIT',1340,640,38,YEL,'#111',fin(t,WT(234)-.1));pill('KE UDARA YANG BISA DIHIRUP',1340,740,32,'rgba(255,255,255,.12)','#fff',fin(t,WT(242)-.1))});
sc(WT(247),null,'video',(t,lt,s)=>{vign(.5);txt('SURAT PERPISAHAN',W/2,200,64,'#fff',{al:'center',a:fin(t,WT(253)-.1,.5)})},{clip:'8256',grade:'dim'});
