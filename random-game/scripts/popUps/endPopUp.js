import {
  gameParams,
  gameState,
  leaders,
  leadersKey,
  sounds,
} from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playSound } from "../helpers/playNextAudio.js";
import { hidePopup, showPopup } from "./showPopup.js";
import { openStartPopUp } from "./startPopUp.js";

function updateLeaders(nameInput, result) {
  if (nameInput.value) {
    result.name = nameInput.value.trim();
    const currentLeaders = JSON.parse(localStorage.getItem(leadersKey));
    currentLeaders.unshift(result);
    leaders.results = [...currentLeaders];
    currentLeaders.length = Math.min(currentLeaders.length, 10);
    localStorage.setItem(leadersKey, JSON.stringify(currentLeaders));
    hidePopup();
    openLeaderboard();
  } else {
    console.log("empty");
  }
}

function showLeader(resultList, leader = null) {
  const resulItem = document.createElement("div");
  const resultName = document.createElement("p");
  const resultLvl = document.createElement("p");
  const resultGold = document.createElement("p");
  const resultKing = document.createElement("p");

  resulItem.classList.add("leaderboard-item");
  resultName.classList.add("leaderboard-name");
  resultLvl.classList.add("leaderboard-lvl");
  resultGold.classList.add("leaderboard-gold");
  resultKing.classList.add("leaderboard-goal");

  if (leader) {
    resultName.textContent = `${leader.name}`;
    resultLvl.textContent = `${leader.playerLvl}`;
    resultGold.textContent = `${leader.gold}`;
    resultKing.style.backgroundImage = `url(${
      leader.kingDead ? "./assets/icons/crown.png" : "./assets/icons/skull.png"
    })`;
  } else {
    resultName.textContent = "Имя";
    resultLvl.textContent = "Уровень";
    resultGold.textContent = "Золото";
    resultKing.style.backgroundImage = "url(./assets/icons/crown.png)";
    resulItem.style.borderBottom = "2px solid orange";
  }

  resulItem.append(resultName, resultLvl, resultGold, resultKing);
  resultList.append(resulItem);
}

export function openLeaderboard() {
  showPopup();
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("leaderboard-content");

  const resultList = document.createElement("div");
  resultList.classList.add("leaderboard-list");

  const currentLeaders = JSON.parse(localStorage.getItem(leadersKey));
  showLeader(resultList);
  currentLeaders.forEach((leader) => {
    showLeader(resultList, leader);
  });

  const backBtn = createBtn();
  backBtn.textContent = "Назад";
  backBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    hidePopup();
    openStartPopUp();
  });
  popupContent.append(resultList, backBtn);
}

export function openEndPopUp() {
  playSound(gameState.isKingDead ? sounds.win : sounds.lose);
  showPopup();
  const result = {
    name: "",
    playerLvl: gameParams.playerLvl,
    gold: gameParams.gold,
    kingDead: gameState.isKingDead,
  };

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("end-game");

  const resultTextContainer = document.createElement("div");
  resultTextContainer.classList.add("result-text-container");
  const resultText = document.createElement("p");

  resultText.textContent = `Вы ${
    gameState.isKingDead ? "выиграли!" : "проиграли!"
  }`;
  resultText.className = `result-text ${gameState.isKingDead ? "win" : "lose"}`;

  const resultList = document.createElement("ul");
  resultList.classList.add("result-list");
  const resultLvl = document.createElement("li");
  const resultGold = document.createElement("li");
  resultLvl.classList.add("result-item");
  resultGold.classList.add("result-item");

  resultLvl.textContent = `Ваш уровень: ${gameParams.playerLvl}`;
  resultGold.textContent = `Накопленное золото: ${gameParams.gold}`;

  resultList.append(resultLvl, resultGold);
  resultTextContainer.append(resultText, resultList);

  const saveResultBtn = createBtn(["save-result-btn"]);
  saveResultBtn.disabled = true;
  saveResultBtn.textContent = "Сохранить";

  const nameInput = document.createElement("input");
  nameInput.classList.add("name-input");
  nameInput.focus();
  nameInput.placeholder = "Введите Ваше имя";

  nameInput.addEventListener("input", () => {
    saveResultBtn.disabled = !nameInput.value.trim();
  });
  nameInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      updateLeaders(nameInput, result);
    }
  });
  saveResultBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    updateLeaders(nameInput, result);
  });
  popupContent.append(resultTextContainer, nameInput, saveResultBtn);
}
