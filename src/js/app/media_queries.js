
/**
 * Media queries
 * 
 * For inspiration & foundations, see:
 * https://modernweb.com/2014/03/24/using-media-queries-in-javascript/
 * https://www.sitepoint.com/javascript-media-queries/
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 * https://github.com/WickyNilliams/enquire.js
 */
import broadcaster from './broadcaster'

let config = {};

// Bootstrap breakpoints

config.breakpoints = {

  // Smallest
  'screen-xs-max': '479px',

  // Small
  'screen-sm-min': '480px',
  'screen-sm-max': '767px',

  // Medium
  'screen-md-min': '768px',
  'screen-md-max': '991px',

  // Desktop
  'screen-lg-min': '992px',
  'screen-lg-max': '1199px',

  // Large
  'screen-xl-min': '1200px',
  'screen-xl-max': '2559px',
  
  // 4k  
  'screen-4k-min': '2559px',
};

// Media queries based on breakpoints

config.mediaQueries = {
  
  // Smaller (< 480px)
  'xs': 'screen and (max-width: ' + config.breakpoints['screen-xs-max'] + ')',
  
  // Small (>= 480px)
  'sm': 'screen and (min-width: ' + config.breakpoints['screen-sm-min']+ ') and (max-width: ' + config.breakpoints['screen-sm-max'] + ')',
  
  // Tablet (e.g. portrait) (>= 768px)
  'md': 'screen and (min-width: ' + config.breakpoints['screen-md-min']+ ') and (max-width: ' + config.breakpoints['screen-md-max'] + ')',
  
  // Tablet (e.g. landscape), Desktop (>=992px)
  'lg': 'screen and (min-width: ' + config.breakpoints['screen-lg-min']+ ') and (max-width: ' + config.breakpoints['screen-lg-max'] + ')',
  
  // Large (>=1200px)
  'xl': 'screen and (min-width: ' + config.breakpoints['screen-xl-min'] + ') and (max-width: ' + config.breakpoints['screen-xl-max'] + ')',

  // Large (>=1200px)
  '4k': 'screen and (min-width: ' + config.breakpoints['screen-4k-min'] + ')',
};

// Current resolution info

export const current = {};

export function init () {

  // Set up media query objects 
  
  for (let key in config.mediaQueries) {

    let size   = key;
    let mobile = ['xs', 'sm', 'md'].includes(size);

    let query  = window.matchMedia(config.mediaQueries[key]);

    query.addListener(function (query) {

      if (query.matches) {

        _.extend(current, { mobile: mobile, size: size });
        
        // Broadcast media query matches
        broadcaster('responsive.resolution-change').publish(current);
      }
    }); 

    if (query.matches) {

      _.extend(current, { mobile: mobile, size: size });
    }
  }
}
