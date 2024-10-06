export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 500;
export const MAX_CASTLE_HP = 10000;
export const MAX_ENEMY_HP = 50;
export const CASTLE_PROPS = { x: 0, y: CANVAS_HEIGHT - 320, width: 270, height: 300, color: "green", hp: MAX_CASTLE_HP, power: 0.1, src: "./assets/sprites/castleLvl2.png" };
export const STOP_ENEMY_POS = CASTLE_PROPS.width - 20;
export const DIE_SIZE = 5;

export const HP_MAX_WIDTH = 300;
export const HP_HEIGHT = 30;
export const HP_Y_POS = 30;

export const HP_CASTLE_POS = 20;
export const HP_ENEMIES_POS = CANVAS_WIDTH - HP_MAX_WIDTH - HP_CASTLE_POS;
export const BASE_COST = 0.1;

export const enemyTypes = ["guard", "knight"];

export const spriteAnimationData = {
  guard: {
    run: { width: 1800, height: 225, src: "./assets/sprites/guard/Run.png", maxFrames: 8, delay: 30, offsetX: 90, offsetY: 0 },
    runBack: { width: 1800, height: 225, src: "./assets/sprites/guard/RunBack.png", maxFrames: 8, delay: 30, offsetX: 90, offsetY: 0 },
    attack: { width: 850, height: 200, src: "./assets/sprites/guard/Attack3.png", maxFrames: 4, delay: 30, offsetX: 90, offsetY: -10 },
    death: { width: 1350, height: 225, src: "./assets/sprites/guard/Death.png", maxFrames: 6, delay: 30, offsetX: 90, offsetY: 0 },
  },
  knight: {
    run: { width: 1800, height: 225, src: "./assets/sprites/knight/Run.png", maxFrames: 8, delay: 30, offsetX: 90, offsetY: 0 },
    runBack: { width: 1800, height: 225, src: "./assets/sprites/knight/RunBack.png", maxFrames: 8, delay: 30, offsetX: 90, offsetY: 0 },
    attack: { width: 1500, height: 225, src: "./assets/sprites/knight/Attack.png", maxFrames: 6, delay: 30, offsetX: 90, offsetY: 0 },
    death: { width: 1950, height: 225, src: "./assets/sprites/knight/Death.png", maxFrames: 9, delay: 30, offsetX: 90, offsetY: 0 },
  },
  dragon: {
    idle: { width: 1000, height: 150, src: "./assets/sprites/dragon/dragonIdle.png", maxFrames: 6, delay: 50 },
  },
};

export const gameParams = { cost: BASE_COST, gold: 1000, playerLvl: 1, discount: 1, castleHitCount: 3, castleRange: 300, abilities: { fireball: 0, lightning: 0, bargain: 0 } };
export const gameState = { gameOver: false, isCombat: false, isRepairUsed: false, isUpgradeUsed: false, totalEnemyHp: 0, isFireballActive: false, isLightningActive: false, isKingDead: false };

export const gameEnemyWave = { onScreenEnemies: [], deadEnemies: [], incomingEnemies: { guard: 0, knight: 0 } };

export const gameEnemies = {
  GUARD_ENEMIES_PROPS: { velocity: 1.5, x: CANVAS_WIDTH - 50, y: CANVAS_HEIGHT / 2 + 40, hp: MAX_ENEMY_HP, power: 0.1, ...spriteAnimationData.guard.run },

  KNIGHT_ENEMIES_PROPS: { velocity: 0.8, x: CANVAS_WIDTH - 50, y: CANVAS_HEIGHT / 2 + 40, hp: MAX_ENEMY_HP * 2, power: 0.2, ...spriteAnimationData.knight.run },
};

export const leaders = { results: [] };
export const leadersKey = "GrayDracoLeaders";
