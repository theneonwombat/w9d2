const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');
const Util = require('./utils.js');
const { Howl, Howler } = require('howler');


Util.inherits(Ship, MovingObject);

Object.defineProperty(Ship, "COLOR", {value: "orange"});
Object.defineProperty(Ship, "RADIUS", {value: 10});
//Object.defineProperty(Ship, "MAX_SPEED", {value: 10});


function Ship (options) {
    MovingObject.call(this, {pos: options.pos, vel: [0,0], game: options.game});
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.blast = new Howl({ src: ['./sounds/blaster.wav'], html5: true });

}

Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
}

Ship.prototype.speed = function() {
    return Util.speed(this.vel);
} 

Ship.prototype.power = function (impulse) {
    this.vel = Util.addVectors(this.vel, impulse);
    // if (this.speed(vel) <= Ship.MAX_SPEED) this.vel = vel; 
}

Ship.prototype.fireBullet = function() {
    if (this.speed() === 0) return;
    const pos = Util.addVectors(this.pos, Util.scale(this.vel, this.radius));
    const vel = Util.scale (this.vel, Bullet.REL_SPEED);
    const bullet = new Bullet({pos: pos, vel: vel, game: this.game});
    this.game.add(bullet);
    // bullet.shootSound();
    this.blast.play();
}

module.exports = Ship;