const Asteroid = require("./asteroid");

function Game() {
    this.CONSTANTS = {
        DIM_X: 500,
        DIM_Y: 500,
        NUM_ASTEROIDS: 10
    };

    this.asteroids = [];
    this.addAsteroids();  
}

Game.prototype.addAsteroids = function () {
    const that = this;
    for (let i = 0; i < this.CONSTANTS.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: that}));
    }
}

Game.prototype.randomPosition = function () {
    return [Math.floor(Math.random() * this.CONSTANTS.DIM_X),
        Math.floor(Math.random() * this.CONSTANTS.DIM_Y)];
}

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0, this.CONSTANTS.DIM_X, this.CONSTANTS.DIM_Y);
    for (let i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i]) this.asteroids[i].draw(ctx);
    }
}

Game.prototype.move = function () {
    for (let i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i]) this.asteroids[i].move();
    } 
}

Game.prototype.wrap = function(pos) {
    if (pos[0] < (0 - Asteroid.RADIUS)) {
        pos[0] = (this.CONSTANTS.DIM_X + Asteroid.RADIUS);
    }
    if (pos[1] < (0 - Asteroid.RADIUS)) {
        pos[1] = (this.CONSTANTS.DIM_Y + Asteroid.RADIUS);
    }
    if (pos[0] > (this.CONSTANTS.DIM_X + Asteroid.RADIUS)) {
        pos[0] = (0 - Asteroid.RADIUS);
    }
    if (pos[1] > (this.CONSTANTS.DIM_Y + Asteroid.RADIUS)) {
        pos[1] = (0 - Asteroid.RADIUS);
    }
}

Game.prototype.checkCollisions = function () {
    for (let i = 0; i < this.asteroids.length; i++) {

        for (let j = i+1; j < this.asteroids.length; j++) {
            if (this.asteroids[i] && this.asteroids[j]) {
                if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
                    this.asteroids[i].collideWith(this.asteroids[j]);
                    // this.remove(this.asteroids[i]);
                    // this.remove(this.asteroids[j]);
                    break;
                }
            }
        }
    }
}

Game.prototype.step = function () {
    this.move();
    this.checkCollisions();
}

Game.prototype.remove = function (asteroid) {
    const index = this.asteroids.indexOf(asteroid);
    this.asteroids[index] = null;
}

module.exports = Game;