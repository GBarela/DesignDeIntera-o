const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = canvas.width;
let snake = [{x: gridSize * 5, y: gridSize * 5}];
let direction = 'RIGHT';
let food = getRandomFoodPosition();
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    if (isGameOver()) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    } else {
        setTimeout(() => {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            gameLoop();
        }, 100);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    switch (direction) {
        case 'LEFT':
            head.x -= gridSize;
            break;
        case 'UP':
            head.y -= gridSize;
            break;
        case 'RIGHT':
            head.x += gridSize;
            break;
        case 'DOWN':
            head.y += gridSize;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function changeDirection(event) {
    const key = event.keyCode;
    const goingUp = direction === 'UP';
    const goingDown = direction === 'DOWN';
    const goingRight = direction === 'RIGHT';
    const goingLeft = direction === 'LEFT';

    if (key === 37 && !goingRight) {
        direction = 'LEFT';
    } else if (key === 38 && !goingDown) {
        direction = 'UP';
    } else if (key === 39 && !goingLeft) {
        direction = 'RIGHT';
    } else if (key === 40 && !goingUp) {
        direction = 'DOWN';
    }
}

function getRandomFoodPosition() {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        };
    } while (isSnakePosition(position));
    return position;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function isSnakePosition(position) {
    return snake.some(part => part.x === position.x && part.y === position.y);
}

function isGameOver() {
    const head = snake[0];
    const hitWall = head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize;
    const hitSelf = snake.slice(1).some(part => part.x === head.x && part.y === head.y);
    return hitWall || hitSelf;
}

gameLoop();
