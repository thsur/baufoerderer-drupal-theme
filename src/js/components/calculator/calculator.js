/**
 * Libs
 */

// External libs

import $                              from 'jquery';
import kebabCase                      from 'lodash/kebabCase';
import { register, mount, component } from 'riot';

// Riot components

import buy from './buy.riot';

/**
 * Server-side generated template container holding the interface.
 */
const $calculator = $('calculator');

/**
 * Calculator controller.
 */
var Calculator = function (data, type) {

  this.data = data;
  this.type = type;
}

/**
 * Get data, i.e. amend the original data so it fits what
 * we expect inside our component.
 */
Calculator.prototype.getData = function() {

  // Get us some shortcuts

  const states = this.data['Bundesländer'];
  const fixed  = this.data['Bauen'];

  // Prepare a helper mao of ids pointing to display names

  const slugs  = {}; 

  // Prepare a data object to pass into the UI later on

  const data   = {

    states: [],
    fixed: []
  };

  // Main, dynamic data

  _.each(_.keys(states), function (v, k) {

    const state = {

      index: k,
      name: v,
      data: {}
    };

    _.each(states[v], function (v, k) {

      if (!slugs[k]) {

        slugs[k] = kebabCase(k.toLowerCase());
      }

      state.data[slugs[k]] = {

        id: slugs[k],
        value: v.Value,
        name: k,
        title: k + ' (' + v.Value.toFixed(2).replace('.', ',') + '%)',
      }
    });

    data.states.push(state);
  });

  // Fixed data

  _.each(fixed, function (v, k) {

    const id = kebabCase(k.toLowerCase());

    data.fixed.push({

      title: v['Desc'].replace('ca. ', 'ca. '),
      value: v['Value'],
      id: id 
    });
  })

  return data;
}

/**
 * Mount UI to template container.
 */
Calculator.prototype.mount = function() {

  const type  = this.type;
  const data  = this.getData();

  // Get type of UI to mount

  let ui;

  switch (type) {

    case 'buy':
    case 'build':
      ui = buy;
      break;

    default:
      break;
  }

  if (!ui) {

    return;
  }

  // Mount UI

  component(ui)(

    $calculator.get(0),
    data
  );
};

/**
 * Kick-start facets. 
 */
if ($calculator.length) {

  const data = JSON.parse(document.getElementById('calculator--data').innerHTML);
  const type = $calculator.data('type');

  if (data) {

    new Calculator(data, type).mount();
  }
}
