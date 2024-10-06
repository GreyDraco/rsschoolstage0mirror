import { gameEnemyWave, gameParams, gameState, STOP_ENEMY_POS } from "../consts.js";

export function hitClosestEnemies(damage) {
  gameEnemyWave.onScreenEnemies.sort((a, b) => a.xPos - b.xPos);
  const closestEnemies = gameEnemyWave.onScreenEnemies.slice(0, Math.min(gameParams.castleHitCount, gameEnemyWave.onScreenEnemies.length));
  closestEnemies.forEach((enemy) => {
    if (enemy.xPos < STOP_ENEMY_POS + gameParams.castleRange) {
      enemy.hp = Math.max(0, enemy.hp - damage);
    }
  });
}

export function hitStrongest(damage) {
  if (!gameState.isCombat || !gameEnemyWave.onScreenEnemies.length) {
    return;
  }
  const strongestEnemies = gameEnemyWave.onScreenEnemies.sort((a, b) => b.hp - a.hp);
  const strongestEnemy = strongestEnemies[0];
  strongestEnemy.hp = Math.max(0, strongestEnemy.hp - damage);
  return Math.floor(strongestEnemy.xPos);
}

export function hitAll(damage) {
  if (!gameState.isCombat || !gameEnemyWave.onScreenEnemies.length) {
    return;
  }
  gameEnemyWave.onScreenEnemies.forEach((enemy) => {
    enemy.hp = Math.max(0, enemy.hp - damage);
  });
}
