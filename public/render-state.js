// Presentation only: authoritative positions, visibility and combat stay unchanged.
export class UnitMotion {
 constructor(){this.reset();}
 reset(){this.tracks=new Map();this.at=null;this.duration=100;}
 position(e,now){const t=this.tracks.get(e.id);if(!t)return e;const a=Math.max(0,Math.min(1,(now-this.at)/this.duration));return {...e,x:t.x+(e.x-t.x)*a,y:t.y+(e.y-t.y)*a};}
 accept(entities,now){const next=new Map();for(const e of entities){const old=this.tracks.get(e.id);const from=old?this.position(old.entity,now):e;const snap=Math.hypot(e.x-from.x,e.y-from.y)>180;next.set(e.id,{x:snap?e.x:from.x,y:snap?e.y:from.y,entity:e});}this.duration=this.at===null?100:Math.max(60,Math.min(250,now-this.at));this.at=now;this.tracks=next;}
}
export function visibilityCells(friends,scans,width,height,cell=40){
 const cols=Math.ceil(width/cell),rows=Math.ceil(height/cell),visible=new Uint8Array(cols*rows);
 for(const source of [...friends.map(e=>({x:e.x,y:e.y,radius:e.k==='b'?210:170})),...scans]){
  const radius=source.radius+15,r2=radius*radius;
  const left=Math.max(0,Math.floor((source.x-radius)/cell)),right=Math.min(cols-1,Math.floor((source.x+radius)/cell));
  const top=Math.max(0,Math.floor((source.y-radius)/cell)),bottom=Math.min(rows-1,Math.floor((source.y+radius)/cell));
  for(let y=top;y<=bottom;y++)for(let x=left;x<=right;x++)if((x*cell+cell/2-source.x)**2+(y*cell+cell/2-source.y)**2<r2)visible[y*cols+x]=1;
 }
 return visible;
}
