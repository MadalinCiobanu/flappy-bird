let birdBottom = 370;
let gravityFactor = 2;
const jumpFactor = 70;
let isGameOver = false;
let score = 0;

let bird = document.querySelector(".bird");
let container = document.querySelector('.game_container');
const background = document.querySelector(".background");
const ground = document.querySelector(".ground");


function initGame() {

    // if (isGameOver) {
    //     gInt = gravity();
    //     clearInterval(gInt);
    // }
    setTimeout(gravity);
    document.addEventListener('keyup', jump);
    let obstacleInterval = setInterval(genObstacle, 3000);
    // genObstacle();  
}


function gravity() {

    let gravityInterval = setInterval(() => {
        birdBottom -= gravityFactor;
        bird.style.bottom = `${birdBottom}px`;
        gravityFactor *= 1.05
        console.log(birdBottom < 150);
        gameOver(birdBottom < 150);
    }, 20);
    return gravityInterval;
}


function jump() {

    birdBottom += 70;
    gravityFactor = 2;
    bird.classList.remove('animate');
    setTimeout(() => bird.classList.add('animate'), 20);
}


function gameOver (condition) {
    if (condition) {
        isGameOver = true;
        // let gInt = gravity();
        // clearInterval(gInt);
        // console.log('ai cazut');
    }
}

function genObstacle () {
    let obstacleLeft = 500;
    let obstacleBottom = Math.floor(Math.random() * 150);
    let gap = 500;

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
        obstacleLeft -= 2;
        obstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.left = `${obstacleLeft}px`;
    
        // Remove obstacles if out of screen
        if (obstacleLeft === -60) {
            container.removeChild(obstacle);
            container.removeChild(topObstacle);
        }

        // Add 1 to score if bird passes obstacle
        if (obstacleLeft === 210) {
            score += 1;
            console.log(score);
        }
  
        // Check for collision with obstacle
        let birdInGap = (obstacleLeft < 290 && obstacleLeft > 210);
        let birdHitsObstacle = (birdBottom + 50 > obstacleBottom + gap || birdBottom < obstacleBottom + 350);

        if (birdInGap && birdHitsObstacle) {
            console.log('ai atins');
            gameOver(birdInGap && birdHitsObstacle);
        }  

    }

    if (!isGameOver) {
        let moveObstacles = setInterval(handleObstacles, 20);
    }
}



initGame();