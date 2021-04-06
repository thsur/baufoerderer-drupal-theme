const FacetsDisplayController = function (is_front_page) {

  this.is_front_page = is_front_page;
}

FacetsDisplayController.prototype = {

  show: function (what) {

    if (!this.is_front_page) {

        return !(['submit'].indexOf(what) !== -1);
    
    } else {

        return !(['reset', 'categories', 'counter'].indexOf(what) !== -1);
    }
  }
};

export { FacetsDisplayController as DisplayController };