const MovingObject = require('./moving_object.js');
const Util = require('./utils.js');
const { Howl, Howler } = require('howler');
// const Sounds= require("./sound");

Util.inherits(Bullet, MovingObject);

Object.defineProperty(Bullet, "COLOR", { value: "red" });
Object.defineProperty(Bullet, "RADIUS", { value: 2 });
Object.defineProperty(Bullet, "REL_SPEED", { value: 3 });

function Bullet (options) {
    MovingObject.call(this, { 
        pos: options.pos, 
        vel: options.vel, 
        game: options.game,
        color: Bullet.COLOR, 
        radius: Bullet.RADIUS
    });
}

Bullet.prototype.isWrappable = function () {
    return false;
}

// Bullet.prototype.shootSound = function () {
//     Sounds.soundEffect(
//         1046.5,           //frequency
//         0,                //attack
//         0.3,              //decay
//         "sawtooth",       //waveform
//         1,                //Volume
//         -0.8,             //pan
//         0,                //wait before playing
//         1200,             //pitch bend amount
//         false,            //reverse bend
//         0,                //random pitch range
//         25,               //dissonance
//         [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
//         undefined,         //reverb: [duration, decay, reverse?]
//         3                 //Maximum duration of sound, in seconds
//     );
// }
module.exports = Bullet;