import { castle } from "../characters.js";
import { gameParams, upgradeCosts, upgradeMax } from "../consts.js";
import { showPopup } from "./showPopup.js";

const upgradeBtn = document.querySelector(".upgradeBtn");
upgradeBtn.addEventListener("click", () => {
  openUpgradePopUp();
});

export function openUpgradePopUp() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("upgrade-content");

  const upgradeList = document.createElement("div");
  upgradeList.className = "upgrade-list";

  const upgradeItemBtnArr = [];
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "playerLvl");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "castleHitCount");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "maxCastleHp");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[fireball]");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[lightning]");
  addUpgradeItem(upgradeList, upgradeItemBtnArr, "abilities[bargain]");

  popupContent.append(upgradeList);
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

  upgradeItemBtn.className = `button ability-btn upgrade-btn upgrade-${upgrade}`;
  upgradeCurrentLvl.classList.add(`upgrade-current-lvl`);

  upgradeButtons.push(upgradeItemBtn);

  let cost = 0;
  switch (upgrade) {
    case "playerLvl": {
      cost = gameParams.playerLvl * upgradeCosts.playerLvl;
      upgradeCurrentLvl.textContent = gameParams.playerLvl;
      upgradeCost.textContent = cost;
      upgradeDescription.textContent = `Уровень отвечает за урон наносимый врагам и влияет на исход некоторых событий. Сила вашей атаки на данный момент: ${castle.power}`;
      if (
        isUpgradeAffordable(
          cost,
          upgradeMax.playerLvl,
          gameParams.playerLvl,
          upgradeItemBtn
        )
      ) {
        upgradeBtn.addEventListener("click", () => {
          gameParams.playerLvl++;
          castle.power += 0.01;
          gameParams.gold -= cost;

          cost += upgradeCosts.playerLvl;
          upgradeCurrentLvl.textContent = gameParams.playerLvl;
          upgradeCost.textContent = cost;
          upgradeDescription.textContent = `Уровень отвечает за урон наносимый врагам и влияет на исход некоторых событий. Сила вашей атаки на данный момент: ${castle.power}`;

          updateUpgradeButtonsState(upgradeButtons);
        });
      }
      break;
    }
    case "castleHitCount": {
      const description =
        "Количество целей пламенное дыхание может затронуть за раз. Текущее число:";
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
      const description = "Прочность вашего замка. Текущая прочноть:";
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
        "Ваш навык владения огненным взрывом (наносит урон всем на поле). Его сила:";
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
        "Ваш навык призыва молнии (наносит урон сильнейшиму на поле). Его сила:";
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
      const description = "Ваш навык красноречия и торговли. Его уровень:";
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

  upgradeCurrentLvl.textContent = abilityPower / valuePerLvl;
  upgradeCost.textContent = cost;
  upgradeDescription.textContent = `${description}${abilityPower}`;

  if (
    isUpgradeAffordable(
      cost,
      upgradeMax[upgrade] || upgradeMax.abilities[abilityKey],
      abilityPower / valuePerLvl,
      upgradeItemBtn
    )
  ) {
    upgradeItemBtn.addEventListener("click", () => {
      if (gameParams[upgrade]) {
        gameParams[upgrade] += valuePerLvl;
        abilityPower = gameParams[upgrade];
      } else {
        abilityPower += valuePerLvl;
        gameParams.power[abilityKey] = abilityPower;
      }

      gameParams.gold -= cost;

      cost += upgradeCosts[upgrade] || upgradeCosts.abilities[abilityKey];

      upgradeCurrentLvl.textContent = abilityPower / valuePerLvl;
      upgradeCost.textContent = cost;
      upgradeDescription.textContent = `${description}${abilityPower}`;
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
      : btn.classList.contains("upgrade-abilities[fireball]")
      ? { upgrade: "fireball", valuePerLvl: 30 }
      : btn.classList.contains("upgrade-abilities[lightning]")
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
}

function isUpgradeAffordable(cost, maxLvl, currentLvl, btn) {
  console.log(maxLvl, currentLvl, cost, btn);
  if (gameParams.gold < cost || currentLvl >= maxLvl) {
    btn.disabled = true;
  }
  return !btn.disabled;
}
