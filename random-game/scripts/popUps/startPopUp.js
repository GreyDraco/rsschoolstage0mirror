import { sounds } from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio, playSound } from "../helpers/playNextAudio.js";
import { openLeaderboard } from "./endPopUp.js";
import { hidePopup, showPopup } from "./showPopup.js";

export function openStartPopUp() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("start-content");

  const buttonContainer = document.createElement("div");
  const startBtn = createBtn();
  const leaderboardBtn = createBtn();
  const rulesBtn = createBtn();

  rulesBtn.textContent = "Правила";
  buttonContainer.classList.add("menu-btn-container");
  leaderboardBtn.textContent = "Таблица результатов";
  startBtn.textContent = "Начать игру";
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
  });
  buttonContainer.append(startBtn, leaderboardBtn, rulesBtn);
  popupContent.append(buttonContainer);
}
