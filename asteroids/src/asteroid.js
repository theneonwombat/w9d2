const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');
const Util = require('./utils.js');

Util.inherits(Asteroid, MovingObject);

Object.defineProperty(Asteroid, "COLOR", {value: "purple"});
Object.defineProperty(Asteroid, "RADIUS", {value: 30});
Object.defineProperty(Asteroid, "NUM_IMAGES", {value: 8});

function Asteroid (options) {
  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec(1), game: options.game});
  this.color = Asteroid.COLOR;
  this.radius = Asteroid.RADIUS;
  this.img = new Image();
  const num = Math.floor(Math.random()*Asteroid.NUM_IMAGES);
  this.img.src = `./images/asteroidImg${num}.png`;
}

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) otherObject.relocate();
  else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
}

module.exports = Asteroid;