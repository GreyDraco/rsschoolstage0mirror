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

let currentTrack = 0;
const audio = new Audio(data[currentTrack].src);

playBtn.addEventListener("click", () => {
  if (!playBtn.classList.contains("pause")) {
    audio.play();
  } else {
    audio.pause();
  }
  playBtn.classList.toggle("pause");
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
  if (volumeBtn.classList.contains("mute")) {
    volumeBtn.classList.remove("mute");
    audio.volume = volumeBar.value / 100;
  } else {
    audio.volume = volumeBar.value / 100;
  }
});

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("mute");
  volumeControl.classList.toggle("mute");
  audio.volume = volumeBtn.classList.contains("mute") ? 0 : volumeBar.value / 100;
});

function updateTrack(id = currentTrack) {
  audio.src = data[currentTrack].src;
  singerName.textContent = data[currentTrack].singer;
  trackName.textContent = data[currentTrack].title;
  labelName.textContent = data[currentTrack].label;
  if (playBtn.classList.contains("pause")) audio.play();
  audio.volume = volumeBtn.classList.contains("mute") ? 0 : volumeBar.value / 100;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${formatTimeDecimals(minutes)}:${formatTimeDecimals(seconds)}`;
}

function formatTimeDecimals(time) {
  return time >= 10 ? `${time}` : `0${time}`;
}

function updateCurrentState() {
  currentTime.textContent = formatTime(audio.currentTime);
  progressBar.value = Math.floor((audio.currentTime / audio.duration) * 100);
}

setInterval(updateCurrentState, 500);
