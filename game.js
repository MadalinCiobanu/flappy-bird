let birdBottom = 370;
const gravityFactor = 2;

let bird = document.querySelector(".bird");
const background = document.querySelector(".background");
const ground = document.querySelector(".ground");

// document.addEventListener('DOMContentLoaded', initGame);
initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

    gravity();
    document.addEventListener('keyup', jump, bird);
}


function gravity() {
    // let bottom = birdBottom;

    setInterval(() => {
        birdBottom -= gravityFactor;
        // console.log('am trecut');
        bird.style.bottom = `${birdBottom}px`;
        // console.log(element.style.bottom);
    }, 20);
} 

function jump() {
    birdBottom += 70;
}