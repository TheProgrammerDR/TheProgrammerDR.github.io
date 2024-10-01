//Dit zorgt voor het scorebord en de timer.
let score = 0;
let timeLeft = 30;
let gameInterval;

//Dit zorgt voor alle functies zoals de target en de startknop om goed te functioneren.
const target = document.getElementById("target");
const missedTarget = document.getElementById("missedTarget");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("startButton");
const gameContainer = document.querySelector(".game-container");
const info = document.querySelector(".info");

//Zorgt ervoor dat het doelwit naar een willekeurige positie in de container beweegt.
function moveTarget() {
    const maxX = gameContainer.clientWidth - target.clientWidth;
    const maxY = gameContainer.clientHeight - target.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

//Deze functie verhoogt de score als je op het doelwit klikt.
target.addEventListener("click", (event) => {
    event.stopPropagation(); //Voorkomt dat als je klikt de klik wordt geregistreerd als een klik op de container.
    score++;
    scoreDisplay.textContent = score;
    moveTarget();
});

//Verlaagt de score en toont tijdelijk een andere afbeelding op de plek waar je mis klikte.
gameContainer.addEventListener("click", (event) => {
    if (event.target !== target) {
        score--;
        scoreDisplay.textContent = score;

        //Registreerd de positie van de klik
        const missedX = event.clientX - gameContainer.offsetLeft - (missedTarget.clientWidth / 2);
        const missedY = event.clientY - gameContainer.offsetTop - (missedTarget.clientHeight / 2);

        //Verbergt het doelwit en toon de afbeelding als je mist op de klikpositie.
        target.style.display = "none";
        missedTarget.style.left = `${missedX}px`;
        missedTarget.style.top = `${missedY}px`;
        missedTarget.style.display = "block";

        //Wacht 0,5 seconden en zet alles weer terug.
        setTimeout(() => {
            missedTarget.style.display = "none"; //Verbergt de misserafbeelding.
            target.style.display = "block"; //Toont de ballon weer.
            moveTarget(); //Beweegt het doelwit naar een nieuwe plek.
        }, 500); //Timer voor hoelang de misserafbeelding wordt getoont als je misklikt.
    }
});

//Start de timer en de game.
function startGame() {
    startButton.style.display = "none"; //Verbergt de startknop.
    gameContainer.style.display = "block"; //Toont de game-container.
    info.style.display = "block"; //Toon de score en tijd onder de game-container.

    moveTarget(); //Beweegt de ballon direct bij de start.

    //Zorgt ervoor dat je nadat de timer is afgelopen een notificatie krijgt van hoeveel punten je hebt gescoord.
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

//Reset de game.
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    //Verbergt de game-container en toon de startknop opnieuw.
    gameContainer.style.display = "none";
    info.style.display = "none";
    startButton.style.display = "inline-block";
}

//Start het spel wanneer de startknop wordt ingedrukt.
startButton.addEventListener("click", startGame);
