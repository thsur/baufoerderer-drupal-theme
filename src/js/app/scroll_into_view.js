/**
 * Anchor nav:
 * - handle in-page links (main nav, toc navs)
 * - handle incoming url hashes  
 */

import $               from 'jquery';
import debounce        from 'lodash/debounce';
import { path_helper } from './path';

/**
 * Scroll window to a given position.
 * 
 * Cf.:
 * - https://css-tricks.com/snippets/jquery/smooth-scrolling/
 * - https://css-tricks.com/namespaced-events-jquery/
 * - https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
 * - https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
 * - https://api.jquery.com/scroll/
 *
 * For throttling and debouncing events, cf.:
 * - https://www.sitepoint.com/throttle-scroll-events/
 * - https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
 *
 * On throotling vs. debouncing, cf.:
 * - https://css-tricks.com/the-difference-between-throttling-and-debouncing/
 * - https://css-tricks.com/debouncing-throttling-explained-examples/
 * - https://medium.com/walkme-engineering/debounce-and-throttle-in-real-life-scenarios-1cc7e2e38c68
 * 
 * Smooth scrolling is implemented by CSS. For a JS-based polyfill, cf.:
 * - https://github.com/iamdustan/smoothscroll
 * 
 * For JS animation-based solutions, cf.:
 * - https://stackoverflow.com/questions/3163615/how-to-scroll-html-page-to-given-anchor
 * - https://perishablepress.com/vanilla-javascript-scroll-anchor/
 * - https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/ 
 * - https://gist.github.com/james2doyle/5694700
 * - https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b
 * - https://dev.to/ampersanda/shimming-webpage-scroll-with-requestanimationframe-2la
 * 
 * @param  Object    - element to scroll to
 * @param  Integer   - space above element in number of pixels to take into account when scrolling    
 * @param  Function  - callback function when scrolling has finished
 * @return voind
 */
export function scrollIntoView($element, threshold, callback) {

  // Get position to scroll to
  
  let to = Math.round($element.offset().top);
  
  if (typeof threshold == 'number') {

    threshold = Math.round(threshold);

    if (threshold < to) {

      to = to - threshold;
    }
  }
  
  // Callback when scrolling has finished

  $(window).on('scroll.scrollIntoView', debounce(function() {

    if (to == window.pageYOffset) {

      $(window).off('scroll.scrollIntoView');

      if (callback && typeof(callback) === 'function') {
        
        callback();
      }
    }
  }, 100));

  // Scroll

  window.scroll(0, to);
}

/**
 * Get a named or id'd element on the current page.
 * 
 * @param  String - needs to include a hash ('#') to find a valid target.
 * @return jQuery
 */
export function getScrollTarget(path) {

  // Return early if it's not an in-page link.

  if (!path_helper.isInPageLink(path)) {

    return false;
  }

  // Return early if it's an in-page link having a no-op hash value.

  const hash = path_helper.getHash(path);

  if (!hash.length || hash == '#' || hash == '#0' || hash.indexOf('#sf-dump') !== -1) {

    return false; 
  }

  // Figure out element to scroll to.
  
  const $target = $(hash);
    
  if (!$target.length) {

    $target = $('[name=' + hash.slice(1) + ']');
  } 

  // Return early if we don't have a target.

  if (!$target.length) {

    return false;
  }
  
  return $target;  
}
