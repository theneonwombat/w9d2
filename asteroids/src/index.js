const MovingObject = require('./moving_object.js');
const Asteroid = require('./asteroid.js');

window.MovingObject = MovingObject;
window.Asteroid = Asteroid;

console.log('webpack is working!');

const mo = new MovingObject({
  pos: [30, 30],
  vel: [10, 10],
  radius: 5,
  color: "#00FF00"
});

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementById("game-canvas");
  
  const ctx = canvasEl.getContext('2d');

  const a = new Asteroid({pos: [30, 30]});
  a.draw(ctx);
  
  mo.draw(ctx);
});