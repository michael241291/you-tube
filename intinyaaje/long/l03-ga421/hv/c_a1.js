// BAB 1 — pembuka + penerbangan GA421
window.FADEIN=true;window.FADEOUT=false;
const LOMBOK=[116.1,-8.56],JOGJA=[110.43,-7.79],KLATEN=[110.78,-7.67];
seq([
 {at:0,k:'video',clip:'142647',off:2,grade:'dim',d:(t,lt,s)=>{const a=inout(t,0.5,s.t1-0.1,.6);txt('16 JANUARI 2002',120,760,92,'#fff',{a:a*fin(t,WT(3)-.1,.5)});txt('RABU SORE · MENUJU YOGYAKARTA',124,840,30,YEL,{w:700,a:a*fin(t,T('turun menuju')-.1,.5),ls:3})}},
 {at:'di dalamnya ada enam',d:(t,lt)=>{bgDark();twin(620,540,480*back(lt/.8),0,'#e8eef8',[1,1],1);txt('BOEING 737',1150,400,90,'#fff',{a:fin(t,T('di dalamnya'))});const n=Math.round(60*ease((t-T('enam puluh orang')+.2)/1.2));if(t>T('enam puluh orang')-.3){txt(String(n),1150,600,170,YEL);txt('ORANG DI DALAMNYA',1156,720,40,'#fff',{w:700,ls:2})}}},
 {at:'lalu pesawat masuk',k:'video',clip:'151744',off:1,grade:'dim',d:(t,lt,s)=>{pill('HUJAN SANGAT DERAS',W/2,300,46,'rgba(10,14,22,.85)','#fff',fin(t,s.t0+.3));if(t>T('butiran es')-.2)pill('+ BUTIRAN ES',W/2,400,46,YEL,'#111',fin(t,T('butiran es')-.2))}},
 {at:'sekitar satu setengah',d:(t,lt)=>{bgDark(t>T('kedua mesinnya')?1:0);const f=T('kedua mesinnya')+.3;const eng=[t<f?1:0,t<f+.4?1:0];const sh=t>f&&t<f+.6?Math.sin(t*90)*6:0;twin(620+sh,540,480,0,'#e8eef8',eng,1);
   const tm=Math.min(90,(t-T('sekitar satu'))*90/((f-T('sekitar satu'))||1));txt('WAKTU DI DALAM BADAI',1120,330,30,'rgba(255,255,255,.7)',{w:700,ls:3});txt(`0${Math.floor(tm/60)}:${String(Math.floor(tm%60)).padStart(2,'0')}`,1116,420,120,'#fff');
   const dead=eng.filter(e=>!e).length;txt('MESIN MATI',1120,560,30,'rgba(255,255,255,.7)',{w:700,ls:3});txt(`${dead} / 2`,1116,650,120,dead==2?RED:YEL);if(t>T('dua-duanya')-.1)pill('DUA-DUANYA',1120,800,44,RED,'#fff',fin(t,T('dua-duanya')-.1),'left')}},
 {at:'beberapa menit kemudian',k:'video',clip:'116',off:3,d:(t,lt,s)=>{lowerThird('SUNGAI BENGAWAN SOLO','KLATEN, JAWA TENGAH',t,T('bengawan solo')-.2,s.t1)}},
 {at:'dan dari enam puluh',d:(t,lt)=>{bgDark();txt('60 ORANG DI DALAM PESAWAT',W/2,210,44,'#fff',{al:'center',a:fin(t,T('dan dari'))});peopleGrid(t,T('enam puluh orang di dalamnya')-.2,W/2,370,t>T('lima puluh sembilan')-.2?59:0,60,15,52);
   if(t>T('lima puluh sembilan')-.2)txt('59 SELAMAT',W/2,860,90,GRN,{al:'center',a:fin(t,T('lima puluh sembilan')-.2)})}},
 {at:'di video ini',d:(t,lt)=>{bgDark();txt('PERTANYAAN KITA',W/2,330,36,YEL,{al:'center',w:800,ls:8,a:fin(t,T('di video ini'))});quote(['Bisakah mesin jet mati','cuma gara-gara hujan?'],[T('bisakah'),T('cuma gara-gara')],t,W/2,480,78,110)}},
 {at:'mesin yang sanggup',k:'video',clip:'144323',off:2,grade:'dim',d:(t,lt,s)=>{pill('DIRANCANG TERBANG MENEMBUS AWAN',W/2,300,38,'rgba(10,14,22,.85)','#fff',fin(t,T('yang dirancang')-.2));if(t>T('kok bisa padam')-.2)pill('KOK BISA PADAM KARENA AIR?',W/2,400,44,YEL,'#111',fin(t,T('kok bisa padam')-.2))}},
 {at:'dan kalau sudah padam',d:(t,lt)=>{bgDark();txt('KENAPA PILOTNYA MEMILIH...',W/2,200,44,'#fff',{al:'center',a:fin(t,T('dan kalau sudah'))});
   optionCard(W/2,560,460,520,'SUNGAI',['Bengawan Solo'],null,fin(t,T('memilih sungai')-.2),'#173a5a');optionCard(W/2-560,560,420,480,'SAWAH',[],null,fin(t,T('bukan sawah')-.2));optionCard(W/2+560,560,420,480,'JALAN RAYA',[],null,fin(t,T('bukan jalan')-.2))}},
 {at:'kita mulai dari awal',d:(t,lt)=>{const z=ease(lt/7);const P=drawMap(t,[113.4-0.2*z,-8.1,8.6-0.8*z]);const A=P(...LOMBOK),B=P(...JOGJA);const k=clamp((t-T('penerbangan ini')+.2)/4);
   X.save();X.setLineDash([14,12]);X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=4;X.beginPath();X.moveTo(A[0],A[1]);X.lineTo(B[0],B[1]);X.stroke();X.restore();
   [[A,'LOMBOK'],[B,'YOGYAKARTA']].forEach(([p,n])=>{X.fillStyle=YEL;X.beginPath();X.arc(p[0],p[1],12,0,7);X.fill();txt(n,p[0],p[1]+50,34,'#fff',{al:'center',a:fin(t,T('penerbangan ini'))})});
   const p=[A[0]+(B[0]-A[0])*k,A[1]+(B[1]-A[1])*k];twin(p[0],p[1],70,Math.atan2(B[1]-A[1],B[0]-A[0])+Math.PI/2);
   if(t>T('g a empat')-.2)pill('GA421',p[0],p[1]-80,34,YEL,'#111',fin(t,T('g a empat')-.2));if(t>T('enam ratus')-.2)pill('± 625 KM',W/2,200,40,'rgba(10,14,22,.85)','#fff',fin(t,T('enam ratus')-.2))}},
 {at:'pesawatnya boeing',d:(t,lt)=>{bgDark();sideplane(980,500,2.2,fin(t,T('pesawatnya boeing')));lowerThird('BOEING 737-300','REGISTRASI PK-GWA · BUATAN 1989 · 2 MESIN JET',t,T('pesawatnya boeing')+.2,1e9)}},
 {at:'di dalamnya ada lima',d:(t,lt)=>{bgDark();txt('54',560,380,190,YEL,{al:'center',a:fin(t,T('lima puluh empat'))});txt('PENUMPANG',560,520,44,'#fff',{al:'center',a:fin(t,T('lima puluh empat'))});txt('+ 6',1100,380,190,'#fff',{al:'center',a:fin(t,T('enam kru'))});txt('KRU',1100,520,44,'#fff',{al:'center',a:fin(t,T('enam kru'))});
   const N=[['INDONESIA','sebagian besar'],['AUSTRALIA','australia'],['ITALIA','italia'],['BELANDA','belanda'],['NORWEGIA','norwegia'],['THAILAND','thailand']];N.forEach(([s,p],i)=>pill(s,260+i*280,760,30,i?'rgba(255,255,255,.14)':YEL,i?'#fff':'#111',fin(t,T(p)-.2)))}}
]);
