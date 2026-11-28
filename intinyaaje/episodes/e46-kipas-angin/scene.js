// e46 Kipas angin bikin kamar dingin? — kipas 3D, aliran udara, termometer tetap, kulit: lapisan hangat tersapu + keringat menguap
export default async function(K){
 const {THREE,S,cam,sun,add,show,look,lerp,ez,cl,T,I,WT,fin,pill,txt,C,X,W,rnd,loadImg}=K;
 for(const n of ['p2362873','p10015991'])loadImg(n,`/${K.EP}/img/${n}.jpg`);
 S.background=new THREE.Color('#efe6d8');
 Object.assign(sun.shadow.camera,{left:-3,right:3,top:3,bottom:-3,near:0.5,far:14});sun.position.set(2,5,3);
 // kamar: lantai + dinding
 const fc=document.createElement('canvas');fc.width=fc.height=512;const f=fc.getContext('2d');f.fillStyle='#c9b18f';f.fillRect(0,0,512,512);for(let i=0;i<8;i++){f.fillStyle=i%2?'#c2a986':'#ccb594';f.fillRect(0,i*64,512,62)}
 const ft=new THREE.CanvasTexture(fc);ft.wrapS=ft.wrapT=THREE.RepeatWrapping;ft.repeat.set(3,3);ft.colorSpace=THREE.SRGBColorSpace;
 const room=add(new THREE.Group());const fl=new THREE.Mesh(new THREE.PlaneGeometry(6,6),new THREE.MeshStandardMaterial({map:ft,roughness:.6}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;room.add(fl);
 const wall=new THREE.Mesh(new THREE.PlaneGeometry(6,3.2),new THREE.MeshStandardMaterial({color:'#f3e9d6',roughness:.9}));wall.position.set(0,1.6,-1.6);room.add(wall);
 const wall2=wall.clone();wall2.rotation.y=Math.PI/2;wall2.position.set(-2.2,1.6,0);room.add(wall2);
 // kasur sederhana
 const bed=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.35,1.1),new THREE.MeshStandardMaterial({color:'#e8eef6',roughness:.8}));bed.position.set(0.7,0.18,-0.9);bed.castShadow=true;room.add(bed);
 // kipas berdiri
 const fan=add(new THREE.Group());const white=new THREE.MeshStandardMaterial({color:'#f2f2f2',roughness:.35}),blueM=new THREE.MeshStandardMaterial({color:'#3c8fe0',roughness:.3,transparent:true,opacity:.9});
 const head=new THREE.Group();head.position.set(0,1.15,0);fan.add(head);
 const blades=new THREE.Group();for(let i=0;i<3;i++){const b=new THREE.Mesh(new THREE.CircleGeometry(0.16,24,0,Math.PI*0.6),blueM);b.position.x=0.03;const p=new THREE.Group();p.rotation.z=i*2.094;p.add(b);blades.add(p)}head.add(blades);
 const hub=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,0.06,20),white);hub.rotation.x=Math.PI/2;hub.position.z=0.02;head.add(hub);
 const motor=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.09,0.18,24),white);motor.rotation.x=Math.PI/2;motor.position.z=-0.1;head.add(motor);
 for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.06+i*0.065,0.004,6,48),white);r.position.z=0.05;head.add(r)}
 const rim=new THREE.Mesh(new THREE.TorusGeometry(0.27,0.012,8,64),white);head.add(rim);
 const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.025,1.05,12),white);pole.position.y=0.55;fan.add(pole);const base=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.24,0.05,32),white);base.position.y=0.025;fan.add(base);
 fan.traverse(o=>{if(o.isMesh)o.castShadow=true});fan.position.set(-1.2,0,0.3);fan.rotation.y=0.9;
 // garis angin
 const wind=add(new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.008,0.12,3,6),new THREE.MeshBasicMaterial({color:'#9fd0ff',transparent:true,opacity:.7}),70));const o=new THREE.Object3D();
 const dir=new THREE.Vector3(Math.sin(0.9),0,Math.cos(0.9));
 function blow(t,str=1){const origin=new THREE.Vector3(-1.2,1.15,0.3);for(let i=0;i<70;i++){const ph=(t*0.7*str+rnd(i))%1;const side=new THREE.Vector3(dir.z,0,-dir.x);const p=origin.clone().addScaledVector(dir,0.1+ph*2.4).addScaledVector(side,(rnd(i+1)-.5)*0.5*(1+ph)).add(new THREE.Vector3(0,(rnd(i+2)-.5)*0.5*(1+ph),0));o.position.copy(p);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);o.scale.setScalar(str*Math.sin(ph*Math.PI));o.updateMatrix();wind.setMatrixAt(i,o.matrix)}wind.instanceMatrix.needsUpdate=true}
 // orang sederhana
 const person=add(new THREE.Group());const skinM=new THREE.MeshStandardMaterial({color:'#c98b5e',roughness:.6}),shirt=new THREE.MeshStandardMaterial({color:'#e9573f',roughness:.7});
 const torso=new THREE.Mesh(new THREE.CapsuleGeometry(0.17,0.45,6,16),shirt);torso.position.y=1.0;const headP=new THREE.Mesh(new THREE.SphereGeometry(0.13,24,16),skinM);headP.position.y=1.5;
 const legs=new THREE.Mesh(new THREE.CapsuleGeometry(0.15,0.55,6,16),new THREE.MeshStandardMaterial({color:'#2f3b52'}));legs.position.y=0.42;person.add(torso,headP,legs);person.traverse(o=>{if(o.isMesh)o.castShadow=true});person.position.set(0.3,0,0.6);
 // kulit close-up
 const skin=add(new THREE.Group());const slab=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.25,1.0,32,1,16),new THREE.MeshStandardMaterial({color:'#d39a6c',roughness:.55}));slab.position.y=-0.125;skin.add(slab);
 const layerM=new THREE.MeshStandardMaterial({color:'#ff8a3d',transparent:true,opacity:.35,emissive:'#ff6a00',emissiveIntensity:.3,depthWrite:false});const layer=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.12,1.0),layerM);layer.position.y=0.06;skin.add(layer);
 const drops=[];for(let i=0;i<9;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(0.06,20,12,0,Math.PI*2,0,Math.PI/2),new THREE.MeshPhysicalMaterial({color:'#e8f6ff',roughness:.05,clearcoat:1,transparent:true,opacity:.85}));d.position.set(-0.6+(i%3)*0.55+(rnd(i)-.5)*0.15,0,-0.3+Math.floor(i/3)*0.3);skin.add(d);drops.push(d)}
 const steam=new THREE.InstancedMesh(new THREE.SphereGeometry(0.012,8,6),new THREE.MeshBasicMaterial({color:'#ffffff',transparent:true,opacity:.8}),90);skin.add(steam);
 const coolM=new THREE.MeshBasicMaterial({color:'#4fb3ff',transparent:true,opacity:0,depthWrite:false});const cool=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.0),coolM);cool.rotation.x=-Math.PI/2;cool.position.y=0.002;skin.add(cool);
 const skinWind=new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.008,0.14,3,6),new THREE.MeshBasicMaterial({color:'#9fd0ff',transparent:true,opacity:.8}),40);skin.add(skinWind);
 function skinAnim(t,{sweep=0,evap=0,windOn=0}){layer.position.x=lerp(0,1.8,sweep);layerM.opacity=0.35*(1-sweep);
  drops.forEach((d,i)=>{d.scale.setScalar(Math.max(0.01,1-evap*(0.8+0.2*rnd(i))))});coolM.opacity=0.35*evap;
  for(let i=0;i<90;i++){const ph=(t*0.6+rnd(i+20))%1;const d=drops[i%9];o.position.set(d.position.x+(rnd(i)-.5)*0.08+ph*0.25*windOn,0.05+ph*0.45,d.position.z+(rnd(i+1)-.5)*0.08);o.scale.setScalar(evap>0.02?Math.sin(ph*Math.PI):0);o.updateMatrix();steam.setMatrixAt(i,o.matrix)}steam.instanceMatrix.needsUpdate=true;
  for(let i=0;i<40;i++){const ph=(t*0.9+rnd(i+40))%1;o.position.set(-0.9+ph*1.8,0.05+rnd(i+41)*0.25,(rnd(i+42)-.5)*0.9);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(1,0,0));o.scale.setScalar(windOn*Math.sin(ph*Math.PI));o.updateMatrix();skinWind.setMatrixAt(i,o.matrix)}skinWind.instanceMatrix.needsUpdate=true}
 const thermo=(t,v,lab,x=150,y=760)=>{X.save();X.fillStyle='rgba(10,14,22,.8)';X.beginPath();X.roundRect(x-40,y-230,80,300,40);X.fill();X.fillStyle=C.RED;X.beginPath();X.arc(x,y+30,30,0,7);X.fill();X.fillRect(x-14,y+30-240*v,28,240*v);X.restore();txt(lab,x,y-260,34,'#fff')};
 const tKata=T('kata orang'),tAda=T('ada juga'),tSiapa=T('siapa yang bener'),tKipas=T('kipas angin cuma'),tSuhu=T('suhu udaranya'),tTerus=T('terus kenapa'),tDi=T('di sekitar kulit'),tAngin=T('angin kipas menyapu'),tYang=T('yang paling penting'),tWaktu=T('waktu menguap'),tMakanya=T('makanya kipas'),tJadi=WT(I('jadi kipas angin'));
 const spin=()=>{blades.rotation.z-=0.45};
 const scenes=[
  {t0:0,photo:'p10015991',ov:t=>pill('PANAS! KIPAS NYALA SEHARIAN',W/2,520,30,C.DARK,'#fff',fin(t,.3))},
  {t0:tKata,d3:(t,lt)=>{show(room,fan,wind);spin();blow(t);look([0.7,1.4,2.4],[-0.9,0.8,0.4],1.15)},ov:t=>{pill('KATA ORANG: UDARA KAMAR JADI DINGIN',W/2,520,26,C.DARK,'#fff',fin(t,tKata));thermo(t,0.7,'31°C')}},
  {t0:tAda,d3:(t,lt)=>{show(room,fan,wind);spin();blow(t);look([0.9,1.7,2.6],[-0.8,0.7,0.3],1.2)},ov:t=>pill('KATA LAINNYA: NYALAIN DI KAMAR KOSONG',W/2,520,26,C.DARK,'#fff',fin(t,tAda))},
  {t0:tSiapa,d3:(t,lt)=>{show(room,fan);spin();look([-0.2,1.3,1.6],[-1.2,1.1,0.3],1.2)},ov:t=>{txt('SIAPA YANG BENER?',W/2,560,66,'#fff',{a:fin(t,tSiapa)});txt('KITA CARI INTINYA!',W/2,660,74,C.YEL,{a:fin(t,T('kita cari')-.1)})}},
  {t0:tKipas,d3:(t,lt)=>{show(room,fan,wind);spin();blow(t);look([0.7,1.4,2.4],[-0.9,0.8,0.4],1.15)},ov:t=>{pill('KIPAS CUMA MENDORONG UDARA',W/2,520,30,C.YEL,'#111',fin(t,tKipas+.2));thermo(t,0.7,'31°C');if(t>tSuhu-.2)pill('SUHU NGGAK TURUN',W/2,610,30,C.RED,'#fff',fin(t,tSuhu-.2));if(t>T('motornya')-.2)pill('MOTOR MALAH NAMBAH PANAS SEDIKIT',W/2,700,26,C.DARK,'#fff',fin(t,T('motornya')-.2))}},
  {t0:tTerus,d3:(t,lt)=>{show(room,fan,wind,person);spin();blow(t);look([1.6,1.5,3.4],[-0.5,0.85,0.5],1.7)},ov:t=>pill('TERUS KENAPA BADAN ADEM?',W/2,520,32,C.DARK,'#fff',fin(t,tTerus+.2))},
  {t0:tDi,d3:(t,lt)=>{show(skin);const sw=t>tAngin-.2?ez((t-tAngin+.2)/1.6):0;skinAnim(t,{sweep:sw,windOn:t>tAngin-.4?1:0});look([0.3,0.9,1.6],[0,0,0],1.35)},
   ov:t=>{pill('LAPISAN UDARA HANGAT & LEMBAP',W/2,520,28,'#ff8a3d','#111',fin(t,T('lapisan tipis')-.2));if(t>tAngin-.2)pill('ANGIN KIPAS MENYAPU LAPISAN ITU',W/2,610,28,C.BLU,'#06121f',fin(t,tAngin-.2))}},
  {t0:tYang,d3:(t,lt)=>{show(skin);const ev=t>T('cepat menguap')-.4?ez((t-T('cepat menguap')+.4)/4.5):0;skinAnim(t,{sweep:1,evap:ev,windOn:1});look([0.3,0.8,1.5],[0,0.05,0],1.3)},
   ov:t=>{pill('PALING PENTING: KERINGAT MENGUAP',W/2,520,28,C.YEL,'#111',fin(t,tYang+.2));if(t>tWaktu-.2)pill('MENGUAP = BAWA PANAS DARI KULIT',W/2,610,28,C.BLU,'#06121f',fin(t,tWaktu-.2));if(t>T('terasa dingin')-.2)pill('KULIT TERASA DINGIN',W/2,700,30,C.GRN,'#06210f',fin(t,T('terasa dingin')-.2))}},
  {t0:tMakanya,d3:(t,lt)=>{show(room,fan,wind,person);spin();blow(t);person.visible=lt<1.6;look([0.9,1.7,2.6],[-0.8,0.7,0.3],1.2)},ov:(t,lt)=>{pill('ADEM CUMA KALAU ADA ORANGNYA',W/2,520,28,C.YEL,'#111',fin(t,tMakanya+.2));thermo(t,0.7,'31°C')}},
  {t0:tJadi,d3:(t,lt)=>{show(room,fan,wind);const off=t>T('matikan saja')-.1;if(!off){spin();blow(t)}else{blades.rotation.z-=0.45*Math.max(0,1-(t-T('matikan saja'))/1.5);blow(t,Math.max(0,1-(t-T('matikan saja'))/0.8))}look([0.9,1.7,2.6],[-0.8,0.7,0.3],1.45)}}
 ];
 return {scenes,cardAt:tJadi-.2,card:['KIPAS NGGAK DINGINKAN KAMAR','TAPI BANTU KERINGAT MENGUAP','KAMAR KOSONG? MATIKAN'],clips:[]};
}
