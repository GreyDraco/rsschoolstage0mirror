import { sounds } from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio, playSound } from "../helpers/playNextAudio.js";
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

  rulesBtn.textContent = "Правила";
  buttonContainer.classList.add("menu-btn-container");
  leaderboardBtn.textContent = "Таблица результатов";
  startBtn.textContent = "Продолжить игру";
  settingsBtn.textContent = "Настройки";
  startBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    console.log("play");
    hidePopup();
  });
  leaderboardBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    hidePopup();
    openLeaderboard();
  });
  rulesBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    console.log("Потом будут правила как попап или хз");
    hidePopup();
    openRules();
  });
  settingsBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    playNextAudio("idle");
    hidePopup();
    openSettingsPopup();
  });
  buttonContainer.append(startBtn, leaderboardBtn, rulesBtn, settingsBtn);
  popupContent.append(buttonContainer);
}

const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", () => {
  playSound(sounds.btn);
  openStartPopUp();
});
