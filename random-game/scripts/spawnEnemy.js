import { MovingCharacter } from "./classes/Sprites.js";
import { gameEnemies, enemyTypes, gameEnemyWave } from "./consts.js";

export function spawnEnemies() {
  const reserveEnemies = Object.values(gameEnemyWave.incomingEnemies);
  const reserveEnemiesKeys = Object.keys(gameEnemyWave.incomingEnemies);
  let counter = 0;
  let enemySelector = 0;
  const enemyProperties = Object.keys(gameEnemies);
  let totalEnemyCount = reserveEnemies.reduce((sum, i) => sum + i, 0);
  const intervalId = setInterval(function () {
    enemySelector = Math.floor(Math.random() * enemyProperties.length);
    if (gameEnemyWave.incomingEnemies[reserveEnemiesKeys[enemySelector]] === 0) {
      enemySelector = reserveEnemies.findIndex((num) => num > 0);
    }

    spawnEnemy(enemySelector, enemyProperties, reserveEnemiesKeys);
    reserveEnemies[enemySelector] -= 1;
    counter++;

    if (counter === totalEnemyCount) {
      clearInterval(intervalId);
    }
  }, 300);
}

function spawnEnemy(enemySelector, enemyProperties, reserveEnemiesKeys) {
  const enemy = new MovingCharacter({ ...gameEnemies[enemyProperties[enemySelector]], color: getRandomColorWithOpacity() }, enemyTypes[enemySelector]);
  gameEnemyWave.onScreenEnemies.push(enemy);
  gameEnemyWave.incomingEnemies[reserveEnemiesKeys[enemySelector]] -= 1;
}

/*-------<DEBUG color enemy rects>-------------*/
function getRandomColorWithOpacity() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, 0.5)`;
}
