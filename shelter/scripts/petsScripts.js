import pets from "../data/pets.js";
import "./burgerMenu.js";
import cardGenerator from "./cardGen.js";

const petsGridContainer = document.querySelector(".pets-grid-container");
let currentPage = 1;
let currentFirstIndex = 0;
const sixSize = 985;
const threeSize = 530;
const cardArray = generateStartArray();
const toFirstBtn = document.querySelector(".first-page");
const toPrevBtn = document.querySelector(".prev-page");
const toNextBtn = document.querySelector(".next-page");
const toLastBtn = document.querySelector(".last-page");
const currentPageBtn = document.querySelector(".current");

const cardData = {
  cardsOnPage: 8,
  totalPages: 6,
};

calcCardsOnPage();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function redrawPageCards() {
  const startIndex = (currentPage - 1) * cardData.cardsOnPage;
  currentFirstIndex = startIndex;
  const endIndex = startIndex + cardData.cardsOnPage;
  const displayIds = cardArray.slice(startIndex, endIndex);
  populateContainer(displayIds);
  if (currentPage === cardData.totalPages) {
    toNextBtn.disabled = true;
    toLastBtn.disabled = true;
    toFirstBtn.disabled = "";
    toPrevBtn.disabled = "";
  } else if (currentPage === 1) {
    toNextBtn.disabled = "";
    toLastBtn.disabled = "";
    toFirstBtn.disabled = true;
    toPrevBtn.disabled = true;
  } else {
    toNextBtn.disabled = "";
    toLastBtn.disabled = "";
    toFirstBtn.disabled = "";
    toPrevBtn.disabled = "";
  }
}

function calcCardsOnPage() {
  const currentWidth = window.innerWidth;
  if (currentWidth > sixSize) {
    cardData.cardsOnPage = 8;
    cardData.totalPages = 6;
    redrawPageCards();
  } else if (currentWidth < threeSize) {
    cardData.cardsOnPage = 3;
    cardData.totalPages = 16;
    redrawPageCards();
  } else {
    cardData.cardsOnPage = 6;
    cardData.totalPages = 8;
    redrawPageCards();
  }
}

function generateStartArray() {
  const petsSize = pets.length;
  const initArray = Array.from({ length: petsSize }, (_, i) => i);
  const resultArray = [];

  const firstArray = shuffle(initArray);
  resultArray.push(...firstArray);
  const firstHalf = resultArray.slice(0, 4);
  const secondHalf = resultArray.slice(-4);

  for (let i = 0; i < 5; i++) {
    resultArray.push(...shuffle(firstHalf));
    resultArray.push(...shuffle(secondHalf));
  }

  return resultArray;
}

function populateContainer(array) {
  petsGridContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    petsGridContainer.append(cardGenerator(array[i]));
  }
}

window.addEventListener("resize", () => {
  calcCardsOnPage();
  if (currentPage > cardData.totalPages) {
    currentPage = cardData.totalPages;
    currentPageBtn.textContent = currentPage;
    redrawPageCards();
  }
});

toFirstBtn.addEventListener("click", () => {
  currentPage = 1;
  currentPageBtn.textContent = currentPage;
  redrawPageCards();
});
toPrevBtn.addEventListener("click", () => {
  currentPage--;
  currentPageBtn.textContent = currentPage;
  redrawPageCards();
});
toNextBtn.addEventListener("click", () => {
  currentPage++;
  currentPageBtn.textContent = currentPage;
  redrawPageCards();
});
toLastBtn.addEventListener("click", () => {
  currentPage = cardData.totalPages;
  currentPageBtn.textContent = currentPage;
  redrawPageCards();
});
