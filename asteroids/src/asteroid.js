const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Util = require('./utils.js');

Util.inherits(Asteroid, MovingObject);

Object.defineProperty(Asteroid, "COLOR", {value: "purple"});
Object.defineProperty(Asteroid, "RADIUS", {value: 30});

function Asteroid (options) {
  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec(1), game: options.game});
  this.color = Asteroid.COLOR;
  this.radius = Asteroid.RADIUS;
}

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship) otherObject.relocate();
}

module.exports = Asteroid;