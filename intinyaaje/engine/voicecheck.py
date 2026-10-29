"""Cek apakah narasi terdengar seperti orang bercerita (bukan membaca).
python3 voicecheck.py <audio.mp3> [<audio2> ...]   (memakai timing Whisper dari asralign, cache <audio>.asr.json)
Target (acuan reel presto @kitabedah.id: 4,4 kata/frasa, jeda tiap ±1,8 dtk, rentang nada 14 semiton):
  kata per frasa <= 5, jeda (>0,15 dtk) setidaknya tiap 2,5 dtk, rentang nada p10-p90 >= 12 semiton.
Video kita 29 Okt: 6-10 kata/frasa, jeda tiap ±4 dtk, rentang 9 semiton -> terdengar kaku."""
import os, subprocess, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import asralign, build


def f0(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', '16000', '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, np.int16).astype(float) / 32768; out = []
    for i in range(0, len(x) - 640, 160):
        fr = x[i:i + 640]
        if np.sqrt((fr ** 2).mean()) < 0.02: continue
        fr = fr - fr.mean(); ac = np.correlate(fr, fr, 'full')[639:]; lo, hi = 16000 // 350, 16000 // 70
        k = lo + np.argmax(ac[lo:hi])
        if ac[k] > 0.3 * ac[0]: out.append(16000 / k)
    return np.array(out)


def check(path):
    a = asralign.asr_words(path); n = len(a); dur = a[-1][2] - a[0][1]
    gaps = [a[i + 1][1] - a[i][2] for i in range(n - 1)]
    pauses = sum(1 for g in gaps if g > 0.15)
    wpp = n / (pauses + 1); every = dur / (pauses + 1)
    v = f0(path); v = v[(v > 70) & (v < 350)]; st = 12 * np.log2(v / np.median(v))
    rng = np.percentile(st, 90) - np.percentile(st, 10)
    ok = wpp <= 5 and every <= 2.5 and rng >= 12
    print(f"{path}: {n} kata, {60*n/dur:.0f} kata/mnt, {wpp:.1f} kata/frasa, jeda tiap {every:.1f} dtk, rentang nada {rng:.1f} semiton -> {'LOLOS' if ok else 'BELUM: tulis ulang naskah jadi potongan pendek gaya ngobrol, rekam ulang'}")
    return ok


if __name__ == '__main__':
    res = [check(p) for p in sys.argv[1:]]
    sys.exit(0 if all(res) else 1)
