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
  princess: "Подкуп врагов стал дешевле",
};

export const enemyTypes = ["guard", "knight", "cultist", "king"];

export const spriteAnimationData = {
  guard: {
    run: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/guard/Run.png",
      maxFrames: 8,
      delay: 120,
      offsetX: 90,
      offsetY: 0,
    },
    runBack: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/guard/RunBack.png",
      maxFrames: 8,
      delay: 120,
      offsetX: 90,
      offsetY: 0,
    },
    attack: {
      width: 850,
      height: 200,
      src: "./assets/sprites/guard/Attack3.png",
      maxFrames: 4,
      delay: 40,
      offsetX: 90,
      offsetY: -10,
    },
    death: {
      width: 1350,
      height: 225,
      src: "./assets/sprites/guard/Death.png",
      maxFrames: 6,
      delay: 90,
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
      delay: 120,
      offsetX: 90,
      offsetY: 0,
    },
    runBack: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/knight/RunBack.png",
      maxFrames: 8,
      delay: 120,
      offsetX: 90,
      offsetY: 0,
    },
    attack: {
      width: 1500,
      height: 225,
      src: "./assets/sprites/knight/Attack.png",
      maxFrames: 6,
      delay: 50,
      offsetX: 90,
      offsetY: 0,
    },
    death: {
      width: 1950,
      height: 225,
      src: "./assets/sprites/knight/Death.png",
      maxFrames: 9,
      delay: 100,
      offsetX: 90,
      offsetY: 0,
    },
  },
  dragon: {
    idle: {
      width: 1440,
      height: 175,
      src: "./assets/sprites/dragon/Idle.png",
      maxFrames: 6,
      delay: 150,
      offsetX: 0,
      offsetY: 0,
    },
    attack: {
      width: 4800,
      height: 175,
      src: "./assets/sprites/dragon/Attack.png",
      maxFrames: 20,
      delay: 130,
      offsetX: 0,
      offsetY: 0,
    },
    death: {
      width: 960,
      height: 175,
      src: "./assets/sprites/dragon/Death.png",
      maxFrames: 4,
      delay: 140,
      offsetX: 0,
      offsetY: 0,
    },
    dead: {
      width: 480,
      height: 175,
      src: "./assets/sprites/dragon/Dead.png",
      maxFrames: 2,
      delay: 150,
      offsetX: 0,
      offsetY: 0,
    },
  },
  king: {
    run: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/king/Run.png",
      maxFrames: 8,
      delay: 240,
      offsetX: 90,
      offsetY: 0,
    },
    runBack: {
      width: 1800,
      height: 225,
      src: "./assets/sprites/king/RunBack.png",
      maxFrames: 8,
      delay: 120,
      offsetX: 90,
      offsetY: 0,
    },
    attack: {
      width: 3000,
      height: 225,
      src: "./assets/sprites/king/Attack1.png",
      maxFrames: 12,
      delay: 80,
      offsetX: 90,
      offsetY: 0,
    },
    death: {
      width: 2475,
      height: 225,
      src: "./assets/sprites/king/Death.png",
      maxFrames: 11,
      delay: 200,
      offsetX: 90,
      offsetY: 0,
    },
  },
  cultist: {
    run: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/Run.png",
      maxFrames: 8,
      delay: 70,
      offsetX: 90,
      offsetY: 90,
    },
    runBack: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/RunBack.png",
      maxFrames: 8,
      delay: 70,
      offsetX: 90,
      offsetY: 90,
    },
    attack: {
      width: 3000,
      height: 375,
      src: "./assets/sprites/cultist/Attack2.png",
      maxFrames: 8,
      delay: 40,
      offsetX: 90,
      offsetY: 90,
    },
    death: {
      width: 2625,
      height: 375,
      src: "./assets/sprites/cultist/Death.png",
      maxFrames: 7,
      delay: 80,
      offsetX: 90,
      offsetY: 90,
    },
  },
  flame: {
    width: 14800,
    height: 420,
    src: "./assets/sprites/dragon/DragonBreath.png",
    maxFrames: 20,
    delay: 50,
    offsetX: 90,
    offsetY: 40,
  },
};

//---------------------Starting game params-----------------------------//

export const startingGameParams = {
  cost: BASE_COST,
  gold: 10000,
  playerLvl: 1,
  discount: 1,
  castleHitCount: 3,
  castleRange: 300,
  maxCastleHp: 10000,

  power: {
    fireball: 30,
    lightning: 150,
    bargain: 0,
  },
  abilities: { fireball: 0, lightning: 0, bargain: 0, princess: 0 },
};

export const startingGameState = {
  gameOver: false,
  isCombat: false,
  isRepairUsed: false,
  isUpgradeUsed: false,
  totalEnemyHp: 0,
  currentEnemiesHP: 0,
  isFireballActive: false,
  isLightningActive: false,
  isFireActive: false,
  isKingDead: false,
  generalVol: 1,
  musicVol: 1,
  soundVol: 1,
  completedEvents: [],
};

export const startingEnemyWave = {
  onScreenEnemies: [],
  deadEnemies: [],
  incomingEnemies: { guard: 0, knight: 0, cultist: 0, king: 0 },
};

export const gameParams = JSON.parse(JSON.stringify(startingGameParams));

export const CASTLE_PROPS = {
  x: 0,
  y: CANVAS_HEIGHT - 320,
  width: 270,
  height: 300,
  color: "green",
  hp: gameParams.maxCastleHp,
  power: 0.1 + Math.round(0.01 * gameParams.playerLvl * 100) / 100,
  src: "./assets/sprites/castleLvl2.png",
};
export const STOP_ENEMY_POS = CASTLE_PROPS.width - 20;

export const gameState = JSON.parse(JSON.stringify(startingGameState));

export const gameEnemyWave = JSON.parse(JSON.stringify(startingEnemyWave));

export const gameEnemies = {
  GUARD_ENEMIES_PROPS: {
    velocity: 200,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2 + 40,
    hp: MAX_ENEMY_HP,
    power: 0.1,
    stopX: STOP_ENEMY_POS,
    spread: 50,
    ...spriteAnimationData.guard.run,
  },

  KNIGHT_ENEMIES_PROPS: {
    velocity: 140,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2 + 40,
    hp: MAX_ENEMY_HP * 2,
    power: 0.2,
    stopX: STOP_ENEMY_POS,
    spread: 50,
    ...spriteAnimationData.knight.run,
  },

  CULTIST_ENEMIES_PROPS: {
    velocity: 120,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2,
    hp: MAX_ENEMY_HP * 4,
    power: 0.4,
    stopX: STOP_ENEMY_POS - 30,
    spread: 50,
    ...spriteAnimationData.cultist.run,
  },
  KING_ENEMIES_PROPS: {
    velocity: 10,
    x: CANVAS_WIDTH - 50,
    y: CANVAS_HEIGHT / 2 + 10,
    hp: MAX_ENEMY_HP * 1,
    power: 0.5,
    stopX: STOP_ENEMY_POS,
    spread: 0,
    ...spriteAnimationData.king.run,
  },
};

export const leaders = { results: [] };
export const leadersKey = "GrayDracoLeaders";
export const settingsKey = "GrayDracoSettings";

if (localStorage[settingsKey]) {
  Object.assign(gameState, JSON.parse(localStorage.getItem(settingsKey)));
}

export const audio = new Audio();
audio.loop = true;
/* audio.volume = 0.1; */
audio.volume = gameState.musicVol * gameState.generalVol;
export const sound = new Audio();
sound.volume = gameState.soundVol * gameState.generalVol;

export const sounds = {
  btn: "btn.mp3",
  battle: "battle.mp3",
  event: "event.mp3",
  fireball: "fireball.mp3",
  lightning: "lightning.mp3",
  fireBreath: "FireBreath.mp3",
  lose: "lose.wav",
  win: "win.mp3",
  money: "money.mp3",
  notEnoughMoney: "needgold.mp3",
};
