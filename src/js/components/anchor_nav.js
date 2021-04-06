/**
 * Anchor nav:
 * - handle in-page links (main nav, toc navs)
 * - handle incoming url hashes  
 * - handle history changes
 */

import $ from 'jquery';

import broadcaster     from '../app/broadcaster';
import settings        from '../app/settings';
import { path_helper } from '../app/path';
import history         from '../app/history';
import * as scroller   from '../app/scroll_into_view';

/**
 * Navs we're interacting with.
 */
let $main_nav, $toc_nav;

/**
 * Set active nav entries in main & toc navs.
 *
 * @param JQuery
 */
function setActiveNavEntry (hash) {

  // Clear active nav entries (like when scrolling to top)

  $main_nav.removeClass('active');
  // $toc_nav.removeClass('active');

  // Set active nav entries

  if (hash) {

    hash = hash.substring(1);

    $('#nav-' + hash).addClass('active');  
    // $('#toc-' + hash).addClass('active');  
  }
}

/**
 * Whether or not a hash is considered a valid scroll target.
 * 
 * @param  String 
 * @return Boolean
 */
function isValidHash(path) {

  return path.indexOf('#') > -1 && !(/(#|#0)$/.test(path));
}

/**
 * Get named or id'd element on the current page as target to scroll to.
 * 
 * @param  String - a URL containing a hash, or just a hash
 * @return Boolean|jQuery
 */
function getScrollTarget(path) {

  if (!isValidHash(path)) {

    return false;
  }

  const $target = scroller.getScrollTarget(path);

  if (!$target.length) {

    return false;
  }

  return $target;
}

/**
 * Scroll to some named or id'd element on the current page.
 *
 * @param jQuery 
 */
function scrollTo($target) {

  // Set threshold, if any 

  const threshold = settings.scrollIntoViewThreshold || 0;

  // Finally, scroll to target.

  scroller.scrollIntoView($target, threshold, function () { 
    
    // For accessibility reasons, we have to change focus.
    // Cf. https://css-tricks.com/smooth-scrolling-accessibility/
    
    $target.focus({preventScroll: true});
    
    // Check if target was focused
    
    if ($target.is(":focus")) { 
    
      return false;
    } 
    
    // Otherwise, set tab index and set focus again.
    
    $target.attr('tabindex','-1'); 
    $target.focus({preventScroll: true});
  });
}

/**
 * Set main & toc nav links when DOM is ready.
 */
broadcaster('page.boot').subscribe(function () {

  $main_nav = $('.navbar-main')
                .find('.nav-item.active')
                .find('ul')
                .eq(1)
                .find('a');

  $toc_nav  = $('.toc-nav').find('a');
});

/**
 * Implement scroll & other behavior when a user interacts with
 * either a link on the page, or the browser history.
 */
broadcaster('page.boot').subscribe(function () { 
  
  /**
   * Scroll to a target, update active nav entry & browser history
   * when a link containing a hash is clicked.
   */
  $('a[href*="#"]').on('click', function(evt) {

    const path    = $(this).attr('href');
    const $target = getScrollTarget(path);

    // Return early if we don't have a target to scroll to.

    if (!$target) {

      return;
    }

    // Otherwise, prevent the browser from scrolling by himself.
      
    evt.preventDefault();

    // Scroll to target

    scrollTo($target);

    // Update nav(s), URL & history
    
    const hash     = path_helper.getHash(path);
    const pathname = path_helper.getPath(path);
    
    if (hash != '#top') {

      setActiveNavEntry(hash);
      history.push(null, null, hash);      
    
    } else {

      setActiveNavEntry();
      history.push(null, null, pathname);      
    }
  });

  /**
   * Scroll to a target & update active nav entry when a user 
   * clicked on the browser's back and forward buttons.
   * 
   * The event we're listening to fires when the location hash 
   * is changed by a browser's back and forward buttons, but 
   * not on a history push when pushing a hash (cf. above).
   */
  $(window).on('hashchange', function() {
    
    const hash    = path_helper.getHash();
    const $target = getScrollTarget(hash);
    
    if ($target) {

      setActiveNavEntry(hash);
      scrollTo($target);
    
    } else {

      setActiveNavEntry();
    }
  });
});

/**
 * Scroll to a target when URL contains a hash & update nav entry.
 * To be able to reliably do that, wait until the page is fully loaded.
 */
broadcaster('page.ready').subscribe(function () { 

  const hash    = path_helper.getHash();
  const $target = getScrollTarget(hash);
  
  if ($target) {

    setActiveNavEntry(hash);
    scrollTo($target);
  }
});
