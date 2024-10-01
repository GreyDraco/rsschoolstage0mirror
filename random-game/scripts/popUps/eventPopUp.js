import { DIE_SIZE, gameEnemyWave, gameParams } from "../consts.js";
import { gameEventsData } from "../data/gameEventsData.js";
import startBattle from "../helpers/startBattle.js";
import { hidePopup, showPopup } from "./showPopup.js";

const fireEventBtn = document.querySelector(".DEBUG-event");

fireEventBtn.addEventListener("click", () => {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("event-popup");

  const eventText = document.createElement("p");
  const buttonContainer = document.createElement("div");
  const dieContainer = document.createElement("div");
  const dieMinigame = document.createElement("div");

  dieContainer.append(dieMinigame);
  popupContent.append(eventText, buttonContainer, dieContainer);

  const eventName = "city1"; // "village";

  let gameEvent = gameEventsData[eventName];

  displayEventFrame();

  function displayEventFrame() {
    eventText.textContent = gameEvent.text;

    let vars = gameEvent.vars;

    buttonContainer.innerHTML = "";
    if (vars) {
      eventText.textContent = gameEvent.text;
      if (gameEvent.die) {
        const comb = Math.floor(Math.random() * DIE_SIZE);
        console.log(comb);

        gameEvent = comb > 3 ? vars.varw : vars.varl;
        displayEventFrame();
      } else {
        Object.values(vars).forEach((variant) => {
          const choiceBtn = document.createElement("button");
          choiceBtn.textContent = variant.varDesc;
          choiceBtn.id = variant.varID;
          buttonContainer.append(choiceBtn);

          choiceBtn.addEventListener("click", () => {
            //  const varId = choiceBtn.id;

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
      });
      return;
    }
  }
});

function giveRewards(gameEvent) {
  const rewardList = document.createElement("ul");
  Object.entries(gameEvent.rewards).forEach(([key, value]) => {
    if (value !== null) {
      const rewardItem = document.createElement("li");
      if (key !== "abilities") {
        gameParams[key] = Math.max(gameParams[key] + value, 0);

        rewardItem.textContent = value > 0 ? `${key}: +${value}` : `${key}: ${value}`;
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
