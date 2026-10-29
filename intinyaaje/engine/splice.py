"""Ganti satu kalimat di narasi dengan rekaman kalimat terpisah (mis. kalimat tanya yang nadanya lebih naik).

python3 splice.py <episode_dir> "<kalimat lama persis>" "<kalimat baru>" <file_take>
- Memotong di tengah jeda sebelum/sesudah kalimat lama (tidak memotong kata), menyambung take baru
  (diam di ujung dipangkas, volume disamakan), lalu memperbarui script dan semua anchor kata di episode.json.
"""
import json, os, re, subprocess, sys
import numpy as np
SR = 44100
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build


def rd(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)


def wr(x, p):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', '-b:a', '160k', p], input=x.astype(np.float32).tobytes(), check=True)


def trim(x, th=0.006):
    env = np.convolve(np.abs(x), np.ones(441) / 441, 'same')
    idx = np.where(env > th)[0]
    if len(idx) == 0: return x
    return x[max(0, idx[0] - 1300): min(len(x), idx[-1] + 2200)]


def rms(x):
    v = x[np.abs(x) > 0.01]
    return np.sqrt((v ** 2).mean()) if len(v) else 1e-3


def main(ep_dir, old, new, take):
    epf = os.path.join(ep_dir, 'episode.json'); ep = json.load(open(epf))
    audio = os.path.join(ep_dir, ep.get('audio', 'voice.mp3'))
    words, dur = build.align(ep['script'], audio)
    toks = ep['script'].split(); ot = old.split(); nt = new.split()
    a = next(i for i in range(len(toks)) if toks[i:i + len(ot)] == ot); b = a + len(ot) - 1
    sil = [(s, e if e is not None else dur) for s, e in build.silences(audio, '-34dB', 0.08)]
    s0 = words[a][1]; e0 = words[b][1] + (words[b][2] - words[b][1]) / 0.92
    if a == 0: cut0 = 0.0
    else:
        cand = [(s, e) for s, e in sil if e <= s0 + 0.12 and e >= s0 - 0.6]
        cut0 = (max(cand, key=lambda z: z[1])[1] - 0.06) if cand else s0 - 0.05
    if b == len(toks) - 1: cut1 = dur
    else:
        cand = [(s, e) for s, e in sil if s >= e0 - 0.15 and s <= e0 + 0.6]
        cut1 = (min(cand, key=lambda z: z[0])[0] + 0.06) if cand else e0 + 0.05
    x = rd(audio); t = trim(rd(take))
    seg_old = x[int(cut0 * SR):int(cut1 * SR)]
    t = t * (rms(seg_old) / rms(t))
    f = int(0.008 * SR); t[:f] *= np.linspace(0, 1, f); t[-f:] *= np.linspace(1, 0, f)
    pad0 = np.zeros(int(0.04 * SR)) if a > 0 else np.zeros(0)
    pad1 = np.zeros(int(0.04 * SR)) if b < len(toks) - 1 else np.zeros(int(0.25 * SR))
    y = np.concatenate([x[:int(cut0 * SR)], pad0, t, pad1, x[int(cut1 * SR):]])
    if not os.path.exists(audio.replace('.mp3', '_pre_splice.mp3')):
        os.rename(audio, audio.replace('.mp3', '_pre_splice.mp3'))
    wr(y, audio)
    # perbarui script dan anchor
    ep['script'] = ' '.join(toks[:a] + nt + toks[b + 1:])
    d = len(nt) - len(ot)
    def m(i):
        return i if i < a else (a + min(i - a, len(nt) - 1) if i <= b else i + d)
    def walk(o, in_scene):
        if isinstance(o, dict):
            for k, v in list(o.items()):
                if in_scene and k in ('w0', 'w', 'w1') and isinstance(v, int): o[k] = m(v)
                else: o[k] = walk(v, in_scene)
            return o
        if isinstance(o, list): return [walk(v, in_scene) for v in o]
        if isinstance(o, str) and re.fullmatch(r'w\d+', o): return 'w%d' % m(int(o[1:]))
        return o
    ep['scenes'] = walk(ep['scenes'], True)
    for k in ('faces', 'hud', 'sfx', 'check', 'gauge'):
        if k in ep: ep[k] = walk(ep[k], False)
    json.dump(ep, open(epf, 'w'), ensure_ascii=False, indent=1)
    print('ok', ep_dir, f'{cut0:.2f}-{cut1:.2f}s ->', round(len(t) / SR, 2), 's; kata', len(ot), '->', len(nt))


if __name__ == '__main__':
    main(*sys.argv[1:5])
