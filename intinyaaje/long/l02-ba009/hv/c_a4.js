// BAB 4 — abu Galunggung
window.FADEIN=false;window.FADEOUT=false;
const Q=p=>WT(I(p));
OVER.push(t=>chapterCard(t,0,4,'ABU GALUNGGUNG',3.0));
const a_lagi=Q('lagi dan lagi'),a_padahal=Q('Padahal secara aturan'),a_tujuh=Q('Tujuh kilometer'),a_enam=Q('Enam'),a_lima=Q('Lima'),a_batas=Q('Batas keputusan');
sc(0,a_tujuh,'anim',(t,lt,s)=>{bgDark(1);const km=7.25-.2*clamp(lt/(s.t1-s.t0));sideplane(560,520,1.3,1,.1);altimeter(1300,430,km,'KETINGGIAN',fin(t,3));
 [0,1,2].forEach(k=>pill('COBA LAGI',1300,600+k*80,32,'rgba(255,255,255,.12)','#fff',fin(t,a_lagi-1.2+k*.7)));pill('TIDAK DIRANCANG UNTUK INI',1300,860,34,RED,'#fff',fin(t,a_padahal+.8))});
sc(a_tujuh,Q('Lalu di ketinggian'),'anim',(t,lt,s)=>{bgDark(1);const P=profile(t);const y37=P.km2y(3.7);X.save();X.strokeStyle=YEL;X.lineWidth=6;X.setLineDash([18,10]);X.beginPath();X.moveTo(P.x0,y37);X.lineTo(P.x1,y37);X.stroke();X.restore();
 pill('BATAS KEPUTUSAN: 3,7 KM',P.x0+40,y37-50,36,YEL,'#111',1,'left');const kp=[[a_tujuh,7],[a_enam,6],[a_lima,5],[s.t1,4.3]];let km=7;for(let i=0;i<3;i++)if(t>=kp[i][0])km=kp[i][1]+(kp[i+1][1]-kp[i][1])*clamp((t-kp[i][0])/(kp[i+1][0]-kp[i][0]));
 const d=60+ (7-km)*14;sideplane(P.d2x(d),P.km2y(km)-12,.45,1,.065);txt(km.toFixed(1).replace('.',',')+' km',P.d2x(d)+90,P.km2y(km)-60,54,'#fff');
 if(t>a_batas-.1)txt('MAKIN DEKAT…',W/2,220,72,RED,{al:'center',a:fin(t,a_batas-.1)})});
const b_jam=Q('jam delapan lima puluh enam'),b_e4=WT(I('Mesin nomor empat menyala')+3),b_e3=WT(I('mesin nomor tiga ikut hidup')+3),b_e1=WT(I('Lalu mesin nomor satu')+3),b_e2=WT(I('Lalu mesin nomor dua')+3),b_13=Q('Setelah sekitar tiga belas menit'),b_kem=Q('keempat mesin kembali menyala');
sc(T('Lalu di ketinggian'),Q('Tapi kenapa'),'anim',(t,lt,s)=>{const on=[t>=b_e1,t>=b_e2,t>=b_e3,t>=b_e4].map(Number);const n=on.reduce((a,b)=>a+b,0);bgDark(n?0:1);plane(700,540,520,0,'#e8eef8',on,1);
 clockPill('20.56 WIB',t,b_jam-.1,s.t1+1);txt('KETINGGIAN ± 4,1 KM',1200,300,40,'rgba(255,255,255,.8)',{w:700,a:fin(t,s.t0+.2)});
 txt('MESIN HIDUP',1200,400,32,'rgba(255,255,255,.7)',{w:700,ls:4,a:fin(t,b_e4-.5)});txt(`${n} / 4`,1196,530,150,n===4?GRN:(n?YEL:RED),{a:fin(t,b_e4-.5)});
 if(t>b_e4-.1&&n<4)pill('MESIN '+['','4 HIDUP','3 HIDUP','1 HIDUP'][n]+'!',1200,690,38,GRN,'#111',1,'left');
 pill('± 13 MENIT MELAYANG DALAM DIAM',1200,690,36,'rgba(255,255,255,.12)','#fff',fin(t,b_13-.1)*(t>=b_e2?1:0),'left');if(t>b_kem-.1)txt('SEMUA HIDUP LAGI',1200,800,60,GRN,{a:fin(t,b_kem-.1)})});
const c_q=Q('Tapi kenapa'),c_jaw=Q('Jawabannya ada di gunung');
sc(c_q,c_jaw,'anim',(t,lt,s)=>{bgDark();txt('KENAPA BISA',W/2,420,100,'#fff',{al:'center',a:fin(t,c_q)});txt('HIDUP LAGI?',W/2,550,120,YEL,{al:'center',a:fin(t,c_q+1.5)})});
const c_gal=Q('Gunung Galunggung'),c_tas=Q('di Tasikmalaya'),c_mel=Q('sedang meletus'),c_abu=Q('awan abu sampai'),c_jal=Q('jalur penerbangan');
sc(c_jaw,c_mel+0.2,'anim',(t,lt,s)=>{const z=ease((t-c_jaw)/2.2);const P=drawMap(t,[108.0-.2*z,-7.4,14-9*z]);const g=P(108.05,-7.25);const k=fin(t,c_gal-.3);
 X.save();X.globalAlpha=k;const r=40+8*Math.sin(t*6);const rg=X.createRadialGradient(g[0],g[1],4,g[0],g[1],r*3);rg.addColorStop(0,'rgba(255,90,40,.85)');rg.addColorStop(1,'rgba(255,90,40,0)');X.fillStyle=rg;X.beginPath();X.arc(g[0],g[1],r*3,0,7);X.fill();
 X.fillStyle='#ff6a3d';X.beginPath();X.moveTo(g[0]-50,g[1]+32);X.lineTo(g[0]-12,g[1]-36);X.lineTo(g[0]+12,g[1]-36);X.lineTo(g[0]+50,g[1]+32);X.closePath();X.fill();X.restore();
 pill('GUNUNG GALUNGGUNG',g[0]+80,g[1]-20,44,'#ff6a3d','#fff',k,'left');pill('TASIKMALAYA, JAWA BARAT',g[0]+80,g[1]+60,30,'rgba(255,255,255,.14)','#fff',fin(t,c_tas-.1),'left')});
sc(c_mel+0.2,Q('Abu vulkanik itu kering'),'video',(t,lt,s)=>{vign(.4);lowerThird('Galunggung meletus','1982',t,s.t0+.3,s.t1);pill('AWAN ABU SAMPAI KE JALUR PENERBANGAN',W/2,180,38,'rgba(10,14,22,.85)','#fff',inout(t,c_abu-.1,s.t1))},{clip:'375643',y:.35});
const d_ker=Q('Abu vulkanik itu kering'),d_air=Q('Tidak mengandung air'),d_rad=Q('radar cuaca di pesawat'),d_deb=Q('bukan debu'),d_ber=Q('Itu sebabnya radar'),d_per=Q('Percikan cahaya di kaca');
sc(d_ker,d_per,'anim',(t,lt,s)=>{bgDark();radar(480,520,250,t,[[.3,-.35,BLU],[.42,-.2,BLU],[.25,-.22,BLU]],fin(t,d_rad-.2),'');radar(1440,520,250,t+1,[],fin(t,d_rad-.2),'');
 txt('AWAN BADAI (AIR)',480,200,40,BLU,{al:'center',a:fin(t,d_rad)});txt('TERDETEKSI',480,830,50,GRN,{al:'center',a:fin(t,d_rad+.8)});
 txt('ABU VULKANIK (KERING)',1440,200,40,'#c9b8a0',{al:'center',a:fin(t,d_ker)});txt('TIDAK TERDETEKSI',1440,830,50,RED,{al:'center',a:fin(t,d_deb-.1)});
 if(t>d_ber-.1)pill('RADAR "BERSIH", PADAHAL DI DALAM ABU',W/2,90+30,36,YEL,'#111',fin(t,d_ber-.1))});
const d_biru=Q('mesin yang menyala biru'),d_bel=Q('bau belerang'),d_sem=Q('semuanya berasal');
sc(d_per,Q('Lalu kenapa mesinnya mati'),'anim',(t,lt,s)=>{bgDark();const it=[['PERCIKAN CAHAYA DI KACA',d_per,BLU],['MESIN MENYALA BIRU',d_biru,'#6c9bff'],['BAU BELERANG',d_bel,YEL]];
 it.forEach(([l,tt,c],k)=>pill(l,W/2,330+k*130,46,'rgba(255,255,255,.08)',c,fin(t,tt-.1)));txt('SEMUA DARI ABU ITU',W/2,760,70,'#fff',{al:'center',a:fin(t,d_sem-.1)})});
// potongan mesin
function engineCut(t,state){// state: {ash, melt, block, cool, crack}
 const x0=180,x1=1740,cy=500,hh=190;X.save();X.fillStyle='#1b2436';X.beginPath();X.roundRect(x0,cy-hh,x1-x0,hh*2,90);X.fill();
 // zona
 const zones=[[x0,560,'KIPAS & KOMPRESOR','#2a3a58'],[760,1160,'RUANG BAKAR','#3a2a2a'],[1160,x1,'TURBIN','#2a3348']];zones.forEach(([a,b,l,c],k)=>{X.fillStyle=k===1?`rgba(${Math.round(200-120*state.cool)},${Math.round(70+60*state.cool)},${Math.round(40+160*state.cool)},.55)`:c;X.fillRect(a,cy-hh+18,b-a,hh*2-36);txt(l,(a+b)/2,cy-hh-40,28,'rgba(255,255,255,.75)',{al:'center',w:700,ls:3,sh:false})});
 // sudu turbin
 for(let i=0;i<5;i++){const x=1240+i*90;X.fillStyle='#8a94a6';for(let j=-3;j<=3;j++){X.fillRect(x,cy+j*48-14,18,28)}
  // lelehan abu menempel
  const m=state.melt*(1-state.crack);if(m>0){X.fillStyle=`rgba(${Math.round(255-130*state.cool)},${Math.round(150-60*state.cool)},${Math.round(60+120*state.cool)},${.9})`;for(let j=-3;j<=3;j++){X.beginPath();X.ellipse(x+9,cy+j*48,12+16*m,12+10*m,0,0,7);X.fill()}}}
 // serpihan rontok
 if(state.crack>0){for(let i=0;i<40;i++){const r=Math.sin(i*12.3)*999,f=r-Math.floor(r);const x=1250+f*440,y=cy-150+((i*37)%300)+state.crack*260+Math.sin(i)*20;X.fillStyle='rgba(150,160,180,.9)';X.fillRect(x,y,10,7)}}
 // aliran udara
 const flow=1-state.block;for(let i=0;i<26;i++){const ph=((t*.5*(0.2+flow)+i/26)%1);const x=x0+40+ph*(x1-x0-80);const y=cy+Math.sin(i*2.1)*(hh-50);if(state.block>.6&&x>1220&&ph>.7)continue;X.fillStyle=`rgba(108,200,255,${.25+.6*flow})`;X.beginPath();X.arc(x,y,7,0,7);X.fill()}
 // partikel abu
 if(state.ash>0){for(let i=0;i<50;i++){const ph=((t*.35+i/50)%1);let x=x0+40+ph*(x1-x0-80);const y=cy+Math.sin(i*5.7)*(hh-40);if(x>1180)continue;const hot=x>760;X.fillStyle=hot?'rgba(255,140,60,.95)':'rgba(170,160,150,.9)';X.globalAlpha=state.ash;X.beginPath();X.arc(x,y,hot?8:6,0,7);X.fill();X.globalAlpha=1}}
 X.restore()}
const e_mati=Q('Lalu kenapa mesinnya mati'),e_bat=Q('batuan dan kaca'),e_rb=Q('Di dalam ruang bakar'),e_mel=Q('serbuk itu meleleh'),e_nem=Q('lalu menempel'),e_sum=Q('menyumbat alirannya'),e_pad=Q('tercekik dan padam'),
 e_why=Q('Dan kenapa bisa hidup lagi'),e_jus=Q('Justru karena'),e_ding=Q('udara yang lebih dingin'),e_ker=Q('Lelehan abu tadi mengeras'),e_ron=Q('lalu rontok'),e_buka=Q('Jalur udaranya terbuka');
sc(e_mati,Q('Jadi yang mematikan mesin'),'anim',(t,lt,s)=>{bgDark();const st={ash:fin(t,e_bat-.2,.6)*(1-fin(t,e_why,1)),melt:clamp((t-e_mel)/(e_sum-e_mel+1)),block:clamp((t-e_nem)/(e_pad-e_nem+.5))*(1-clamp((t-e_ron)/(e_buka-e_ron+.5))),cool:clamp((t-e_ding)/2),crack:clamp((t-e_ron)/1.5)};
 engineCut(t,st);
 if(t<e_why){txt('KENAPA MESIN MATI?',W/2,140,56,'#fff',{al:'center',a:fin(t,e_mati)});pill('ABU = BATUAN & KACA SERBUK',480,840,34,'rgba(255,255,255,.1)','#ddd',fin(t,e_bat-.1));pill('MELELEH DI RUANG BAKAR',W/2+60,840,34,'#ff8a3d','#111',fin(t,e_mel-.1));if(t>e_pad-.1)pill('MESIN PADAM',1500,840,40,RED,'#fff',fin(t,e_pad-.1))}
 else{txt('KENAPA BISA HIDUP LAGI?',W/2,140,56,'#fff',{al:'center',a:fin(t,e_why)});pill('UDARA DINGIN → MESIN MENDINGIN',600,840,34,BLU,'#111',fin(t,e_ding-.1));pill('MENGERAS, RETAK, RONTOK',1260,840,34,'rgba(255,255,255,.14)','#fff',fin(t,e_ker-.1));if(t>e_buka-.1)pill('JALUR UDARA TERBUKA',W/2,920-10,40,GRN,'#111',fin(t,e_buka-.1))}});
const f_jadi=Q('Jadi yang mematikan mesin'),f_sama=Q('hal yang sama'),f_abu=Q('abu yang membeku tepat waktu');
sc(f_jadi,null,'video',(t,lt,s)=>{vign(.6);X.save();X.globalAlpha=.55*fin(t,f_jadi);X.fillStyle='#000';X.fillRect(0,0,W,H);X.restore();txt('YANG MEMATIKAN = YANG MENYELAMATKAN',W/2,400,64,'#fff',{al:'center',a:fin(t,f_sama-.3)});txt('abu yang membeku tepat waktu',W/2,520,70,YEL,{al:'center',it:true,w:700,a:fin(t,f_abu-.1)})},{clip:'52536',grade:'dim'});
