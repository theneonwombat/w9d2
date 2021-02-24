const Asteroid = require("./asteroid");
const Ship = require("./ship.js");

function Game() {
    this.CONSTANTS = {
        DIM_X: 500,
        DIM_Y: 500,
        NUM_ASTEROIDS: 15
    };

    this.asteroids = [];
    this.addAsteroids(); 
    this.ship = new Ship({pos: this.randomPosition(), game: this});
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
    const objects = this.allObjects();
    for (let i = 0; i < objects.length; i++) {
        if (objects[i]) objects[i].draw(ctx);
    }
}

Game.prototype.move = function () {
    const objects = this.allObjects();
    for (let i = 0; i < objects.length; i++) {
        if (objects[i]) objects[i].move();
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
    const objects = this.allObjects();
    
    for (let i = 0; i < objects.length; i++) {

        for (let j = i+1; j < objects.length; j++) {
            if (objects[i] && objects[j]) {
                if (objects[i].isCollidedWith(objects[j])) {
                    objects[i].collideWith(objects[j]);
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

Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]);
}

module.exports = Game;