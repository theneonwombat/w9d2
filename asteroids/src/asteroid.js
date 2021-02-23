const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
// const MovingObject = require('./moving_object.js');

function Asteroid (pos) {
  const CONSTANTS = {
    COLOR: "purple", RADIUS: 30
  };
  MovingObject.call(this, {pos: pos.pos, vel: Util.randomVec(1)});
  this.color = CONSTANTS.COLOR;
  this.radius = CONSTANTS.RADIUS;
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;