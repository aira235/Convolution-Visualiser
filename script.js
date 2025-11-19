
function genSignal(type, n=100){
  let x=[];
  for(let i=0;i<n;i++){
    let t=i/10;
    if(type==='sine') x.push(Math.sin(t));
    else if(type==='square') x.push((Math.sin(t)>0)?1:-1);
    else if(type==='impulse') x.push(i===50?1:0);
    else if(type==='step') x.push(i>30?1:0);
  }
  return x;
}

function convolve(a,b){
  let y = Array(a.length+b.length-1).fill(0);
  for(let i=0;i<a.length;i++){
    for(let j=0;j<b.length;j++){
      y[i+j]+=a[i]*b[j];
    }
  }
  return y;
}

function draw(arr){
  let c=document.getElementById("canvas");
  let ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.beginPath();
  let max=Math.max(...arr.map(Math.abs));
  for(let i=0;i<arr.length;i++){
    let x=i*(c.width/arr.length);
    let y=c.height/2 - (arr[i]/max)*(c.height/2-10);
    if(i===0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }
  ctx.strokeStyle="#003366";
  ctx.stroke();
}

function generate(){
  let s1=genSignal(document.getElementById("sig1").value);
  let s2=genSignal(document.getElementById("sig2").value);
  let y=convolve(s1,s2);
  draw(y);
}
