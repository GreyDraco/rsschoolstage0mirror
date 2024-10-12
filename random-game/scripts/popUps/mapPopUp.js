import { gameState, sounds } from "../consts.js";
import { gameEventsData } from "../data/gameEventsData.js";
import { playSound } from "../helpers/playNextAudio.js";
import { startEvent } from "./eventPopUp.js";
import { hidePopup, showPopup } from "./showPopup.js";

const mapBtn = document.querySelector(".mapBtn");
mapBtn.addEventListener("click", () => {
  playSound(sounds.btn);
  showPopup();
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("map-popup");

  const mapImg = document.createElement("img");
  mapImg.classList.add("map-img");
  mapImg.src = "./assets/map/map.jpg";
  popupContent.append(mapImg);

  const mapLocations = document.createElement("div");
  mapLocations.classList.add("map-locations");
  popupContent.append(mapLocations);
  Object.keys(gameEventsData).forEach((location) => {
    mapLocations.append(addNewLocation(location));
  });

  const popupContainer = document.querySelector(".popup-container");
  popupContainer.scrollTop =
    (popupContainer.scrollHeight - popupContainer.clientHeight) / 2;
  popupContainer.scrollLeft =
    (popupContainer.scrollWidth - popupContainer.clientWidth) / 2;
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
  if (gameState.completedEvents.includes(id)) {
    eventBtn.classList.add("completed");
  }

  if (!gameEventsData[id].immediateBattle) {
    battleBtn.style.display = "none";
  }

  locationDropdown.append(locationBtn, eventBtn, battleBtn);

  locationBtn.id = id;

  eventBtn.addEventListener("click", () => {
    playSound(sounds.event);
    hidePopup();
    startEvent(id);
  });
  battleBtn.addEventListener("click", () => {
    playSound(sounds.battle);
    hidePopup();
    startEvent("immediateBattle", gameEventsData[id]);
  });
  return locationDropdown;
}
