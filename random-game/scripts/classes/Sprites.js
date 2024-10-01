import { ctx } from "../canvasSetup.js";
import { STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height, color, hp, power }) {
    this.xPos = x;
    this.yPos = y - height;
    this.color = color;
    this.width = width;
    this.height = height;
    this.xPosR = x + width;
    this.hp = hp;
    this.power = power;
  }

  display() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export class MovingSprite extends Sprite {
  constructor(props) {
    super(props);
    this.velocity = props.velocity + Math.random() * 0.5;
    this.stopPos = STOP_ENEMY_POS + Math.random() * 50;
  }
  move() {
    if (this.xPos > this.stopPos) {
      this.xPos -= this.velocity;
    } else {
    }
    super.display();
  }
}
