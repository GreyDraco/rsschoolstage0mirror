import { addBargain } from "../bargain.js";
import { castle } from "../characters.js";
import {
  CASTLE_PROPS,
  DIE_SIZE,
  gameEnemyWave,
  gameParams,
  gameState,
  paramsLocalization,
  sounds,
} from "../consts.js";
import { gameEventsData as events } from "../data/gameEventsData.js";
import { createBtn } from "../helpers/createBtn.js";
import { playNextAudio, playSound } from "../helpers/playNextAudio.js";
import startBattle from "../helpers/startBattle.js";
import { hidePopup, showPopup } from "./showPopup.js";

const fireEventBtn = document.querySelector(".DEBUG-event");

export function startEvent(id, gameEventsData = events) {
  showPopup();

  if (id !== "immediateBattle") {
    console.log("not im b");

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
  eventImg.src = "./assets/PLACEHOLDER.jpeg";
  eventImg.alt = `${id}-event-image`;

  const eventText = document.createElement("p");
  eventText.className = "event-text";
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("event-btn-container");
  const dieContainer = document.createElement("div");
  const dieMinigame = document.createElement("div");

  dieContainer.append(dieMinigame);
  popupContent.append(eventImg, eventText, buttonContainer, dieContainer);

  const eventName = id;
  let gameEvent = gameEventsData[eventName];

  displayEventFrame();

  function displayEventFrame() {
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
          let timerId = null;
          gameParams.discount = 1;
          let checkCounter = checkEvent(gameEvent);
          const { bargainContainer, bargainBtn } = addBargain(() => {
            checkCounter += gameParams.discount < 1 ? +1 : 0;
            console.log("checks complete:", checkCounter, "of", checkCount);
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
          popupContent.append(bargainContainer);

          timerId = setTimeout(() => {
            checkCounter = gameParams.discount < 1 ? +1 : 0;
            console.log(gameParams.discount);
            console.log("checks complete:", checkCounter, "of", checkCount);
            gameEvent = checkCounter >= checkCount ? vars.varw : vars.varl;
            bargainContainer.classList.add("hidden");

            displayEventFrame();
            bargainContainer.remove();
          }, 10000);
        } else {
          let checkCounter = checkEvent(gameEvent);

          console.log("checks complete:", checkCounter, "of", checkCount);
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

fireEventBtn.addEventListener("click", () => {
  playSound(sounds.event);
  startEvent("village");
});

function giveRewards(gameEvent) {
  const rewardList = document.createElement("ul");
  rewardList.className = "rewards-list";
  Object.entries(gameEvent.rewards).forEach(([key, value]) => {
    if (value !== null) {
      const rewardItem = document.createElement("li");
      if (key !== "abilities") {
        const diff = Math.min(gameParams[key], Math.abs(value));
        gameParams[key] = Math.max(gameParams[key] + value, 1);
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
          gameParams.abilities[key] += value;
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
        console.log("die", comb, "vs", value);
        checkCounter += comb >= value ? 1 : 0;
        break;
      }
      case "lvlCheck": {
        console.log("level:", gameParams.playerLvl, "vs", key, value);
        checkCounter += gameParams.playerLvl > value ? 1 : 0;
        break;
      }
      case "gold": {
        checkCounter++;
        console.log("gold checked before");
        break;
      }
      default: {
        console.log("Got something else:", `${key}`);
        break;
      }
    }
  });
  return checkCounter;
}
