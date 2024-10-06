import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./consts.js";

const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
