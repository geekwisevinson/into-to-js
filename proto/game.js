let skyColor = 'skyblue';
let canvasWidth = 640;
let canvasHeight = 640;

canvas.width = canvasWidth;
canvas.height = canvasHeight;



function drawSky() {
    context.fillStyle = skyColor;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawCloud() {
    context.beginPath();
    context.moveTo(170, 80);
    context.bezierCurveTo(130, 100, 130, 150, 230, 150);
    context.bezierCurveTo(250, 180, 320, 180, 340, 150);
    context.bezierCurveTo(420, 150, 420, 120, 390, 100);
    context.bezierCurveTo(430, 40, 370, 30, 340, 50);
    context.bezierCurveTo(320, 5, 250, 20, 250, 50);
    context.bezierCurveTo(200, 5, 150, 20, 170, 80);
    context.closePath();
    context.lineWidth = 5;
    context.fillStyle = 'white';
    context.fill();
    context.strokeStyle = '#8ED6FF';
    context.stroke();
}

function gameLoop() {
    context.clearRect(0, 0, canvasWidth, canvasHeight );
    drawSky();
    drawCloud()

}

gameLoop();
