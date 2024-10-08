import { audio } from "../consts.js";

export function playNextAudio(id = "idle") {
  audio.pause();
  audio.currentTime = 0;
  audio.src = `./assets/audio/${id}.mp3`;
  audio.play();
  // console.log("try to play:", id, audio.src);
}
