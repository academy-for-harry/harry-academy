const game=document.getElementById('game');
const input=document.getElementById('answer');
const scoreEl=document.getElementById('score');
const livesEl=document.getElementById('lives');
let score=0,lives=5,current=null,y=0;

function updateLives(){livesEl.textContent="❤️".repeat(lives);}

function spawn(){
 if(current) current.remove();
 current=document.createElement("div");
 current.className="card";
 const item=WORDS[Math.floor(Math.random()*WORDS.length)];
 current.dataset.word=item.word.toLowerCase();
 current.textContent=item.definition;
 game.appendChild(current);
 y=0;
 current.style.top="0px";
 input.value="";
 input.focus();
}

setInterval(()=>{
 if(!current)return;
 y+=2;
 current.style.top=y+"px";
 if(y>window.innerHeight-170){
   current.remove();
   current=null;
   lives--;
   updateLives();
   if(lives<=0){
      alert("Game Over! Score: "+score);
      location.reload();
   }else{
      spawn();
   }
 }
},30);

input.addEventListener("keydown",e=>{
 if(e.key!=="Enter") return;
 e.preventDefault();
 if(!current) return;
 if(input.value.trim().toLowerCase()===current.dataset.word){
    score++;
    scoreEl.textContent="Score: "+score;
    spawn();
 }
});

updateLives();
spawn();
