import { gameEventsData } from "../data/gameEventsData.js";
import { startEvent } from "./eventPopUp.js";
import { hidePopup, showPopup } from "./showPopup.js";

const mapBtn = document.querySelector(".mapBtn");
mapBtn.addEventListener("click", () => {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("map-popup");
  Object.keys(gameEventsData).forEach((location) => {
    popupContent.append(addNewLocation(location));
  });
});

function addNewLocation(id) {
  const locationDropdown = document.createElement("div");
  const locationBtn = document.createElement("button");
  const eventBtn = document.createElement("button");
  const battleBtn = document.createElement("button");

  locationDropdown.className = `location-dropdown dropdown-${id}`;
  locationBtn.className = `location-btn ${id}`;
  eventBtn.className = `dropdown-content event-btn event-${id}`;
  battleBtn.className = `dropdown-content battle-btn battle-${id}`;

  if (!gameEventsData[id].immediateBattle) {
    battleBtn.style.display = "none";
  }

  locationDropdown.append(locationBtn, eventBtn, battleBtn);

  locationBtn.id = id;

  locationBtn.textContent = id;
  eventBtn.addEventListener("click", () => {
    hidePopup();
    startEvent(id);
  });
  battleBtn.addEventListener("click", () => {
    hidePopup();
    startEvent("immediateBattle", gameEventsData[id]);
  });
  return locationDropdown;
}
