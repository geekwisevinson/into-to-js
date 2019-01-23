//  * Constants *
const CANVAS = document.getElementById('canvas');
const CTX = canvas.getContext('2d');

function drawCanvas() {
    CTX.fillStyle = 'skyblue';
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.strokeStyle = 'black';
    CTX.lineWidth = 50;
    CTX.strokeRect(0, 0, CANVAS.width, CANVAS.height);
}

// * Variables *
var dx = 0;
var dy = 0;
var gameover = false;
var score = 0;
//min is used for posistional adjustment
var min = 34;
//max is the number of grid squares in the game
var max = 25;

var snake = { x: 34, y: 34 };

//console.log('Snake.x',snake.x)

var snakeArray = [];

snakeArray.push(snake);

//console.log('SnakeArray[0].x', snakeArray[0].x)

function drawSnake(score) {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    drawCanvas();
    for (i = 0; i <= score; i++) {
        CTX.fillStyle = 'green';
        CTX.fillRect(snakeArray[i].x - 9, snakeArray[i].y - 9, 25, 25);
        CTX.strokeStyle = 'lightgreen';
        CTX.lineWidth = 2;
        CTX.strokeRect(snakeArray[i].x - 9, snakeArray[i].y - 9, 25, 25);
    }
}

function snakeGrow(score) {
    snake = { x: snakeArray[score - 1].x, y: snakeArray[score - 1].y };
    snakeArray.push(snake);
    //console.log(score, 'snake', snakeArray[score].x)
}

function snakeUpdate(score) {
    for (i = score; i >= 1; i--) {
        snakeArray[i].x = snakeArray[i - 1].x;
        snakeArray[i].y = snakeArray[i - 1].y;
        //console.log('SNAKE ', i, snakeArray[i].x)
    }
}

function animateSnake(score) {
    snakeArray[0].x += dx;
    snakeArray[0].y += dy;

}


const APPLE_CONFIG = {
    x: 250+34,
    y: 250+34,
    w: '25px',
    h: '25px',
    bgc: 'red',
}

const APPLE = document.createElement('div');

document.body.appendChild(APPLE);

function drawApple() {
    APPLE.style.width = APPLE_CONFIG.w;
    APPLE.style.height = APPLE_CONFIG.h;
    APPLE.style.backgroundColor = APPLE_CONFIG.bgc;
    //APPLE.style.border = "solid darkred";
    APPLE.style.position = 'absolute';
    randomInRange(min, max);
    APPLE.style.left = APPLE_CONFIG.x + 'px';
    APPLE.style.top = APPLE_CONFIG.y + 'px';
}


function randomInRange(min, max) {
    APPLE_CONFIG.x = (Math.floor(Math.random() * Math.floor(max - 1)) * max) + min;
    //console.log(APPLE_CONFIG.x);
    APPLE_CONFIG.y = (Math.floor(Math.random() * Math.floor(max - 1)) * max) + min;
}


function moveUp() {
    dy = -25;
}

function moveDown() {
    dy = 25;
}

function moveRight() {
    dx = 25;
}

function moveLeft() {
    dx = -25;
}

function stopDY() {
    dy = 0;
}

function stopDX() {
    dx = 0;
}


function checkCollision(score) {
    // * Out Of Bounds Code *
    if (snakeArray[0].x < 34 || snakeArray[0].x > 634 || snakeArray[0].y < 34 || snakeArray[0].y > 634) {
        stopDX();
        stopDY();
        gameover = true;
    }

    for (i = score; i > 0; i--) {
        if ((snakeArray[0].x == snakeArray[i].x) && (snakeArray[0].y == snakeArray[i].y)) {
            stopDX();
            stopDY();
            gameover = true;
        }
    }
}


function detectApple() {
    if (snakeArray[0].x === APPLE_CONFIG.x && snakeArray[0].y === APPLE_CONFIG.y) {
        //console.log('Apple Detected');
        drawApple();
        score++;
        console.log('Score: ', score);
        snakeGrow(score);
    }
}

function writeGameOver(score) {
    document.write('*Game Over* Score: ' + score);
}

function displayScore(score) {
    CTX.fillStyle = 'white';
    CTX.textBaseline = 'middle';
    CTX.textAlign = 'center';
    CTX.font = 'normal bold 20px serif';

    CTX.fillText('Score: ' + score, 50, 13);
}

function main() {

    detectApple();
    animateSnake();
    checkCollision(score);
    drawSnake(score);
    snakeUpdate(score);
    displayScore(score);

    document.addEventListener('keydown', (e) => {
        //console.log(e);
        if (e.code === 'ArrowUp' && dy != 25) {
            moveUp();
            stopDX();
            //animateSnake();
        }

        if (e.code === 'ArrowDown' && dy != -25) {
            moveDown();
            stopDX();
            //animateSnake();
        }

        if (e.code === 'ArrowRight' && dx != -25) {
            moveRight();
            stopDY();
            //animateSnake();
        }

        if (e.code === 'ArrowLeft' && dx != 25) {
            moveLeft();
            stopDY();
            //animateSnake();
        }
    })
}

// * Program *

drawCanvas();
drawApple();

interval = setInterval(() => {
    main();
    if (gameover === true) {
        clearInterval(interval);
        writeGameOver(score);
    }
}, 125);