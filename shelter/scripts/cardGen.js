import pets from "../data/pets.js";
import showPopup from "./showPopup.js";

export default function cardGenerator(id, data = pets) {
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
  });

  return cardContainer;
}
