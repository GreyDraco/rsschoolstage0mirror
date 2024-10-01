import { DIE_SIZE } from "../consts.js";
import { gameEventsData } from "../data/gameEventsData.js";
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

  const eventName = "village";

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

        gameEvent = comb > 3 ? vars.varw : vars.varl;
        displayEventFrame();
      } else {
        Object.values(vars).forEach((variant) => {
          const choiceBtn = document.createElement("button");
          choiceBtn.textContent = variant.varDesc;
          choiceBtn.id = variant.varID;
          buttonContainer.append(choiceBtn);

          choiceBtn.addEventListener("click", () => {
            const varId = choiceBtn.id;

            gameEvent = variant;
            setTimeout(() => {
              displayEventFrame();
            }, 300);
          });
        });
      }
    } else {
      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";

      buttonContainer.append(okBtn);

      eventText.textContent = gameEvent.text;
      okBtn.addEventListener("click", () => {
        hidePopup();
      });
      return;
    }
  }
});
