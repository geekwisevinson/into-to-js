const background = new Background(0, 0, 360, 640);
const background2 = new Background(360, 0, 360, 640);
function gameLoop() {
    context.clearRect(0, 0, 360, 640);
    background.update();
    background2.update();
    background.draw();
    background2.draw();
    context.drawImage(spritesImg, 360, 80, 80, 70, 0, 0, 80, 70);
    window.requestAnimationFrame(gameLoop);
}
gameLoop();
