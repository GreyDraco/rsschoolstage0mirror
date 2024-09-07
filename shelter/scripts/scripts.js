import pets from "../data/pets.js";

const overlay = document.querySelector(".overlay");
const burgerMenuBtn = document.querySelector(".burger-menu-btn");
const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuList = document.querySelector(".burger-menu-list");
const body = document.body;
const currentFriendsCards = document.querySelector(".our-friends-cards.current");
const prevFriendsCards = document.querySelector(".our-friends-cards.prev");
const nextFriendsCards = document.querySelector(".our-friends-cards.next");
let direction = null;

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

function hideBurgerOverlay() {
  burgerMenuBtn.classList.remove("burger-menu-btn_active");
  overlay.classList.remove("overlay_active");
  burgerMenu.classList.remove("burger-menu_active");
  body.classList.remove("no-scroll");
  overlay.innerHTML = "";
  setCaruselWidth();
}

overlay.addEventListener("click", (event) => {
  if (!event.target.closest(".popup-container")) hideBurgerOverlay();
});

burgerMenuList.addEventListener("click", () => {
  hideBurgerOverlay();
});

function handleResize() {
  if (window.innerWidth > 767) {
    hideBurgerOverlay();
  }
}

window.addEventListener("resize", handleResize);

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

  cardContainer.addEventListener("click", () => {
    showPopup(id, data);
    setCaruselWidth();
  });

  return cardContainer;
}

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

function setCaruselWidth() {
  const cardContainers = document.querySelectorAll(".our-friends-cards");

  cardContainers.forEach((el) => (el.style.minWidth = `${getCaruselWidth()}px`));
  caruselContainer.style.transform = `translateX(-${getCaruselWidth()}px)`;
}
setCaruselWidth();
caruselContainer.style.transform = `translateX(-${getCaruselWidth()}px)`;
window.addEventListener("resize", () => {
  setCaruselWidth();
});

function getCaruselWidth() {
  const carusel = document.querySelector(".carusel");
  const caruselWidth = carusel.offsetWidth;
  return caruselWidth;
}

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

// <---------------------- popup  ------------------------->

function showPopup(id, data = pets) {
  overlay.innerHTML = "";

  overlay.classList.toggle("overlay_active");
  body.classList.toggle("no-scroll");

  const popupWrapper = document.createElement("div");
  popupWrapper.classList.add("popupWrapper");

  const closePopupBtn = document.createElement("button");
  closePopupBtn.className = "button-hollow round close-popup";
  closePopupBtn.textContent = "×";

  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popupImage = document.createElement("img");
  popupImage.classList.add("popup-img");
  popupImage.src = data[id].img;
  popupImage.alt = `${data[id].type} ${data[id].name}`;

  const popupInfo = document.createElement("div");
  popupInfo.classList.add("popup-info");

  const popupTitle = document.createElement("h2");
  popupTitle.classList.add("popup-title");
  popupTitle.textContent = data[id].name;

  const popupBreed = document.createElement("h3");
  popupBreed.classList.add("popup-breed");
  popupBreed.textContent = `${data[id].type} - ${data[id].breed}`;

  const popupParagraph = document.createElement("p");
  popupParagraph.classList.add("popup-paragraph");
  popupParagraph.textContent = data[id].description;

  const popupInfoList = document.createElement("ul");
  popupInfoList.classList.add("popup-info-list");

  const popupInfoAge = document.createElement("li");
  popupInfoAge.classList.add("popup-info-list-item");
  popupInfoAge.innerHTML = `<strong>Age:</strong> ${data[id].age}`;

  const popupInfoIno = document.createElement("li");
  popupInfoIno.classList.add("popup-info-list-item");
  popupInfoIno.innerHTML = `<strong>Inoculations:</strong> ${data[id].inoculations.join(", ")}`;

  const popupInfoDiseases = document.createElement("li");
  popupInfoDiseases.classList.add("popup-info-list-item");
  popupInfoDiseases.innerHTML = `<strong>Diseases:</strong> ${data[id].diseases.join(", ")}`;

  const popupInfoParasites = document.createElement("li");
  popupInfoParasites.classList.add("popup-info-list-item");
  popupInfoParasites.innerHTML = `<strong>Parasites:</strong> ${data[id].parasites.join(", ")}`;

  popupInfoList.append(popupInfoAge, popupInfoIno, popupInfoDiseases, popupInfoParasites);
  popupInfo.append(popupTitle, popupBreed, popupParagraph, popupInfoList);
  popupContainer.append(popupImage, popupInfo);
  popupWrapper.append(popupContainer, closePopupBtn);
  overlay.append(popupWrapper);
}
