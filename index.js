'use strict';

// import loadcss from 'fg-loadcss';
// import loadjs from 'fg-loadjs';

// const loadcss = require('fg-loadcss');
// const loadjs = require('fg-loadjs');

// function init();


// Async: {
//     parts: 0,
//         cookie: null,
//         setup: function (parts, cookie) {
//         this.parts = parseInt(parts || 0, 10);
//         this.cookie = cookie || null;
//     },
//     req: function () {
//         if (--this.parts <= 0) {
//             if (this.cookie) {
//                 var expires = new Date(+new Date + 604800000).toUTCString();
//                 document.cookie = 'assetVersion=' + this.cookie + '; expires=' + expires;
//             }
//             this.init();
//         }
//     },
//     init: function () {
//     }
// }

/**
 * Convert a value into a list of non-empty string values
 *
 * @param {String|Array|Object} res Value
 * @return {Array} Value list
 */
const mklist = val => ((typeof val === 'object') ? ((val.constructor !== Array) ? Object.keys(val).map(key => val[key]) : val) : [val]).map(v => `${v}`).filter(v => v.length);

/**
 * Assynchronously load CSS and JavaScript resources and set a hash cookie when finished loading all of them
 *
 * @param {String} hash Resoruce hash
 * @param {String|Array|Object} css CSS resources
 * @param {String|Array|Object} js JavaScript resources
 */
module.exports = function (hash, css = [], js = []) {
    css = mklist(css);
    js = mklist(js);
    const count = css.length + js.length;

    return count;
}

