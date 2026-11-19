// BAB 5 — mendarat hampir buta
window.FADEIN=false;window.FADEOUT=false;
const Q=p=>WT(I(p));
OVER.push(t=>chapterCard(t,0,5,'MENDARAT HAMPIR BUTA',3.0));
const g_izin=Q('Kru meminta izin'),g_nanj=Q('Pesawat mulai menanjak'),g_hamp=Q('Dan saat hampir sampai'),g_perc=Q('percikan cahaya itu muncul lagi'),g_kedua=Q('untuk kedua kalinya');
sc(0,g_hamp,'anim',(t,lt,s)=>{bgDark();const P=profile(t);const k=ease((t-g_nanj)/(s.t1-g_nanj+1.5));const km=3.9+3.2*k;sideplane(P.d2x(110+k*30),P.km2y(km)-12,.45,1,-.12*fin(t,g_nanj));
 pill('MINTA IZIN NAIK LAGI',W/2,200,40,'rgba(255,255,255,.12)','#fff',fin(t,g_izin-.1));pill('MENUJU JAKARTA',W/2,290,36,YEL,'#111',fin(t,g_izin+1.2))});
sc(g_hamp,Q('Kapten Moody langsung mengurangi'),'anim',(t,lt,s)=>{windshield(t,clamp((t-g_perc)/2));pill('AWAN ABU — KEDUA KALINYA',W/2,870,40,RED,'#fff',fin(t,g_kedua-.1))});
const h_kur=Q('Kapten Moody langsung mengurangi'),h_e2=Q('Mesin nomor dua kembali'),h_mati=Q('terpaksa dimatikan'),h_tur=Q('Pesawat turun lagi'),h_37=Q('tiga koma tujuh'),h_3m=Q('dengan tiga mesin');
sc(h_kur,Q('Sekarang tinggal satu'),'anim',(t,lt,s)=>{const off=t>=h_mati;bgDark(off?1:0);plane(700,540,520,0,'#e8eef8',[1,off?0:1,1,1],1);
 pill('TENAGA MESIN DIKURANGI',1200,320,34,'rgba(255,255,255,.12)','#fff',fin(t,h_kur),'left');if(t>h_e2-.1)pill('MESIN 2 BATUK LAGI',1200,420,36,'rgba(255,77,77,.25)',RED,fin(t,h_e2-.1),'left');
 if(t>h_tur-.2){txt('3,7 km',1200,560,110,'#fff',{a:fin(t,h_37-.2)});pill('TIGA MESIN',1200,700,40,YEL,'#111',fin(t,h_3m-.1),'left')}});
const i_hal=Q('Mendarat di Bandara Halim');
sc(T('Sekarang tinggal satu'),Q('Masalahnya kaca depan'),'video',(t,lt,s)=>{vign(.4);pill('TANTANGAN TERAKHIR',W/2,180,40,'rgba(10,14,22,.85)','#fff',inout(t,s.t0+.2,s.t1));lowerThird('Bandara Halim Perdanakusuma','JAKARTA',t,i_hal,s.t1)},{clip:'255761',grade:'dim'});
const j_amp=Q('seperti diamplas'),j_bur=Q('sampai buram'),j_cer=Q('cuaca malam itu cerah'),j_dal=Q('Tapi dari dalam kokpit');
function frosted(t,clear=0,blur=14){// kaca buram: lampu kota/landasan kabur
 X.fillStyle='#070a12';X.fillRect(0,0,W,H);X.save();X.filter=`blur(${blur}px)`;for(let i=0;i<140;i++){const r=Math.sin(i*45.1)*999,f=r-Math.floor(r),r2=Math.sin(i*13.7)*999,f2=r2-Math.floor(r2);const x=f*W,y=430+f2*260+(i%7)*6;X.fillStyle=i%5?'rgba(255,200,120,.75)':'rgba(255,255,255,.8)';X.beginPath();X.arc(x,y,4+((i*7)%6),0,7);X.fill()}
 X.restore();X.fillStyle='rgba(200,215,235,.18)';X.fillRect(0,0,W,H);
 if(clear>0){X.save();X.beginPath();X.rect(1560,520,240,170);X.clip();X.fillStyle='#070a12';X.fillRect(1560,520,240,170);for(let i=0;i<12;i++){X.fillStyle='rgba(255,230,160,.95)';X.beginPath();X.arc(1580+i*18,620-i*4,4,0,7);X.fill()}X.restore();X.strokeStyle=YEL;X.lineWidth=4;X.globalAlpha=clear;X.strokeRect(1560,520,240,170);X.globalAlpha=1}
 X.save();X.fillStyle='#030407';X.beginPath();X.rect(0,0,W,H);X.moveTo(150,150);X.lineTo(900,110);X.lineTo(920,700);X.lineTo(210,760);X.closePath();X.moveTo(1770,150);X.lineTo(1020,110);X.lineTo(1000,700);X.lineTo(1830,760);X.closePath();X.fill('evenodd');X.restore()}
sc(T('Masalahnya kaca depan'),Q('Lampu pendarat juga'),'anim',(t,lt,s)=>{frosted(t,0,4+16*clamp((t-j_amp)/2.5));pill('KACA SEPERTI DIAMPLAS',W/2,840,40,'rgba(255,255,255,.14)','#fff',fin(t,j_amp-.1));
 if(t>j_cer-.1)pill('DI LUAR: CERAH',W/2-260,920-20,34,GRN,'#111',fin(t,j_cer-.1));if(t>j_dal-.1)pill('DI DALAM: NYARIS TAK TERLIHAT',W/2+220,920-20,34,RED,'#fff',fin(t,j_dal-.1))});
const k_lam=Q('Lampu pendarat juga'),k_alat=Q('Dan alat pemandu pendaratan'),k_tid=Q('sedang tidak bekerja');
sc(k_lam,Q('Jadi mereka mendarat'),'anim',(t,lt,s)=>{bgDark(1);txt('YANG TIDAK BISA DIANDALKAN',W/2,200,44,'rgba(255,255,255,.75)',{al:'center',w:700,ls:4});
 [['KACA DEPAN: BURAM',s.t0+.2],['LAMPU PENDARAT: TERGORES',k_lam+.6],['PEMANDU PENDARATAN BANDARA: MATI',k_tid-.3]].forEach(([l,tt],k)=>{const a=fin(t,tt);txt('✕',560,360+k*140,70,RED,{a,al:'center'});txt(l,640,360+k*140,54,'#fff',{a})})});
const l_man=Q('Jadi mereka mendarat'),l_kop=Q('Kopilot membacakan ketinggian'),l_bay=Q('jalur turun bayangan');
sc(l_man,Q('Kapten Moody mengintip'),'anim',(t,lt,s)=>{bgDark();X.fillStyle='#1b2436';X.fillRect(1260,800,600,22);for(let i=0;i<12;i++){X.fillStyle=YEL;X.fillRect(1270+i*50,808,22,6)}txt('LANDASAN',1560,860,30,'rgba(255,255,255,.7)',{al:'center',w:700,ls:3,sh:false});
 const k=clamp((t-l_kop)/(s.t1-l_kop));const pts=[...Array(7)].map((_,i)=>[220+i*170,240+i*(560/7)]);pts.forEach((p,i)=>{if(k*7<i)return;X.fillStyle=YEL;X.beginPath();X.arc(p[0],p[1],10,0,7);X.fill();});
 X.save();X.setLineDash([14,12]);X.strokeStyle=`rgba(255,255,255,${.6*fin(t,l_bay-.2)})`;X.lineWidth=4;X.beginPath();X.moveTo(220,240);X.lineTo(1300,800);X.stroke();X.restore();
 const p=pts[Math.min(6,Math.floor(k*7))];sideplane(p[0]+40,p[1]-30,.42,1,.45);
 pill('HAMPIR MANUAL',W/2,150,44,YEL,'#111',fin(t,l_man-.1));pill('KOPILOT MEMBACAKAN KETINGGIAN',1200,300,32,'rgba(255,255,255,.12)','#fff',fin(t,l_kop-.1),'left');pill('JALUR TURUN “BAYANGAN”',1200,390,32,'rgba(255,255,255,.12)','#fff',fin(t,l_bay-.1),'left')});
const m_int=Q('Kapten Moody mengintip'),m_pin=Q('di pinggir kaca');
sc(m_int,Q('Dan pesawat itu mendarat'),'anim',(t,lt,s)=>{frosted(t,fin(t,m_pin-.3),20);pill('CELAH KECIL YANG MASIH BENING',1680,460,30,YEL,'#111',fin(t,m_pin-.1),'right')});
const n_sel=Q('Selamat'),n_bah=Q('Bahkan setelah mendarat'),n_sor=Q('Lampu sorot di apron'),n_jal=Q('tidak bisa berjalan sendiri');
sc(T('Dan pesawat itu mendarat'),null,'video',(t,lt,s)=>{vign(.4);txt('MENDARAT.',W/2,420,120,'#fff',{al:'center',a:inout(t,s.t0+.2,n_bah)});txt('SELAMAT.',W/2,560,130,GRN,{al:'center',a:inout(t,n_sel-.1,n_bah)});
 pill('KACA TERLALU BURAM UNTUK JALAN',W/2,300,38,'rgba(10,14,22,.85)','#fff',fin(t,n_bah+.6));pill('SILAU LAMPU SOROT',W/2,400,36,YEL,'#111',fin(t,n_sor-.1));pill('TIDAK BISA JALAN SENDIRI KE PARKIR',W/2,500,36,'rgba(255,255,255,.14)','#fff',fin(t,n_jal-.1))},{clip:'172262'});
