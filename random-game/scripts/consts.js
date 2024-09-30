export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 500;
export const MAX_CASTLE_HP = 10000;
export const MAX_ENEMY_HP = 50;
export const CASTLE_PROPS = { x: 0, y: CANVAS_HEIGHT, width: 200, height: 300, color: "green", hp: MAX_CASTLE_HP, power: 0.1 };
export const START_ENEMIES_PROPS = { x: CANVAS_WIDTH - 50, y: CANVAS_HEIGHT, width: 50, height: 100, hp: MAX_ENEMY_HP, power: 0.1 };
export const STOP_ENEMY_POS = CASTLE_PROPS.width + 50;

export const HP_MAX_WIDTH = 300;
export const HP_HEIGHT = 30;
export const HP_Y_POS = 50;

export const HP_CASTLE_POS = 20;
export const HP_ENEMIES_POS = CANVAS_WIDTH - HP_MAX_WIDTH - HP_CASTLE_POS;
