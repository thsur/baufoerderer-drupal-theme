
import $        from 'jquery';
import debounce from 'lodash/debounce';

import broadcaster from '../app/broadcaster';

const $scroller = $('#scroller-to-top');

function show () {

  $scroller.removeClass('transition fadeOut');
  $scroller.addClass('transition fadeIn');
}

function hide () {

  $scroller.removeClass('transition fadeIn');
  $scroller.addClass('transition fadeOut');
}

function reveal () {

  return window.pageYOffset > (window.innerHeight / 5);
}

function updatePosition () {
  
  const offset = document.getElementById('main').getBoundingClientRect().right;
  $scroller.css('left', offset + 'px');
}

function init () {

  if (reveal()) {

    show();
  }

  $scroller.on('click', function (evt) {

    const $elem = $(this);

    if (evt.target == $elem.get(0)) {

      $(this).find('a').click();
    }
  });

  $(window).on('scroll.scrollerToTop', debounce(function() {

    reveal() ? show() : hide();

  }, 100));
}

broadcaster('page.boot').subscribe(function () {

  updatePosition();
  init();
});

broadcaster('responsive.resolution-change').subscribe(function (data) {

  updatePosition();
});