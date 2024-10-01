import { ctx } from "./scripts/canvasSetup.js";
import { castle, castleHP, enemiesHP } from "./scripts/characters.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, gameEnemyWave, gameParams, gameState, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS, MAX_CASTLE_HP, MAX_ENEMY_HP, STOP_ENEMY_POS } from "./scripts/consts.js";
import "./scripts/popUps/repairPopUp.js";
import "./scripts/popUps/eventPopUp.js";
import { hitClosestEnemies, spawnEnemies } from "./scripts/spawnEnemy.js";
import { getEnemyHp, getReserveEnemyHp } from "./scripts/helpers/calcHp.js";
import startBattle from "./scripts/helpers/startBattle.js";

const pushEnemyWave = document.querySelector(".DEBUG-wave");

/* let totalEnemyHp = 0; */

function displayGold() {
  ctx.beginPath();
  ctx.arc(CANVAS_WIDTH / 2 - 100, HP_Y_POS - 15, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ecec73";
  ctx.stroke();

  ctx.font = "30px Arial";
  ctx.fillStyle = "purple";
  ctx.fillText("$", CANVAS_WIDTH / 2 - 107, HP_Y_POS - 3);

  ctx.font = "40px Arial";
  ctx.fillStyle = "purple";
  ctx.fillText(gameParams.gold, CANVAS_WIDTH / 2 - 70, HP_Y_POS);
}
/* 
function getReserveEnemyHp() {
  let totalHp = 0;
  const reserveEnemies = Object.values(gameEnemyWave.incomingEnemies);
  for (let i = 0; i < reserveEnemies.length; i++) {
    totalHp += reserveEnemies[i] * MAX_ENEMY_HP * (i + 1);
  }
  return totalHp;
}

function getEnemyMaxHp() {
  return getReserveEnemyHp();
}

function getEnemyHp() {
  let currentHp = getReserveEnemyHp();
  gameEnemyWave.onScreenEnemies.forEach((enemy) => {
    currentHp += enemy.hp;
  });
  return currentHp;
} */

function displayHP() {
  ctx.fillStyle = "red";
  ctx.fillRect(HP_CASTLE_POS, HP_Y_POS - HP_HEIGHT, HP_MAX_WIDTH, HP_HEIGHT);

  castleHP.display();
  if (gameState.isCombat) {
    ctx.fillStyle = "green";
    ctx.fillRect(HP_ENEMIES_POS, HP_Y_POS - HP_HEIGHT, HP_MAX_WIDTH, HP_HEIGHT);

    enemiesHP.display();
  }
}

function updateEnemyHp(damage) {
  hitClosestEnemies(damage);
  const currentEnemHPWidth = (1 - getEnemyHp() / gameState.totalEnemyHp) * HP_MAX_WIDTH;
  console.log(getEnemyHp(), gameState.totalEnemyHp);
  enemiesHP.width = Math.min(currentEnemHPWidth, HP_MAX_WIDTH);
  if (currentEnemHPWidth >= HP_MAX_WIDTH) {
    gameState.isCombat = false;
  }
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

  gameEnemyWave.onScreenEnemies.forEach((enemy) => {
    if (enemy.xPos > enemy.stopPos) {
      enemy.move();
    } else {
      updateCastleHp(enemy.power);
      enemy.display();
    }
  });

  if (gameEnemyWave.onScreenEnemies.length) {
    updateEnemyHp(castle.power);
  }

  displayGold();

  ctx.beginPath();
  ctx.moveTo(CASTLE_PROPS.width + 50, CANVAS_HEIGHT);
  ctx.lineTo(CASTLE_PROPS.width + 50, 0);
  ctx.stroke();
}

animate();

pushEnemyWave.addEventListener("click", () => {
  gameEnemyWave.incomingEnemies.guard = 10;
  gameEnemyWave.incomingEnemies.knight = 3;
  startBattle();
});
