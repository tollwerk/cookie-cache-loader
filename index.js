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

(function (w) {
    'use strict';

    /**
     * Convert a value into a list of non-empty string values
     *
     * @param {String|Array|Object} val Value
     * @return {Array} Value list
     */
    const mklist = val => (val === null) ? [] : (((typeof val === 'object') ? ((val.constructor !== Array) ? Object.keys(val).map(key => val[key]) : val) : [val]).map(v => `${v}`).map(v => v.trim()).filter(v => v.length));

    /**
     * Assynchronously load CSS and JavaScript resources and set a hash cookie when finished loading all of them
     *
     * @param {String|Array|Object} stylesheets CSS resources
     * @param {String|Array|Object} scripts JavaScript resources
     * @param {String} hash Resource hash
     * @param {Function} cb Callback after loading all resources
     */
    const cookieCacheLoad = function (stylesheets = [], scripts = [], hash = null, cb = () => {
    }) {
        stylesheets = mklist(stylesheets);
        scripts = mklist(scripts);
        cb = (typeof cb === 'function') ? cb : () => {
            };

        const count = stylesheets.length + scripts.length;
        let promises = [];

        // Assynchronously load scripts
        if (scripts.length) {
            const loadJS = require('fg-loadjs');
            for (let script of scripts) {
                promises.push(new Promise((resolve/*, reject*/) => {
                    loadJS(script, resolve);
                }));
            }
        }

        // Assynchronously load stylesheets
        if (stylesheets.length) {
            const loadCSS = require('fg-loadcss').loadCSS;
            require('script-loader!fg-loadcss/src/onloadCSS.js');
            for (let stylesheet of stylesheets) {
                promises.push(new Promise((resolve/*, reject*/) => {
                    onloadCSS(loadCSS(stylesheet), resolve);
                }));
            }
        }

        // If there's something to load at all
        hash = ((typeof hash === 'string' || hash instanceof String) ? hash.trim() : '') || null;
        if (promises.length) {
            Promise
                .all(promises)
                .then(() => {
                    if (hash !== null) {
                        const expires = new Date(+new Date + 604800000).toUTCString();
                        document.cookie = 'ccl=' + hash + '; expires=' + expires;
                    }
                    cb(count);
                });

            return;
        }

        cb(count);
    };

    // commonjs
    if (typeof module !== 'undefined') {
        module.exports = cookieCacheLoad;
    }
    else {
        w.cookieCacheLoad = cookieCacheLoad;
    }
}(typeof global !== 'undefined' ? global : this));



