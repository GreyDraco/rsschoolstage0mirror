import { ctx } from "../canvasSetup.js";
import { spriteAnimationData, STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({ x, y, width, height, color, src, maxFrames = 1 /* , scale = 1 */, delay = 50, offsetX = 0, offsetY = 0 }) {
    this.xPos = x;
    this.yPos = y /*  - height */;
    this.color = color;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.imgSrc = src;
    this.maxFrames = maxFrames;
    this.currentFrame = maxFrames - 1;
    //  this.scale = scale;
    this.delayCounter = 0;
    this.delay = delay;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    if (src) {
      this.image.src = src;
    }
  }

  display() {
    if (this.imgSrc) {
      ctx.drawImage(this.image, this.currentFrame * (this.image.width / this.maxFrames), 0, this.image.width / this.maxFrames, this.image.height, this.xPos - this.offsetX, this.yPos - this.offsetY, (this.image.width / this.maxFrames) * (this.width / this.image.width), this.image.height * (this.height / this.image.height));
      if (this.delayCounter % this.delay === 0) {
        if (this.currentFrame > 0) {
          this.currentFrame--;
        } else {
          this.currentFrame = this.maxFrames - 1;
        }
        this.delayCounter = 0;
      } else {
      }
      this.delayCounter++;
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
    return "klklk";
  }
}

export class Character extends Sprite {
  constructor({ x, y, width, height, color, hp, power, src, maxFrames = 1, delay = 50, offsetX = 0, offsetY = 0, stopX = STOP_ENEMY_POS, spread = 50 }) {
    super({ x, y, width, height, color, src, maxFrames, delay, offsetX, offsetY });
    this.hp = hp;
    this.power = power;
    this.stopX = stopX;
    this.spread = spread;
  }
  selectAnimation(name = "idle") {
    this.imgSrc = spriteAnimationData[this.type][name].src;
    this.image.src = spriteAnimationData[this.type][name].src;
    this.width = spriteAnimationData[this.type][name].width;
    this.height = spriteAnimationData[this.type][name].height;
    this.maxFrames = spriteAnimationData[this.type][name].maxFrames;
    this.delay = spriteAnimationData[this.type][name].delay;
    this.offsetX = spriteAnimationData[this.type][name].offsetX;
    this.offsetY = spriteAnimationData[this.type][name].offsetY;
  }
}

export class MovingCharacter extends Character {
  constructor(props, type = "guard") {
    super(props);
    this.velocity = props.velocity + Math.random() * 0.5;
    this.stopPos = props.stopX + Math.random() * props.spread;
    this.yPos = this.yPos + Math.random() * 50;
    this.type = type;
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
