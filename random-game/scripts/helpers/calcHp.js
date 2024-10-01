import { gameEnemyWave, gameState, MAX_ENEMY_HP } from "../consts.js";

export function getReserveEnemyHp() {
  let totalHp = 0;
  const reserveEnemies = Object.values(gameEnemyWave.incomingEnemies);
  for (let i = 0; i < reserveEnemies.length; i++) {
    totalHp += reserveEnemies[i] * MAX_ENEMY_HP * (i + 1);
  }
  return totalHp;
}

export function getEnemyHp() {
  let currentHp = getReserveEnemyHp();
  gameEnemyWave.onScreenEnemies.forEach((enemy) => {
    currentHp += enemy.hp;
  });
  return currentHp;
}
