// BAB 4 — restart gagal, aki lemah, sayap tetap bekerja
window.FADEIN=false;window.FADEOUT=false;
seq([
 {at:0,d:(t,lt)=>{bgDark();twin(560,540,440,0,'#e8eef8',[0,0],1);txt('MENYALAKAN ULANG MESIN',1100,300,40,'#fff',{a:fin(t,T('mencoba menyalakan ulang')-.2)});
   ['PERCOBAAN 1','PERCOBAAN 2','PERCOBAAN 3'].forEach((s,i)=>{const t0=T('dua sampai tiga')-.6+i*0.9;txt(s,1100,420+i*110,46,'#fff',{a:fin(t,t0)});txt('✗',1520,420+i*110,60,RED,{a:fin(t,t0+.5)})})}},
 {at:'lalu mereka mencoba',d:(t,lt)=>{bgDark();sideplane(900,520,2.4,1);const a=fin(t,T('mesin kecil di ekor')-.2);X.save();X.globalAlpha=a;X.strokeStyle=YEL;X.lineWidth=6;X.beginPath();X.arc(900-2.4*160,520-2.4*10,70,0,7);X.stroke();X.restore();
   pill('A P U: LISTRIK CADANGAN',900-2.4*160,520-200,32,YEL,'#111',a);if(t>T('juga gagal')-.2)pill('GAGAL',900-2.4*160,520+130,44,RED,'#fff',fin(t,T('juga gagal')-.2))}},
 {at:'masalahnya ada',d:(t,lt)=>{bgDark();const used=t>T('setiap percobaan menyalakan')?ease((t-T('setiap percobaan menyalakan'))/3)*0.35:0;battery(W/2,480,0.85-used,null,1);txt('AKI PESAWAT',W/2,260,48,'#fff',{al:'center'});
   if(t>T('satu-satunya')-.2)pill('SATU-SATUNYA SUMBER LISTRIK',W/2,720,36,YEL,'#111',fin(t,T('satu-satunya')-.2));if(t>T('menyedot tenaganya')-.2)pill('TIAP PERCOBAAN MENYEDOT TENAGA',W/2,820,32,RED,'#fff',fin(t,T('menyedot tenaganya')-.2))}},
 {at:'penyelidik kemudian',d:(t,lt)=>{bgDark();battery(640,460,0.92,'NORMAL 24 V',1,GRN);battery(1280,460,0.6,'SEBELUM MESIN MATI: 22 V',fin(t,T('tegangannya')-.2),YEL);
   pill('PERAWATAN TIDAK MEMADAI',W/2,200,38,RED,'#fff',fin(t,T('perawatan yang tidak')-.2))}},
 {at:'jadi setiap percobaan',d:(t,lt)=>{bgDark();const k=ease((t-T('jadi setiap'))/4);battery(W/2,420,0.55*(1-k),null,1);panel(0,0,0);if(t>T('listrik di kokpit hilang')-.2)pill('LISTRIK KOKPIT HAMPIR HABIS',W/2,760,40,RED,'#fff',fin(t,T('listrik di kokpit hilang')-.2))}},
 {at:'kopilot mencoba',d:(t,lt)=>{bgDark(1);const x=W/2,y=480;for(let i=0;i<4;i++){const ph=(lt*0.8+i*0.25)%1;X.strokeStyle=`rgba(255,255,255,${0.6*(1-ph)})`;X.lineWidth=6;X.beginPath();X.arc(x,y,60+ph*260*(t>T('tidak berhasil')?0.4:1),-0.6,0.6);X.stroke()}
   txt('MAYDAY',x,y-220,90,'#fff',{al:'center',a:fin(t,T('mayday')-.2)});if(t>T('tidak berhasil')-.2)pill('TIDAK TERKIRIM',x,y+260,46,RED,'#fff',fin(t,T('tidak berhasil')-.2))}},
 {at:'bayangkan posisinya',d:(t,lt)=>{bgDark(1);[['MESIN MATI','mesin mati. listrik'],['LISTRIK HAMPIR HABIS','listrik hampir habis'],['RADIO TIDAK BISA DIPAKAI','radio tidak'],['MASIH DI DALAM AWAN','masih di dalam awan'],['TIDAK ADA YANG TAHU POSISINYA','tidak ada yang tahu']].forEach(([s,p],i)=>{const a=fin(t,T(p)-.2);txt('✗',560,250+i*120,56,RED,{a});txt(s,640,250+i*120,52,'#fff',{a})})}},
 {at:'tapi ada satu',k:'video',clip:'142647',off:14,d:(t,lt,s)=>{if(t>T('sayap.')-.2){txt('SAYAP',W/2,440,190,'#fff',{al:'center',a:fin(t,T('sayap.')-.2)})}}},
 {at:'pesawat tidak jatuh',d:(t,lt)=>{bgDark();airfoil(t,W/2,560,1.25,1,fin(t,T('gaya angkat')-.3));pill('MESIN MATI ≠ LANGSUNG JATUH',W/2,170,40,YEL,'#111',fin(t,T('pesawat tidak jatuh')+.2))}},
 {at:'pesawat berubah',d:(t,lt)=>{bgDark();const P=profile(t,{});const k=clamp(lt/6);X.strokeStyle=GRN;X.lineWidth=6;X.beginPath();X.moveTo(P.d2x(0),P.km2y(5.8));const ex=P.d2x(150*k),ey=P.km2y(5.8-5.8*k*0.95);X.lineTo(ex,ey);X.stroke();twin(ex,ey,60,Math.atan2(ey-P.km2y(5.8),ex-P.d2x(0))+Math.PI/2);
   pill('PELAYANG: TURUN PELAN, MAJU JAUH',W/2,120,36,GRN,'#06210f',fin(t,T('jadi pelayang')-.2))}},
 {at:'kapten rozaq menjaga',k:'video',clip:'259910',off:6,grade:'dim',d:(t,lt,s)=>pill('HIDUNG PESAWAT DIJAGA STABIL',W/2,300,40,'rgba(10,14,22,.85)','#fff',fin(t,s.t0+.5))}
]);
