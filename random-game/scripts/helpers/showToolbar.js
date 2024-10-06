const combatBar = document.querySelector(".combatBar");
const civilBar = document.querySelector(".civilBar");

export default function toggleVisibleToolbar() {
  combatBar.classList.toggle("hidden");
  civilBar.classList.toggle("hidden");
}
