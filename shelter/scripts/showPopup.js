export default function showPopup(id, data) {
  const overlay = document.querySelector(".overlay");
  const body = document.body;
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
