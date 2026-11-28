// e45 Tabung elpiji isinya gas, kok digoyang bunyi air? — tabung melon terbelah: cairan + ruang uap, uap ke kompor, mendidih, embun
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p3814281','p4763200'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#e6dfd3');
 Object.assign(sun.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:0.5,far:12});sun.position.set(1.5,4,3);
 // lantai dapur
 const fc=document.createElement('canvas');fc.width=fc.height=512;const f=fc.getContext('2d');f.fillStyle='#cfc6b8';f.fillRect(0,0,512,512);f.strokeStyle='#b3a999';f.lineWidth=5;for(let i=0;i<=4;i++){f.beginPath();f.moveTo(i*128,0);f.lineTo(i*128,512);f.stroke();f.beginPath();f.moveTo(0,i*128);f.lineTo(512,i*128);f.stroke()}
 const ft=new THREE.CanvasTexture(fc);ft.wrapS=ft.wrapT=THREE.RepeatWrapping;ft.repeat.set(4,4);ft.colorSpace=THREE.SRGBColorSpace;
 const floor=add(new THREE.Mesh(new THREE.PlaneGeometry(10,10),new THREE.MeshStandardMaterial({map:ft,roughness:.55})));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;
 // tabung melon (profil lathe)
 const prof=[[0,0],[0.2,0],[0.26,0.03],[0.3,0.12],[0.32,0.28],[0.3,0.44],[0.25,0.54],[0.14,0.6],[0.07,0.62],[0,0.62]].map(p=>new THREE.Vector2(p[0],p[1]));
 const shellM=new THREE.MeshPhysicalMaterial({color:'#3f9b4a',roughness:.35,clearcoat:.8,side:THREE.DoubleSide,clippingPlanes:[]});
 const tank=add(new THREE.Group());const shell=new THREE.Mesh(new THREE.LatheGeometry(prof,64),shellM);shell.castShadow=true;tank.add(shell);const innerM=new THREE.MeshStandardMaterial({color:'#1f4f25',side:THREE.BackSide});const inner=new THREE.Mesh(new THREE.LatheGeometry(prof,64),innerM);inner.scale.setScalar(0.985);tank.add(inner);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.025,10,40),new THREE.MeshStandardMaterial({color:'#3f9b4a'}));ring.rotation.x=Math.PI/2;ring.position.y=0.005;tank.add(ring);
 const handle=new THREE.Mesh(new THREE.TorusGeometry(0.12,0.02,10,40,Math.PI),new THREE.MeshStandardMaterial({color:'#3f9b4a',roughness:.4}));handle.position.y=0.66;tank.add(handle);
 const valve=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.04,0.08,20),new THREE.MeshStandardMaterial({color:'#c9a227',metalness:.8,roughness:.3}));valve.position.y=0.65;tank.add(valve);
 // potongan (clip) untuk melihat isi
 const CLIP=new THREE.Plane(new THREE.Vector3(0,0,-1),10);shellM.clippingPlanes=[CLIP];shellM.side=THREE.FrontSide;shellM.needsUpdate=true;innerM.clippingPlanes=[CLIP];innerM.needsUpdate=true;
 const capM=new THREE.MeshStandardMaterial({color:'#2d6f35',side:THREE.DoubleSide});
 // cairan: silinder yang dipotong permukaan (pakai lathe isi bawah)
 const liqM=new THREE.MeshPhysicalMaterial({color:'#5fb8ff',transparent:true,opacity:.92,emissive:'#1d6fd1',emissiveIntensity:.35,roughness:.1,side:THREE.DoubleSide,clippingPlanes:[CLIP]});
 const liquid=new THREE.Group();tank.add(liquid);let liqMesh=null;
 function setLevel(h,tilt=0){if(liqMesh){liquid.remove(liqMesh);liqMesh.geometry.dispose()}const pts=prof.filter(p=>p.y<=h).map(p=>new THREE.Vector2(Math.max(0,p.x-0.012),p.y));const rAt=y=>{for(let i=1;i<prof.length;i++)if(prof[i].y>=y){const a=prof[i-1],b=prof[i];return a.x+(b.x-a.x)*(y-a.y)/Math.max(1e-6,b.y-a.y)}return 0};pts.push(new THREE.Vector2(rAt(h)-0.012,h),new THREE.Vector2(0,h));
  liqMesh=new THREE.Mesh(new THREE.LatheGeometry(pts,64),liqM);liquid.add(liqMesh);liquid.rotation.z=0;surf.position.y=h;surf.scale.setScalar(Math.max(0.01,rAt(h)/0.3));surf.rotation.z=tilt}
 const surf=new THREE.Mesh(new THREE.CircleGeometry(0.3,48),new THREE.MeshPhysicalMaterial({color:'#cbeaff',transparent:true,opacity:.85,side:THREE.DoubleSide,clippingPlanes:[CLIP]}));surf.rotation.x=-Math.PI/2;const surfG=new THREE.Group();surfG.add(surf);tank.add(surfG);
 // uap: partikel di ruang atas
 const vap=new THREE.InstancedMesh(new THREE.SphereGeometry(0.012,8,6),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.8}),90);tank.add(vap);
 const bub=new THREE.InstancedMesh(new THREE.SphereGeometry(0.01,8,6),new THREE.MeshBasicMaterial({color:'#ffffff'}),50);tank.add(bub);
 const dew=new THREE.InstancedMesh(new THREE.SphereGeometry(0.012,8,6),new THREE.MeshPhysicalMaterial({color:'#ffffff',roughness:.05,transparent:true,opacity:.85}),200);tank.add(dew);
 const o=new THREE.Object3D();
 function particles(t,h,{vapOut=0,boil=0,dewK=0}){for(let i=0;i<90;i++){const ph=(t*0.4+rnd(i))%1;const a=rnd(i+1)*6.28,r=rnd(i+2)*0.22;let y=h+0.02+rnd(i+3)*(0.58-h);let x=r*Math.cos(a+t),z=r*Math.sin(a+t);if(vapOut>0&&i%3==0){y=lerp(h+0.05,0.75,ph);x*=1-ph;z*=1-ph}o.position.set(x,y,z);o.scale.setScalar(h<0.56?1:0);o.updateMatrix();vap.setMatrixAt(i,o.matrix)}vap.instanceMatrix.needsUpdate=true;
  for(let i=0;i<50;i++){const ph=(t*0.8+rnd(i+9))%1;o.position.set((rnd(i+4)-.5)*0.4,lerp(0.03,h,ph),(rnd(i+5)-.5)*0.4);o.scale.setScalar(boil*(0.6+rnd(i)));o.updateMatrix();bub.setMatrixAt(i,o.matrix)}bub.instanceMatrix.needsUpdate=true;
  for(let i=0;i<200;i++){const y=rnd(i+11)*h*0.95+0.02;const a=rnd(i+12)*6.28;const r=(()=>{for(let k=1;k<prof.length;k++)if(prof[k].y>=y){const A=prof[k-1],B=prof[k];return A.x+(B.x-A.x)*(y-A.y)/Math.max(1e-6,B.y-A.y)}return 0.3})()+0.006;o.position.set(r*Math.cos(a),y,r*Math.sin(a));o.scale.setScalar(cl(dewK*1.4-rnd(i+13)*0.5));o.updateMatrix();dew.setMatrixAt(i,o.matrix)}dew.instanceMatrix.needsUpdate=true}
 // selang + kompor
 const stove=add(new THREE.Group());const body=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.12,0.5),new THREE.MeshStandardMaterial({color:'#20242b',metalness:.5,roughness:.35}));body.position.y=0.06;stove.add(body);
 const burner=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.12,0.05,32),new THREE.MeshStandardMaterial({color:'#555',metalness:.7,roughness:.3}));burner.position.set(0.2,0.14,0);stove.add(burner);
 const flames=[];for(let i=0;i<12;i++){const fl=new THREE.Mesh(new THREE.ConeGeometry(0.018,0.09,8),new THREE.MeshBasicMaterial({color:'#4aa8ff',transparent:true,opacity:.85}));const a=i/12*6.28;fl.position.set(0.2+0.09*Math.cos(a),0.2,0.09*Math.sin(a));stove.add(fl);flames.push(fl)}
 stove.position.set(1.0,0.35,0);const table=add(new THREE.Mesh(new THREE.BoxGeometry(1.2,0.35,0.7),new THREE.MeshStandardMaterial({color:'#9c6b3f',roughness:.6})));table.position.set(1.0,0.175,0);
 const hosePts=[new THREE.Vector3(0,0.72,0),new THREE.Vector3(0.15,0.85,0),new THREE.Vector3(0.45,0.5,0.15),new THREE.Vector3(0.7,0.42,0.1)];const hose=add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hosePts),40,0.015,8),new THREE.MeshStandardMaterial({color:'#e0e0e0',roughness:.5})));
 const hoseDots=add(new THREE.InstancedMesh(new THREE.SphereGeometry(0.014,8,6),new THREE.MeshBasicMaterial({color:'#ffffff'}),12));const hc=new THREE.CatmullRomCurve3(hosePts);
 // pabrik: molekul gas dipadatkan
 const mol=add(new THREE.InstancedMesh(new THREE.SphereGeometry(0.03,12,8),new THREE.MeshStandardMaterial({color:'#7fc4ff',roughness:.3}),120));
 const piston=add(new THREE.Mesh(new THREE.BoxGeometry(0.62,0.06,0.62),new THREE.MeshStandardMaterial({color:'#8a939f',metalness:.7,roughness:.3})));
 const box=add(new THREE.Mesh(new THREE.BoxGeometry(0.64,1.0,0.64),new THREE.MeshPhysicalMaterial({color:'#ffffff',transparent:true,opacity:.12,roughness:.05,side:THREE.DoubleSide,depthWrite:false})));
 function factory(k){box.position.set(0,0.5,0);piston.position.set(0,lerp(0.98,0.2,k),0);for(let i=0;i<120;i++){const top=lerp(0.95,0.17,k);
  const gx=((i%8)-3.5)*0.066,gz=((Math.floor(i/8)%8)-3.5)*0.066,gy=0.035+Math.floor(i/64)*0.066;
  o.position.set(lerp((rnd(i)-.5)*0.55,gx,k),lerp(0.05+rnd(i+1)*(0.9),gy,k),lerp((rnd(i+2)-.5)*0.55,gz,k));o.scale.setScalar(1);o.updateMatrix();mol.setMatrixAt(i,o.matrix)}mol.instanceMatrix.needsUpdate=true}
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tElp=T('elpiji itu campuran'),tWaktuDiisi=T('waktu diisi'),tJadi1=T('jadi di dalam tabung'),tKompor=T('waktu kompor'),tCair=T('cairannya lalu'),tProses=T('proses ini'),tHabis=T('kalau tabung hampir'),tJadi=WT(I('jadi bunyi air'));
 const cut=(on)=>{CLIP.constant=on?0:10;vap.visible=bub.visible=on;surf.visible=on;liquid.visible=on};
 const shake=(t,amp)=>{tank.rotation.z=amp*Math.sin(t*9);};
 const scenes=[
  {t0:0,photo:'p3814281',ov:t=>pill('ISINYA GAS, DIGOYANG KOK BUNYI AIR?',W/2,520,28,C.DARK,'#fff',fin(t,.3))},
  {t0:tKata,d3:(t,lt)=>{show(tank,floor);cut(false);tank.position.set(0,0,0);shake(t,0.18);setLevel(0.4,0);particles(t,0.4,{});look([0.8,0.75,1.4],[0,0.32,0],1.9)},ov:t=>pill('KATA ORANG: DICAMPUR AIR BIAR BERAT',W/2,520,28,C.DARK,'#fff',fin(t,tKata))},
  {t0:tAda,d3:(t,lt)=>{show(tank,floor);cut(false);shake(t,0.12);setLevel(0.4,0);look([0.8,0.75,1.4],[0,0.32,0],1.9)},ov:t=>pill('KATA LAINNYA: SISA GAS JADI AIR',W/2,520,28,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(tank,floor);cut(false);tank.rotation.z=0;tank.rotation.y=lt*0.4;look([0.6,0.5,1.3],[0,0.32,0],1.9)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tElp,d3:(t,lt)=>{show(box,piston,mol,floor);const k=t<tWaktuDiisi+0.6?0:ez((t-tWaktuDiisi-0.6)/3);factory(k);look([0.9,1.0,1.8],[0,0.45,0],1.4)},
   ov:t=>{pill('PROPANA + BUTANA',W/2,520,32,C.DARK,'#fff',fin(t,tElp+.3));if(t>tWaktuDiisi-.2)pill('DIPADATKAN TEKANAN TINGGI',W/2,610,30,C.YEL,'#111',fin(t,tWaktuDiisi-.2));if(t>T('berubah jadi cairan')-.2)pill('GAS → CAIR',W/2,700,40,C.BLU,'#06121f',fin(t,T('berubah jadi cairan')-.2))}},
  {t0:tJadi1,d3:(t,lt)=>{show(tank,floor);tank.rotation.set(0,0,0);cut(true);setLevel(0.42,0);particles(t,0.42,{});look([0.15,0.5,1.25],[0,0.31,0],1.85)},
   ov:t=>{pill('BAWAH: ELPIJI CAIR',W/2,520,32,C.BLU,'#06121f',fin(t,T('sebagian besar')-.2));if(t>T('ruang uap')-.2)pill('ATAS: RUANG UAP',W/2,610,32,'#fff','#111',fin(t,T('ruang uap')-.2))}},
  {t0:tKompor,d3:(t,lt)=>{show(tank,floor,stove,table,hose,hoseDots);cut(true);tank.position.set(0,0,0);setLevel(0.42,0);particles(t,0.42,{vapOut:1,boil:t>tCair-.2?1:0});
    for(let i=0;i<12;i++){const p=hc.getPoint(((t*0.5+i/12)%1));o.position.copy(p);o.scale.setScalar(1);o.updateMatrix();hoseDots.setMatrixAt(i,o.matrix)}hoseDots.instanceMatrix.needsUpdate=true;flames.forEach((fl,i)=>{fl.scale.y=0.8+0.3*Math.sin(t*20+i)});look([0.55,0.9,2.0],[0.55,0.4,0],2.1)},
   ov:t=>{pill('YANG KELUAR: UAP DARI ATAS',W/2,520,30,C.DARK,'#fff',fin(t,tKompor+.3));if(t>tCair-.2)pill('CAIRAN MENDIDIH PELAN-PELAN',W/2,610,30,C.BLU,'#06121f',fin(t,tCair-.2))}},
  {t0:tProses,d3:(t,lt)=>{show(tank,floor);cut(false);setLevel(0.42,0);particles(t,0.42,{dewK:ez((lt-0.5)/2.5)});tank.rotation.y=0.3;look([0.45,0.45,0.95],[0,0.3,0],1.9)},ov:(t,lt)=>{pill('MENDIDIH = MENYERAP PANAS',W/2,520,30,C.YEL,'#111',fin(t,tProses+.2));if(t>T('terasa dingin')-.2)pill('TABUNG DINGIN, BERUMBUN',W/2,610,30,C.BLU,'#06121f',fin(t,T('terasa dingin')-.2))}},
  {t0:tHabis,d3:(t,lt)=>{show(tank,floor);cut(true);tank.rotation.y=0;const h=lerp(0.42,0.06,ez((lt-0.3)/2));shake(t,0.12);setLevel(h,0);particles(t,h,{});look([0.15,0.5,1.25],[0,0.31,0],1.85)},ov:t=>pill('HAMPIR HABIS: BUNYI MAKIN PELAN',W/2,520,30,C.DARK,'#fff',fin(t,tHabis+.3))},
  {t0:tJadi,d3:(t,lt)=>{show(tank,floor);cut(true);tank.rotation.set(0,0,0);setLevel(0.42,0);particles(t,0.42,{});look([0.15,0.5,1.25],[0,0.31,0],2.1)}}
 ];
 return {scenes,cardAt:tJadi-.2,card:['BUNYI AIR = ELPIJI CAIR','BUKAN AIR CAMPURAN','BUKAN SISA GAS RUSAK'],clips:[]};
}
