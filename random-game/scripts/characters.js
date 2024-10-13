import { Character, MovingCharacter, Sprite } from "./classes/Sprites.js";
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

export const tower = new Sprite({
  x: castle.yPos - 190,
  y: castle.xPos + 55,
  width: 83.75,
  height: 400,
  src: "./assets/sprites/tower.png",
});

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
  width: 8000,
  height: 370,
  color: "#d2060617",
  src: "./assets/sprites/explosionR.png",
  maxFrames: 12,
  delay: 60,
  offsetY: 0,
});
export const lightning = new Sprite({
  x: 0,
  y: 0,
  width: 1400,
  height: CANVAS_HEIGHT,
  color: "#fdf16d7a",
  src: "./assets/sprites/lightning.png",
  maxFrames: 10,
  delay: 50,
});
export const background = new Sprite({
  x: 0,
  y: 0,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  src: "./assets/sprites/backgroundNoSky.png",
});

export const skybox = new MovingCharacter({
  velocity: 5,
  x: 0,
  y: 0,
  width: CANVAS_WIDTH * 2,
  height: CANVAS_HEIGHT,
  type: "background",
  stopX: -CANVAS_WIDTH,
  spread: 0,
  spreadY: 0,
  src: "./assets/sprites/skybox.png",
});

export const dragon = new Character({
  x: 90,
  y: CANVAS_HEIGHT - 410,
  ...spriteAnimationData.dragon.idle,
  type: "dragon",
});

export const flame = new Character({
  velocity: 20,
  x: 90,
  y: CANVAS_HEIGHT - 410,
  stopX: CANVAS_WIDTH,
  spread: 0,
  ...spriteAnimationData.flame,
  type: "flame",
});

export const money = new Sprite({
  x: CANVAS_WIDTH / 2 - 115,
  y: HP_Y_POS - 5,
  width: 40,
  height: 40,
  src: "./assets/icons/dollar.png",
});

export const playerLvl = new Sprite({
  x: dragon.xPos + 130,
  y: dragon.yPos - 20,
  width: 20,
  height: 20,
  src: "./assets/icons/star.png",
});
