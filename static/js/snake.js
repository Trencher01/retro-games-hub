const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let score = 0;

function drawGame() {
  clearCanvas();
  moveSnake();
  checkGameOver();
  drawFood();
  drawSnake();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#00ff66";
  snake.forEach((part) =>
    ctx.fillRect(
      part.x * gridSize,
      part.y * gridSize,
      gridSize - 2,
      gridSize - 2
    )
  );
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = score;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function checkGameOver() {
  const head = snake[0];
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) resetGame();
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  document.getElementById("score").innerText = score;
}

window.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowUp" || e.key === "w") && dy === 0) {
    dx = 0;
    dy = -1;
  }
  if ((e.key === "ArrowDown" || e.key === "s") && dy === 0) {
    dx = 0;
    dy = 1;
  }
  if ((e.key === "ArrowLeft" || e.key === "a") && dx === 0) {
    dx = -1;
    dy = 0;
  }
  if ((e.key === "ArrowRight" || e.key === "d") && dx === 0) {
    dx = 1;
    dy = 0;
  }
});

setInterval(drawGame, 100);
