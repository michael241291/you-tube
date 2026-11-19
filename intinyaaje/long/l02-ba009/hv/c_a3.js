// BAB 3 — pelayang raksasa
window.FADEIN=false;window.FADEOUT=false;
sc(0,WT(19),'anim',(t,lt,s)=>{bgDark();chapterCard(t,0,3,'PELAYANG RAKSASA',3.0);
 if(t>3){txt('PESAWATNYA JATUH?',W/2,420,90,'#fff',{al:'center',a:fin(t,3)});if(t>WT(11)-.1){txt('TERNYATA TIDAK.',W/2,560,110,YEL,{al:'center',a:fin(t,WT(11)-.1)})}
  if(t>WT(16)-.1)pill('SERING SALAH KAPRAH',W/2,720,38,'rgba(255,255,255,.12)','#fff',fin(t,WT(16)-.1))}});
function airfoil(cx,cy,sc){X.save();X.translate(cx,cy);X.scale(sc,sc);X.fillStyle='#e8eef8';X.beginPath();X.moveTo(-300,10);X.bezierCurveTo(-300,-60,-120,-90,40,-70);X.bezierCurveTo(180,-50,300,-10,330,8);X.bezierCurveTo(200,18,0,40,-200,40);X.bezierCurveTo(-280,40,-300,30,-300,10);X.closePath();X.fill();X.restore()}
sc(WT(19),WT(57),'anim',(t,lt,s)=>{bgDark();const cx=860,cy=560;
 // aliran udara
 const flow=fin(t,WT(42)-.3,.8)*.9+.25;X.save();X.lineWidth=3;for(let j=0;j<9;j++){const yo=(j-4)*70;X.strokeStyle=`rgba(108,200,255,${.35*flow})`;X.beginPath();for(let x=-60;x<=W+60;x+=20){const d=Math.exp(-Math.pow((x-cx)/320,2));const y=cy+yo+(yo<0?-1:1)*d*(yo<0?60:30)*(1-Math.abs(yo)/320)-(yo<0?d*40:0);if(x===-60)X.moveTo(x,y);else X.lineTo(x,y)}X.stroke();
  const ph=((t*0.6+j*.13)%1);const px=-60+ph*(W+120);X.fillStyle=`rgba(180,230,255,${.8*flow})`;X.beginPath();X.arc(px,cy+yo+(yo<0?-1:1)*Math.exp(-Math.pow((px-cx)/320,2))*(yo<0?100:30),5,0,7);X.fill()}X.restore();
 airfoil(cx,cy,1.25);txt('PENAMPANG SAYAP',cx,cy+140,28,'rgba(255,255,255,.7)',{al:'center',w:700,ls:4});
 // panah gaya angkat
 const la=fin(t,WT(28)-.2,.5);if(la>0){X.save();X.globalAlpha=la;X.fillStyle=GRN;X.fillRect(cx-14,cy-330,28,220);X.beginPath();X.moveTo(cx-50,cy-320);X.lineTo(cx,cy-400);X.lineTo(cx+50,cy-320);X.fill();X.restore();txt('GAYA ANGKAT',cx+80,cy-330,48,GRN,{a:la})}
 const pa=fin(t,WT(33)-.2,.5);if(pa>0){X.save();X.globalAlpha=pa;X.fillStyle=YEL;X.fillRect(cx+460,cy-14,200,28);X.beginPath();X.moveTo(cx+650,cy-50);X.lineTo(cx+730,cy);X.lineTo(cx+650,cy+50);X.fill();X.restore();txt('MESIN: DORONG',cx+470,cy+80,40,YEL,{a:pa})}
 txt('YANG MEMBUAT MELAYANG:',120,190,34,'rgba(255,255,255,.7)',{w:700,ls:3,a:fin(t,WT(25)-.2)});txt('SAYAP',120,260,80,GRN,{a:fin(t,WT(30)-.2)});
 if(t>WT(42)-.2)pill('UDARA TETAP MENGALIR',1500,900-80,34,'rgba(108,200,255,.2)',BLU,fin(t,WT(42)-.2))});
sc(WT(57),WT(71),'anim',(t,lt,s)=>{bgDark();for(let i=0;i<90;i++){const r=Math.sin(i*91.7)*1000,fx=r-Math.floor(r),r2=Math.sin(i*37.1)*1000,fy=r2-Math.floor(r2);X.fillStyle='rgba(255,255,255,.4)';X.fillRect(((fx*W)-lt*60+W*3)%W,fy*H,2,2)}
 const k=lt/(s.t1-s.t0);const x=380+k*900,y=330+k*240;X.save();X.setLineDash([12,14]);X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=4;X.beginPath();X.moveTo(120,210);X.lineTo(x,y);X.stroke();X.restore();
 sideplane(x,y,1.2,1,0.25);txt('TANPA MESIN',1100,700,50,'#fff',{a:fin(t,WT(58)-.1)});txt('TIDAK JATUH SEPERTI BATU',1100,775,46,'rgba(255,255,255,.8)',{a:fin(t,WT(62)-.1)});
 pill('PELAYANG RAKSASA',1100,870,46,YEL,'#111',fin(t,WT(69)-.1),'left')});
sc(WT(71),WT(92),'anim',(t,lt,s)=>{bgDark();const x0=260,y0=360,L=1400,Hh=120;txt('15 : 1',W/2,200,130,YEL,{al:'center',a:fin(t,WT(75)-.1)});
 const kv=fin(t,WT(81)-.1,.6),kh=ease((t-WT(86))/1.6);X.lineWidth=6;
 if(kv>0){X.strokeStyle=RED;X.beginPath();X.moveTo(x0,y0);X.lineTo(x0,y0+Hh*3*kv);X.stroke();txt('TURUN 1 KM',x0-30,y0+180,34,RED,{al:'right',a:kv})}
 if(kh>0){X.strokeStyle=GRN;X.beginPath();X.moveTo(x0,y0+Hh*3);X.lineTo(x0+L*kh,y0+Hh*3);X.stroke();X.strokeStyle='rgba(255,255,255,.5)';X.setLineDash([12,12]);X.beginPath();X.moveTo(x0,y0);X.lineTo(x0+L*kh,y0+Hh*3);X.stroke();X.setLineDash([]);
  sideplane(x0+L*kh,y0+Hh*3*kh-24,.5,1,.26);txt('MAJU ± 15 KM',x0+L/2,y0+Hh*3+60,44,GRN,{al:'center',a:fin(t,WT(87)-.1)})}});
function profile(t,opt){// grafik ketinggian vs jarak
 const x0=200,x1=1720,y0=180,y1=820,km2y=km=>y1-(y1-y0)*km/11.5,d2x=d=>x0+(x1-x0)*d/180;
 X.strokeStyle='rgba(255,255,255,.18)';X.lineWidth=2;for(let k=0;k<=11;k++){if(k%2&&k!==11)continue;X.beginPath();X.moveTo(x0,km2y(k));X.lineTo(x1,km2y(k));X.stroke();txt(k+' km',x0-20,km2y(k),24,'rgba(255,255,255,.55)',{al:'right',w:600,sh:false})}
 X.fillStyle='#0f1a2c';X.fillRect(x0,y1,x1-x0,16);
 return {km2y,d2x,x0,x1,y0,y1}}
sc(WT(92),WT(114),'anim',(t,lt,s)=>{bgDark();const P=profile(t);const k=ease((t-WT(93))/(WT(113)-WT(93)));const d=160*k,km=11-10.4*k;
 X.strokeStyle='rgba(255,255,255,.35)';X.setLineDash([12,12]);X.lineWidth=4;X.beginPath();X.moveTo(P.d2x(0),P.km2y(11));X.lineTo(P.d2x(169),P.km2y(0));X.stroke();X.setLineDash([]);
 sideplane(P.d2x(d),P.km2y(km)-14,.42,1,.065);
 pill('± 23 MENIT MELAYANG',1250,260,40,YEL,'#111',fin(t,WT(103)-.1),'left');pill('± 169 KM',1250,350,40,GRN,'#111',fin(t,WT(109)-.1),'left')});
sc(WT(114),WT(143),'anim',(t,lt,s)=>{const z=ease(lt/4);const P=drawMap(t,[107.2,-7.5,9-2*z]);
 const p=P(106.4,-8.55),j=P(106.88,-6.27);plane(p[0],p[1],60,-0.05,'#fff',[0,0,0,0]);
 if(t>WT(119)-.1){const a=fin(t,WT(119)-.1);X.save();X.globalAlpha=a;X.setLineDash([14,12]);X.strokeStyle=YEL;X.lineWidth=5;X.beginPath();X.moveTo(p[0],p[1]-40);X.quadraticCurveTo((p[0]+j[0])/2+120,(p[1]+j[1])/2,j[0],j[1]+20);X.stroke();X.restore();
  X.fillStyle=YEL;X.beginPath();X.arc(j[0],j[1],14,0,7);X.fill();pill('JAKARTA',j[0]+30,j[1]-30,34,YEL,'#111',a,'left')}
 if(t>WT(125)-.2){const a=fin(t,WT(125)-.2);for(let lon=105.9;lon<=108.6;lon+=.32){const m=P(lon,-7.25+Math.sin(lon*7)*.1);X.save();X.globalAlpha=a;X.fillStyle='#5b6b86';X.beginPath();X.moveTo(m[0]-34,m[1]+26);X.lineTo(m[0],m[1]-30);X.lineTo(m[0]+34,m[1]+26);X.fill();X.fillStyle='#e8eef8';X.beginPath();X.moveTo(m[0]-9,m[1]-16);X.lineTo(m[0],m[1]-30);X.lineTo(m[0]+9,m[1]-16);X.fill();X.restore()}
  const m=P(107.9,-7.45);pill('PEGUNUNGAN',m[0],m[1]+60,32,'rgba(255,255,255,.14)','#fff',a)}
 pill('HARUS DI ATAS 3,5 KM',W/2,180,44,RED,'#fff',fin(t,WT(139)-.1))});
sc(WT(143),WT(162),'anim',(t,lt,s)=>{bgDark();const P=profile(t);const y35=P.km2y(3.5),y37=P.km2y(3.7);
 X.fillStyle='rgba(255,77,77,.12)';X.fillRect(P.x0,y35,P.x1-P.x0,P.y1-y35);X.strokeStyle=RED;X.lineWidth=3;X.beginPath();X.moveTo(P.x0,y35);X.lineTo(P.x1,y35);X.stroke();txt('3,5 km — batas aman melewati gunung',P.x1-10,y35+30,26,RED,{al:'right',w:700,sh:false});
 const a=fin(t,WT(153)-.2);X.save();X.globalAlpha=a;X.strokeStyle=YEL;X.lineWidth=6;X.setLineDash([18,10]);X.beginPath();X.moveTo(P.x0,y37);X.lineTo(P.x1,y37);X.stroke();X.restore();
 pill('BATAS KEPUTUSAN: 3,7 KM',P.x0+40,y37-50,40,YEL,'#111',a,'left');
 sideplane(P.d2x(60),P.km2y(8.2),.45,1,.065);
 txt('KEPUTUSAN BERAT',W/2,230,72,'#fff',{al:'center',a:fin(t,WT(146)-.1)});
 if(t>WT(162)-1.4)txt('… BERBALIK KE LAUT',W/2,320,50,YEL,{al:'center',a:fin(t,WT(162)-1.4)})});
sc(WT(162),WT(193),'video',(t,lt,s)=>{vign(.4);pill('MENDARAT DI ATAS AIR?',W/2,190,46,'rgba(10,14,22,.85)','#fff',inout(t,WT(169)-.1,s.t1));
 [['DI MALAM HARI',WT(178)],['DENGAN PESAWAT JUMBO',WT(181)],['BELUM PERNAH DICOBA',WT(185)]].forEach(([l,tt],k)=>pill(l,W/2,330+k*90,38,k==2?RED:YEL,k==2?'#fff':'#111',inout(t,tt-.1,s.t1)))},{clip:'147996'});
sc(WT(193),null,'anim',(t,lt,s)=>{bgDark(1);const kp=[[WT(198),10],[WT(200),9],[WT(201),8],[WT(212)+1,7.2]];let km=10.4;
 if(t<kp[0][0])km=10.4-.4*clamp((t-s.t0)/(kp[0][0]-s.t0));else for(let i=0;i<kp.length-1;i++){if(t>=kp[i][0]&&t<kp[i+1][0])km=kp[i][1]+(kp[i+1][1]-kp[i][1])*(t-kp[i][0])/(kp[i+1][0]-kp[i][0])}if(t>=kp[3][0])km=7.2;
 sideplane(560,520,1.3,1,.1);altimeter(1300,430,km,'KETINGGIAN');
 const tries=[WT(206),WT(208)+.3,WT(210)];tries.forEach((tt,k)=>pill('NYALAKAN ULANG',1300,600+k*80,32,'rgba(255,255,255,.12)','#fff',fin(t,tt-.1),'center'));
 if(t>WT(212)-.1)pill('GAGAL',1300,880,60,RED,'#fff',fin(t,WT(212)-.1))});
