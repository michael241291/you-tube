// e26 — Dua minimarket kok sebelahan?
const S26={};
S26.store=(c,x,y,w,o)=>{const h=520;c.save();c.translate(x,y);
  c.fillStyle='#e9e6df';c.fillRect(0,-h,w,h);c.fillStyle='rgba(0,0,0,.12)';c.fillRect(w-20,-h,20,h);
  c.fillStyle=o.col;c.fillRect(-10,-h,w+20,110);c.fillStyle=o.col2;c.fillRect(-10,-h+110,w+20,18);
  AL.text(c,o.name,w/2,-h+56,{size:58,color:'#fff'});
  // kaca + rak
  c.fillStyle=AL.lg(c,0,-h+150,0,-30,[[0,'#bfe4f2'],[1,'#86b9cf']]);c.fillRect(20,-h+150,w-40,h-180);
  for(let r=0;r<3;r++){c.fillStyle='#8c8c8c';c.fillRect(40,-h+220+r*90,w*.5,8);for(let k=0;k<8;k++){c.fillStyle=['#e74c3c','#f1c40f','#2ecc71','#3498db'][(k+r)%4];c.fillRect(46+k*(w*.5/8),-h+180+r*90,w*.5/8-6,40)}}
  c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.moveTo(60,-h+150);c.lineTo(140,-h+150);c.lineTo(40,-30);c.lineTo(20,-30);c.fill();
  c.fillStyle='#5b6670';c.fillRect(w*.62,-h+170,w*.3,h-170);c.fillStyle='rgba(200,230,245,.85)';c.fillRect(w*.64,-h+185,w*.26,h-200);
  if(o.closed){c.fillStyle='rgba(60,50,40,.92)';c.fillRect(0,-h+128,w,h-128);c.strokeStyle='#e0b02a';c.lineWidth=10;for(let k=0;k<8;k++){c.beginPath();c.moveTo(k*70-80,-30);c.lineTo(k*70+80,-h+130);c.stroke()}}
  if(o.price){AL.text(c,o.price,w/2,-h-50,{size:40,pill:true,color:'#ffd23f'})}
  if(o.cold){AL.text(c,'LEBIH ADEM',w/2,-h-50-(o.price?80:0),{size:36,pill:true,color:'#7cc8ff'})}
  c.restore()};
S26.walker=(c,t,x,y,s,seed,col)=>{const b=Math.abs(Math.sin(t*6+seed))*10;AL.person(c,x,y-b*.3,s,{shirt:col,shirt2:col})};

ANIM.toko=(c,t,lt,s)=>{const P=AL.p,T=WT,sm=AL.sm,v=s.view;
  const street=(o={})=>{AL.sky(c,'#69aee6','#dceef8',-800,700);AL.clouds(c,t,{y:220,n:5,s:120,v:10});
    c.fillStyle='#c9c2b5';c.fillRect(-600,1100,2300,90);c.fillStyle='#55595e';c.fillRect(-600,1190,2300,800);c.fillStyle='#f4f1e4';for(let i=0;i<10;i++)c.fillRect(((i*260-t*60)%2600+2600)%2600-600,1340,140,14)};
  if(v==='jalan'){AL.cam(c,540,860,1);street();
    S26.store(c,40,1100,480,{col:'#1f6fbf',col2:'#ffd23f',name:'TOKO A'});S26.store(c,560,1100,480,{col:'#d6272f',col2:'#2ecc71',name:'TOKO B'});
    for(let i=0;i<6;i++){const dir=i%2?1:-1;const x=((i*230+t*90*dir)%1500+1500)%1500-200;S26.walker(c,t,x,1160,170,i,['#2f6fb5','#e05a3c','#3ddc84','#b18cff','#ff9f1c','#2ec4ff'][i])}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(13),T(13)+0.4)*(1-P(t,T(22),T(22)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,'BODOH? PEMBELI DIBAGI DUA',540,540,{size:38,pill:true,color:'#ff8a96'});c.globalAlpha=1}
    const b=P(t,T(25),T(25)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'KATA AHLI: STRATEGI PINTAR',540,540,{size:40,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    return}
  if(v==='hotel'){AL.cam(c,540,860,1);
    c.fillStyle=AL.rg(c,540,800,50,1200,[[0,'#1f2f45'],[1,'#0a0f18']]);c.fillRect(-600,-800,2300,3600);
    const y=860;c.fillStyle='#55595e';AL.rrect(c,60,y-30,960,60,30);c.fill();c.fillStyle='#f4f1e4';for(let i=0;i<12;i++)c.fillRect(90+i*80,y-4,44,8);
    const N=24;const px=i=>90+(i%12)*82+(i>=12?41:0);
    // posisi toko
    const aIn=P(t,T(44),T(44)+0.4),bIn=P(t,T(49),T(49)+0.4);
    let ax=110,bx=AL.mix(110,330,sm(P(t,T(51),T(57))));ax=AL.mix(ax,AL.mix(400,520,sm(P(t,T(67),T(72)))),sm(P(t,T(63),T(66))));if(t>T(66))bx=AL.mix(330,600,sm(P(t,T(67),T(72))));
    let ca=0,cb=0;
    for(let i=0;i<N;i++){const x=px(i);const yy=i<12?y-110:y+110;const da=Math.abs(x-ax),db=Math.abs(x-bx);const useB=bIn>0&&db<da;const col=aIn<=0?'#9fb0c8':useB?'#ff5c6c':'#3aa0ff';useB?cb++:ca++;
      c.fillStyle=col;c.beginPath();c.arc(x,yy-36+Math.sin(t*3+i)*3,16,0,6.283);c.fill();AL.rrect(c,x-16,yy-18+Math.sin(t*3+i)*3,32,40,12);c.fill()}
    const shop=(x,col,lab,a)=>{if(a<=0)return;c.globalAlpha=a;c.fillStyle=col;AL.rrect(c,x-46,y-60,92,120,14);c.fill();c.fillStyle='#fff';c.fillRect(x-30,y-40,60,30);AL.text(c,lab,x,y+30,{size:34,color:'#fff'});c.globalAlpha=1};
    shop(ax,'#1f6fbf','A',aIn);shop(bx,'#d6272f','B',bIn);
    c.setTransform(1,0,0,1,0,0);
    if(bIn>0){AL.text(c,'A: '+ca,300,1140,{size:46,pill:true,color:'#7cc0ff'});AL.text(c,'B: '+cb,780,1140,{size:46,pill:true,color:'#ff8a96'})}
    const h=P(t,T(74),T(74)+0.4);if(h>0){c.globalAlpha=h;AL.text(c,'TEORI HOTELLING',540,560,{size:48,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    else{const a=P(t,T(37),T(37)+0.4);if(a>0){c.globalAlpha=a;AL.text(c,'PEMBELI TERSEBAR RATA',540,560,{size:38,pill:true});c.globalAlpha=1}}
    return}
  if(v==='untung'){AL.cam(c,540,860,1);street();
    const open=sm(P(t,T(91),T(93)));
    S26.store(c,40,1100,480,{col:'#1f6fbf',col2:'#ffd23f',name:'TOKO A',price:t>T(100)?'Rp3.500':'',cold:t>T(105)});
    S26.store(c,560,1100,480,{col:'#d6272f',col2:'#2ecc71',name:'TOKO B',closed:open<0.5,price:t>T(100)?'Rp3.200':''});
    // antrean ramai di toko A
    const q=P(t,T(84),T(85));for(let i=0;i<5;i++){if(q*5<i)break;S26.walker(c,t*0.2,140+i*70,1165,160,i+3,['#e05a3c','#3ddc84','#b18cff','#ff9f1c','#2ec4ff'][i])}
    if(t>T(97)){const x=AL.mix(540,540+Math.sin(t*1.5)*120,1);AL.person(c,x,1180,200,{shirt:'#ffd23f',shirt2:'#d4a92a',face:'senang'})}
    c.setTransform(1,0,0,1,0,0);
    const a=P(t,T(88),T(88)+0.4)*(1-P(t,T(97),T(97)+0.3));if(a>0){c.globalAlpha=a;AL.text(c,open>0.5?'✓ HEMAT RISET LOKASI':'✓ LOKASI TERBUKTI RAMAI',540,1140,{size:36,pill:true,color:'#3ddc84'});c.globalAlpha=1}
    const b=P(t,T(97),T(97)+0.4);if(b>0){c.globalAlpha=b;AL.text(c,'PEMBELI TINGGAL PILIH',540,1140,{size:38,pill:true,color:'#ffd23f'});c.globalAlpha=1}
    return}
};
