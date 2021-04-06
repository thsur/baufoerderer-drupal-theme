
/**
 * JS animation easings
 *
 * Cf.:
 * https://joshondesign.com/2013/03/01/improvedEasingEquations
 * https://gist.github.com/gre/1650294
 * http://gsgd.co.uk/sandbox/jquery/easing/
 * https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
 * 
 */

/**
 * http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * https://raw.github.com/danro/jquery-easing/master/LICENSE
 */

// t: current time, b: beginning value, c: change in value, d: duration
  
const easings = {

  easeInCubic: function (t, b, c, d) {
      return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuad: function (t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInQuart: function (t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
};

module.exports easings; 