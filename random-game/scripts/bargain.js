import { BASE_COST, gameParams, sounds } from "./consts.js";
import { createBtn } from "./helpers/createBtn.js";
import { playSound } from "./helpers/playNextAudio.js";

export function addBargain(updEnvLayout = () => {}) {
  let isBargainRun = false;
  gameParams.discount = 1;

  let intervalId = null;
  const bargainWinStart = Math.floor(Math.random() * 70);
  const bargainWinEnd = bargainWinStart + 30;

  const {
    bargainContainer,
    bargainBar,
    stopBargainBtn,
    discountText,
    bargainBtn,
  } = buildBargainLayout();
  bargainBar.style.background = `linear-gradient(to right, #e9d3c2 0%, #e9d3c2 ${bargainWinStart}%, #2d1606 ${bargainWinStart}%, #8b5e3c ${
    (bargainWinEnd - bargainWinStart) / 2 + bargainWinStart
  }%,   #2d1606 ${bargainWinEnd + 1}%, #e9d3c2 ${bargainWinEnd + 1}%)`;

  stopBargainBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    isBargainRun = false;
    bargainBtn.disabled = isBargainRun;
    if (
      bargainBar.value <= bargainWinEnd &&
      bargainBar.value >= bargainWinStart
    ) {
      gameParams.discount = 0.7;
    } else {
      gameParams.discount = 1.25;
    }
    gameParams.cost = BASE_COST * gameParams.discount;

    updEnvLayout();
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  let direction = 1;
  function runBargain() {
    if (isBargainRun) {
      if (
        bargainBar.value === bargainBar.min ||
        bargainBar.value === bargainBar.max
      ) {
        direction = -direction;
      }
      if (direction > 0) {
        bargainBar.value++;
      } else {
        bargainBar.value--;
      }
    }
  }
  bargainBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    isBargainRun = true;
    bargainContainer.classList.remove("hidden");
    bargainBar.value = 1;
    bargainBtn.disabled = isBargainRun;
    intervalId = setInterval(runBargain, 2 * gameParams.abilities.bargain);
    const popupContent = document.querySelector(".popup-content");
    popupContent.scrollTo({
      top: 100500,
      behavior: "smooth",
    });
  });

  return { bargainBtn, bargainContainer, discountText };
}

function buildBargainLayout() {
  const bargainBtn = createBtn(["button", "bargain-btn"]);
  bargainBtn.disabled = false;
  bargainBtn.textContent = "Торговаться";

  const discountText = document.createElement("p");
  discountText.className = "discount-text hidden";

  const bargainContainer = document.createElement("div");
  bargainContainer.className = "bargain-container hidden";

  const bargainBar = document.createElement("input");
  bargainBar.classList.add("bargain-bar");
  bargainBar.type = "range";
  bargainBar.min = 0;
  bargainBar.max = 100;
  bargainBar.value = 0;
  bargainBar.step = 1;

  const bargainTitle = document.createElement("p");
  bargainTitle.className = "bargain-title";
  bargainTitle.textContent = "Торгуйтесь!";

  const stopBargainBtn = createBtn(["button", "stop-bargain-btn"]);
  stopBargainBtn.textContent = "Остановить торги";

  bargainContainer.append(bargainTitle, bargainBar, stopBargainBtn);
  return {
    bargainContainer,
    bargainBar,
    stopBargainBtn,
    discountText,
    bargainBtn,
  };
}
