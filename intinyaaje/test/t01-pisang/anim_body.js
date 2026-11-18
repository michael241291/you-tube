// t01 — Pisang hitam di kulkas (uji gaya campuran: foto asli + animasi)
const IM = {};
window.assetsReady = Promise.all([window.assetsReady, ...Object.entries(P01IMG).map(([k, v]) => new Promise(res => {
  const im = new Image(); im.onload = () => im.decode().then(res, res); im.onerror = res; im.src = v.src; IM[k] = im;
}))]);
const PAL = { bg: '#efe6d3', grid: 'rgba(120,100,70,.10)', ink: '#2b2620', red: '#e5484d', green: '#2fa36b', blue: '#3a7bd5' };

P01.bg = (c, t, tone = 0) => {
  c.setTransform(1, 0, 0, 1, 0, 0);
  const g = c.createRadialGradient(540, 860, 100, 540, 900, 1300);
  g.addColorStop(0, tone ? '#e7eef6' : '#f4ecdb'); g.addColorStop(1, tone ? '#c9d6e4' : '#d9cbb0');
  c.fillStyle = g; c.fillRect(0, 0, 1080, 1920);
  c.strokeStyle = PAL.grid; c.lineWidth = 2; const o = (t * 6) % 60;
  for (let x = -60 + o; x < 1140; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1920); c.stroke(); }
  for (let y = -60 + o; y < 1980; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(1080, y); c.stroke(); }
};
// pop dengan overshoot
P01.pop = (t, t0, d = 0.45) => { const x = AL.p(t, t0, t0 + d); if (x <= 0) return 0; if (x >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
// gambar foto + bayangan
P01.spr = (c, k, x, y, w, o = {}) => {
  const im = IM[k], meta = P01IMG[k]; if (!im || !im.complete) return;
  const s = o.s ?? 1; if (s <= 0.001) return;
  const h = w * meta.h / meta.w;
  c.save(); c.translate(x, y); c.rotate(o.rot || 0); c.scale(s, s); c.globalAlpha = o.a ?? 1;
  c.fillStyle = 'rgba(60,40,10,.18)'; c.beginPath(); c.ellipse(0, h * 0.5 + 18, w * 0.42, 22, 0, 0, 6.283); c.fill();
  if (o.filter) c.filter = o.filter;
  c.drawImage(im, -w / 2, -h / 2, w, h); c.restore();
};
P01.fridge = (c, x, y, s, open = 0) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(40,30,10,.18)'; c.beginPath(); c.ellipse(0, 330, 210, 24, 0, 0, 6.283); c.fill();
  const body = AL.lg(c, -200, 0, 200, 0, [[0, '#f7f9fb'], [1, '#d6dde4']]);
  c.fillStyle = body; AL.rrect(c, -200, -320, 400, 650, 34); c.fill();
  c.strokeStyle = '#b9c3cc'; c.lineWidth = 6; c.beginPath(); c.moveTo(-200, -90); c.lineTo(200, -90); c.stroke();
  c.fillStyle = '#9aa6b1'; AL.rrect(c, 150, -250, 16, 120, 8); c.fill(); AL.rrect(c, 150, -40, 16, 160, 8); c.fill();
  if (open > 0) { // pintu bawah terbuka -> isi dingin biru
    c.fillStyle = '#cfe6f7'; AL.rrect(c, -180, -80, 360 * open, 400, 20); c.fill();
    c.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 3; i++) c.fillRect(-170, 20 + i * 100, 340 * open, 8);
  }
  c.restore();
};
P01.thermo = (c, x, y, v) => { // v 0..1 tinggi merkuri
  c.save(); c.translate(x, y);
  c.fillStyle = '#fff'; AL.rrect(c, -34, -260, 68, 440, 34); c.fill(); c.strokeStyle = '#c9c2b4'; c.lineWidth = 4; c.stroke();
  c.beginPath(); c.arc(0, 190, 56, 0, 6.283); c.fillStyle = '#fff'; c.fill(); c.stroke();
  const col = v > 0.5 ? PAL.red : PAL.blue; c.fillStyle = col; c.beginPath(); c.arc(0, 190, 40, 0, 6.283); c.fill();
  const hgt = 60 + 330 * v; c.fillRect(-14, 170 - hgt, 28, hgt);
  c.fillStyle = PAL.ink; for (let i = 0; i < 6; i++) c.fillRect(20, -200 + i * 60, 18, 4);
  c.restore();
};
P01.cell = (c, cx, cy, r, t, dmg, mix, dark) => { // lingkaran kaca pembesar berisi sel kulit
  c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 6.283); c.clip();
  c.fillStyle = AL.mix ? '#f6d65a' : '#f6d65a'; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  const sz = 70;
  for (let row = -5; row <= 5; row++) for (let col = -5; col <= 5; col++) {
    const x = cx + col * sz * 1.5, y = cy + row * sz * 1.73 + (col % 2 ? sz * 0.86 : 0);
    const jitter = dmg * 6 * Math.sin(t * 9 + row * 3 + col);
    c.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; c.lineTo(x + jitter + Math.cos(a) * sz * 0.92, y + Math.sin(a) * sz * 0.92); } c.closePath();
    const d = Math.min(1, dark * (0.6 + 0.4 * Math.sin(row * 7 + col * 3) ** 2));
    c.fillStyle = `rgb(${246 - 190 * d | 0},${214 - 170 * d | 0},${90 - 70 * d | 0})`; c.fill();
    c.strokeStyle = `rgba(160,120,30,${0.6})`; c.lineWidth = 5; c.stroke();
    if (dmg > 0.3 && (row + col * 3) % 4 === 0) { c.strokeStyle = `rgba(90,50,10,${dmg})`; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 20, y - 20); c.lineTo(x + 6, y + 4); c.lineTo(x + 24, y - 6); c.stroke(); }
  }
  // fenol (merah) + enzim (biru) bergerak dan bertemu
  if (mix > 0) for (let i = 0; i < 18; i++) {
    const a = AL.r(i, 1) * 6.283, d0 = r * 0.8 * AL.r(i, 2);
    const k = AL.sm(mix), px = cx + Math.cos(a) * d0 * (1 - 0.55 * k) + Math.sin(t * 2 + i) * 8, py = cy + Math.sin(a) * d0 * (1 - 0.55 * k);
    c.fillStyle = i % 2 ? '#e5484d' : '#3a7bd5'; c.beginPath(); c.arc(px, py, 14, 0, 6.283); c.fill();
  }
  c.restore();
  c.strokeStyle = '#3b332a'; c.lineWidth = 18; c.beginPath(); c.arc(cx, cy, r, 0, 6.283); c.stroke();
  c.lineWidth = 34; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx + r * 0.72, cy + r * 0.72); c.lineTo(cx + r * 1.15, cy + r * 1.15); c.stroke();
};
P01.mark = (c, x, y, ok, s) => { if (s <= 0) return; c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = ok ? PAL.green : PAL.red; c.beginPath(); c.arc(0, 0, 58, 0, 6.283); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 14; c.lineCap = 'round'; c.beginPath();
  if (ok) { c.moveTo(-26, 2); c.lineTo(-6, 22); c.lineTo(28, -20); } else { c.moveTo(-22, -22); c.lineTo(22, 22); c.moveTo(22, -22); c.lineTo(-22, 22); }
  c.stroke(); c.restore(); };
P01.apple = (c, x, y, s, brown) => { c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = '#d23b3b'; c.beginPath(); c.arc(-60, 0, 120, 0, 6.283); c.arc(60, 0, 120, 0, 6.283); c.fill();
  c.fillStyle = `rgb(${250 - 90 * brown | 0},${235 - 120 * brown | 0},${190 - 140 * brown | 0})`; c.beginPath(); c.arc(150, -10, 95, 0, 6.283); c.fill();
  c.fillStyle = '#5b3a1e'; c.fillRect(-8, -150, 16, 50); c.fillStyle = '#4caf50'; c.beginPath(); c.ellipse(40, -140, 50, 22, -0.4, 0, 6.283); c.fill(); c.restore(); };

ANIM.pisang = (c, t, lt, s) => {
  const P = AL.p, T = WT, sm = AL.sm, v = s.view, bob = Math.sin(t * 2) * 8;
  if (v === 'hook') {
    P01.bg(c, t);
    const swap = sm(P(t, T(3), T(3) + 0.5)); const fr = P01.pop(t, T(1)) * (1 - sm(P(t, T(3), T(3) + 0.4)));
    P01.fridge(c, 880, 900, 0.7 * fr, 1);
    const bx = AL.mix(540, 470, P(t, T(1), T(2)));
    P01.spr(c, 'kuning', bx, 880 + bob, 820, { s: Math.max(0.001, P01.pop(t, 0.05)), a: 1 - swap });
    P01.spr(c, 'hitam', 540, 880 + bob, 860, { a: swap, s: swap > 0 ? 1 : 0, rot: t > T(7) && t < T(12) ? -0.08 * Math.sin(t * 20) * P(t, T(7), T(8)) : 0 });
    c.setTransform(1, 0, 0, 1, 0, 0);
    if (t > T(9) && t < T(12)) { const a = P01.pop(t, T(10)); c.save(); c.translate(820, 640); c.scale(a, a); AL.text(c, 'BUSUK?', 0, 0, { size: 64, pill: true, color: PAL.red }); c.restore(); }
    if (t > T(12)) { const a = P01.pop(t, T(12)); c.save(); c.translate(540, 1215); c.scale(a, a); AL.text(c, 'TUNGGU DULU!', 0, 0, { size: 48, pill: true, color: '#ffd23f' }); c.restore(); }
    if (t < T(3)) AL.text(c, 'MASUK KULKAS', 540, 560, { size: 40, pill: true });
    else if (t < T(9)) AL.text(c, 'BESOKNYA: HITAM LEGAM', 540, 560, { size: 40, pill: true, color: '#ffd23f' });
    return;
  }
  if (v === 'tropis') {
    P01.bg(c, t, P(t, T(21), T(26)));
    P01.spr(c, 'sisir', 380, 900 + bob, 700, { s: P01.pop(t, s.t0 + 0.02) });
    const temp = 1 - sm(P(t, T(21), T(26)));
    P01.thermo(c, 900, 880, 0.25 + 0.55 * temp);
    // matahari ke salju
    c.save(); c.globalAlpha = temp; c.fillStyle = '#ffc93c'; c.beginPath(); c.arc(860, 520, 60, 0, 6.283); c.fill(); c.restore();
    if (temp < 1) for (let i = 0; i < 26; i++) { const y = ((AL.r(i, 3) * 1600 + t * 120) % 1600) + 200; c.fillStyle = `rgba(255,255,255,${(1 - temp) * 0.9})`; c.beginPath(); c.arc(AL.r(i, 4) * 1080, y, 6 + 6 * AL.r(i, 5), 0, 6.283); c.fill(); }
    c.setTransform(1, 0, 0, 1, 0, 0);
    if (t < T(21)) AL.text(c, 'BUAH TROPIS', 540, 560, { size: 42, pill: true }); else AL.text(c, 'DI BAWAH ±13°C', 540, 560, { size: 46, pill: true, color: '#7cc8ff' });
    if (t > T(27)) { const a = P01.pop(t, T(30)); c.save(); c.translate(540, 1215); c.scale(a, a); AL.text(c, 'SEL KULIT RUSAK', 0, 0, { size: 44, pill: true, color: PAL.red }); c.restore(); }
    return;
  }
  if (v === 'sel') {
    P01.bg(c, t);
    P01.spr(c, 'kuning', 280, 1010, 500, { s: 1, a: 0.9 });
    const dmg = sm(P(t, T(33), T(35))), mix = sm(P(t, T(37), T(45))), dark = sm(P(t, T(46), T(52)));
    c.strokeStyle = 'rgba(59,51,42,.5)'; c.lineWidth = 6; c.setLineDash([12, 10]); c.beginPath(); c.moveTo(330, 960); c.lineTo(560, 880); c.stroke(); c.setLineDash([]);
    P01.cell(c, 640, 880, 260, t, dmg, mix, dark);
    c.setTransform(1, 0, 0, 1, 0, 0);
    if (t > T(37) && t < T(46)) { AL.text(c, '● FENOL', 330, 1205, { size: 34, color: PAL.red }); AL.text(c, '● ENZIM PPO', 760, 1205, { size: 34, color: PAL.blue }); }
    let lab = 'DINDING SEL BOCOR', col = PAL.red;
    if (t > T(46)) { lab = '+ OKSIGEN → PIGMEN GELAP'; col = '#ffd23f'; }
    if (t > T(33)) AL.text(c, lab, 540, 560, { size: 40, pill: true, color: col });
    return;
  }
  if (v === 'apel') {
    P01.bg(c, t);
    const br = sm(P(t, T(56), T(59)));
    P01.apple(c, 500, 880 + bob, 2.0 * P01.pop(t, T(53)), br);
    c.setTransform(1, 0, 0, 1, 0, 0);
    AL.text(c, 'REAKSI YANG SAMA', 540, 560, { size: 42, pill: true });
    return;
  }
  if (v === 'daging') {
    P01.bg(c, t);
    const k = sm(P(t, T(66), T(66) + 0.6));
    P01.spr(c, 'hitam', AL.mix(540, 290, k), 880 + bob, AL.mix(860, 520, k), {});
    P01.spr(c, 'kupas', 790, 880 - bob, 540, { s: P01.pop(t, T(66)) });
    c.setTransform(1, 0, 0, 1, 0, 0);
    if (t < T(66)) AL.text(c, 'RUSAKNYA CUMA DI KULIT', 540, 560, { size: 40, pill: true, color: '#ffd23f' });
    else { AL.text(c, 'DAGING LEBIH AWET', 540, 560, { size: 42, pill: true, color: '#7ee2a8' }); P01.mark(c, 900, 1060, true, P01.pop(t, T(68))); }
    if (t > T(70)) { const a = P01.pop(t, T(71)); c.save(); c.translate(540, 1215); c.scale(a, a); AL.text(c, 'DINGIN = PEMATANGAN MELAMBAT', 0, 0, { size: 36, pill: true }); c.restore(); }
    return;
  }
  if (v === 'syarat') {
    P01.bg(c, t);
    P01.fridge(c, 540, 1040, 0.42, 1);
    const g = P(t, T(84), T(84) + 0.4);
    P01.spr(c, 'kuning', 290, 780 + bob, 470, { s: P01.pop(t, T(76)) });
    P01.spr(c, 'hijau', 800, 780 - bob, 450, { s: P01.pop(t, T(84)) });
    P01.mark(c, 410, 640, true, P01.pop(t, T(82)));
    P01.mark(c, 900, 640, false, P01.pop(t, T(88)));
    c.setTransform(1, 0, 0, 1, 0, 0);
    AL.text(c, t < T(84) ? 'SYARAT: SUDAH MATANG' : 'PISANG HIJAU: BERHENTI MATANG', 540, 520, { size: 36, pill: true, color: t < T(84) ? '#7ee2a8' : PAL.red });
    return;
  }
};
