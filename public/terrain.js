export const W=3200,H=2080,TILE=20,NAV=40;
export const spawnPoints=[{x:400,y:400},{x:W-400,y:400},{x:400,y:H-400},{x:W-400,y:H-400}];
// Mirror the same platforms and approaches so every starting corner is equivalent.
const quarter=[[1600,180],[1440,120],[1280,180],[1120,100],[960,160],[800,100],[640,140],[480,100],[240,100],[120,220],[80,360],[160,520],[100,720],[200,840],[160,960],[240,1040]];
export const shoreline=[...quarter,...quarter.slice(0,-1).reverse().map(([x,y])=>[x,H-y]),...quarter.slice(1).map(([x,y])=>[W-x,H-y]),...quarter.slice(0,-1).reverse().map(([x,y])=>[W-x,y])];
const fissure=[[1060,160],[1220,240],[1280,400],[1200,520],[1320,660],[1280,820],[1120,900],[1040,780],[1120,620],[1000,460],[1040,300]];
const sideRift=[[160,900],[360,820],[520,880],[720,840],[900,960],[920,1040],[900,1120],[720,1240],[520,1200],[360,1260],[160,1180]];
export const chasms=[...[[false,false],[true,false],[false,true],[true,true]].map(([mx,my])=>fissure.map(([x,y])=>[mx?W-x:x,my?H-y:y])),sideRift,sideRift.map(([x,y])=>[W-x,y])];
function inPolygon(x,y,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){let a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}
export const terrainCols=W/TILE,terrainRows=H/TILE;
export const groundTiles=new Uint8Array(terrainCols*terrainRows);
for(let y=0;y<terrainRows;y++)for(let x=0;x<terrainCols;x++){let px=Math.min(x*TILE+TILE/2,W-x*TILE-TILE/2),py=Math.min(y*TILE+TILE/2,H-y*TILE-TILE/2);groundTiles[y*terrainCols+x]=inPolygon(px,py,shoreline)&&!chasms.some(poly=>inPolygon(px,py,poly))?1:0;}
export function groundAt(x,y,r=0){
 if(x-r<0||y-r<0||x+r>=W||y+r>=H)return false;
 for(let cy=Math.floor((y-r)/TILE);cy<=Math.floor((y+r)/TILE);cy++)for(let cx=Math.floor((x-r)/TILE);cx<=Math.floor((x+r)/TILE);cx++){
  if(groundTiles[cy*terrainCols+cx])continue;
  const dx=Math.max(cx*TILE-x,0,x-(cx+1)*TILE),dy=Math.max(cy*TILE-y,0,y-(cy+1)*TILE);
  if(dx*dx+dy*dy<=r*r)return false;
 }return true;
}
export const rocks=[{x:1480,y:560,r:32},{x:1720,y:560,r:32},{x:1480,y:1520,r:32},{x:1720,y:1520,r:32}];
export const mines=spawnPoints.map(p=>({x:p.x+(p.x<W/2?-70:70),y:p.y+(p.y<H/2?-80:80),capacity:1600,remaining:1600}));
for(let [x,y,capacity]of [[720,580,2000],[500,720,2200],[1520,360,2600],[900,1440,2400]])for(let [mx,my]of [[false,false],[true,false],[false,true],[true,true]])mines.push({x:mx?W-x:x,y:my?H-y:y,capacity,remaining:capacity});
mines.push(...[{x:1420,y:1040},{x:1780,y:1040}].map(p=>({...p,capacity:3000,remaining:3000})));

// A* runs only when a route changes. The simulation reuses routes between ticks.
export function findRoute(start,goal,passable,segmentClear){
 const cols=W/NAV,rows=H/NAV,size=cols*rows,point=i=>({x:(i%cols)*NAV+NAV/2,y:Math.floor(i/cols)*NAV+NAV/2});
 const near=p=>{let best=-1,score=Infinity;for(let i=0;i<size;i++){let q=point(i),d=(q.x-p.x)**2+(q.y-p.y)**2;if(d<score&&passable(q.x,q.y)&&segmentClear(p,q)){best=i;score=d;if(d<1)break;}}return best;};
 const source=near(start);if(source<0)return [];
 const costs=new Float64Array(size).fill(Infinity),parent=new Int32Array(size).fill(-1),closed=new Uint8Array(size),heap=[];
 const heuristic=i=>{let q=point(i);return Math.hypot(q.x-goal.x,q.y-goal.y);};
 function push(i,f){heap.push({i,f});let n=heap.length-1;while(n){let p=(n-1)>>1;if(heap[p].f<=f)break;[heap[p],heap[n]]=[heap[n],heap[p]];n=p;}}
 function pop(){let first=heap[0],tail=heap.pop();if(heap.length){heap[0]=tail;let n=0;while(true){let a=n*2+1,b=a+1;if(a>=heap.length)break;let k=b<heap.length&&heap[b].f<heap[a].f?b:a;if(heap[n].f<=heap[k].f)break;[heap[n],heap[k]]=[heap[k],heap[n]];n=k;}}return first.i;}
 let best=source,bestD=heuristic(source),reached=false;costs[source]=0;push(source,bestD);
 const walk=new Int8Array(size).fill(-1),ok=i=>{if(walk[i]<0){let p=point(i);walk[i]=passable(p.x,p.y)?1:0;}return !!walk[i];};
 while(heap.length){let i=pop();if(closed[i])continue;closed[i]=1;let p=point(i),d=heuristic(i);if(d<bestD){best=i;bestD=d;}
  if(d<NAV*1.5&&segmentClear(p,goal)){best=i;reached=true;break;}
  let x=i%cols,y=Math.floor(i/cols);
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy||x+dx<0||x+dx>=cols||y+dy<0||y+dy>=rows)continue;let next=(y+dy)*cols+x+dx;if(closed[next]||!ok(next)||dx&&dy&&(!ok(y*cols+x+dx)||!ok((y+dy)*cols+x)))continue;let q=point(next);if(!segmentClear(p,q))continue;let value=costs[i]+NAV*Math.hypot(dx,dy);if(value<costs[next]){costs[next]=value;parent[next]=i;push(next,value+heuristic(next));}}
 }
 let path=[];for(let i=best;i>=0;i=parent[i])path.push(point(i));path.reverse();if(reached)path.push({...goal});
 const smooth=[];let from=start,index=0;while(index<path.length){let end=index;while(end+1<path.length&&segmentClear(from,path[end+1]))end++;smooth.push(path[end]);from=path[end];index=end+1;}return smooth;
}
