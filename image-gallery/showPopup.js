export default function showPopup(data) {
  const img = new Image();
  const overlay = document.querySelector(".overlay");
  const body = document.body;
  overlay.innerHTML = "";

  overlay.classList.toggle("overlay_active");
  body.classList.toggle("no-scroll");

  const popupWrapper = document.createElement("div");
  popupWrapper.classList.add("popupWrapper");

  const closePopupBtn = document.createElement("button");
  closePopupBtn.className = "close-popup";
  closePopupBtn.textContent = "×";

  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popupImage = document.createElement("div");
  popupImage.classList.add("popup-img");
  const src = data.urls.raw;
  img.src = src;
  img.onload = function () {
    popupImage.style.backgroundImage = `url(${src})`;
    popupImage.style.backgroundSize = `contain`;
  };

  const popupInfo = document.createElement("div");
  popupInfo.classList.add("popup-info");

  const popupTitle = document.createElement("h4");
  popupTitle.classList.add("popup-title");
  // popupTitle.textContent = data.alt_description;

  if (data.description) {
    popupTitle.textContent = data.description;
  }

  const popupLikes = document.createElement("h3");
  popupLikes.classList.add("popup-likes");
  popupLikes.textContent = `💙 ${data.likes}`;

  const popupInfoName = document.createElement("a");
  popupInfoName.classList.add("popup-info-name");
  popupInfoName.innerHTML = `${data.user.name}`;

  const popupInfoImg = document.createElement("img");
  popupInfoImg.classList.add("popup-info-img");
  popupInfoImg.src = data.user.profile_image.medium;

  const popupInfoArtist = document.createElement("div");
  popupInfoArtist.classList.add("popup-info-artist");

  popupInfoArtist.append(popupInfoImg, popupInfoName);
  popupInfo.append(popupTitle, popupLikes, popupInfoArtist);
  popupContainer.append(popupImage, popupInfo);
  popupWrapper.append(popupContainer, closePopupBtn);
  overlay.append(popupWrapper);
}
