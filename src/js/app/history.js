/**
 * Window history
 *
 * Cf.:
 * - https://developer.mozilla.org/en-US/docs/Web/API/History
 * - https://css-tricks.com/using-the-html5-history-api/
 * - https://diveinto.html5doctor.com/history.html
 * - https://flaviocopes.com/history-api/
 * - http://tutorials.jenkov.com/html5/history-api.html
 */

/**
 * Build a state object.
 * 
 * @param  String id   - some identifier
 * @param  Mixed  data - arbitrary data
 * @return Object
 */
function buildState(id, data) {

  let state = {};

  if (id) {

    state.id = id;
  }

  if (data) {

    state.data = data;
  }

  return state;
} 

const history = {

  /**
   * Push state to history.
   *  
   * @param  String id   - some identifier 
   * @param  Mixed  data - arbitrary data to set
   * @param  String url  - a path or hash to set 
   * @return void
   */
  push: function (id, data, url) {

    const state = buildState(id, data);
    const title = null;

    window.history.pushState(state, title, url || null);
  },

  /**
   * Replace current history state.
   *  
   * @param  String id   - some identifier 
   * @param  Mixed  data - arbitrary data to set
   * @param  String url  - a path or hash to set 
   * @return void
   */
  replace: function (id, data, url) {

    const state = buildState(id, data);
    const title = null;

    window.history.replaceState(state, title, url || null);
  },

  /**
   * Get state from history.
   *  
   * @param  String id   - some identifier 
   * @return Object
   */
  get: function (id) {

    if (window.history.state && window.history.state.hasOwnProperty('id') && window.history.state['id'] === id) {

      return window.history.state.data ? window.history.state.data : null;
    }
  }
}

export default history
