
import $ from 'jquery';

import broadcaster     from '../app/broadcaster';
import { path_helper } from '../app/path';
import settings        from '../app/settings';

/**
 * Main navigation dropdown behaviour.
 */
broadcaster('page.boot').subscribe(function () { 

  const $nav      = $('#navbarMain');
  const $content  = $('main, footer');

  const is_mobile = settings.responsive.mobile;  

  // Show current dropdown on mobile when nav is 
  // about to be shown.
  $('.navbar-toggler').on('click', function () {

    if (is_mobile) {

      $nav.find('.dropdown.active').addClass('show')
          .find('.dropdown-menu').addClass('show');
    }
  });
  
  // We have manually switched the current dropdown on on mobile.
  // Make sure it's switched off again when another dropdown
  // entry is clicked. 
  $nav.on('click', '.dropdown-toggle', function (evt) {

    if (is_mobile) {

      const $elem = $(this);

      $nav.find('.dropdown.active').removeClass('show')
          .find('.dropdown-menu').removeClass('show');
    }
  });

  // When main nav dropdown is shown.
  // 
  // Cf.:
  // https://v4-alpha.getbootstrap.com/components/dropdowns/#events
  // https://getbootstrap.com/docs/4.0/components/collapse/#events    
  $nav.on('show.bs.dropdown show.bs.collapse', function () {
    
    $content.addClass('opaque');
  });

  // When main nav dropdown is hidden.
  // 
  // Cf.:
  // https://v4-alpha.getbootstrap.com/components/dropdowns/#events
  // https://getbootstrap.com/docs/4.0/components/collapse/#events    
  $nav.on('hide.bs.dropdown hide.bs.collapse', function (event) {

    $content.removeClass('opaque');
  });

  // When main nav dropdown entry is clicked.
  $nav.on('click', '.dropdown-menu a', function (evt) {

    const $link = $(this);
    
    // Prevent Bootstrap from closing the dropdown nav itself.
    evt.stopPropagation();

    // Mark link as active
    if (!$link.hasClass('active')) {

      $link.closest('.dropdown-menu').find('a').removeClass('active');
      $link.addClass('active');
    }
    
    // Whether we're dealing with a link to another page, or 
    // to an anchor on the current page.         
    if (path_helper.isInPageLink($link.attr('href'))) {
      
      // Remove opacity from main content.
      $content.removeClass('opaque');

      $('.dropdown.show').removeClass('show');        
      $('.dropdown-menu').removeClass('show');        
  
      if (is_mobile) {

        $nav.removeClass('show');
      }
    }
  });

  $nav.on('click', '.close-button', function () {

    $content.removeClass('opaque');

    if (is_mobile) {

      $nav.removeClass('show');
    }
  });
});

