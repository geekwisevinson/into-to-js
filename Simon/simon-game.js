let score = 0;
const possibleAnswers = ['green', 'red', 'yellow', 'blue'];
let playerAnswers = [];
let simonAnswers = [];
let gameOver = false;
let playerCanAnswer = false;
let simonSays = true;
let answer = '';

function gameLoop() {
    if (simonSays === true) {
        generateAnswer();
        simonSays = false;
        playerCanAnswer = true;
    }

    if (playerAnswers.length === simonAnswers.length) {
        checkAnswers();
        simonSays = true;
        playerCanAnswer = false;
        clearPlayerAnswers();
    }
    
    if (gameOver === true) {
        document.write('gameover');
    } else {
        document.getElementById('score').innerText = "Score: " + score;
        window.requestAnimationFrame(gameLoop);
    }
}

gameLoop();