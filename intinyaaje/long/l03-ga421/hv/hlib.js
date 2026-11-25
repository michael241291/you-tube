// hlib.js — mesin horizontal 1920x1080 @intinyaaje (video panjang). Butuh WORDS, MAPD, lalu file bab memanggil sc(...).
const c=document.getElementById('c'),X=c.getContext('2d');const W=1920,H=1080;const F="'Poppins',sans-serif";
const WT=i=>WORDS[Math.max(0,Math.min(WORDS.length-1,i))][1], WE=i=>WORDS[Math.max(0,Math.min(WORDS.length-1,i))][2];
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const ease=v=>{v=clamp(v);return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2};
const back=v=>{v=clamp(v);const c1=1.7,c3=c1+1;return 1+c3*Math.pow(v-1,3)+c1*Math.pow(v-1,2)};
const MW=100000;function proj(lon,lat){const r=Math.PI/180;return [(lon+180)/360*MW,(1-Math.log(Math.tan(lat*r)+1/Math.cos(lat*r))/Math.PI)/2*MW]}
const MP=MAPD.map(d=>new Path2D(d));
const YEL='#ffd23f',RED='#ff4d4d',GRN='#5dff9a',BLU='#6cc8ff',SEA0='#0a1830',SEA1='#071122',LAND='#22324c',LANDS='#3a5070';
let END=WORDS[WORDS.length-1][2]+1.2;
// ---- cari kata
const NW=WORDS.map(w=>w[0].toLowerCase().replace(/[^a-z0-9]/g,''));let CUR=0;
function I(phrase,from){const p=phrase.toLowerCase().split(/\s+/).map(s=>s.replace(/[^a-z0-9]/g,'')).filter(Boolean);const st=from==null?CUR:from;
 for(let i=st;i<=NW.length-p.length;i++){let ok=true;for(let j=0;j<p.length;j++)if(NW[i+j]!==p[j]){ok=false;break}if(ok){if(from==null)CUR=i;return i}}
 throw new Error('frasa tidak ketemu: '+phrase)}
const T=(phrase)=>WT(I(phrase,0));   // waktu frasa (cari dari awal)
const TA=(phrase,after)=>WT(I(phrase,I(after,0)));
// ---- helpers gambar
function txt(s,x,y,size,col,{w=800,al='left',a=1,sh=true,ls=0,it=false}={}){if(a<=0)return;X.save();X.globalAlpha*=a;X.font=`${it?'italic ':''}${w} ${size}px ${F}`;X.textAlign=al;X.textBaseline='middle';if(ls)X.letterSpacing=ls+'px';
 if(sh){X.shadowColor='rgba(0,0,0,.6)';X.shadowBlur=18;X.shadowOffsetY=4}X.fillStyle=col;X.fillText(s,x,y);X.restore()}
function pill(s,x,y,size,bg,fg,a=1,al='center'){if(a<=0)return;X.save();X.globalAlpha*=a;X.font=`800 ${size}px ${F}`;const tw=X.measureText(s).width,pw=tw+size*1.1,ph=size*1.7;
 const x0=al==='center'?x-pw/2:al==='left'?x:x-pw;X.fillStyle=bg;X.beginPath();X.roundRect(x0,y-ph/2,pw,ph,ph/2);X.fill();X.fillStyle=fg;X.textAlign='center';X.textBaseline='middle';X.fillText(s,x0+pw/2,y+2);X.restore()}
const fin=(t,t0,d=.35)=>clamp((t-t0)/d);
function inout(t,t0,t1,f=.45){return clamp((t-t0)/f)*clamp((t1-t)/f)}
function bgDark(red=0){const g=X.createRadialGradient(W/2-200,H/2,100,W/2,H/2,1300);g.addColorStop(0,red?'#1d1424':'#14213a');g.addColorStop(1,'#070b14');X.fillStyle=g;X.fillRect(0,0,W,H)}
function drawMap(t,cam){const [cx,cy]=proj(cam[0],cam[1]);const s=W/(cam[2]/360*MW);
 X.save();const g=X.createRadialGradient(W/2,H/2,100,W/2,H/2,1200);g.addColorStop(0,SEA0);g.addColorStop(1,SEA1);X.fillStyle=g;X.fillRect(0,0,W,H);
 X.strokeStyle='rgba(120,170,255,.07)';X.lineWidth=1;for(let i=-2;i<14;i++){X.beginPath();X.moveTo(i*160+(t*6)%160,0);X.lineTo(i*160+(t*6)%160,H);X.stroke()}for(let j=0;j<8;j++){X.beginPath();X.moveTo(0,j*160);X.lineTo(W,j*160);X.stroke()}
 X.translate(W/2,H/2);X.scale(s,s);X.translate(-cx,-cy);X.fillStyle=LAND;X.strokeStyle=LANDS;X.lineWidth=2.2/s;X.lineJoin='round';for(const p of MP){X.fill(p);X.stroke(p)}
 X.restore();return (lon,lat)=>{const [x,y]=proj(lon,lat);return [W/2+(x-cx)*s,H/2+(y-cy)*s]}}
function plane(x,y,size,rot,col='#fff',eng=[1,1,1,1],glow=0,gcol=null){X.save();X.translate(x,y);X.rotate(rot);X.scale(size/100,size/100);
 X.fillStyle=col;X.shadowColor='rgba(0,0,0,.5)';X.shadowBlur=20;
 X.beginPath();X.ellipse(0,0,9,58,0,0,Math.PI*2);X.fill();X.beginPath();X.ellipse(0,-30,7.5,22,0,0,Math.PI*2);X.fill();
 X.beginPath();X.moveTo(-6,-12);X.lineTo(-62,22);X.lineTo(-62,30);X.lineTo(-6,10);X.lineTo(6,10);X.lineTo(62,30);X.lineTo(62,22);X.lineTo(6,-12);X.closePath();X.fill();
 X.beginPath();X.moveTo(-3,40);X.lineTo(-24,56);X.lineTo(-24,61);X.lineTo(0,54);X.lineTo(24,61);X.lineTo(24,56);X.lineTo(3,40);X.closePath();X.fill();X.shadowBlur=0;
 const ep=[[-44,17],[-24,6],[24,6],[44,17]];
 ep.forEach(([ex,ey],k)=>{const on=eng[k];X.fillStyle=on>=.5?col:'#555';X.beginPath();X.roundRect(ex-4.5,ey-9,9,20,4);X.fill();
  if(glow){const gc=gcol?gcol[k]:(on>=.5?'rgba(80,255,140,':'rgba(255,60,60,');const r=X.createRadialGradient(ex,ey,1,ex,ey,16);r.addColorStop(0,gc+(.9*glow)+')');r.addColorStop(1,gc+'0)');X.fillStyle=r;X.beginPath();X.arc(ex,ey,16,0,7);X.fill()}});
 X.restore()}
function sideplane(x,y,s,a=1,rot=0){X.save();X.globalAlpha*=a;X.translate(x,y);X.rotate(rot);X.scale(s,s);X.fillStyle='#e8eef8';
 X.beginPath();X.moveTo(-170,0);X.quadraticCurveTo(-180,-22,-140,-24);X.lineTo(120,-24);X.quadraticCurveTo(170,-22,175,0);X.quadraticCurveTo(170,18,120,20);X.lineTo(-150,20);X.closePath();X.fill();
 X.beginPath();X.moveTo(100,-22);X.quadraticCurveTo(118,-52,128,-40);X.lineTo(120,-22);X.fill();
 X.beginPath();X.moveTo(-150,-20);X.lineTo(-185,-90);X.lineTo(-160,-90);X.lineTo(-120,-22);X.fill();
 X.beginPath();X.moveTo(-20,6);X.lineTo(-80,48);X.lineTo(-60,50);X.lineTo(30,10);X.fill();
 X.fillStyle='#8a94a6';X.beginPath();X.roundRect(-40,26,40,14,7);X.fill();X.beginPath();X.roundRect(-75,40,36,12,6);X.fill();X.restore()}
function vign(a=.55){const g=X.createRadialGradient(W/2,H/2,300,W/2,H/2,1150);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);X.fillStyle=g;X.fillRect(0,0,W,H)}
function lowerThird(s,sub,t,t0,t1){const a=inout(t,t0,t1,.4);if(a<=0)return;const x=110,y=780;X.save();X.globalAlpha=a;X.fillStyle=YEL;X.fillRect(x,y-44,8,sub?118:70);X.restore();
 txt(s,x+34,y-8,54,'#fff',{a});if(sub)txt(sub,x+36,y+50,28,YEL,{w:700,a,ls:2})}
// kartu bab
function chapterCard(t,t0,num,title,dur=3.2){return;// bab tidak ditampilkan ke penonton (user 19 Nov)
const lt=t-t0;if(lt<0||lt>dur)return;const a=clamp(lt/.35)*clamp((dur-lt)/.45);X.save();X.globalAlpha=a*.86;X.fillStyle='#05070d';X.fillRect(0,0,W,H);X.restore();
 txt('BAB '+num,W/2,440,40,YEL,{al:'center',a,w:800,ls:10});txt(title,W/2,540,104,'#fff',{al:'center',a:a*fin(lt,.15,.4)});
 X.save();X.globalAlpha=a;X.fillStyle=YEL;const lw=420*ease(lt/0.8);X.fillRect(W/2-lw/2,630,lw,5);X.restore()}
// jam
function clockPill(s,t,t0,t1){pill(s,W-120,120,34,'rgba(10,14,22,.82)','#fff',inout(t,t0,t1,.35),'right')}
// altimeter besar
function altimeter(x,y,km,label='KETINGGIAN',a=1,col='#fff'){txt(label,x,y-70,30,'rgba(255,255,255,.7)',{w:700,ls:4,a});txt(km.toFixed(1).replace('.',',')+' km',x,y+10,120,col,{a})}
// radar
function radar(cx,cy,R,t,blips=[],a=1,label=''){X.save();X.globalAlpha*=a;X.fillStyle='#03140b';X.beginPath();X.arc(cx,cy,R,0,7);X.fill();X.strokeStyle='rgba(93,255,154,.35)';X.lineWidth=2;
 for(let k=1;k<=4;k++){X.beginPath();X.arc(cx,cy,R*k/4,0,7);X.stroke()}X.beginPath();X.moveTo(cx-R,cy);X.lineTo(cx+R,cy);X.moveTo(cx,cy-R);X.lineTo(cx,cy+R);X.stroke();
 const ang=t*2.2;const g=X.createConicGradient?X.createConicGradient(ang,cx,cy):null;if(g){g.addColorStop(0,'rgba(93,255,154,.55)');g.addColorStop(.12,'rgba(93,255,154,0)');g.addColorStop(1,'rgba(93,255,154,0)');X.fillStyle=g;X.beginPath();X.arc(cx,cy,R,0,7);X.fill()}
 blips.forEach(([bx,by,c])=>{X.fillStyle=c||GRN;X.beginPath();X.arc(cx+bx*R,cy+by*R,9,0,7);X.fill()});X.restore();if(label)txt(label,cx,cy+R+60,40,GRN,{al:'center',a,ls:4})}
// percikan di kaca (St Elmo)
function sparks(t,x0,y0,w,h,n,a=1,seed=1){X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const r=Math.sin(i*12.9898+seed)*43758.5453;const fx=r-Math.floor(r);const r2=Math.sin(i*78.233+seed)*12345.678;const fy=r2-Math.floor(r2);
 const ph=(t*1.7+fx*10)%1;const x=x0+fx*w+Math.sin(t*3+i)*30,y=y0+fy*h+(ph-.5)*80;const s=2.5+6*Math.sin(ph*Math.PI);const gr=X.createRadialGradient(x,y,0,x,y,s*3);gr.addColorStop(0,'rgba(200,230,255,.95)');gr.addColorStop(.3,'rgba(110,170,255,.6)');gr.addColorStop(1,'rgba(80,120,255,0)');X.fillStyle=gr;X.beginPath();X.arc(x,y,s*3,0,7);X.fill()}X.restore()}
// teks kutipan bertahap
function quote(lines,times,t,x=W/2,y0=330,size=58,dy=96){lines.forEach((s,k)=>{txt(s,x,y0+k*dy,size,k===lines.length-1?YEL:'#fff',{al:'center',a:fin(t,times[k]-.1,.4),it:true,w:700})})}

// ---- stiker wajah (ciri khas) di samping subtitle
const FACEN=['berpikir','bingung','dapat-ide','kaget','menunjuk','senang','setuju'];const FIMG={};
const facesReady=Promise.all(FACEN.map(n=>new Promise(r=>{const im=new Image();im.onload=()=>r();im.onerror=()=>r();im.src='../faces/'+n+'.png';FIMG[n]=im})));
function faceFor(k){const s=PH[k].map(i=>WORDS[i][0].toLowerCase()).join(' ');
 if(/subscribe|komentar|suka/.test(s))return 'setuju';
 if(/meninggal|pramugari|korban/.test(s))return 'berpikir';
 if(/selamat|berhasil|hidup lagi|kembali menyala|ikut hidup|reuni|tenang/.test(s))return 'senang';
 if(/\?/.test(s))return k%2?'bingung':'berpikir';
 if(/mati|jatuh|gagal|rusak|meninggal|batuk|buram|perpisahan|berteriak|tidak percaya|asap|belerang|mayday|darurat|masalah|menukik|tercekik|padam|turun|abu|gawat|silau|tergores|tidak bekerja|meletus|tersisa|berhenti/.test(s))return 'kaget';
 if(/^jadi|jawabannya|artinya|itu sebabnya|ternyata|justru|yang membuat|sayap/.test(s))return 'dapat-ide';
 if(/\d|kilometer|menit|ratus|belas|puluh|rekor|terpanjang/.test(s))return 'menunjuk';
 return k%2?'berpikir':'menunjuk'}
let FCACHE={},CAPX0=300;function faceSticker(t){let k=-1;for(let j=0;j<PH.length;j++){if(t>=WT(PH[j][0])-.12)k=j}if(k<0)return;
 // wajah berganti per kalimat (bukan per frasa) agar tidak terlalu cepat
 let k0=k;while(k0>0&&!/[.?!]$/.test(WORDS[PH[k0-1][PH[k0-1].length-1]][0]))k0--;
 const n=FCACHE[k0]||(FCACHE[k0]=faceFor(k0));const im=FIMG[n];if(!im||!im.complete)return;
 const lt=t-(WT(PH[k0][0])-.12);const sc=back(clamp(lt/.35))*(1+0.015*Math.sin(t*3));const S=130*sc;const x=Math.max(10,CAPX0-150),y=H-14;
 X.save();X.shadowColor='rgba(0,0,0,.5)';X.shadowBlur=18;X.drawImage(im,x+70-S/2,y-S,S,S);X.restore()}

// ---- adegan
const S=[];
function sc(t0,t1,kind,draw,opt={}){S.push({t0,t1:t1==null?END:t1,kind,draw:draw||(()=>{}),...opt})}
// subtitle
const PH=[];(()=>{let cur=[];WORDS.forEach((w,i)=>{cur.push(i);const end=/[.,?!:]$/.test(w[0]);if(end&&cur.length>=3||cur.length>=9||(end&&/[.?!:]$/.test(w[0]))){PH.push(cur);cur=[]}});if(cur.length)PH.push(cur)})();
function captions(t){let k=-1;for(let j=0;j<PH.length;j++){if(t>=WT(PH[j][0])-.12)k=j}if(k<0)return;const ph=PH[k];const tEnd=k+1<PH.length?WT(PH[k+1][0])-.12:WE(ph[ph.length-1])+.8;if(t>tEnd)return;
 const size=44;X.save();X.font=`800 ${size}px ${F}`;const ws=ph.map(i=>WORDS[i][0].replace(/[.,?!:]$/,''));const sp=X.measureText(' ').width;const wd=ws.map(s=>X.measureText(s).width);const tw=wd.reduce((a,b)=>a+b,0)+sp*(ws.length-1);
 const x0=W/2-tw/2,y=990;CAPX0=x0-28;X.fillStyle='rgba(8,10,16,.72)';X.beginPath();X.roundRect(x0-28,y-38,tw+56,76,20);X.fill();let x=x0;X.textBaseline='middle';
 ws.forEach((s,j)=>{const i=ph[j];X.fillStyle=t>=WT(i)-.05&&t<WE(i)+.15?YEL:(t>=WT(i)?'#fff':'rgba(255,255,255,.55)');X.fillText(s,x,y+2);x+=wd[j]+sp});X.restore()}
let OVER=[];// overlay di atas semua adegan: fungsi(t)
window.SCENES=()=>S.map(s=>({t0:s.t0,t1:s.t1,kind:s.kind,clip:s.clip||null,off:s.off||0,grade:s.grade||'',y:s.y==null?.5:s.y}));
window.render=t=>{X.clearRect(0,0,W,H);
 for(const s of S){if(t<s.t0-.5||t>s.t1+.5)continue;const lt=t-s.t0;if(s.kind==='anim'){const a=clamp((t-s.t0+.25)/.5)*clamp((s.t1+.25-t)/.5);if(a<=0)continue;X.save();X.globalAlpha=a;s.draw(t,lt,s);X.restore()}else{if(t>=s.t0-.2&&t<s.t1+.2){X.save();s.draw(t,lt,s);X.restore()}}}
 OVER.forEach(f=>{X.save();f(t);X.restore()});
 txt('@intinyaaje',60,60,26,'rgba(255,255,255,.75)',{w:700});captions(t);if(t>0.4)faceSticker(t);
 const fs=window.FADEIN?clamp(1-t/0.6):0;if(fs>0){X.fillStyle=`rgba(0,0,0,${fs})`;X.fillRect(0,0,W,H)}
 const ef=window.FADEOUT===false?0:clamp((t-(END-0.8))/0.8);if(ef>0){X.fillStyle=`rgba(0,0,0,${ef})`;X.fillRect(0,0,W,H)}};
window.assetsReady=facesReady.then(()=>document.fonts.load(`800 40px Poppins`).then(()=>document.fonts.load(`700 40px Poppins`)).then(()=>document.fonts.load(`italic 700 40px Poppins`)));

function profile(t,opt){// grafik ketinggian vs jarak
 const x0=200,x1=1720,y0=180,y1=820,km2y=km=>y1-(y1-y0)*km/11.5,d2x=d=>x0+(x1-x0)*d/180;
 X.strokeStyle='rgba(255,255,255,.18)';X.lineWidth=2;for(let k=0;k<=11;k++){if(k%2&&k!==11)continue;X.beginPath();X.moveTo(x0,km2y(k));X.lineTo(x1,km2y(k));X.stroke();txt(k+' km',x0-20,km2y(k),24,'rgba(255,255,255,.55)',{al:'right',w:600,sh:false})}
 X.fillStyle='#0f1a2c';X.fillRect(x0,y1,x1-x0,16);
 return {km2y,d2x,x0,x1,y0,y1}}
function windshield(t,amt){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,'#050a18');g.addColorStop(1,'#0c1830');X.fillStyle=g;X.fillRect(0,0,W,H);
 for(let i=0;i<70;i++){const r=Math.sin(i*91.7)*1000,fx=r-Math.floor(r),r2=Math.sin(i*37.1)*1000,fy=r2-Math.floor(r2);X.fillStyle='rgba(255,255,255,.5)';X.fillRect(fx*W,fy*560,2,2)}
 sparks(t,180,120,1560,520,Math.round(42*amt),1,3);
 X.save();X.fillStyle='#030407';X.beginPath();X.rect(0,0,W,H);
 X.moveTo(150,150);X.lineTo(900,110);X.lineTo(920,640);X.lineTo(210,700);X.closePath();X.moveTo(1770,150);X.lineTo(1020,110);X.lineTo(1000,640);X.lineTo(1710,700);X.closePath();X.fill('evenodd');
 X.fillStyle='#0b0e16';X.fillRect(0,720,W,360);X.restore()}
