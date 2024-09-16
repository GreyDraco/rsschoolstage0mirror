const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const volumeBtn = document.querySelectorAll(".volume-btn");

var audio = new Audio("./assets/audio/beyonce.mp3");

playBtn.addEventListener("click", () => {
  if (!playBtn.classList.contains("pause")) {
    audio.play();
  } else {
    audio.pause();
  }
  playBtn.classList.toggle("pause");
});
