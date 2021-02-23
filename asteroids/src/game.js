const Asteroid = require("./asteroid");

function Game() {
    this.CONSTANTS = {
        DIM_X: 500,
        DIM_Y: 500,
        NUM_ASTEROIDS: 10
    };

    this.asteroids = [];
    this.addAsteroids.bind(this)();  
}

Game.prototype.addAsteroids = function () {
    for (let i = 0; i < this.CONSTANTS.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid({pos: this.randomPosition()}));
    }
}

Game.prototype.randomPosition = function () {
    return [Math.floor(Math.random() * this.CONSTANTS.DIM_X),
        Math.floor(Math.random() * this.CONSTANTS.DIM_Y)];
}

Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0, this.CONSTANTS.DIM_X, this.CONSTANTS.DIM_Y);
    for (let i = 0; i < this.asteroids.length(); i++) {
        this.asteroids[i].draw(ctx);
    }
}

Game.prototype.move = function () {
    for (let i = 0; i < this.asteroids.length(); i++) {
        this.asteroids[i].move();
    } 
}

module.exports = Game;