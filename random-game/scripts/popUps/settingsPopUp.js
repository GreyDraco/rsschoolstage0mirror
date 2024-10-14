import {
  audio,
  fireBreath,
  gameState,
  settingsKey,
  sound,
  sounds,
} from "../consts.js";
import { createBtn } from "../helpers/createBtn.js";
import { playSound } from "../helpers/playNextAudio.js";
import { hidePopup, showPopup } from "./showPopup.js";
import { openStartPopUp } from "./startPopUp.js";

export function openSettingsPopup() {
  showPopup();

  const popupContent = document.querySelector(".popup-content");
  popupContent.classList.add("settings-content");

  const { volItem: musicVolItem } = createVolItem({
    name: "music",
    label: "Музыка",
    targetAudio: audio,
  });
  const { volItem: soundVolItem } = createVolItem({
    name: "sound",
    label: "Звуки",
    targetAudio: sound,
  });

  const { volItem: generalVolItem } = createVolItem({
    name: "general",
    label: "Общая громкость",
  });

  const saveBtn = createBtn();
  saveBtn.textContent = "Сохранить";
  saveBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    localStorage.setItem(
      settingsKey,
      JSON.stringify({
        generalVol: gameState.generalVol,
        musicVol: gameState.musicVol,
        soundVol: gameState.soundVol,
        difficulty: gameState.difficulty,
      })
    );
    hidePopup();
    openStartPopUp();
  });

  popupContent.append(
    musicVolItem,
    soundVolItem,
    generalVolItem,
    createDifficultyItem().diffItem,
    saveBtn
  );
}

function createDifficultyItem() {
  const diffItem = document.createElement("div");
  diffItem.className = `vol-item difficulty-item ${
    gameState.isCombat ? "locked" : ""
  }`;
  const diffTitle = document.createElement("p");
  diffTitle.className = `vol-title difficulty-title`;
  diffTitle.textContent = "Сложность";

  const diffBar = document.createElement("input");
  diffBar.className = `volume-input difficulty-input`;
  diffBar.type = "range";
  diffBar.step = 0.1;
  diffBar.min = 0.2;
  diffBar.max = 1;

  diffBar.value = gameState.difficulty;
  diffBar.addEventListener("change", () => {
    playSound(sounds.btn);
    gameState.difficulty = diffBar.value;
  });

  const diffContainer = document.createElement("div");
  diffContainer.className = `vol-container difficulty-container`;
  diffContainer.append(diffBar);

  diffItem.append(diffTitle, diffContainer);

  return { diffItem, diffTitle, diffBar };
}

function createVolItem({ name, label, targetAudio }) {
  const volItem = document.createElement("div");
  volItem.className = `vol-item ${name}-vol-item`;
  const volTitle = document.createElement("p");
  volTitle.className = `vol-title ${name}-vol-title`;
  volTitle.textContent = label;
  const volMuteBtn = document.createElement("button");
  volMuteBtn.className = `control-btn volume-btn ${name}-volume-btn`;

  const volBar = document.createElement("input");
  volBar.className = `volume-input ${name}-volume-input`;
  volBar.type = "range";
  volBar.min = 0;
  volBar.max = 100;

  const volContainer = document.createElement("div");
  volContainer.className = `vol-container ${name}-vol-container`;
  volContainer.append(volMuteBtn, volBar);

  const initVol = targetAudio ? gameState[`${name}Vol`] : gameState.generalVol;
  volBar.value = initVol * 100;
  if (initVol === 0) {
    volMuteBtn.classList.add("mute");
  }

  volItem.append(volTitle, volContainer);

  setClickHandlers(volMuteBtn, volBar, name, targetAudio);

  return { volItem, volTitle, volMuteBtn, volBar };
}

function setClickHandlers(volBtn, volBar, name, targetAudio) {
  volBtn.addEventListener("click", () => {
    playSound(sounds.btn);
    if (volBtn.classList.contains("mute")) {
      volBar.value = 100;
    } else {
      volBar.value = 0;
    }
    volBtn.classList.toggle("mute");

    const targetVol = volBtn.classList.contains("mute")
      ? 0
      : volBar.value / 100;

    if (targetAudio) {
      targetAudio.volume = targetVol * gameState.generalVol;
      gameState[`${name}Vol`] = volBar.value / 100;
    } else {
      gameState.generalVol = volBar.value / 100;
      audio.volume = (gameState.musicVol * volBar.value) / 100;
      sound.volume = (gameState.soundVol * volBar.value) / 100;
      fireBreath.volume = (gameState.soundVol * volBar.value) / 100;
    }
  });
  volBar.addEventListener("change", () => {
    playSound(sounds.btn);
  });

  volBar.addEventListener("input", () => {
    const currentVolume = volBar.value / 100;
    if (currentVolume * 100 < 1) {
      volBtn.classList.add("mute");
    } else if (volBtn.classList.contains("mute") && currentVolume > 0) {
      volBtn.classList.remove("mute");
    } else {
    }
    if (targetAudio) {
      targetAudio.volume = currentVolume * gameState.generalVol;
      gameState[`${name}Vol`] = currentVolume;
    } else {
      gameState.generalVol = currentVolume;

      audio.volume = gameState.musicVol * currentVolume;
      sound.volume = gameState.soundVol * currentVolume;
      fireBreath.volume = gameState.soundVol * currentVolume;
    }
  });
}
