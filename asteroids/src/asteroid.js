const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

Util.inherits(Asteroid, MovingObject);
function Asteroid (options) {
  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec(1), game: options.game});
  // this.color = Asteroid.CONSTANTS.COLOR;
  // this.radius = Asteroid.CONSTANTS.RADIUS;
    this.color = Asteroid.COLOR;
    this.radius = Asteroid.RADIUS;
};

Object.defineProperty(Asteroid, "COLOR", {value: "purple"});
Object.defineProperty(Asteroid, "RADIUS", {value: 30});

module.exports = Asteroid;