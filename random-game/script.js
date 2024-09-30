import { ctx } from "./scripts/canvasSetup.js";
import { MovingSprite, Sprite } from "./scripts/classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS, MAX_CASTLE_HP, MAX_ENEMY_HP, START_ENEMIES_PROPS, STOP_ENEMY_POS } from "./scripts/consts.js";
import { hidePopup, showPopup } from "./scripts/showPopup.js";

const repairBtn = document.querySelector(".repairBtn");

const castle = new Sprite(CASTLE_PROPS);
const enemyCount = 20;
const castleHitCount = 4;
const castleRange = 300;
let damageRecived = 0;
let gold = 100;
let targetgold = gold;
const cost = 0.1;

let enemies = [];

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
  ctx.fillText(gold, CANVAS_WIDTH / 2 - 70, HP_Y_POS);
}

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
  let damageRecived1 = 0;
  enemies.sort((a, b) => a.xPos - b.xPos);
  const closestEnemies = enemies.slice(0, Math.min(castleHitCount, enemies.length));
  closestEnemies.forEach((enemy) => {
    if (enemy.xPos < STOP_ENEMY_POS + castleRange) {
      enemy.hp = Math.max(0, enemy.hp - damage);
      damageRecived1 += damage;
    }
  });
  enemies = enemies.filter((enemy) => enemy.hp > 0);
  return damageRecived1;
}

function updateEnemyHp(damage) {
  // damageRecived += damage;
  // hitClosestEnemies(damage);
  damageRecived += hitClosestEnemies(damage);
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
      enemy.display();
    }
  });

  if (enemies.length) {
    updateEnemyHp(castle.power);
  }

  displayGold();

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

repairBtn.addEventListener("click", () => {
  showPopup();
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("repair-popup");

  const repairButtonsContainer = document.createElement("div");
  repairButtonsContainer.classList.add("repair-btns-container");

  const fullRepairBtn = document.createElement("button");
  fullRepairBtn.className = "full-repair-btn button";
  if (Math.floor((MAX_CASTLE_HP - Math.floor(castle.hp)) * cost) > gold) {
    fullRepairBtn.disabled = true;
  }

  const okRepairBtn = document.createElement("button");
  okRepairBtn.className = "button ok-repair-btn";

  const repairBarContainer = document.createElement("div");
  repairBarContainer.classList.add("repair-bar-container");
  const repairBar = document.createElement("input");
  repairBar.classList.add("repair-bar");
  const repairHp = document.createElement("span");
  repairHp.className = "repair-hp";
  const repairCost = document.createElement("span");
  repairCost.className = "repair-cost";

  repairBar.type = "range";
  repairBar.value = Math.floor(castle.hp);
  repairBar.min = Math.floor(castle.hp);
  repairBar.max = MAX_CASTLE_HP;

  repairCost.textContent = "0$";
  repairHp.textContent = `${Math.floor(castle.hp)}/${MAX_CASTLE_HP}`;

  fullRepairBtn.textContent = `full repair: ${Math.floor((MAX_CASTLE_HP - Math.floor(castle.hp)) * cost)}$`;
  okRepairBtn.textContent = "repair";

  repairBar.addEventListener("input", () => {
    repairHp.textContent = `${repairBar.value}/${MAX_CASTLE_HP}`;
    repairCost.textContent = `${Math.floor((repairBar.value - Math.floor(castle.hp)) * cost)}$`;
    if (Math.floor((repairBar.value - Math.floor(castle.hp)) * cost) > gold) {
      okRepairBtn.disabled = true;
    } else {
      okRepairBtn.disabled = false;
    }
  });

  okRepairBtn.addEventListener("click", () => {
    hidePopup();
    gold -= Math.floor((repairBar.value - Math.floor(castle.hp)) * cost);
    castle.hp = repairBar.value;
    castleHP.width = (repairBar.value * HP_MAX_WIDTH) / MAX_CASTLE_HP;
  });

  fullRepairBtn.addEventListener("click", () => {
    hidePopup();
    gold -= Math.floor((MAX_CASTLE_HP - Math.floor(castle.hp)) * cost);
    castle.hp = MAX_CASTLE_HP;
    castleHP.width = HP_MAX_WIDTH;
  });

  repairButtonsContainer.append(fullRepairBtn, okRepairBtn);
  repairBarContainer.append(repairBar, repairCost, repairHp);
  popupContent.append(repairBarContainer, repairButtonsContainer);
});
