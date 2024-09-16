const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const volumeBtn = document.querySelectorAll(".volume-btn");
const duration = document.querySelector(".duration");
const currentTime = document.querySelector(".current-time");
const progressBar = document.querySelector(".progress-bar");

const audio = new Audio("./assets/audio/beyonce.mp3");
let audioDuration = 0;

playBtn.addEventListener("click", () => {
  if (!playBtn.classList.contains("pause")) {
    audio.play();
  } else {
    audio.pause();
  }
  playBtn.classList.toggle("pause");
});

audio.addEventListener("loadeddata", () => {
  console.log(formatTime(audio.duration));
  duration.textContent = formatTime(audio.duration);
});

nextBtn.addEventListener("click", () => {
  console.log(audio.currentTime);
});

progressBar.addEventListener("change", () => {
  audio.currentTime = Math.floor((progressBar.value * audio.duration) / 100);
});

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
