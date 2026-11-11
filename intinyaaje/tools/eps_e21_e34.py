import sys,os,re; sys.path.insert(0,os.path.dirname(__file__)); from epbuild import *
EP=os.path.join(os.path.dirname(__file__),'..','episodes')
def finder(ep):
    ws=[re.sub(r'[^a-z0-9]','',w.lower()) for w in open(f"{EP}/{ep}/script.txt").read().split()]
    def W(ph,after=0):
        p=[re.sub(r'[^a-z0-9]','',x.lower()) for x in ph.split()]
        for i in range(after,len(ws)-len(p)+1):
            if ws[i:i+len(p)]==p: return i
        raise SystemExit(f"{ep}: frasa tidak ketemu: {ph}")
    return W
L=lambda w,w1,t,y=505,x=70,s=42:(w,w1,x,y,t,s)
TH=['kuning','hijau','oranye','cyan','pink','ungu']; MU=['santai','lofi','misteri','ceria','penasaran','petualangan']; TR=['campur','zoom','geser','putar']
EPS=[]
def ep(i,id,meta,regions,cams,hl,labels,sfx,faces,hud,card,svg,sea):
    meta=dict(meta); meta['style']={'theme':TH[i%6],'cap':['frasa','frasa2'][i%2],'trans':TR[i%4]}; meta['music']=MU[(i*5)%6]
    meta['voice']={"name":"Puck","provider":"Gemini TTS","model":"gemini-3.1-flash-tts-preview"}
    if id=='e28-pesawat-pelan': meta['style']['cap']='frasa'
    build(id,meta,regions,cams,hl,labels,sfx,faces,hud,card,svg,sea)
    import json; p=f"{EP}/{id}/episode.json"; d=json.load(open(p)); d['voice']=meta['voice']; json.dump(d,open(p,'w'),ensure_ascii=False,indent=1)

# 0 e21 tornado
id='e21-tornado';W=finder(id)
rg={'A':R(60,1020,180,1100),'B':R(1460,2340,250,1150),'C':R(2840,3760,150,1100)}
ep(0,id,dict(pillar='alam',angle='antitesis video viral "Indonesia nggak ada tornado": puting beliung = tornado kecil (BMKG); Rancaekek Feb 2024 BRIN vs BMKG',viral_bukti='Inilah kenapa di indonesia nggak ada tornado (wmgtPCrifQI) 24 jt',title='Indonesia Beneran Nggak Ada Tornado? 🌪️',closing='tips',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Yang jarang'),'C')],
 [S('.atap',W('Pusaran angin'),0.4),S('.besar',W('Tornado besar'),0.5),S('.sama',W('Yang jarang'),0.4,W('Jadi kalau')),S('.langit',W('Jadi kalau'),0.6),S('.lari',W('Menjauh'),0.4)],
 [L(W('Peneliti BRIN'),W('BMKG bilang'),'KATA BRIN: *TORNADO*'),L(W('BMKG bilang'),W('Siapa yang bener'),'KATA BMKG: *PUTING BELIUNG*',585),L(W('Bentuknya sama'),W('Bedanya'),'SAMA: PUSARAN DARI AWAN'),L(W('Puting beliung kita'),W('Yang jarang'),'KITA: *&lt;10 MENIT*')],
 [[W('nyabut'),'KREEK!',600,600,-8,'#ff5c8a']],[[W('Kedengarannya'),'bingung'],[W('Yang jarang'),'dapat-ide']],
 [(0,'Indonesia *bebas tornado*?'),(W('Peneliti BRIN'),'BRIN vs *BMKG*'),(W('Siapa yang bener'),'Kita bedah *pusarannya*'),(W('Yang jarang'),'Yang jarang: *raksasanya*'),(W('Jadi kalau'),'')],
 (W('Jadi kalau'),['PUTING BELIUNG','ITU *TORNADO*','UKURAN KECIL']),'tornado.svg','#2b3140')

# 1 e22 counter
id='e22-counter-steering';W=finder(id)
rg={'A':R(300,800,620,1080),'B':R(1450,2350,100,1300),'C':R(2850,3750,250,1150)}
ep(1,id,dict(pillar='kendaraan',angle='countersteering: mau belok kanan, setang kanan didorong; motor belok karena miring',viral_bukti='Memahami Fisika Counter Steering (FkpO3-wbobQ) 1,2 jt; kluster fakta motor 13 jt',title='Belok Kanan Malah Dorong Setang Kanan? 🏍️',closing='tips',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Teknik ini'),'C')],
 [S('.putarKanan',W('Refleksnya'),0.3,W('Tapi pembalap')),S('.dorong',W('Waktu setang'),0.4),S('.rodaKiri',W('roda depan nyelonong'),0.4),H('.rodaTop',W('roda depan nyelonong')),S('.jalur',W('Nah'),0.6),S('.kmh',W('Di atas kecepatan'),0.4)],
 [L(W('Refleksnya'),W('Tapi pembalap'),'REFLEKS: *PUTAR KANAN*'),L(W('Tapi pembalap'),W('Kedengarannya'),'PEMBALAP: *DORONG KANAN*',585),L(W('Motor nggak belok'),W('Waktu setang'),'MOTOR BELOK = *MIRING*'),L(W('Teknik ini'),W('Di atas kecepatan'),'*COUNTERSTEERING*')],
 [[W('ngawur'),'HAH?!',620,600,-8,'#ffd23f']],[[W('ngawur'),'bingung'],[W('Teknik ini'),'dapat-ide']],
 [(0,'Belok *kanan*'),(W('Tapi pembalap'),'Kata pembalap: *kebalik*'),(W('Siapa yang bener'),'Lihat dari *atas*'),(W('Teknik ini'),'*Countersteering*'),(W('Jadi refleksmu'),'')],
 (W('Jadi refleksmu'),['MOTOR BELOK','KARENA *MIRING*,','BUKAN SETANG']),'counter.svg','#0f2a1f')

# 2 e23 api minyak
id='e23-api-minyak';W=finder(id)
rg={'A':R(100,1000,420,980),'B':R(1450,2350,40,950),'C':R(2850,3750,450,1000)}
ep(2,id,dict(pillar='rumah',angle='api minyak jangan disiram air: air tenggelam, jadi uap, melempar minyak terbakar; tutup wajan',viral_bukti='Kandungan Air Membuat Api Menyambar (XB5FalmQQ_c) 9,1 jt',title='Minyak Wajan Terbakar, Siram Air? 🔥',closing='punchline',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Api itu butuh'),'C')],
 [S('.gayung',W('Refleks pertama'),0.3,W('Siapa yang bener')),S('.air',W('Air lebih berat'),0.4),S('.uap',W('Air langsung berubah'),0.5),S('.bola',W('Hasilnya bola api'),0.4),S('.tutup',W('tutup wajannya'),0.5),H('.apiC',W('Biarkan dingin'))],
 [L(W('Air lebih berat'),W('Di bawah sana'),'AIR *TENGGELAM*'),L(W('Air langsung berubah'),W('Uap itu'),'AIR → *UAP* SEKEJAP'),L(W('Api itu butuh'),W('Matikan'),'API BUTUH *UDARA*'),L(W('Matikan kompor'),W('Biarkan'),'MATIKAN + *TUTUP*',560)],
 [[W('Hasilnya bola api'),'WUUSH!',600,560,-8,'#ff7a1a']],[[W('Justru itu'),'kaget'],[W('Matikan kompor'),'menunjuk']],
 [(0,'Minyak *terbakar*'),(W('Refleks pertama'),'Refleks: *siram air*'),(W('Siapa yang bener'),'Kita bedah *wajannya*'),(W('Api itu butuh'),'Yang benar: *tutup*'),(W('Gayung airnya'),'')],
 (W('Gayung airnya'),['API MINYAK','JANGAN DISIRAM.','*TUTUP!*']),'apiminyak.svg','#2a1408')

# 3 e24 rel
id='e24-rel-sempit';W=finder(id)
rg={'A':R(40,1060,700,1030),'B':R(1450,2350,350,1300),'C':R(2850,3750,300,1110)}
ep(3,id,dict(pillar='kendaraan',angle='rel 1067 mm: rel pertama 1867 justru 1435; kolonial pilih sempit (murah, berkelok), Jepang ubah sisa rel lebar; Whoosh & jalur baru 1435',viral_bukti='kenapa kereta di Indonesia mungil mungil?? (I0sVU0aEVcI) 5,5 jt',title='Kenapa Kereta Kita Mungil? 🚆',closing='jawab-konflik',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Sekarang arahnya'),'C')],
 [S('.lebar',W('Rel lebar ukurannya'),0.4,W('Pemerintah kolonial')),S('.whoosh',W('Whoosh'),0.5)],
 [L(W('Banyak orang'),W('Tapi rel pertama'),'KATA ORANG: *BIAR MURAH*'),L(W('Tapi rel pertama'),W('Siapa yang bener'),'RAL PERTAMA: *LEBAR*'.replace('RAL','REL'),585),L(W('Pemerintah kolonial'),W('Lebih murah'),'DIPILIH: *1.067 mm*'),L(W('Waktu pendudukan'),W('Makanya'),'JEPANG: *DIUBAH SEMPIT*'),L(W('Lebih murah'),W('Waktu pendudukan'),'GAMPANG *BERKELOK*',560)],
 [],[[W('Siapa yang bener'),'bingung'],[W('Sekarang arahnya'),'senang']],
 [(0,'Kereta kita *mungil*'),(W('Siapa yang bener'),'Kita ukur *relnya*'),(W('Sekarang arahnya'),'Sekarang *berbalik*'),(W('Jadi rel'),'')],
 (W('Jadi rel'),['SEMPIT BUKAN','KARENA PELIT,','TAPI *WARISAN*']),'rel.svg','#0b2230')

# 4 e25 lift
id='e25-lift-jatuh';W=finder(id)
rg={'A':R(330,750,120,1220),'B':R(1580,2320,150,1200),'C':R(2950,3650,380,1150)}
ep(4,id,dict(pillar='kota',angle='mitos lompat di lift jatuh: lompatan cuma kurangi ±15% kecepatan; lift modern punya banyak kabel + governor + rem pengaman (Otis 1852)',viral_bukti='Jangan Lakukan Ini Saat Mau Masuk Lift (HJ8W5N1crcs) 6,8 jt',title='Lift Jatuh, Lompat Biar Selamat? 🛗',closing='tips',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Kabar baiknya'),'B'),(W('Rem ini'),'C')],
 [M('.kabin',W('tiba-tiba lift'),[0,300,0],1.2),H('.kabel',W('tiba-tiba lift')),S('.lompat',W('lompat tepat'),0.3,W('Siapa yang bener')),S('.speed',W('Lift yang jatuh'),0.4),S('.governor',W('alat pengatur'),0.4),S('.rem',W('rem darurat'),0.4),S('.otis',W('Rem ini'),0.4),S('.darurat',W('Pencet'),0.3)],
 [L(W('Kata film'),W('Kata fisika'),'KATA FILM: *LOMPAT!*'),L(W('Kata fisika'),W('Siapa yang bener'),'KATA FISIKA: *PERCUMA*',585),L(W('Lompatan atlet'),W('Belum lagi'),'LOMPAT: CUMA *−15%*'),L(W('Lift digantung'),W('Kalau turunnya'),'*BANYAK* KABEL BAJA')],
 [[W('meluncur turun'),'WAAA!',620,560,-8,'#ff5c8a']],[[W('meluncur'),'kaget'],[W('Kabar baiknya'),'senang']],
 [(0,'Lift *meluncur*'),(W('Kata film'),'Lompat = *selamat*?'),(W('Kabar baiknya'),'Lift *nggak* jatuh bebas'),(W('Jadi kalau'),'')],
 (W('Jadi kalau'),['JANGAN LOMPAT.','PENCET TOMBOL','*DARURAT*']),'lift.svg','#141826')

# 5 e26 minimarket
id='e26-minimarket';W=finder(id)
rg={'A':R(120,960,560,1120),'B':R(1380,2620,420,760),'C':R(3050,3750,480,1120)}
ep(5,id,dict(pillar='uang',angle='minimarket sebelahan = teori Hotelling: berebut pembeli di titik tengah + hemat riset lokasi',viral_bukti='Alasan Minimarket Lebih Mendominasi Dibanding Supermarket (NxKZWmnL4p8) 4,3 jt',title='Dua Minimarket Kok Sebelahan? 🏪',closing='punchline',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Bayangkan'),'B'),(W('Ada untung'),'A'),(W('Pembeli juga'),'C')],
 [M('.b1',W('Kalau satu toko'),[-560,0,0],1.0),M('.a1',W('Toko pertama ikut'),[540,0,0],1.0),S('.tengah',W('Ini disebut'),0.4)],
 [L(W('Kata orang'),W('Kata ahli'),'KATA ORANG: *BODOH*'),L(W('Kata ahli'),W('Siapa yang bener'),'KATA EKONOM: *PINTAR*',585),L(W('Ada untung'),W('Pembeli juga'),'LOKASI *TERBUKTI*'),L(W('Akhirnya'),W('Ini disebut'),'BERHENTI *DI TENGAH*')],
 [],[[W('itu bodoh'),'bingung'],[W('Ini disebut'),'dapat-ide']],
 [(0,'Dua toko *sebelahan*'),(W('Bayangkan'),'Satu jalan, *dua toko*'),(W('Ada untung'),'Hemat *riset*'),(W('Jadi mereka'),'')],
 (W('Jadi mereka'),['BUKAN NEKAT,','REBUTAN','*PEMBELI*']),'minimarket.svg','#0e1f33')

# 6 e27 lidah
id='e27-lidah-putih';W=finder(id)
rg={'A':R(160,920,300,1100),'B':R(1450,2350,520,1120),'C':R(2950,3650,380,1100)}
ep(6,id,dict(pillar='tubuh',angle='lidah putih: sisa makanan, sel mati, bakteri nyangkut di papila + mulut kering; panas dalam bukan diagnosis',viral_bukti='Kenapa Lidah Ada Putih Putihnya? (cw4_lOPJpew) 5,7 jt',title='Lidah Putih Tanda Panas Dalam? 👅',closing='tips',experiment='2 video/hari + suara Puck; sumber detikHealth'),
 rg,[(0,'A',(540,820,800)),(W('Permukaan lidah'),'B'),(W('Panas dalam itu'),'C')],
 [S('.putih',W('lidahmu putih'),0.5),S('.kotor',W('Sisa makanan'),0.4),S('.bakteri',W('dan bakteri'),0.4),S('.sikat',W('sikat gigi'),0.4),S('.dokter',W('periksa'),0.4)],
 [L(W('Kata orang'),W('Kata dokter'),'KATA ORANG: *PANAS DALAM*'),L(W('Kata dokter'),W('Siapa yang bener'),'DOKTER GIGI: *KOTOR*',585),L(W('Ada ribuan'),W('Sisa makanan'),'*PAPILA* = KARPET BERBULU'),L(W('Kalau mulut kering'),W('Dari jauh'),'MULUT *KERING*')],
 [],[[W('Kata orang'),'bingung'],[W('Cara beresinnya'),'menunjuk']],
 [(0,'Lidah *putih*'),(W('Permukaan lidah'),'Kita zoom *lidahnya*'),(W('Panas dalam itu'),'Cara *beresin*'),(W('Tapi kalau putihnya'),'')],
 (W('Tapi kalau putihnya'),['MINUM, SIKAT,','BERSIHKAN','*LIDAH*']),'lidah.svg','#2a0f1a')

# 7 e28 pesawat pelan
id='e28-pesawat-pelan';W=finder(id)
rg={'A':R(140,940,170,1100),'B':R(1450,2350,550,1000),'C':R(2850,3750,300,1200)}
ep(7,id,dict(pillar='kendaraan',angle='pesawat 900 km/jam terasa pelan: tak ada patokan dekat; tubuh cuma rasakan percepatan; bayangan pesawat tunjukkan kecepatan asli',viral_bukti='Pesawat Ngebut 900 Km/Jam, Tapi Kok Terasa Pelan? (A4UeLhV34yA) 3,2 jt',title='Pesawat 900 km/jam Kok Kerasa Diam? ✈️',closing='loop',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Otak menilai'),'B'),(W('Di ketinggian'),'A'),(W('Coba perhatikan'),'C')],
 [S('.kmh',W('sembilan ratus'),0.4),S('.blur',W('Naik motor'),0.4,W('Di ketinggian')),M('.awanJauh',W('Gerakannya'),[-60,0,0],3.0),M('.bayang',W('Bayangan itu'),[-700,0,0],2.5)],
 [L(W('Rasanya kayak diam'),W('padahal'),'MATA: *DIAM*'),L(W('padahal'),W('Kalau secepat'),'ANGKA: *900 km/jam*',585),L(W('Badan kita'),W('Waktu lepas'),'BADAN CUMA RASA *PERUBAHAN*'),L(W('Otak menilai'),W('Naik motor'),'PATOKAN = BENDA *DEKAT*')],
 [],[[W('kok nggak kerasa'),'bingung'],[W('Nah'),'setuju']],
 [(0,'Pesawat *terasa diam*'),(W('Otak menilai'),'Otak butuh *patokan*'),(W('Coba perhatikan'),'Lihat *bayangannya*'),(W('Nah'),'')],
 (W('Nah'),['BAYANGAN','PESAWAT =','*KECEPATAN ASLI*']),'pesawat.svg','#0c2a52')

# 8 e29 huruf a
id='e29-huruf-a';W=finder(id)
rg={'A':R(160,920,300,1060),'B':R(1620,2180,260,1160),'C':R(2950,3650,220,1120)}
ep(8,id,dict(pillar='unik',angle='dua bentuk huruf a: keduanya turunan A kapital; versi satu tingkat dari tulisan tangan cepat, dua tingkat umum di huruf cetak tegak',viral_bukti='Kenapa Huruf a kecil Ada Dua Bentuk? (weBceyk2aww) 5,1 jt',title='Huruf a di HP Kok Beda Sama Tulisanmu? 🔤',closing='teaser',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Sekarang lihat'),'B'),(W('Dua-duanya sah'),'C')],
 [S('.tingkat',W('ada lengkungan'),0.3),S('.panah',W('Waktu orang menulis'),0.4),S('.duaA',W('jadilah'),0.5),S('.gg',W('Huruf g'),0.4)],
 [L(W('Guru SD'),W('buku dan HP'),'GURU: *a BULAT*'),L(W('buku dan HP'),W('Siapa yang bener'),'HP: *a BERTINGKAT*',585),L(W('Dua-duanya sah'),W('Waktu orang'),'TURUNAN *A KAPITAL*'),L(W('Coba perhatikan'),W('Jadi kamu'),'HURUF MIRING: *BULAT LAGI*')],
 [],[[W('Bentuknya beda'),'bingung'],[W('Dua-duanya sah'),'senang']],
 [(0,'Tulis huruf *a*'),(W('Sekarang lihat'),'Di HP *beda*'),(W('Dua-duanya sah'),'Asalnya *A kapital*'),(W('Jadi kamu'),'')],
 (W('Jadi kamu'),['VERSI TANGAN','vs','*VERSI CETAK*']),'huruf.svg','#1d1730')

# 9 e30 kereta rem
id='e30-kereta-rem';W=finder(id)
rg={'A':R(60,1000,620,1100),'B':R(1250,3350,650,1220,1200),'C':R(3650,4350,420,940)}
ep(9,id,dict(pillar='kendaraan',angle='masinis nggak bisa ngerem mendadak: 8–12 gerbong ±600 ton, rem udara; simulasi KAI 100 km/jam butuh ±505 m',viral_bukti='Kenapa Harus Berhenti Pas Palang Kereta Turun? (kFvyL-r8UP4) 6,9 jt; Kenapa Kereta Justru Dilarang Mengerem Darurat (lu4kNs0ip58) 1,9 jt',title='Masinis Kok Nggak Ngerem? 🚆',closing='tips',experiment='2 video/hari + suara Puck; sumber simulasi KAI Daop 8'),
 rg,[(0,'A'),(W('Satu rangkaian'),'B'),(W('Itu lima'),'C'),(W('Makanya palang'),'A')],
 [S('.ton',W('Satu rangkaian'),0.4),S('.jarak',W('Simulasi KAI'),0.5),S('.lapangan',W('Itu lima'),0.4),S('.sirine',W('Begitu sirine'),0.3)],
 [L(W('Komentar netizen'),W('Kata masinis'),'NETIZEN: *KOK NGGAK NGEREM?*'),L(W('Kata masinis'),W('Siapa yang bener'),'MASINIS: *SUDAH NGEREM*',585),L(W('Remnya pakai'),W('Simulasi'),'REM *UDARA*'),L(W('Kalau direm'),W('Jadi waktu'),'REM MENDADAK: *ANJLOK*')],
 [[W('nyelonong'),'TEEEET!',620,560,-8,'#ff3b30']],[[W('Komentar'),'bingung'],[W('Itu lima'),'kaget']],
 [(0,'Orang *nyelonong*'),(W('Satu rangkaian'),'±600 *TON*'),(W('Itu lima'),'Jarak *berhenti*'),(W('Makanya palang'),'')],
 (W('Makanya palang'),['SIRINE BUNYI?','*BERHENTI*,','TUNGGU LEWAT']),'rem.svg','#1a1a2e')

# 10 e31 tol bambu
id='e31-tol-bambu';W=finder(id)
rg={'A':R(-100,1180,600,1000),'B':R(1450,2350,280,1250),'C':R(2850,3750,450,1000)}
ep(10,id,dict(pillar='indonesia',angle='tol Semarang-Demak di atas lumpur pakai ±6 juta bambu: matras mengapung + cerucuk, terendam lebih awet, PVD, 30–40% lebih murah (Bina Marga)',viral_bukti='Jalan Tol di Atas Lumpur Laut, Ngambang di Atas Jutaan Bambu? (UNUWz4x74Bo) 1,1 jt',title='Jalan Tol Kok Pakai Bambu? 🎋',closing='jawab-konflik',experiment='2 video/hari + suara Puck; sumber Bina Marga PUPR'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Menurut Bina'),'C')],
 [S('.ambles',W('timbunannya ambles'),0.4,W('Jadi bambu')),S('.matras',W('dianyam'),0.5),S('.cerucuk',W('ditancap'),0.5),S('.turun',W('Airnya dikeluarkan'),0.5),S('.hemat',W('dan biayanya'),0.4)],
 [L(W('Kata orang'),W('Kata insinyurnya'),'KATA ORANG: *GAMPANG LAPUK*'),L(W('Kata insinyurnya'),W('Siapa yang bener'),'INSINYUR: *PALING KUAT*',585),L(W('Matras ini'),W('Bambu yang'),'MATRAS *MENGAPUNG*'),L(W('Bambu yang terendam'),W('Airnya'),'TERENDAM = *AWET*')],
 [],[[W('masa jalan tol'),'bingung'],[W('Menurut Bina'),'kaget']],
 [(0,'Tol di atas *laut*'),(W('Siapa yang bener'),'Kita bedah *fondasinya*'),(W('Menurut Bina'),'±6 *juta* bambu'),(W('Jadi bambu itu'),'')],
 (W('Jadi bambu itu'),['BAMBU BUKAN','MURAHAN, ASAL','*TEMPATNYA PAS*']),'tolbambu.svg','#0a2a3a')

# 11 e32 parasut
id='e32-parasut';W=finder(id)
rg={'A':R(100,980,200,1100),'B':R(1550,2250,180,1220),'C':R(2850,3750,300,1180)}
ep(11,id,dict(pillar='kendaraan',angle='pesawat penumpang tanpa parasut: ±11 km udara tipis, 900 km/jam, tabrak sayap/ekor, kecelakaan saat lepas landas/mendarat',viral_bukti='Mengapa Pesawat PENUMPANG Tidak Dilengkapi Parasut!! (d0D20trYSdU) 741 rb; kluster 3 Fakta Penerbangan (uAokdeGa_0I) 8,6 jt',title='Kenapa Penumpang Nggak Dikasih Parasut? 🪂',closing='tips',experiment='2 video/hari + suara Puck'),
 rg,[(0,'A'),(W('Pesawat jet'),'B'),(W('Dan kebanyakan'),'C')],
 [S('.parasutQ',W('harusnya tiap'),0.4,W('Pesawat jet')),S('.oksigen',W('Udara di sana'),0.4),S('.angin',W('Kecepatannya'),0.4),S('.landas',W('Dan kebanyakan'),0.5)],
 [L(W('Kata orang'),W('Kedengarannya'),'KATA ORANG: *MASKAPAI PELIT*'),L(W('Kata pilot'),W('Siapa yang bener'),'KATA PILOT: *NGGAK BERGUNA*',585),L(W('Lalu badanmu'),W('Dan kebanyakan'),'BISA TABRAK *SAYAP*')],
 [],[[W('maskapai pelit'),'bingung'],[W('Jadi maskapai'),'menunjuk']],
 [(0,'Kok *nggak ada* parasut?'),(W('Pesawat jet'),'Di ketinggian *11 km*'),(W('Dan kebanyakan'),'Kapan *kecelakaan*?'),(W('Jadi maskapai'),'')],
 (W('Jadi maskapai'),['DENGERIN','*PERAGAAN*','KESELAMATAN']),'parasut.svg','#0c2a52')

# 12 e33 ac
id='e33-ac-sirkulasi';W=finder(id)
rg={'A':R(40,1020,380,1100),'B':R(1500,2300,300,1250),'C':R(2950,3650,450,850)}
ep(12,id,dict(pillar='kendaraan',angle='mode sirkulasi dalam AC mobil menumpuk CO2 (4 orang ±2.000 ppm dalam 20 menit) → ngantuk; pakai udara luar',viral_bukti='Fitur Tersembunyi Pada Mobil Yang Tidak Diketahui Orang-orang (sA4BpxjSTtk) 9,6 jt; Fakta paling berguna buat mobil (fW7kSniMy7g) 21 jt',title='Ngantuk di Mobil Gara-Gara Tombol Ini? 🚗',closing='tips',experiment='2 video/hari + suara Puck; sumber CO2Meter/GSS'),
 rg,[(0,'A'),(W('Mode sirkulasi dalam memutar'),'B'),(W('Solusinya'),'C')],
 [S('.zzz',W('ngantuk berat'),0.3,W('Mode sirkulasi dalam memutar')),S('.co2',W('karbon dioksida'),0.6),S('.ppm2',W('Uji di mobil'),0.4),S('.luar',W('pindah ke udara'),0.4),H('.dalam',W('pindah ke udara'))],
 [L(W('Kata orang'),W('Kata sensor'),'KATA ORANG: *KECAPEKAN*'),L(W('Kata sensor'),W('Siapa yang bener'),'SENSOR: *NAPAS SENDIRI*',585),L(W('Di angka itu'),W('Solusinya'),'*SUSAH FOKUS*, NGANTUK')],
 [],[[W('ngantuk berat'),'bingung'],[W('Solusinya'),'dapat-ide']],
 [(0,'Perjalanan *jauh*'),(W('Mode sirkulasi dalam memutar'),'Isi kabin: *CO₂*'),(W('Solusinya'),'Tombol *yang benar*'),(W('Kalau mulai'),'')],
 (W('Kalau mulai'),['SIRKULASI DALAM','SEBENTAR SAJA,','LALU *UDARA LUAR*']),'ac.svg','#1a2433')

# 13 e34 semen
id='e34-semen-papua';W=finder(id)
rg={'A':R(120,960,500,1000),'B':R(1450,2350,250,1300),'C':R(2850,3750,580,1180)}
ep(13,id,dict(pillar='indonesia',angle='semen Rp2 jt di Ilaga: belum ada jalan darat, semua lewat pesawat kecil dari Timika; ongkos terbang > harga semen',viral_bukti='Alasan Kenapa Harga Barang Mahal di Papua (vjx1bud7WfQ) 3,2 jt',title='Semen Rp2 Juta, Pedagangnya Serakah? 🏔️',closing='jawab-konflik',experiment='2 video/hari + suara Puck; sumber Bisnis.com (Bupati Puncak, 2019)'),
 rg,[(0,'A'),(W('Siapa yang bener'),'B'),(W('Bukan cuma'),'C')],
 [S('.sakPapua',W('Di Ilaga'),0.4),M('.pesawatKecil',W('naik pesawat'),[500,0,0],2.5),S('.ongkos',W('jadi ongkos'),0.4),S('.trans',W('Makanya pemerintah'),0.5)],
 [L(W('Kata orang'),W('Kata yang pernah'),'KATA ORANG: *SERAKAH*'),L(W('Kata yang pernah'),W('Siapa yang bener'),'YANG PERNAH KE SANA: *JALANNYA*',585),L(W('Ilaga waktu itu'),W('Semua barang'),'*BELUM ADA* JALAN DARAT'),L(W('Satu sak semen beratnya'),W('jadi ongkos'),'1 SAK = *40–50 KG*')],
 [],[[W('pedagangnya pasti'),'bingung'],[W('Bukan cuma'),'kaget']],
 [(0,'Semen *Rp2 juta*'),(W('Siapa yang bener'),'Lewat *udara*'),(W('Bukan cuma'),'Bukan cuma *semen*'),(W('Jadi yang bikin'),'')],
 (W('Jadi yang bikin'),['YANG MAHAL','BUKAN PEDAGANG,','TAPI *JARAKNYA*']),'semen.svg','#0e2a1e')
