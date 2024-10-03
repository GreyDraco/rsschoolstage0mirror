import { Sprite } from "./classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS } from "./consts.js";

export const castle = new Sprite(CASTLE_PROPS);

export const castleHP = new Sprite({ x: HP_CASTLE_POS, y: HP_Y_POS, width: HP_MAX_WIDTH, height: HP_HEIGHT, color: "green" });
export const enemiesHP = new Sprite({ x: HP_ENEMIES_POS, y: HP_Y_POS, width: 0, height: HP_HEIGHT, color: "red" });
export const fireball = new Sprite({ x: CASTLE_PROPS.width + 50, y: CANVAS_HEIGHT, width: CANVAS_WIDTH - CASTLE_PROPS.width + 50, height: 300, color: "#d2060617" });
export const lightning = new Sprite({ x: 0, y: CANVAS_HEIGHT, width: 80, height: CANVAS_HEIGHT, color: "#fdf16d7a" });
