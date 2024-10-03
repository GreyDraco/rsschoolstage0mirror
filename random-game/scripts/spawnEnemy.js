import { MovingSprite } from "./classes/Sprites.js";
import { gameEnemyWave, gameEnemies, gameParams, STOP_ENEMY_POS } from "./consts.js";

export function spawnEnemies(gameEnemyWave) {
  const reserveEnemies = Object.values(gameEnemyWave.incomingEnemies);
  const reserveEnemiesKeys = Object.keys(gameEnemyWave.incomingEnemies);
  let counter = 0;
  let enemySelector = 0;
  const enemyProperties = Object.keys(gameEnemies);
  const totalEnemyCount = reserveEnemies.reduce((sum, i) => sum + i, 0);
  const intervalId = setInterval(function () {
    enemySelector = Math.floor(Math.random() * enemyProperties.length);
    if (gameEnemyWave.incomingEnemies[reserveEnemiesKeys[enemySelector]] === 0) {
      enemySelector = reserveEnemies.findIndex((num) => num > 0);
    }
    spawnEnemy(enemySelector, enemyProperties);
    counter++;

    if (counter === totalEnemyCount) {
      clearInterval(intervalId);
    }
  }, 300);
}

function spawnEnemy(enemySelector, enemyProperties) {
  const reserveEnemies = Object.keys(gameEnemyWave.incomingEnemies);
  const enemy = new MovingSprite({ ...gameEnemies[enemyProperties[enemySelector]], color: getRandomColorWithOpacity() });
  gameEnemyWave.onScreenEnemies.push(enemy);
  gameEnemyWave.incomingEnemies[reserveEnemies[enemySelector]] -= 1;
}

/*-------<DEBUG color enemy rects>-------------*/
function getRandomColorWithOpacity() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
