import test from 'node:test';
import assert from 'node:assert/strict';
import {UnitMotion,visibilityCells} from './public/render-state.js';
test('movement interpolates without mutating simulation; interruption stays continuous',()=>{
 const m=new UnitMotion(),a={id:1,x:0,y:0},b={id:1,x:20,y:10};m.accept([a],0);m.accept([b],100);
 assert.deepEqual(m.position(b,150),{id:1,x:10,y:5});assert.equal(b.x,20);
 m.accept([{id:1,x:40,y:20}],150);assert.equal(m.position({id:1,x:40,y:20},150).x,10);
 assert.equal(m.position({id:1,x:40,y:20},1000).x,40);
 m.accept([{id:1,x:1000,y:20}],1100);assert.equal(m.position({id:1,x:1000,y:20},1100).x,1000);
 m.accept([],1200);assert.equal(m.tracks.size,0);m.reset();assert.equal(m.at,null);
});
test('cached visibility matches original fog including boundaries and scans',()=>{
 const friends=Array.from({length:132},(_,i)=>({x:(i*173)%2400,y:(i*317)%1520,k:i%5?'u':'b'})),scans=[{x:2300,y:1500,radius:270}];
 const actual=visibilityCells(friends,scans,2400,1520);
 for(let y=0;y<38;y++)for(let x=0;x<60;x++){
  const px=x*40+20,py=y*40+20;
  const expected=friends.some(e=>Math.hypot(e.x-px,e.y-py)<(e.k==='b'?210:170)+15)||scans.some(s=>Math.hypot(s.x-px,s.y-py)<s.radius+15);
  assert.equal(Boolean(actual[y*60+x]),expected);
 }
 assert.equal(visibilityCells([],[],2400,1520).some(Boolean),false);
});
