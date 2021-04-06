
/**
 * CSS animation helper.
 *
 * Cf.:
 * https://github.com/daneden/animate.css
 * https://www.iambacon.co.uk/blog/prevent-transitionend-event-firing-twice
 * https://pineco.de/detect-the-end-of-transition-and-animation-with-the-help-of-javascript/
 */

const animate = function ($element, classes, callback) {

  $element.addClass(classes);
  $element.one('animationend  webkitAnimationEnd  oanimationend MSAnimationEnd', function () {

    $element.removeClass(classes)
    if (typeof callback === 'function') callback($element)
  });
};

const transition = function ($element, classes, callback) {

  $element.addClass(classes);
  $element.one('transitionend  webkitTransitionEnd  oTransitionend MSTransitionEnd', function () {

    $element.removeClass(classes)
    if (typeof callback === 'function') callback($element)
  });
};

module.exports = {

  animate: animate,
  transition: transition
} 