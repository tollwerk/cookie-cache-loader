'use strict';

document.write(new Date().toLocaleString());

require('../..')(['test.css'], ['test.js'], 'abcd', function() {
    document.getElementById('cb').className += 'success';
});
