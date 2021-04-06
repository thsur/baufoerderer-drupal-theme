/**
 * Import CSS
 */
import '../css/main.scss';
import 'animate.css/animate.css';

/**
 * Import Bootstrap
 * Cf. https://getbootstrap.com/docs/4.0/getting-started/webpack/
 */
import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

/**
 * Import lodash
 *
 * Cf.:
 * https://www.blazemeter.com/blog/the-correct-way-to-import-lodash-libraries-a-benchmark/
 * https://stackoverflow.com/questions/43479464/how-to-import-a-single-lodash-function
 */
import _ from 'lodash/core';
import throttle from 'lodash/throttle';

/**
 * Bootstrap app
 */
import './app/app.js';
