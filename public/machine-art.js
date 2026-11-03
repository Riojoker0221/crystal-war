import {unitPainter} from './art-helpers.js';
export function drawMachine(g,e,{color:c,time=0}){
 const {box,poly,line,gem,ink,steel,white}=unitPainter(g,e),dark='#263c4e',plate='#54717e',energy='#96dfff';
 const pulse=Math.round(Math.sin(time*5+(e.id||0)));
 switch(e.t){
 case 1: // Sentinel: square visor, armored shoulders and a single long laser rifle.
  box(-8,4,6,10,ink);box(2,4,6,10,ink);box(-7,11,6,3,plate);box(2,11,6,3,plate);
  box(-10,-6,20,13,ink);box(-7,-5,14,11,c);box(-4,-1,8,5,dark);box(-2,0,4,2,energy);
  box(-13,-6,5,7,plate);box(8,-6,5,7,plate);box(-6,-15,12,10,ink);box(-4,-13,8,6,steel);box(-3,-11,7,2,energy);
  box(-1,-18,2,4,plate);box(0,-18,3,2,c);
  box(9,-11,5,18,ink);box(10,-10,3,13,steel);box(10,-13,3,4,energy);box(8,3,7,3,dark);
  break;
 case 2: // Arc unit: twin open electrical forks and a cylindrical battery core.
  box(-8,7,6,8,ink);box(3,7,6,8,ink);box(-7,11,4,3,steel);box(4,11,4,3,steel);
  poly([[-7,-9],[7,-9],[10,-4],[8,8],[-8,8],[-10,-4]],ink);
  box(-6,-7,12,14,plate);box(-4,-5,8,9,c);box(-2,-4,4,8,energy);box(-4,6,8,3,dark);
  box(-4,-14,8,6,ink);box(-3,-12,6,3,white);
  for(const s of [-1,1]){box(s<0?-15:10,-8,5,12,dark);box(s<0?-14:11,-7,3,4,c);box(s<0?-14:11,0,3,3,c);line(s*12,-7,s*16,-14,steel,2);line(s*12,-7,s*9,-14,steel,2);box(s<0?-16:14,-16,3,4,energy);}
  line(-16,-15,-12,-12-pulse,energy,1);line(-12,-12-pulse,-9,-15,white,1);
  break;
 case 3: // Repair drone: hovering cross-wing chassis, open maintenance claws.
  poly([[-5,-10],[5,-10],[10,-4],[8,6],[0,12],[-8,6],[-10,-4]],ink);
  poly([[-4,-8],[4,-8],[7,-3],[5,5],[0,8],[-5,5],[-7,-3]],white);
  box(-4,-4,8,8,c);box(-1,-4,2,8,white);box(-4,-1,8,2,white);
  for(const s of [-1,1]){line(s*6,-3,s*15,-8,plate,4);box(s<0?-18:13,-10,5,5,c);line(s*7,4,s*14,9,steel,2);line(s*14,9,s*12,13,steel,2);box(s<0?-15:12,14+pulse,3,3,energy);}
  box(-2,-14,4,3,energy);box(-3,12+pulse,6,2,energy);
  break;
 case 4: // Hunter: broad crescent hover skates around an exposed forward lens.
  poly([[-20,6],[-15,-9],[-8,-14],[-6,-4],[6,-4],[8,-14],[15,-9],[20,6],[11,12],[-11,12]],ink);
  poly([[-17,5],[-13,-7],[-9,-10],[-10,6],[-5,9],[-12,9]],plate);
  poly([[17,5],[13,-7],[9,-10],[10,6],[5,9],[12,9]],plate);
  line(-14,-5,-14,3,c,3);line(14,-5,14,3,c,3);
  poly([[-7,-8],[7,-8],[10,2],[5,10],[-5,10],[-10,2]],c);box(-4,-3,8,9,dark);gem(0,-3,3,5,energy);
  box(-16,11+pulse,7,2,energy);box(9,11+pulse,7,2,energy);box(-2,-14,4,6,steel);
  break;
 case 5: // Colossus: four heavy feet, narrow waist, huge fists and pauldrons.
  for(const s of [-1,1]){line(s*8,5,s*14,13,plate,6);box(s<0?-18:10,10,8,8,ink);box(s<0?-17:11,13,6,3,c);line(s*9,-4,s*16,2,steel,5);box(s<0?-21:13,0,8,10,ink);box(s<0?-20:14,2,6,6,plate);}
  poly([[-11,-12],[11,-12],[13,0],[6,9],[-6,9],[-13,0]],ink);
  poly([[-9,-10],[9,-10],[10,0],[4,6],[-4,6],[-10,0]],c);box(-5,-5,10,7,dark);gem(0,-3,3,4,energy);
  box(-17,-13,10,8,plate);box(7,-13,10,8,plate);box(-16,-12,8,2,c);box(8,-12,8,2,c);
  box(-5,-19,10,8,ink);box(-4,-18,8,5,steel);box(-3,-16,6,2,energy);
  break;
 case 6: // Railgun walker: splayed stabilizers and a cannon longer than its hull.
  for(const s of [-1,1]){line(s*7,0,s*17,10,steel,4);box(s<0?-21:14,8,7,7,ink);box(s<0?-20:15,11,5,2,c);line(s*7,-2,s*15,-9,plate,4);box(s<0?-18:13,-12,5,5,ink);}
  poly([[-11,-7],[11,-7],[13,6],[8,12],[-8,12],[-13,6]],ink);box(-9,-5,18,12,plate);box(-7,0,14,7,c);
  box(-5,-10,10,18,ink);box(-4,-19,8,20,dark);box(-5,-22,3,18,steel);box(2,-22,3,18,steel);box(-2,-20,4,17,energy);box(-5,-23,10,3,c);
  box(-6,7,12,3,steel);box(-3,10,6,4,dark);
  break;
 case 7: // Annihilator: four armored legs carry a large containment ring and beam core.
  for(const s of [-1,1]){line(s*10,4,s*18,13,plate,7);box(s<0?-23:15,11,8,9,ink);box(s<0?-22:16,15,6,3,c);line(s*10,-6,s*19,-12,steel,5);box(s<0?-22:17,-14,6,8,ink);box(s<0?-21:18,-13,4,5,c);}
  poly([[-12,-16],[12,-16],[17,-7],[17,5],[10,14],[-10,14],[-17,5],[-17,-7]],ink);
  poly([[-10,-13],[10,-13],[14,-5],[14,4],[8,11],[-8,11],[-14,4],[-14,-5]],plate);
  poly([[-7,-11],[7,-11],[11,-4],[11,3],[6,8],[-6,8],[-11,3],[-11,-4]],c);
  poly([[-5,-8],[5,-8],[8,-3],[8,2],[4,6],[-4,6],[-8,2],[-8,-3]],dark);
  gem(0,-2,5,8,energy);box(-2,-6,4,8,white);box(-3,-21,6,9,ink);box(-1,-22,2,8,energy);
  box(-11,11,22,3,c);box(-5,14,10,4,steel);box(-3,17,6,4,ink);
  break;
 case 8: // EMP adjudicator: slender chassis suspended between two tall induction rings.
  for(const s of [-1,1]){
   const ring=points=>points.map(([dx,dy])=>[s*13+dx,dy+pulse]);
   poly(ring([[-5,-17],[3,-17],[7,-12],[7,4],[3,9],[-5,9],[-8,4],[-8,-12]]),ink);
   poly(ring([[-4,-15],[2,-15],[5,-11],[5,3],[2,7],[-4,7],[-6,3],[-6,-11]]),steel);
   poly(ring([[-2,-12],[1,-12],[3,-9],[3,1],[0,4],[-2,4],[-4,1],[-4,-9]]),dark);
   box(s*13-4,-14+pulse,7,2,c);box(s*13-4,5+pulse,7,2,c);
   box(s*13-7,-7+pulse,2,6,energy);box(s*13+4,-7+pulse,2,6,energy);
   line(s*6,-2,s*10,-2,plate,3);box(s*13-1,-19+pulse,2,3,energy);
  }
  box(-6,2,5,12,ink);box(2,2,5,12,ink);box(-6,10,5,3,plate);box(2,10,5,3,plate);
  poly([[-6,-12],[6,-12],[8,-2],[4,6],[-4,6],[-8,-2]],ink);
  poly([[-4,-10],[4,-10],[5,-2],[2,3],[-2,3],[-5,-2]],c);
  box(-2,-8,4,7,dark);box(-1,-7,2,5,energy);box(-4,2,8,3,steel);
  box(-5,-20,10,9,ink);box(-3,-18,6,5,plate);box(-3,-17,6,2,energy);
  box(-1,-23,2,4,steel);box(-2,-24,4,2,c);box(-3,15+pulse,6,2,energy);
  break;
 }
}
