let skyColor = 'skyblue';
let canvasWidth = 640;
let canvasHeight = 640;
const cloudImg = document.createElement('img');
cloudImg.src = './images/cloud.png';

const cloudImg5 = document.createElement('img');
cloudImg5.src = './images/cloud5.png';

canvas.width = canvasWidth;
canvas.height = canvasHeight;
console.log('image', cloudImg);

const gameObjects = [];
const cloudMultiplier = .3;

makeClouds(5 * cloudMultiplier, cloudImg5);
makeClouds(10 * cloudMultiplier, cloudImg);
makeClouds(4  * cloudMultiplier, cloudImg5);
makeClouds(5  * cloudMultiplier, cloudImg);
makeClouds(2  * cloudMultiplier, cloudImg5);

function makeClouds(q, img) {
    if (!q || q < 1) {return}

    for( let i = 0; i < q; i++) {
        makeRandomCloud(img);
    }
}

function makeRandomCloud(img) {
    let x = Math.random() * canvasWidth;
    let y = Math.random() * (canvasHeight / 3) - 50 ;
    let w = (Math.random() * 150) * 2 + 50;
    let h = (Math.random() * 120) * 2 + 40;
    gameObjects.push(new Cloud(x, y, w, h, img));
}

function drawSky() {
    context.fillStyle = skyColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function gameLoop() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawSky();
    gameObjects.forEach( obj => obj.update());
    gameObjects.forEach( obj => obj.draw());
    window.requestAnimationFrame(gameLoop);
}

gameLoop();
