import { ctx } from "../canvasSetup.js";
import { STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height, color, src }) {
    this.xPos = x;
    this.yPos = y - height;
    this.color = color;
    this.width = width;
    this.height = height;
    this.xPosR = x + width;
    this.image = new Image();
    this.imgSrc = src;
    if (src) {
      this.image.src = src;
    }
  }

  display() {
    if (this.imgSrc) {
      ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
  }
}

export class Character extends Sprite {
  constructor({ x, y, width, height, color, hp, power, src }) {
    super({ x, y, width, height, color, src });
    this.hp = hp;
    this.power = power;
  }
}

export class MovingCharacter extends Character {
  constructor(props) {
    super(props);
    this.velocity = props.velocity + Math.random() * 0.5;
    this.stopPos = STOP_ENEMY_POS + Math.random() * 50;
  }
  move(direction = -1) {
    if (this.xPos > this.stopPos) {
      this.xPos += this.velocity * direction;
    } else {
      if (direction) {
        this.xPos += this.velocity * direction;
      }
    }
    super.display();
  }
}
