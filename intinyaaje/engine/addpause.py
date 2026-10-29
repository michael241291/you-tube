"""Rapikan jeda supaya narasi terdengar seperti orang bercerita (bukan membaca).
Menambah keheningan HANYA di batas kata yang sudah hening (tidak memotong suara, tidak mengubah nada),
di titik tanda baca naskah, sampai panjang jeda target. Jeda yang terlalu panjang dipangkas.
python3 addpause.py <naskah.txt> <masuk.mp3> <keluar.mp3>
Target: koma 0,14 dtk, titik 0,32, !/? 0,35, "..." 0,45 dtk; maksimal 0,6 dtk."""
import os, re, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asralign, build
from splice import rd, wr, SR

MAXW = int(os.environ.get("MAXW","5"))
TARGET = {',': 0.16, '.': 0.32, '!': 0.34, '?': 0.36, '…': 0.45}


def env_db(x, t0, t1):
    seg = x[int(t0 * SR):int(t1 * SR)]
    if len(seg) < 64: return -99, t0
    w = 441; n = len(seg) // w
    e = [20 * np.log10(np.sqrt((seg[i*w:(i+1)*w] ** 2).mean()) + 1e-9) for i in range(n)]
    k = int(np.argmin(e)); return e[k], t0 + (k + 0.5) * w / SR


def main(script, src, out):
    text = open(script).read(); toks = text.split(); x = rd(src); dur = len(x) / SR
    w = asralign.align(text, src, dur)
    sil = [(a, b if b is not None else dur) for a, b in build.silences(src, '-40dB', 0.03)]
    edits = []  # (posisi, tambahan detik) ; tambahan negatif = pangkas
    # koma hanya diberi jeda bila potongan di antara jeda lain > MAXW kata (biar tidak putus-putus)
    def mark(t): return '…' if t.endswith('...') else (t[-1] if t[-1] in TARGET else None)
    def gap(i): return w[i + 1][1] - w[i][2]
    brk = [mark(toks[i]) in ('.', '!', '?', '…') or gap(i) >= 0.12 for i in range(len(toks) - 1)]
    commas = set(); run = []
    for i in range(len(toks)):
        run.append(i)
        if i == len(toks) - 1 or brk[i]:
            if len(run) > MAXW:
                cs = [j for j in run[:-1] if mark(toks[j]) == ',']
                # pilih koma yang paling membagi rata
                while cs and len(run) > MAXW:
                    j = min(cs, key=lambda j: abs((j - run[0] + 1) - len(run) / 2)); commas.add(j)
                    left = [k for k in run if k <= j]; right = [k for k in run if k > j]
                    run = left if len(left) > len(right) else right; cs = [c for c in cs if c in run[:-1]]
            run = []
    for i in range(len(toks) - 1):
        t = toks[i]; m = mark(t)
        if not m: continue
        if m == ',' and i not in commas: continue
        a, b = w[i][2], w[i + 1][1]
        cand = [(s, e) for s, e in sil if e > a - 0.08 and s < b + 0.08]
        if cand:
            s, e = max(cand, key=lambda z: z[1] - z[0]); cur = e - s; pos = (s + e) / 2
        else:
            db, pos = env_db(x, a - 0.06, b + 0.06)
            if db > (-32 if m == ',' else -28): continue          # tidak ada celah hening: jangan sentuh
            cur = 0.0
        add = min(TARGET[m], 0.6) - cur
        if add > 0.02: edits.append((pos, add))
    # pangkas jeda > 0,6 dtk
    for s, e in sil:
        if e - s > 0.6 and s > 0.2 and e < dur - 0.2: edits.append(((s + e) / 2, 0.6 - (e - s)))
    edits.sort(); parts = []; last = 0
    for pos, add in edits:
        i = int(pos * SR)
        if add > 0:
            parts += [x[last:i], np.zeros(int(add * SR))]; last = i
        else:
            cut = int(-add * SR) // 2
            parts.append(x[last:i - cut]); last = i + cut
    parts.append(x[last:]); y = np.concatenate(parts)
    wr(y, out)
    print(f'{len([e for e in edits if e[1] > 0])} jeda ditambah, {len([e for e in edits if e[1] < 0])} dipangkas; {dur:.1f} -> {len(y)/SR:.1f} dtk')


if __name__ == '__main__':
    main(*sys.argv[1:4])
