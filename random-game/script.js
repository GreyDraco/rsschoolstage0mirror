import { ctx } from "./scripts/canvasSetup.js";
import {
  background,
  castle,
  castleHP,
  dragon,
  enemiesHP,
  fireball,
  flame,
  lightning,
  money,
  playerLvl,
  skybox,
  tower,
} from "./scripts/characters.js";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  fireBreath,
  gameEnemyWave,
  gameParams,
  gameState,
  HP_CASTLE_POS,
  HP_ENEMIES_POS,
  HP_HEIGHT,
  HP_MAX_WIDTH,
  HP_Y_POS,
  leaders,
  leadersKey,
  sound,
  sounds,
  STOP_ENEMY_POS,
} from "./scripts/consts.js";
import "./scripts/popUps/repairPopUp.js";
import "./scripts/popUps/eventPopUp.js";
import "./scripts/popUps/mapPopUp.js";
import "./scripts/popUps/upgradePopUp.js";
import "./scripts/popUps/endPopUp.js";
import "./scripts/helpers/abilities.js";
import "./scripts/helpers/showToolbar.js";
import "./scripts/popUps/settingsPopUp.js";
import { getEnemyHp } from "./scripts/helpers/calcHp.js";
import { hitClosestEnemies } from "./scripts/helpers/hitEnemy.js";
import { openEndPopUp } from "./scripts/popUps/endPopUp.js";
import toggleVisibleToolbar from "./scripts/helpers/showToolbar.js";
import { playNextAudio, playSound } from "./scripts/helpers/playNextAudio.js";
import { openStartPopUp } from "./scripts/popUps/startPopUp.js";

const bribeCostText = document.querySelector(".bribe-cost");

if (localStorage.GrayDracoLeaders) {
  leaders.results = JSON.parse(localStorage.getItem(leadersKey));
} else {
  localStorage.setItem(leadersKey, JSON.stringify([]));
}

openStartPopUp();

function displayGold() {
  money.display();
  ctx.font = "40px BaseFont";
  ctx.fillStyle = "purple";
  ctx.fillText(gameParams.gold, CANVAS_WIDTH / 2 - 70, HP_Y_POS + 27);
}

function displayHPVal(curHP, maxHP, xPos) {
  ctx.font = "32px BaseFont";
  ctx.fillStyle = "yellow";
  ctx.fillText(`${curHP} / ${maxHP}`, xPos, HP_Y_POS + 23);
}

function displayPlayerLvl() {
  playerLvl.display();
  ctx.font = "30px BaseFont";
  ctx.fillStyle = "purple";
  ctx.fillText(gameParams.playerLvl, dragon.xPos + 200, dragon.yPos + 18);
}

function displayHP() {
  ctx.fillStyle = "red";
  ctx.fillRect(HP_CASTLE_POS, HP_Y_POS, HP_MAX_WIDTH, HP_HEIGHT);

  castleHP.display();
  if (gameState.isCombat) {
    ctx.fillStyle = "green";
    ctx.fillRect(HP_ENEMIES_POS, HP_Y_POS, HP_MAX_WIDTH, HP_HEIGHT);

    enemiesHP.display();
  }
}

function addDead() {
  let newDeadEnemies = [];
  newDeadEnemies = gameEnemyWave.onScreenEnemies.filter(
    (enemy) => enemy.hp <= 0
  );
  if (newDeadEnemies) {
    newDeadEnemies.forEach((enemy) => {
      enemy.selectAnimation("death");
      enemy.currentFrame = enemy.maxFrames;
      checkKingDead(enemy);
    });
    gameEnemyWave.deadEnemies.push(...newDeadEnemies);
  }

  gameEnemyWave.onScreenEnemies = gameEnemyWave.onScreenEnemies.filter(
    (enemy) => enemy.hp > 0
  );
}

function updateEnemyHp(damage) {
  hitClosestEnemies(damage);
  const enemyHp = getEnemyHp();
  gameState.currentEnemiesHP = Math.floor(enemyHp);
  const modifier = 1 + gameParams.abilities.princess;
  const bribeCost = Math.floor(getEnemyHp() / modifier);
  bribeCostText.textContent = bribeCost;

  const currentEnemHPWidth =
    (1 - enemyHp / gameState.totalEnemyHp) * HP_MAX_WIDTH;
  enemiesHP.width = Math.min(currentEnemHPWidth, HP_MAX_WIDTH);
  if (currentEnemHPWidth >= HP_MAX_WIDTH) {
    gameState.isCombat = false;
    toggleVisibleToolbar();
    playNextAudio("idle");
  }
}

function updateCastleHp(damage) {
  castle.hp = castle.hp > damage ? castle.hp - damage : 0;
  const currentCastleHPWidth =
    (castle.hp * HP_MAX_WIDTH) / gameParams.maxCastleHp;
  castleHP.width = Math.max(currentCastleHPWidth, 0);
}

let lastTime = 0;
displayHP();
skybox.velocity = 4;
//------------------------------------------------------<animate>------------------------------------------------
function animate(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  skybox.move(deltaTime);
  if (skybox.xPos < skybox.stopPos) {
    skybox.xPos = 0;
  }
  background.display();

  displayHP();
  displayHPVal(Math.floor(castle.hp), gameParams.maxCastleHp, 90);
  tower.display();
  castle.display();
  dragon.display(deltaTime);

  if (gameState.isCombat) {
    gameEnemyWave.onScreenEnemies.forEach((enemy) => {
      if (enemy.xPos > enemy.stopPos) {
        enemy.move(deltaTime);
        if (enemy.xPos <= enemy.stopPos) {
          enemy.selectAnimation("attack");
        }
      } else {
        updateCastleHp(enemy.power);
        enemy.display(deltaTime);
      }
    });
    checkCastleDead();
  } else {
    if (gameEnemyWave.onScreenEnemies.length) {
      gameEnemyWave.onScreenEnemies.forEach((enemy) => {
        enemy.move(deltaTime, 1);
        enemy.selectAnimation("runBack");
        if (enemy.type === "king") {
          enemy.velocity = 120;
        }
      });
      gameEnemyWave.onScreenEnemies = gameEnemyWave.onScreenEnemies.filter(
        (enemy) => enemy.xPos <= CANVAS_WIDTH
      );
      if (gameState.gameOver && !gameEnemyWave.onScreenEnemies.length) {
        toggleVisibleToolbar();
        openEndPopUp();
      }
    }
  }

  if (gameState.isCombat && gameEnemyWave.onScreenEnemies.length) {
    animateDragonAttack(deltaTime);
    updateEnemyHp(castle.power);
    displayHPVal(gameState.currentEnemiesHP, gameState.totalEnemyHp, 780);
    addDead();
  } else {
    if (!gameState.gameOver || gameState.isKingDead) {
      dragon.selectAnimation();
    } else {
      if (dragon.currentFrame < 1) {
        dragon.selectAnimation("dead");
      }
    }
  }
  if (gameEnemyWave.deadEnemies.length) {
    gameEnemyWave.deadEnemies.forEach((enemy) => {
      enemy.display(deltaTime);
      if (
        enemy.type === "king" &&
        enemy.currentFrame < 1 &&
        !gameEnemyWave.onScreenEnemies.length
      ) {
        openEndPopUp();
      }
      gameEnemyWave.deadEnemies = gameEnemyWave.deadEnemies.filter(
        (enemy) => enemy.currentFrame > 0
      );
    });
  }

  displayGold();
  displayPlayerLvl();

  if (gameState.isFireActive) {
    flame.display(deltaTime);
    if (flame.currentFrame < 1) {
      flame.currentFrame = flame.maxFrames;
      gameState.isFireActive = false;
      breathActive = false;
      fireBreath.pause();
    }
  }

  if (gameState.isFireballActive) {
    fireball.display(deltaTime);
    if (fireball.currentFrame < 1) {
      fireball.currentFrame = fireball.maxFrames;
      gameState.isFireballActive = false;
    }
  }
  if (gameState.isLightningActive) {
    lightning.display(deltaTime);
    if (lightning.currentFrame < 1) {
      lightning.currentFrame = lightning.maxFrames;
      gameState.isLightningActive = false;
    }
  }
}
animate(0);

function checkCastleDead() {
  if (castle.hp <= 0) {
    gameState.isCombat = false;
    playNextAudio("idle");
    gameState.gameOver = true;
    toggleVisibleToolbar();
    dragon.selectAnimation("death");
  }
}

function checkKingDead(enemy) {
  if (enemy.type === "king") {
    gameState.isCombat = false;
    playNextAudio("idle");
    gameState.gameOver = true;
    gameState.isKingDead = true;
    toggleVisibleToolbar();
  }
}

let breathActive = false;

function animateDragonAttack(deltaTime) {
  if (
    gameEnemyWave.onScreenEnemies.some(
      (enemy) => enemy.xPos < STOP_ENEMY_POS + gameParams.castleRange
    )
  ) {
    dragon.selectAnimation("attack");
    dragon.display(deltaTime);
    if (dragon.currentFrame === 10 && !breathActive) {
      breathActive = true;
      playSound(sounds.fireBreath, fireBreath);
      gameState.isFireActive = true;
    }
  } else {
    dragon.selectAnimation();
  }
}

console.log(`-Вёрстка +10
реализован интерфейс игры +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
-Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
-Реализовано завершение игры при достижении игровой цели +10
-По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
-Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
-Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
-Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`);
