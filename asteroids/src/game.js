const Asteroid = require("./asteroid");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");
// const { sounds } = require('./sound.js');
const { Howl, Howler } = require('howler');

function Game() {
    this.CONSTANTS = {
        DIM_X: 1000,
        DIM_Y: 500,
        NUM_ASTEROIDS: 15
    };
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(); 
    this.ship = new Ship({pos: this.randomPosition(), game: this});
    this.explosion = new Howl({ src: ['explosion.wav'], html5:true, volume: 1.0});
}

Game.prototype.addAsteroids = function () {
    const that = this;
    for (let i = 0; i < this.CONSTANTS.NUM_ASTEROIDS; i++) {
        this.add(new Asteroid({pos: this.randomPosition(), game: that}));
    }
}

Game.prototype.randomPosition = function () {
    return [Math.floor(Math.random() * this.CONSTANTS.DIM_X),
        Math.floor(Math.random() * this.CONSTANTS.DIM_Y)];
}

Game.prototype.draw = function (ctx, bg) {
    // ctx.clearRect(0,0, this.CONSTANTS.DIM_X, this.CONSTANTS.DIM_Y);
    ctx.drawImage(bg, 0, 0);
    const objects = this.allObjects();
    for (let i = 0; i < objects.length; i++) {
        if (objects[i]) objects[i].draw(ctx);
    }
    requestAnimationFrame(this.draw.bind(this, ctx, bg));
}

Game.prototype.move = function () {
    const objects = this.allObjects();
    for (let i = 0; i < objects.length; i++) {
        if (objects[i]) objects[i].move();
    } 
}

Game.prototype.wrap = function(pos, radius = 0) {
    if (pos[0] < (0 - radius)) {
        pos[0] = (this.CONSTANTS.DIM_X + radius);
    }
    if (pos[1] < (0 - radius)) {
        pos[1] = (this.CONSTANTS.DIM_Y + radius);
    }
    if (pos[0] > (this.CONSTANTS.DIM_X + radius)) {
        pos[0] = (0 - radius);
    }
    if (pos[1] > (this.CONSTANTS.DIM_Y + radius)) {
        pos[1] = (0 - radius);
    }
}

Game.prototype.outOfBounds = function (pos) {
    if (pos[0] < 0 || pos[0] > this.CONSTANTS.DIM_X ||
        pos[1] < 0 || pos[1] > this.CONSTANTS.DIM_Y)
        return true;
    return false;
}

Game.prototype.checkCollisions = function () {
    const objects = this.allObjects();
    
    for (let i = 0; i < objects.length; i++) {
        for (let j = i+1; j < objects.length; j++) {
            if (objects[i].isCollidedWith(objects[j])) {
                objects[i].collideWith(objects[j]);
                break;
            }
        }
    }
}

Game.prototype.step = function () {
    this.move();
    this.checkCollisions();
}

Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroid) {
        const astIndex = this.asteroids.indexOf(obj);
        this.asteroids.splice(astIndex, 1);
        this.explosion.play();
    }
    else if (obj instanceof Bullet) {
        const bulIndex = this.bullets.indexOf(obj);
        this.bullets.splice(bulIndex, 1);
    }
}

Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
}

Game.prototype.add = function(obj) {
    if (obj instanceof Asteroid) this.asteroids.push(obj);
    else if (obj instanceof Bullet) this.bullets.push(obj);
}


module.exports = Game;