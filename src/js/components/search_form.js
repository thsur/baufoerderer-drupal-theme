
import $ from 'jquery';

import broadcaster from '../app/broadcaster';
import settings    from '../app/settings';

/**
 * Main navigation dropdown behaviour.
 */
broadcaster('page.boot').subscribe(function () { 
  
  const $search   = $('.header').find('.search');
  const $form     = $('#searchForm');

  const is_mobile = settings.responsive.mobile;  

  $('.search-toggler').on('click', function () {

    $search.toggleClass('active');
  });

  $form.on('submit', function (evt) {

    const has_value = $(this).find('input').first().val().length > 0;

    if (!has_value) {

        evt.preventDefault();
    }
  });
});

