import {unitPainter} from './art-helpers.js';

export function drawHuman(g,e,{color,time=0}){
 const {box,poly,line,ink,steel,white}=unitPainter(g,e),c=color;
 const dark='#213744',plate='#526b78',skin='#b9c3bb',orange='#e9a16b',gold='#f0cc82';
 const moving=['move','attackmove','attack'].includes(e.order?.type),step=moving?Math.round(Math.sin(time*10+(e.id||0))):0;
 if(e.t===1){
  // Rifleman: visible boots, compact combat helmet and a long shoulder rifle.
  box(-7,5,6,9+step,ink);box(2,5,6,9-step,ink);box(-6,10+step,5,3,plate);box(3,10-step,5,3,plate);
  box(-9,-5,18,13,ink);box(-7,-4,14,10,c);box(-8,-5,5,5,plate);box(5,-5,5,5,plate);
  box(-3,-2,6,8,dark);box(-2,-1,2,6,steel);box(-6,4,3,3,'#a6b9a4');
  box(-6,-12,12,9,ink);box(-5,-13,10,5,plate);box(-5,-9,10,3,skin);box(-4,-9,8,2,'#b4ede8');
  box(-10,0,4,6,skin);box(7,-1,4,6,skin);
  box(9,-16,5,22,ink);box(10,-14,3,12,steel);box(10,-3,4,7,plate);box(9,-18,4,3,ink);box(11,-14,1,4,white);
 }else if(e.t===2){
  // Rocket soldier: oversized shoulder launcher and an exposed orange warhead.
  box(-6,5,6,9+step,ink);box(3,5,6,9-step,ink);box(-6,11+step,6,3,plate);box(3,11-step,6,3,plate);
  box(-8,-5,17,13,ink);box(-5,-4,12,10,c);box(-4,1,10,3,dark);box(4,3,4,4,steel);
  box(-3,-12,11,9,ink);box(-2,-13,9,4,plate);box(-1,-9,7,3,skin);box(1,-9,6,2,'#c6ece6');
  box(-12,-14,8,23,ink);box(-11,-12,6,18,plate);box(-11,-8,6,3,c);box(-11,2,6,3,c);
  poly([[-12,-14],[-8,-20],[-4,-14]],orange);box(-10,-14,4,3,gold);box(-10,6,5,4,'#344c59');
  box(-3,-1,4,4,skin);box(7,0,4,6,skin);box(10,3,3,6,dark);
 }else if(e.t===3){
  // Medic: white trauma armour, twin medical cases and a readable red cross.
  box(-6,5,5,9+step,ink);box(2,5,5,9-step,ink);box(-6,11+step,5,3,steel);box(2,11-step,5,3,steel);
  box(-9,-5,18,13,ink);box(-7,-4,14,10,white);box(-7,-4,3,10,c);box(4,-4,3,10,c);
  box(-2,-2,4,7,'#e58481');box(-4,0,8,3,'#e58481');
  box(-6,-13,12,9,ink);box(-5,-14,10,5,white);box(-6,-10,12,2,c);box(-3,-8,7,3,'#a2c4c8');
  box(-13,-1,5,10,ink);box(-12,0,4,7,white);box(-11,2,2,3,'#e58481');
  box(8,-2,6,11,ink);box(9,-1,4,8,white);box(10,1,2,4,'#e58481');box(9,2,4,2,'#e58481');
 }else if(e.t===4){
  // Fast assault buggy: four exposed tyres, roll cage and an offset machine gun.
  for(const side of [-1,1])for(const y of [-8,9]){box(side<0?-17:11,y,7,10,ink);box(side<0?-16:12,y+1,5,2,plate);box(side<0?-16:12,y+6,5,2,plate);}
  poly([[-9,-15],[9,-15],[13,14],[8,19],[-8,19],[-13,14]],ink);
  poly([[-7,-13],[7,-13],[11,12],[7,16],[-7,16],[-11,12]],c);
  box(-7,-7,14,17,dark);box(-5,-5,10,10,'#102531');box(-4,-4,8,4,'#94c8ce');
  box(-8,-8,3,19,steel);box(5,-8,3,19,steel);box(-7,-9,14,3,steel);box(-7,8,14,3,steel);
  box(-8,12,16,3,plate);box(-7,-12,4,2,gold);box(3,-12,4,2,gold);
  box(8,-15,5,17,ink);box(9,-14,3,11,steel);box(7,-3,7,5,plate);box(10,-18,2,5,ink);
 }else if(e.t===5){
  // Tank: continuous tracks, broad glacis, rotating turret and a long main gun.
  box(-18,-14,9,32,ink);box(9,-14,9,32,ink);
  for(let i=0;i<7;i++){box(-17,-12+i*4,7,2,plate);box(10,-12+i*4,7,2,plate);}
  poly([[-11,-16],[11,-16],[13,16],[-13,16]],ink);poly([[-9,-14],[9,-14],[11,13],[-11,13]],c);
  box(-8,9,16,4,plate);box(-9,-12,4,3,white);box(5,-12,4,3,white);
  box(-8,-8,16,19,ink);box(-6,-7,12,15,plate);box(-5,-5,10,4,c);box(-3,2,6,4,dark);
  const extension=e.siege?6:0;
  box(-3,-25-extension,6,23+extension,ink);box(-2,-23-extension,4,20+extension,steel);box(-4,-27-extension,8,5,ink);box(-3,-26-extension,6,2,plate);
  if(e.siege){for(const side of [-1,1]){box(side<0?-25:15,9,10,4,steel);box(side<0?-26:21,12,6,5,ink);box(side<0?-25:22,12,4,3,gold);}}
 }else if(e.t===6){
  // Fighter: pointed nose, swept delta wings and two distinct engine nacelles.
  poly([[0,-26],[6,-8],[21,8],[20,14],[7,10],[5,21],[-5,21],[-7,10],[-20,14],[-21,8],[-6,-8]],ink);
  poly([[0,-23],[4,-7],[17,8],[17,11],[5,7],[3,18],[-3,18],[-5,7],[-17,11],[-17,8],[-4,-7]],plate);
  poly([[-5,-5],[-16,8],[-7,6],[-2,0]],c);poly([[5,-5],[16,8],[7,6],[2,0]],c);
  poly([[0,-15],[3,-7],[2,-2],[-2,-2],[-3,-7]],'#b5e6e3');box(-1,-18,2,5,white);
  for(const side of [-1,1]){box(side<0?-10:5,7,5,12,ink);box(side<0?-9:6,8,3,8,steel);box(side<0?-9:6,17,3,4+(Math.floor(time*8)%2),orange);}
  box(-2,5,4,12,c);box(-14,8,3,4,steel);box(11,8,3,4,steel);
 }else if(e.t===7){
  // Heavy mech: huge shoulder blocks, arm cannons and separate armoured legs.
  box(-13,8,11,15+step,ink);box(3,8,11,15-step,ink);box(-14,18+step,12,6,plate);box(3,18-step,12,6,plate);
  box(-12,7,10,9,c);box(3,7,10,9,c);box(-10,10,6,4,steel);box(5,10,6,4,steel);
  poly([[-13,-15],[13,-15],[15,7],[9,13],[-9,13],[-15,7]],ink);
  poly([[-10,-13],[10,-13],[12,6],[7,10],[-7,10],[-12,6]],plate);
  box(-10,-12,20,7,c);box(-8,-3,16,9,dark);box(-3,-2,6,8,c);box(-1,-1,2,6,white);
  box(-7,-22,14,9,ink);box(-5,-21,10,7,plate);box(-4,-19,8,3,gold);box(-8,-24,3,5,steel);
  for(const side of [-1,1]){
   box(side<0?-23:12,-15,12,13,ink);box(side<0?-21:13,-13,9,8,c);box(side<0?-22:14,-13,7,2,steel);
   box(side<0?-22:15,-2,8,17,ink);box(side<0?-21:16,0,6,11,plate);box(side<0?-22:15,11,8,5,steel);
   box(side<0?-20:17,13,4,3,ink);
  }
 }else if(e.t===8){
  // Demolition soldier: human legs and respirator, orange charge pack, hand trigger.
  box(-6,5,5,9+step,ink);box(2,5,5,9-step,ink);box(-6,11+step,5,3,plate);box(2,11-step,5,3,plate);
  box(-11,-7,8,17,ink);box(-10,-6,6,14,orange);box(-9,-5,2,12,gold);box(-10,0,6,3,'#815b44');
  box(-6,-4,14,12,ink);box(-4,-3,10,10,c);box(-4,2,10,3,orange);box(0,2,2,3,gold);
  box(-5,-13,11,9,ink);box(-4,-14,9,5,dark);box(-3,-10,8,4,skin);box(-3,-9,7,2,'#293b45');box(3,-8,3,3,steel);
  box(6,-1,4,6,skin);box(9,0,6,8,ink);box(10,1,4,5,orange);box(11,2,2,2,'#f6d997');box(11,-3,2,4,steel);
  line(-7,-5,-7,-9,ink,1);line(-7,-9,1,-9,ink,1);box(-10,7,6,2,white);
 }
}
