import getCaruselWidth from "./getCaruselWidth.js";

export default function setCaruselWidth() {
  const caruselContainer = document.querySelector(".carusel-container");
  if (!caruselContainer) {
    return;
  }
  const cardContainers = document.querySelectorAll(".our-friends-cards");

  cardContainers.forEach((el) => (el.style.minWidth = `${getCaruselWidth()}px`));
  caruselContainer.style.transform = `translateX(-${getCaruselWidth()}px)`;
}
