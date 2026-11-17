#!/usr/bin/env python3
"""Rakit video panjang horizontal 1920x1080 dari Shorts @intinyaaje.
Struktur: intro (narasi baru) -> 7x [kartu judul bab + Short di tengah] -> outro rangkuman -> end screen.
"""
import json, os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(HERE, 'build'); os.makedirs(OUT, exist_ok=True)
W, H = 1920, 1080
CW = 608; CX = (W - CW) // 2  # klip vertikal di tengah
FD = '/usr/share/fonts/truetype/google-fonts/'
F = lambda s, w='Bold': ImageFont.truetype(FD + f'Poppins-{w}.ttf', s)
YEL, GRN, WHT, DIM = (255, 210, 63), (61, 220, 132), (255, 255, 255), (170, 176, 190)
MUSIC = os.path.join(ROOT, 'assets', 'music', 'penasaran.mp3')

CH = [  # (episode, nama di daftar isi, judul bab, vonis rangkuman)
    ('e37-kick-starter', 'Selah motor hilang', 'Motor baru kok nggak ada selah?', 'Selah dihapus karena jarang dipakai, bukan pabrik pelit'),
    ('e22-counter-steering', 'Belok kanan, dorong kanan', 'Belok kanan malah dorong setang kanan?', 'Mau belok kanan? Setang kanan justru didorong'),
    ('e33-ac-sirkulasi', 'Ngantuk karena AC', 'Ngantuk di mobil gara-gara tombol AC?', 'Ngantuk di mobil bisa karena CO2, bukan capek'),
    ('e30-kereta-rem', 'Masinis nggak ngerem?', 'Masinis kok nggak ngerem?', 'Masinis sudah ngerem, kereta butuh ±500 meter'),
    ('e28-pesawat-pelan', 'Pesawat terasa diam', 'Pesawat 900 km/jam kok kerasa diam?', 'Pesawat memang ngebut, matamu yang tertipu'),
    ('e32-parasut', 'Kenapa tanpa parasut', 'Kenapa penumpang nggak dikasih parasut?', 'Yang menyelamatkan: peragaan keselamatan, bukan parasut'),
    ('e35-helikopter', 'Mesin heli mati', 'Mesin helikopter mati, pasti jatuh?', 'Mesin heli mati bukan berarti jatuh: ada autorotasi'),
]
TITLE = ['7 HAL SOAL KENDARAAN', 'YANG KAMU KIRA BENAR']


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-3000:]); sys.exit(1)
    return r.stdout


def dur(f):
    return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).strip())


def clip_of(ep):
    d = os.path.join(ROOT, 'episodes', ep)
    vs = sorted(x for x in os.listdir(d) if re.match(rf'{ep}-v\d+\.mp4$', x))
    return os.path.join(d, vs[-1])


def wrap(dr, text, font, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if dr.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines


def rrect(dr, box, r, fill): dr.rounded_rectangle(box, r, fill=fill)


# ---------- panel PNG ----------
def toc(dr, x, y, cur, done_upto=None):
    dr.text((x, y), 'DAFTAR ISI', font=F(30), fill=DIM)
    y += 60
    for i, c in enumerate(CH):
        on = (i == cur)
        f = F(30, 'Bold' if on else 'Medium')
        if on: rrect(dr, (x - 16, y - 10, x + 560, y + 58), 29, (*YEL, 255))
        col = (20, 20, 24) if on else (WHT if (done_upto is None or i > done_upto) else DIM)
        dr.text((x, y), f'{i+1:02d}', font=F(30), fill=col)
        dr.text((x + 70, y), c[1], font=f, fill=col)
        y += 86


def chapter_panel(k, path):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dr = ImageDraw.Draw(im)
    dr.rectangle((0, 0, CX, H), fill=(8, 10, 16, 120)); dr.rectangle((CX + CW, 0, W, H), fill=(8, 10, 16, 120))
    # bayangan di sisi klip tengah
    for i in range(40):
        a = int(110 * (1 - i / 40))
        dr.line([(CX - i, 0), (CX - i, H)], fill=(0, 0, 0, a)); dr.line([(CX + CW + i, 0), (CX + CW + i, H)], fill=(0, 0, 0, a))
    # kiri
    x = 70
    dr.text((x, 110), 'BAGIAN', font=F(34), fill=DIM)
    dr.text((x - 6, 140), f'{k+1:02d}', font=F(200), fill=YEL)
    y = 420
    for ln in wrap(dr, CH[k][2], F(52), 520):
        dr.text((x, y), ln, font=F(52), fill=WHT); y += 70
    dr.text((x, H - 110), '@intinyaaje', font=F(32, 'Medium'), fill=DIM)
    # kanan
    toc(dr, 1330, 110, k, done_upto=k - 1)
    im.save(path)


def card_panel(k, path):
    im = Image.new('RGBA', (W, H), (8, 10, 16, 150)); dr = ImageDraw.Draw(im)
    t = f'BAGIAN {k+1} / {len(CH)}'
    f1 = F(44); tw = dr.textlength(t, font=f1)
    rrect(dr, ((W - tw) / 2 - 30, 330, (W + tw) / 2 + 30, 410), 40, (*YEL, 255))
    dr.text(((W - tw) / 2, 340), t, font=f1, fill=(20, 20, 24))
    y = 450
    for ln in wrap(dr, CH[k][2], F(84), 1500):
        lw = dr.textlength(ln, font=F(84)); dr.text(((W - lw) / 2, y), ln, font=F(84), fill=WHT); y += 110
    im.save(path)


def intro_panel(path):
    im = Image.new('RGBA', (W, H), (8, 10, 16, 140)); dr = ImageDraw.Draw(im)
    y = 200
    for i, ln in enumerate(TITLE):
        f = F(110); lw = dr.textlength(ln, font=f)
        dr.text(((W - lw) / 2, y), ln, font=f, fill=YEL if i == 1 else WHT); y += 140
    s = 'Ternyata semuanya keliru. Kita bedah satu per satu.'
    f = F(42, 'Medium'); lw = dr.textlength(s, font=f)
    dr.text(((W - lw) / 2, y + 30), s, font=f, fill=DIM)
    # chip bab
    y += 140; x0 = 160; cw = (W - 2 * x0) / 7
    for i, c in enumerate(CH):
        cx = x0 + cw * i + cw / 2
        dr.ellipse((cx - 34, y, cx + 34, y + 68), fill=(*YEL, 255))
        t = f'{i+1}'; tw = dr.textlength(t, font=F(36)); dr.text((cx - tw / 2, y + 10), t, font=F(36), fill=(20, 20, 24))
        for j, ln in enumerate(wrap(dr, c[1], F(24, 'Medium'), cw - 20)):
            lw = dr.textlength(ln, font=F(24, 'Medium')); dr.text((cx - lw / 2, y + 84 + j * 32), ln, font=F(24, 'Medium'), fill=WHT)
    dr.text((70, 50), '@intinyaaje', font=F(32, 'Medium'), fill=DIM)
    im.save(path)


def outro_panel(n_shown, hi, path):
    im = Image.new('RGBA', (W, H), (8, 10, 16, 165)); dr = ImageDraw.Draw(im)
    t = 'RANGKUMAN'; f = F(64); lw = dr.textlength(t, font=f); dr.text(((W - lw) / 2, 50), t, font=f, fill=YEL)
    y = 170
    for i, c in enumerate(CH):
        if i >= n_shown: break
        on = (i == hi)
        x = 260
        if on: rrect(dr, (x - 30, y - 12, W - x + 30, y + 80), 40, (*YEL, 255))
        col = (20, 20, 24) if on else WHT
        dr.text((x, y), f'{i+1}', font=F(52), fill=col if on else YEL)
        dr.text((x + 80, y + 8), c[3], font=F(44, 'Bold' if on else 'Medium'), fill=col)
        y += 106
    dr.text((70, H - 80), '@intinyaaje', font=F(30, 'Medium'), fill=DIM)
    im.save(path)


def end_panel(path):
    im = Image.new('RGBA', (W, H), (8, 10, 16, 170)); dr = ImageDraw.Draw(im)
    for i, (t, s, c) in enumerate([('Terima kasih sudah nonton!', 72, WHT), ('Subscribe @intinyaaje biar nggak ketinggalan intinya', 40, YEL)]):
        f = F(s); lw = dr.textlength(t, font=f); dr.text(((W - lw) / 2, 130 + i * 110), t, font=f, fill=c)
    im.save(path)


# ---------- subtitle ASS ----------
def ass(words_json, path, offset=0.0):
    ws = json.load(open(words_json))
    lines, cur = [], []
    for w in ws:
        cur.append(w)
        if len(cur) >= 6 or re.search(r'[.?!,]$', w[0]) and len(cur) >= 3:
            lines.append(cur); cur = []
    if cur: lines.append(cur)
    ts = lambda t: f'{int(t//3600)}:{int(t%3600//60):02d}:{t%60:05.2f}'
    hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,Poppins,58,&H00FFFFFF,&H0000D2FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,5,2,2,80,80,{50},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    ev = []
    for i, ln in enumerate(lines):
        a = ln[0][1] + offset
        b = (lines[i + 1][0][1] + offset) if i + 1 < len(lines) else ln[-1][2] + offset + 0.4
        b = min(b, ln[-1][2] + offset + 0.6)
        txt = ' '.join(w[0] for w in ln).upper()
        ev.append(f'Dialogue: 0,{ts(a)},{ts(b)},S,,0,0,0,,{txt}')
    open(path, 'w').write(hdr + '\n'.join(ev) + '\n')


VENC = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30']
AENC = ['-c:a', 'aac', '-ar', '48000', '-ac', '2', '-b:a', '192k']
BLUR = 'scale=1920:-2,crop=1920:1080,boxblur=30:3,eq=brightness=-0.12:saturation=1.1'


def montage(parts, path, seglen):
    """parts: list of (file, start). Gabung potongan bisu jadi satu klip latar."""
    lst = os.path.join(OUT, os.path.basename(path) + '.txt')
    segs = []
    for i, (f, ss) in enumerate(parts):
        p = os.path.join(OUT, f'_m{os.path.basename(path)}_{i}.mp4')
        run(['ffmpeg', '-y', '-v', 'error', '-ss', str(ss), '-i', f, '-t', str(seglen), '-an', '-vf', BLUR, *VENC, p]); segs.append(p)
    open(lst, 'w').write(''.join(f"file '{p}'\n" for p in segs))
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', path])


def narrated(name, bgvid, overlays, voice, words, out):
    """overlays: list of (png, t0, t1)."""
    d = dur(voice) + 0.8
    ass(words, os.path.join(OUT, name + '.ass'), offset=0.3)
    inputs = ['-stream_loop', '-1', '-i', bgvid]
    for p, _, _ in overlays: inputs += ['-loop', '1', '-i', p]
    inputs += ['-i', voice, '-stream_loop', '-1', '-i', MUSIC]
    fc, last = [], '[0:v]'
    for i, (p, t0, t1) in enumerate(overlays):
        fc.append(f"{last}[{i+1}:v]overlay=0:0:enable='between(t,{t0},{t1})'[o{i}]"); last = f'[o{i}]'
    fc.append(f"{last}ass={os.path.join(OUT, name + '.ass')}:fontsdir={FD}[v]")
    nv = len(overlays) + 1
    fc.append(f'[{nv}:a]adelay=300|300,volume=1.0[va];[{nv+1}:a]volume=0.10,afade=t=in:d=1,afade=t=out:st={d-1.2}:d=1.2[mu];[va][mu]amix=inputs=2:duration=longest:normalize=0[a]')
    run(['ffmpeg', '-y', '-v', 'error', *inputs, '-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-t', f'{d:.2f}', *VENC, *AENC, out])


def chapter(k, out):
    clip = clip_of(CH[k][0]); pn = os.path.join(OUT, f'panel{k}.png'); chapter_panel(k, pn)
    fc = (f'[0:v]split[a][b];[a]{BLUR}[bg];[b]scale={CW}:1080[fg];[bg][fg]overlay={CX}:0[v1];'
          f'[v1][1:v]overlay=0:0[v]')
    run(['ffmpeg', '-y', '-v', 'error', '-i', clip, '-loop', '1', '-i', pn, '-filter_complex', fc,
         '-map', '[v]', '-map', '0:a', '-shortest', *VENC, *AENC, out])


def titlecard(k, out, d=2.6):
    clip = clip_of(CH[k][0]); pn = os.path.join(OUT, f'card{k}.png'); card_panel(k, pn)
    fc = (f"[0:v]{BLUR},trim=0:{d},setpts=PTS-STARTPTS[bg];[bg][1:v]overlay=0:0,fade=t=in:d=0.25[v];"
          f"anoisesrc=d=0.9:c=pink:a=0.6,highpass=f=300,lowpass=f=5000,afade=t=in:d=0.35,afade=t=out:st=0.35:d=0.55,volume=0.5,apad=whole_dur={d}[a]")
    run(['ffmpeg', '-y', '-v', 'error', '-i', clip, '-loop', '1', '-i', pn, '-filter_complex', fc,
         '-map', '[v]', '-map', '[a]', '-t', str(d), *VENC, *AENC, out])


def main():
    only = sys.argv[1:]  # opsional: nama segmen
    segs = []
    # intro
    intro_bg = os.path.join(OUT, 'intro_bg.mp4')
    if not only or 'intro' in only:
        montage([(clip_of(c[0]), 4) for c in CH], intro_bg, 4.4)
        intro_panel(os.path.join(OUT, 'intro.png'))
        narrated('intro', intro_bg, [(os.path.join(OUT, 'intro.png'), 0, 999)],
                 os.path.join(HERE, 'intro', 'voice.mp3'), os.path.join(HERE, 'intro', 'words.json'), os.path.join(OUT, 's00_intro.mp4'))
    segs.append('s00_intro.mp4')
    for k in range(len(CH)):
        if not only or f'ch{k}' in only:
            titlecard(k, os.path.join(OUT, f's{k+1:02d}a_card.mp4'))
            chapter(k, os.path.join(OUT, f's{k+1:02d}b_ch.mp4'))
        segs += [f's{k+1:02d}a_card.mp4', f's{k+1:02d}b_ch.mp4']
    # outro
    if not only or 'outro' in only:
        outro_bg = os.path.join(OUT, 'outro_bg.mp4')
        montage([(clip_of(c[0]), max(0, dur(clip_of(c[0])) - 7.5)) for c in CH], outro_bg, 7.2)
        ws = json.load(open(os.path.join(HERE, 'outro', 'words.json')))
        nums = ['Satu,', 'Dua,', 'Tiga,', 'Empat,', 'Lima,', 'Enam,', 'Tujuh,']
        starts = []
        for n in nums:
            starts.append(next(w[1] for w in ws if w[0] == n) + 0.3)
        end_i = next(w[1] for w in ws if w[0] == 'Dari') + 0.3
        ov = [(os.path.join(OUT, 'outro_0.png'), 0, starts[0])]
        outro_panel(0, -1, ov[0][0])
        for i in range(7):
            p = os.path.join(OUT, f'outro_{i+1}.png'); outro_panel(i + 1, i, p)
            ov.append((p, starts[i], starts[i + 1] if i < 6 else end_i))
        p = os.path.join(OUT, 'outro_all.png'); outro_panel(7, -1, p); ov.append((p, end_i, 999))
        narrated('outro', outro_bg, ov, os.path.join(HERE, 'outro', 'voice.mp3'), os.path.join(HERE, 'outro', 'words.json'), os.path.join(OUT, 's90_outro.mp4'))
        # end screen 12 dtk (ruang elemen layar akhir YouTube)
        end_panel(os.path.join(OUT, 'end.png'))
        fc = f"[0:v]trim=0:12,setpts=PTS-STARTPTS[bg];[bg][1:v]overlay=0:0,fade=t=out:st=11:d=1[v];[2:a]volume=0.25,atrim=0:12,afade=t=in:d=0.5,afade=t=out:st=10:d=2[a]"
        run(['ffmpeg', '-y', '-v', 'error', '-stream_loop', '-1', '-i', outro_bg, '-loop', '1', '-i', os.path.join(OUT, 'end.png'), '-i', MUSIC,
             '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-t', '12', *VENC, *AENC, os.path.join(OUT, 's99_end.mp4')])
    segs += ['s90_outro.mp4', 's99_end.mp4']
    lst = os.path.join(OUT, 'all.txt')
    open(lst, 'w').write(''.join(f"file '{os.path.join(OUT, s)}'\n" for s in segs))
    raw = os.path.join(OUT, 'raw.mp4')
    run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', raw])
    final = os.path.join(HERE, 'l01-mitos-kendaraan-v1.mp4')
    run(['ffmpeg', '-y', '-v', 'error', '-i', raw, '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', *AENC, '-movflags', '+faststart', final])
    print('OK', final, round(dur(final), 1))
    # timestamp bab
    t, marks = 0.0, []
    for s in segs:
        if s.endswith('_card.mp4'): marks.append(t)
        t += dur(os.path.join(OUT, s))
    json.dump({'intro': 0, 'chapters': marks, 'outro': t - dur(os.path.join(OUT, 's99_end.mp4')) - dur(os.path.join(OUT, 's90_outro.mp4'))}, open(os.path.join(HERE, 'marks.json'), 'w'))


if __name__ == '__main__':
    main()
