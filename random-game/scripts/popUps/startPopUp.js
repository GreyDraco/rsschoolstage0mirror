import { playNextAudio } from "../helpers/playNextAudio.js";
import { openLeaderboard } from "./endPopUp.js";
import { hidePopup, showPopup } from "./showPopup.js";

export function openStartPopUp() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("start-content");

  const buttonContainer = document.createElement("div");
  const startBtn = document.createElement("button");
  const leaderboardBtn = document.createElement("button");
  const rulesBtn = document.createElement("button");

  rulesBtn.textContent = "Rules";
  buttonContainer.classList.add("menu-btn-container");
  leaderboardBtn.textContent = "leaderboard";
  startBtn.textContent = "start";
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
