import { gameEnemyWave, gameState } from "../consts.js";
import { spawnEnemies } from "../spawnEnemy.js";
import { getReserveEnemyHp } from "./calcHp.js";
import { playNextAudio } from "./playNextAudio.js";
import toggleVisibleToolbar from "./showToolbar.js";

export default function startBattle() {
  if (gameEnemyWave.incomingEnemies.king) {
    playNextAudio("kingBattle");
    document.querySelector(".bribeBtn").disabled = true;
  } else {
    playNextAudio("battle");
  }

  gameState.totalEnemyHp = getReserveEnemyHp();
  gameState.isCombat = true;
  spawnEnemies(gameEnemyWave);
  toggleVisibleToolbar();
}
