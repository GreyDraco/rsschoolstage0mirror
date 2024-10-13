import { gameEnemies, gameEnemyWave } from "../consts.js";

export function getReserveEnemyHp() {
  let totalHp = 0;
  const reserveEnemies = Object.values(gameEnemyWave.incomingEnemies);
  const enemyType = Object.keys(gameEnemies);
  for (let i = 0; i < reserveEnemies.length; i++) {
    totalHp += reserveEnemies[i] * gameEnemies[enemyType[i]].hp;
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
