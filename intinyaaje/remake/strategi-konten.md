# Strategi Konten @intinyaaje (versi aktif)

STATUS STRATEGI: DISETUJUI USER (29 Okt 2026) — strategi v2
STATUS PILOT BEDAH: DISETUJUI USER (29 Okt 2026) — pilot LPG (p01-lpg-v2): "udah lebih bagus kok"; tayang 29 Okt 18.00
STATUS PRODUKSI: TUNGGU PERINTAH USER (31 Okt: user menilai suara batch 29 Okt "gak enak, gak mengalir" dan video "kayak ketutupan" di Shorts; video uji perbaikan → "jangan dulu"; Merinding 31 Okt tetap tayang atas pilihan user)

Terakhir diperbarui: 29 Okt 2026 sore. Dokumen ini diperbarui setiap minggu dari dua sumber: Shorts yang sedang viral (riset Apify + referensi user) dan data channel @intinyaaje sendiri. Tujuan utama: **channel viral** dengan meniru pola video viral, tetap aman untuk monetisasi.

## Strategi v2 (disetujui user 29 Okt)
- **Topik campur, syarat relate:** sesuatu yang penonton Indonesia alami/lihat minggu ini. Per minggu: 3 bedah benda sehari-hari (rumah, jalan, HP), 2 "kok bisa?" tubuh & kebiasaan, 1 peta/negara dengan sudut Indonesia, 1 mitos Indonesia dibuktikan.
- **Referensi gaya utama: @kitabedah.id** (lihat `intinyaaje-riset-shorts-viral.md`), tapi **tidak sama persis**:
  - jangan pakai topik yang sudah mereka buat (magic com, motor matic, MCB, meteran air, token listrik, panci presto, wajan teflon, dispenser galon, kipas angin, setrika, ban tubeless, sabun cuci piring, kerupuk, gelas tahan panas, helm SNI, botol Corkcicle, power bank, stop kontak, AC inverter);
  - ciri khas kita: ilustrasi vektor datar berwarna (bukan isometrik), wajah user kecil sebagai reaksi, kartu **"INTINYA"** satu kalimat di akhir, gaya warna/subtitle/musik berganti tiap video.
- **Gaya bercerita (user 29 Okt):** narasi harus seperti orang ngobrol/bercerita supaya penonton menonton lama. Acuan: reel panci presto @kitabedah.id. Pilot LPG lolos dan disetujui.
- **Durasi:** maksimal **1 menit** (user 29 Okt), tetap Shorts. Pola referensi ±40 detik / 95–130 kata.
- **Pola viral yang ditiru:** hook di detik pertama dengan bendanya langsung terlihat; satu visual utama yang dijelajahi kamera (dibelah/zoom, hanya bagian yang dibahas diberi warna); tanpa detik diam; setiap gerakan & bunyi jatuh di kata yang diucapkan; frame pertama = objek (karena jadi thumbnail feed).
- **Penutup:** tidak harus pertanyaan. Bergantian loop / punchline / teaser / tips; pertanyaan hanya bila topiknya mengundang cerita. Ajakan komentar di caption/deskripsi ("Benda apa lagi yang mau dibedah?").
- **YouTube-first:** judul pertanyaan pendek, maksimal 1 emoji. Yang diukur tiap minggu: average_view_percentage dan durasi tonton (Windsor), bukan hanya views.
- **Belajar terus + update skill (user 29 Okt):** tiap minggu minimal 3 pelajaran berbasis data + 1 eksperimen terkontrol (ubah satu hal), dibandingkan pada umur video yang sama. Setiap pelajaran yang terbukti langsung ditulis di "Aturan hasil belajar" (berlaku di run berikutnya) DAN diusulkan ke skill intinyaaje-weekly.
- **Gerbang:** video/suara baru hanya dibuat setelah user menyuruh (STATUS PRODUKSI); kalau user bilang "jangan dulu", hanya perbarui aturan.

### Contoh 7 topik minggu depan (disetujui sebagai arah)
1. Kok kulkas bisa dingin, padahal belakangnya panas? (bedah)
2. Kenapa nguap itu nular? (kok bisa)
3. Kok lampu teras nyala sendiri pas maghrib? (bedah sensor cahaya)
4. Kenapa Indonesia punya 3 zona waktu, padahal Cina yang lebih lebar cuma 1? (peta)
5. ~~Kok gas LPG bau~~ — sudah tayang 29 Okt (pilot)
6. Bener nggak HP dicas semalaman bikin baterai rusak? (mitos)
7. Kok Google Maps tahu jalanan lagi macet? (bedah HP)

## Aturan hasil belajar (WAJIB diikuti setiap run, sama seperti aturan skill)
Format: (tanggal) aturan — bukti. Tambahkan aturan baru di sini setiap kali ada pelajaran yang terbukti atau masukan user, lalu usulkan juga ke skill.
- (31 Okt, masukan user) **SUARA ALIR menggantikan aturan potongan ≤5 kata**: naskah yang dicacah koma/titik + jeda addpause + sambungan take membuat suara tersendat ("gak enak, gak mengalir"). Aturan baru: kalimat utuh ±6–14 kata, koma hanya di tempat berhenti napas, "..." maks 2 kali; SATU rekaman utuh tanpa sambungan dan tanpa jeda tambahan; setelan uji stability 0.5 / similarity 0.8 / style 0.25 / speed 1.0 dengan voice clone "mike indo" yang sudah diperbarui user (cek voice_id baru). voicecheck hanya penanda. BELUM diuji — perlu izin user untuk 1 video uji.
- (31 Okt, masukan user) **AREA AMAN SHORTS**: video "kayak ketutupan". UI Shorts menutupi atas ±0–170 px, bawah ±1500–1920 px (judul/channel/deskripsi), kanan ±900–1080 px mulai y ±860 (tombol). Semua teks, subtitle, label, sfx, stiker wajah, gauge, dan benda utama di x 60–880, y 200–1450; capY ±1150–1250. Contact sheet wajib dicek dengan overlay zona merah. Menunggu screenshot user untuk memastikan.
- (29 Okt) Timing subtitle selalu dari Whisper (asralign.py); render tanpa Whisper dilarang — subtitle cara lama meleset sampai 1,4 dtk.
- (29 Okt) Sambungan kalimat hanya dengan splice2.py (timing Whisper) dan wajib dicek Whisper bahwa semua kata naskah terdengar — splice lama memotong kata "baper".
- (29 Okt) **QC kata pakai Whisper medium (`remake/medcheck.py`)**, bukan hanya small — small tidak mendengar kata isian "Nah," dan "gitu" di take Merinding. Kata isian yang terdengar natural dimasukkan ke naskah (subtitle ikut); yang aneh dipotong (contoh: "atau" di Bandara dipotong).
- (29 Okt) Pertanyaan berbentuk ya/tidak/tag; kalimat tanya direkam ulang 3 take dan dipilih yang nadanya paling naik — pertanyaan kata tanya dari TTS turun di akhir.
- (29 Okt) Hook suara jangan "Kok…?"/"Kenapa…?"; pakai tag "…, kan?" atau pernyataan mengejutkan. Tetap 3 take + qrise: dari 15 take hook "kan?" hasilnya -29% s/d +136%; pilih +20% s/d +70% (terlalu tinggi terdengar dibuat-buat). Menambah koma/kata ("Kamu, pernah merinding juga, kan?") membantu nada naik. Judul HUD di layar boleh tetap "Kok…?".
- (29 Okt) Teks kartu/headline maksimal ±14 karakter per baris; judul HUD ±30 karakter — "YANG MENENTUKAN:" terpotong; "Eropa: 5 negara tanpa bandara" jadi 2 baris.
- (29 Okt) Penutup tidak harus pertanyaan; variasikan loop/punchline/teaser/tips/pertanyaan — permintaan user, akan diukur.
- (29 Okt, DIGANTI 31 Okt oleh SUARA ALIR) **Naskah gaya bercerita:** potongan ≤5 kata dipisah koma/titik, kata lisan sehari-hari, alur sebab-akibat — reel presto 4,4 kata/tarikan napas; video lama kita 6–10.
- (29 Okt) **JANGAN pakai tag `<break time=...>` di naskah TTS** — 2 take uji (2.124 kredit) membuat suara menambah kata sendiri dan durasi melar ke 59 dtk.
- (29 Okt, TIDAK DIPAKAI sejak 31 Okt) **Jeda dirapikan setelah rekaman dengan `addpause.py`**: titik/!/?/… diberi jeda di celah antar kata yang sudah ada; **koma hanya diberi jeda 0,16 dtk bila frasanya > 5 kata** (MAXW=5; Gigi 5,6 → 4,9 kata/frasa); jeda > 0,6 dtk dipangkas. Jeda di setiap koma terlalu putus-putus.
- (29 Okt, sejak 31 Okt hanya penanda) **voicecheck.py wajib lolos** (≤5 kata/frasa, jeda tiap ≤2,5 dtk). Rentang nada hanya penanda (target ≥10 semiton).
- (29 Okt) **Suara versi B** (stability 0.30, similarity 0.8, style 0.5, speaker boost, speed 0.95) diuji di 5 video / 10 take: rentang nada 7,4–8,6 semiton (tidak lebih hidup dari versi A ±8) dan 3 dari 10 take menambah kata isian. Versi B boleh dipakai dengan QC Whisper medium; nada datar belum terpecahkan → eksperimen berikutnya: coba model eleven_v3/v4 dengan tag arah suara pada 1 video uji (perlu izin user).
- (29 Okt) **Subtitle per tarikan napas** (`cap: frasa`/`frasa2`): 2–5 kata yang berganti saat narator berhenti, kata aktif disorot.
- (29 Okt) **Kamera bedah:** selalu beri key penahan satu kata sebelum pindah. Benda utama di 25–63% tinggi layar; label pill dekat tepi kanan pakai `side: "l"`; label & sfx jangan di area subtitle (±1240–1340 px layar).
- (29 Okt) **Gauge pakai `t0`** agar tidak tampil kosong sejak awal video. Badge HUD tetap tampil sampai akhir — pakai hanya bila relevan sepanjang video.
- (29 Okt) Engine `hl.move` [dx,dy,rotasi] untuk menggerakkan bagian ilustrasi (gigi copot, pisau memotong, gigi tumbuh). Gerakan berantai pakai grup bersarang (class berbeda), karena move kedua pada selector yang sama menimpa yang pertama.

## Keputusan yang sudah dikunci (dari user)
- **Kualitas di atas kecepatan** (29 Okt): subtitle wajib pas, tidak ada kata terpotong, setiap video lolos QC.
- **Suara:** voice clone ElevenLabs "mike indo" (voice_id Pe6wzgEbfCn4z8iMr8oi), eleven_multilingual_v2, setelan versi B atau A (lihat Aturan hasil belajar). Lewat flow node (creative_generate_speech tidak menerima voice_settings).
- **Tempo narasi:** ±120–160 kata/menit; kesan santai dari potongan pendek dan jeda, bukan memperlambat suara.
- **Musik:** orisinal (engine/musicgen.py), 5 suasana: santai, misteri, ceria, penasaran, petualangan; tidak sama dua hari berturut-turut.
- **Motion engine v2**, tanpa progress bar.
- **Anti-monoton:** `style` {theme, cap (frasa/frasa2), trans} + music + jenis penutup tidak sama dua hari berturut-turut.
- **Platform:** YouTube Shorts + Facebook Reels lewat Buffer; tidak Instagram. 1 video/hari 17.00 WIB (29 Okt pengecualian 18.00 atas permintaan user), siklus 7 hari. Judul dibuat saat unggah. Angle tidak diulang dalam 14 hari.

## Aturan anti-pengulangan
1. Tiap video dicatat di log.json: topik, angle, hook, penutup, eksperimen, visual, musik, gaya, judul, durasi, hasil voicecheck.
2. Topik tidak boleh sama dengan yang pernah tayang atau katalog @kitabedah.id.
3. Angle yang sama tidak dipakai lagi dalam 14 hari.
4. Dua video berturut-turut tidak dari pilar yang sama dan tidak sama tema warna, set transisi, musik, atau jenis penutup.

## Judul dan deskripsi
- Judul ≤ 60 karakter, pertanyaan pendek, maksimal 1 emoji.
- Deskripsi: 2–3 kalimat fakta, sumber, kredit foto/peta, "Musik: orisinal @intinyaaje", ajakan komentar, 3–5 tagar.

## Minggu 1 (27 Okt – 3 Nov 2026)
| Tanggal | Topik | Status |
|---|---|---|
| Sel 27 Okt | Oecusse | tayang (gaya lama) |
| Rab 28 Okt | Jari keriput | tayang (gaya lama) |
| Kam 29 Okt 18.00 | Pilot LPG (p01-lpg-v2; oranye, penasaran, punchline) | terjadwal YT+FB (khusus hari ini 18.00, permintaan user) |
| Jum 30 Okt | Gigi susu (e04 v7: bedah gusi; pink, ceria, pertanyaan) | terjadwal 17.00 |
| Sab 31 Okt | Merinding (e05 v8: bedah kulit + kucing; cyan, misteri, punchline) | terjadwal 17.00 |
| Min 1 Nov | Negara tanpa bandara (e06 v7: peta + Vatikan vs Taman Monas; kuning, petualangan, punchline) | draf dueAt 17.00 — dijadwalkan rutinitas harian (batas 4 terjadwal intinyaaje, org penuh 10) |
| Sen 2 Nov | Bawang (e07 v7: bedah sel bawang; ungu, santai, tips) | draf dueAt 17.00 — dijadwalkan rutinitas harian (batas 4 terjadwal intinyaaje) |
| Sel 3 Nov | Kalimantan (e03 v7: peta + Jawa ×6; hijau, penasaran, pertanyaan) | draf dueAt 17.00 |

Biaya suara batch buat ulang 29 Okt: ±7.000 kredit (10 take narasi + 18 take hook/tanya).

## Evaluasi mingguan
1. Windsor (konektor youtube, akun 66967 "Intinya Aje"): views, engaged_views, average_view_duration, average_view_percentage, likes, comments, shares, subscribers_gained per video (data telat 1–3 hari). 29 Okt: 6 subscriber, 2 video, 2.733 views; data per video belum keluar.
2. Shorts viral terbaru di niche fakta/cara kerja/peta/mitos + pantau @kitabedah.id (termasuk voicecheck pada audionya).
3. Bandingkan per pilar, hook, durasi, penutup, gaya, skor voicecheck, dan eksperimen minggu lalu (umur video sama). Minggu ini pertama kali gaya lama (27–28 Okt) vs gaya bedah (29 Okt–3 Nov) bisa dibandingkan.
4. Tulis minimal 3 pelajaran baru + eksperimen minggu depan di Catatan pembelajaran; yang terbukti dipindah ke "Aturan hasil belajar" dan diusulkan ke skill.

## Catatan pembelajaran
- (26 Okt) Riset awal: pemenang Shorts Indonesia memakai satu objek per video, hook di detik pertama, bahasa santai, visual realistis, durasi 17–60 detik.
- (27 Okt) Narasi terlalu cepat/monoton → versi A + jeda "...". Satu musik untuk semua → 5 musik orisinal. Motion → engine v2.
- (27 Okt malam) Tidak mau monoton → gaya per video berganti.
- (28 Okt) Referensi @kitabedah.id → komponen `hud`, `sfx`, `check`, `pill`, subtitle `box`. Apify kena batas bulanan; cadangan IG lewat halaman embed.
- (29 Okt) Referensi @faizbuntoro → `dots`, `bars`, `gauge`, `zoomTag`.
- (29 Okt) Kalimat tanya terdengar datar → take ulang 3x, pilih yang paling naik; penutup ya/tidak. Pitch-shift ditolak.
- (29 Okt siang) Subtitle meleset dan kata "baper" terpotong → Whisper (asralign.py), splice2.py, QC Whisper wajib. Hasil: meleset 0,02–0,05 dtk.
- (29 Okt) Bedah @kitabedah.id: 32 jt+ views IG+TikTok dalam 6 hari; hook "Kok … tahu …?" tentang benda sehari-hari, satu ilustrasi benda dibelah yang dijelajahi kamera, ±40 dtk / 10 beat / 95–130 kata, tanpa detik diam. → dasar strategi v2.
- (29 Okt) User: penutup tidak harus pertanyaan; topik campur asal relate; durasi maksimal 1 menit; jangan buat video sebelum disuruh; Claude harus terus belajar dan setiap pelajaran juga dimasukkan ke skill.
- (29 Okt) User: suara dan subtitle harus seperti orang bercerita (acuan presto). → voicecheck.py + aturan naskah + subtitle per tarikan napas.
- (29 Okt sore) **Pilot LPG** disetujui user; tayang 29 Okt 18.00.
- (31 Okt) User: suara batch 29 Okt tidak mengalir; tampilan tertutup UI Shorts. → SUARA ALIR + AREA AMAN (lihat Aturan hasil belajar). Merinding tetap tayang 31 Okt; Bandara/Bawang/Kalimantan masih draf.
- (29 Okt sore) **Batch buat ulang e03–e07** dengan gaya bedah/peta: 39–43 dtk, 84–106 kata, voicecheck lolos semua (3,0–4,9 kata/frasa, jeda tiap 1,5–1,9 dtk), sinkron rata-rata 0,06 dtk. Ilustrasi baru: rumah panggung + penampang gusi (Gigi), penampang kulit + kucing (Merinding), dapur + sel bawang + kulkas (Bawang); peta dengan pill, bars Vatikan vs Taman Monas (Bandara), perbandingan Jawa ×6 (Kalimantan).

## Aturan aman monetisasi
- Visual buatan sendiri atau berlisensi bebas, kredit di deskripsi. Tanpa logo merek di ilustrasi.
- Naskah orisinal; referensi hanya ditiru gayanya.
- Musik dikomposisi sendiri.
- Suara clone suara user; ditandai konten sintetis di YouTube lewat Buffer.
- Syarat YPP: 1.000 subscriber + 10 juta views Shorts dalam 90 hari.

## Teknis (untuk sesi berikutnya)
- Repo: michael241291/you-tube, folder `intinyaaje/`.
  - `engine/build.py`: render + mixing. Timing subtitle dari `engine/asralign.py` (Whisper). Field: `music`, `musicVol`, `ver`, `style`, `hud`, `sfx`, `check`, `gauge` (anchor "wN"). `python3 build.py <ep_dir> t1,t2,...` = still saja (cepat, untuk cek tata letak).
  - `engine/asralign.py`: faster-whisper "small" + pencocokan ke naskah + koreksi jeda; cache `<audio>.asr.json` (hapus cache bila naskah berubah). Pasang: `NO_PROXY= no_proxy= pip install --break-system-packages faster-whisper`.
  - `engine/addpause.py`: `python3 engine/addpause.py <script.txt> <masuk.mp3> <keluar.mp3>` (env MAXW, default 5).
  - `engine/voicecheck.py`: `python3 engine/voicecheck.py <audio> [--musik]` → LOLOS/BELUM.
  - `engine/splice2.py`: susun voice.mp3 dari `voice_pre_splice.mp3` + take kalimat tanya/hook (pasangan [lama, baru, take]; boleh beda kalimat, naskah episode harus sudah memuat kalimat baru). `engine/qrise.py`: persen kenaikan nada akhir take.
  - `remake/wcheck.py` (Whisper small vs naskah), `remake/medcheck.py` (transkrip Whisper medium — wajib sebelum pilih take), `remake/geturls.py` (unduh hasil ElevenLabs dari transkrip sesi berdasarkan generation_id), `remake/sheet.sh` (contact sheet).
  - Adegan bedah = `type: map` dengan `svgFile` buatan sendiri (contoh episodes/p01-lpg, e04-gigi-atap, e05-merinding, e07-bawang: make_svg.py): `cam` [["wN",cx,cy,w]] + key penahan; `hl` {sel, w, hide|show|color|move:[dx,dy,rot], dur, w1}; `wdots`; `labels` (pill, side:"l"); `arrows` (ang = arah datangnya ekor; 90 = panah menunjuk ke atas); `rings`; `bars` {w,w1,title,y,items:[{label,value,color,w}]}.
  - Peta: `map.svg` di e03/e06 (class .c_ISO3).
- Alur suara: naskah gaya bercerita → 2 take narasi → Whisper medium (tanpa kata tambahan) + voicecheck → `voice_pre_splice.mp3`; hook/kalimat tanya 3 take → qrise.py → splice2.py → addpause.py → voicecheck.py (wajib lolos) → build.
- QC wajib: Whisper medium audio akhir vs naskah; selisih timing < 0,1 dtk rata-rata; contact sheet tanpa teks terpotong dan kamera tidak melayang; durasi ≤ 60 dtk.
- Buffer: ganti video = `ver` baru, push, edit_post YT + FB dengan metadata lama; draf → terjadwal = payload lengkap + saveToDraft false + mode customScheduled + dueAt; ubah dueAt draf = saveToDraft true + mode customScheduled + dueAt. Maks 4 posting intinyaaje terjadwal (YT+FB dihitung terpisah; org gratis maks 10 termasuk AIVOOMA). Org 6acfacf801a85ecc6480964d; YouTube 6acfad5b778b240e2f0a3a75 (kategori 27); Facebook 6acfae1b778b240e2f0a41e7 (reel).
- Video di-host lewat raw.githubusercontent.com.
