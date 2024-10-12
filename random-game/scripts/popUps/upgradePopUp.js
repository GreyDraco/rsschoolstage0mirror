import { castle } from "../characters.js";
import { gameParams, sounds, upgradeCosts, upgradeMax } from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playSound } from "../helpers/playNextAudio.js";
import { hidePopup, showPopup } from "./showPopup.js";

const upgradeBtn = document.querySelector(".upgradeBtn");
upgradeBtn.addEventListener("click", () => {
  playSound(sounds.btn);
  openUpgradePopUp();
});

export function openUpgradePopUp() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  const popupContainer = document.querySelector(".popup-container");
  popupContent.classList.add("upgrade-content");

  const upgradeList = document.createElement("div");
  upgradeList.className = "upgrade-list";

  const currentGold = document.createElement("p");
  currentGold.classList.add("current-gold");
  currentGold.textContent = `${gameParams.gold}`;

  const upgradeItemBtnArr = [];
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "playerLvl");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "castleHitCount");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "maxCastleHp");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[fireball]");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[lightning]");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[bargain]");

  const backBtn = createBtn();
  backBtn.textContent = "Закрыть";
  backBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    hidePopup();
  });
  popupContainer.append(currentGold);
  popupContent.append(upgradeList, backBtn);
}

function addUpgradeItem(upgradeList, upgradeButtons, upgrade) {
  const upgradeItem = document.createElement("div");
  const upgradeItemBtn = document.createElement("button");
  const upgradeDescription = document.createElement("p");
  const upgradeCost = document.createElement("p");
  const upgradeCurrentLvl = document.createElement("p");

  upgradeItem.classList.add("upgrade-item");
  upgradeDescription.classList.add("upgrade-description");
  upgradeCost.classList.add("upgrade-cost");

  upgradeItemBtn.className = `button ability-btn upgrade-btn upgrade-${
    gameParams[upgrade] ? upgrade : upgrade.match(/\[(.*?)\]/)[1]
  }`;
  upgradeCurrentLvl.classList.add(`upgrade-current-lvl`);

  upgradeButtons.push(upgradeItemBtn);

  let cost = 0;
  switch (upgrade) {
    case "playerLvl": {
      const description =
        "Уровень отвечает за урон наносимый врагам и влияет на исход некоторых событий. Текущая сила вашей атаки: ";
      fillUpgradeGameParamsItem(
        upgrade,
        1,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );
      break;
    }
    case "castleHitCount": {
      const description =
        "Количество целей, которые пламенное дыхание способно охватить одновременно. Текущее число: ";
      fillUpgradeGameParamsItem(
        upgrade,
        1,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );
      break;
    }
    case "maxCastleHp": {
      const description = "Прочность вашего замка. Текущая прочноть: ";
      fillUpgradeGameParamsItem(
        upgrade,
        1000,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );
      break;
    }
    case "abilities[fireball]": {
      const description =
        "Ваш навык владения огненным взрывом (наносит урон всем врагам на поле). Его сила: ";
      fillUpgradeGameParamsItem(
        upgrade,
        30,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );

      break;
    }
    case "abilities[lightning]": {
      const description =
        "Ваш навык призыва молнии (наносит урон сильнейшиму врагу на поле). Его сила: ";
      fillUpgradeGameParamsItem(
        upgrade,
        150,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );

      break;
    }
    case "abilities[bargain]": {
      const description = "Ваш навык красноречия и торговли. Его уровень: ";
      fillUpgradeGameParamsItem(
        upgrade,
        1,
        description,
        upgradeCurrentLvl,
        upgradeCost,
        upgradeDescription,
        upgradeItemBtn,
        upgradeButtons
      );

      break;
    }
    default: {
      console.log("got some unexpected upgrade: ", upgrade);
    }
  }
  upgradeItemBtn.append(upgradeCurrentLvl);
  upgradeItem.append(upgradeItemBtn, upgradeDescription, upgradeCost);
  upgradeList.append(upgradeItem);
}

function fillUpgradeGameParamsItem(
  upgrade,
  valuePerLvl,
  description,
  upgradeCurrentLvl,
  upgradeCost,
  upgradeDescription,
  upgradeItemBtn,
  upgradeButtons
) {
  let abilityPower = 0;
  let abilityKey = "";
  let cost = 0;

  if (gameParams[upgrade]) {
    abilityPower = gameParams[upgrade];
    cost = (gameParams[upgrade] / valuePerLvl) * upgradeCosts[upgrade];
  } else {
    abilityKey = upgrade.match(/\[(.*?)\]/)[1];
    abilityPower = gameParams.power[abilityKey];
    cost =
      (1 + abilityPower / valuePerLvl) * upgradeCosts.abilities[abilityKey];
  }

  upgradeCurrentLvl.textContent =
    abilityPower / valuePerLvl < upgradeMax[upgrade] ||
    gameParams.abilities[abilityKey] < upgradeMax.abilities[abilityKey]
      ? abilityPower / valuePerLvl
      : "МАХ";
  upgradeCost.textContent = `${cost}`;
  upgradeDescription.textContent = `${description}${
    upgrade === "playerLvl" ? castle.power : abilityPower
  }`;

  if (
    isUpgradeAffordable(
      cost,
      upgradeMax[upgrade] || upgradeMax.abilities[abilityKey],
      abilityPower / valuePerLvl,
      upgradeItemBtn
    )
  ) {
    upgradeItemBtn.addEventListener("click", () => {
      playSound(sounds.money);
      if (gameParams[upgrade]) {
        gameParams[upgrade] += valuePerLvl;
        abilityPower = gameParams[upgrade];
      } else {
        abilityPower += valuePerLvl;
        gameParams.abilities[abilityKey]++;
        gameParams.power[abilityKey] = abilityPower;
      }

      if (upgrade === "maxCastleHp") {
        castle.hp += valuePerLvl;
      }

      if (upgrade === "playerLvl") {
        castle.power = Math.round((castle.power + 0.01) * 100) / 100;
      }

      gameParams.gold -= cost;
      cost += upgradeCosts[upgrade] || upgradeCosts.abilities[abilityKey];

      upgradeCurrentLvl.textContent =
        abilityPower / valuePerLvl < upgradeMax[upgrade] ||
        gameParams.abilities[abilityKey] < upgradeMax.abilities[abilityKey]
          ? abilityPower / valuePerLvl
          : "МАХ";
      upgradeCost.textContent = `${cost}`;
      upgradeDescription.textContent = `${description}${
        upgrade === "playerLvl" ? castle.power : abilityPower
      }`;
      updateUpgradeButtonsState(upgradeButtons);
    });
  }
}

function updateUpgradeButtonsState(upgradeButtons) {
  upgradeButtons.forEach((btn) => {
    const { upgrade, valuePerLvl } = btn.classList.contains("upgrade-playerLvl")
      ? { upgrade: "playerLvl", valuePerLvl: 1 }
      : btn.classList.contains("upgrade-castleHitCount")
      ? { upgrade: "castleHitCount", valuePerLvl: 1 }
      : btn.classList.contains("upgrade-maxCastleHp")
      ? { upgrade: "maxCastleHp", valuePerLvl: 1000 }
      : btn.classList.contains("upgrade-fireball")
      ? { upgrade: "fireball", valuePerLvl: 30 }
      : btn.classList.contains("upgrade-lightning")
      ? { upgrade: "lightning", valuePerLvl: 150 }
      : { upgrade: "bargain", valuePerLvl: 1 };

    let currentLvl =
      gameParams[upgrade] / valuePerLvl ||
      gameParams.power[upgrade] / valuePerLvl;
    let maxLvl = upgradeMax[upgrade] || upgradeMax.abilities[upgrade];
    let cost =
      currentLvl * upgradeCosts[upgrade] ||
      (currentLvl + 1) * upgradeCosts.abilities[upgrade];
    isUpgradeAffordable(cost, maxLvl, currentLvl, btn);
  });
  const currentGold = document.querySelector(".current-gold");
  currentGold.textContent = `${gameParams.gold}`;
}

function isUpgradeAffordable(cost, maxLvl, currentLvl, btn) {
  if (gameParams.gold < cost || currentLvl >= maxLvl) {
    btn.disabled = true;
  }
  return !btn.disabled;
}
