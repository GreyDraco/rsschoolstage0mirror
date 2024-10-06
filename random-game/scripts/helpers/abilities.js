import { lightning } from "../characters.js";
import { gameState } from "../consts.js";
import { hitAll, hitStrongest } from "./hitEnemy.js";
import toggleVisibleToolbar from "./showToolbar.js";

const lightningBtn = document.querySelector(".lightningBtn");
const fireballBtn = document.querySelector(".fireballBtn");
const bribeBtn = document.querySelector(".bribeBtn");

bribeBtn.addEventListener("click", () => {
  gameState.isCombat = false;
  toggleVisibleToolbar();
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
