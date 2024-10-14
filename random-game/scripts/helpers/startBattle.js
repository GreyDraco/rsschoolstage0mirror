import { lightning } from "../characters.js";
import { gameEnemyWave, gameParams, gameState } from "../consts.js";
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

  if (gameParams.abilities.lightning) {
    const lightningBtn = document.querySelector(".lightningBtn");
    lightningBtn.classList.remove("reload-lightning");
    lightningBtn.disabled = false;
  }

  if (gameParams.abilities.fireball) {
    const fireballBtn = document.querySelector(".fireballBtn");
    fireballBtn.classList.remove("reload-fireball");
    fireballBtn.disabled = false;
  }

  gameState.totalEnemyHp = getReserveEnemyHp();
  gameState.isCombat = true;
  spawnEnemies(gameEnemyWave);
  toggleVisibleToolbar();
}
