const gameArea = document.getElementById("gameArea");
const input = document.getElementById("answer");
const scoreBox = document.getElementById("score");
const livesBox = document.getElementById("lives");

let score = 0;
let lives = 5;
let currentCard = null;
let timer = null;

function updateLives() {
    livesBox.textContent = "❤️".repeat(lives);
}

function spawnWord() {

    if (timer) clearInterval(timer);
    if (currentCard) currentCard.remove();

    const item = WORDS[Math.floor(Math.random() * WORDS.length)];

    currentCard = document.createElement("div");
    currentCard.className = "card";
    currentCard.innerText = item.d;
    currentCard.dataset.answer = item.w.toLowerCase();

    currentCard.style.left =
        Math.random() * (gameArea.clientWidth - 340) + "px";
    currentCard.style.top = "0px";

    gameArea.appendChild(currentCard);

    let y = 0;

    timer = setInterval(() => {

        y += 2;
        currentCard.style.top = y + "px";

        if (y > gameArea.clientHeight - 80) {

            clearInterval(timer);

            currentCard.remove();

            lives--;
            updateLives();

            if (lives <= 0) {
                alert("Game Over!");
                location.reload();
                return;
            }

            spawnWord();
        }

    }, 20);

}

input.addEventListener("keydown", function(e){

    if(e.key !== "Enter") return;

    e.preventDefault();

    if(!currentCard) return;

    const answer = input.value.trim().toLowerCase();

    if(answer === currentCard.dataset.answer){

        clearInterval(timer);

        currentCard.remove();

        score++;
        scoreBox.textContent = "⭐ Score : " + score;

        input.value = "";

        spawnWord();

    }else{

        input.value="";

    }

});

updateLives();
spawnWord();
input.focus();
