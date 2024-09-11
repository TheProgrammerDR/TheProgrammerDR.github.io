let score = 0;
let timeLeft = 30;
let gameInterval;

const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

// Beweeg het doelwit naar een willekeurige positie in de container
function moveTarget() {
    const container = document.querySelector(".game-container");
    const maxX = container.clientWidth - target.clientWidth;
    const maxY = container.clientHeight - target.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

// Verhoog de score als op het doelwit wordt geklikt
target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
});

// Start de timer en de game
function startGame() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert(`Tijd is om! Je hebt ${score} punten gescoord.`);
            resetGame();
        }
    }, 1000);

    moveTarget(); // Beweeg het doelwit direct bij de start
}

// Reset de game
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startGame();
}

// Start de game wanneer de pagina geladen is
window.onload = startGame;
