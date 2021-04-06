/**
 * Accessibility settings
 *
 * Cf.:
 * - https://jmperezperez.com/outline-focus-ring-a11y/
 */

import $ from 'jquery';

// Listen to tab events to enable outlines (accessibility improvement)
$('body').on('keyup', function(e) {

  const $elem = $(this);

  // Tab
  
  if (e.which === 9 && $elem.hasClass('no-focus-outline')) {
  
    $elem.removeClass('no-focus-outline');
  }

  // Mouse buttons
  
  if ((e.which === 1 || e.which === 2 || e.which === 3) && !$elem.hasClass('no-focus-outline')) {
    
    $elem.addClass('no-focus-outline');
  }

});