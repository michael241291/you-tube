// BAB 1 — pembuka (sama dengan tes) + penerbangan 9
window.FADEIN=true;window.FADEOUT=false;
sc(0,WT(12),'video',(t,lt,s)=>{const a=inout(t,0.6,s.t1-0.1,.6);
 txt('24 JUNI 1982',120,820,92,'#fff',{a:a*clamp((t-WT(2)+.2)/.5)});txt('MALAM HARI · DI ATAS SAMUDRA HINDIA',124,900,30,YEL,{w:700,a:a*clamp((t-WT(6))/.5),ls:3});},{clip:'62116'});
sc(WT(12),WT(24),'anim',(t,lt,s)=>{const z=ease(lt/6);const cam=[107.5-1*z,-8.4,24-6*z];const P=drawMap(t,cam);
 const A=P(101.7,3.1),B=P(115.9,-31.9);const k=clamp((t-WT(12)+.3)/3);const fx=.32*k;
 X.save();X.setLineDash([14,12]);X.strokeStyle='rgba(255,255,255,.55)';X.lineWidth=4;X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(B[0],B[1]);X.stroke();X.restore();
 const p=[A[0]+(B[0]-A[0])*fx,A[1]+(B[1]-A[1])*fx];const ang=Math.atan2(B[1]-A[1],B[0]-A[0])+Math.PI/2;plane(p[0],p[1],70,ang,'#fff',[1,1,1,1]);
 if(t>WT(14)-.1)pill('KETINGGIAN 11 KM',p[0]+150,p[1]-70,30,YEL,'#111',clamp((t-WT(14)+.1)/.3),'left');
 const so=P(104.5,-11.2);txt('SAMUDRA HINDIA',so[0],so[1],44,'rgba(150,200,255,.9)',{w:700,al:'center',a:clamp((t-WT(18))/.4),ls:8,sh:false});
 const jw=P(110.2,-7.3);txt('PULAU JAWA',jw[0],jw[1]-6,40,'#fff',{w:800,al:'center',a:clamp((t-WT(22))/.4),ls:4});});
sc(WT(24),WT(34),'anim',(t,lt,s)=>{bgDark();const y=540+20*Math.sin(t*1.3);plane(700,y,520*back(lt/.8),0,'#e8eef8',[1,1,1,1],0);
 if(t>WT(25)-.1){txt('BOEING 747',1180,380,90,'#fff',{a:clamp((t-WT(25)+.1)/.4)});txt('PESAWAT JUMBO · 4 MESIN',1184,460,30,YEL,{w:700,a:clamp((t-WT(25)-.3)/.4),ls:3})}
 if(t>WT(27)){const n=Math.round(263*ease((t-WT(28))/(WT(33)-WT(28))));txt(String(n),1180,640,170,YEL,{a:clamp((t-WT(27))/.3)});txt('ORANG DI DALAMNYA',1186,760,40,'#fff',{w:700,a:clamp((t-WT(27))/.3),ls:2})}});
sc(WT(34),WT(51),'anim',(t,lt,s)=>{bgDark(t>WT(41)?1:0);const order=[3,1,0,2];const fail=[WT(41)-.2,WT(42),WT(42)+.45,WT(43)];
 const eng=[1,1,1,1];order.forEach((k,j)=>{eng[k]=t<fail[j]?1:0});const shake=t>WT(43)&&t<WT(43)+.5?Math.sin(t*90)*6:0;plane(700+shake,540,520,0,'#e8eef8',eng,1);
 const tm=Math.max(0,Math.min(114,(t-WT(35))*16));const mm=Math.floor(tm/60),ss=Math.floor(tm%60);
 if(t>WT(35)-.1){txt('WAKTU',1180,330,32,'rgba(255,255,255,.7)',{w:700,ls:4,a:clamp((t-WT(35)+.1)/.3)});txt(`0${mm}:${String(ss).padStart(2,'0')}`,1176,420,120,'#fff',{a:clamp((t-WT(35)+.1)/.3)})}
 const dead=eng.filter(e=>!e).length;if(t>WT(41)-.2){txt('MESIN MATI',1180,560,32,'rgba(255,255,255,.7)',{w:700,ls:4});txt(`${dead} / 4`,1176,650,120,dead===4?RED:YEL)}
 if(t>WT(44)-.05)pill('SEMUANYA',1180,800,44,RED,'#fff',clamp((t-WT(44)+.05)/.25),'left');});
sc(WT(51),WT(57),'video',null,{clip:'995',grade:'night'});
sc(WT(57),WT(74),'anim',(t,lt,s)=>{bgDark();X.fillStyle='#152238';X.fillRect(0,900,W,180);X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=3;X.beginPath();X.moveTo(0,900);X.lineTo(W,900);X.stroke();
 const px=760,py=230;sideplane(px,py,1.25,clamp(lt/.4));
 if(t>WT(61)){X.save();X.setLineDash([16,14]);X.strokeStyle=RED;X.lineWidth=6;X.beginPath();X.moveTo(px,py+50);X.lineTo(px,py+50+600*clamp((t-WT(61))/1));X.stroke();X.restore();
  if(t>WT(66)-.1){const ry=py+120+560*ease((t-WT(66)+.1)/1.1);X.fillStyle='#8a8f99';X.beginPath();X.moveTo(px-40,ry);X.lineTo(px-10,ry-38);X.lineTo(px+34,ry-26);X.lineTo(px+44,ry+14);X.lineTo(px+6,ry+36);X.lineTo(px-34,ry+26);X.closePath();X.fill()}}
 if(t>WT(57)-.1)txt('SEMUA MESIN MATI…',1060,330,60,'#fff',{a:clamp((t-WT(57)+.1)/.4)});
 if(t>WT(65)-.1)txt('LANGSUNG JATUH',1060,450,76,RED,{a:clamp((t-WT(65)+.1)/.3)}),txt('SEPERTI BATU?',1060,540,76,RED,{a:clamp((t-WT(67)+.1)/.3)});
 if(t>WT(69)-.1)pill('KATA KEBANYAKAN ORANG',1060,660,34,YEL,'#111',clamp((t-WT(69)+.1)/.3),'left');});
sc(WT(74),WT(89),'video',(t,lt,s)=>{const a=inout(t,s.t0,s.t1);if(t>WT(77)-.1)txt('JAWABANNYA DIUJI MALAM ITU',W/2,170,52,'#fff',{al:'center',a:a*clamp((t-WT(77)+.1)/.4)});
 if(t>WT(81)-.1)txt('263',W/2,720,150,YEL,{al:'center',a:a*clamp((t-WT(81)+.1)/.4)});},{clip:'7093'});
sc(WT(89),WT(101),'anim',(t,lt,s)=>{const z=ease((t-WT(93))/2.5);const cam=[107.5+0.5*z,-7.4,16-11*z];const P=drawMap(t,cam);
 const g=P(108.05,-7.25);if(t>WT(97)-.2){const k=clamp((t-WT(97)+.2)/.4);const r=34+8*Math.sin(t*6);
  X.save();const rg=X.createRadialGradient(g[0],g[1],4,g[0],g[1],r*3);rg.addColorStop(0,'rgba(255,90,40,.8)');rg.addColorStop(1,'rgba(255,90,40,0)');X.globalAlpha=k;X.fillStyle=rg;X.beginPath();X.arc(g[0],g[1],r*3,0,7);X.fill();
  X.fillStyle='#ff6a3d';X.beginPath();X.moveTo(g[0]-40,g[1]+26);X.lineTo(g[0]-10,g[1]-30);X.lineTo(g[0]+10,g[1]-30);X.lineTo(g[0]+40,g[1]+26);X.closePath();X.fill();X.restore();
  pill('GUNUNG ???',g[0]+70,g[1]-10,36,'#ff6a3d','#fff',k,'left')}
 const jb=P(107.0,-6.75);if(t>WT(99)-.1)txt('JAWA BARAT',jb[0],jb[1],48,'#fff',{al:'center',a:clamp((t-WT(99)+.1)/.4),ls:4});});
sc(WT(101),WT(108),'video',null,{clip:'92312'});
// --- bagian baru
sc(WT(108),WT(112),'anim',(t,lt,s)=>{bgDark();chapterCard(t,s.t0,1,'PENERBANGAN 9',s.t1-s.t0+.3)});
sc(WT(112),WT(139),'anim',(t,lt,s)=>{bgDark();
 const stops=[['LONDON',120],['…',0],['KUALA LUMPUR',133],['PERTH',136],['…',0],['AUCKLAND',122]];const x0=180,x1=1740,y=560;
 txt('PENERBANGAN 9',W/2,250,76,'#fff',{al:'center',a:fin(t,WT(115)-.2)});txt('RUTE LONDON – AUCKLAND',W/2,330,32,YEL,{al:'center',w:700,ls:4,a:fin(t,WT(119)-.1)});
 const prog=ease((t-WT(119))/2.2);X.strokeStyle='rgba(255,255,255,.35)';X.lineWidth=6;X.beginPath();X.moveTo(x0,y);X.lineTo(x0+(x1-x0)*prog,y);X.stroke();
 const hk=fin(t,WT(133)-.1,.6);const xs=stops.map((_,i)=>x0+(x1-x0)*i/(stops.length-1));
 if(hk>0){X.strokeStyle=YEL;X.lineWidth=12;X.beginPath();X.moveTo(xs[2],y);X.lineTo(xs[2]+(xs[3]-xs[2])*hk,y);X.stroke()}
 stops.forEach(([n,w],i)=>{const a=prog>=i/(stops.length-1)-.02?1:0;if(!a)return;const hl=(i===2||i===3)&&hk>0;
  if(n!=='…'){X.fillStyle=hl?YEL:'#fff';X.beginPath();X.arc(xs[i],y,hl?18:13,0,7);X.fill();txt(n,xs[i],y+(i%2?-70:70),hl?38:32,hl?YEL:'#fff',{al:'center',w:800})}else txt('• • •',xs[i],y,30,'rgba(255,255,255,.6)',{al:'center'})});
 if(hk>0)pill('ETAPE MALAM ITU',(xs[2]+xs[3])/2,y+170,34,YEL,'#111',hk);
 if(t>WT(134)-.2){const k=ease((t-WT(134))/(WT(138)-WT(134)+1.2));plane(xs[2]+(xs[3]-xs[2])*k,y,60,Math.PI/2,'#fff')}});
sc(WT(139),WT(155),'video',(t,lt,s)=>{vign(.5);lowerThird('Kapten Eric Moody','KAPTEN',t,WT(144)-.1,WT(147)-.2);lowerThird('Roger Greaves','KOPILOT',t,WT(147)-.1,WT(150)+.6);lowerThird('Barry Townley-Freeman','TEKNISI PENERBANGAN',t,WT(151)-.1,s.t1)},{clip:'83156'});
sc(WT(155),WT(169),'video',(t,lt,s)=>{clockPill('± 20.40 WIB',t,WT(156)-.1,s.t1);pill('PENUMPANG TERTIDUR',W/2,170,34,'rgba(10,14,22,.82)','#fff',inout(t,WT(166),s.t1),'center')},{clip:'995',off:6,grade:'night'});
sc(WT(169),WT(181),'anim',(t,lt,s)=>{bgDark();radar(620,520,330,t,[],1);txt('RADAR CUACA',1100,380,40,'rgba(255,255,255,.7)',{w:700,ls:5,a:fin(t,WT(171)-.1)});
 txt('BERSIH',1096,470,120,GRN,{a:fin(t,WT(173)-.1)});pill('TIDAK ADA AWAN BADAI',1100,620,34,'rgba(93,255,154,.18)',GRN,fin(t,WT(174)-.1),'left');pill('TIDAK ADA APA-APA',1100,710,34,'rgba(93,255,154,.18)',GRN,fin(t,WT(178)-.1),'left')});
function windshield(t,amt){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#050a18');g.addColorStop(1,'#0c1830');X.fillStyle=g;X.fillRect(0,0,W,H);
 for(let i=0;i<70;i++){const r=Math.sin(i*91.7)*1000,fx=r-Math.floor(r),r2=Math.sin(i*37.1)*1000,fy=r2-Math.floor(r2);X.fillStyle='rgba(255,255,255,.5)';X.fillRect(fx*W,fy*560,2,2)}
 sparks(t,180,120,1560,520,Math.round(42*amt),1,3);
 X.save();X.fillStyle='#030407';X.beginPath();X.rect(0,0,W,H);
 X.moveTo(150,150);X.lineTo(900,110);X.lineTo(920,640);X.lineTo(210,700);X.closePath();X.moveTo(1770,150);X.lineTo(1020,110);X.lineTo(1000,640);X.lineTo(1710,700);X.closePath();X.fill('evenodd');
 X.fillStyle='#0b0e16';X.fillRect(0,720,W,360);X.restore()}
sc(WT(181),WT(208),'anim',(t,lt,s)=>{windshield(t,clamp((t-WT(186))/3));txt('KACA DEPAN KOKPIT',W/2,790,34,'rgba(255,255,255,.75)',{al:'center',w:700,ls:5,a:fin(t,WT(183))});
 pill('ANTI-ES: NYALA',W/2-230,870,32,'rgba(108,200,255,.2)',BLU,fin(t,WT(200)-.1));pill('SABUK PENGAMAN: NYALA',W/2+230,870,32,'rgba(255,210,63,.2)',YEL,fin(t,WT(203)-.1))});
sc(WT(208),null,'video',(t,lt,s)=>{txt('BUKAN AWAN.',W/2,500,110,'#fff',{al:'center',a:fin(t,WT(217)-.1,.5)})},{clip:'304'});
