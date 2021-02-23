const Game = require('./game.js');

function GameView (ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.ctx.canvas.width = this.game.CONSTANTS.DIM_X;
  this.ctx.canvas.height = this.game.CONSTANTS.DIM_Y;
}

GameView.prototype.start = function () {
  const boundMove = this.game.move.bind(this);
  setInterval(boundMove, 20);
  const boundDraw = this.game.draw.bind(this, this.ctx);
  setInterval(boundDraw, 20);
}

module.exports = GameView;