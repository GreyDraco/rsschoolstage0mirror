import { castle, castleHP, dragon, tower } from "../characters.js";
import {
  audio,
  CASTLE_PROPS,
  gameEnemyWave,
  gameParams,
  gameState,
  HP_MAX_WIDTH,
  settingsKey,
  sounds,
  startingEnemyWave,
  startingGameParams,
  startingGameState,
} from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio, playSound } from "../helpers/playNextAudio.js";
import toggleVisibleToolbar from "../helpers/showToolbar.js";
import { openLeaderboard } from "./endPopUp.js";
import { openRules } from "./rulesPopUp.js";
import { openSettingsPopup } from "./settingsPopUp.js";
import { hidePopup, showPopup } from "./showPopup.js";

export function openStartPopUp() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("start-content");

  const buttonContainer = document.createElement("div");
  const startBtn = createBtn();
  const leaderboardBtn = createBtn();
  const rulesBtn = createBtn();
  const settingsBtn = createBtn();
  const newGameBtn = createBtn();

  rulesBtn.textContent = "Правила";
  buttonContainer.classList.add("menu-btn-container");
  leaderboardBtn.textContent = "Таблица результатов";
  startBtn.textContent = "Продолжить игру";
  settingsBtn.textContent = "Настройки";
  newGameBtn.textContent = "Новая игра";

  newGameBtn.addEventListener("click", () => {
    resetGame();
    playSound(sounds.btn);
    playNextAudio("idle");
    audio.currentTime = 0;
    hidePopup();
  });

  startBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    hidePopup();
  });
  leaderboardBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    hidePopup();
    openLeaderboard();
  });
  rulesBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    hidePopup();
    openRules();
  });
  settingsBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    hidePopup();
    openSettingsPopup();
  });
  buttonContainer.append(
    newGameBtn,
    startBtn,
    leaderboardBtn,
    rulesBtn,
    settingsBtn
  );
  popupContent.append(buttonContainer);
}

const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", () => {
  playSound(sounds.btn);
  openStartPopUp();
});

function resetGame() {
  Object.assign(gameEnemyWave, JSON.parse(JSON.stringify(startingEnemyWave)));
  Object.assign(gameParams, JSON.parse(JSON.stringify(startingGameParams)));
  Object.assign(gameState, JSON.parse(JSON.stringify(startingGameState)));
  if (localStorage[settingsKey]) {
    Object.assign(gameState, JSON.parse(localStorage.getItem(settingsKey)));
  }
  castle.hp = CASTLE_PROPS.hp;
  castleHP.width = (castle.hp * HP_MAX_WIDTH) / gameParams.maxCastleHp;
  castle.power = CASTLE_PROPS.power;
  dragon.selectAnimation("idle");
  toggleVisibleToolbar();

  document.querySelector(".bribeBtn").disabled = false;

  const lightningBtn = document.querySelector(".lightningBtn");
  const fireballBtn = document.querySelector(".fireballBtn");

  lightningBtn.classList.remove("unlocked");
  fireballBtn.classList.remove("unlocked");
  lightningBtn.classList.remove("reload-lightning");
  fireballBtn.classList.remove("reload-fireball");
  lightningBtn.disabled = true;
  fireballBtn.disabled = true;
  tower.src = "./assets/sprites/tower.png";
  tower.imgSrc = "./assets/sprites/tower.png";
  tower.image.src = "./assets/sprites/tower.png";
}
