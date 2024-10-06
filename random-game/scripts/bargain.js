import { BASE_COST, gameParams } from "./consts.js";

export function addBargain(updEnvLayout = () => {}) {
  let isBargainRun = false;
  gameParams.discount = 1;

  let intervalId = null;
  const bargainWinStart = Math.floor(Math.random() * 70);
  const bargainWinEnd = bargainWinStart + 30;

  const { bargainContainer, bargainBar, stopBargainBtn, discountText, bargainBtn } = buildBargainLayout();
  bargainBar.style.background = `linear-gradient(to right,white 0%, white ${bargainWinStart - 1}%, #434343 ${bargainWinStart}%, #82CFD0 ${bargainWinEnd}%, #fff ${bargainWinEnd}%, white ${bargainWinEnd + 1}%)`;

  stopBargainBtn.addEventListener("click", () => {
    isBargainRun = false;
    bargainBtn.disabled = isBargainRun;
    if (bargainBar.value <= bargainWinEnd && bargainBar.value >= bargainWinStart) {
      gameParams.discount = 0.7;
    } else {
      gameParams.discount = 1.25;
    }
    gameParams.cost = BASE_COST * gameParams.discount;

    //-----------------------------update layout after bargain-----------------------------------------------------------------------------
    updEnvLayout();
    //---------------------------------------------------------------------------------------------------------------
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  let direction = 1;
  function runBargain() {
    if (isBargainRun) {
      if (bargainBar.value === bargainBar.min || bargainBar.value === bargainBar.max) {
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
    isBargainRun = true;
    bargainContainer.classList.remove("hidden");
    bargainBar.value = 1;
    bargainBtn.disabled = isBargainRun;
    intervalId = setInterval(runBargain, 2 * gameParams.abilities.bargain);
    console.log(1.5 * gameParams.abilities.bargain);
  });

  return { bargainBtn, bargainContainer, discountText };
}

function buildBargainLayout() {
  const bargainBtn = document.createElement("button");
  bargainBtn.disabled = false;
  bargainBtn.className = "button bargain-btn";
  bargainBtn.textContent = "bargain";

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

  const stopBargainBtn = document.createElement("button");
  stopBargainBtn.className = "button stop-bargain-btn";
  stopBargainBtn.textContent = "stop bargain";

  bargainContainer.append(bargainTitle, bargainBar, stopBargainBtn);
  return { bargainContainer, bargainBar, stopBargainBtn, discountText, bargainBtn };
}
