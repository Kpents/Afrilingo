import fs from 'node:fs';

// Each artboard samples one pose from the approved transparent atlas. All
// movement is authored into Rive bones and skin weights, not browser transforms.
const atlas={w:1774,h:887}, W=500,H=650;
const smooth=x=>{const t=Math.min(1,Math.max(0,x));return t*t*(3-2*t)};
const env=t=>smooth(t/.4)*(1-smooth((t-2.6)/.7));
const wave=t=>Math.sin((t-.35)*Math.PI*2*1.3)*env(t);
const poses=[
  {name:'Wave',x:0,w:450,head:[245,440],left:[153,460],paw:[87,405],right:[335,520],tail:[375,550]},
  {name:'Celebrate',x:450,w:445,head:[222,433],left:[118,430],paw:[71,385],right:[340,427],tail:[374,549]},
  {name:'Curious',x:895,w:425,head:[195,446],left:[159,485],paw:[185,452],right:[267,513],tail:[329,563]},
  {name:'Learn',x:1320,w:454,head:[223,452],left:[115,515],paw:[115,515],right:[323,515],tail:[378,550]}
];
const variants = [
  ...poses,
  { ...poses[0], variant: 'Idle', strength: .15 },
  { ...poses[1], variant: 'Correct', strength: .45 },
  { ...poses[2], variant: 'Encourage', strength: .65 }
];
const encode=list=>{const bytes=[];for(let v of list){while(v>127){bytes.push((v&127)|128);v>>>=7}bytes.push(v)}return Buffer.from(bytes).toString('base64')};
const grid=(p)=>{
  const nx=38,ny=48,points=[],lookup=new Map();
  function add(x,y,edge=false){lookup.set(`${x},${y}`,points.length);points.push({x:x*p.w/nx,y:110+y*600/ny,edge})}
  for(let x=0;x<=nx;x++)add(x,0,true);for(let y=1;y<=ny;y++)add(nx,y,true);for(let x=nx-1;x>=0;x--)add(x,ny,true);for(let y=ny-1;y>0;y--)add(0,y,true);
  for(let y=1;y<ny;y++)for(let x=1;x<nx;x++)add(x,y);
  const triangles=[];for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){const a=lookup.get(`${x},${y}`),b=lookup.get(`${x+1},${y}`),c=lookup.get(`${x+1},${y+1}`),d=lookup.get(`${x},${y+1}`);triangles.push(a,b,c,a,c,d)}
  return {points,triangles};
};
function weights(p,x,y){
  let left=0,paw=0,right=0;
  if(p.name==='Wave'){
    left=smooth((165-x)/45)*smooth((y-310-Math.max(0,x-90)*.85)/30)*smooth((545-y)/70);
    paw=left*smooth((437-y)/45);left-=paw;
  }else if(p.name==='Celebrate'){
    left=smooth((145-x)/50)*smooth((y-300-Math.max(0,x-90)*.7)/30)*smooth((530-y)/80);
    paw=left*smooth((425-y)/50);left-=paw;
    right=smooth((x-310)/45)*smooth((y-290-Math.max(0,370-x)*.7)/35)*smooth((525-y)/75);
  }
  const occupied=left+paw+right;
  const head=smooth((465-y)/70)*(1-occupied);
  const tail=smooth((x-(p.name==='Curious'?300:350))/35)*smooth((y-455)/65)*(1-occupied-head);
  const base=Math.max(0,1-left-paw-right-head-tail);
  const slots=[base,head,left,paw,right,tail].map((v,i)=>({v,i:i+1})).filter(s=>s.v>.0001).sort((a,b)=>b.v-a.v).slice(0,4);
  const total=slots.reduce((s,x)=>s+x.v,0);let remain=255,vs=0,is=0;
  slots.forEach((s,i)=>{const n=i===slots.length-1?remain:Math.min(remain,Math.round(s.v/total*255));remain-=n;vs+=n*2**(8*i);is+=s.i*2**(8*i)});
  return `<Weight values="${vs}" indices="${is}"/>`;
}
function artboard(p,index){
  const base=10000*(index+1),id=n=>`0:${base+n}`,offset=(W-p.w)/2;
  const xy=([x,y])=>[x+offset,y-80];
  const bones=[[250,580],p.head,p.left,p.paw,p.right,p.tail].map((point,i)=>({id:id(40+i),name:['Body','Head','Upper arm','Paw','Other arm','Tail'][i],pos:i===0?[250,500]:xy(point)}));
  const {points,triangles}=grid(p);
  const vertices=points.map(({x,y,edge},i)=>`<${edge?'ContourMeshVertex':'MeshVertex'} name="v${i}" x="${x+offset-W/2}" y="${y-80-H/2}" u="${(x+p.x)/atlas.w}" v="${y/atlas.h}">${weights(p,x,y)}</${edge?'ContourMeshVertex':'MeshVertex'}>`).join('\n');
  const keys=(bone,key,fn)=>`<KeyedObject objectId="${bone}"><KeyedProperty propertyKey="${key}">${Array.from({length:73},(_,i)=>`<KeyFrameDouble frame="${i*3}" value="${fn(i/20)}" interpolationType="linear"/>`).join('')}</KeyedProperty></KeyedObject>`;
  const bounce=t=>p.name==='Celebrate'?-22*Math.sin(Math.PI*Math.min(1,Math.max(0,(t-.3)/.7)))**2-12*Math.sin(Math.PI*Math.min(1,Math.max(0,(t-1.15)/.65)))**2:0;
  const rotations=p.name==='Wave'?[()=>0,t=>-.025*env(t),t=>.025*wave(t),t=>.15*wave(t-.07),()=>0,t=>.025*wave(t-.12)]
    :p.name==='Celebrate'?[()=>0,t=>.035*wave(t),t=>-.07*wave(t),t=>-.09*wave(t-.05),t=>.11*wave(t),t=>.045*wave(t-.1)]
    :p.name==='Curious'?[()=>0,t=>.04*Math.sin(Math.PI*t/3.6),()=>0,()=>0,()=>0,t=>.045*Math.sin(Math.PI*t/1.8)]
    :[()=>0,t=>.018*Math.sin(Math.PI*t/1.8)*env(t),()=>0,()=>0,()=>0,t=>.018*Math.sin(Math.PI*t/1.8)];
  const strength = p.strength ?? 1;
  return `<Artboard name="${p.variant || p.name}" id="${id(2)}" x="${index*560}" y="0" width="${W}" height="${H}" styleId="${id(3)}" defaultStateMachineId="${id(7)}">
<LayoutComponentStyle id="${id(3)}"/>
${bones.map(b=>`<RootBone name="${b.name}" id="${b.id}" x="${b.pos[0]}" y="${b.pos[1]}" length="60"/>`).join('\n')}
<Image name="Lebo ${p.name}" id="${id(20)}" x="${W/2}" y="${H/2}" assetId="0:60"><Mesh name="Weighted ${p.name}" id="${id(21)}" triangleIndexBytes="${encode(triangles)}">${vertices}<Skin tx="${W/2}" ty="${H/2}">${bones.map(b=>`<Tendon boneId="${b.id}" tx="${b.pos[0]}" ty="${b.pos[1]}"/>`).join('')}</Skin></Mesh></Image>
<LinearAnimation name="Reaction" id="${id(6)}" fps="60" duration="216" loopValue="oneShot">
${bones.map((b,i)=>keys(b.id,15,t=>rotations[i](t)*strength)+keys(b.id,91,t=>b.pos[1]+bounce(t)*strength)).join('\n')}
</LinearAnimation>
<StateMachine name="Lebo Reaction" id="${id(7)}"><StateMachineLayer name="Reaction" id="${id(8)}"><AnyState x="200" y="-120"/><ExitState x="400" y="-120"/><EntryState><StateTransition stateToId="${id(12)}"/></EntryState><AnimationState x="200" y="0" id="${id(12)}" animationId="${id(6)}"/></StateMachineLayer></StateMachine>
</Artboard>`;
}
fs.writeFileSync('prototypes/lebo-2d-rive/scene.rml',`<Rive version="1" kind="fragment"><ImageAsset file="../lebo-2d-review/lebo-2d-atlas-v2.png" name="Lebo 2D poses" id="0:60"/>${variants.map(artboard).join('\n')}</Rive>`);
console.log('Authored seven 2D Rive artboards with six skinning bones each.');
