// Author the approved Lebo raster as a bone-weighted Rive mesh; pixels stay unchanged.
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('prototypes/lebo-rive');
const W = 1145, H = 1374;
const nx = 38, ny = 46;
const vertices = [];
const grid = new Map();
const add = (col, row, contour = false) => {
  const index = vertices.length;
  grid.set(`${col},${row}`, index);
  vertices.push({ x: col * W / nx, y: row * H / ny, contour });
};
// Contour vertices precede interior points, in winding order, for editor compatibility.
for (let x=0;x<=nx;x++) add(x,0,true);
for (let y=1;y<=ny;y++) add(nx,y,true);
for (let x=nx-1;x>=0;x--) add(x,ny,true);
for (let y=ny-1;y>0;y--) add(0,y,true);
for (let y=1;y<ny;y++) for(let x=1;x<nx;x++) add(x,y);
const indices=[];
for(let y=0;y<ny;y++) for(let x=0;x<nx;x++) {
  const a=grid.get(`${x},${y}`),b=grid.get(`${x+1},${y}`),c=grid.get(`${x+1},${y+1}`),d=grid.get(`${x},${y+1}`);
  indices.push(a,b,c,a,c,d);
}
const encoded=[];
for(let n of indices) { while(n>127) {encoded.push((n&127)|128);n>>>=7;} encoded.push(n); }
const clamp = x => Math.max(0,Math.min(1,x));
const smooth = x => { const t=clamp(x);return t*t*(3-2*t); };
const angle=-2.35, shoulder=[402,785];
const elbow=[shoulder[0]+175*Math.cos(angle),shoulder[1]+175*Math.sin(angle)];
const wrist=[elbow[0]+125*Math.cos(angle),elbow[1]+125*Math.sin(angle)];
const bones=[{id:40,x:0,y:0,r:0},{id:41,x:600,y:730,r:0},{id:42,x:shoulder[0],y:shoulder[1],r:angle},{id:43,x:elbow[0],y:elbow[1],r:angle},{id:44,x:wrist[0],y:wrist[1],r:angle}];
const weights = (x,y) => {
  // Keep the face rigid. The left edge of the mane has its own stationary boundary.
  const armEdge=370+Math.max(0,x-220)*1.25;
  const armMask=smooth((365-x)/60)*smooth((y-armEdge)/35)*smooth((850-y)/80);
  const paw=smooth((655-y)/85)*armMask;
  const fore=smooth((755-y)/100)*armMask*(1-paw);
  const upper=armMask-paw-fore;
  const head=smooth((790-y)/115)*(1-armMask);
  let slots=[{i:1,v:1-armMask-head},{i:2,v:head},{i:3,v:upper},{i:4,v:fore},{i:5,v:paw}].filter(s=>s.v>.001).sort((a,b)=>b.v-a.v).slice(0,4);
  const total=slots.reduce((sum,s)=>sum+s.v,0);
  let remain=255, values=0, packed=0;
  slots.forEach((s,i)=>{let value=i===slots.length-1?remain:Math.round(s.v/total*255);remain-=value;values+=(value*2**(8*i));packed+=(s.i*2**(8*i));});
  return `<Weight values="${values}" indices="${packed}"/>`;
};
const verts=vertices.map(({x,y,contour},i)=>`<${contour?'ContourMeshVertex':'MeshVertex'} name="v${i}" x="${x-W/2}" y="${y-H/2}" u="${x/W}" v="${y/H}">${weights(x,y)}</${contour?'ContourMeshVertex':'MeshVertex'}>`).join('\n');
const tendons=bones.map(b=>`<Tendon boneId="0:${b.id}" xx="${Math.cos(b.r)}" xy="${Math.sin(b.r)}" yx="${-Math.sin(b.r)}" yy="${Math.cos(b.r)}" tx="${b.x}" ty="${b.y}"/>`).join('\n');
// Smooth sampled curves keep acceleration gentle without relying on host CSS or JS.
const keys=(id,key,fn)=>`<KeyedObject objectId="0:${id}"><KeyedProperty propertyKey="${key}">${Array.from({length:73},(_,i)=>{const f=i*3;return `<KeyFrameDouble frame="${f}" value="${fn(f/60)}" interpolationType="linear"/>`;}).join('')}</KeyedProperty></KeyedObject>`;
const envelope=t=>smooth(t/.5)*(1-smooth((t-2.5)/.8));
const wave=t=>Math.sin((t-.45)*Math.PI*2*1.35)*envelope(t);
const rml=`<Rive version="1" kind="fragment">
<ImageAsset file="../../public/mascot/lebo-wave.png" name="Approved Lebo" id="0:60"/>
<Artboard name="Lebo Wave" id="0:2" width="${W}" height="${H}" defaultStateMachineId="0:7" styleId="0:3">
<LayoutComponentStyle id="0:3"/>
<RootBone name="Anchor" id="0:40" length="100"/>
<RootBone name="Head" id="0:41" x="600" y="730" length="180"/>
<RootBone name="Shoulder" id="0:42" x="${shoulder[0]}" y="${shoulder[1]}" rotation="${angle}" length="175">
  <Bone name="Forearm" id="0:43" length="125"><Bone name="Paw" id="0:44" length="100"/></Bone>
</RootBone>
<Image name="Lebo artwork" id="0:20" x="${W/2}" y="${H/2}" assetId="0:60">
 <Mesh name="Lebo weighted mesh" id="0:21" triangleIndexBytes="${Buffer.from(encoded).toString('base64')}">
 ${verts}
 <Skin name="Lebo skin" tx="${W/2}" ty="${H/2}">${tendons}</Skin>
 </Mesh>
</Image>
<LinearAnimation name="Happy wave" id="0:6" fps="60" duration="216" loopValue="oneShot">
${keys(41,15,t=>-.022*Math.sin(Math.PI*Math.min(t/3.3,1)))}
${keys(42,15,t=>angle+.018*wave(t))}
${keys(43,15,t=>.045*wave(t-.06))}
${keys(44,15,t=>.10*wave(t-.10))}
</LinearAnimation>
<StateMachine name="Lebo Reaction" id="0:7"><StateMachineLayer name="Wave" id="0:8"><AnyState x="200" y="-120"/><ExitState x="400" y="-120"/><EntryState x="0" y="0"><StateTransition stateToId="0:12"/></EntryState><AnimationState x="200" y="0" id="0:12" animationId="0:6"/></StateMachineLayer></StateMachine>
</Artboard></Rive>`;
fs.writeFileSync(path.join(dir,'scene.rml'),rml);
console.log(`Authored ${vertices.length} weighted vertices, ${indices.length/3} triangles, ${bones.length} bones.`);
