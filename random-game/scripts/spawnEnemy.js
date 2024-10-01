import { MovingSprite } from "./classes/Sprites.js";
import { gameEnemyWave, gameEnemies, gameParams, STOP_ENEMY_POS } from "./consts.js";

/* export function spawnEnemy(gameEnemyWave) {
  let counter = 0;
  const intervalId = setInterval(function () {
    const enemy = new MovingSprite(1.5 + Math.random() * 0.5, { ...START_ENEMIES_PROPS, color: getRandomColorWithOpacity() });
    gameEnemyWave.onScreenEnemies.push(enemy);
    gameEnemyWave.incomingEnemies.pop;
    counter++;
    if (counter === count) {
      clearInterval(intervalId);
    }
  }, 300);
} */

export function spawnEnemies(gameEnemyWave) {
  let counter = 0;
  let enemySelector = 0;
  const enemyProperties = Object.keys(gameEnemies);
  const totalEnemyCount = gameEnemyWave.incomingEnemies.reduce((sum, i) => sum + i, 0);
  const intervalId = setInterval(function () {
    enemySelector = Math.floor(Math.random() * enemyProperties.length);
    if (gameEnemyWave.incomingEnemies[enemySelector] === 0) {
      enemySelector = gameEnemyWave.incomingEnemies.findIndex((num) => num > 0);
    }
    spawnEnemy(enemySelector, enemyProperties);
    counter++;

    if (counter === totalEnemyCount) {
      clearInterval(intervalId);
    }
  }, 300);
}

function spawnEnemy(enemySelector, enemyProperties) {
  const enemy = new MovingSprite(1.5 + Math.random() * 0.5 - enemySelector * 0.3, { ...gameEnemies[enemyProperties[enemySelector]], color: getRandomColorWithOpacity() });
  gameEnemyWave.onScreenEnemies.push(enemy);
  gameEnemyWave.incomingEnemies[enemySelector] -= 1;
}

export function hitClosestEnemies(damage) {
  let damageRecived1 = 0;
  gameEnemyWave.onScreenEnemies.sort((a, b) => a.xPos - b.xPos);
  const closestEnemies = gameEnemyWave.onScreenEnemies.slice(0, Math.min(gameParams.castleHitCount, gameEnemyWave.onScreenEnemies.length));
  closestEnemies.forEach((enemy) => {
    if (enemy.xPos < STOP_ENEMY_POS + gameParams.castleRange) {
      enemy.hp = Math.max(0, enemy.hp - damage);
      damageRecived1 += enemy.hp > damage ? damage : enemy.hp;
    }
  });
  gameEnemyWave.onScreenEnemies = gameEnemyWave.onScreenEnemies.filter((enemy) => enemy.hp > 0);
  return damageRecived1;
}

/*-------<DEBUG color enemy rects>-------------*/
function getRandomColorWithOpacity() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
