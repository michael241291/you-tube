"""Build one intinyaaje Short.

python3 build.py <episode_dir> [stills t1,t2,...]

<episode_dir>/episode.json:
  {"id":..., "script": "<exact text sent to TTS>", "audio": "voice.mp3",
   "scenes":[...], "faces":[[t,name,dur],...], "capY":1180}
Writes <episode_dir>/index.html (engine + data), renders frames to /home/claude/work/<id>/,
mixes audio (voice + ducked lo-fi + whooshes) and writes <episode_dir>/<id>.mp4.
"""
import json, os, re, subprocess, sys

ENG = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(ENG)


def sh(cmd):
    return subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)


def duration(path):
    return float(sh(f'ffprobe -v error -show_entries format=duration -of csv=p=0 "{path}"').stdout.strip())


def silences(path, noise='-34dB', d=0.14):
    r = subprocess.run(f'ffmpeg -hide_banner -i "{path}" -af silencedetect=noise={noise}:d={d} -f null -',
                       shell=True, capture_output=True, text=True)
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', r.stderr)]
    en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', r.stderr)]
    return list(zip(st, en + [None] * (len(st) - len(en))))


def align(script, audio):
    """Word timings from known script + pause detection (no transcription needed)."""
    dur = duration(audio)
    words = script.split()
    sil = [(s, e if e is not None else dur) for s, e in silences(audio)]
    start = 0.0
    if sil and sil[0][0] < 0.05:
        start = sil[0][1]; sil = sil[1:]
    end = dur
    if sil and sil[-1][1] >= dur - 0.05:
        end = sil[-1][0]; sil = sil[:-1]
    # speech segments
    segs, cur = [], start
    for s, e in sil:
        if s > cur:
            segs.append((cur, s))
        cur = e
    segs.append((cur, end))
    speech = sum(b - a for a, b in segs)

    def sp2abs(x):  # speech-time -> absolute
        for a, b in segs:
            if x <= b - a:
                return a + x
            x -= b - a
        return end

    def wgt(w):
        core = re.sub(r'[^\w-]', '', w)
        digits = sum(ch.isdigit() for ch in core)
        return len(core) + 1.5 + digits * 3.5
    wt = [wgt(w) for w in words]
    ends = [i for i, w in enumerate(words) if re.search(r'[.,?!:;]$', w)]
    if not ends or ends[-1] != len(words) - 1:
        ends.append(len(words) - 1)
    P = len(ends)
    pw, f = [], 0
    for e in ends:
        pw.append(sum(wt[f:e + 1])); f = e + 1
    rate = speech / sum(pw)
    S = sil  # internal silences (start, end)
    nodes = [(None, start)] + [(s_, e_) for s_, e_ in S]  # node j: boundary at silence j (end time = resume)
    def speech_between(t0, t1):
        tot = t1 - t0
        for s_, e_ in S:
            if s_ >= t0 and e_ <= t1:
                tot -= (e_ - s_)
        return max(tot, 0.01)
    INF = float('inf')
    # dp[i][j]: phrases 0..i-1 done, last boundary at node j
    dp = [[INF] * (len(nodes)) for _ in range(P + 1)]
    bk = [[None] * (len(nodes)) for _ in range(P + 1)]
    dp[0][0] = 0.0
    cum = [0.0]
    for x in pw:
        cum.append(cum[-1] + x)
    for i in range(P):
        for j in range(len(nodes)):
            if dp[i][j] == INF:
                continue
            t_start = nodes[j][1]
            for i2 in range(i + 1, P + 1):
                exp = (cum[i2] - cum[i]) * rate
                if i2 == P:
                    cands = [(None, end)]
                else:
                    cands = [(k, nodes[k][0]) for k in range(j + 1, len(nodes))]
                for k, t_end in cands:
                    if t_end <= t_start:
                        continue
                    d = speech_between(t_start, t_end)
                    c = dp[i][j] + ((d - exp) ** 2) / exp + sum(1.5 if re.search(r'[.?!]$', words[ends[q]]) else 0.1 for q in range(i, i2 - 1))
                    kk = k if k is not None else 0
                    if i2 == P:
                        if c < dp[P][0] or bk[P][0] is None:
                            if c < dp[P][0]:
                                dp[P][0] = c; bk[P][0] = (i, j, end)
                    elif c < dp[i2][kk]:
                        dp[i2][kk] = c; bk[i2][kk] = (i, j, t_end)
    # backtrack groups
    groups = []
    i, j = P, 0
    while i > 0:
        pi, pj, t_end = bk[i][j]
        groups.append((pi, i, nodes[pj][1], t_end))
        i, j = pi, pj
    groups.reverse()
    out = []
    first_word = [0] + [e + 1 for e in ends]
    for pi, pi2, a, b in groups:
        w0, w1 = first_word[pi], ends[pi2 - 1]
        ww = wt[w0:w1 + 1]; tot = sum(ww)
        # distribute over speech time inside [a,b], skipping internal silences
        segs2 = []
        cur = a
        for s_, e_ in S:
            if s_ >= a and e_ <= b:
                segs2.append((cur, s_)); cur = e_
        segs2.append((cur, b))
        sp = sum(y - x for x, y in segs2)
        def at(u):
            for x, y in segs2:
                if u <= y - x:
                    return x + u
                u -= y - x
            return b
        acc = 0.0
        for k in range(w0, w1 + 1):
            d = sp * wt[k] / tot
            out.append([words[k], round(at(acc), 3), round(at(acc + d * 0.92), 3)])
            acc += d
    return out, dur


def resolve(ep, words):
    """Turn word-index anchors into times. scene.w0 -> t0/t1; item.w -> t (scene-relative), item.w1 -> t1;
    cam/kb keys and faces may start with "wN" strings."""
    ws = lambda i: words[int(i)][1]
    sc = ep['scenes']
    for k, s in enumerate(sc):
        if 'w0' in s:
            s['t0'] = 0.0 if k == 0 else round(ws(s['w0']) - 0.08, 3)
    for k, s in enumerate(sc):
        s['t1'] = sc[k + 1]['t0'] if k + 1 < len(sc) else 9999
    def fix(o, t0):
        if isinstance(o, dict):
            if 'w' in o: o['t'] = round(ws(o.pop('w')) - t0, 3)
            if 'w1' in o: o['t1'] = round(ws(o.pop('w1')) - t0, 3)
            for v in o.values(): fix(v, t0)
        elif isinstance(o, list):
            for x in o: fix(x, t0)
    for s in sc:
        t0 = s['t0']
        for key in ('cam', 'kb'):
            if key in s:
                s[key] = [[(ws(k[0][1:]) - t0) if isinstance(k[0], str) else k[0]] + k[1:] for k in s[key]]
        fix({kk: vv for kk, vv in s.items() if kk not in ('cam', 'kb')}, t0)
    def absw(o):
        if isinstance(o, str) and re.fullmatch(r'w\d+', o): return round(ws(o[1:]), 3)
        if isinstance(o, list): return [absw(x) for x in o]
        if isinstance(o, dict): return {k: absw(v) for k, v in o.items()}
        return o
    for key in ('hud', 'sfx', 'check', 'gauge'):
        if key in ep: ep[key] = absw(ep[key])
    ep['faces'] = [[ws(f[0][1:]) if isinstance(f[0], str) else f[0]] + f[1:] for f in ep.get('faces', [])]


def main():
    ep_dir = os.path.abspath(sys.argv[1])
    stills = sys.argv[2] if len(sys.argv) > 2 else None
    ep = json.load(open(os.path.join(ep_dir, 'episode.json')))
    audio = os.path.join(ep_dir, ep.get('audio', 'voice.mp3'))
    words, dur = align(ep['script'], audio)
    total = round(dur + 0.6, 2)
    resolve(ep, words)
    data = {'dur': total, 'words': words, 'scenes': ep['scenes'], 'faces': ep.get('faces', []),
            'capY': ep.get('capY', 1300), 'style': ep.get('style', {}), 'hud': ep.get('hud'), 'sfx': ep.get('sfx', []), 'check': ep.get('check'), 'gauge': ep.get('gauge'), 'asset': os.path.relpath(os.path.join(ROOT, 'assets'), ep_dir) + '/'}
    # scenes: inline map svg files
    for s in data['scenes']:
        if s.get('type') == 'map' and s.get('svgFile'):
            s['svg'] = open(os.path.join(ep_dir, s.pop('svgFile'))).read()
    # last scene runs to the end
    data['scenes'][-1]['t1'] = total + 1
    html = open(os.path.join(ENG, 'engine.html')).read().replace('/*EP*/', json.dumps(data, ensure_ascii=False))
    open(os.path.join(ep_dir, 'index.html'), 'w').write(html)
    json.dump(words, open(os.path.join(ep_dir, 'words.json'), 'w'), ensure_ascii=False)
    work = f"/home/claude/work/{ep['id']}"
    if stills:
        sh(f'node {ENG}/render.js "{ep_dir}" {total} "{work}/stills" {stills}')
        print('stills in', work + '/stills'); return
    sh(f'rm -rf "{work}/fr" && mkdir -p "{work}"')
    sh(f'node {ENG}/render.js "{ep_dir}" {total} "{work}/fr"')
    # audio
    music = os.path.join(ROOT, 'assets/music', ep.get('music', 'santai') + '.mp3')
    cuts = [s['t0'] for s in ep['scenes'][1:]]
    sh(f'ffmpeg -v error -y -f lavfi -i "anoisesrc=d=0.7:c=pink:r=44100:a=0.5" -af "highpass=f=500,lowpass=f=6000,afade=t=in:st=0:d=0.3,afade=t=out:st=0.3:d=0.4,volume=0.55" "{work}/whoosh.wav"')
    pops = [x[0] for x in ep.get('sfx', [])]
    sh(f'ffmpeg -v error -y -f lavfi -i "sine=f=180:d=0.25" -af "asetrate=44100*2.2,aresample=44100,afade=t=out:st=0.02:d=0.2,volume=1.4" "{work}/pop.wav"')
    inputs = f'-i "{audio}" -i "{music}" ' + ' '.join(f'-i "{work}/whoosh.wav"' for _ in cuts) + ''.join(f' -i "{work}/pop.wav"' for _ in pops)
    fc = ['[0]aformat=sample_rates=44100:channel_layouts=stereo,apad=pad_dur=1,asplit=2[v][vs]',
          f'[1]aformat=sample_rates=44100:channel_layouts=stereo,volume={ep.get('musicVol', 0.30)},afade=t=out:st={total-1.2}:d=1.2[m]',
          '[m][vs]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=400[md]']
    mixin = '[v][md]'
    for k, c in enumerate(cuts):
        ms = max(0, int((c - 0.25) * 1000))
        fc.append(f'[{k+2}]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms}[w{k}]')
        mixin += f'[w{k}]'
    for j, c in enumerate(pops):
        ms = max(0, int(c * 1000)); k = len(cuts) + j
        fc.append(f'[{k+2}]aformat=sample_rates=44100:channel_layouts=stereo,adelay={ms}|{ms}[p{j}]')
        mixin += f'[p{j}]'
    fc.append(f'{mixin}amix=inputs={2+len(cuts)+len(pops)}:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]')
    sh(f'ffmpeg -v error -y {inputs} -filter_complex "{";".join(fc)}" -map "[out]" -t {total} -ar 44100 "{work}/mix.wav"')
    outv = os.path.join(ep_dir, f"{ep['id']}" + (f"-v{ep['ver']}" if ep.get('ver') else '') + '.mp4')
    sh(f'ffmpeg -v error -y -framerate 30 -i "{work}/fr/f_%05d.jpg" -i "{work}/mix.wav" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart "{outv}"')
    print('video', outv, total)


if __name__ == '__main__':
    main()
