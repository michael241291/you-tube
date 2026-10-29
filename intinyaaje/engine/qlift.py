"""Naikkan nada akhir kalimat tanya dengan TD-PSOLA (perubahan nada halus, durasi tetap, tanpa memotong suara).

lift(audio_in, wav_out, words, semis=3.5)
  words: [[kata, mulai, selesai], ...] dari build.align.
  Untuk tiap kata berakhiran '?', nada dinaikkan bertahap mulai ~40% kata terakhir sampai ujungnya
  (kurva halus 0 -> +semis), lalu kembali normal setelah kata selesai.
"""
import re, subprocess
import numpy as np

SR = 44100


def _read(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)


def _write(x, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', path],
                   input=x.astype(np.float32).tobytes(), check=True)


def _f0(x, hop):
    """F0 per hop sampel (0 = tak bersuara), autokorelasi sederhana."""
    win = int(0.04 * SR); lo, hi = SR // 400, SR // 70
    out = []
    for i in range(0, len(x), hop):
        fr = x[max(0, i - win // 2): i + win // 2]
        if len(fr) < win or np.sqrt((fr ** 2).mean()) < 0.01:
            out.append(0.0); continue
        fr = fr - fr.mean()
        ac = np.correlate(fr, fr, 'full')[len(fr) - 1:]
        k = lo + int(np.argmax(ac[lo:hi]))
        out.append(SR / k if ac[k] > 0.35 * ac[0] else 0.0)
    f = np.array(out)
    # isi lubang kecil
    for i in range(1, len(f) - 1):
        if f[i] == 0 and f[i - 1] > 0 and f[i + 1] > 0:
            f[i] = (f[i - 1] + f[i + 1]) / 2
    return f


def _psola(x, ratio_fn):
    """ratio_fn(t_sampel) -> faktor nada (1 = sama). Hanya bagian bersuara yang diubah."""
    hop = int(0.005 * SR)
    f0 = _f0(x, hop)
    # tanda pitch analisis
    marks = []
    i = 0
    while i < len(x):
        f = f0[min(len(f0) - 1, i // hop)]
        if f <= 0:
            i += hop; continue
        P = int(SR / f)
        seg = x[i:i + P]
        if len(seg) == 0: break
        j = i + int(np.argmax(np.abs(seg)))
        if not marks or j - marks[-1] > P * 0.5:
            marks.append(j)
        i = j + P
    marks = np.array(marks)
    if len(marks) < 3:
        return x.copy()
    y = x.copy()
    # proses per region bersuara (rangkaian tanda yang berdekatan)
    regions = []
    s = 0
    for k in range(1, len(marks)):
        if marks[k] - marks[k - 1] > SR / 60:
            regions.append(marks[s:k]); s = k
    regions.append(marks[s:])
    for rm in regions:
        if len(rm) < 4: continue
        a0, a1 = int(rm[0]), int(rm[-1])
        if max(ratio_fn(t) for t in range(a0, a1, hop)) <= 1.001: continue
        periods = np.diff(rm)
        pad = int(periods.max()) + 2
        L = a1 - a0
        out = np.zeros(L + 2 * pad); wsum = np.zeros(L + 2 * pad)
        ts = float(a0)
        while ts <= a1:
            k = int(np.argmin(np.abs(rm - ts)))
            P = int(periods[min(k, len(periods) - 1)])
            c = int(rm[k])
            if c - P < 0 or c + P > len(x): break
            w = np.hanning(2 * P)
            o = int(round(ts)) - P - (a0 - pad)
            if o < 0 or o + 2 * P > len(out): break
            out[o:o + 2 * P] += x[c - P:c + P] * w
            wsum[o:o + 2 * P] += w
            ts += P / ratio_fn(int(ts))
        seg = out[pad:pad + L]; ws = wsum[pad:pad + L]
        good = ws > 0.2
        seg[good] = seg[good] / ws[good]
        seg[~good] = x[a0:a1][~good]
        xf = min(int(0.012 * SR), L // 4)
        fade = np.ones(L); fade[:xf] = np.linspace(0, 1, xf); fade[-xf:] = np.linspace(1, 0, xf)
        y[a0:a1] = x[a0:a1] * (1 - fade) + seg * fade
    return y


def lift(audio_in, wav_out, words, semis=3.5):
    x = _read(audio_in)
    zones = []
    for i, (w, s, e) in enumerate(words):
        if not re.search(r'\?[!.]*$', w):
            continue
        dur = (e - s) / 0.92
        start = s + dur * 0.35
        end = s + dur + 0.12
        zones.append((start * SR, end * SR))
    if not zones:
        _write(x, wav_out); return 0
    top = 2 ** (semis / 12)

    def ratio(t):
        for a, b in zones:
            if a <= t <= b + 0.15 * SR:
                if t >= b: return top
                u = (t - a) / (b - a)
                return 1 + (top - 1) * (0.5 - 0.5 * np.cos(np.pi * u))
        return 1.0
    y = _psola(x, ratio)
    _write(y, wav_out)
    return len(zones)
