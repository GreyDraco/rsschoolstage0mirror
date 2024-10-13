import { gameState } from "../consts.js";

const combatBar = document.querySelector(".combatBar");
const civilBar = document.querySelector(".civilBar");

export default function toggleVisibleToolbar() {
  /*  combatBar.classList.toggle("hidden");
  civilBar.classList.toggle("hidden"); */
  if (gameState.isCombat) {
    combatBar.classList.remove("hidden");
    civilBar.classList.add("hidden");
  } else {
    combatBar.classList.add("hidden");
    civilBar.classList.remove("hidden");
  }
}
