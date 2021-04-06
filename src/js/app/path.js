/**
 * URL helper.
 */
const Path = function () {};

Path.prototype.getCurrent = function () {

  return window.location;
};

Path.prototype.getAbsolute = function (path) {

  const current = this.getCurrent();

  if (path.startsWith('/')) {

    return current.protocol + current.hostname + path;
  }

  if (path.startsWith('#')) {

    return current.protocol + current.hostname + current.pathname + path;
  }

  return path;
};

Path.prototype.getURL = function (path) {

  return new URL(this.getAbsolute(path));
};

Path.prototype.isInPageLink = function (path) {

  const current = this.getCurrent();
  const url     = this.getURL(path);

  if (!url.hash.length) {

    return false;
  }

  return url.protocol + url.hostname + url.pathname == current.protocol + current.hostname + current.pathname; 
};

Path.prototype.getHash = function (path) {

  return path ? this.getURL(path).hash : window.location.hash;
};

Path.prototype.getPath = function (path) {

  return path ? this.getURL(path).pathname : window.location.pathname;
};

export const path_helper = new Path();
