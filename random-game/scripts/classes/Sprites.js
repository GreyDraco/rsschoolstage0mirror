import { ctx } from "../canvasSetup.js";
import { spriteAnimationData, STOP_ENEMY_POS } from "../consts.js";

export class Sprite {
  constructor({
    x,
    y,
    width,
    height,
    color,
    src,
    maxFrames = 1 /* , scale = 1 */,
    delay = 50,
    offsetX = 0,
    offsetY = 0,
  }) {
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

  display(deltaTime) {
    if (this.imgSrc) {
      ctx.drawImage(
        this.image,
        this.currentFrame * (this.image.width / this.maxFrames),
        0,
        this.image.width / this.maxFrames,
        this.image.height,
        this.xPos - this.offsetX,
        this.yPos - this.offsetY,
        (this.image.width / this.maxFrames) * (this.width / this.image.width),
        this.image.height * (this.height / this.image.height)
      );
      this.delayCounter += deltaTime;

      if (this.delayCounter >= this.delay) {
        this.currentFrame--;
        if (this.currentFrame < 0) {
          this.currentFrame = this.maxFrames - 1;
        }

        this.delayCounter = 0;
      }
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    }

    return "klklk";
  }
}

export class Character extends Sprite {
  constructor({
    x,
    y,
    width,
    height,
    color,
    hp,
    power,
    src,
    maxFrames = 1,
    delay = 50,
    offsetX = 0,
    offsetY = 0,
    stopX = STOP_ENEMY_POS,
    spread = 50,
    spreadY = 50,
    type,
  }) {
    super({
      x,
      y,
      width,
      height,
      color,
      src,
      maxFrames,
      delay,
      offsetX,
      offsetY,
    });
    this.hp = hp;
    this.power = power;
    this.stopX = stopX;
    this.spread = spread;
    this.spreadY = spread;
    this.type = type;
    this.animationName = "idle";
  }
  selectAnimation(name = "idle") {
    if (name !== this.animationName) {
      this.imgSrc = spriteAnimationData[this.type][name].src;
      this.image.src = spriteAnimationData[this.type][name].src;
      this.width = spriteAnimationData[this.type][name].width;
      this.height = spriteAnimationData[this.type][name].height;
      this.maxFrames = spriteAnimationData[this.type][name].maxFrames;
      this.currentFrame = this.maxFrames;
      this.delay = spriteAnimationData[this.type][name].delay;
      this.offsetX = spriteAnimationData[this.type][name].offsetX;
      this.offsetY = spriteAnimationData[this.type][name].offsetY;
      this.animationName = name;
    }
  }
}

export class MovingCharacter extends Character {
  constructor(props) {
    super(props);
    this.velocity = props.velocity + Math.random() * 40;
    this.stopPos = props.stopX + Math.random() * props.spread;
    this.yPos = this.yPos + Math.random() * props.spreadY;
  }

  move(deltaTime, direction = -1) {
    const deltaInSeconds = deltaTime / 1000;

    if (this.xPos > this.stopPos) {
      this.xPos = Math.max(
        this.xPos + deltaInSeconds * this.velocity * direction,
        this.stopPos
      );
    } else {
      if (direction) {
        this.xPos += deltaInSeconds * this.velocity * direction;
      }
    }
    super.display(deltaTime);
  }
}
