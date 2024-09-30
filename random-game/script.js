import { ctx } from "./scripts/canvasSetup.js";
import { MovingSprite, Sprite } from "./scripts/classes/Sprites.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CASTLE_PROPS, START_ENEMIES_PROPS } from "./scripts/consts.js";

const castle = new Sprite(CASTLE_PROPS);

const enemy = new MovingSprite(1, START_ENEMIES_PROPS);

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  castle.display("green");
  enemy.move();
  enemy.display("red");
}
animate();
