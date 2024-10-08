import { Character, Sprite } from "./classes/Sprites.js";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CASTLE_PROPS,
  HP_CASTLE_POS,
  HP_ENEMIES_POS,
  HP_HEIGHT,
  HP_MAX_WIDTH,
  HP_Y_POS,
  spriteAnimationData,
} from "./consts.js";

export const castle = new Character(CASTLE_PROPS);

export const castleHP = new Sprite({
  x: HP_CASTLE_POS,
  y: HP_Y_POS,
  width: HP_MAX_WIDTH,
  height: HP_HEIGHT,
  color: "green",
});
export const enemiesHP = new Sprite({
  x: HP_ENEMIES_POS,
  y: HP_Y_POS,
  width: 0,
  height: HP_HEIGHT,
  color: "red",
});
export const fireball = new Sprite({
  x: CASTLE_PROPS.width + 20,
  y: 140,
  width: 8000 /* CANVAS_WIDTH - CASTLE_PROPS.width + 50 */,
  height: 370,
  color: "#d2060617",
  src: "./assets/sprites/explosionR.png",
  maxFrames: 12,
  delay: 10,
  offsetY: 0,
});
export const lightning = new Sprite({
  x: 0,
  y: 0,
  width: 80,
  height: CANVAS_HEIGHT,
  color: "#fdf16d7a",
});
export const background = new Sprite({
  x: 0,
  y: 0,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  src: "./assets/sprites/background.png",
});

export const dragon = new Sprite({
  x: 130,
  y: CANVAS_HEIGHT - 385,
  ...spriteAnimationData.dragon.idle,
});
