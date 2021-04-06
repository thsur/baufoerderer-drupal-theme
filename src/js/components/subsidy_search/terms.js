
import flatMap  from 'lodash/flatMap';
import includes from 'lodash/includes';
    
const Terms = function (terms) {

  this.terms   = terms;
  this.flatMap = flatMap(terms); 
};

const ext = Terms.prototype = {};

/**
 * Unselect all terms of a given vocab.
 * 
 * @param  String 
 */
ext.reset = function (vocab) {

  _.each(_.filter(this.terms[vocab], 'selected'), function (item) {

    item.selected = false;
  });
};

/**
 * Switch select state of a term from a given vocab.
 * 
 * @param  String
 * @param  String
 */
ext.select = function (term_id, vocab) {

  if (vocab !== 'categories') {

    this.reset(vocab);
  }
  _.each(_.filter(this.terms[vocab], { id: term_id }), function (item) {

    item.selected = !item.selected;
  });
};

/**
 * Get all selected terms from all vocabs.
 * 
 * @return Object
 */
ext.getSelected = function () {

  return _.filter(this.flatMap, 'selected');
};

/**
 * Get all selected term ids from all vocabs.
 * 
 * @return Array
 */
ext.getSelectedIds = function () {

  return _.map(this.getSelected(), 'id');
};

/**
 * Given a set of term_ids considered to be selectable, make sure
 * to enable them.
 *
 * Disable all others.
 *  
 * @param  Array
 */
ext.enable = function (term_ids) {

  _.each(this.flatMap, function (item) {

    item.disabled = !includes(term_ids, item.id);
  });
};

/**
 * Enable all terms.
 */
ext.enableAll = function () {

  _.each(this.flatMap, function (item) {

    item.disabled = false;
  });
};

/**
 * Unselect all terms.
 */
ext.unselectAll = function () {

  const scope = this;

  _.each(_.keys(this.terms), function (vocab) {

    scope.reset(vocab);
  });
};

/**
 * Change select state of a term. If no term id is given,
 * unselect all terms of the given vocab.
 *   
 * @param  String
 * @param  String
 */
ext.update = function (term_id, vocab) {

  term_id ? this.select(term_id, vocab) : this.reset(vocab);
};

/**
 * Get a vocab.
 * 
 * @return Object
 */
ext.getVocab = function (vocab) {

  return this.terms[vocab];
};

export { Terms };