import {drawHuman} from './human-art.js';
import {drawMachine} from './machine-art.js';
import {drawElf} from './elf-art.js';
import {drawSwarm} from './swarm-art.js';
export function drawCombatUnit(g,e,{f,color,time=0}){
 [drawHuman,drawMachine,drawElf,drawSwarm][f](g,e,{color,time});
}
