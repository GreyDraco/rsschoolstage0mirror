import data from "./data.js";

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const volumeControl = document.querySelector(".volume-control");
const volumeBtn = document.querySelector(".volume-mute");
const volumeBar = document.querySelector(".volume");
const duration = document.querySelector(".duration");
const currentTime = document.querySelector(".current-time");
const progressBar = document.querySelector(".progress-bar");
const singerName = document.querySelector(".singer");
const trackName = document.querySelector(".track");
const labelName = document.querySelector(".label");
const runningInfo = document.querySelector(".track-info");
const trackInfoContainer = document.querySelector(".running-info");
const miniImg = document.querySelector(".mini-img");
const bigImg = document.querySelector(".back-img");

const maxTrackInfoWidth = trackInfoContainer.offsetWidth + 280;

let currentTrack = 0;
const audio = new Audio(data[currentTrack].src);
updateTrack();

playBtn.addEventListener("click", () => {
  if (!playBtn.classList.contains("pause")) {
    audio.play();
  } else {
    audio.pause();
  }
  playBtn.classList.toggle("pause");
  miniImg.classList.toggle("magnified");
});

audio.addEventListener("loadeddata", () => {
  duration.textContent = formatTime(audio.duration);
});

nextBtn.addEventListener("click", () => {
  currentTrack++;
  if (currentTrack >= data.length) {
    currentTrack = 0;
  }
  updateTrack(currentTrack);
});

prevBtn.addEventListener("click", () => {
  currentTrack -= 1;
  if (currentTrack < 0) {
    currentTrack = data.length - 1;
  }
  updateTrack(currentTrack);
});

progressBar.addEventListener("change", () => {
  audio.currentTime = Math.floor((progressBar.value * audio.duration) / 100);
});

volumeBar.addEventListener("change", () => {
  if (volumeBar.value < 1) {
    volumeBtn.classList.add("mute");
    volumeControl.classList.add("mute");
    audio.volume = 0;
  } else if (volumeBtn.classList.contains("mute") && volumeBar.value > 0) {
    volumeBtn.classList.remove("mute");
    volumeControl.classList.remove("mute");
    audio.volume = volumeBar.value / 100;
  } else {
    audio.volume = volumeBar.value / 100;
  }
});

volumeBtn.addEventListener("click", () => {
  if (volumeBar.value < 1 && volumeBtn.classList.contains("mute")) {
    volumeBar.value = 15;
  }
  volumeBtn.classList.toggle("mute");
  volumeControl.classList.toggle("mute");
  audio.volume = volumeBtn.classList.contains("mute") ? 0 : volumeBar.value / 100;
});

function updateTrack(id = currentTrack) {
  audio.src = data[currentTrack].src;
  singerName.textContent = data[currentTrack].singer;
  trackName.textContent = data[currentTrack].title;
  labelName.textContent = data[currentTrack].label;
  miniImg.src = data[currentTrack].img;
  bigImg.src = data[currentTrack].img;

  if (playBtn.classList.contains("pause")) audio.play();

  audio.volume = volumeBtn.classList.contains("mute") ? 0 : volumeBar.value / 100;

  checkRunningAnim();
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${formatTimeDecimals(minutes)}:${formatTimeDecimals(seconds)}`;
}

function formatTimeDecimals(time) {
  return time >= 10 ? `${time}` : `0${time}`;
}

function checkRunningAnim() {
  if (runningInfo.offsetWidth >= maxTrackInfoWidth) {
    runningInfo.classList.add("animated");
  } else {
    runningInfo.classList.remove("animated");
  }
}

function updateCurrentState() {
  currentTime.textContent = formatTime(audio.currentTime);
  progressBar.value = Math.floor((audio.currentTime / audio.duration) * 100);
  if (audio.currentTime === audio.duration) {
    currentTrack++;
    if (currentTrack >= data.length) {
      currentTrack = 0;
    }
    updateTrack(currentTrack);
  }
}

setInterval(updateCurrentState, 500);
