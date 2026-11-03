import {unitPainter} from './art-helpers.js';

// Chitin, exposed membranes and bone tools give each caste its own silhouette.
export function drawSwarm(g,e,{color,time=0}){
 const {box,poly,line,gem,ink}=unitPainter(g,e);
 const shell='#73556b',shade='#453448',plate='#a27c89',bone='#e0d1a5';
 const acid='#b5ed76',acidShade='#517b51',orange='#f5a55c';
 const stride=e.order?Math.round(Math.sin(time*9+(e.id||0))):0;
 switch(e.t){
  case 1:{
   // Fast mantis: slim waist and two tall, unmistakable scythe arms.
   for(const s of [-1,1]){
    line(s*3,5,s*8,10+stride,ink,4);line(s*8,10+stride,s*10,13,ink,3);
    line(s*3,5,s*8,10+stride,shell,2);line(s*8,10+stride,s*10,13,bone,1);
    poly([[s*5,-5],[s*11,-12],[s*16,-10],[s*13,-1],[s*9,2],[s*10,-7]],ink);
    poly([[s*7,-5],[s*12,-10],[s*14,-9],[s*11,-2],[s*9,-1],[s*11,-7]],bone);
   }
   poly([[0,-6],[5,-2],[4,7],[0,10],[-4,7],[-5,-2]],ink);
   poly([[0,-4],[3,-1],[2,6],[0,8],[-2,6],[-3,-1]],shell);
   box(-3,-1,6,3,color);box(-2,4,4,2,plate);
   poly([[-6,-10],[0,-14],[6,-10],[4,-4],[-4,-4]],ink);
   poly([[-4,-10],[0,-12],[4,-10],[3,-6],[-3,-6]],color);
   box(-3,-9,2,2,bone);box(2,-9,2,2,bone);
   line(-3,-13,-5,-16,bone,1);line(3,-13,5,-16,bone,1);
   break;
  }
  case 2:{
   // Acid spitter: a round venom abdomen and a protruding organic nozzle.
   for(const s of [-1,1])for(let i=0;i<2;i++){
    line(s*7,2+i*6,s*12,5+i*6,ink,4);
    line(s*8,2+i*6,s*12,5+i*6,shell,2);box(s<0?-14:11,5+i*6,3,2,bone);
   }
   poly([[-7,-5],[6,-5],[11,1],[10,10],[5,15],[-6,14],[-11,7],[-11,1]],ink);
   poly([[-6,-3],[5,-3],[9,2],[8,9],[4,12],[-5,12],[-8,7],[-8,1]],acidShade);
   poly([[-5,-1],[3,-2],[6,2],[4,9],[-4,10],[-7,5]],acid);
   box(-5,0,3,5,'#d9f5a2');box(2,8,3,3,'#8fbe5f');
   poly([[-7,-8],[6,-9],[9,-3],[5,1],[-5,1],[-9,-3]],shade);
   box(-6,-7,12,4,color);
   poly([[-4,-7],[-3,-13],[1,-16],[5,-13],[4,-7]],ink);
   poly([[-2,-7],[-1,-12],[1,-14],[3,-12],[2,-7]],plate);
   box(-2,-15,6,3,shade);box(-1,-15,4,2,acid);
   box(-7,-4,2,2,bone);box(6,-5,2,2,bone);
   break;
  }
  case 3:{
   // Flying caste: four membrane wings and a tapered, hanging stinger.
   const flap=Math.round(Math.sin(time*12+(e.id||0))*2);
   for(const s of [-1,1]){
    poly([[s*3,-4],[s*12,-14+flap],[s*21,-9+flap],[s*18,1],[s*7,3]],ink);
    poly([[s*5,-4],[s*12,-12+flap],[s*18,-8+flap],[s*16,-1],[s*7,1]],'#728b86');
    poly([[s*6,-3],[s*12,-9+flap],[s*15,-7+flap],[s*12,-2]],'#b5cbb3');
    line(s*5,-2,s*16,-7+flap,shell,1);
    poly([[s*4,1],[s*16,3],[s*15,11+flap],[s*7,8],[s*3,5]],ink);
    poly([[s*6,3],[s*13,4],[s*12,8+flap],[s*7,6]],'#658a7f');
   }
   poly([[-4,-8],[4,-8],[6,3],[2,12],[0,18],[-3,11],[-6,3]],ink);
   poly([[-2,-6],[2,-6],[3,2],[1,10],[0,14],[-1,9],[-3,2]],shell);
   box(-3,-4,6,6,color);box(-2,4,4,3,plate);
   poly([[-5,-9],[0,-14],[5,-9],[3,-5],[-3,-5]],shade);
   box(-4,-10,3,2,bone);box(2,-10,3,2,bone);
   line(-3,-12,-6,-16,bone,1);line(3,-12,6,-16,bone,1);
   break;
  }
  case 4:{
   // Low burrow hunter: horizontal armored body, broad digging foreclaws.
   for(const s of [-1,1]){
    poly([[s*8,-6],[s*15,-13],[s*20,-8],[s*15,-2],[s*10,0]],ink);
    poly([[s*10,-5],[s*15,-10],[s*17,-7],[s*13,-3]],bone);
    line(s*10,3,s*15,7+stride,ink,4);line(s*10,3,s*15,7+stride,plate,2);
    line(s*7,8,s*10,12-stride,shell,3);
   }
   poly([[-9,-8],[8,-8],[14,-1],[11,8],[5,11],[-7,11],[-14,4],[-15,-1]],ink);
   poly([[-8,-6],[7,-6],[11,0],[9,6],[4,8],[-6,8],[-11,3],[-12,-1]],shell);
   for(let i=0;i<3;i++){
    poly([[-9+i,-4+i*4],[7-i,-4+i*4],[9-i,-1+i*4],[-10+i,-1+i*4]],i===1?color:plate);
    box(-3,-4+i*4,5,2,i===1?'#b7e5bf':'#c6a49b');
   }
   poly([[-7,-8],[0,-12],[7,-8],[4,-3],[-4,-3]],shade);
   box(-5,-8,3,2,acid);box(3,-8,3,2,acid);
   break;
  }
  case 5:{
   // Explosive caste: bulbous orange sacs instead of plates or harvesting tools.
   for(const s of [-1,1])for(let i=0;i<2;i++){
    line(s*7,2+i*5,s*12,5+i*6,ink,3);line(s*8,2+i*5,s*12,5+i*6,shell,1);
   }
   poly([[-8,-5],[4,-7],[11,-1],[13,7],[8,15],[-4,17],[-12,10],[-13,1]],ink);
   poly([[-7,-3],[3,-5],[9,0],[10,7],[6,12],[-3,14],[-9,9],[-10,2]],'#a4534e');
   poly([[-5,-1],[2,-3],[7,1],[8,7],[4,11],[-2,12],[-7,8],[-8,3]],orange);
   box(-5,0,4,5,'#ffe09b');box(2,4,4,5,'#ffcc78');
   line(-8,0,6,10,'#9d624b',2);line(6,0,-5,11,'#9d624b',2);
   gem(0,5,3,4,'#ffe09b');
   poly([[-6,-11],[2,-13],[7,-8],[4,-3],[-5,-3],[-8,-7]],shade);
   box(-5,-10,9,4,color);box(-4,-8,2,2,bone);box(2,-8,2,2,bone);
   line(-5,-11,-8,-16,'#ad8999',2);line(3,-12,6,-16,'#ad8999',2);
   box(-9,-17,3,3,orange);box(5,-17,3,3,orange);
   break;
  }
  case 6:{
   // Armored behemoth: plated beetle hull, four heavy feet and twin ivory horns.
   for(const s of [-1,1])for(let i=0;i<2;i++){
    poly([[s*9,-3+i*11],[s*17,-2+i*11],[s*20,5+i*9],[s*13,8+i*9],[s*9,4+i*10]],ink);
    box(s<0?-18:12,2+i*10,7,7,shell);box(s<0?-19:13,7+i*10,7,3,bone);
   }
   poly([[-11,-11],[10,-11],[17,-2],[16,11],[10,17],[-10,17],[-16,10],[-18,-1]],ink);
   poly([[-10,-9],[9,-9],[14,-1],[13,9],[8,14],[-8,14],[-13,8],[-15,-1]],shade);
   poly([[-10,-7],[-1,-10],[-1,12],[-8,11],[-12,5]],plate);
   poly([[2,-10],[10,-7],[12,5],[8,11],[2,12]],shell);
   box(-11,-3,10,4,color);box(2,-3,10,4,color);box(-8,6,7,3,color);box(2,6,7,3,color);
   box(-1,-9,3,24,'#c5a394');
   poly([[-8,-10],[-9,-17],[-5,-21],[-5,-14],[-2,-10]],ink);
   poly([[8,-10],[9,-17],[5,-21],[5,-14],[2,-10]],ink);
   poly([[-7,-11],[-7,-16],[-5,-18],[-4,-11]],bone);
   poly([[7,-11],[7,-16],[5,-18],[4,-11]],bone);
   poly([[-7,-12],[0,-16],[7,-12],[5,-6],[-5,-6]],shade);
   box(-5,-11,3,2,acid);box(3,-11,3,2,acid);
   break;
  }
  case 7:{
   // Royal caste: tall crown, a segmented tapered abdomen and six bladed limbs.
   for(const s of [-1,1]){
    poly([[s*7,-8],[s*15,-15],[s*22,-9],[s*20,-3],[s*13,-6],[s*10,0]],ink);
    poly([[s*10,-8],[s*15,-12],[s*19,-8],[s*18,-6],[s*13,-8]],bone);
    line(s*12,1,s*20,6+stride,ink,5);line(s*12,1,s*20,6+stride,shell,3);
    poly([[s*18,4+stride],[s*23,7+stride],[s*20,11],[s*18,8]],bone);
    line(s*9,10,s*17,17-stride,ink,4);line(s*10,10,s*17,17-stride,plate,2);
    poly([[s*15,16-stride],[s*20,18],[s*15,21]],bone);
   }
   poly([[-10,-10],[9,-10],[14,-2],[12,9],[7,17],[0,23],[-7,17],[-12,9],[-14,-2]],ink);
   poly([[-9,-8],[8,-8],[11,-1],[9,8],[5,15],[0,20],[-5,15],[-9,8],[-11,-1]],shell);
   for(let i=0;i<4;i++){
    const w=10-i*2,yy=-4+i*6;
    poly([[-w,yy],[0,yy-3],[w,yy],[w-2,yy+4],[0,yy+6],[-w+2,yy+4]],i%2?plate:shade);
    box(-w+2,yy,Math.max(2,w*2-4),3,color);
   }
   gem(0,1,3,5,acid);box(-1,-1,2,3,'#e3f6b1');
   poly([[-8,-14],[0,-20],[8,-14],[6,-7],[-6,-7]],ink);
   poly([[-6,-14],[0,-17],[6,-14],[4,-9],[-4,-9]],color);
   box(-5,-13,3,2,bone);box(3,-13,3,2,bone);
   poly([[-7,-16],[-9,-21],[-4,-18],[0,-22],[4,-18],[9,-21],[7,-16],[0,-18]],ink);
   poly([[-5,-17],[-6,-19],[-2,-18],[0,-20],[2,-18],[6,-19],[5,-17],[0,-16]],bone);
   break;
  }
 }
}
