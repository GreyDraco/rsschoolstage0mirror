const overlay = document.querySelector(".overlay");
const body = document.body;

export function showPopup() {
  overlay.innerHTML = "";

  overlay.classList.toggle("overlay_active");
  body.classList.toggle("no-scroll");

  // const popupWrapper = document.createElement("div");
  // popupWrapper.classList.add("popupWrapper");

  const closePopupBtn = document.createElement("button");
  closePopupBtn.className = "close-popup";
  closePopupBtn.textContent = "×";
  closePopupBtn.addEventListener("click", () => {
    hidePopup();
  });

  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  // popupWrapper.append(popupContainer, closePopupBtn);
  popupContainer.append(closePopupBtn);
  overlay.append(popupContainer);
}

overlay.addEventListener("click", (event) => {
  if (!event.target.closest(".popup-container")) hidePopup();
});

export function hidePopup() {
  overlay.classList.remove("overlay_active");
  document.body.classList.remove("no-scroll");
  overlay.innerHTML = "";
}
