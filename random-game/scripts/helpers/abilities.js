import { lightning } from "../characters.js";
import { gameParams, gameState, sounds } from "../consts.js";
import { getEnemyHp } from "./calcHp.js";
import { hitAll, hitStrongest } from "./hitEnemy.js";
import { playNextAudio, playSound } from "./playNextAudio.js";
import toggleVisibleToolbar from "./showToolbar.js";

const lightningBtn = document.querySelector(".lightningBtn");
const fireballBtn = document.querySelector(".fireballBtn");
const bribeBtn = document.querySelector(".bribeBtn");

bribeBtn.addEventListener("click", () => {
  // playSound(sounds.money);
  const bribeCost = Math.floor(
    getEnemyHp() / 1 + gameParams.abilities.princess
  );

  if (gameParams.gold >= bribeCost) {
    playSound(sounds.money);
    gameState.isCombat = false;
    gameParams.gold -= bribeCost;
    toggleVisibleToolbar();
    playNextAudio("idle");
  } else {
    playSound(sounds.notEnoughMoney);
    bribeBtn.classList.add("shaked-btn");

    console.log("Need more gold to bribe: ", gameParams.gold, "/", bribeCost);
  }
});

bribeBtn.addEventListener("animationend", () => {
  bribeBtn.classList.remove("shaked-btn");
});

lightningBtn.addEventListener("click", () => {
  playSound(sounds.lightning);
  lightningBtn.disabled = true;
  gameState.isLightningActive = true;
  lightningBtn.classList.add("reload-lightning");
  lightning.xPos = hitStrongest(gameParams.power.lightning);
});

lightningBtn.addEventListener("animationend", () => {
  lightningBtn.disabled = false;
  lightningBtn.classList.remove("reload-lightning");
});

fireballBtn.addEventListener("click", () => {
  playSound(sounds.fireball);

  hitAll(gameParams.power.fireball);
  fireballBtn.disabled = true;
  gameState.isFireballActive = true;
  fireballBtn.classList.add("reload-fireball");
});

fireballBtn.addEventListener("animationend", () => {
  fireballBtn.disabled = false;
  fireballBtn.classList.remove("reload-fireball");
});
