const Help = function (texts) {

  this.help = texts;
};

Help.prototype = {

  get: function (key) {

    return this.help[key];
  }
};

export { Help };