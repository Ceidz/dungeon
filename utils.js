// ============================================================
// UTILITY FUNCTIONS & BASE COMPONENTS
// ============================================================
function ts(){return new Date().toLocaleTimeString("en-US",{hour12:false});}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function clamp(v,mn,mx){return Math.min(mx,Math.max(mn,v));}
function xpForLevel(lv){if(lv<=5)return Math.floor(75*Math.pow(lv,2.2));if(lv<=12)return Math.floor(100*Math.pow(lv,2.5));if(lv<=25)return Math.floor(140*Math.pow(lv,2.65));if(lv<=40)return Math.floor(180*Math.pow(lv,2.75));return Math.floor(220*Math.pow(lv,2.85));}
var _uid=1000;function uid(){return ++_uid;}

function genDungeon(region){
  var d=DUNGEON_DATA[region]; if(!d) return null;
  var rooms=[];
  for(var i=0;i<d.rooms;i++){
    if(i===d.rooms-1) rooms.push({type:"boss",done:false,id:uid()});
    else if(i===Math.floor(d.rooms/2)-1) rooms.push({type:"treasure",done:false,id:uid()});
    else if(i===d.rooms-2) rooms.push({type:"rest",done:false,id:uid()});
    else rooms.push({type:"combat",done:false,id:uid()});
  }
  return {name:d.name,region,rooms,roomIdx:0,reward:d.reward,boss:d.boss};
}

var Bar=({val,max,color,h=8})=>(React.createElement('div', { style: {height:h,background:"#1a1208",borderRadius:h/2,overflow:"hidden"},}, React.createElement('div', { style: {height:"100%",width:clamp((val/max)*100,0,100)+"%",background:color,borderRadius:h/2,transition:"width 0.3s"},})));
var GBar=({val,max,color="#3dd68c",h=5})=>(React.createElement('div', { style: {height:h,background:"#0d1117",borderRadius:h/2,overflow:"hidden",marginTop:3},}, React.createElement('div', { style: {height:"100%",width:clamp((val/max)*100,0,100)+"%",background:color,borderRadius:h/2,transition:"width 0.4s"},})));
var Btn=(props)=>React.createElement('button', { ...props, style: {cursor:"pointer",...props.style},});
var inp=(extra={})=>({background:"#0a0c10",border:"1px solid #1a2535",color:"#b8cfe0",borderRadius:3,padding:"5px 8px",fontSize:11,fontFamily:"monospace",outline:"none",...extra});
var sinp=(extra={})=>({background:"#0a0804",border:"1px solid #2a1e0a",color:"#d4b896",borderRadius:3,padding:"6px 10px",fontSize:12,fontFamily:"Georgia,serif",outline:"none",...extra});

