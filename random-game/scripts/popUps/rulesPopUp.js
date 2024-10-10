import { sounds } from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playSound } from "../helpers/playNextAudio.js";
import { hidePopup, showPopup } from "./showPopup.js";
import { openStartPopUp } from "./startPopUp.js";

export function openRules() {
  showPopup();
  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("rules-content");

  const rules = document.createElement("p");
  rules.classList.add("rules");
  rules.textContent =
    "Путешествуйте по различным локациям, собирайте золото у местных жителей или участвуйте в событиях, чтобы получать особые награды. Улучшайте свой замок и способности, чтобы лучше защищаться от тех, кто хочет вернуть себе теперь уже ваше золото. Свергните короля и станьте властелином этих земель.";

  const backBtn = createBtn();
  backBtn.textContent = "Назад";
  backBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    hidePopup();
    openStartPopUp();
  });
  popupContent.append(rules, backBtn);
}
