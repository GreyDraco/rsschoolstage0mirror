import { ctx } from "../canvasSetup.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height, color, src, maxFrames = 1 /* , scale = 1 */, delay = 50 }) {
    this.xPos = x;
    this.yPos = y - height;
    this.color = color;
    this.width = width;
    this.height = height;
    this.xPosR = x + width;
    this.image = new Image();
    this.imgSrc = src;
    this.maxFrames = maxFrames;
    this.currentFrame = 0;
    //  this.scale = scale;
    this.delayCounter = 0;
    this.delay = delay;

    if (src) {
      this.image.src = src;
    }
  }

  display() {
    if (this.imgSrc) {
      ctx.drawImage(this.image, this.currentFrame * (this.image.width / this.maxFrames), 0, this.image.width / this.maxFrames, this.image.height, this.xPos, this.yPos, (this.image.width / this.maxFrames) * (this.width / this.image.width), this.image.height * (this.height / this.image.height));
      if (this.delayCounter % this.delay === 0) {
        if (this.currentFrame < this.maxFrames - 1) {
          this.currentFrame++;
        } else {
          this.currentFrame = 0;
        }
        this.delayCounter = 0;
      } else {
      }
      this.delayCounter++;
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
