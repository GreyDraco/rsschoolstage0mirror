import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio } from "../helpers/playNextAudio.js";
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
    playNextAudio("idle");
    console.log("play");
    hidePopup();
  });
  leaderboardBtn.addEventListener("click", () => {
    hidePopup();
    openLeaderboard();
  });
  rulesBtn.addEventListener("click", () => {
    console.log("Потом будут правила как попап или хз");
  });
  buttonContainer.append(startBtn, leaderboardBtn, rulesBtn);
  popupContent.append(buttonContainer);
}
