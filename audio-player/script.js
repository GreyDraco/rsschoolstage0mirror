import data from "./data.js";

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const volumeControl = document.querySelector(".volume-control");
const volumeBtn = document.querySelector(".volume-mute-btn");
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
const equalizer = document.querySelector(".equalizer");

const maxTrackInfoWidth = trackInfoContainer.offsetWidth + 280;

let isProgressBarFocused = false;

progressBar.addEventListener("input", () => {
  progressBar.style.background = `linear-gradient(to right, #434343 0%, #82CFD0 ${progressBar.value}%, #fff ${progressBar.value}%, white 100%)`;
  isProgressBarFocused = true;
});

let currentTrack = 0;
const audio = new Audio(data[currentTrack].src);
updateTrack();

playBtn.addEventListener("click", () => {
  if (!playBtn.classList.contains("pause")) {
    audio.play();
    equalizer.classList.remove("off");
  } else {
    audio.pause();
    equalizer.classList.add("off");
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
  if (!playBtn.classList.contains("pause")) {
    audio.play();
    equalizer.classList.remove("off");
    playBtn.classList.add("pause");
    miniImg.classList.add("magnified");
  }
});

prevBtn.addEventListener("click", () => {
  currentTrack -= 1;
  if (currentTrack < 0) {
    currentTrack = data.length - 1;
  }
  updateTrack(currentTrack);
  if (!playBtn.classList.contains("pause")) {
    audio.play();
    equalizer.classList.remove("off");
    playBtn.classList.add("pause");
    miniImg.classList.add("magnified");
  }
});

backwardBtn.addEventListener("click", () => {
  if (audio.currentTime < 10) {
    audio.currentTime = 0;
  } else {
    audio.currentTime -= 10;
  }
});

forwardBtn.addEventListener("click", () => {
  if (audio.currentTime > audio.duration - 10) {
    audio.currentTime = audio.duration;
  } else {
    audio.currentTime += 10;
  }
});

progressBar.addEventListener("change", () => {
  audio.currentTime = Math.floor((progressBar.value * audio.duration) / 100);
  isProgressBarFocused = false;
});

volumeBar.addEventListener("input", () => {
  const currentVolume = volumeBar.value;
  if (currentVolume < 1) {
    volumeBtn.classList.add("mute");
    volumeControl.classList.add("mute");
    equalizer.classList.add("off");
    audio.volume = 0;
  } else if (volumeBtn.classList.contains("mute") && currentVolume > 0) {
    volumeBtn.classList.remove("mute");
    volumeControl.classList.remove("mute");
    equalizer.classList.remove("off");
    audio.volume = currentVolume / 100;
  } else {
    audio.volume = currentVolume / 100;
  }
  equalizer.style.height = `${(currentVolume * 130) / 100}px`;
});

volumeBtn.addEventListener("click", () => {
  if (volumeBtn.classList.contains("mute")) {
    volumeBar.value = 40;
    equalizer.classList.remove("off");
    equalizer.style.height = `${(40 * 130) / 100}px`;
  } else {
    volumeBar.value = 0;
    equalizer.classList.add("off");
  }
  volumeBtn.classList.toggle("mute");
  volumeControl.classList.toggle("mute");
  audio.volume = volumeBtn.classList.contains("mute") ? 0 : volumeBar.value / 100;
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight") {
    if (audio.currentTime > audio.duration - 10) {
      audio.currentTime = audio.duration;
    } else {
      audio.currentTime += 10;
    }
  } else if (e.code === "ArrowLeft") {
    if (audio.currentTime < 10) {
      audio.currentTime = 0;
    } else {
      audio.currentTime -= 10;
    }
  }
});

function updateTrack(id = currentTrack) {
  audio.src = data[currentTrack].src;
  singerName.textContent = data[currentTrack].singer;
  trackName.textContent = data[currentTrack].title;
  labelName.textContent = data[currentTrack].label;
  miniImg.src = data[currentTrack].img;
  document.body.style.backgroundImage = `url(${data[currentTrack].img})`;

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
  if (!isProgressBarFocused) {
    progressBar.value = Math.floor((audio.currentTime / audio.duration) * 100);
    progressBar.style.background = `linear-gradient(to right, #434343 0%, #82CFD0 ${progressBar.value}%, #fff ${progressBar.value}%, white 100%)`;
  }
  if (audio.currentTime === audio.duration && playBtn.classList.contains("pause")) {
    currentTrack++;
    if (currentTrack >= data.length) {
      currentTrack = 0;
    }
    updateTrack(currentTrack);
  }
}

setInterval(updateCurrentState, 500);

console.log(`- Вёрстка +10
вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
- Кнопка Play/Pause +10
есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
- При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
- При смене аудиотрека меняется изображение - обложка аудиотрека +10
- Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
- Отображается продолжительность аудиотрека и его текущее время проигрывания +10
- Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10`);

console.log(` Дополнителльный функционал:
- Добавлены кнопки прокрутки вперед/назад на 10 секунд
- Добавлена кнопка регулировки громкости
- Добавлена прокрутка Исполнитель-Трек-Альбом для более длинных комбинаций трека исполнителя и альбома
- Добавлен эквалайзер для улучшения оформления`);
