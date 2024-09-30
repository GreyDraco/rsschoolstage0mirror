import { ctx } from "./scripts/canvasSetup.js";
import { MovingSprite, Sprite } from "./scripts/classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS, MAX_CASTLE_HP, MAX_ENEMY_HP, START_ENEMIES_PROPS } from "./scripts/consts.js";

const castle = new Sprite(CASTLE_PROPS);
const enemyCount = 20;
let damageRecived = 0;

let enemies = [];

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

/* function getEnemyHp() {
  return enemies.reduce((sum, enemy) => sum + (enemy.hp || 0), 0);
} */

function getEnemyMaxHp() {
  return enemyCount * MAX_ENEMY_HP;
}

spawnEnemy(enemyCount);

const castleHP = new Sprite({ x: HP_CASTLE_POS, y: HP_Y_POS, width: HP_MAX_WIDTH, height: HP_HEIGHT, color: "green" });
const enemiesHP = new Sprite({ x: HP_ENEMIES_POS, y: HP_Y_POS, width: 0, height: HP_HEIGHT, color: "red" });

function displayHP() {
  ctx.fillStyle = "red";
  ctx.fillRect(HP_CASTLE_POS, HP_Y_POS - HP_HEIGHT, HP_MAX_WIDTH, HP_HEIGHT);
  ctx.fillStyle = "green";
  ctx.fillRect(HP_ENEMIES_POS, HP_Y_POS - HP_HEIGHT, HP_MAX_WIDTH, HP_HEIGHT);

  castleHP.display();
  enemiesHP.display();
}

function hitClosestEnemies(damage) {
  enemies.sort((a, b) => a.xPos - b.xPos);
  const closestEnemies = enemies.slice(0, Math.min(3, enemies.length));
  closestEnemies.forEach((enemy) => {
    enemy.hp = Math.max(0, enemy.hp - damage / Math.min(3, enemies.length));
  });
  enemies = enemies.filter((enemy) => enemy.hp > 0);
}

function updateEnemyHp(damage) {
  damageRecived += damage;
  hitClosestEnemies(damage);
  const currentEnemHPWidth = (1 - (getEnemyMaxHp() - damageRecived) / getEnemyMaxHp()) * HP_MAX_WIDTH;
  enemiesHP.width = Math.min(currentEnemHPWidth, HP_MAX_WIDTH);
}

function updateCastleHp(damage) {
  castle.hp -= damage;
  const currentCastleHPWidth = (castle.hp * HP_MAX_WIDTH) / MAX_CASTLE_HP;
  castleHP.width = Math.max(currentCastleHPWidth, 0);
}

displayHP();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  displayHP();
  castle.display("green");

  enemies.forEach((enemy) => {
    if (enemy.xPos > enemy.stopPos) {
      enemy.move();
    } else {
      updateCastleHp(enemy.power);
      updateEnemyHp(castle.power);
      enemy.display();
    }
  });

  ctx.beginPath();
  ctx.moveTo(CASTLE_PROPS.width + 50, CANVAS_HEIGHT);
  ctx.lineTo(CASTLE_PROPS.width + 50, 0);
  ctx.stroke();
}
animate();

function getRandomColorWithOpacity() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
