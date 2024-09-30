import { ctx } from "../canvasSetup.js";
import { STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height }) {
    this.xPos = x;
    this.yPos = y - height;

    this.width = width;
    this.height = height;
    this.xPosR = x + width;
  }

  display(color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export class MovingSprite extends Sprite {
  constructor(velocity, props) {
    super(props);
    this.velocity = velocity;
  }
  move() {
    if (this.xPos > STOP_ENEMY_POS) {
      this.xPos -= this.velocity;
    }
  }
}
