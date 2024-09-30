import { ctx } from "../canvasSetup.js";
import { STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height, color }) {
    this.xPos = x;
    this.yPos = y - height;
    this.color = color;
    this.width = width;
    this.height = height;
    this.xPosR = x + width;
  }

  display() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export class MovingSprite extends Sprite {
  constructor(velocity, props) {
    super(props);
    this.velocity = velocity;
    this.stopPos = STOP_ENEMY_POS + Math.random() * 50;
  }
  move() {
    if (this.xPos > this.stopPos) {
      this.xPos -= this.velocity;
    }
    super.display();
  }
}
