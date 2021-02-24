const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');

Util.inherits(Ship, MovingObject);

Object.defineProperty(Ship, "COLOR", {value: "orange"});
Object.defineProperty(Ship, "RADIUS", {value: 10});

function Ship (options) {
    MovingObject.call(this, {pos: options.pos, vel: [0,0], game: options.game});
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
}

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}

Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
}

module.exports = Ship;