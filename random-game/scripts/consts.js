export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 500;
export const MAX_ENEMY_HP = 50;

export const DIE_SIZE = 5;

export const HP_MAX_WIDTH = 300;
export const HP_HEIGHT = 30;
export const HP_Y_POS = 30;

export const HP_CASTLE_POS = 20;
export const HP_ENEMIES_POS = CANVAS_WIDTH - HP_MAX_WIDTH - HP_CASTLE_POS;
export const BASE_COST = 0.1; // repair cost

export const upgradeCosts = {
  playerLvl: 5000,
  maxCastleHp: 500,
  castleHitCount: 3000,
  abilities: { fireball: 7000, lightning: 5000, bargain: 5000 },
};
export const upgradeMax = {
  playerLvl: 10,
  maxCastleHp: 15,
  castleHitCount: 5,
  abilities: { fireball: 5, lightning: 5, bargain: 10 },
};

export const paramsLocalization = {
  gold: "Золото",
  playerLvl: "Уровень",
  fireball: "Огненный взрыв",
  lightning: "Удар молнией",
  bargain: "Торговля",
};

export const enemyTypes = ["guard", "knight", "cultist"];

export const spriteAnimationData = {
  guard: {
    run: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/guard/Run.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
    runBack: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/guard/RunBack.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
    attack: {
      width: 850,
      height: 200,
      src: "./assets/sprites/guard/Attack3.png",
      maxFrames: 4,
      delay: 30,
      offsetX: 90,
      offsetY: -10,
    },
    death: {
      width: 1350,
      height: 225,
      src: "./assets/sprites/guard/Death.png",
      maxFrames: 6,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
  },
  knight: {
    run: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/knight/Run.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
    runBack: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/knight/RunBack.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
    attack: {
      width: 1500,
      height: 225,
      src: "./assets/sprites/knight/Attack.png",
      maxFrames: 6,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
    death: {
      width: 1950,
      height: 225,
      src: "./assets/sprites/knight/Death.png",
      maxFrames: 9,
      delay: 30,
      offsetX: 90,
      offsetY: 0,
    },
  },
  dragon: {
    idle: {
      width: 1000,
      height: 150,
      src: "./assets/sprites/dragon/dragonIdle.png",
      maxFrames: 6,
      delay: 50,
    },
  },
  cultist: {
    run: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/Run.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 90,
    },
    runBack: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/RunBack.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 90,
    },
    attack: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/Attack2.png",
      maxFrames: 8,
      delay: 30,
      offsetX: 90,
      offsetY: 90,
    },
    death: {
      width: 2625,
      height: 375,
      src: "./assets/sprites/cultist/Death.png",
      maxFrames: 7,
      delay: 30,
      offsetX: 90,
      offsetY: 90,
    },
  },
};

export const gameParams = {
  cost: BASE_COST,
  gold: 100000,
  playerLvl: 10,
  discount: 1,
  castleHitCount: 3,
  castleRange: 300,
  maxCastleHp: 10000,
  power: {
    fireball: 30,
    lightning: 150,
    bargain: 10,
  },
  abilities: { fireball: 1, lightning: 1, bargain: 10, princess: 0 },
};

export const CASTLE_PROPS = {
  x: 0,
  y: CANVAS_HEIGHT - 320,
  width: 270,
  height: 300,
  color: "green",
  hp: gameParams.maxCastleHp,
  power: 0.1,
  src: "./assets/sprites/castleLvl2.png",
};
export const STOP_ENEMY_POS = CASTLE_PROPS.width - 20;

export const gameState = {
  gameOver: false,
  isCombat: false,
  isRepairUsed: false,
  isUpgradeUsed: false,
  totalEnemyHp: 0,
  isFireballActive: false,
  isLightningActive: false,
  isKingDead: false,
};

export const gameEnemyWave = {
  onScreenEnemies: [],
  deadEnemies: [],
  incomingEnemies: { guard: 0, knight: 0, cultist: 0 },
};

export const gameEnemies = {
  GUARD_ENEMIES_PROPS: {
    velocity: 1.5,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2 + 40,
    hp: MAX_ENEMY_HP,
    power: 0.1,
    stopX: STOP_ENEMY_POS,
    spread: 50,
    ...spriteAnimationData.guard.run,
  },

  KNIGHT_ENEMIES_PROPS: {
    velocity: 0.8,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2 + 40,
    hp: MAX_ENEMY_HP * 2,
    power: 0.2,
    stopX: STOP_ENEMY_POS,
    spread: 50,
    ...spriteAnimationData.knight.run,
  },

  CULTIST_ENEMIES_PROPS: {
    velocity: 0.3,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2,
    hp: MAX_ENEMY_HP * 4,
    power: 0.4,
    stopX: 400,
    spread: 150,
    ...spriteAnimationData.cultist.run,
  },
};

export const leaders = { results: [] };
export const leadersKey = "GrayDracoLeaders";

export const audio = new Audio();
audio.loop = true;
audio.volume = 0.1;
