const gameArea=document.getElementById("gameArea");
const input=document.getElementById("answer");
const scoreBox=document.getElementById("score");
const livesBox=document.getElementById("lives");

let score=0;
let lives=5;
let current=null;
let timer=null;

function updateLives(){
    livesBox.textContent="❤️".repeat(lives);
}

function spawn(){
    if(current) current.remove();

    const item=WORDS[Math.floor(Math.random()*WORDS.length)];

    current=document.createElement("div");
    current.className="card";
    current.dataset.answer=item.word.toLowerCase();
    current.textContent=item.definition;
    current.style.top="0px";

    gameArea.appendChild(current);

    let y=0;

    clearInterval(timer);

    timer=setInterval(()=>{
        y+=2;
        current.style.top=y+"px";

        if(y>gameArea.clientHeight-70){

            clearInterval(timer);

            current.remove();

            lives--;

            updateLives();

            if(lives<=0){
                alert("Game Over!\nScore : "+score);
                location.reload();
                return;
            }

            spawn();
        }

    },30);

    input.value="";
    input.focus();
}

input.addEventListener("keydown",function(e){

    if(e.key!=="Enter") return;

    e.preventDefault();

    if(!current) return;

    const answer=input.value.trim().toLowerCase();

    if(answer===current.dataset.answer){

        score++;

        scoreBox.textContent="⭐ Score : "+score;

        clearInterval(timer);

        current.remove();

        spawn();
    }

});

updateLives();
spawn();
