'use strict';

const ccl = require('..');

document.write(new Date().toLocaleString());
ccl(['/test/stylesheet-1.css'], ['/test/script-1.js'], 'abc');
