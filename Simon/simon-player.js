function clearPlayerAnswers() {
    playerAnswers = [];
}

greenBG.addEventListener('click', function () {
    if (playerCanAnswer) {
        playGreenAnimation();
        playerAnswers.push('green');
    }
});

redBG.addEventListener('click', function () {
    if (playerCanAnswer) {
        playRedAnimation();
        playerAnswers.push('red');
    }
});

yellowBG.addEventListener('click', function () {
    if (playerCanAnswer) {
        playYellowAnimation();
        playerAnswers.push('yellow');
    }
});

blueBG.addEventListener('click', function () {
    if (playerCanAnswer) {
        playBlueAnimation();
        playerAnswers.push('blue');
    }
});

function playGreenAnimation() {
    greenBG.style.backgroundColor = '#0cff1c';
    greenSound.currentTime = 0;
    greenSound.play();
    setTimeout(function () {
        greenBG.style.backgroundColor = 'darkgreen';
    }, 300);
}

function playRedAnimation() {
    redBG.style.backgroundColor = 'red';
    redSound.currentTime = 0;
    redSound.play();
    setTimeout(function () {
        redBG.style.backgroundColor = 'darkred';
    }, 100);
}

function playYellowAnimation() {
    yellowBG.style.backgroundColor = '#ffff28';
    yellowSound.currentTime = 0;
    yellowSound.play();
    setTimeout(function () {
        yellowBG.style.backgroundColor = '#b1b700';
    }, 100);
}

function playBlueAnimation() {
    blueBG.style.backgroundColor = '#497aff';
    blueSound.currentTime = 0;
    blueSound.play();
    setTimeout(function () {
        blueBG.style.backgroundColor = 'darkblue';
    }, 100);
}