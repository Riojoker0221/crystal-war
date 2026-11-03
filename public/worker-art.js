// Pixel silhouettes share the battlefield palette, with amber reserved for work gear.
export function drawWorker(g,e,{f,color,time=0}){
 const x=Math.round(e.x),y=Math.round(e.y),ink='#09161e',amber='#f4c568',light='#ffe6a0';
 const box=(dx,dy,w,h,c)=>{g.fillStyle=c;g.fillRect(x+dx,y+dy,w,h);};
 const poly=(points,c)=>{g.fillStyle=c;g.beginPath();points.forEach(([dx,dy],i)=>i?g.lineTo(x+dx,y+dy):g.moveTo(x+dx,y+dy));g.closePath();g.fill();};
 const ore=(dx,dy)=>{poly([[dx,dy-6],[dx+4,dy],[dx,dy+6],[dx-4,dy]],'#8df1d2');box(dx-1,dy-4,2,5,'#d6fff0');};
 const working=e.order?.type==='mine'&&!e.carry;
 const swing=working?Math.round(Math.sin(time*8+(e.id||0))*2):0;
 if(f===0){
  // Engineer: hard hat, large tool pack, safety vest and an angled mining pick.
  box(-7,4,5,8,ink);box(2,4,5,8,ink);box(-10,-5,19,12,ink);
  box(-11,-7,5,13,'#87623c');box(-10,-6,3,5,amber);
  box(-6,-4,13,10,color);box(-5,-3,3,9,amber);box(2,-3,3,9,amber);box(-5,1,10,2,light);
  box(-5,-11,10,7,'#a7b6bd');box(-3,-8,7,3,'#173744');
  box(-7,-13,14,4,ink);box(-5,-15,10,4,amber);box(-7,-11,15,3,amber);box(-1,-15,2,4,light);
  box(7,-2,4,4,'#bdc9c5');
  poly([[10,6],[12,7],[18+swing,-6],[16+swing,-7]],'#9e7960');
  poly([[12+swing,-8],[18+swing,-8],[22+swing,-3],[18+swing,-4],[16+swing,-5],[12+swing,-5]],'#d4e4df');
  if(e.carry)ore(-10,-10);
 }else if(f===1){
  // Collector: low twin treads, square ore hopper, sensor mast and drill arm.
  box(-13,-2,7,15,ink);box(6,-2,7,15,ink);
  for(let i=0;i<3;i++){box(-12,i*4,5,2,'#657982');box(7,i*4,5,2,'#657982');}
  box(-8,-8,16,19,'#405966');box(-6,-6,12,12,color);
  box(-6,-5,12,3,amber);box(-5,1,10,7,'#192e39');box(-4,6,8,2,amber);
  box(-4,-13,8,6,ink);box(-3,-12,6,3,'#dafbf0');box(-1,-16,2,4,'#9bb2b8');
  box(8,-1,6,4,'#aabec5');poly([[13,-4+swing],[20,1+swing],[13,5+swing]],amber);box(14,-1+swing,3,2,light);
  if(e.carry)ore(0,1);
 }else if(f===2){
  // Crystal worker: crescent cradle and orbiting crystal arms, without a humanoid body.
  poly([[-13,-5],[-8,-10],[-7,6],[0,12],[-8,9],[-14,1]],'#4f7690');
  poly([[13,-5],[8,-10],[7,6],[0,12],[8,9],[14,1]],'#4f7690');
  poly([[-8,-8],[-5,-6],[-4,5],[0,8],[-5,7],[-9,0]],color);
  poly([[8,-8],[5,-6],[4,5],[0,8],[5,7],[9,0]],color);
  poly([[0,-13],[5,-4],[0,5],[-5,-4]],light);box(-1,-10,2,7,'#fff3d2');
  for(const side of [-1,1]){const dy=swing*side;poly([[side*17,-5+dy],[side*20,-1+dy],[side*17,3+dy],[side*14,-1+dy]],color);box(side*17-1,-2+dy,2,3,light);}
  box(-3,9,6,2,amber);
  if(e.carry)ore(0,-2);
 }else{
  // Worker drone: broad segmented harvesting abdomen and blunt digging claws.
  for(const side of [-1,1])for(let i=0;i<3;i++){
   box(side<0?-13:9,-3+i*5,4,3,'#a79774');
   box(side<0?-15:12,-1+i*5,3,4,'#706171');
  }
  poly([[-8,-4],[8,-4],[11,3],[8,11],[-8,11],[-11,3]],ink);
  poly([[-7,-3],[7,-3],[9,3],[6,9],[-6,9],[-9,3]],'#9b7856');
  box(-6,-1,12,3,amber);box(-7,4,14,2,'#6b5362');box(-5,7,10,2,amber);
  poly([[0,-12],[7,-8],[6,-3],[-6,-3],[-7,-8]],color);
  box(-4,-8,2,2,'#f7f1c6');box(2,-8,2,2,'#f7f1c6');
  poly([[-5,-10],[-9,-14-swing],[-10,-9],[-6,-6]],'#d9c58a');
  poly([[5,-10],[9,-14+swing],[10,-9],[6,-6]],'#d9c58a');
  if(e.carry)ore(0,1);
 }
 // A small pick symbol below the feet identifies every worker, even when idle.
 box(-6,15,13,10,ink);box(-5,18,3,2,amber);box(-3,17,5,2,light);box(2,18,3,2,amber);box(-1,19,2,2,amber);box(-2,21,2,2,amber);box(-3,23,2,1,amber);
}
