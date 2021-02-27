const Game = require('./game.js');
const { sounds } = require('./sound.js');

function GameView (ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.ctx.canvas.width = this.game.CONSTANTS.DIM_X;
  this.ctx.canvas.height = this.game.CONSTANTS.DIM_Y;
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  // Have to bind these functions because they are being used as callbacks
  // and will accordingly be invoked function style
  const boundStep = this.game.step.bind(this.game);
  setInterval(boundStep, 20);
  const bg = new Image();
  bg.src = './space.jpg';
  bg.addEventListener('load', () => {
    const boundDraw = this.game.draw.bind(this.game, this.ctx, bg);
    setInterval(boundDraw, 20);
  });
}

GameView.prototype.bindKeyHandlers = function() {
  const boundPower = this.game.ship.power.bind(this.game.ship);
  key ("up, w", function() { boundPower([0,-1])});
  key ("down, s", function() { boundPower([0,1])});
  key ("left, a", function() { boundPower([-1,0])});
  key ("right, d", function() { boundPower([1,0])});

  const boundFire = this.game.ship.fireBullet.bind(this.game.ship);
  key ("space", function() { boundFire(); });
}
module.exports = GameView;