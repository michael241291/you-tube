// BAB 3 — mesin padam: kenapa air bisa mematikan mesin jet
window.FADEIN=false;window.FADEOUT=false;
seq([
 {at:0,k:'video',clip:'11579',off:2,grade:'dim',d:(t,lt,s)=>{pill('HUJAN + BUTIRAN ES',W/2,300,42,'rgba(10,14,22,.85)','#fff',fin(t,T('butiran es')-.2))}},
 {at:'rekaman suara',d:(t,lt)=>{bgDark();txt('REKAMAN SUARA KOKPIT',W/2,300,44,YEL,{al:'center',ls:4,a:fin(t,T('rekaman suara'))});wave(t,260,540,1400,1,140,1,BLU);if(t>T('bunyi hujan es')-.2)pill('BUNYI HUJAN ES TEREKAM',W/2,780,36,'rgba(10,14,22,.85)','#fff',fin(t,T('bunyi hujan es')-.2))}},
 {at:'pesawat sedang turun',d:(t,lt)=>{bgDark();throttle(760,520,lerpN(0.45,0,ease(lt/1.5)),1);throttle(1040,520,lerpN(0.45,0,ease((lt-0.2)/1.5)),1,false);
   if(t>T('flight idle')-.2)pill('FLIGHT IDLE',1500,520,48,YEL,'#111',fin(t,T('flight idle')-.2));if(t>T('ini penting')-.2)txt('INGAT INI',1500,640,36,'#fff',{al:'center',a:fin(t,T('ini penting')-.2)})}},
 {at:'sekitar sembilan puluh',d:(t,lt)=>{bgDark(t>T('kedua mesin padam')?1:0);const f=T('kedua mesin padam')+.3;const eng=[t<f?1:0,t<f+.35?1:0];const sh=t>f&&t<f+.6?Math.sin(t*90)*6:0;twin(620+sh,540,460,0,'#e8eef8',eng,1);
   const tm=Math.min(90,lt*90/Math.max(1,T('di ketinggian')-T('sekitar sembilan')));txt('DETIK DI DALAM BADAI',1120,300,30,'rgba(255,255,255,.7)',{w:700,ls:3});txt(String(Math.floor(tm)),1116,390,110,'#fff');
   if(t>T('sembilan belas ribu')-.2){txt('KETINGGIAN',1120,520,30,'rgba(255,255,255,.7)',{w:700,ls:3,a:fin(t,T('sembilan belas ribu')-.2)});txt('19.000 kaki',1116,600,84,YEL,{a:fin(t,T('sembilan belas ribu')-.2)});txt('± 5,8 km',1120,680,36,'#fff',{a:fin(t,T('hampir enam')-.2)})}
   if(t>f)pill('KEDUA MESIN PADAM',1120,800,40,RED,'#fff',fin(t,f),'left')}},
 {at:'begitu mesin mati',d:(t,lt)=>{panel(t,ease((t-T('generator listrik')+.2)/2.6)*1.2);pill('GENERATOR LISTRIK BERHENTI',W/2,170,38,RED,'#fff',fin(t,T('generator listrik')-.2));if(t>T('tanpa dorongan')-.2)pill('TANPA DORONGAN SAMA SEKALI',W/2,900-20,36,'rgba(10,14,22,.85)','#fff',fin(t,T('tanpa dorongan')-.2))}},
 {at:'sekarang bagian',d:(t,lt)=>{bgDark();quote(['Kenapa air bisa','mematikan mesin jet?'],[T('kenapa air'),T('mematikan mesin')],t,W/2,450,84,120)}},
 {at:'bayangkan mesin jet',d:(t,lt)=>{bgDark();engineCut(t,W/2,520,1.6,{flame:1,labels:(t-T('udara disedot'))/1.2*2});if(t<T('udara disedot')+.3)pill('SEPERTI KOMPOR RAKSASA',W/2,170,40,YEL,'#111',fin(t,T('kompor raksasa')-.2))}},
 {at:'mesin jet sebenarnya',d:(t,lt)=>{bgDark();engineCut(t,W/2,520,1.6,{flame:1,rain:clamp(lt/1.5)*0.5,labels:0});pill('DIRANCANG MENELAN HUJAN',W/2,170,40,GRN,'#06210f',fin(t,T('dirancang untuk menelan')-.2));if(t>T('menguap')-.2)pill('AIR MENGUAP, API TETAP MENYALA',W/2,860,34,'rgba(10,14,22,.85)','#fff',fin(t,T('menguap')-.2))}},
 {at:'tapi setiap mesin',d:(t,lt)=>{bgDark();const idle=t>T('posisi idle,')-.2;const over=t>T('kalau air dan es')-.2;const fl=over?clamp(1-(t-T('apinya kalah')+.3)/0.8)*0.45:idle?0.45:1;
   engineCut(t,W/2,520,1.6,{flame:fl,rain:over?1:0.5,ice:over?1:0,labels:0,rpm:idle?0.35:1});pill('SETIAP MESIN PUNYA BATAS',W/2,170,40,'rgba(10,14,22,.85)','#fff',fin(t,T('setiap mesin')));
   if(idle&&!over)pill('IDLE: PUTARAN PELAN, API KECIL',W/2,860,34,YEL,'#111',fin(t,T('posisi idle,')-.2));if(t>T('apinya kalah')-.2)pill('API PADAM',W/2,860,48,RED,'#fff',fin(t,T('apinya kalah')-.2));if(t>T('seember air')-.3)txt('= kompor disiram seember air',W/2,950-30,30,'#fff',{al:'center',a:0})}},
 {at:'laporan resmi',d:(t,lt)=>{bgDark();txt('KESIMPULAN PENYELIDIK INDONESIA (KNKT)',W/2,280,36,YEL,{al:'center',ls:3,a:fin(t,T('laporan resmi'))});
   quote(['Kepadatan hujan dan es','melebihi batas yang sanggup','ditahan mesin pada posisi idle'],[T('kepadatan hujan'),T('melebihi batas'),T('pada posisi idle')],t,W/2,430,62,100)}}
]);
