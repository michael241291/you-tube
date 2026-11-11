// e29 — Huruf a di HP kok beda sama tulisanmu?
const H29={};
H29.glyph=(c,ch,x,y,size,font,col,a=1)=>{c.save();c.globalAlpha*=a;c.font=`${font.replace('SZ',size)}`;c.textAlign='center';c.textBaseline='alphabetic';c.fillStyle=col;c.fillText(ch,x,y);c.restore()};
H29.paper=(c,x,y,w,h,rot=0)=>{c.save();c.translate(x,y);c.rotate(rot);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(-w/2+14,-h/2+18,w,h);c.fillStyle='#fbf8f0';c.fillRect(-w/2,-h/2,w,h);c.strokeStyle='rgba(80,140,220,.35)';c.lineWidth=3;for(let i=1;i<10;i++){c.beginPath();c.moveTo(-w/2,-h/2+i*h/10);c.lineTo(w/2,-h/2+i*h/10);c.stroke()}c.strokeStyle='rgba(230,90,90,.5)';c.beginPath();c.moveTo(-w/2+70,-h/2);c.lineTo(-w/2+70,h/2);c.stroke();c.restore()};
// tulis 'a' satu tingkat dengan pena: p 0..1
H29.handA=(c,x,y,r,p,col='#1d2a6b')=>{c.save();c.strokeStyle=col;c.lineWidth=r*.22;c.lineCap='round';const k1=Math.min(1,p/0.7);c.beginPath();c.arc(x,y,r,-0.3,-0.3-6.0*k1,true);c.stroke();
  if(p>0.7){const k2=(p-0.7)/0.3;c.beginPath();c.moveTo(x+r,y-r);c.lineTo(x+r,y-r+2.1*r*k2);c.quadraticCurveTo(x+r,y+r+r*0.3*k2,x+r+r*0.4*k2,y+r);c.stroke()}
  // pena
  const ang=p<0.7?-0.3-6.0*k1:0;const px=p<0.7?x+Math.cos(ang)*r:x+r,py=p<0.7?y+Math.sin(ang)*r:y-r+2.1*r*Math.min(1,(p-0.7)/0.3);
  if(p>0&&p<1){c.save();c.translate(px,py);c.rotate(-0.6);c.fillStyle='#2e86de';AL.rrect(c,-12,-300,24,290,10);c.fill();c.fillStyle='#ddd';c.beginPath();c.moveTo(-12,-10);c.lineTo(12,-10);c.lineTo(0,10);c.fill();c.restore()}
  c.restore()};
H29.phone=(c,x,y,s,draw)=>{c.save();c.translate(x,y);c.scale(s,s);c.fillStyle='#111';AL.rrect(c,-170,-340,340,680,46);c.fill();c.fillStyle='#f5f7fa';AL.rrect(c,-150,-310,300,620,30);c.fill();c.fillStyle='#e6e9ee';c.fillRect(-150,-310,300,70);draw&&draw(c);c.restore()};

ANIM.huruf=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  const SERIF='700 SZpx DejaVu Serif',ROUND='600 SZpx Poppins',ITAL='italic 700 SZpx FreeSerif';
  if(v==='kertas'){AL.cam(c,540,860,1);
    c.fillStyle=AL.lg(c,0,0,1080,1920,[[0,'#8a5a3a'],[1,'#5e3c26']]);c.fillRect(-600,-800,2300,3600);for(let i=0;i<20;i++){c.strokeStyle='rgba(0,0,0,.08)';c.lineWidth=6;c.beginPath();c.moveTo(-600,i*120);c.bezierCurveTo(0,i*120+30,600,i*120-30,1700,i*120);c.stroke()}
    const ph=sm(P(t,T(14),T(15)+0.4));
    H29.paper(c,AL.mix(540,330,ph),860,AL.mix(760,520,ph),AL.mix(700,620,ph),-0.04);
    H29.handA(c,AL.mix(520,310,ph),900,AL.mix(110,80,ph),P(t,T(1),T(6)));
    if(ph>0){c.globalAlpha=ph;H29.phone(c,AL.mix(1100,790,ph),860,0.95,c=>{H29.glyph(c,'a',0,100,280,SERIF,'#111');if(Math.sin(t*6)>0){c.fillStyle='#2e86de';c.fillRect(90,-60,8,180)}});c.globalAlpha=1;
      const hl=P(t,T(23),T(23)+0.4);if(hl>0){c.strokeStyle=`rgba(255,77,94,${hl})`;c.lineWidth=10;c.beginPath();c.arc(790,790,70,0,6.283);c.stroke()}}
    c.setTransform(1,0,0,1,0,0);
    const g=P(t,T(27),T(27)+0.4);if(g>0){c.globalAlpha=g;AL.text(c,'GURU SD: BULAT',300,1140,{size:36,pill:true,color:'#ffd23f'});if(t>T(32))AL.text(c,'BUKU & HP: BERTINGKAT',780,560,{size:34,pill:true,color:'#7cc8ff'});c.globalAlpha=1}
    return}
  if(v==='evolusi'){AL.cam(c,540,860,1);
    c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#2b2442'],[1,'#0e0b18']]);c.fillRect(-600,-800,2300,3600);
    const up=sm(P(t,T(47),T(50)));
    // A kapital di atas
    H29.glyph(c,'A',540,AL.mix(800,860,1-up),AL.mix(0,240,up),SERIF,'#ffd23f',up);
    // dua cabang
    const yb=1160;const hand=sm(P(t,T(53),T(65))),print=sm(P(t,T(69),T(74)));
    const L=(x,col,a)=>{if(a<=0)return;c.strokeStyle=col;c.lineWidth=8;c.globalAlpha=a;c.setLineDash([18,12]);c.beginPath();c.moveTo(540,880);c.quadraticCurveTo(x,900,x,950);c.stroke();c.setLineDash([]);c.globalAlpha=1};
    L(300,'#3ddc84',Math.max(up*0.3,hand));L(780,'#7cc8ff',Math.max(up*0.3,print));
    // cabang tangan: A -> disederhanakan -> ɑ
    const st=t<T(53)?2:t<T(59)?0:t<T(63)?1:2;const forms=[['A',SERIF],['Λ',ROUND],['a',ROUND]];
    const f=forms[st];const pop=AL.eb?1:1;H29.glyph(c,f[0],300,yb,AL.mix(180,260,hand),f[1],'#3ddc84',Math.max(0.0,hand>0?1:t>T(44)?1:0));
    H29.glyph(c,'a',780,yb,AL.mix(180,260,Math.max(print,0)),SERIF,'#7cc8ff',t>T(44)?1:0);
    // pena menulis cepat di cabang tangan
    if(t>T(53)&&t<T(65)){c.save();c.translate(360+Math.sin(t*12)*30,1040+Math.cos(t*12)*20);c.rotate(-0.6);c.fillStyle='#2e86de';AL.rrect(c,-10,-220,20,210,10);c.fill();c.restore()}
    c.setTransform(1,0,0,1,0,0);
    if(t>T(44)&&t<T(47)){AL.text(c,'✓ SAH',300,1190,{size:40,pill:true,color:'#3ddc84'});AL.text(c,'✓ SAH',780,1190,{size:40,pill:true,color:'#7cc8ff'})}
    if(hand>0.05)AL.text(c,'TULISAN TANGAN',300,1180,{size:34,pill:true,color:'#3ddc84'});
    if(print>0.05)AL.text(c,'CETAK TEGAK',780,1180,{size:34,pill:true,color:'#7cc8ff'});
    return}
  if(v==='miring'){const zz=sm(P(t,T(85),T(88)));AL.cam(c,AL.mix(540,380,zz),AL.mix(860,640,zz),AL.mix(1,1.7,zz));
    c.fillStyle='#5e3c26';c.fillRect(-600,-800,2300,3600);
    c.fillStyle='#fbf8f0';AL.rrect(c,90,480,900,760,16);c.fill();c.fillStyle='rgba(0,0,0,.08)';c.fillRect(530,480,20,760);
    const words=['Sang','raja','datang','pada','malam','hari','dan','ia','berkata','bahwa','kapal','harus','segera','berangkat'];
    c.font='italic 600 70px FreeSerif';c.fillStyle='#2b2b2b';c.textBaseline='alphabetic';c.textAlign='left';let x=130,y=600;const As=[];words.forEach(w=>{const wd=c.measureText(w+' ').width;if(x+wd>990){x=130;y+=100}c.fillText(w,x,y);[...w].forEach((ch,i)=>{if(ch==='a')As.push([x+c.measureText(w.slice(0,i)).width+c.measureText('a').width/2,y])});x+=wd});
    // sorot huruf a miring
    const hl=P(t,T(87),T(87)+0.4);if(hl>0){c.strokeStyle=`rgba(255,210,63,${hl})`;c.lineWidth=6;As.forEach(p=>{c.beginPath();c.arc(p[0]+16,p[1]-22,30,0,6.283);c.stroke()})}
    c.setTransform(1,0,0,1,0,0);const a=P(t,T(81),T(81)+0.4)*(1-P(t,T(85),T(85)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'HURUF MIRING: a KEMBALI BULAT',540,1140,{size:34,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
  if(v==='kamu'){AL.cam(c,540,860,1);
    c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#2b2442'],[1,'#0e0b18']]);c.fillRect(-600,-800,2300,3600);
    H29.paper(c,300,870,420,520,-0.05);H29.handA(c,300,900,90,1);
    H29.phone(c,790,870,0.85,c=>{H29.glyph(c,'a',0,100,260,SERIF,'#111')});
    const gA=sm(P(t,T(109),T(110)));
    if(gA>0){c.fillStyle=`rgba(14,11,24,${.85*gA})`;c.fillRect(-600,-800,2300,3600);c.globalAlpha=gA;H29.glyph(c,'g',330,1020,320,ROUND,'#3ddc84');H29.glyph(c,'g',780,1020,320,SERIF,'#7cc8ff');AL.text(c,'HURUF g JUGA DUA BENTUK',540,560,{size:36,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    c.setTransform(1,0,0,1,0,0);
    if(gA<0.5){AL.text(c,'VERSI TANGAN',300,1180,{size:34,pill:true,color:'#3ddc84'});AL.text(c,'VERSI CETAK',790,1180,{size:34,pill:true,color:'#7cc8ff'})}
    return}
};
