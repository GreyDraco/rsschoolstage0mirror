import { playNextAudio } from "../helpers/playNextAudio.js";

const overlay = document.querySelector(".overlay");
const body = document.body;

export function showPopup() {
  overlay.innerHTML = "";

  overlay.classList.toggle("overlay_active");

  /*   overlay.style.top = `${window.scrollY}px`; */
  const popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");

  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  popupContainer.append(popupContent);
  overlay.append(popupContainer);
  return { popupContainer, popupContent };
}

overlay.addEventListener("click", (event) => {
  if (!event.target.closest(".popup-container")) {
    const popupContent = document.querySelector(".popup-content");
    if (
      popupContent &&
      !popupContent.classList.contains("event-popup") &&
      !popupContent.classList.contains("end-game")
    ) {
      hidePopup();
      playNextAudio("idle");
    }
  }
});

export function hidePopup() {
  overlay.classList.remove("overlay_active");
  overlay.innerHTML = "";
}
