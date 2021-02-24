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
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

MovingObject.prototype.move = function() {
  this.pos = [this.pos[0]+this.vel[0], this.pos[1]+this.vel[1]];
  this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  const radii = this.radius + otherObject.radius;
  if (radii > this.distance(this.pos, otherObject.pos)) return true;
  return false;
}

MovingObject.prototype.distance = function (pos1, pos2) {
  const dist_x = pos2[0] - pos1[0];
  const dist_y = pos2[1] - pos1[1];
  
  return Math.sqrt((dist_x * dist_x) + (dist_y * dist_y));
}

MovingObject.prototype.collideWith = function (otherObject) {
    // this.game.remove(otherObject);
    // this.game.remove(this);
}

module.exports = MovingObject;