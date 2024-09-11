let score = 0;
let timeLeft = 30;
let gameInterval;

const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("startButton");
const gameContainer = document.querySelector(".game-container");
const info = document.querySelector(".info");

// Beweeg het doelwit naar een willekeurige positie in de container
function moveTarget() {
    const maxX = gameContainer.clientWidth - target.clientWidth;
    const maxY = gameContainer.clientHeight - target.clientHeight;

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
    startButton.style.display = "none"; // Verberg de startknop
    gameContainer.style.display = "block"; // Toon de game-container
    info.style.display = "block"; // Toon de score en tijd informatie

    moveTarget(); // Beweeg het doelwit direct bij de start

    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            alert(`Tijd is om! Je hebt ${score} punten gescoord.`);
            resetGame();
        }
    }, 1000);
}

// Reset de game
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Verberg de game-container en toon de startknop opnieuw
    gameContainer.style.display = "none";
    info.style.display = "none";
    startButton.style.display = "inline-block";
}

// Start het spel wanneer de startknop wordt ingedrukt
startButton.addEventListener("click", startGame);
