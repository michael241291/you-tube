"""Original background music for @intinyaaje, composed in code and rendered with FluidSynth (GM soundfont).

python3 musicgen.py <outdir>   -> writes one mp3 per mood (about 70 s each, loop-friendly).
Every note is generated here (own composition), so there is nothing to claim.
"""
import ctypes, os, random, subprocess, sys, wave
import numpy as np

SR = 44100
SF2 = '/usr/share/sounds/sf2/TimGM6mb.sf2'
lib = ctypes.CDLL('libfluidsynth.so.3')
lib.new_fluid_settings.restype = ctypes.c_void_p
lib.new_fluid_synth.restype = ctypes.c_void_p
lib.new_fluid_synth.argtypes = [ctypes.c_void_p]
lib.fluid_settings_setnum.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_double]
lib.fluid_settings_setint.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_int]
lib.fluid_synth_sfload.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_int]
for fn in ('fluid_synth_noteon',):
    getattr(lib, fn).argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_int]
lib.fluid_synth_noteoff.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int]
lib.fluid_synth_program_change.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int]
lib.fluid_synth_cc.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_int]
lib.fluid_synth_write_float.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_void_p, ctypes.c_int, ctypes.c_int,
                                        ctypes.c_void_p, ctypes.c_int, ctypes.c_int]


def render(events, programs, total, gain=0.5, reverb=0.4):
    """events: list of (time_s, 'on'/'off', ch, note, vel). programs: {ch: (gm_program, volume, pan)}."""
    st = lib.new_fluid_settings()
    lib.fluid_settings_setnum(st, b'synth.sample-rate', float(SR))
    lib.fluid_settings_setnum(st, b'synth.gain', gain)
    lib.fluid_settings_setint(st, b'synth.reverb.active', 1)
    lib.fluid_settings_setint(st, b'synth.chorus.active', 1)
    syn = lib.new_fluid_synth(st)
    lib.fluid_synth_sfload(syn, SF2.encode(), 1)
    for ch, (prog, vol, pan) in programs.items():
        if ch != 9:
            lib.fluid_synth_program_change(syn, ch, prog)
        lib.fluid_synth_cc(syn, ch, 7, vol)
        lib.fluid_synth_cc(syn, ch, 10, pan)
        lib.fluid_synth_cc(syn, ch, 91, int(127 * reverb))
    events = sorted(events, key=lambda e: (e[0], e[1] == 'on'))
    n = int(total * SR)
    L = np.zeros(n, np.float32); R = np.zeros(n, np.float32)
    pos = 0
    def adv(to):
        nonlocal pos
        while pos < to:
            k = min(4096, to - pos)
            lb = np.zeros(k, np.float32); rb = np.zeros(k, np.float32)
            lib.fluid_synth_write_float(syn, k, lb.ctypes.data, 0, 1, rb.ctypes.data, 0, 1)
            L[pos:pos + k] = lb; R[pos:pos + k] = rb; pos += k
    for t, kind, ch, note, vel in events:
        adv(min(n, int(t * SR)))
        if kind == 'on':
            lib.fluid_synth_noteon(syn, ch, note, vel)
        else:
            lib.fluid_synth_noteoff(syn, ch, note)
    adv(n)
    return np.stack([L, R], 1)


def note(ev, t, d, ch, n, v):
    ev.append((t, 'on', ch, n, max(1, min(127, int(v)))))
    ev.append((t + d, 'off', ch, n, 0))


# chord tools
def triad(root, kind, ext=False):
    iv = {'maj': [0, 4, 7], 'min': [0, 3, 7], 'sus': [0, 5, 7], 'dim': [0, 3, 6]}[kind]
    if ext:
        iv = iv + [10 if kind != 'maj' else 11]
    return [root + i for i in iv]


MOODS = {
    # name: tempo, chords [(root midi, kind)], instruments, style
    'santai': dict(bpm=84, chords=[(57, 'min'), (53, 'maj'), (48, 'maj'), (55, 'maj')],
                   pad=4, lead=11, bass=33, drums='lofi', ext=True, swing=0.12),
    'misteri': dict(bpm=76, chords=[(50, 'min'), (46, 'maj'), (48, 'maj'), (45, 'min')],
                    pad=49, lead=10, bass=32, drums='sparse', ext=False, swing=0.0),
    'ceria': dict(bpm=106, chords=[(48, 'maj'), (55, 'maj'), (57, 'min'), (53, 'maj')],
                  pad=12, lead=45, bass=33, drums='bouncy', ext=False, swing=0.0),
    'penasaran': dict(bpm=96, chords=[(52, 'min'), (48, 'maj'), (50, 'maj'), (47, 'maj')],
                      pad=45, lead=71, bass=32, drums='tick', ext=False, swing=0.0),
    'petualangan': dict(bpm=92, chords=[(50, 'maj'), (47, 'min'), (43, 'maj'), (45, 'maj')],
                        pad=48, lead=0, bass=33, drums='march', ext=False, swing=0.0),
}


def compose(name, seed, bars=24):
    m = MOODS[name]; rnd = random.Random(seed)
    beat = 60 / m['bpm']; bar = 4 * beat
    ev = []
    scale_root = m['chords'][0][0]
    for b in range(bars):
        t0 = b * bar
        root, kind = m['chords'][b % len(m['chords'])]
        ch = triad(root, kind, m['ext'])
        section = 0 if b < 4 else (1 if b < 20 else 2)  # intro / main / outro
        # pad / chords
        if name in ('ceria', 'penasaran'):
            for k in range(8):  # plucked eighths
                if rnd.random() < 0.85:
                    n = ch[k % len(ch)] + 12
                    note(ev, t0 + k * beat / 2, beat * 0.4, 0, n, 70 + rnd.randint(-8, 8))
        else:
            for n in ch:
                note(ev, t0 + rnd.uniform(0, 0.03), bar * 0.98, 0, n + 12, 58 if section != 1 else 66)
        # bass
        if section >= 1 or name == 'misteri':
            if name in ('ceria', 'petualangan'):
                for k in (0, 1.5, 2, 3):
                    note(ev, t0 + k * beat, beat * 0.45, 2, root - 12 + (7 if k == 3 else 0), 92)
            else:
                note(ev, t0, beat * 1.8, 2, root - 12, 90)
                note(ev, t0 + 2.5 * beat, beat * 1.2, 2, root - 12 + rnd.choice([0, 7, 12]), 80)
        # melody (motif repeats every 4 bars, varies a bit)
        if 3 <= b < 22:
            pent = [0, 2, 4, 7, 9] if kind == 'maj' else [0, 3, 5, 7, 10]
            mrnd = random.Random(seed * 100 + (b % 4))
            steps = [0, 1, 1.5, 2.5, 3] if name != 'misteri' else [0, 2, 3]
            for s in steps:
                if mrnd.random() < (0.75 if section == 1 else 0.4):
                    deg = mrnd.choice(pent)
                    n = root + 24 + deg
                    sw = m['swing'] * beat if (s % 1) == 0.5 else 0
                    note(ev, t0 + s * beat + sw, beat * (0.9 if name != 'misteri' else 1.8), 1, n,
                         64 + mrnd.randint(-10, 6))
        # drums (ch 9)
        if section == 1 or (section == 2 and b < 22):
            d = m['drums']
            for k in range(8):
                tt = t0 + k * beat / 2 + (m['swing'] * beat if k % 2 else 0)
                if d == 'lofi':
                    if k in (0, 5): note(ev, tt, 0.1, 9, 36, 80)
                    if k in (2, 6): note(ev, tt, 0.1, 9, 38, 55)
                    note(ev, tt, 0.05, 9, 42, 38 + (10 if k % 2 == 0 else 0))
                elif d == 'sparse':
                    if k == 0: note(ev, tt, 0.2, 9, 36, 60)
                    if k == 4 and b % 2: note(ev, tt, 0.2, 9, 47, 45)
                    if k % 2 == 0: note(ev, tt, 0.05, 9, 44, 28)
                elif d == 'bouncy':
                    if k in (0, 3, 4): note(ev, tt, 0.1, 9, 36, 82)
                    if k in (2, 6): note(ev, tt, 0.1, 9, 39, 70)
                    note(ev, tt, 0.05, 9, 42, 45)
                elif d == 'tick':
                    if k in (0, 4): note(ev, tt, 0.1, 9, 36, 70)
                    note(ev, tt, 0.05, 9, 75 if k % 2 == 0 else 76, 50)
                elif d == 'march':
                    if k in (0, 4): note(ev, tt, 0.1, 9, 36, 85)
                    if k in (2, 6): note(ev, tt, 0.1, 9, 38, 60)
                    if k == 7: note(ev, tt, 0.1, 9, 45, 55)
                    note(ev, tt, 0.05, 9, 42, 35)
    total = bars * bar + 2.5
    progs = {0: (m['pad'], 92, 54), 1: (m['lead'], 84, 74), 2: (m['bass'], 100, 64), 9: (0, 78, 64)}
    audio = render(ev, progs, total)
    return audio


def save(audio, path):
    a = audio / max(1e-6, np.abs(audio).max()) * 0.89
    fade = int(SR * 2.0)
    a[-fade:] *= np.linspace(1, 0, fade)[:, None]
    a[:int(SR * 0.3)] *= np.linspace(0, 1, int(SR * 0.3))[:, None]
    tmp = path + '.wav'
    with wave.open(tmp, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((a * 32767).astype('<i2').tobytes())
    subprocess.run(f'ffmpeg -v error -y -i "{tmp}" -af "lowpass=f=11000,loudnorm=I=-16:TP=-1.5" -b:a 192k "{path}"',
                   shell=True, check=True)
    os.remove(tmp)


if __name__ == '__main__':
    out = sys.argv[1]; os.makedirs(out, exist_ok=True)
    for i, name in enumerate(MOODS):
        save(compose(name, seed=11 + i), os.path.join(out, f'{name}.mp3'))
        print(name)
