let birdBottom = 370;
let gravityFactor = 2;
const jumpFactor = 70;
let isGameOver = false;
let score = 0;
let highScore = localStorage.getItem('highScore');
highScore = 0 ? highScore == null : highScore;

let bird = document.querySelector(".bird");
let container = document.querySelector('.game_container');
const countDown = document.querySelector('.countdown');
const scoreOnScreen = document.querySelector('.score_show');
const tryAgain = document.querySelector('#restart');
const background = document.querySelector(".background");
const ground = document.querySelector(".ground");
const gameOverMessage = document.querySelector(".game_over");
const scoreDisplay = document.querySelector("#score");
const highestScoreDisplay = document.querySelector("#highest_score");


function initGame() {

    let seconds = 3;
    let countDownInterval = setInterval(() => {
        countDown.textContent = seconds;
        seconds--;
        if (seconds === -1) {
            countDown.textContent = " ";
            clearInterval(countDownInterval);
        }
    }, 600);

    setTimeout(gravity, 2000);
    document.addEventListener('keyup', jump);
    let obstacleInterval = setInterval(genObstacle, 2000);
}


function gravity() {

    let gravityInterval = setInterval(() => {
        if (!isGameOver) {
            birdBottom -= gravityFactor;
            bird.style.bottom = `${birdBottom}px`;
            gravityFactor *= 1.05
            gameOver(birdBottom < 150);
        }
    }, 20);
    return gravityInterval;
}

function jump() {
    for (let i = 0; i < 85; i++) {
        setTimeout(() => {birdBottom += 1}, 5);
    }
    // Reset gravity
    gravityFactor = 2;

    // Remove and add animation
    bird.classList.remove('animate');
    setTimeout(() => bird.classList.add('animate'), 20);
}

function gameOver (condition) {
    if (condition) {
        isGameOver = true;
        bird.classList.remove('animate');
        bird.classList.add('dissappear');
        
        gameOverMessage.classList.add('appear');
        scoreDisplay.textContent = `SCORE ${score}`;
        tryAgain.addEventListener('click', ()=>{location.reload()});

        // Get high score
        highestScoreDisplay.textContent = `HIGH SCORE ${highScore}`;
        // setTimeout(() => {container.removeChild(bird)}, 300);
    }
}

function genObstacle () {
    let obstacleLeft = 500;
    let obstacleBottom = Math.floor(Math.random() * 150);
    let gap = 550;

    // Add bottom pipe
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    container.appendChild(obstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;

    // Add top pipe
    let topObstacle = document.createElement('div');
    topObstacle.classList.add('obstacle');
    topObstacle.classList.add('top_obstacle');
    container.appendChild(topObstacle);
    topObstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.bottom = `${obstacleBottom + gap}px`;

    // Move obstacles to the left
    // And check for collisions
    function handleObstacles () {
        obstacleLeft -= 2  ;
        obstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.left = `${obstacleLeft}px`;

        // Remove obstacles if out of screen
        if (obstacleLeft === -60) {
            container.removeChild(obstacle);
            container.removeChild(topObstacle);
        }

        // Add 1 to score if bird passes obstacle
        if ((obstacleLeft === 210 || obstacleLeft == 211) && !isGameOver) {
            score += 1;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
            }
            scoreOnScreen.textContent = score;
            // console.log(score);
        }
   
        // Check for collision with obstacle
        // console.log(obstacleLeft);
        let birdInGap = (obstacleLeft < 310 && obstacleLeft > 190);
        let touchedTop = (birdBottom + 35 > obstacleBottom + gap);
        let touchedBottom = (birdBottom < obstacleBottom + 350)
        // let birdHitsObstacle = (birdBottom + 35 > obstacleBottom + gap || birdBottom < obstacleBottom + 350);

        if (birdInGap && (touchedTop || touchedBottom)) {
            if (touchedTop) console.log('touched top');
            if (touchedBottom) console.log('touched bottom');
            gameOver(birdInGap && (touchedTop || touchedBottom));
        }  
    }

    if (!isGameOver) {
        let moveObstacles = setInterval(handleObstacles, 15);
    }
}


initGame();