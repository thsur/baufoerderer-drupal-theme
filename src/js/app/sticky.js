/**
 * Make elements stick.
 *
 * Cf.:
 * - https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46
 * - https://github.com/wilddeer/stickyfill
 * - 
 */

import $ from 'jquery';
import stickyfill from 'stickyfilljs';

import broadcaster from './broadcaster'
import settings    from './settings';

const $nav    = $('.navbar-main-wrapper');
const $header = $('.header-wrapper');

function update () {
    
  const is_mobile = settings.responsive.mobile;

  // Update threshold for scrolling elements into view, so they're 
  // not hidden when main nav becomes sticky.
  
  if (is_mobile) {

    settings.scrollIntoViewThreshold = $header.outerHeight(true) + 20;

  } else {

    settings.scrollIntoViewThreshold = $nav.outerHeight(true) + 20;
  }

  // Set stickyness
  
  if (is_mobile) {

    $header.addClass('sticky');
    $nav.removeClass('sticky');

  } else {

    $header.removeClass('sticky');
    $nav.addClass('sticky');
  }

  // Enable polyfill for position:sticky
  // Cf. https://github.com/wilddeer/stickyfill
  
  stickyfill.add($('.sticky'));
}

broadcaster('page.boot').subscribe(function () { 
  
  update();
});

broadcaster('responsive.resolution-change').subscribe(function (data) { 
  
  update();
});