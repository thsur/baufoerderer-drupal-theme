/**
 * Pub/sub system.
 *
 * See:
 * http://stackoverflow.com/questions/8070894/when-would-i-use-jquery-callbacks
 */

var topics = {};

var broadcaster = function (id, data) {

  var callbacks  = jQuery.Callbacks();
  
  if (!id) {

    return;
  }

  if (topics[id]) {

    return topics[id];
  } 

  return topics[id] = {

    publish: callbacks.fire,
    subscribe: callbacks.add,
    unsubscribe: callbacks.remove
  };
};

export default broadcaster