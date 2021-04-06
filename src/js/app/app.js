/**
 * On the gotchas of importing & exporting, cf.:
 * - https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f
 * - https://exploringjs.com/impatient-js/ch_modules.html
 */
import $            from 'jquery';
import * as Promise from 'bluebird';

import broadcaster        from './broadcaster'
import settings           from './settings';
import * as media_queries from './media_queries';

import './sticky';
import './a11y';

import '../components/main_nav';
import '../components/anchor_nav';
import '../components/search_form';
import '../components/scroller_top';
import '../components/breadcrumbs';
import '../components/info_icons';
import '../components/url';
import '../components/subsidy_search/subsidy_search';
import '../components/calculator/calculator';

/**
 * Bootstrap
 */
function init () {

  // Enable popovers

  $('[data-toggle="popover"]').popover();

  // Init media queries

  media_queries.init();

  // Link them to app-wide settings

  settings.responsive = media_queries.current;

  const $body = $('body');

  if (settings.responsive.mobile) {

    $body.removeClass('is-desktop').addClass('is-mobile');
  }
  else {
      
    $body.removeClass('is-mobile').addClass('is-desktop');
  }
}

/**
 * Promise document loading states.
 *
 * For a less simplistic approach, cf.:
 * - https://github.com/jonathantneal/document-promises
 *
 * On using promises, cf.:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
 * - https://scotch.io/tutorials/javascript-promises-for-dummies
 * - https://github.com/kriskowal/q
 * - https://flaviocopes.com/javascript-promises/
 * - https://www.webreflection.co.uk/blog/2015/08/14/the-line-between-events-and-promises
 * - https://javascript.info/promise-chaining
 * - https://javascript.info/promise-chaining
 * - https://html5hive.org/how-to-chain-javascript-promises/
 * - https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/chaining-the-promises
 * - https://www.promisejs.org/patterns/
 *
 * And don't forget about generators, cf.:
 * - https://www.promisejs.org/generators/
 * 
 * On implementing promises from scratch, cf.:
 * - https://www.promisejs.org/implementing/
 * - https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720
 * - https://itnext.io/broken-promises-a-barely-working-implementation-of-js-promises-ed7f99071f54
 * - https://hackernoon.com/implementing-javascript-promise-in-70-lines-of-code-b3592565af0f
 * - https://gist.github.com/unscriptable/814052/690a6b41dc8445479676b347f1ed49f4fd0b1637
 *
 * For real-world libs, cf.:
 * - https://github.com/kriskowal/q
 * - https://github.com/petkaantonov/bluebird/
 * - https://github.com/cujojs/when
 * - https://github.com/then/promise
 *
 * For a discussion whether or not to listen to the DOMContentLoaded event (or jQuery's DOM ready event):
 * - https://swizec.com/blog/how-to-properly-wait-for-dom-elements-to-show-up-in-modern-browsers/swizec/6663
 * - https://www.kirupa.com/html5/running_your_code_at_the_right_time.htm
 *
 * On a DI & Inversion of Control pattern for JS, cf.:
 * - https://martinfowler.com/articles/injection.html 
 */
const ready = new Promise(function(resolve, reject) {

  $(resolve);
});

const loaded = new Promise(function(resolve, reject) {

  $(window).on('load', resolve);
});

// Define & publish sitewide notifications. 

ready
  .then(function () {
    
    init();
    broadcaster('page.boot').publish();

    return loaded;
  })
  .then(function () {

    broadcaster('page.ready').publish();
  });
