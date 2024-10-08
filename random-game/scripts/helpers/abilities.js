import { lightning } from "../characters.js";
import { gameParams, gameState } from "../consts.js";
import { getEnemyHp } from "./calcHp.js";
import { hitAll, hitStrongest } from "./hitEnemy.js";
import { playNextAudio } from "./playNextAudio.js";
import toggleVisibleToolbar from "./showToolbar.js";

const lightningBtn = document.querySelector(".lightningBtn");
const fireballBtn = document.querySelector(".fireballBtn");
const bribeBtn = document.querySelector(".bribeBtn");

bribeBtn.addEventListener("click", () => {
  const bribeCost = Math.floor(
    getEnemyHp() / 1 + gameParams.abilities.princess
  );
  if (gameParams.gold >= bribeCost) {
    gameState.isCombat = false;
    gameParams.gold -= bribeCost;
    toggleVisibleToolbar();
    playNextAudio("idle");
  } else {
    console.log("Need more gold to bribe: ", gameParams.gold, "/", bribeCost);
  }
});

lightningBtn.addEventListener("click", () => {
  lightningBtn.disabled = true;
  gameState.isLightningActive = true;
  lightningBtn.classList.add("reload-lightning");
  lightning.xPos = hitStrongest(150);
  setTimeout(() => {
    gameState.isLightningActive = false;
  }, 500);
});

lightningBtn.addEventListener("animationend", () => {
  lightningBtn.disabled = false;
  lightningBtn.classList.remove("reload-lightning");
});

fireballBtn.addEventListener("click", () => {
  hitAll(30);
  fireballBtn.disabled = true;
  gameState.isFireballActive = true;
  fireballBtn.classList.add("reload-fireball");
  setTimeout(() => {
    gameState.isFireballActive = false;
  }, 2000);
});

fireballBtn.addEventListener("animationend", () => {
  fireballBtn.disabled = false;
  fireballBtn.classList.remove("reload-fireball");
});
