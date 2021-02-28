const Util = require('./utils.js');

function MovingObject (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.beginPath();
  ctx.arc(...this.pos, this.radius, 0, 2*Math.PI);
  if (this.img) {
    ctx.save();
    ctx.clip();
    ctx.drawImage(this.img, this.pos[0]-this.radius,
                            this.pos[1]-this.radius);
    ctx.restore();
  }
  else {
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  ctx.closePath();
}

MovingObject.prototype.move = function() {
  this.pos = [this.pos[0]+this.vel[0], this.pos[1]+this.vel[1]];
  if (this.isWrappable()) this.game.wrap(this.pos, this.radius);
  else if (this.game.outOfBounds(this.pos)) this.game.remove(this);
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const radii = this.radius + otherObject.radius;
  if (radii > Util.distance(this.pos, otherObject.pos)) return true;
  return false;
}

MovingObject.prototype.collideWith = function (otherObject) {
}   

MovingObject.prototype.isWrappable = function() {
  return true;
}

module.exports = MovingObject;