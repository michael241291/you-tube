// BAB 5 — keluar dari awan, memilih sungai, mendarat di Bengawan Solo
window.FADEIN=false;window.FADEOUT=false;
const KLATEN=[110.78,-7.67],JOGJA=[110.43,-7.79],SOLO=[110.82,-7.57];
seq([
 {at:0,k:'video',clip:'142493',off:3,d:(t,lt,s)=>{altimeter(1300,240,2.4,'KETINGGIAN',fin(t,T('delapan ribu')-.2));if(t>T('keluar dari bawah')-.2)pill('KELUAR DARI BAWAH AWAN',W/2,520,40,'rgba(10,14,22,.85)','#fff',fin(t,T('keluar dari bawah')-.2))}},
 {at:'dan yang mereka lihat',k:'video',clip:'334076',off:2,d:(t,lt,s)=>{[['SAWAH','sawah,'],['DESA','desa,'],['POHON KELAPA','pohon kelapa'],['JALAN','jalan,'],['KABEL LISTRIK','kabel listrik']].forEach(([w,p],i)=>pill(w,330+i*320,300,34,'rgba(10,14,22,.85)','#fff',fin(t,T(p)-.2)))}},
 {at:'sementara pesawat',d:(t,lt)=>{bgDark();const P=profile(t,{});X.strokeStyle=GRN;X.lineWidth=6;X.beginPath();X.moveTo(P.d2x(0),P.km2y(5.8));X.lineTo(P.d2x(120),P.km2y(2.4));X.stroke();const k=clamp(lt/5);const ex=P.d2x(120+50*k),ey=P.km2y(2.4-2.4*k);
   X.setLineDash([12,12]);X.beginPath();X.moveTo(P.d2x(120),P.km2y(2.4));X.lineTo(ex,ey);X.stroke();X.setLineDash([]);twin(ex,ey,60,Math.PI*0.62);
   if(t>T('tidak bisa naik')-.2)pill('TIDAK BISA NAIK LAGI',1300,300,36,RED,'#fff',fin(t,T('tidak bisa naik')-.2));if(t>T('satu kesempatan')-.2)pill('HANYA 1 KESEMPATAN',1300,400,40,YEL,'#111',fin(t,T('satu kesempatan')-.2))}},
 {at:'lalu kapten melihat',k:'video',clip:'116',off:8,d:(t,lt,s)=>lowerThird('BENGAWAN SOLO','PANJANG · CUKUP LURUS',t,T('bengawan solo.')-.2,s.t1)},
 {at:'kenapa sungai',d:(t,lt)=>{bgDark();txt('KENAPA SUNGAI?',W/2,140,56,'#fff',{al:'center',a:fin(t,T('kenapa sungai'))});
   optionCard(380,520,500,620,'SAWAH',['pematang & parit','pohon & rumah'],{ok:false,a:fin(t,T('sawah di jawa')+1.5)},fin(t,T('sawah di jawa')-.2));
   optionCard(W/2,520,500,620,'JALAN RAYA',['sempit & berkelok','tiang listrik','kendaraan'],{ok:false,a:fin(t,T('jalan raya biasanya')+1.5)},fin(t,T('jalan raya biasanya')-.2));
   optionCard(1540,520,500,620,'SUNGAI',['lebar & lurus','bebas bangunan','air meredam benturan'],{ok:true,a:fin(t,T('permukaan air')+.5)},fin(t,T('sebuah sungai yang lebar')-.2),'#173a5a');
   if(t>T('cukup dangkal')-.2)pill('HARI ITU: CUKUP DANGKAL',W/2,900-20,36,YEL,'#111',fin(t,T('cukup dangkal')-.2))}},
 {at:'pilot memutuskan',d:(t,lt)=>{const z=ease(lt/5);const P=drawMap(t,[110.7,-7.65,2.2-1.6*z]);const K=P(...KLATEN),J=P(...JOGJA),S=P(...SOLO);
   X.strokeStyle='rgba(108,200,255,.9)';X.lineWidth=6;X.beginPath();const pts=[[110.95,-7.95],[110.85,-7.76],[110.78,-7.67],[110.81,-7.55],[110.86,-7.45]].map(p=>P(...p));pts.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1]));X.stroke();
   [[J,'YOGYAKARTA'],[S,'SOLO']].forEach(([p,n])=>{X.fillStyle='#fff';X.beginPath();X.arc(p[0],p[1],9,0,7);X.fill();txt(n,p[0]+20,p[1]-26,28,'#fff')});
   X.fillStyle=RED;X.beginPath();X.arc(K[0],K[1],16,0,7);X.fill();pill('DESA SERENAN, KLATEN',K[0]+30,K[1]+60,32,YEL,'#111',fin(t,T('desa serenan')-.2),'left');txt('BENGAWAN SOLO',pts[4][0]+30,pts[4][1]+20,28,BLU)}},
 {at:'dan karena listrik',d:(t,lt)=>{bgDark();sideplane(960,480,2.4,1,-0.06*ease((t-T('hidung sedikit'))/1));pill('RODA PENDARAT: TIDAK TURUN',600,780,32,RED,'#fff',fin(t,T('roda pendarat')-.2));pill('FLAP: TIDAK TURUN',1320,780,32,RED,'#fff',fin(t,T('dan flap')-.2));
   if(t>T('lebih cepat')-.2)pill('LEBIH CEPAT DARI PENDARATAN BIASA',W/2,180,36,YEL,'#111',fin(t,T('lebih cepat')-.2))}},
 {at:'pesawat menyentuh air',d:(t,lt)=>{riverTop(t,ease(lt/3.5),1);pill('DI ANTARA DUA JEMBATAN BESI',W/2,140,38,'rgba(10,14,22,.85)','#fff',fin(t,T('dua jembatan')-.2))}},
 {at:'bagian ekor',d:(t,lt)=>{bgDark();X.fillStyle='#3a2c18';X.fillRect(0,760,W,320);X.fillStyle='rgba(138,106,62,.85)';X.fillRect(0,620,W,140);const k=ease(lt/2.5);const x=lerpN(1500,880,k);sideplane(x,600,2.2,1,-0.08*(1-k));
   if(lt>0.4&&lt<2.5){for(let i=0;i<30;i++){const r=Math.sin(i*9.1)*999,f=r-Math.floor(r);X.fillStyle='rgba(220,235,255,.7)';X.beginPath();X.arc(x-300+f*500,610-Math.sin(f*3+lt*4)*80*(1-lt/2.5),6+f*10,0,7);X.fill()}}
   pill('EKOR MENGHANTAM DASAR SUNGAI',W/2,180,36,RED,'#fff',fin(t,T('bagian ekor')+.4));if(t>T('berhenti, duduk')-.2)pill('BERHENTI DI ATAS PERUTNYA',W/2,270,34,YEL,'#111',fin(t,T('berhenti, duduk')-.2))}},
 {at:'tidak ada api',k:'video',clip:'116',off:20,d:(t,lt,s)=>{pill('TIDAK ADA API',W/2,280,44,GRN,'#06210f',fin(t,T('tidak ada api')-.1));if(t>T('tetap utuh')-.2)pill('BADAN PESAWAT TETAP UTUH',W/2,380,38,'rgba(10,14,22,.85)','#fff',fin(t,T('tetap utuh')-.2))}}
]);
