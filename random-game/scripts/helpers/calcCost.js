import { castle } from "../characters.js";
import { gameParams } from "../consts.js";

export function calcCost(targetHP = gameParams.MAX_CASTLE_HP, currentCastleHP = castle.hp) {
  return Math.floor((targetHP - Math.floor(currentCastleHP)) * gameParams.cost);
}
