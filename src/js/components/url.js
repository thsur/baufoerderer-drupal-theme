
import $ from 'jquery';

import broadcaster from '../app/broadcaster';
import settings    from '../app/settings';

/**
 * Main navigation dropdown behaviour.
 */
broadcaster('page.boot').subscribe(function () { 
  
  const is_mobile = settings.responsive.mobile;  

  if (!is_mobile) {

    return;
  }

  $('a[target="_blank"]').removeAttr('target');
  
});

