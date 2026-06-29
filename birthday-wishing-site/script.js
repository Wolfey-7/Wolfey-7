const nameInput = document.getElementById('nameInput');
const wishBtn = document.getElementById('wishBtn');
const greeting = document.getElementById('greeting');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext && canvas.getContext('2d');

function resizeCanvas(){
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  if (ctx) ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
resizeCanvas();
addEventListener('resize', resizeCanvas);

function random(min, max){ return Math.random()*(max-min)+min }

class Confetto{constructor(){
  this.x = random(0, innerWidth); this.y = random(-50, -10);
  this.w = random(6,12); this.h = random(8,18);
  this.color = ['#ff4d6d','#ff7ab6','#ffd27a','#6ee7b7','#7bdff6'][Math.floor(random(0,5))];
  this.rot = random(0,Math.PI*2); this.speed = random(1,4); this.tilt = random(-0.1,0.1);
}
update(){ this.y += this.speed; this.x += Math.sin(this.y/20)*0.5; this.rot += 0.1; }
draw(ctx){ ctx.save(); ctx.translate(this.x,this.y); ctx.rotate(this.rot); ctx.fillStyle=this.color; ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h); ctx.restore(); }
}

let confetti = [];
function spawnConfetti(count=80){ confetti = []; for(let i=0;i<count;i++) confetti.push(new Confetto()); runConfetti(); }

let animId;
function runConfetti(){ if(!ctx) return; cancelAnimationFrame(animId); function frame(){ ctx.clearRect(0,0,innerWidth,innerHeight); for(let c of confetti){ c.update(); c.draw(ctx); } confetti = confetti.filter(c=>c.y < innerHeight + 40); if(confetti.length>0) animId = requestAnimationFrame(frame); } frame(); }

wishBtn.addEventListener('click', ()=>{
  const name = nameInput.value.trim() || 'You';
  greeting.classList.remove('hidden');
  greeting.textContent = `Happy Birthday, ${name}! Wishing you a joyful year ahead 🎉`;
  spawnConfetti(120);
});

nameInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') wishBtn.click(); });
