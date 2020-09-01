let birdBottom = 370;
const gravityFactor = 2;

let bird = document.querySelector(".bird");
let container = document.querySelector('.game_container');
const background = document.querySelector(".background");
const ground = document.querySelector(".ground");
// bird.classList.add('animate');

// document.addEventListener('DOMContentLoaded', initGame);
initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

    gravity();
    document.addEventListener('keyup', jump);
    let obstacleInterval = setInterval(genObstacle, 3000);
    genObstacle();

    // gameOver();
}


function gravity() {

    let gravityInterval = setInterval(() => {
        birdBottom -= gravityFactor;
        bird.style.bottom = `${birdBottom}px`;
        gameOver(gravityInterval);
    }, 20);
    return gravityInterval;
}


function jump() {
    birdBottom += 70;
    bird.classList.remove('animate');
    setTimeout(() => bird.classList.add('animate'), 20);
}


function gameOver (interval) {
    if (birdBottom < 150) {
        console.log('game over');
        clearInterval(interval);
    }
}


function genObstacle () {
    let obstacleLeft = 500;
    let obstacleBottom = 150;
    let obstacleTop
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    container.appendChild(obstacle);
    obstacle.style.left = `${obstacleLeft}px`;
    obstacle.style.bottom = `${obstacleBottom}px`;

    let topObstacle = document.createElement('div');
    topObstacle.classList.add('obstacle');
    container.appendChild(topObstacle);
    topObstacle.style.left = `${obstacleLeft}px`;
    topObstacle.style.bottom = `${obstacleBottom + 430}px`;

    setInterval(() => {
        obstacleLeft -= 2
        obstacle.style.left = `${obstacleLeft}px`;
        topObstacle.style.left = `${obstacleLeft}px`;}, 20)


}

function moveObstacle () {

}