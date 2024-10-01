import { castle } from "../characters.js";
import { gameParams, MAX_CASTLE_HP } from "../consts.js";

export function calcCost(targetHP = MAX_CASTLE_HP, currentCastleHP = castle.hp) {
  return Math.floor((targetHP - Math.floor(currentCastleHP)) * gameParams.cost);
}
