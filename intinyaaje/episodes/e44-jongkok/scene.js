// e44 Orang kita kuat jongkok, bule kok nggak? — manekin 3D (lentur vs kaku), betis & urat tumit, kursi/kloset vs WC jongkok
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p6276484','p495852','p1566326'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#e7e1d7');
 Object.assign(sun.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:0.5,far:12});sun.position.set(1.2,4,3);
 // lantai keramik
 const fc=document.createElement('canvas');fc.width=fc.height=512;const f=fc.getContext('2d');f.fillStyle='#d9d3c7';f.fillRect(0,0,512,512);f.strokeStyle='#b9b2a5';f.lineWidth=4;for(let i=0;i<=4;i++){f.beginPath();f.moveTo(i*128,0);f.lineTo(i*128,512);f.stroke();f.beginPath();f.moveTo(0,i*128);f.lineTo(512,i*128);f.stroke()}
 const ft=new THREE.CanvasTexture(fc);ft.wrapS=ft.wrapT=THREE.RepeatWrapping;ft.repeat.set(4,4);ft.colorSpace=THREE.SRGBColorSpace;
 const floor=add(new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.MeshStandardMaterial({map:ft,roughness:.5})));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;
 // manekin
 function mannequin(col){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:col,roughness:.45});const parts={};
  const cap=(r)=>{const c=new THREE.Mesh(new THREE.CylinderGeometry(r,r,1,16),m);c.castShadow=true;g.add(c);const e1=new THREE.Mesh(new THREE.SphereGeometry(r,16,10),m);const e2=e1.clone();g.add(e1,e2);return {c,e1,e2,r}};
  for(const side of [1,-1]){parts['foot'+side]=cap(0.035);parts['shin'+side]=cap(0.045);parts['thigh'+side]=cap(0.06)}
  parts.torso=cap(0.11);parts.arm1=cap(0.035);parts.arm2=cap(0.035);
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.1,24,16),m);head.castShadow=true;g.add(head);parts.head=head;
  // betis & urat (sisi kanan, dekat kamera)
  const calfM=new THREE.MeshStandardMaterial({color:'#e0503f',emissive:'#ff2a00',emissiveIntensity:0,transparent:true,opacity:0});const calf=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),calfM);g.add(calf);parts.calf=calf;parts.calfM=calfM;
  const tend=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.012,1,8),calfM);g.add(tend);parts.tend=tend;
  g.userData={parts,m};return g}
 const V=(x,y,z=0)=>new THREE.Vector3(x,y,z);
 function seg(p,a,b){const d=new THREE.Vector3().subVectors(b,a);p.c.position.copy(a).addScaledVector(d,.5);p.c.scale.set(1,Math.max(1e-3,d.length()),1);p.c.quaternion.setFromUnitVectors(V(0,1,0),d.clone().normalize());p.e1.position.copy(a);p.e2.position.copy(b)}
 // pose jongkok: a = tekuk pergelangan (rad), heelLift (rad), lean back (rad, putar badan ke belakang di tumit)
 function pose(M,a,{heel=0,fall=0,squat=1}={}){const P=M.userData.parts;const L=0.42,Lt=0.42;
  for(const s of [1,-1]){const z=s*0.1;const heelP=V(-0.04,0.035,z),toe=V(0.2,0.035,z);
   const ankle=V(0,0.09,z);if(heel>0){ankle.applyAxisAngle?0:0;}
   const ah=V(0,0.09,z);const rotAboutToe=(p)=>{const q=p.clone().sub(toe);q.applyAxisAngle(V(0,0,1),heel);return q.add(toe)};
   const A=rotAboutToe(ah),Hh=rotAboutToe(heelP);
   const aa=lerp(0,a,squat);const knee=V(A.x+L*Math.sin(aa),A.y+L*Math.cos(aa),z);
   const hipY=lerp(knee.y+Lt*0.98,Math.max(0.24,knee.y-Lt*0.97),squat);const dy=Math.min(Lt*0.999,Math.abs(knee.y-hipY));const hip=V(knee.x-Math.sqrt(Lt*Lt-dy*dy)*(squat>0.02?1:0.02),hipY,z);
   seg(P['foot'+s],Hh,toe);seg(P['shin'+s],A,knee);seg(P['thigh'+s],knee,hip);
   if(s===1){M.userData.hip=hip;M.userData.knee=knee;M.userData.ankle=A;M.userData.heelP=Hh}}
  const hip=V(M.userData.hip.x,M.userData.hip.y,0);const lean=cl(Math.atan2(0.14-hip.x,0.45),0,1.15)*squat+(1-squat)*0.05;const top=V(hip.x+0.55*Math.sin(lean),hip.y+0.55*Math.cos(lean),0);
  seg(P.torso,hip,top);P.head.position.set(top.x+0.13*Math.sin(lean),top.y+0.13*Math.cos(lean),0);
  const kn=M.userData.knee;seg(P.arm1,V(top.x,top.y-0.03,0.16),V(kn.x+0.12,kn.y-0.02,0.12));seg(P.arm2,V(top.x,top.y-0.03,-0.16),V(kn.x+0.12,kn.y-0.02,-0.12));
  // betis & urat
  const A=M.userData.ankle,Kp=kn;const back=V(-Math.cos(a*squat),Math.sin(a*squat),0).multiplyScalar(0.055);const mid=A.clone().lerp(Kp,0.62).add(back);P.calf.position.set(mid.x,mid.y,0.13);P.calf.scale.set(0.05,0.14,0.05);P.calf.quaternion.setFromUnitVectors(V(0,1,0),Kp.clone().sub(A).normalize());
  const tb=A.clone().lerp(Kp,0.42).add(back);const hp=M.userData.heelP.clone();seg({c:P.tend,e1:new THREE.Object3D(),e2:new THREE.Object3D()},V(hp.x,hp.y+0.02,0.13),V(tb.x,tb.y,0.13));
  M.rotation.z=fall;}
 const flex=add(mannequin('#4f8fd8')),stiff=add(mannequin('#9aa3af'));
 const setHi=(M,v,red=0)=>{const pm=M.userData.parts.calfM;pm.opacity=v;pm.emissiveIntensity=red;pm.transparent=v<1};
 // kursi, kloset duduk, WC jongkok
 const wood=new THREE.MeshStandardMaterial({color:'#9c6b3f',roughness:.6}),cer=new THREE.MeshPhysicalMaterial({color:'#f7f7f5',roughness:.15,clearcoat:1});
 const chair=add(new THREE.Group());const seat=new THREE.Mesh(new THREE.BoxGeometry(0.45,0.05,0.45),wood);seat.position.y=0.45;chair.add(seat);for(const[x,z]of[[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]]){const l=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.45,0.04),wood);l.position.set(x,0.225,z);chair.add(l)}const bk=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.5,0.45),wood);bk.position.set(-0.22,0.72,0);chair.add(bk);chair.traverse(o=>o.castShadow=true);
 const kloset=add(new THREE.Group());const bowl=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.14,0.4,32),cer);bowl.position.y=0.2;const rim=new THREE.Mesh(new THREE.TorusGeometry(0.19,0.03,12,32),new THREE.MeshStandardMaterial({color:'#222'}));rim.rotation.x=Math.PI/2;rim.position.y=0.42;const tank=new THREE.Mesh(new THREE.BoxGeometry(0.15,0.35,0.4),cer);tank.position.set(-0.25,0.55,0);kloset.add(bowl,rim,tank);kloset.traverse(o=>o.castShadow=true);
 const wc=add(new THREE.Group());const pan=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.04,0.45),cer);pan.position.y=0.02;const hole=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,0.045,32),new THREE.MeshStandardMaterial({color:'#7d8a96',roughness:.2}));hole.scale.set(1.6,1,1);hole.position.set(0.12,0.025,0);
 const pads=[];for(const z of[0.13,-0.13]){const p=new THREE.Mesh(new THREE.BoxGeometry(0.24,0.02,0.09),new THREE.MeshStandardMaterial({color:'#d8d4cc'}));p.position.set(-0.08,0.05,z);pads.push(p)}wc.add(pan,hole,...pads);
 const tPC=(lt,d=1)=>ez(lt/d);
 const tBanyak=T('banyak bule'),tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tWaktu=T('waktu jongkok'),tYang=T('yang menahan'),tKalau=T('kalau jarang'),tTumit=T('tumit terangkat'),tAnak=T('anak kecil'),tBeda=T('bedanya'),tKursi=T('kursi dan'),tKita=T('kita masih'),tKabar=T('kabar baiknya'),tJadi=WT(I('jadi kuat'));
 const A_FLEX=0.68,A_STIFF=0.26;
 const scenes=[
  {t0:0,photo:'p6276484',ov:t=>pill('ORANG KITA KUAT JONGKOK LAMA',W/2,520,30,C.DARK,'#fff',fin(t,.3))},
  {t0:tBanyak,d3:(t,lt)=>{show(stiff,floor);stiff.position.set(0,0,0);setHi(stiff,0);const sq=tPC(lt,1.2);const fall=lt>1.3?-0.9*ez((lt-1.3)/0.8):0;pose(stiff,A_STIFF,{squat:sq,heel:sq*0.25,fall});look([0.2,0.75,2.2],[0,0.45,0],1.25)},ov:t=>pill('BANYAK BULE MALAH JATUH KE BELAKANG',W/2,520,28,C.DARK,'#fff',fin(t,tBanyak+.2))},
  {t0:tKata,d3:(t,lt)=>{show(stiff,floor);setHi(stiff,0);pose(stiff,A_STIFF,{squat:0});stiff.rotation.y=0.6*Math.sin(lt*0.5);look([0.2,0.95,2.6],[0,0.75,0],1.25)},ov:t=>pill('KATA ORANG: KAKI BULE KEPANJANGAN',W/2,520,28,C.DARK,'#fff',fin(t,tKata))},
  {t0:tAda,photo:'p1566326',ov:t=>pill('KATA LAINNYA: ORANG KITA DARI LAHIR KUAT',W/2,520,26,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(flex,stiff,floor);stiff.rotation.y=0;flex.position.set(0,0,-0.4);stiff.position.set(0,0,0.4);setHi(flex,0);setHi(stiff,0);pose(flex,A_FLEX,{});pose(stiff,A_STIFF,{heel:0.25,fall:-0.15});look([0.3,0.9,2.6],[0,0.45,0],1.35)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tWaktu,d3:(t,lt)=>{show(flex,floor);flex.position.set(0,0,0);setHi(flex,0);pose(flex,lerp(0.15,A_FLEX,tPC(lt-0.8,1.6)),{});look([0.35,0.3,1.3],[0.05,0.17,0.1],1.6)},ov:t=>{pill('TELAPAK KAKI RATA',W/2,520,30,C.DARK,'#fff',fin(t,T('telapak')-.2));if(t>T('pergelangan kaki harus')-.2)pill('PERGELANGAN MENEKUK JAUH KE DEPAN',W/2,610,28,C.YEL,'#111',fin(t,T('pergelangan kaki harus')-.2))}},
  {t0:tYang,d3:(t,lt)=>{show(flex,floor);pose(flex,A_FLEX,{});setHi(flex,fin(t,T('otot betis')-.2),0.35);look([0.25,0.28,1.25],[0.0,0.16,0.1],1.5)},ov:t=>{pill('OTOT BETIS',W/2,520,32,C.RED,'#fff',fin(t,T('otot betis')-.2));if(t>T('urat di belakang')-.2)pill('+ URAT DI BELAKANG TUMIT',W/2,610,30,C.RED,'#fff',fin(t,T('urat di belakang')-.2))}},
  {t0:tKalau,d3:(t,lt)=>{show(stiff,floor);stiff.position.set(0,0,0);setHi(stiff,1,0.6+0.3*Math.sin(t*8));const hl=t>tTumit-.3?ez((t-tTumit+.3)/0.6):0;const fl=t>T('kehilangan')-.2?-0.85*ez((t-T('kehilangan')+.2)/0.9):0;pose(stiff,A_STIFF,{heel:0.35*hl,fall:fl});look([0.2,0.55,1.7],[0,0.35,0],1.15)},
   ov:t=>{pill('JARANG DIPAKAI = MAKIN KAKU',W/2,520,30,C.RED,'#fff',fin(t,tKalau+.3));if(t>tTumit-.3)pill('TUMIT TERANGKAT',W/2,610,30,C.DARK,'#fff',fin(t,tTumit-.3));if(t>T('kehilangan')-.2)pill('HILANG KESEIMBANGAN',W/2,700,30,C.DARK,'#fff',fin(t,T('kehilangan')-.2))}},
  {t0:tAnak,photo:'p495852',dir:-1,ov:t=>pill('ANAK KECIL DI MANA PUN: JONGKOK SEMPURNA',W/2,520,26,C.GRN,'#06210f',fin(t,tAnak+.3))},
  {t0:tBeda,d3:(t,lt)=>{show(floor,chair,kloset);setHi(stiff,0);stiff.rotation.z=0;chair.position.set(0.05,0,-0.6);kloset.position.set(0.1,0,0.6);
    // duduk di kursi: pakai pose dengan tekuk kecil, pinggul di ketinggian kursi
    pose(stiff,0.05,{squat:0.55});stiff.position.set(0.1,0.0,-0.6);look([0.9,1.1,2.6],[0,0.45,0],1.15)},ov:t=>{pill('NEGARA EMPAT MUSIM',W/2,520,30,C.DARK,'#fff',fin(t,T('negara empat')-.2));if(t>tKursi-.2)pill('KURSI & KLOSET DUDUK',W/2,610,30,C.YEL,'#111',fin(t,tKursi-.2));if(t>T('pelan-pelan hilang')-.2)pill('KEMAMPUAN JONGKOK PELAN-PELAN HILANG',W/2,700,26,C.RED,'#fff',fin(t,T('pelan-pelan hilang')-.2))}},
  {t0:tKita,d3:(t,lt)=>{show(flex,floor,wc);setHi(flex,0);wc.position.set(0.05,0,0);flex.position.set(-0.02,0.04,0);pose(flex,A_FLEX,{});look([0.6,0.8,1.9],[0,0.35,0],1.2)},ov:t=>{pill('KITA: WC JONGKOK, LESEHAN, NONGKRONG',W/2,520,26,C.GRN,'#06210f',fin(t,tKita+.2));if(t>T('tetap lentur')-.2)pill('PERGELANGAN TETAP LENTUR',W/2,610,30,C.YEL,'#111',fin(t,T('tetap lentur')-.2))}},
  {t0:tKabar,d3:(t,lt)=>{show(stiff,floor);setHi(stiff,0);stiff.position.set(0,0,0);const k=ez((lt-0.3)/2.4);pose(stiff,lerp(A_STIFF,A_FLEX,k),{heel:0.3*(1-k)});look([0.3,0.75,2.0],[0,0.4,0],1.2)},ov:t=>pill('KABAR BAIK: BISA DILATIH LAGI',W/2,520,30,C.GRN,'#06210f',fin(t,tKabar+.2))},
  {t0:tJadi,d3:(t,lt)=>{show(flex,stiff,floor);flex.position.set(0,0,-0.4);stiff.position.set(0,0,0.4);setHi(flex,0);setHi(stiff,0);pose(flex,A_FLEX,{});pose(stiff,A_FLEX,{});look([0.3,0.9,2.6],[0,0.45,0],1.45)}}
 ];
 return {scenes,cardAt:tJadi-.2,card:['BUKAN SOAL BULE ATAU BUKAN','TAPI SOAL KEBIASAAN','PERGELANGAN KAKI LENTUR'],clips:[]};
}
