import { audio, gameState, sound, sounds } from "../consts.js";

export function playNextAudio(id = "idle") {
  if (
    (audio.src.split("/").at(-1) != `${id}.mp3` && !gameState.isCombat) ||
    id === "battle" ||
    id === "kingBattle"
  ) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = `./assets/audio/${id}.mp3`;
    audio.play();
  }
}

export function playSound(soundName = sounds.btn, track = sound) {
  track.pause();
  track.currentTime = 0;
  track.src = `./assets/sounds/${soundName}`;
  track.play();
}
