import { Character, Sprite } from "./classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS } from "./consts.js";

export const castle = new Character(CASTLE_PROPS);

export const castleHP = new Sprite({ x: HP_CASTLE_POS, y: HP_Y_POS, width: HP_MAX_WIDTH, height: HP_HEIGHT, color: "green" });
export const enemiesHP = new Sprite({ x: HP_ENEMIES_POS, y: HP_Y_POS, width: 0, height: HP_HEIGHT, color: "red" });
export const fireball = new Sprite({ x: CASTLE_PROPS.width + 50, y: CANVAS_HEIGHT, width: CANVAS_WIDTH - CASTLE_PROPS.width + 50, height: 300, color: "#d2060617" });
export const lightning = new Sprite({ x: 0, y: CANVAS_HEIGHT, width: 80, height: CANVAS_HEIGHT, color: "#fdf16d7a" });
export const background = new Sprite({ x: 0, y: CANVAS_HEIGHT, width: CANVAS_WIDTH, height: CANVAS_HEIGHT, src: "./assets/sprites/background.png" });

export const dragon = new Sprite({ x: 130, y: CANVAS_HEIGHT - 240, width: 1000, height: 150, src: "./assets/sprites/dragon/dragonIdle.png", color: "blue", maxFrames: 6, delay: 50 });
