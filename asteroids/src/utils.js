const Util = {
  inherits(childClass, parentClass) {
    const Surrogate = function () {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  addVectors (v1, v2) {
    return [v1[0]+v2[0], v1[1]+v2[1]];
  }, 
  
  distance(pos1, pos2) {
    const dist_x = pos2[0] - pos1[0];
    const dist_y = pos2[1] - pos1[1];

    return Math.sqrt((dist_x * dist_x) + (dist_y * dist_y));
  },          

  speed(vec) {
    return this.distance([0,0], vec);
  }
};

module.exports = Util;