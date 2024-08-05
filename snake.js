const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const grid = 20;
let count = 0;
let score = 0;
let snake = {
  x: grid * 5,
  y: grid * 5,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
let apple = {
  x: grid * 10,
  y: grid * 10
};

let gameLoop;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame() {
  snake.x = grid * 5;
  snake.y = grid * 5;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  apple.x = getRandomInt(0, 20) * grid;
  apple.y = getRandomInt(0, 20) * grid;
  score = 0;
  scoreDisplay.textContent = 'Score: ' + score;
}

function loop() {
  gameLoop = requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    resetGame();
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  ctx.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      scoreDisplay.textContent = 'Score: ' + score;
      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        resetGame();
      }
    }
  });
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft' && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === 'ArrowUp' && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === 'ArrowRight' && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === 'ArrowDown' && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

function startGame() {
  if (!gameLoop) {
    loop();
  }
}

function stopGame() {
  if (gameLoop) {
    cancelAnimationFrame(gameLoop);
    gameLoop = null;
  }
}

resetGame();