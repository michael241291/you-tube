"""Sambung ulang kalimat tanya dari audio asli (voice_pre_splice.mp3) memakai timing Whisper.
Tidak mengubah script/anchor (script di episode.json sudah versi baru).
python3 splice2.py <episode_dir> '<json: [[kalimat_lama, kalimat_baru, take.mp3], ...]>'"""
import json, os, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build, asralign
from splice import rd, wr, trim, rms, SR


def main(ep_dir, pairs):
    ep = json.load(open(os.path.join(ep_dir, 'episode.json')))
    src = os.path.join(ep_dir, 'voice_pre_splice.mp3')
    script = ep['script']
    for old, new, _ in pairs:
        assert new in script, new
        script = script.replace(new, old, 1)
    dur = build.duration(src)
    w = asralign.align(script, src, dur)
    toks = script.split()
    x = rd(src)
    sil = [(s, e if e is not None else dur) for s, e in build.silences(src, '-40dB', 0.04)]
    cuts = []
    for old, new, take in pairs:
        ot = old.split()
        a = next(i for i in range(len(toks)) if toks[i:i + len(ot)] == ot); b = a + len(ot) - 1
        def gap_cut(t_lo, t_hi, prefer):
            c = [(s, e) for s, e in sil if e > t_lo - 0.05 and s < t_hi + 0.05]
            if c:
                s, e = max(c, key=lambda z: z[1] - z[0])
                return (s + e) / 2
            return prefer
        c0 = 0.0 if a == 0 else gap_cut(w[a - 1][2], w[a][1], (w[a - 1][2] + w[a][1]) / 2)
        c1 = dur if b == len(toks) - 1 else gap_cut(w[b][2], w[b + 1][1], (w[b][2] + w[b + 1][1]) / 2)
        cuts.append((c0, c1, take, a == 0, b == len(toks) - 1))
    cuts.sort()
    parts = []; pos = 0.0
    for c0, c1, take, first, last in cuts:
        parts.append(x[int(pos * SR):int(c0 * SR)])
        t = trim(rd(take)); seg = x[int(c0 * SR):int(c1 * SR)]
        t = t * (rms(seg) / rms(t))
        f = int(0.01 * SR); t[:f] *= np.linspace(0, 1, f); t[-f:] *= np.linspace(1, 0, f)
        parts += [np.zeros(int((0 if first else 0.12) * SR)), t, np.zeros(int((0.35 if last else 0.15) * SR))]
        print(f'  {c0:.2f}-{c1:.2f}s  <- {os.path.basename(take)} ({len(t)/SR:.2f}s)')
        pos = c1
    parts.append(x[int(pos * SR):])
    wr(np.concatenate(parts), os.path.join(ep_dir, 'voice.mp3'))


if __name__ == '__main__':
    main(sys.argv[1], json.loads(sys.argv[2]))
