import { addBargain } from "../bargain.js";
import { castle, castleHP } from "../characters.js";
import { BASE_COST, gameParams, HP_MAX_WIDTH, MAX_CASTLE_HP } from "../consts.js";
import { calcCost } from "../helpers/calcCost.js";
import { hidePopup, showPopup } from "./showPopup.js";

const repairBtn = document.querySelector(".repairBtn");
repairBtn.addEventListener("click", () => {
  gameParams.cost = BASE_COST * gameParams.discount;

  showPopup();
  const { fullRepairBtn, okRepairBtn, repairBar, repairCost, repairHp, repairButtonsContainer, popupContent } = buildRepairPopupLayout();
  repairBar.addEventListener("input", () => {
    repairHp.textContent = `❤️ ${repairBar.value}/${MAX_CASTLE_HP}`;

    repairCost.textContent = `${calcCost(repairBar.value)}$`;
    if (calcCost(repairBar.value) > gameParams.gold) {
      okRepairBtn.disabled = true;
    } else {
      okRepairBtn.disabled = false;
    }
  });

  okRepairBtn.addEventListener("click", () => {
    hidePopup();
    gameParams.gold -= calcCost(repairBar.value);
    castle.hp = repairBar.value;
    castleHP.width = (repairBar.value * HP_MAX_WIDTH) / MAX_CASTLE_HP;
  });

  fullRepairBtn.addEventListener("click", () => {
    hidePopup();
    gameParams.gold -= calcCost(MAX_CASTLE_HP);
    castle.hp = MAX_CASTLE_HP;
    castleHP.width = HP_MAX_WIDTH;
  });

  //---------------------------------bargain--------------------------------------------------------------------------
  const bargainResults = addBargain(updRepairLayout);
  const { bargainBtn, bargainContainer, discountText } = bargainResults;

  popupContent.append(bargainContainer ?? "", discountText ?? "");
  repairButtonsContainer.append(bargainBtn);

  function updRepairLayout() {
    repairCost.textContent = `${calcCost(repairBar.value)}$`;
    if (calcCost(MAX_CASTLE_HP) > gameParams.gold) {
      fullRepairBtn.disabled = true;
    }

    if (calcCost(repairBar.value) > gameParams.gold) {
      okRepairBtn.disabled = true;
    } else {
      okRepairBtn.disabled = false;
    }
    fullRepairBtn.textContent = `full repair: ${calcCost(MAX_CASTLE_HP)}$`;
    bargainContainer.classList.add("hidden");
    discountText.textContent = `Стоимость ${gameParams.discount > 1 ? "увеличилась на 25%. Повезет в следующий раз." : "умеьшилась на 30%. Вы молодец."}`;
    discountText.classList.remove("hidden");
  }
});

function buildRepairPopupLayout() {
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("repair-popup");

  const repairButtonsContainer = document.createElement("div");
  repairButtonsContainer.classList.add("repair-btns-container");

  const fullRepairBtn = document.createElement("button");
  fullRepairBtn.className = "full-repair-btn button";
  if (calcCost(MAX_CASTLE_HP) > gameParams.gold) {
    fullRepairBtn.disabled = true;
  }

  const okRepairBtn = document.createElement("button");
  okRepairBtn.className = "button ok-repair-btn";

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
  repairBar.max = MAX_CASTLE_HP;

  repairCost.textContent = "0$";
  repairHp.textContent = `❤️ ${Math.floor(castle.hp)}/${MAX_CASTLE_HP}`;

  fullRepairBtn.textContent = `full repair: ${calcCost(MAX_CASTLE_HP)}$`;
  okRepairBtn.textContent = "repair";
  repairButtonsContainer.append(fullRepairBtn, okRepairBtn);
  repairBarContainer.append(repairBar, repairCost, repairHp);

  popupContent.append(repairBarContainer, repairButtonsContainer);
  return { fullRepairBtn, okRepairBtn, repairBar, repairCost, repairHp, repairBarContainer, repairButtonsContainer, popupContent };
}
