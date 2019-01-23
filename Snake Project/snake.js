//  * Constants *
const CANVAS = document.getElementById('canvas');
const CTX = canvas.getContext('2d');
const MAX = 625;

class SNAKE_CONFIG {
    constructor(x, y, w, h, bgc) {
        this.x = 34;
        this.y = 34;
        this.w = '25px';
        this.h = '25px';
        this.bgc = 'green';
    }
}

var snakeArray: SNAKE_CONFIG[] = new SNAKE_CONFIG[MAX];

function snakeGrow(score) {
    
}


const SNAKE = document.createElement('div');

document.body.appendChild(SNAKE);

const APPLE_CONFIG = {
    x: 250+34,
    y: 250+34,
    w: '25px',
    h: '25px',
    bgc: 'red',
}

const APPLE = document.createElement('div');

document.body.appendChild(APPLE);

// * Variables *
var dx = 0;
var dy = 0;
var gameover = false;
var score = 0;
//min is used for posistional adjustment
var min = 34;
//max is the number of grid squares in the game
var max = 25;
// * Functions *

function drawCanvas() {
    CTX.fillStyle = 'skyblue';
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.strokeStyle = 'black';
    CTX.lineWidth = 50;
    CTX.strokeRect(0, 0, CANVAS.width, CANVAS.height);
}

/*
function drawSnake() {
    SNAKE.style.width = SNAKE_CONFIG.w;
    SNAKE.style.height = SNAKE_CONFIG.h;
    SNAKE.style.backgroundColor = SNAKE_CONFIG.bgc;
   // SNAKE.style.border = "solid lightgreen";
    SNAKE.style.position = 'absolute';
    SNAKE.style.left = SNAKE_CONFIG.x + 'px';
    SNAKE.style.top = SNAKE_CONFIG.y + 'px';
}*/

function drawSnake() {
    SNAKE.style.width = snakeArray[score].w;
    SNAKE.style.height = snakeArray[score].h;
    SNAKE.style.backgroundColor = snakeArray[score].bgc;
    // SNAKE.style.border = "solid lightgreen";
    SNAKE.style.position = 'absolute';
    SNAKE.style.left = snakeArray[score].x + 'px';
    SNAKE.style.top = snakeArray[score].y + 'px';
}

function randomInRange(min, max) {
    APPLE_CONFIG.x = (Math.floor(Math.random() * Math.floor(max - 1)) * max) + min;
    //console.log(APPLE_CONFIG.x);
    APPLE_CONFIG.y = (Math.floor(Math.random() * Math.floor(max - 1)) * max) + min;
}

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

function animateSnake() {
    SNAKE_CONFIG.x += dx;
    SNAKE_CONFIG.y += dy;

    // * OOB Code *
    if (SNAKE_CONFIG.x < 34 || SNAKE_CONFIG.x > 634 || SNAKE_CONFIG.y < 34 || SNAKE_CONFIG.y > 634) {
        stopDX();
        stopDY();
        gameover = true;
    }

    //console.log(SNAKE_CONFIG.x);
    //console.log(SNAKE_CONFIG.y);
}

function writeGameOver() {
    document.write('Game Over');
}

function detectApple() {
    if (SNAKE_CONFIG.x === APPLE_CONFIG.x && SNAKE_CONFIG.y === APPLE_CONFIG.y) {
        //console.log('Apple Detected');
        drawApple();
        score++;
        console.log('Score: ', score);
    }
}

snakeGrow(score);

function main() {
    drawSnake();
    animateSnake();
    detectApple();
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
        writeGameOver();
    }
}, 125);


//Bounds of the game are 34, 634. Anything over / under is game over
// * Still needed *
//apple random generation
//apple eaten detection
//snake growth
//game over for snake self collision
//score display
