import $            from 'jquery';
import intersection from 'lodash/intersection';
import difference   from 'lodash/difference';

const Nodes = function (map) {

  this.map = map; // Node ids pointing to term ids
};

const ext = Nodes.prototype = {};

/**
 * Get all node ids.
 * 
 * @return Array
 */
ext.getNodeIds = function () {

  return _.keys(this.map);
};

/**
 * Get nodes by given term ids.
 * 
 * @param  Array
 * @return Object
 */
ext.getByTermIds = function (term_ids) {

  if (!term_ids.length) {

    return false;
  }

  // Collect all nodes having *all* of the given term ids set.
      
  const nodes = {}; 

  _.each(this.map, function (node_term_ids, node_id) {
      
    const matches = _.isEqual(intersection(term_ids, node_term_ids), term_ids);

    if (matches) {

      nodes[node_id] = node_term_ids;
    }
  });

  return nodes;
};

/**
 * Get term ids of a given set of nodes.
 * 
 * @param  Object
 * @return Array
 */
ext.getTermIds = function (nodes) {

  const terms = [];

  _.each(nodes, function (term_ids) {

    const diff = difference(term_ids, terms);

    // Collect active terms
    // https://stackoverflow.com/a/14715570
    Array.prototype.splice.apply(terms, [1,0].concat(diff));
  });

  return terms;
};

/**
 * Show all nodes.
 */
ext.showAll = function () {

  $('.subsidy-item').removeClass('d-none');
};

/**
 * Show nodes by ids.
 */
ext.show = function (node_ids) {

  $(_.map(node_ids, function (id) { return '#subsidy-' + id }).join(',')).removeClass('d-none')
};

/**
 * Hide nodes by ids.
 */
ext.hide = function (node_ids) {
  
  $(_.map(node_ids, function (id) { return '#subsidy-' + id }).join(',')).addClass('d-none')
};

export { Nodes };