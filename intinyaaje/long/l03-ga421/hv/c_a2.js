// BAB 2 — kru, kumulonimbus, radar menipu
window.FADEIN=false;window.FADEOUT=false;
const JOGJA=[110.43,-7.79];
function radarScene(t,lt,mode){bgDark();const cx=W/2,cy=500,R=360;radar(cx,cy,R,t,[],1);
 // dua sel badai
 const blob=(x,y,r,c)=>{const g=X.createRadialGradient(x,y,4,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=g;X.beginPath();X.arc(x,y,r,0,7);X.fill()};
 blob(cx-150,cy-80,150,'rgba(255,60,60,.85)');blob(cx+150,cy-80,150,'rgba(255,60,60,.85)');blob(cx-150,cy-80,220,'rgba(255,210,63,.35)');blob(cx+150,cy-80,220,'rgba(255,210,63,.35)');
 if(mode>=2){X.fillStyle='rgba(3,20,11,.95)';X.beginPath();X.ellipse(cx,cy-120,70,150,0,0,7);X.fill();pill('TERLIHAT AMAN',cx,cy-300,30,GRN,'#06210f',1)}
 const k=mode>=1?clamp(lt/5):0;twin(cx,cy+R-60-k*(R+40),60,0,'#fff',[1,1]);}
seq([
 {at:0,k:'video',clip:'242',off:10,grade:'dim',d:(t,lt,s)=>{lowerThird('KAPTEN ABDUL ROZAQ','44 TAHUN · LEBIH DARI 14.000 JAM TERBANG',t,T('kapten abdul')-.1,T('di sebelahnya')-.3);lowerThird('KOPILOT HARRY GUNAWAN','LEBIH DARI 7.000 JAM TERBANG',t,T('kopilot harry')-.1,s.t1)}},
 {at:'penerbangannya sendiri',d:(t,lt)=>{const z=ease(lt/6);const P=drawMap(t,[110.9-0.3*z,-7.6,6-2.5*z]);const B=P(...JOGJA);X.fillStyle=YEL;X.beginPath();X.arc(B[0],B[1],12,0,7);X.fill();txt('YOGYAKARTA',B[0],B[1]+48,34,'#fff',{al:'center'});
   const k=clamp(lt/6);twin(B[0]+700*(1-k)+120,B[1]-40*(1-k),80,-Math.PI/2);pill('MULAI TURUN',B[0]+700*(1-k)+120,B[1]-130,30,YEL,'#111',fin(t,T('mulai turun')-.2))}},
 {at:'bulan januari',k:'video',clip:'334302',off:4,grade:'dim',d:(t,lt,s)=>pill('JANUARI = PUNCAK MUSIM HUJAN DI JAWA',W/2,300,42,'rgba(10,14,22,.85)','#fff',fin(t,s.t0+.4))},
 {at:'sore itu',k:'video',clip:'142647',off:8,d:(t,lt,s)=>lowerThird('KUMULONIMBUS','AWAN BADAI RAKSASA',t,T('namanya kumulonimbus')-.1,s.t1)},
 {at:'awan ini bisa',d:(t,lt)=>{bgDark();const base=820,top=170;X.strokeStyle='rgba(255,255,255,.25)';X.lineWidth=2;for(let k=0;k<=12;k+=2){const y=base-(base-top)*k/12;X.beginPath();X.moveTo(300,y);X.lineTo(1620,y);X.stroke();txt(k+' km',280,y,24,'rgba(255,255,255,.6)',{al:'right',w:600,sh:false})}
   const h=ease(lt/2);stormCloud(t,W/2,base,base-(base-top)*h,1);
   [['HUJAN LEBAT','hujan lebat',1420,700],['ES','es,',1420,520],['PETIR','petir',1420,380],['ANGIN NAIK TURUN','angin',1420,260]].forEach(([s,p,x,y])=>pill(s,x,y,30,'rgba(10,14,22,.85)','#fff',fin(t,T(p)-.2),'left'));
   if(t>T('lebih dari sepuluh')-.2)pill('> 10 KM',560,base-(base-top)*10/12,34,YEL,'#111',fin(t,T('lebih dari sepuluh')-.2))}},
 {at:'pilot di seluruh',d:(t,lt)=>{bgDark(1);txt('ATURAN PILOT DI SELURUH DUNIA',W/2,380,36,YEL,{al:'center',ls:6,a:fin(t,T('pilot di seluruh'))});txt('JANGAN MASUK KE',W/2,500,84,'#fff',{al:'center',a:fin(t,T('jangan masuk')-.1)});txt('KUMULONIMBUS',W/2,610,104,RED,{al:'center',a:fin(t,T('ke kumulonimbus')-.1)})}},
 {at:'kru g a empat',k:'video',clip:'259910',off:2,d:(t,lt,s)=>{pill('TERLIHAT DENGAN MATA',W/2,300,40,'rgba(10,14,22,.85)','#fff',fin(t,T('dengan mata')-.2));if(t>T('layar radar cuaca')-.2)pill('+ DI RADAR CUACA',W/2,400,40,GRN,'#06210f',fin(t,T('layar radar cuaca')-.2))}},
 {at:'mereka mencoba',d:(t,lt)=>{radarScene(t,lt,t>T('di layar radar, ada')?2:1);pill('MENCARI CELAH DI ANTARA 2 SEL BADAI',W/2,950-60,30,'rgba(10,14,22,.85)','#fff',fin(t,T('mereka mencoba')+.3))}},
 {at:'tapi justru',d:(t,lt)=>{bgDark();const ax=260,ay=520;twin(ax,ay,110,Math.PI/2);
   // gelombang radar ke kanan, melemah di hujan lebat
   const rainX0=820,rainX1=1180;X.fillStyle='rgba(108,200,255,.18)';X.fillRect(rainX0,220,rainX1-rainX0,600);txt('HUJAN SANGAT LEBAT',(rainX0+rainX1)/2,190,30,BLU,{al:'center'});
   X.fillStyle='rgba(255,60,60,.25)';X.beginPath();X.ellipse(1520,520,230,280,0,0,7);X.fill();txt('INTI BADAI',1520,520,40,RED,{al:'center',a:fin(t,T('sangat, sangat')+.5)});
   for(let i=0;i<5;i++){const ph=((t*0.5+i*0.2)%1);const x=ax+80+ph*1500;const att=x<rainX0?1:x<rainX1?1-(x-rainX0)/(rainX1-rainX0)*0.95:0.05;X.strokeStyle=`rgba(93,255,154,${0.9*att})`;X.lineWidth=6;X.beginPath();X.arc(ax,ay,x-ax,-0.35,0.35);X.stroke()}
   if(t>T('gelombang itu bisa')-.2)pill('SINYAL MELEMAH',1000,880-40,34,YEL,'#111',fin(t,T('gelombang itu bisa')-.2));if(t>T('akibatnya')-.2)pill('DI LAYAR: TERLIHAT SEPI',1520,880-40,30,GRN,'#06210f',fin(t,T('akibatnya')-.2))}},
 {at:'penyelidik kemudian',d:(t,lt)=>{bgDark();radar(560,470,300,t,[],1,'DI LAYAR');const g=X.createRadialGradient(1360,470,4,1360,470,300);g.addColorStop(0,'rgba(255,60,60,.9)');g.addColorStop(1,'rgba(255,60,60,0)');X.fillStyle=g;X.beginPath();X.arc(1360,470,300,0,7);X.fill();txt('ASLINYA',1360,830,40,RED,{al:'center'});
   txt('=',W/2,470,90,'#fff',{al:'center',a:0});txt('≠',W/2,470,110,'#fff',{al:'center',a:fin(t,T('bukan celah')-.2)});if(t>T('pesawat masuk ke dalam badai')-.2)pill('PESAWAT MASUK KE DALAM BADAI',W/2,160,40,RED,'#fff',fin(t,T('pesawat masuk ke dalam badai')-.2))}}
]);
