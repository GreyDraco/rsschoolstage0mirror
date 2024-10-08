import { gameEnemyWave, gameState } from "../consts.js";
import { spawnEnemies } from "../spawnEnemy.js";
import { getReserveEnemyHp } from "./calcHp.js";
import { playNextAudio } from "./playNextAudio.js";
import toggleVisibleToolbar from "./showToolbar.js";

export default function startBattle() {
  playNextAudio("battle");
  gameState.totalEnemyHp = getReserveEnemyHp();
  gameState.isCombat = true;
  spawnEnemies(gameEnemyWave);
  toggleVisibleToolbar();
}
