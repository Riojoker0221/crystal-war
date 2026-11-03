import {unitPainter} from './art-helpers.js';

export function drawElf(g,e,{color,time=0}){
 const {box,poly,line,gem,ink,white}=unitPainter(g,e);
 const cloth='#615283',shade='#30435d',plate='#5f7896',pearl='#c5d9e7',skin='#bacacb';
 if(e.t===1){
  // Star archer: pointed hood, quiver and a tall crescent bow.
  box(-7,5,5,8,ink);box(2,5,5,8,ink);box(-8,-4,16,11,ink);
  box(-6,-3,12,9,cloth);box(-5,-2,3,8,color);box(2,-2,3,8,color);
  box(-9,-7,3,12,'#857697');line(-9,-9,-9,-15,pearl,1);line(-7,-9,-5,-14,pearl,1);
  poly([[0,-16],[7,-11],[6,-5],[-6,-5],[-7,-11]],ink);
  poly([[0,-15],[5,-11],[4,-7],[-4,-7],[-5,-11]],cloth);
  box(-3,-10,6,4,skin);box(-2,-10,4,2,color);box(-7,-10,3,2,pearl);box(5,-10,3,2,pearl);
  line(8,-11,13,-7,ink,4);line(13,-7,15,0,ink,4);line(15,0,12,8,ink,4);line(12,8,8,11,ink,4);
  line(8,-11,12,-6,pearl,2);line(12,-6,14,0,color,2);line(14,0,11,7,color,2);line(11,7,8,11,pearl,2);
  line(8,-11,8,11,'#8293bb',1);line(3,0,15,0,white,1);poly([[17,0],[12,-2],[12,2]],white);
  box(4,-1,4,3,color);box(-5,6,10,2,'#8d80ad');
 }else if(e.t===2){
  // Blade dancer: open stance and two outward sweeping luminous swords.
  poly([[-5,3],[-9,12],[-4,13],[0,6],[4,13],[9,12],[5,3]],ink);
  poly([[-8,-5],[0,-9],[8,-5],[7,5],[0,8],[-7,5]],ink);
  poly([[-6,-4],[0,-7],[6,-4],[5,4],[0,6],[-5,4]],plate);
  box(-5,-3,10,4,color);gem(0,1,3,4,pearl);
  poly([[-6,-13],[0,-16],[6,-13],[5,-7],[-5,-7]],ink);box(-4,-12,8,5,skin);box(-5,-14,10,3,cloth);
  box(-8,-1,3,5,color);box(5,-1,3,5,color);
  line(-9,3,-14,-2,ink,4);line(9,3,14,-2,ink,4);
  poly([[-10,3],[-15,-4],[-16,-13],[-12,-9],[-10,-2]],pearl);
  poly([[10,3],[15,-4],[16,-13],[12,-9],[10,-2]],pearl);
  line(-12,-2,-14,-9,color,2);line(12,-2,14,-9,color,2);
  line(-11,4,-7,0,cloth,2);line(11,4,7,0,cloth,2);
 }else if(e.t===3){
  // Assassin: hunched dark cowl, split trailing cloak and low paired daggers.
  poly([[-6,-5],[-11,10],[-4,7],[-3,14],[1,10],[7,13],[10,7],[6,-5]],ink);
  poly([[-5,-4],[-8,8],[-3,6],[0,10],[6,9],[5,-3]],'#463d62');
  box(-6,1,12,5,shade);box(-5,5,4,7,ink);box(2,5,4,7,ink);
  poly([[0,-16],[8,-10],[6,-3],[-6,-3],[-8,-10]],ink);
  poly([[0,-15],[6,-10],[4,-4],[-4,-4],[-6,-10]],cloth);
  poly([[0,-12],[4,-8],[3,-5],[-3,-5],[-4,-8]],'#142333');
  box(-3,-8,2,2,color);box(2,-8,2,2,color);box(-1,-2,3,4,color);
  line(-6,1,-11,5,plate,3);line(6,1,11,5,plate,3);
  poly([[-12,3],[-16,-2],[-14,6],[-11,9]],pearl);poly([[12,3],[16,-2],[14,6],[11,9]],pearl);
  box(-12,6,3,2,cloth);box(10,6,3,2,cloth);
 }else if(e.t===4){
  // Mage: long flared robes, high collar and a separate crystal-tipped staff.
  poly([[-5,-5],[5,-5],[10,12],[6,15],[-8,15],[-11,12]],ink);
  poly([[-4,-4],[4,-4],[7,12],[3,13],[-6,13],[-8,11]],cloth);
  poly([[-2,-3],[2,-3],[4,12],[-3,12]],color);box(-7,10,14,2,pearl);
  poly([[0,-16],[7,-10],[5,-5],[-5,-5],[-7,-10]],ink);
  poly([[0,-14],[5,-10],[3,-7],[-3,-7],[-5,-10]],plate);box(-3,-9,6,3,skin);
  box(-7,-4,3,7,pearl);box(5,-3,5,3,color);
  line(12,-10,12,15,ink,4);line(12,-10,12,14,pearl,2);
  gem(12,-10,6,6,ink);gem(12,-11,4,4,color);gem(11,-12,2,2,white);
  box(9,-7,6,2,cloth);box(8,0,5,3,skin);gem(-11,-2,3,4,color);
 }else if(e.t===5){
  // Elemental guardian: broad stone armor, a heavy crystal shield and a fist.
  box(-10,9,8,9,ink);box(3,9,8,9,ink);box(-8,11,5,6,plate);box(4,11,5,6,plate);
  poly([[-13,-9],[13,-9],[14,8],[8,14],[-8,14],[-14,8]],ink);
  poly([[-10,-7],[10,-7],[11,7],[6,11],[-6,11],[-11,7]],shade);
  box(-8,-5,16,4,plate);gem(0,2,6,8,color);gem(-1,0,2,4,white);
  poly([[-8,-16],[0,-21],[8,-16],[7,-8],[-7,-8]],ink);
  poly([[-5,-16],[0,-19],[5,-16],[4,-10],[-4,-10]],plate);box(-4,-14,8,3,color);
  poly([[-11,-11],[-17,-8],[-17,2],[-11,7],[-7,-2]],ink);
  poly([[-13,-9],[-16,-6],[-15,1],[-11,4],[-9,-2]],pearl);
  poly([[-13,-6],[-15,-3],[-13,1],[-11,-2]],color);
  poly([[11,-9],[17,-5],[18,4],[14,9],[10,4]],ink);box(12,-4,5,8,plate);box(12,3,5,4,color);
  box(-9,8,4,3,pearl);box(6,8,4,3,pearl);
 }else if(e.t===6){
  // Void marksman: a masked cloak behind a very wide arcane crossbow.
  poly([[-5,-6],[5,-6],[11,12],[4,9],[0,15],[-5,10],[-11,12]],ink);
  poly([[-4,-4],[4,-4],[7,10],[2,8],[0,12],[-4,8],[-7,10]],'#544568');
  box(-4,2,8,6,shade);box(-5,8,4,5,ink);box(2,8,4,5,ink);
  poly([[0,-17],[7,-11],[5,-5],[-5,-5],[-7,-11]],ink);
  box(-4,-12,8,6,plate);box(-3,-11,6,3,'#26313f');box(-1,-11,3,2,color);box(-5,-14,10,3,cloth);
  line(-17,-4,-9,-8,ink,4);line(-9,-8,0,-4,ink,4);line(0,-4,9,-8,ink,4);line(9,-8,17,-4,ink,4);
  line(-17,-4,-9,-7,pearl,2);line(-9,-7,-1,-3,color,2);line(1,-3,9,-7,color,2);line(9,-7,17,-4,pearl,2);
  line(-16,-3,16,-3,'#8b77b5',1);box(-3,-6,6,7,ink);box(-2,-5,4,5,color);
  line(0,1,0,-15,pearl,2);gem(0,-16,3,5,color);box(-7,-2,4,3,pearl);box(4,-2,4,3,pearl);
 }else if(e.t===7){
  // Phoenix: swept feathered wings, beak, talons and a long three-part tail.
  const flap=Math.round(Math.sin(time*4+(e.id||0))*2);
  poly([[-3,4],[-11,17],[-4,13],[0,22],[4,13],[11,17],[3,4]],ink);
  poly([[-2,4],[-8,14],[-2,11],[0,19],[3,10],[8,14],[2,4]],cloth);
  line(0,7,0,18,color,2);line(-3,6,-7,13,pearl,2);line(3,6,7,13,pearl,2);
  for(const side of [-1,1]){
   const wing=points=>points.map(([x,y])=>[side*x,y+flap]);
   poly(wing([[2,-8],[9,-13],[20,-19],[23,-13],[19,-10],[23,-7],[17,-6],[20,-2],[13,-2],[15,3],[8,1],[3,6]]),ink);
   poly(wing([[4,-6],[10,-11],[20,-16],[19,-12],[15,-8],[20,-7],[14,-5],[17,-2],[11,-3],[12,0],[7,-1],[3,4]]),plate);
   poly(wing([[4,-5],[11,-9],[18,-13],[14,-7],[17,-6],[11,-4],[13,-1],[7,-2],[4,2]]),color);
   line(side*8,-6+flap,side*17,-12+flap,pearl,2);
  }
  poly([[0,-16],[6,-8],[5,5],[0,11],[-5,5],[-6,-8]],ink);
  poly([[0,-14],[4,-7],[3,4],[0,8],[-3,4],[-4,-7]],color);gem(0,0,2,5,white);
  poly([[-4,-16],[-1,-20],[4,-18],[6,-14],[3,-10],[-3,-11]],ink);
  poly([[-2,-16],[0,-18],[3,-16],[4,-13],[1,-11],[-2,-12]],pearl);
  box(1,-16,2,2,'#1b3446');poly([[3,-14],[9,-12],[4,-10]],'#ecd59b');
  line(-3,7,-6,10,'#e4cf9a',2);line(3,7,6,10,'#e4cf9a',2);
 }
}
