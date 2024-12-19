let currentGame = "main"; // Основная игра по умолчанию
let coins = []; // Массив для монет
let pipes = []; // Массив для труб
const coinImage = new Image();
coinImage.src = './static/images/coin.png';

const startMainGameButton = document.getElementById('startMainGame');
const startMiniGameButton = document.getElementById('startMiniGame');

const backgroundImage = new Image();
backgroundImage.src = './static/images/background.png';

const pipeTopCapImage = new Image();
pipeTopCapImage.src = './static/images/pipeTopCap.png';

const pipeTopMiddleImage = new Image();
pipeTopMiddleImage.src = './static/images/pipeTopMiddle.png';

const pipeBottomCapImage = new Image();
pipeBottomCapImage.src = './static/images/pipeBottomCap.png';

const pipeBottomMiddleImage = new Image();
pipeBottomMiddleImage.src = './static/images/pipeBottomMiddle.png';

const birdImage = new Image();
birdImage.src = './static/images/bird.png';

const gameOverImage = new Image();
gameOverImage.src = './static/images/gameOver.png';

const menu = document.getElementById('menu');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird, pipeWidth, pipeGap, frame, gameOver, score;

// Кнопки для выбора режима игры
startMainGameButton.addEventListener('click', () => {
    currentGame = "main";
    menu.style.display = 'none';
    startGame();
});

startMiniGameButton.addEventListener('click', () => {
    currentGame = "miniGame";
    menu.style.display = 'none';
    startGame();
});

function startGame() {
    canvas.width = 400;
    canvas.height = 600;

    bird = { x: 50, y: 300, size: 20, gravity: 0.5, lift: -7, velocity: 0 };
    pipes = [];
    coins = [];
    pipeWidth = 60;
    pipeGap = 150;
    frame = 0;
    gameOver = false;
    score = 0;

    if (currentGame === "main") {
        animateMainGame();
    } else if (currentGame === "miniGame") {
        animateMiniGame();
    }
}

// Анимация основной игры
function animateMainGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    drawBird();
    updateBird();

    createPipes();
    drawPipes();

    checkCollision();
    checkScore(); // Проверяем прохождение труб

    drawScore();

    frame++;
    requestAnimationFrame(animateMainGame);
}


// Анимация мини-игры
function animateMiniGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    drawBird();
    updateBird();

    createCoins();
    drawCoins();

    checkCoinCollision();

    drawScore();

    frame++;
    requestAnimationFrame(animateMiniGame);
}

// Отрисовка птички
function drawBird() {
    ctx.drawImage(birdImage, bird.x - bird.size, bird.y - bird.size, bird.size * 2, bird.size * 2);
}

// Обновление положения птички
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.size >= canvas.height || bird.y - bird.size <= 0) {
        endGame();
    }
}

// Создание труб
function createPipes() {
    if (frame % 150 === 0) {
        const topHeight = Math.random() * (canvas.height / 2 - pipeGap) + 50; // Верхняя труба
        pipes.push({
            x: canvas.width,
            top: topHeight,
            bottom: topHeight + pipeGap,
            scored: false // Добавляем флаг для учёта очков
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2; // Скорость движения труб
    });

    // Удаление труб за пределами экрана
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}


// Отрисовка труб
function drawPipes() {
    pipes.forEach(pipe => {
        // Верхняя труба
        ctx.drawImage(pipeTopCapImage, pipe.x, pipe.top - 20, pipeWidth, 20);
        for (let y = 0; y < pipe.top - 20; y += 20) {
            ctx.drawImage(pipeTopMiddleImage, pipe.x, y, pipeWidth, 20);
        }

        // Нижняя труба
        ctx.drawImage(pipeBottomCapImage, pipe.x, pipe.bottom, pipeWidth, 20);
        for (let y = pipe.bottom + 20; y < canvas.height; y += 20) {
            ctx.drawImage(pipeBottomMiddleImage, pipe.x, y, pipeWidth, 20);
        }
    });
}

// Создание монет
function createCoins() {
    if (frame % 120 === 0) { // Частота появления монет
        const coinY = Math.random() * (canvas.height - 40);
        coins.push({ x: canvas.width, y: coinY });
    }

    coins.forEach(coin => {
        coin.x -= 2; // Скорость движения монет
    });

    // Удаление монет за пределами экрана
    coins = coins.filter(coin => coin.x > -20);
}

// Отрисовка монет
function drawCoins() {
    coins.forEach(coin => {
        ctx.drawImage(coinImage, coin.x, coin.y, 20, 20);
    });
}
// Проверка прохождения труб для увеличения счёта
function checkScore() {
    pipes.forEach(pipe => {
        if (!pipe.scored && bird.x > pipe.x + pipeWidth) {
            pipe.scored = true; // Устанавливаем флаг, чтобы засчитать очки только один раз
            score += 1; // Увеличиваем счёт
        }
    });
}

// Проверка столкновений с трубами
function checkCollision() {
    pipes.forEach(pipe => {
        if (
            bird.x + bird.size > pipe.x &&
            bird.x - bird.size < pipe.x + pipeWidth &&
            (bird.y - bird.size < pipe.top || bird.y + bird.size > pipe.bottom)
        ) {
            endGame();
        }
    });
}

// Проверка столкновений с монетами
function checkCoinCollision() {
    coins.forEach((coin, index) => {
        if (
            bird.x < coin.x + 20 &&
            bird.x + bird.size > coin.x &&
            bird.y < coin.y + 20 &&
            bird.y + bird.size > coin.y
        ) {
            coins.splice(index, 1);
            score += 1;
        }
    });
}

// Отображение счёта
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Конец игры
// Конец игры
function endGame() {
    gameOver = true;

    // Отрисовка фона
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Отрисовка изображения "Game Over"
    if (gameOverImage.complete) {
        ctx.drawImage(
            gameOverImage,
            canvas.width / 2 - 150,
            canvas.height / 2 - 100,
            300,
            200
        );
    }

    // Отрисовка текущего и лучшего счёта
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 40, canvas.height / 2 - 10);
    ctx.fillText(`Best: ${localStorage.getItem('bestScore') || 0}`, canvas.width / 2 - 40, canvas.height / 2 + 20);

    // Сохранение лучшего результата
    const bestScore = localStorage.getItem('bestScore') || 0;
    if (score > bestScore) {
        localStorage.setItem('bestScore', score);
    }

    // Отрисовка кнопки "OK"
    ctx.fillStyle = '#218DB6'; // Фон кнопки
    ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 40); // Координаты и размеры кнопки

    ctx.fillStyle = 'white'; // Цвет текста
    ctx.font = '20px Arial';
    ctx.fillText('RESTART', canvas.width / 2 - 38, canvas.height / 2 + 88); // Текст на кнопке
}

// Обработчик кликов на кнопку "OK"
document.addEventListener("click", event => {
    if (gameOver) {
        const clickX = event.clientX - canvas.offsetLeft;
        const clickY = event.clientY - canvas.offsetTop;

        // Проверяем, попал ли клик в область кнопки "OK"
        if (
            clickX > canvas.width / 2 - 50 &&
            clickX < canvas.width / 2 + 50 &&
            clickY > canvas.height / 2 + 60 &&
            clickY < canvas.height / 2 + 100
        ) {
            restartGame();
        }
    }
});


// Перезапуск игры
function restartGame() {
    startGame();
}

document.addEventListener("click", event => {
    if (gameOver) {
        const clickX = event.clientX - canvas.offsetLeft;
        const clickY = event.clientY - canvas.offsetTop;

        if (
            clickX > canvas.width / 2 - 50 &&
            clickX < canvas.width / 2 + 50 &&
            clickY > canvas.height / 2 + 40 &&
            clickY < canvas.height / 2 + 80
        ) {
            restartGame();
        }
    }
});

document.addEventListener("keydown", e => {
    if (e.code === "Space") {
        bird.velocity = bird.lift;
    }
});
