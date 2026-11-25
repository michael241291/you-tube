// Kit Shorts 3D @intinyaaje (three.js + overlay 2D). Dipakai oleh page.html?ep=<folder episode relatif ke intinyaaje/>
// Episode menulis scene.js: export default async function(K){ ...; return {scenes, card:[baris1,baris2,baris3], clips?} }
import * as THREE from 'three';import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';
export async function makeKit(EP,WORDS,opt={}){
 const W=1080,H=1920;
 const R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true,alpha:true});R.setSize(W,H);R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.localClippingEnabled=true;R.setClearColor(0x000000,0);
 R.domElement.style.zIndex=1;document.body.insertBefore(R.domElement,document.body.firstChild);
 const S=new THREE.Scene();S.background=new THREE.Color(opt.bg||'#d9c7a6');
 const cam=new THREE.PerspectiveCamera(40,W/H,0.02,400);
 const env=await new RGBELoader().loadAsync('/engine3d/studio.hdr');env.mapping=THREE.EquirectangularReflectionMapping;S.environment=env;
 const sun=new THREE.DirectionalLight('#fff4e0',2.4);sun.position.set(1.2,2.6,1.6);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-1,right:1,top:1,bottom:-1,near:0.1,far:8});sun.shadow.bias=-0.0005;S.add(sun);
 const lerp=(a,b,k)=>a+(b-a)*k,cl=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),ez=v=>{v=cl(v);return v<.5?2*v*v:1-Math.pow(-2*v+2,2)/2};
 const L3=(a,b,k)=>a.map((v,i)=>lerp(v,b[i],k));
 const WT=i=>WORDS[Math.min(i,WORDS.length-1)][1];
 // cari indeks kata pertama dari frasa (huruf kecil, tanpa tanda baca), mulai dari indeks 'from'
 const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
 const I=(phrase,from=0)=>{const p=phrase.split(/\s+/).map(norm);for(let i=from;i<=WORDS.length-p.length;i++){if(p.every((w,j)=>norm(WORDS[i+j][0])===w))return i}throw new Error('frasa tidak ketemu: '+phrase)};
 const T=(phrase,from=0)=>WT(I(phrase,from));
 const all=[];const add=o=>{S.add(o);all.push(o);return o};
 const show=(...objs)=>all.forEach(o=>o.visible=objs.includes(o));
 const look=(p,t,f=1.75)=>{cam.position.set(t[0]+(p[0]-t[0])*f,t[1]+(p[1]-t[1])*f,t[2]+(p[2]-t[2])*f);cam.lookAt(...t)};
 const rnd=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
 // ---- overlay
 const oc=document.getElementById('o'),X=oc.getContext('2d');const F="'Poppins',sans-serif";const C={YEL:'#ffd23f',RED:'#ff4d4d',GRN:'#3ddc84',BLU:'#4fb3ff',DARK:'rgba(10,14,22,.85)'};
 const IMG={};const loadImg=(n,src)=>{const im=new Image();im.src=src;IMG[n]=im;return im};
 const FACEN=['berpikir','bingung','dapat-ide','kaget','menunjuk','senang','setuju'];const FIMG={};for(const n of FACEN)FIMG[n]=loadImg('face_'+n,'/engine3d/faces/'+n+'.png');
 const fin=(t,t0,d=.3)=>cl((t-t0)/d);
 function txt(s,x,y,size,col,{w=800,al='center',a=1,sh=true}={}){if(a<=0)return;X.save();X.globalAlpha=a;X.font=`${w} ${size}px ${F}`;X.textAlign=al;X.textBaseline='middle';if(sh){X.shadowColor='rgba(0,0,0,.55)';X.shadowBlur=16;X.shadowOffsetY=3}X.fillStyle=col;X.fillText(s,x,y);X.restore()}
 function pill(s,x,y,size,bg,fg,a=1){if(a<=0)return;X.save();X.globalAlpha=a;X.font=`800 ${size}px ${F}`;const tw=X.measureText(s).width,pw=tw+size*1.2,ph=size*1.75;X.shadowColor='rgba(0,0,0,.35)';X.shadowBlur=14;X.fillStyle=bg;X.beginPath();X.roundRect(x-pw/2,y-ph/2,pw,ph,ph/2);X.fill();X.shadowBlur=0;X.fillStyle=fg;X.textAlign='center';X.textBaseline='middle';X.fillText(s,x,y+2);X.restore()}
 function photo(n,t,t0,t1,{dir=1,dark=true}={}){const im=IMG[n];if(!im||!im.complete)return;const k=(t-t0)/(t1-t0);const sc=1.08+0.08*k;const ih=H*sc,iw=Math.max(ih*im.width/im.height,W*sc);const ih2=iw*im.height/im.width;X.drawImage(im,(W-iw)/2-40*k*dir,(H-ih2)/2,iw,ih2);if(dark)vign()}
 function vign(){const gr=X.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(0,0,0,.35)');gr.addColorStop(.4,'rgba(0,0,0,0)');gr.addColorStop(.75,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(0,0,0,.45)');X.fillStyle=gr;X.fillRect(0,0,W,H)}
 // subtitle: maks 4 kata, y 1356 (di atas UI bawah YouTube)
 const PH=[];(()=>{let c=[];WORDS.forEach((w,i)=>{c.push(i);const e=/[.,?!]$/.test(w[0]);if(e||c.length>=4){PH.push(c);c=[]}});if(c.length)PH.push(c)})();
 let CAPX0=300;const CAPY=1356;
 function captions(t){let k=-1;for(let j=0;j<PH.length;j++)if(t>=WT(PH[j][0])-.1)k=j;if(k<0)return -1;const ph=PH[k];const tEnd=k+1<PH.length?WT(PH[k+1][0])-.1:WORDS[ph[ph.length-1]][2]+.7;if(t>tEnd)return -1;
  X.save();X.font=`800 40px ${F}`;const ws=ph.map(i=>WORDS[i][0].replace(/[.,?!]$/,''));const sp=X.measureText(' ').width;const wd=ws.map(s=>X.measureText(s).width);const tw=wd.reduce((a,b)=>a+b,0)+sp*(ws.length-1);
  const x0=W/2+60-tw/2;CAPX0=x0-26;X.fillStyle='rgba(10,12,18,.78)';X.beginPath();X.roundRect(x0-22,CAPY-33,tw+44,66,18);X.fill();let x=x0;X.textBaseline='middle';
  ws.forEach((s,j)=>{const i=ph[j];X.fillStyle=t>=WT(i)-.05&&t<WORDS[i][2]+.12?C.YEL:(t>=WT(i)?'#fff':'rgba(255,255,255,.55)');X.fillText(s,x,CAPY+2);x+=wd[j]+sp});X.restore();return k}
 let faceRules=[[/\?|siapa yang bener/,'bingung'],[/^jadi|^nah|ternyata|solusinya|intinya/,'dapat-ide'],[/mitos|bukan|nggak|masalahnya/,'kaget']];
 function faceFor(k){const s=PH[k].map(i=>WORDS[i][0].toLowerCase()).join(' ');for(const [re,n] of faceRules)if(re.test(s))return n;return k%3==0?'menunjuk':(k%3==1?'berpikir':'senang')}
 const FC={};function face(t,k){if(k<0)return;let k0=k;while(k0>0&&!/[.?!]$/.test(WORDS[PH[k0-1][PH[k0-1].length-1]][0]))k0--;const n=FC[k0]||(FC[k0]=faceFor(k0));const im=FIMG[n];if(!im.complete)return;
  const lt=t-(WT(PH[k0][0])-.1);const v=cl(lt/.3);const sc=(1+0.7*Math.pow(1-v,2)*(v<1?1:0))*(v>0?1:0);const s=118*Math.min(1,sc);X.drawImage(im,Math.max(8,CAPX0-126),CAPY-s/2-4,s,s)}
 // kartu INTINYA: tengah atas, di bawah zona UI atas (y>=350)
 function card(lines,t,t0){const a=fin(t,t0,.35);if(a<=0)return false;X.save();X.globalAlpha=a*.9;X.fillStyle='#0d1018';X.beginPath();X.roundRect(150,350,780,270,32);X.fill();X.restore();
  pill('INTINYA',W/2,392,26,C.YEL,'#111',a);const ys=[458,515,580],sz=[42,38,48];lines.forEach((s,i)=>{let size=sz[i];X.save();X.font=`800 ${size}px ${F}`;while(X.measureText(s).width>720&&size>26){size-=2;X.font=`800 ${size}px ${F}`}X.restore();txt(s,W/2,ys[i],size,i==2?C.YEL:'#fff',{a:a*fin(t,t0+.3+.6*i)})});return true}
 return {THREE,R,S,cam,sun,W,H,X,C,F,lerp,cl,ez,L3,WT,I,T,add,all,show,look,rnd,fin,txt,pill,photo,vign,captions,face,card,loadImg,IMG,setFaceRules:r=>faceRules=r.concat(faceRules),EP,WORDS};
}
