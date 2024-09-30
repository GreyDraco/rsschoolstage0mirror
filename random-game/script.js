import { ctx } from "./scripts/canvasSetup.js";
import { MovingSprite, Sprite } from "./scripts/classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, START_ENEMIES_PROPS } from "./scripts/consts.js";

const castle = new Sprite(CASTLE_PROPS);
const enemyCount = 15;
const enemies = [];
function spawnEnemy(count = enemyCount) {
  let counter = 0;
  const intervalId = setInterval(function () {
    const enemy = new MovingSprite(1.5 + Math.random() * 0.5, { ...START_ENEMIES_PROPS, color: getRandomColorWithOpacity() });
    enemies.push(enemy);
    counter++;
    if (counter === count) {
      clearInterval(intervalId);
    }
  }, 300);
}

spawnEnemy(enemyCount);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  castle.display("green");
  enemies.forEach((enemy) => enemy.move());
  // enemy.display("red");
  ctx.beginPath(); // Начинает новый путь
  ctx.moveTo(CASTLE_PROPS.width + 50, CANVAS_HEIGHT); // Передвигает перо в точку (30, 50)
  ctx.lineTo(CASTLE_PROPS.width + 50, 0); // Рисует линию до точки (150, 100)
  ctx.stroke();
}
animate();

function getRandomColorWithOpacity() {
  // Generate random values for red, green, and blue (0 to 255)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Return the color in rgba format with opacity 0.5
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
