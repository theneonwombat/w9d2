/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nUtil.inherits(Asteroid, MovingObject);\n\nObject.defineProperty(Asteroid, \"COLOR\", {value: \"purple\"});\nObject.defineProperty(Asteroid, \"RADIUS\", {value: 30});\n\nfunction Asteroid (options) {\n  MovingObject.call(this, {pos: options.pos, vel: Util.randomVec(1), game: options.game});\n  this.color = Asteroid.COLOR;\n  this.radius = Asteroid.RADIUS;\n}\n\nAsteroid.prototype.collideWith = function (otherObject) {\n  if (otherObject instanceof Ship) otherObject.relocate();\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nconst Ship = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\nfunction Game() {\n    this.CONSTANTS = {\n        DIM_X: 500,\n        DIM_Y: 500,\n        NUM_ASTEROIDS: 15\n    };\n\n    this.asteroids = [];\n    this.addAsteroids(); \n    this.ship = new Ship({pos: this.randomPosition(), game: this});\n}\n\nGame.prototype.addAsteroids = function () {\n    const that = this;\n    for (let i = 0; i < this.CONSTANTS.NUM_ASTEROIDS; i++) {\n        this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: that}));\n    }\n}\n\nGame.prototype.randomPosition = function () {\n    return [Math.floor(Math.random() * this.CONSTANTS.DIM_X),\n        Math.floor(Math.random() * this.CONSTANTS.DIM_Y)];\n}\n\nGame.prototype.draw = function (ctx) {\n    ctx.clearRect(0,0, this.CONSTANTS.DIM_X, this.CONSTANTS.DIM_Y);\n    const objects = this.allObjects();\n    for (let i = 0; i < objects.length; i++) {\n        if (objects[i]) objects[i].draw(ctx);\n    }\n}\n\nGame.prototype.move = function () {\n    const objects = this.allObjects();\n    for (let i = 0; i < objects.length; i++) {\n        if (objects[i]) objects[i].move();\n    } \n}\n\nGame.prototype.wrap = function(pos) {\n    if (pos[0] < (0 - Asteroid.RADIUS)) {\n        pos[0] = (this.CONSTANTS.DIM_X + Asteroid.RADIUS);\n    }\n    if (pos[1] < (0 - Asteroid.RADIUS)) {\n        pos[1] = (this.CONSTANTS.DIM_Y + Asteroid.RADIUS);\n    }\n    if (pos[0] > (this.CONSTANTS.DIM_X + Asteroid.RADIUS)) {\n        pos[0] = (0 - Asteroid.RADIUS);\n    }\n    if (pos[1] > (this.CONSTANTS.DIM_Y + Asteroid.RADIUS)) {\n        pos[1] = (0 - Asteroid.RADIUS);\n    }\n}\n\nGame.prototype.checkCollisions = function () {\n    const objects = this.allObjects();\n    \n    for (let i = 0; i < objects.length; i++) {\n\n        for (let j = i+1; j < objects.length; j++) {\n            if (objects[i] && objects[j]) {\n                if (objects[i].isCollidedWith(objects[j])) {\n                    objects[i].collideWith(objects[j]);\n                    break;\n                }\n            }\n        }\n    }\n}\n\nGame.prototype.step = function () {\n    this.move();\n    this.checkCollisions();\n}\n\nGame.prototype.remove = function (asteroid) {\n    const index = this.asteroids.indexOf(asteroid);\n    this.asteroids[index] = null;\n}\n\nGame.prototype.allObjects = function () {\n    return this.asteroids.concat([this.ship]);\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nfunction GameView (ctx) {\n  this.game = new Game();\n  this.ctx = ctx;\n  this.ctx.canvas.width = this.game.CONSTANTS.DIM_X;\n  this.ctx.canvas.height = this.game.CONSTANTS.DIM_Y;\n}\n\nGameView.prototype.start = function () {\n  this.bindKeyHandlers();\n  // Have to bind these functions because they are being used as callbacks\n  // and will accordingly be invoked function style\n  const boundStep = this.game.step.bind(this.game);\n  setInterval(boundStep, 20);\n  const boundDraw = this.game.draw.bind(this.game, this.ctx);\n  setInterval(boundDraw, 20);\n}\n\nGameView.prototype.bindKeyHandlers = function() {\n  const boundPower = this.game.ship.power.bind(this.game.ship);\n  key (\"up, w\", function() { boundPower([0,-1])});\n  key (\"down, s\", function() { boundPower([0,1])});\n  key (\"left, a\", function() { boundPower([-1,0])});\n  key (\"right, d\", function() { boundPower([1,0])});\n}\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// const MovingObject = require('./moving_object.js');\n// const Asteroid = require('./asteroid.js');\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\n// window.MovingObject = MovingObject;\n// window.Asteroid = Asteroid;\n\n// console.log('webpack is working!');\n\n// const mo = new MovingObject({\n//   pos: [30, 30],\n//   vel: [10, 10],\n//   radius: 5,\n//   color: \"#00FF00\"\n// });\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementById(\"game-canvas\");\n  \n  const ctx = canvasEl.getContext('2d');\n\n  const gv = new GameView(ctx);\n  gv.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject (options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.draw = function (ctx) {\n  ctx.beginPath();\n  ctx.arc(...this.pos, this.radius, 0, 2*Math.PI);\n  ctx.fillStyle = this.color;\n  ctx.fill();\n  ctx.closePath();\n}\n\nMovingObject.prototype.move = function() {\n  this.pos = [this.pos[0]+this.vel[0], this.pos[1]+this.vel[1]];\n  this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  const radii = this.radius + otherObject.radius;\n  if (radii > this.distance(this.pos, otherObject.pos)) return true;\n  return false;\n}\n\nMovingObject.prototype.distance = function (pos1, pos2) {\n  const dist_x = pos2[0] - pos1[0];\n  const dist_y = pos2[1] - pos1[1];\n  \n  return Math.sqrt((dist_x * dist_x) + (dist_y * dist_y));\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n    // this.game.remove(otherObject);\n    // this.game.remove(this);\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MovingObject = __webpack_require__(/*! ./moving_object.js */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n\nUtil.inherits(Ship, MovingObject);\n\nObject.defineProperty(Ship, \"COLOR\", {value: \"orange\"});\nObject.defineProperty(Ship, \"RADIUS\", {value: 10});\n\nfunction Ship (options) {\n    MovingObject.call(this, {pos: options.pos, vel: [0,0], game: options.game});\n    this.color = Ship.COLOR;\n    this.radius = Ship.RADIUS;\n}\n\nShip.prototype.relocate = function() {\n    this.pos = this.game.randomPosition();\n    this.vel = [0,0];\n}\n\nShip.prototype.power = function (impulse) {\n    this.vel[0] += impulse[0];\n    this.vel[1] += impulse[1];\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    const Surrogate = function () {};\n    Surrogate.prototype = parentClass.prototype;\n    childClass.prototype = new Surrogate();\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  \n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;