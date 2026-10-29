"""Naikkan nada kata terakhir kalimat tanya (TTS bahasa Indonesia cenderung turun di akhir pertanyaan).

lift(audio_in, wav_out, words, semis=4.0)
  words: [[kata, mulai, selesai], ...] dari build.align (selesai = mulai + 0.92*durasi kata).
  Setiap kata yang diakhiri '?' (termasuk '?!' dan '?...') dibuat beberapa versi dengan rubberband
  (pitch naik bertahap, formant dipertahankan), lalu disambung berurutan dengan crossfade pendek
  sehingga nadanya meluncur naik di ujung kalimat.
"""
import os, re, subprocess, tempfile
import numpy as np

SR = 44100


def _read(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def _write(x, path):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', path],
                   input=x.astype(np.float32).tobytes(), check=True)


def _shift(seg, ratio, tmp):
    a, b = os.path.join(tmp, 'a.wav'), os.path.join(tmp, 'b.wav')
    _write(seg, a)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a, '-af',
                    f'rubberband=pitch={ratio:.4f}:formant=preserved:pitchq=quality', b], check=True)
    y = _read(b)
    if len(y) < len(seg):
        y = np.pad(y, (0, len(seg) - len(y)))
    return y[:len(seg)]


def lift(audio_in, wav_out, words, semis=4.0):
    x = _read(audio_in)
    n_q = 0
    with tempfile.TemporaryDirectory() as tmp:
        for i, (w, s, e) in enumerate(words):
            if not re.search(r'\?[!.]*$', w):
                continue
            dur = (e - s) / 0.92
            a = max(0, int((s - 0.02) * SR))
            nxt = words[i + 1][1] if i + 1 < len(words) else s + dur + 0.4
            b = min(len(x), int(min(s + dur + 0.18, nxt - 0.02) * SR))
            if b - a < int(0.12 * SR):
                continue
            seg = x[a:b]
            steps = [0.0, semis * 0.35, semis * 0.7, semis]
            vers = [seg if k == 0 else _shift(seg, 2 ** (st / 12), tmp) for k, st in enumerate(steps)]
            L = len(seg)
            # bagian awal kata tetap, 30%..100% naik bertahap
            edges = [0, int(L * 0.3), int(L * 0.5), int(L * 0.72), L]
            out = np.zeros(L, np.float32)
            xf = int(0.02 * SR)
            for k in range(4):
                lo, hi = max(0, edges[k] - xf), min(L, edges[k + 1] + xf)
                wgt = np.ones(hi - lo, np.float32)
                if k > 0:
                    r = min(2 * xf, hi - lo)
                    wgt[:r] = np.linspace(0, 1, r)
                if k < 3:
                    r = min(2 * xf, hi - lo)
                    wgt[-r:] = np.minimum(wgt[-r:], np.linspace(1, 0, r))
                out[lo:hi] += vers[k][lo:hi] * wgt
            x[a:b] = out
            n_q += 1
    _write(x, wav_out)
    return n_q
