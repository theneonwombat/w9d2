const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

Util.inherits(Ship, MovingObject);

function Ship (options) {
  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec(1), game: options.game});
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
};

Object.defineProperty(Ship, "COLOR", {value: "orange"});
Object.defineProperty(Ship, "RADIUS", {value: 10});

module.exports = Ship;