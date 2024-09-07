import pets from "../data/pets.js";

console.log("Script is connected!");

const overlay = document.querySelector(".overlay");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuList = document.querySelector(".burger-menu-list");
const body = document.body;
let nextIndexes = [];
let currentIndexes = [];
let prevIndexes = [];

burgerMenuBtn.addEventListener("click", () => {
  burgerMenuBtn.classList.toggle("burger-menu-btn_active");
  overlay.classList.toggle("overlay_active");
  burgerMenu.classList.toggle("burger-menu_active");
  body.classList.toggle("no-scroll");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

overlay.addEventListener("click", () => {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
});

burgerMenuList.addEventListener("click", () => {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
});

function handleResize() {
  if (window.innerWidth > 767) {
    burgerMenuBtn.classList.remove("burger-menu-btn_active");
    overlay.classList.remove("overlay_active");
    burgerMenu.classList.remove("burger-menu_active");
    body.classList.remove("no-scroll");
  }
}

window.addEventListener("resize", handleResize);

// <---------------- carusel ---------------->

function cardIndexGen(cardVisible, forbidIndexes = [], data = pets) {
  const petsSize = data.length;
  const cardIndexes = [];
  const initIndexes = Array.from({ length: petsSize }, (_, i) => i);
  const availableIndexes = initIndexes.filter((item) => !forbidIndexes.includes(item));
  console.log(availableIndexes);

  while (cardIndexes.length < cardVisible) {
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const cardIndex = availableIndexes[randomIndex];

    cardIndexes.push(cardIndex);
    availableIndexes.splice(randomIndex, 1);
  }
  console.log(cardIndexes);
  return cardIndexes;
}

console.log(pets);

const arrowRight = document.getElementById("btnRight");
const arrowLeft = document.getElementById("btnLeft");

arrowRight.addEventListener("click", () => {
  console.log("pressed");
});

function cardGenerator(id, data = pets) {
  const { img, name, type } = data[id];
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  cardContainer.id = `pet#${id}`;
  const petImage = document.createElement("img");
  petImage.src = img;
  petImage.alt = `${type} ${name}`;
  const cardContainerInfo = document.createElement("div");
  cardContainerInfo.classList.add("card-container-info");
  const cardNickname = document.createElement("h3");
  cardNickname.classList.add("card-nickname");
  cardNickname.textContent = name;
  const cardButton = document.createElement("button");
  cardButton.classList.add("button-hollow");
  cardButton.textContent = "Learn more";

  cardContainerInfo.append(cardNickname, cardButton);
  cardContainer.append(petImage, cardContainerInfo);

  return cardContainer;
}

const ourFriendsCards = document.querySelector(".our-friends-cards.current");
ourFriendsCards.innerHTML = "";
cardIndexGen(3).forEach((element) => {
  ourFriendsCards.append(cardGenerator(element));
});
