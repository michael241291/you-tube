"""Timing kata yang akurat: Whisper (faster-whisper, lokal) mengenali kata + waktunya,
lalu dicocokkan ke kata-kata naskah. Kata naskah yang tidak cocok (mis. angka yang ditulis
dengan huruf) diisi dari kata Whisper di celah yang sama, dibagi menurut panjang huruf.
Hasil di-cache di <audio>.asr.json (dibuat ulang otomatis kalau audio berubah)."""
import hashlib, json, os, re, subprocess, difflib
import numpy as np

_model = None


def _norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())


def asr_words(audio, model='small'):
    h = hashlib.md5(open(audio, 'rb').read()).hexdigest()
    cache = audio + '.asr.json'
    if os.path.exists(cache):
        c = json.load(open(cache))
        if c.get('md5') == h and c.get('model') == model:
            return c['words']
    global _model
    os.environ.pop('NO_PROXY', None); os.environ.pop('no_proxy', None)
    from faster_whisper import WhisperModel
    if _model is None:
        _model = WhisperModel(model, device='cpu', compute_type='int8')
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', audio, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(raw, np.float32)
    segs, _ = _model.transcribe(x, language='id', word_timestamps=True, beam_size=5, vad_filter=False)
    words = [[w.word.strip(), round(w.start, 3), round(w.end, 3)] for s in segs for w in s.words if w.word.strip()]
    json.dump({'md5': h, 'model': model, 'words': words}, open(cache, 'w'), ensure_ascii=False)
    return words


def align(script, audio, dur):
    toks = script.split()
    a = asr_words(audio)
    A = [_norm(w[0]) for w in a]
    T = [_norm(t) for t in toks]
    sm = difflib.SequenceMatcher(None, T, A, autojunk=False)
    st = [None] * len(toks); en = [None] * len(toks)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == 'equal':
            for k in range(i2 - i1):
                st[i1 + k], en[i1 + k] = a[j1 + k][1], a[j1 + k][2]
        elif i2 > i1:
            if j2 > j1:
                t0, t1 = a[j1][1], a[j2 - 1][2]
            else:
                t0 = a[j1 - 1][2] if j1 > 0 else 0.0
                t1 = a[j1][1] if j1 < len(a) else dur
            L = [max(1, len(T[i])) for i in range(i1, i2)]; tot = sum(L); acc = t0
            for k, i in enumerate(range(i1, i2)):
                d = (t1 - t0) * L[k] / tot
                st[i], en[i] = round(acc, 3), round(acc + d, 3); acc += d
    # rapikan pakai jeda nyata: jeda di dalam rentang kata dipotong (Whisper suka menempelkan jeda ke kata)
    try:
        import build
        sil = [(x, y if y is not None else dur) for x, y in build.silences(audio, '-36dB', 0.12)]
    except Exception:
        sil = []
    P = lambda t: bool(re.search(r'[.,!?;:…]$', t))
    for i in range(len(toks)):
        for x, y in sil:
            if y <= st[i] + 0.02 or x >= en[i] - 0.02: continue
            if x <= st[i] + 0.03:                       # jeda di awal kata
                st[i] = min(y, en[i] - 0.05)
            elif y >= en[i] - 0.03:                     # jeda di akhir kata
                en[i] = max(x, st[i] + 0.05)
            elif i > 0 and P(toks[i - 1]) and not P(toks[i]):   # jeda milik tanda baca sebelumnya
                en[i - 1] = max(en[i - 1], x); st[i] = y
            elif P(toks[i]):
                en[i] = x
            elif (x - st[i]) < (en[i] - y):
                st[i] = y
            else:
                en[i] = x
    out = []
    for i, t in enumerate(toks):
        s = st[i]; e = en[i]
        if i + 1 < len(toks) and st[i + 1] is not None:
            e = min(max(e, s + 0.08), st[i + 1])  # kata aktif sampai kata berikutnya mulai
        out.append([t, round(float(s), 3), round(float(max(e, s + 0.05)), 3)])
    # jaga urutan naik
    for i in range(1, len(out)):
        if out[i][1] < out[i - 1][1]: out[i][1] = out[i - 1][1]
    return out
