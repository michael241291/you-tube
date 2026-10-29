"""Buang kalimat penutup (mis. pertanyaan) dari narasi + naskah. python3 dropq.py <episode_dir>"""
import json, os, re, sys, shutil
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build, asralign
from splice import rd, wr, SR

d = sys.argv[1]; p = os.path.join(d, 'episode.json'); ep = json.load(open(p))
au = os.path.join(d, 'voice.mp3'); dur = build.duration(au)
toks = ep['script'].split()
q = max(i for i, x in enumerate(toks[:-1]) if re.search(r'[.!]$', x)) + 1
w = asralign.align(ep['script'], au, dur)
sil = [(s, e if e is not None else dur) for s, e in build.silences(au, '-40dB', 0.04)]
c = [(s, e) for s, e in sil if e > w[q - 1][2] - 0.05 and s < w[q][1] + 0.05]
cut = (max(c, key=lambda z: z[1] - z[0])[0] + 0.12) if c else (w[q - 1][2] + 0.12)
shutil.copy(au, os.path.join(d, 'voice_with_question.mp3'))
x = rd(au)[:int(cut * SR)]
f = int(0.05 * SR); x[-f:] *= np.linspace(1, 0, f)
wr(np.concatenate([x, np.zeros(int(0.25 * SR))]), au)
removed = ' '.join(toks[q:]); ep['script'] = ' '.join(toks[:q]); ep['closing'] = 'tanpa pertanyaan'
ep['faces'] = [f for f in ep.get('faces', []) if not (isinstance(f[0], str) and int(f[0][1:]) >= q)]
for s in ep['scenes']:
    if 'lines' in s:
        s['lines'] = [l for l in s['lines'] if not (isinstance(l, dict) and isinstance(l.get('w'), int) and l['w'] >= q)]
json.dump(ep, open(p, 'w'), ensure_ascii=False, indent=1)
print('cut at', round(cut, 2), 's; removed:', removed)
