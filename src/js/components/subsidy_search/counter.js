const Counter = function (total) {

  this.counter = {

    initial: total,
    current: total
  };
};

Counter.prototype = {

  reset: function () {

    this.counter.current = this.counter.initial;
  },

  update: function (num) {

    this.counter.current = num;
  },

  get: function () {

    return this.counter.current;
  }
};

export { Counter };