/**
 * Bootstrap popovers.
 */

import $ from 'jquery';

export function init () {
  
  const $icons = $('.info-icon');

  if (!$icons.length) {

    return;
  }

  // Init info texts
  
  $icons
    .filter('[data-toggle="popover"]')
    .popover(); 

  // Show an icon's info text when clicked, hide others

  $icons
    .filter('[data-trigger="manual"]')
    .on('click touch', function (evt) {

      const $icon = $(this);
      
      $icons.not($icon).popover('hide');

      evt.stopImmediatePropagation();
      evt.stopPropagation();

      $icon.popover('toggle');
    }); 

  // Hide all when a click occurs outside an icon

  $('body').on('click', function (evt) {

    $icons.trigger('blur');
  });

  $icons
    .on('blur', function (evt) {

      evt.stopImmediatePropagation();
      evt.stopPropagation();

      $(this).popover('hide');
    }); 
}

init();
