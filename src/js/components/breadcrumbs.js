
import $ from 'jquery';

import settings    from '../app/settings';
import broadcaster from '../app/broadcaster';

function truncate(str, max_len, separator = ' ', ellipsis = '...') {

  if (!_.isString(str) || !max_len) {

    return false;
  }

  str = str.trim();

  if (str.length <= max_len) {

    return str;
  }

  const truncate_to_pos = str.lastIndexOf(separator, max_len);

  if (truncate_to_pos == -1) {

    return str;
  }

  // Truncate string, remove any non-word characters from its end, and append an ellipsis

  return  str.substr(0, truncate_to_pos).replace(/[^a-z]+$/gi, '') + ellipsis;
}

broadcaster('page.boot').subscribe(function () { 

  let str_len;

  if (!settings.responsive) {

    return;
  }
  
  if (settings.responsive.mobile) {

    return;
  }

  const breadcrump_len = $('.breadcrumb-nav').find('span').not(':last').text().length;

  switch (settings.responsive.size) {

    case 'lg':
      str_len = 115 - breadcrump_len;
      break;

    default:
      str_len = 150 - breadcrump_len;
      break;
  }

  const breadcrumb_last_entry = $('.breadcrumb-item > span');
  const truncated             = truncate(breadcrumb_last_entry.text(), str_len);

  if (truncated) {

    breadcrumb_last_entry.text(truncated);
  }
});

