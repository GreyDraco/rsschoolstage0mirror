import { Sprite } from "./classes/Sprites.js";
import { CASTLE_PROPS, HP_CASTLE_POS, HP_ENEMIES_POS, HP_HEIGHT, HP_MAX_WIDTH, HP_Y_POS } from "./consts.js";

export const castle = new Sprite(CASTLE_PROPS);

export const castleHP = new Sprite({ x: HP_CASTLE_POS, y: HP_Y_POS, width: HP_MAX_WIDTH, height: HP_HEIGHT, color: "green" });
export const enemiesHP = new Sprite({ x: HP_ENEMIES_POS, y: HP_Y_POS, width: 0, height: HP_HEIGHT, color: "red" });
