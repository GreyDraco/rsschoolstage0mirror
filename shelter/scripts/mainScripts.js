import pets from "../data/pets.js";
import "./burgerMenu.js";
import getCaruselWidth from "./getCaruselWidth.js";
import setCaruselWidth from "./setCaruselWidth.js";
import cardGenerator from "./cardGen.js";

const currentFriendsCards = document.querySelector(".our-friends-cards.current");
const prevFriendsCards = document.querySelector(".our-friends-cards.prev");
const nextFriendsCards = document.querySelector(".our-friends-cards.next");
let direction = null;

let nextIndexes = [];
let currentIndexes = [];
let prevIndexes = [];

// <---------------- carusel ---------------->

function cardIndexGen(cardVisible, forbidIndexes = [], data = pets) {
  const petsSize = data.length;
  const cardIndexes = [];
  const initIndexes = Array.from({ length: petsSize }, (_, i) => i);
  const availableIndexes = initIndexes.filter((item) => !forbidIndexes.includes(item));

  while (cardIndexes.length < cardVisible) {
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const cardIndex = availableIndexes[randomIndex];

    cardIndexes.push(cardIndex);
    availableIndexes.splice(randomIndex, 1);
  }

  return cardIndexes;
}

const arrowRight = document.getElementById("btnRight");
const arrowLeft = document.getElementById("btnLeft");

function cardsAppenderGen(parent, forbidIndexes = []) {
  parent.innerHTML = "";
  const indexes = cardIndexGen(3, forbidIndexes);
  indexes.forEach((element) => {
    parent.append(cardGenerator(element));
  });
  return indexes;
}

function cardsAppender(parent, indexes) {
  parent.innerHTML = "";
  indexes.forEach((element) => {
    parent.append(cardGenerator(element));
  });
  return indexes;
}

currentIndexes = cardsAppenderGen(currentFriendsCards);
prevIndexes = cardsAppenderGen(prevFriendsCards, currentIndexes);
nextIndexes = cardsAppenderGen(nextFriendsCards, currentIndexes);

const caruselContainer = document.querySelector(".carusel-container");

setCaruselWidth();

window.addEventListener("resize", () => {
  setCaruselWidth();
});

arrowRight.addEventListener("click", () => {
  caruselContainer.style.transform = `translateX(-${getCaruselWidth() * 2}px)`;
  caruselContainer.style.transition = "transform 1s";
  arrowLeft.disabled = true;
  arrowRight.disabled = true;
  direction = "right";
});

arrowLeft.addEventListener("click", () => {
  caruselContainer.style.transform = `translateX(0)`;
  caruselContainer.style.transition = "transform 1s";
  arrowLeft.disabled = true;
  arrowRight.disabled = true;
  direction = "left";
});

caruselContainer.addEventListener("transitionend", (event) => {
  if (event.propertyName === "transform") {
    arrowLeft.disabled = "";
    arrowRight.disabled = "";
    caruselContainer.style.transition = "";

    if (direction === "right") {
      prevIndexes = cardsAppender(prevFriendsCards, currentIndexes);
      currentIndexes = cardsAppender(currentFriendsCards, nextIndexes);
      nextIndexes = cardsAppenderGen(nextFriendsCards, currentIndexes);

      caruselContainer.style.transform = `translateX(-${getCaruselWidth()}px)`;
    } else {
      nextIndexes = cardsAppender(nextFriendsCards, currentIndexes);
      currentIndexes = cardsAppender(currentFriendsCards, prevIndexes);
      prevIndexes = cardsAppenderGen(prevFriendsCards, currentIndexes);
    }
    caruselContainer.style.transform = `translateX(-${getCaruselWidth()}px)`;
  }
});
