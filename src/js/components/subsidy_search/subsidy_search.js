/**
 * Libs
 */

// External libs

import $                              from 'jquery';
import { register, mount, component } from 'riot';

// Internal libs

import broadcaster from '../../app/broadcaster';
import history     from '../../app/history';
import * as icons  from '../info_icons';

// Riot components

import ui          from './facets.riot';
import select      from './select.riot';
import checkbox    from './checkbox.riot';
import counter     from './counter.riot';
import title       from './title.riot';
import reset       from './reset.riot';
import submit      from './submit.riot';

/**
 * Server-side generated template container holding the interface.
 */
const $facets = $('subsidy-facets');

/**
 * Facets controller.
 */
var Facets = function (data) {

  this.data = data;
}

/**
 * Mount UI to template container.
 */
Facets.prototype.mount = function() {

  const data   = this.data;
  const scope  = this;

  // Register child components

  register('facets-counter', counter);
  register('facets-select', select);
  register('facets-checkbox', checkbox);
  register('facets-title', title);
  register('facets-reset', reset);
  register('facets-submit', submit);

  // Mount UI

  const facets = component(ui)(

    $facets.get(0),
    {data: data, broadcaster: broadcaster, index: history.get('subsidy-search') || {}}
  );
};

/**
 * Re-init info icons
 */
broadcaster('facets.init').subscribe(function () { 

  icons.init();

  // Facets titles trigger info icons

  const titles  = $('facets-title');

  titles.on('click', '.title', function (evt) {

    evt.stopImmediatePropagation();
    evt.stopPropagation();

    $(this).parent().find('.info-icon').trigger('click');
  });
});

/**
 * Kick-start facets. 
 */
if ($facets.length) {

  const data = JSON.parse(document.getElementById('facets-data').innerHTML);
  const help = JSON.parse(document.getElementById('facets-help').innerHTML);

  if (data) {

    data.help = help;

    new Facets(data).mount();
  }
}
