// e41 Bulan muncul siang hari, aneh? — 3D matahari-bumi-bulan + foto Pixabay
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p2358658','p4867822','p3419609','p559641'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#070b18');S.environment=null;sun.castShadow=false;sun.intensity=3.2;
 S.add(new THREE.AmbientLight('#3a4a7a',0.5));
 // bintang latar
 const sg=new THREE.BufferGeometry();const sp=[];for(let i=0;i<1500;i++){const a=rnd(i)*6.283,b=Math.acos(2*rnd(i+9)-1),r=60;sp.push(r*Math.sin(b)*Math.cos(a),r*Math.cos(b),r*Math.sin(b)*Math.sin(a))}sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));S.add(new THREE.Points(sg,new THREE.PointsMaterial({color:'#ffffff',size:0.12})));
 // tekstur bumi sederhana
 const ec=document.createElement('canvas');ec.width=1024;ec.height=512;const e=ec.getContext('2d');e.fillStyle='#1f5fa8';e.fillRect(0,0,1024,512);e.fillStyle='#3f9a4e';
 for(let i=0;i<26;i++){const x=rnd(i)*1024,y=120+rnd(i+3)*280,r=30+rnd(i+5)*70;e.beginPath();e.ellipse(x,y,r*1.4,r,rnd(i+7)*3,0,7);e.fill()}
 e.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<40;i++){e.beginPath();e.ellipse(rnd(i+20)*1024,rnd(i+30)*512,40+rnd(i+40)*60,8,0,0,7);e.fill()}
 const et=new THREE.CanvasTexture(ec);et.colorSpace=THREE.SRGBColorSpace;
 const mc=document.createElement('canvas');mc.width=512;mc.height=256;const m=mc.getContext('2d');m.fillStyle='#b9b6ad';m.fillRect(0,0,512,256);for(let i=0;i<120;i++){m.fillStyle=`rgba(80,78,72,${.15+rnd(i)*.25})`;m.beginPath();m.arc(rnd(i+1)*512,rnd(i+2)*256,3+rnd(i+3)*16,0,7);m.fill()}
 const mt=new THREE.CanvasTexture(mc);mt.colorSpace=THREE.SRGBColorSpace;
 const earth=add(new THREE.Mesh(new THREE.SphereGeometry(1,64,32),new THREE.MeshStandardMaterial({map:et,roughness:.8})));
 const atm=new THREE.Mesh(new THREE.SphereGeometry(1.04,64,32),new THREE.MeshBasicMaterial({color:'#6fb4ff',transparent:true,opacity:.12}));earth.add(atm);
 const moon=add(new THREE.Mesh(new THREE.SphereGeometry(0.27,48,24),new THREE.MeshStandardMaterial({map:mt,roughness:.95})));
 const sunBall=add(new THREE.Mesh(new THREE.SphereGeometry(1.6,48,24),new THREE.MeshBasicMaterial({color:'#ffd23f'})));
 const glow=new THREE.Mesh(new THREE.SphereGeometry(2.1,32,16),new THREE.MeshBasicMaterial({color:'#ffb703',transparent:true,opacity:.18}));sunBall.add(glow);
 const ring=add(new THREE.Mesh(new THREE.TorusGeometry(4,0.012,8,200),new THREE.MeshBasicMaterial({color:'#7f8fb8',transparent:true,opacity:.6})));ring.rotation.x=Math.PI/2;
 // orang kecil di bumi + garis pandang
 const person=new THREE.Group();const pm=new THREE.MeshStandardMaterial({color:'#ffd23f',emissive:'#ffd23f',emissiveIntensity:.4});const pb=new THREE.Mesh(new THREE.CapsuleGeometry(0.035,0.08,4,8),pm);pb.position.y=0.07;person.add(pb);const ph=new THREE.Mesh(new THREE.SphereGeometry(0.035,12,8),pm);ph.position.y=0.17;person.add(ph);person.position.set(0,1.0,0);earth.add(person);
 const lineM=c=>new THREE.LineBasicMaterial({color:c});const lineSun=add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),lineM('#ffd23f')));const lineMoon=add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]),lineM('#ffffff')));
 const horizon=new THREE.Mesh(new THREE.CircleGeometry(0.55,48),new THREE.MeshBasicMaterial({color:'#3ddc84',transparent:true,opacity:.35,side:THREE.DoubleSide}));horizon.rotation.x=-Math.PI/2;horizon.position.y=1.005;earth.add(horizon);
 // sinar matahari -> bulan -> bumi
 const rays=[];for(let i=0;i<6;i++){const r=add(new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,1,6),new THREE.MeshBasicMaterial({color:i<3?'#ffd23f':'#ffffff',transparent:true,opacity:.85})));rays.push(r)}
 const V=(x,y,z)=>new THREE.Vector3(x,y,z);
 function setRay(r,a,b){const d=new THREE.Vector3().subVectors(b,a);r.position.copy(a).addScaledVector(d,.5);r.scale.set(1,Math.max(1e-3,d.length()),1);r.quaternion.setFromUnitVectors(V(0,1,0),d.clone().normalize())}
 const SUNP=V(-14,0,0);sunBall.position.copy(SUNP);sun.position.copy(SUNP);sun.target.position.set(0,0,0);S.add(sun.target);
 const moonAt=a=>{moon.position.set(4*Math.cos(a),0,-4*Math.sin(a));moon.rotation.y=-a};
 const setLine=(l,a,b)=>{l.geometry.setFromPoints([a,b])};
 const tKata=T('kata orang'),tYang=T('kata yang lain'),tSiapa=T('siapa yang bener'),tBulan=T('bulan nggak punya'),tSering=T('sering banget'),tJuga=T('bulan juga'),tKarena=T('dan karena'),tBintang=T('bintang juga'),tPaling=T('paling gampang'),tRata=T('rata-rata'),tJadi=WT(I('jadi bulan'));
 const sys=(t,a,camP,camT,f=1)=>{show(earth,moon,sunBall,ring);person.visible=horizon.visible=false;earth.rotation.set(0,t*0.2,0);moonAt(a);look(camP,camT,f)};
 const scenes=[
  {t0:0,photo:'p2358658',ov:t=>pill('SIANG BOLONG, ADA BULAN?',W/2,520,34,C.DARK,'#fff',fin(t,.4))},
  {t0:tKata,d3:(t,lt)=>sys(t,Math.PI*0.75+lt*0.05,[2,4.5,9],[-1,0,0],1.2),ov:t=>pill('KATA ORANG: CUMA KELUAR MALAM',W/2,520,30,C.DARK,'#fff',fin(t,tKata))},
  {t0:tYang,photo:'p4867822',ov:t=>pill('KATA LAINNYA: PANTULAN DI AWAN',W/2,520,30,C.DARK,'#fff',fin(t,tYang))},
  {t0:tSiapa,d3:(t,lt)=>sys(t,Math.PI*0.5,[1.5,1.2,6],[0.5,0,-2],1.25),ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tBulan,d3:(t,lt)=>sys(t,Math.PI*0.2+lt*0.32,[0,9,6],[-1.5,0,0],1.25),ov:t=>{pill('BULAN NGGAK PUNYA JADWAL MALAM',W/2,520,28,C.DARK,'#fff',fin(t,tBulan));if(t>T('mengelilingi')-.2)pill('1 PUTARAN ≈ 1 BULAN',W/2,610,32,C.YEL,'#111',fin(t,T('mengelilingi')-.2))}},
  {t0:tSering,d3:(t,lt)=>{show(earth,moon,sunBall,lineSun,lineMoon);person.visible=horizon.visible=true;earth.quaternion.setFromUnitVectors(V(0,1,0),V(-0.72,0,-0.69).normalize());moonAt(Math.PI*0.6);
    const pw=person.getWorldPosition(V(0,0,0));setLine(lineSun,pw,pw.clone().lerp(SUNP,ez((lt-0.5)/1)*0.5));setLine(lineMoon,pw,pw.clone().lerp(moon.position,ez((lt-0.9)/1)));look([-1.2,8.5,0.8],[-1.3,0,-1.6],lerp(1.15,1.0,ez(lt/4)))},
   ov:t=>{pill('DUA-DUANYA DI ATAS CAKRAWALA',W/2,520,30,C.GRN,'#06210f',fin(t,tSering+.4));pill('← MATAHARI',190,1180,26,C.YEL,'#111',fin(t,tSering+1));pill('BULAN',790,380,26,'#fff','#111',fin(t,tSering+1.4));pill('KAMU',560,1110,24,C.DARK,'#fff',fin(t,tSering+.6))}},
  {t0:tJuga,d3:(t,lt)=>{show(earth,moon,sunBall,...rays);person.visible=horizon.visible=false;earth.rotation.set(0,t*0.2,0);moonAt(Math.PI*0.6);const mp=moon.position.clone();
    rays.forEach((r,i)=>{const off=V(0,(i%3-1)*0.12,(i%3-1)*0.1);if(i<3){const a=SUNP.clone().add(off.clone().multiplyScalar(6)),b=mp.clone().add(V(-0.25,0,0)).add(off);const p=ez((lt-0.3-i*.1)/1.0);setRay(r,a,a.clone().lerp(b,p))}else{const a=mp.clone().add(off),b=V(0,0,0).add(off.clone().multiplyScalar(3));const p=ez((t-T('memantulkan')-.2-(i-3)*.1)/1.0);r.visible=p>0;setRay(r,a,a.clone().lerp(b,p))}});
    look([-2,3,6.5],[-1.5,0,-1.5],1.3)},ov:t=>{pill('NGGAK BERSINAR SENDIRI',W/2,520,32,C.DARK,'#fff',fin(t,tJuga+.3));if(t>T('memantulkan')-.2)pill('MEMANTULKAN SINAR MATAHARI',W/2,610,30,C.YEL,'#111',fin(t,T('memantulkan')-.2))}},
  {t0:tKarena,photo:'p3419609',ov:t=>pill('DEKAT = CUKUP TERANG',W/2,520,34,C.YEL,'#111',fin(t,tKarena+.3))},
  {t0:tBintang,photo:'p559641',ov:t=>{pill('BINTANG ADA SIANG HARI',W/2,520,32,C.DARK,'#fff',fin(t,tBintang));if(t>T('terlalu redup')-.2)pill('TAPI TERLALU REDUP',W/2,610,32,C.RED,'#fff',fin(t,T('terlalu redup')-.2))}},
  {t0:tPaling,d3:(t,lt)=>sys(t,lerp(0.0,Math.PI/2,ez((lt-0.5)/2.5)),[0,9,5],[-1.5,0,-1],1.25),ov:(t,lt)=>{pill('PALING GAMPANG: SORE HARI',W/2,520,30,C.YEL,'#111',fin(t,tPaling+.3));if(t>T('seminggu')-.2)pill('±7 HARI SETELAH BULAN BARU',W/2,610,28,C.DARK,'#fff',fin(t,T('seminggu')-.2))}},
  {t0:tRata,d3:(t,lt)=>sys(t,Math.PI/2+lt*0.1,[0,9,5],[-1.5,0,-1],1.25),ov:(t,lt)=>{txt('BULAN TERLIHAT SIANG',W/2,500,34,'#fff',{a:fin(t,tRata)});
    const k=Math.floor(cl((t-T('dua puluh')+0.3)/1.8)*25);for(let i=0;i<30;i++){const x=200+(i%6)*136,y=580+Math.floor(i/6)*78;X.save();X.globalAlpha=fin(t,tRata+.2);X.fillStyle=i<k?C.YEL:'rgba(255,255,255,.18)';X.beginPath();X.roundRect(x-52,y-30,104,60,12);X.fill();X.fillStyle=i<k?'#111':'rgba(255,255,255,.6)';X.font="800 26px Poppins";X.textAlign='center';X.textBaseline='middle';X.fillText(String(i+1),x,y+2);X.restore()}
    txt(`${Math.max(0,k)} DARI 30 HARI`,W/2,1010,44,C.YEL,{a:fin(t,T('dua puluh')-.2)})}},
  {t0:tJadi,photo:'p2358658',noShift:true}
 ];
 return {scenes,cardAt:tJadi-.2,card:['BULAN SIANG ITU NORMAL','BUKAN PERTANDA ANEH','BUKAN PANTULAN AWAN'],clips:[]};
}
