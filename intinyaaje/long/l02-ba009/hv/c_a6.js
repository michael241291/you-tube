// BAB 6 — intinya
window.FADEIN=false;window.FADEOUT=true;
const Q=p=>WT(I(p));
OVER.push(t=>chapterCard(t,0,6,'INTINYA',3.0));
const o_tid=Q('tidak satu pun meninggal'),o_gui=Q('Kisah ini lalu dicatat'),o_lun=Q('luncuran terpanjang'),o_kap=Q('Kapten Moody dan para penumpang'),o_club=Q('Galunggung Gliding Club'),o_reu=Q('rutin reuni');
sc(0,o_gui,'anim',(t,lt,s)=>{bgDark();const n=Math.round(263*ease((t-2.6)/2.2));txt(String(n),W/2,450,220,GRN,{al:'center',a:fin(t,2.6)});txt('DARI 263 ORANG SELAMAT',W/2,620,52,'#fff',{al:'center',a:fin(t,o_tid-.1)})});
sc(o_gui,o_kap,'anim',(t,lt,s)=>{bgDark();txt('CATATAN REKOR DUNIA',W/2,330,40,YEL,{al:'center',w:800,ls:6,a:fin(t,o_gui)});txt('LUNCURAN TERPANJANG',W/2,450,100,'#fff',{al:'center',a:fin(t,o_lun-.1)});
 txt('oleh pesawat yang tidak dirancang untuk melayang',W/2,560,44,'rgba(255,255,255,.8)',{al:'center',it:true,w:700,a:fin(t,o_lun+1)})});
sc(o_kap,Q('Tapi cerita ini punya buntut'),'anim',(t,lt,s)=>{bgDark();txt('GALUNGGUNG GLIDING CLUB',W/2,330,84,YEL,{al:'center',a:fin(t,o_club-.1)});
 for(let i=0;i<24;i++){const a=fin(t,o_kap+i*.08);const x=W/2-460+(i%12)*84,y=520+Math.floor(i/12)*110;X.save();X.globalAlpha=a;X.fillStyle=i===0?YEL:'#cfd8e8';X.beginPath();X.arc(x,y-26,18,0,7);X.fill();X.beginPath();X.roundRect(x-24,y-4,48,50,18);X.fill();X.restore()}
 pill('REUNI BERTAHUN-TAHUN',W/2,820,38,'rgba(255,255,255,.12)','#fff',fin(t,o_reu-.1))});
const p_but=Q('Tapi cerita ini punya buntut'),p_19=Q('Sembilan belas hari kemudian'),p_sia=Q('Singapore Airlines'),p_3=Q('kehilangan tiga mesin'),p_sama=Q('di daerah yang sama');
sc(p_but,Q('Setelah itu Indonesia'),'anim',(t,lt,s)=>{bgDark(1);txt('+19 HARI',480,420,150,YEL,{al:'center',a:fin(t,p_19-.1)});txt('BOEING 747 LAIN',480,560,44,'#fff',{al:'center',a:fin(t,p_sia-.3)});
 const off=t>=p_3+.3;plane(1300,520,440,0,'#e8eef8',off?[0,1,0,0]:[1,1,1,1],1);if(off)pill('3 MESIN MATI',1300,860,40,RED,'#fff',fin(t,p_3+.3));pill('DI DAERAH YANG SAMA',480,680,36,'rgba(255,255,255,.12)','#fff',fin(t,p_sama-.1))});
const q_tut=Q('Setelah itu Indonesia'),q_pin=Q('memindahkan jalur penerbangan'),q_pan=Q('mulai memantau');
sc(q_tut,Q('Sejak saat itu'),'anim',(t,lt,s)=>{const P=drawMap(t,[107.6,-7.9,10]);const g=P(108.05,-7.25);const a=fin(t,q_tut+.8);
 X.save();X.globalAlpha=a;X.fillStyle='rgba(255,77,77,.22)';X.strokeStyle=RED;X.lineWidth=5;X.beginPath();X.arc(g[0],g[1],150,0,7);X.fill();X.stroke();X.restore();pill('WILAYAH UDARA DITUTUP',g[0],g[1]-190,38,RED,'#fff',a);
 const k=fin(t,q_pin-.1,.8);X.save();X.setLineDash([14,12]);X.lineWidth=5;X.strokeStyle=`rgba(255,255,255,${.5*(1-k)})`;X.beginPath();X.moveTo(0,P(0,-8.0)[1]);X.lineTo(W,P(0,-8.2)[1]);X.stroke();X.strokeStyle=`rgba(255,210,63,${k})`;X.beginPath();X.moveTo(0,P(0,-9.0)[1]);X.quadraticCurveTo(W/2,P(0,-9.7)[1],W,P(0,-9.0)[1]);X.stroke();X.restore();
 pill('JALUR DIPINDAH',W/2,P(0,-9.7)[1]-50,34,YEL,'#111',k);pill('AWAN ABU DIPANTAU',W-120,180,34,BLU,'#111',fin(t,q_pan-.1),'right')});
const r_sej=Q('Sejak saat itu'),r_rad=Q('tidak terlihat di radar');
sc(r_sej,Q('Jadi kembali ke pertanyaan'),'video',(t,lt,s)=>{vign(.5);X.save();X.globalAlpha=.4;X.fillStyle='#000';X.fillRect(0,0,W,H);X.restore();txt('PELAJARAN BAGI DUNIA PENERBANGAN',W/2,330,40,YEL,{al:'center',w:800,ls:4,a:fin(t,r_sej+.3)});
 txt('Awan abu yang tak terlihat di radar',W/2,460,62,'#fff',{al:'center',a:fin(t,r_rad-.3)});txt('bisa mematikan pesawat terbesar sekalipun',W/2,560,62,'#fff',{al:'center',a:fin(t,r_rad+1.4)})},{clip:'375643',y:.3});
const s_jad=Q('Jadi kembali ke pertanyaan'),s_apa=Q('apakah pesawat langsung jatuh'),s_jaw=Q('Jawabannya tidak'),s_pel=Q('pelayang raksasa'),s_say=Q('adalah sayapnya');
sc(s_jad,Q('Mesin mati memang'),'anim',(t,lt,s)=>{bgDark();for(let i=0;i<90;i++){const r=Math.sin(i*91.7)*1000,fx=r-Math.floor(r),r2=Math.sin(i*37.1)*1000,fy=r2-Math.floor(r2);X.fillStyle='rgba(255,255,255,.4)';X.fillRect(((fx*W)-lt*60+W*3)%W,fy*H,2,2)}
 txt('SEMUA MESIN MATI = LANGSUNG JATUH?',W/2,220,60,'#fff',{al:'center',a:fin(t,s_apa-.4)});txt('TIDAK.',W/2,350,130,YEL,{al:'center',a:fin(t,s_jaw-.1)});
 const k=clamp((t-s_jaw)/(s.t1-s_jaw));sideplane(420+k*900,560+k*160,1.1,fin(t,s_jaw),.2);pill('MELAYANG — KARENA SAYAP, BUKAN MESIN',W/2,860,38,GRN,'#111',fin(t,s_say-.1))});
const u_mes=Q('Mesin mati memang'),u_mal=Q('Malam itu dua ratus'),u_say=Q('sayap yang terus melayang'),u_kru=Q('kru yang tetap tenang'),u_abu=Q('dan abu yang membeku');
sc(u_mes,Q('Sekarang aku penasaran'),'anim',(t,lt,s)=>{bgDark();X.save();X.fillStyle=YEL;X.beginPath();X.roundRect(W/2-150,150,300,70,35);X.fill();X.restore();txt('INTINYA',W/2,186,40,'#111',{al:'center',sh:false});
 txt('Mesin mati itu bahaya, tapi bukan akhir.',W/2,300,56,'#fff',{al:'center',a:fin(t,u_mes)});txt('263 orang selamat karena:',W/2,400,46,'rgba(255,255,255,.8)',{al:'center',a:fin(t,u_mal)});
 [['1','SAYAP YANG TERUS MELAYANG',u_say],['2','KRU YANG TETAP TENANG',u_kru],['3','ABU YANG MEMBEKU TEPAT WAKTU',u_abu]].forEach(([n,l,tt],k)=>{const a=fin(t,tt-.1);X.save();X.globalAlpha=a;X.fillStyle=YEL;X.beginPath();X.arc(560,520+k*120,36,0,7);X.fill();X.restore();txt(n,560,522+k*120,40,'#111',{al:'center',a,sh:false});txt(l,630,520+k*120,54,'#fff',{a})})});
const v_pen=Q('Sekarang aku penasaran'),v_sur=Q('menulis surat perpisahan'),v_per=Q('percaya kaptennya bisa'),v_kom=Q('Tulis di komentar'),v_sub=Q('subscribe intinyaaje');
sc(v_pen,null,'video',(t,lt,s)=>{vign(.5);X.save();X.globalAlpha=.35;X.fillStyle='#000';X.fillRect(0,0,W,H);X.restore();txt('KALAU KAMU DI PESAWAT ITU…',W/2,250,52,'#fff',{al:'center',a:fin(t,v_pen+.6)});
 pill('A · MENULIS SURAT PERPISAHAN',W/2,380,40,'rgba(255,255,255,.14)','#fff',fin(t,v_sur-.1));pill('B · PERCAYA KAPTENNYA BISA',W/2,480,40,'rgba(255,255,255,.14)','#fff',fin(t,v_per-.1));
 pill('TULIS DI KOMENTAR 👇',W/2,620,40,YEL,'#111',fin(t,v_kom-.1));pill('SUBSCRIBE @intinyaaje',W/2,740,44,RED,'#fff',fin(t,v_sub-.3))},{clip:'7093',off:8});
