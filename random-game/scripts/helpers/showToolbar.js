import { gameState } from "../consts.js";

const combatBar = document.querySelector(".combatBar");
const civilBar = document.querySelector(".civilBar");

export default function toggleVisibleToolbar() {
  toggleButtons();
  if (gameState.isCombat) {
    combatBar.classList.remove("hidden");
    civilBar.classList.add("hidden");
  } else if (!gameState.gameOver) {
    combatBar.classList.add("hidden");
    civilBar.classList.remove("hidden");
  }
}

function toggleButtons() {
  combatBar.style.pointerEvents = gameState.gameOver ? "none" : "auto";
  civilBar.style.pointerEvents = gameState.gameOver ? "none" : "auto";
}
