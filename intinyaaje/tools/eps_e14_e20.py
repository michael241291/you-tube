import sys,os; sys.path.insert(0,os.path.dirname(__file__)); from epbuild import *
L=lambda w,w1,t,y=480,x=70,s=42:(w,w1,x,y,t,s)

# ---------- e14 mabuk ----------
rg={'A':R(40,1020,560,1100),'B':R(1460,2320,260,1270),'C':R(2800,3700,500,1180)}
build('e14-mabuk',dict(pillar='tubuh',angle='mabuk kendaraan = konflik sinyal telinga dalam vs mata; sopir antisipasi gerak',
  viral_bukti='Kenapa kita bisa mabuk di dalam kendaraan? (FhVyPeof8fo) 817 rb',title='Mabuk Kendaraan Gara-Gara Minyak Angin? 🚗',
  music='santai',style={'theme':'kuning','cap':'frasa','trans':'zoom'},closing='tips',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(34,'B'),(47,'B',(1720,840,950)),(54,'B',(1900,840,950)),(62,'B'),(80,'C')],
  [S('.pusing',13,0.4,34),S('.sinyal1',47,0.4,80),S('.sinyal2',54,0.4,80),S('.bingung',62,0.3,80),S('.mual',72,0.5,80),S('.horizon',95,0.4),S('.depan',98,0.4)],
  [L(16,28,'KATA ORANG: *MINYAK ANGIN*'),L(22,34,'KATA DOKTER: *OTAK*',560),L(35,47,'TELINGA DALAM: *CAIRAN*'),L(48,54,'TELINGA: *KITA GERAK!*'),L(55,62,'MATA: *KITA DIAM*'),L(68,80,'DIKIRA *KERACUNAN*'),L(86,98,'SOPIR *TAHU DULUAN*')],
  [[13,'MUTER!',620,600,-8,'#3ddc84'],[62,'ERROR!',600,640,6,'#ff3b5c']],[[24,'bingung'],[62,'kaget'],[99,'menunjuk']],
  [(0,'Mabuk pas *mudik*'),(16,'Kata orang: *minyak angin*'),(22,'Kata dokter: *otak*'),(34,'Kita bedah *kepalanya*'),(62,'Dua laporan *bentrok*'),(80,'Kenapa sopir *aman*?'),(98,'Biar *nggak mabuk*'),(110,'')],
  (110,['MUAL ITU','DARI *OTAK*,','BUKAN DARI', 'PERUT']),'mabuk.svg','#1b2a4a')

# ---------- e15 trafo ----------
rg={'A':R(80,1180,180,1110),'B':R(1500,2300,170,1080),'C':R(2850,3620,160,1120)}
build('e15-trafo',dict(pillar='bedah jalan',angle='trafo tiang: lilitan banyak vs sedikit turunin 20 kV jadi 220 V; dengung 100 Hz; isinya minyak',
  viral_bukti='Komponen penting di tiang listrik 447 rb; kluster tiang listrik PLN 16 jt',title='Tabung di Tiang Listrik Itu Gas? ⚡',
  music='misteri',style={'theme':'cyan','cap':'frasa2','trans':'geser'},closing='jawab-konflik',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(47,'B'),(77,'B',(1900,520,800)),(88,'B'),(99,'C')],
  [S('.dengung',8,0.3,47),S('.gasTag',13,0.3,22),S('.kabelHot',34,0.4,47),S('.volt1',54,0.4,77),S('.volt2',58,0.4,77),S('.getar',79,0.3,99),S('.bahaya',101,0.4)],
  [L(11,18,'KATA TETANGGA: *GAS*'),L(18,28,'KATA PLN: *TRAFO*',560),L(34,47,'*20.000 VOLT*'),L(54,62,'LILITAN *BANYAK*'),L(58,62,'LILITAN *SEDIKIT*',560),L(77,88,'BERGETAR *100×/DETIK*'),L(88,99,'ISINYA *MINYAK*')],
  [[8,'NGUUUNG',600,560,-6,'#2ee6d6'],[44,'GOSONG!',600,640,8,'#ff3b5c']],[[17,'bingung'],[66,'kaget'],[99,'setuju']],
  [(0,'Tabung di *tiang*'),(11,'Kata tetangga: *gas*'),(18,'Kata PLN: *trafo*'),(28,'Listrik *20.000 V*'),(47,'Kita bedah *tabungnya*'),(62,'*20.000 → 220 V*'),(77,'Kenapa *berdengung*?'),(99,'Tetap *bahaya*'),(110,'')],
  (110,['BUKAN GAS,','TAPI TETAP','*JANGAN DIDEKATI*']),'trafo.svg','#041a1f')

# ---------- e16 obat ----------
rg={'A':R(100,1000,380,1060),'B':R(1500,2260,260,1080),'C':R(2950,3650,330,1110)}
build('e16-obat',dict(pillar='tubuh',angle='obat sesudah makan: makanan jadi bantalan lambung untuk obat iritatif (NSAID), roti kecil cukup, maks 2 jam; ada obat sebelum makan',
  viral_bukti='perjalanan obat dalam tubuh (IYwmTS3jp1o) 10 jt',title='Obat Sesudah Makan, Harus Kenyang? 💊',
  music='lofi',style={'theme':'pink','cap':'frasa','trans':'putar'},closing='tips',experiment='batch manual 8 Nov; sumber Kemenkes'),
  rg,[(0,'A'),(26,'B'),(66,'C')],
  [S('.kenyang',11,0.3,26),M('.pil',41,[-40,200,40],0.6),S('.perih',46,0.3,48),H('.kosong',48),S('.roti',50,0.5),S('.bantal',50,0.5),S('.arc2',69,0.6),S('.sebelum',81,0.6),S('.tanya',115,0.4)],
  [L(7,16,'KATA IBU: *MAKAN KENYANG*'),L(16,26,'KATA APOTEKER: *NGGAK HARUS*',560),L(30,38,'BISA *IRITASI* LAMBUNG'),L(48,57,'MAKANAN = *BANTALAN*'),L(57,66,'ROTI KECIL *CUKUP*'),L(69,78,'*MAKS 2 JAM* SETELAH MAKAN'),L(81,98,'ADA YANG *SEBELUM* MAKAN')],
  [[47,'PERIH!',600,600,-8,'#ff3b30']],[[19,'bingung'],[56,'dapat-ide'],[92,'menunjuk']],
  [(0,'*Sesudah makan* = kenyang?'),(7,'Kata ibu: *kenyang dulu*'),(16,'Kata apoteker: *nggak*'),(26,'Kita bedah *lambungnya*'),(48,'Makanan = *bantalan*'),(66,'Yang penting *waktunya*'),(78,'Ada juga *sebelum makan*'),(105,'')],
  (105,['MAKAN DULU','IYA, TAPI','*NGGAK PERLU KENYANG*']),'obat.svg','#1a0614')

# ---------- e17 mesin jahit ----------
rg={'A':R(120,960,300,1080),'B':(1900,880,1250),'C':R(2800,3800,520,760)}
build('e17-mesin-jahit',dict(pillar='bedah benda',angle='mesin jahit lockstitch: kait putar nyamber loop benang atas memutari spul, dua benang saling kunci tanpa simpul',
  viral_bukti='Puluhan tahun hidup, baru tau cara kerja mesin jahit! (t8bcNxze_yY) 2,8 jt',title='Mesin Jahit Bikin Simpul? 🧵',
  music='penasaran',style={'theme':'oranye','cap':'frasa2','trans':'campur'},closing='punchline',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(33,'B'),(59,'B',(1950,900,800)),(81,'C')],
  [S('.simpul',15,0.3,22),M('.jarum',52,[0,180,0],0.5),S('.loop',63,0.4,74),S('.loopBesar',74,0.6,81),M('.kait',71,[0,0,300],1.5),S('.putus',112,0.3)],
  [L(11,20,'KATA ORANG: *SIMPUL*'),L(20,33,'KATA PENJAHIT: *NGGAK ADA*',560),L(38,46,'BENANG *ATAS* (JARUM)'),L(46,52,'BENANG *BAWAH* (SPUL)',560),L(63,71,'JADI *LINGKARAN*'),L(71,81,'*KAIT* NYAMBER'),L(93,106,'*SALING KUNCI*')],
  [[53,'JLEB!',620,560,-6,'#ffd23f'],[74,'SWUSH!',600,600,8,'#ff3b5c']],[[24,'bingung'],[74,'kaget'],[96,'senang']],
  [(0,'Jahitan *bajumu*'),(11,'Kata orang: *simpul*'),(20,'Kata penjahit: *nggak*'),(33,'Kita bedah *mesinnya*'),(59,'Jadi *lingkaran*'),(71,'*Kait* yang muter'),(93,'*Ngunci*, bukan simpul'),(106,'')],
  (106,['BUKAN SIMPUL,','TAPI DUA BENANG','*SALING KUNCI*']),'jahit.svg','#1a0d05')

# ---------- e18 ban pesawat ----------
rg={'A':R(60,1020,300,1120),'B':R(1500,2300,100,1200),'C':R(2980,3620,340,980)}
build('e18-ban-pesawat',dict(pillar='kendaraan',angle='ban pesawat ±200 psi (6x ban mobil), isi nitrogen (kering, tak beku, tak bakar), sumbat lebur buang tekanan saat rem panas',
  viral_bukti='Kenapa Ban Pesawat Tidak Meledak Saat Mendarat? (-XIKbUqKFSo) 1,9 jt',title='Ban Pesawat Isinya Angin Biasa? ✈️',
  music='petualangan',style={'theme':'hijau','cap':'frasa','trans':'geser'},closing='punchline',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(32,'B'),(80,'C')],
  [M('.pesawat',0,[0,60,0],1.2),S('.ban_mobil_pecah',7,0.3,14),S('.psi',37,0.4,43),S('.ban6',43,0.4),S('.es',64,0.4,80),S('.panas',81,0.5),S('.keluar',87,0.5)],
  [L(14,21,'KATA ORANG: *ANGIN BIASA*'),L(21,32,'KATA TEKNISI: *NITROGEN*',560),L(47,56,'NGGAK GEPENG *PULUHAN TON*'),L(56,64,'NITROGEN: *KERING*'),L(64,80,'UAP AIR → *ES*'),L(84,97,'SUMBAT *MELELEH*')],
  [[3,'BRAKK!',620,560,-8,'#ffd23f'],[11,'DOR!',760,700,8,'#ff3b5c'],[94,'PSSST…',600,600,-6,'#7fd1ff']],[[20,'bingung'],[96,'kaget'],[99,'setuju']],
  [(0,'Mendarat *ngebut*'),(14,'Kata orang: *angin biasa*'),(21,'Kata teknisi: *nitrogen*'),(32,'Kita bedah *bannya*'),(56,'Kenapa *nitrogen*?'),(80,'Kalau rem *kepanasan*'),(97,'Ban yang *tahu diri*'),(106,'')],
  (106,['ISINYA *NITROGEN*,','KEMPIS DULU','SEBELUM *MELEDAK*']),'ban.svg','#07160f')

# ---------- e19 pompa sumur ----------
rg={'A':R(220,980,300,1200),'D':R(220,980,1050,2080),'C':R(1700,2300,420,1250),'E':R(1700,2300,1100,2080)}
build('e19-pompa-sumur',dict(pillar='rumah',angle='pompa sedot mentok ±10 m teori / 6-7 m praktik karena yang dorong air = tekanan udara; solusi pompa jet/celup di bawah',
  viral_bukti='Cara Kerja Sumur Bor: Kenapa Pompa Sedot Mentok di Tujuh Meter? (BoKpKTpnd7A) 4,2 jt',title='Air Sumur Nggak Naik, Ganti Pompa Gede? 💧',
  music='ceria',style={'theme':'ungu','cap':'frasa2','trans':'zoom'},closing='jawab-konflik',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(10,'D'),(35,'A'),(58,'D'),(80,'A'),(91,'E'),(102,'C')],
  [S('.bunyi',6,0.3,13),S('.udara',48,0.4,80),S('.airNaik',49,1.0,91),S('.batas',63,0.4,91),S('.batas7',70,0.4,91),S('.dorong',101,1.0),S('.keran',103,0.5)],
  [L(13,20,'KATA TUKANG: *POMPA GEDE*'),L(20,35,'KATA GURU FISIKA: *MENTOK*',560),L(35,48,'POMPA *NGGAK NYEDOT*'),L(48,58,'YANG DORONG: *UDARA*'),L(58,68,'MAKS *±10 METER*'),L(68,80,'PRAKTIK *6–7 METER*'),L(91,102,'POMPA *DI BAWAH*')],
  [[8,'NGIIING…',600,560,-6,'#ffffff'],[28,'MENTOK!',600,620,8,'#ff5c8a']],[[19,'bingung'],[67,'kaget'],[100,'dapat-ide']],
  [(0,'Air sumur *nggak naik*'),(13,'Kata tukang: *pompa gede*'),(20,'Kata guru: *mentok*'),(35,'Pompa *nggak nyedot*'),(58,'Batasnya *±10 meter*'),(80,'Pompa gede = *bunyi doang*'),(91,'Taruh *di bawah*'),(110,'')],
  (110,['BUKAN YANG','PALING GEDE,','TAPI *PALING DEKAT AIR*']),'pompa.svg','#0f0820')

# ---------- e20 netral motor ----------
rg={'A':R(300,780,330,1110),'B':R(1100,2520,280,1110),'C':R(2960,3640,320,1190)}
build('e20-netral-motor',dict(pillar='kendaraan',angle='pola gigi 1-N-2: netral di tengah supaya turun gigi terus pasti mentok di gigi 1, tidak nyasar netral saat ngerem/tanjakan',
  viral_bukti='Motor Ini Tidak Punya Gigi Netral (FAtYJGZ1Ao4) 13 jt',title='Kenapa Netral Motor Nyelip di Tengah? 🏍️',
  music='ceria',style={'theme':'kuning','cap':'frasa','trans':'campur'},closing='tips',experiment='batch manual 8 Nov'),
  rg,[(0,'A'),(34,'B'),(70,'A'),(92,'C')],
  [S('.xB',51,0.3,70),S('.mogok',58,0.3,70),S('.turun',74,0.6),S('.setengah',83,0.5),S('.lampuN',93,0.4),S('.aman',114,0.4)],
  [L(18,23,'KATA TEMEN: *BIAR SUSAH*'),L(23,34,'KATA MONTIR: *BIAR SELAMAT*',560),L(42,52,'KALAU N *PALING BAWAH*'),L(52,63,'MESIN *LEPAS* DARI RODA'),L(74,83,'INJAK TERUS = *GIGI 1*'),L(83,92,'N CUMA *SETENGAH LANGKAH*'),L(101,110,'GIGI 1 *PALING KUAT*')],
  [[36,'CIIIT!',600,560,-8,'#ff3b5c'],[69,'BAHAYA!',600,640,6,'#ffd23f']],[[17,'bingung'],[69,'kaget'],[100,'setuju']],
  [(0,'*1 – N – 2*'),(18,'Kata temen: *biar susah*'),(23,'Kata montir: *biar selamat*'),(34,'Kalau N *di bawah*…'),(70,'N *di tengah*'),(92,'Lampu N *susah dicari*'),(110,'')],
  (110,['NETRAL DI TENGAH','ITU BUKAN ISENG,','TAPI *PENGAMAN*']),'netral.svg','#0b1226')
