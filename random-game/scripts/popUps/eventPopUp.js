import { addBargain } from "../bargain.js";
import { DIE_SIZE, gameEnemyWave, gameParams, gameState } from "../consts.js";
import { gameEventsData as events } from "../data/gameEventsData.js";
import startBattle from "../helpers/startBattle.js";
import { hidePopup, showPopup } from "./showPopup.js";

const fireEventBtn = document.querySelector(".DEBUG-event");

export function startEvent(id, gameEventsData = events) {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("event-popup");

  const eventText = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const dieContainer = document.createElement("div");
  const dieMinigame = document.createElement("div");

  dieContainer.append(dieMinigame);
  popupContent.append(eventText, buttonContainer, dieContainer);

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
        if (gameEvent.check.bargain && gameParams.abilities.bargain) {
          let timerId = null;
          gameParams.discount = 1;
          let checkCounter = checkEvent(gameEvent);

          const { bargainContainer, bargainBtn } = addBargain(() => {
            console.log(gameParams.discount);
            checkCounter = gameParams.discount < 1 ? +1 : 0;
            console.log(gameParams.discount);
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
          const choiceBtn = document.createElement("button");
          if (variant?.check?.gold && gameParams.gold - variant.check.gold < 0) {
            choiceBtn.disabled = true;
          }
          choiceBtn.textContent = variant.varDesc;
          choiceBtn.id = variant.varID;
          buttonContainer.append(choiceBtn);

          choiceBtn.addEventListener("click", () => {
            gameEvent = variant;
            setTimeout(() => {
              displayEventFrame();
            }, 300);
          });
        });
      }
    } else {
      const okBtn = document.createElement("button");

      if (gameEvent.rewards) {
        buttonContainer.prepend(giveRewards(gameEvent));
      }

      okBtn.textContent = "OK";

      buttonContainer.append(okBtn);
      eventText.textContent = gameEvent.text;
      okBtn.addEventListener("click", () => {
        if (gameEvent.battle) {
          gameEnemyWave.incomingEnemies = { ...gameEvent.battle };

          startBattle();
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
  startEvent("village");
});

function giveRewards(gameEvent) {
  const rewardList = document.createElement("ul");
  Object.entries(gameEvent.rewards).forEach(([key, value]) => {
    if (value !== null) {
      const rewardItem = document.createElement("li");
      if (key !== "abilities") {
        const diff = Math.min(gameParams[key], Math.abs(value));
        gameParams[key] = Math.max(gameParams[key] + value, 0);

        rewardItem.textContent = value > 0 ? `${key}: +${value}` : `${key}: ${-diff}`;
      } else {
        Object.entries(value).forEach(([key, value]) => {
          gameParams.abilities[key] += value;
          rewardItem.textContent = `ability leveled up: ${key}`;
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
        console.log("ERR got something else");
        break;
      }
    }
  });
  return checkCounter;
}
