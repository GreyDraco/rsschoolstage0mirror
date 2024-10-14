import { addBargain } from "../bargain.js";
import { castle, tower } from "../characters.js";
import {
  CASTLE_PROPS,
  DIE_SIZE,
  gameEnemyWave,
  gameParams,
  gameState,
  paramsLocalization,
  sounds,
  valuesPerLvl,
} from "../consts.js";
import { gameEventsData as events } from "../data/gameEventsData.js";
import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio, playSound } from "../helpers/playNextAudio.js";
import startBattle from "../helpers/startBattle.js";
import { hidePopup, showPopup } from "./showPopup.js";

export function startEvent(id, gameEventsData = events) {
  showPopup();

  if (id !== "immediateBattle") {
    playNextAudio(id);
  }

  const popupContent = document.querySelector(".popup-content");
  const popupContainer = document.querySelector(".popup-container");
  popupContainer.addEventListener("animationend", () => {
    popupContainer.style.animation = "none";
  });
  popupContent.classList.add("event-popup");

  const eventImg = document.createElement("img");
  eventImg.className = "event-img";

  eventImg.alt = `${id}-event-image`;

  const eventText = document.createElement("p");
  eventText.className = "event-text";
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("event-btn-container");

  popupContent.append(eventImg, eventText, buttonContainer);

  const eventName = id;
  let gameEvent = gameEventsData[eventName];

  displayEventFrame();

  function displayEventFrame() {
    if (gameEvent?.img) {
      eventImg.src = gameEvent.img;
    }

    eventImg.classList.remove("hidden");

    popupContent.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    eventText.textContent = gameEvent.text;

    let vars = gameEvent.vars;

    buttonContainer.innerHTML = "";
    if (vars) {
      eventText.textContent = gameEvent.text;

      if (gameEvent.check) {
        const checkCount = Object.keys(gameEvent.check).length;
        if (
          gameEvent.check.bargain &&
          gameParams.abilities.bargain >= gameEvent.check.bargain
        ) {
          eventImg.classList.add("hidden");
          let timerId = null;
          gameParams.discount = 1;
          let checkCounter = checkEvent(gameEvent);
          const { bargainContainer, bargainBtn } = addBargain(() => {
            checkCounter += gameParams.discount < 1 ? +1 : 0;
            gameEvent = checkCounter >= checkCount ? vars.varw : vars.varl;
            clearTimeout(timerId);
            bargainContainer.classList.add("hidden");
            displayEventFrame();

            setTimeout(() => {
              bargainContainer.remove();
            }, 300);
          });
          bargainBtn.click();
          bargainContainer.classList.remove("hidden");
          eventImg.classList.add("hidden");
          popupContent.prepend(bargainContainer);

          timerId = setTimeout(() => {
            checkCounter = gameParams.discount < 1 ? +1 : 0;
            gameEvent = checkCounter >= checkCount ? vars.varw : vars.varl;
            bargainContainer.classList.add("hidden");

            displayEventFrame();
            bargainContainer.remove();
            eventImg.classList.remove("hidden");
          }, 10000);
        } else {
          let checkCounter = checkEvent(gameEvent);
          gameEvent = checkCounter >= checkCount ? vars.varw : vars.varl;
          displayEventFrame();
        }
      } else {
        Object.values(vars).forEach((variant) => {
          const choiceBtn = createBtn();

          if (
            variant?.check?.gold &&
            gameParams.gold - variant.check.gold < 0
          ) {
            choiceBtn.disabled = true;
          }
          choiceBtn.textContent = variant.varDesc;
          choiceBtn.id = variant.varID;
          buttonContainer.append(choiceBtn);

          choiceBtn.addEventListener("click", () => {
            playSound(sounds.event);
            gameEvent = variant;
            setTimeout(() => {
              popupContainer.style.animation = "popup 0.6s";
              displayEventFrame();
            }, 300);
          });
        });
      }
    } else {
      const okBtn = createBtn();

      if (gameEvent.rewards) {
        buttonContainer.prepend(giveRewards(gameEvent));
      }

      okBtn.textContent = "OK";

      buttonContainer.append(okBtn);
      eventText.textContent = gameEvent.text;
      okBtn.addEventListener("click", () => {
        gameState.completedEvents.push(id);
        playSound(sounds.event);
        if (gameEvent.battle) {
          gameEnemyWave.incomingEnemies = {
            ...gameEnemyWave.incomingEnemies,
            ...gameEvent.battle,
          };

          startBattle();
        } else {
          playNextAudio("idle");
        }
        hidePopup();
        gameParams.discount = 1;
        gameState.isUpgradeUsed = false;
        gameState.isRepairUsed = false;
      });
      return;
    }
  }
}

function giveRewards(gameEvent) {
  const rewardList = document.createElement("ul");
  rewardList.className = "rewards-list";
  Object.entries(gameEvent.rewards).forEach(([key, value]) => {
    if (value !== null && value !== 0) {
      const rewardItem = document.createElement("li");
      if (key !== "abilities") {
        const diff = Math.min(gameParams[key], Math.abs(value));
        gameParams[key] =
          key === "playerLvl"
            ? Math.max(gameParams[key] + value, 1)
            : Math.max(gameParams[key] + value, 0);
        rewardItem.textContent =
          value > 0
            ? `${paramsLocalization[key]}: +${value}`
            : `${paramsLocalization[key]}: ${-diff}`;
        if (key === "playerLvl") {
          castle.power =
            Math.round(
              (CASTLE_PROPS.power + 0.01 * gameParams.playerLvl) * 100
            ) / 100;
        }
      } else {
        Object.entries(value).forEach(([key, value]) => {
          if (key === "princess") {
            tower.imgSrc = "./assets/sprites/towerP.png";
            tower.image.src = "./assets/sprites/towerP.png";
          }

          gameParams.abilities[key] += value;

          if (key in gameParams.power) {
            gameParams.power[key] += valuesPerLvl[key] * value;
          }
          rewardItem.textContent = `Улучшена способность: ${paramsLocalization[key]}`;
          const abilityBtn = document.querySelector(`.${key}Btn`);
          if (abilityBtn && abilityBtn.disabled) {
            abilityBtn.disabled = false;
            abilityBtn.classList.add("unlocked");
          }
        });
      }
      rewardList.append(rewardItem);
    }
  });
  if (gameEvent.battle) {
    rewardList.append("Враги на подходе!");
  }
  return rewardList;
}

function checkEvent(gameEvent) {
  let checkCounter = 0;

  Object.entries(gameEvent.check).forEach(([key, value]) => {
    switch (key) {
      case "die": {
        const comb = Math.floor(Math.random() * DIE_SIZE + 1);
        checkCounter += comb >= value ? 1 : 0;
        break;
      }
      case "lvlCheck": {
        checkCounter += gameParams.playerLvl > value ? 1 : 0;
        break;
      }
      case "gold": {
        checkCounter++;
        break;
      }
      default: {
        break;
      }
    }
  });
  return checkCounter;
}
