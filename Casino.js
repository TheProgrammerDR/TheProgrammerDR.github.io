let score = 0;
let timeLeft = 30;
let gameInterval;

const target = document.getElementById("target");
const missedTarget = document.getElementById("missedTarget");
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
target.addEventListener("click", (event) => {
    event.stopPropagation(); // Voorkom dat de klik wordt geregistreerd als een klik op de container
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
});

// Verlaag de score en toon tijdelijk een andere afbeelding op de misserlocatie
gameContainer.addEventListener("click", (event) => {
    if (event.target !== target) {
        score--;
        scoreDisplay.textContent = score;

        // Haal de positie van de klik op
        const missedX = event.clientX - gameContainer.offsetLeft - (missedTarget.clientWidth / 2);
        const missedY = event.clientY - gameContainer.offsetTop - (missedTarget.clientHeight / 2);

        // Verberg het doelwit en toon de misserafbeelding op de klikpositie
        target.style.display = "none";
        missedTarget.style.left = `${missedX}px`;
        missedTarget.style.top = `${missedY}px`;
        missedTarget.style.display = "block";

        // Wacht 2 seconden en zet alles weer terug
        setTimeout(() => {
            missedTarget.style.display = "none"; // Verberg de misserafbeelding
            target.style.display = "block"; // Toon het doelwit weer
            moveTarget(); // Beweeg het doelwit naar een nieuwe plek
        }, 2000); // 2 seconden
    }
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
