import { ctx } from "./scripts/canvasSetup.js";
import {
  background,
  castle,
  castleHP,
  dragon,
  enemiesHP,
  fireball,
  lightning,
  money,
  playerLvl,
} from "./scripts/characters.js";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CASTLE_PROPS,
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
} from "./scripts/consts.js";
import "./scripts/popUps/repairPopUp.js";
import "./scripts/popUps/eventPopUp.js";
import "./scripts/popUps/mapPopUp.js";
import "./scripts/popUps/upgradePopUp.js";
import "./scripts/popUps/endPopUp.js";
import "./scripts/helpers/abilities.js";
import "./scripts/helpers/showToolbar.js";
import { getEnemyHp } from "./scripts/helpers/calcHp.js";
import startBattle from "./scripts/helpers/startBattle.js";
import { hitClosestEnemies } from "./scripts/helpers/hitEnemy.js";
import { openEndPopUp } from "./scripts/popUps/endPopUp.js";
import toggleVisibleToolbar from "./scripts/helpers/showToolbar.js";
import { playNextAudio } from "./scripts/helpers/playNextAudio.js";
import { openStartPopUp } from "./scripts/popUps/startPopUp.js";

const checkLvlBtn = document.querySelector(".DEBUG-Lvl");
const pushEnemyWave = document.querySelector(".DEBUG-wave");

if (localStorage.GrayDracoLeaders) {
  leaders.results = JSON.parse(localStorage.getItem(leadersKey));
} else {
  localStorage.setItem(leadersKey, JSON.stringify([]));
}

//------------------------------<Start of the game>---------------------------------------
//audio.volume = 0.5;
openStartPopUp();
//----------------------------------------------------------------------------------------

function displayGold() {
  money.display();
  ctx.font = "40px Arial";
  ctx.fillStyle = "purple";
  ctx.fillText(gameParams.gold, CANVAS_WIDTH / 2 - 70, HP_Y_POS + 30);
}

function displayPlayerLvl() {
  playerLvl.display();
  ctx.font = "20px Arial";
  ctx.fillStyle = "purple";
  ctx.fillText(gameParams.playerLvl, dragon.xPos + 157, dragon.yPos - 2);
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
    });
    gameEnemyWave.deadEnemies.push(...newDeadEnemies);
  }

  gameEnemyWave.onScreenEnemies = gameEnemyWave.onScreenEnemies.filter(
    (enemy) => enemy.hp > 0
  );
}

function updateEnemyHp(damage) {
  hitClosestEnemies(damage);
  const currentEnemHPWidth =
    (1 - getEnemyHp() / gameState.totalEnemyHp) * HP_MAX_WIDTH;
  enemiesHP.width = Math.min(currentEnemHPWidth, HP_MAX_WIDTH);
  if (currentEnemHPWidth >= HP_MAX_WIDTH) {
    gameState.isCombat = false;
    toggleVisibleToolbar();
    playNextAudio("idle");
  }
}

function updateCastleHp(damage) {
  castle.hp -= damage;
  const currentCastleHPWidth =
    (castle.hp * HP_MAX_WIDTH) / gameParams.maxCastleHp;
  castleHP.width = Math.max(currentCastleHPWidth, 0);
}

let lastTime = 0;
displayHP();
//------------------------------------------------------<animate>------------------------------------------------
function animate(currentTime) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  background.display();

  displayHP();

  castle.display("green");
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
        enemy.display(deltaTime);
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
    updateEnemyHp(castle.power);
    addDead();
  }
  if (gameEnemyWave.deadEnemies.length) {
    gameEnemyWave.deadEnemies.forEach((enemy) => {
      enemy.display(deltaTime);
      gameEnemyWave.deadEnemies = gameEnemyWave.deadEnemies.filter(
        (enemy) => enemy.currentFrame > 0
      );
    });
  }

  displayGold();
  displayPlayerLvl();

  ctx.beginPath();
  ctx.moveTo(CASTLE_PROPS.width + 50, CANVAS_HEIGHT);
  ctx.lineTo(CASTLE_PROPS.width + 50, 0);
  ctx.stroke();

  if (gameState.isFireballActive) {
    fireball.display(deltaTime);
  }
  if (gameState.isLightningActive) {
    lightning.display(deltaTime);
  }
}
//--------------------------------------------------------------------------------------------
animate(0);

pushEnemyWave.addEventListener("click", () => {
  gameEnemyWave.incomingEnemies.guard = 1;
  gameEnemyWave.incomingEnemies.knight = 1;
  gameEnemyWave.incomingEnemies.cultist = 1;

  startBattle();
});

checkLvlBtn.addEventListener("click", () => {
  console.log(
    "player lvl:",
    gameParams.playerLvl,
    "lightning lvl:",
    gameParams.abilities.lightning
  );
});

function checkCastleDead() {
  if (castle.hp <= 0) {
    gameState.isCombat = false;
    toggleVisibleToolbar();
    playNextAudio("idle");
    gameState.gameOver = true;
  }
}
