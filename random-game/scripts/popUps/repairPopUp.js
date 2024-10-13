import { addBargain } from "../bargain.js";
import { castle, castleHP } from "../characters.js";
import {
  BASE_COST,
  gameParams,
  gameState,
  HP_MAX_WIDTH,
  sounds,
} from "../consts.js";
import { calcCost } from "../helpers/calcCost.js";
import { createBtn } from "../helpers/createBtn.js";
import { playSound } from "../helpers/playNextAudio.js";
import { hidePopup, showPopup } from "./showPopup.js";

const repairBtn = document.querySelector(".repairBtn");

repairBtn.addEventListener("click", () => {
  playSound(sounds.btn);
  gameParams.cost = BASE_COST * gameParams.discount;

  showPopup();
  const {
    currentGold,
    fullRepairBtn,
    okRepairBtn,
    repairBar,
    repairCost,
    repairHp,
    repairButtonsContainer,
    popupContent,
  } = buildRepairPopupLayout();
  repairBar.addEventListener("input", () => {
    repairHp.textContent = `🛡️ ${repairBar.value}/${gameParams.maxCastleHp}`;

    repairCost.textContent = `${calcCost(repairBar.value)}$`;
    if (calcCost(repairBar.value) > gameParams.gold) {
      okRepairBtn.disabled = true;
    } else {
      okRepairBtn.disabled = false;
    }
  });

  okRepairBtn.addEventListener("click", () => {
    hidePopup();
    playSound(sounds.money);
    gameParams.gold -= calcCost(repairBar.value);
    castle.hp = repairBar.value;
    castleHP.width = (repairBar.value * HP_MAX_WIDTH) / gameParams.maxCastleHp;
  });

  fullRepairBtn.addEventListener("click", () => {
    playSound(sounds.money);
    hidePopup();

    gameParams.gold -= calcCost(gameParams.maxCastleHp);
    castle.hp = gameParams.maxCastleHp;
    castleHP.width = HP_MAX_WIDTH;
  });

  //---------------------------------bargain--------------------------------------------------------------------------
  const bargainResults = addBargain(updRepairLayout);
  const { bargainBtn, bargainContainer, discountText } = bargainResults;

  popupContent.append(bargainContainer ?? "", discountText ?? "");

  if (gameParams.abilities.bargain && !gameState.isRepairUsed) {
    repairButtonsContainer.append(bargainBtn);
  }

  function updRepairLayout() {
    repairCost.textContent = `${calcCost(repairBar.value)}$`;
    if (calcCost(gameParams.maxCastleHp) > gameParams.gold) {
      fullRepairBtn.disabled = true;
    } else {
      fullRepairBtn.disabled = false;
    }

    if (calcCost(repairBar.value) > gameParams.gold) {
      okRepairBtn.disabled = true;
    } else {
      okRepairBtn.disabled = false;
    }
    fullRepairBtn.textContent = `Отремонтировать все: ${calcCost(
      gameParams.maxCastleHp
    )}$`;
    bargainContainer.classList.add("hidden");
    discountText.textContent = `Стоимость ${
      gameParams.discount > 1
        ? "увеличилась на 25%. Повезет в следующий раз."
        : "умеьшилась на 30%. Вы молодец."
    }`;
    discountText.classList.remove("hidden");
    gameState.isRepairUsed = true;
    bargainBtn.classList.add("hidden");
  }
});

function buildRepairPopupLayout() {
  const popupContent = document.querySelector(".popup-content");
  const popupContainer = document.querySelector(".popup-container");
  popupContent.classList.add("repair-popup");

  const currentGold = document.createElement("p");
  currentGold.classList.add("current-gold");
  currentGold.textContent = `${gameParams.gold}`;

  const repairButtonsContainer = document.createElement("div");
  repairButtonsContainer.classList.add("repair-btns-container");

  const fullRepairBtn = createBtn(["full-repair-btn", "button"]);
  if (calcCost(gameParams.maxCastleHp) > gameParams.gold) {
    fullRepairBtn.disabled = true;
  }

  const okRepairBtn = createBtn(["button", "ok-repair-btn"]);
  const repairBarContainer = document.createElement("div");
  repairBarContainer.classList.add("repair-bar-container");
  const repairBar = document.createElement("input");
  repairBar.classList.add("repair-bar");
  const repairHp = document.createElement("span");
  repairHp.className = "repair-hp";
  const repairCost = document.createElement("span");
  repairCost.className = "repair-cost";

  repairBar.type = "range";
  repairBar.value = Math.floor(castle.hp);
  repairBar.min = Math.floor(castle.hp);
  repairBar.max = gameParams.maxCastleHp;

  repairCost.textContent = "0$";
  repairHp.textContent = `🛡️ ${Math.floor(castle.hp)}/${
    gameParams.maxCastleHp
  }`;

  fullRepairBtn.textContent = `Отремонтировать все: ${calcCost(
    gameParams.maxCastleHp
  )}$`;
  okRepairBtn.textContent = "Отремонтировать";
  repairButtonsContainer.append(okRepairBtn, fullRepairBtn);
  repairBarContainer.append(repairBar, repairCost, repairHp);
  popupContainer.append(currentGold);
  popupContent.append(repairBarContainer, repairButtonsContainer);
  return {
    currentGold,
    fullRepairBtn,
    okRepairBtn,
    repairBar,
    repairCost,
    repairHp,
    repairBarContainer,
    repairButtonsContainer,
    popupContent,
  };
}
