/* global onloadCSS */

const scope = (typeof global !== 'undefined' ? global : this);
const loadJS = require('fg-loadjs');
const loadCSS = require('fg-loadcss').loadCSS;
require('fg-loadcss/src/onloadCSS.js');

{
    /**
     * Convert a value into a list of non-empty string values
     *
     * @param {String|Array|Object} val Value
     * @return {Array} Value list
     */
    function mklist(val) {
        if (val === null) {
            return [];
        }
        let ret = val;

        if (typeof val === 'object') {
            if (val.constructor !== Array) {
                ret = Object.keys(val).map(key => val[key]);
            }
        } else {
            ret = [val];
        }

        return ret.map(v => `${v}`).map(v => v.trim()).filter(v => v.length);
    }

    /**
     * Assynchronously load CSS and JavaScript resources and set a hash cookie when finished loading
     *
     * @param {String|Array|Object} stylesheets CSS resources
     * @param {String|Array|Object} scripts JavaScript resources
     * @param {String} hash Resource hash
     * @param {Function} callback Callback after loading all resources
     */
    function ccl(stylesheets = [], scripts = [], hash = null, callback = () => {
    }) {
        const stls = mklist(stylesheets);
        const scts = mklist(scripts);
        const cb = (typeof callback === 'function') ? callback : () => {};
        const count = stls.length + scts.length;
        const promises = [];

        /**
         * Return a script promise callback
         *
         * @param {String} script Script file
         * @returns {Function} Promise callback
         */
        function jsLoader(script) {
            return (resolve) => {
                loadJS(script, resolve);
            };
        }

        /**
         * Return a stylesheet promise callback
         *
         * @param {String} stylesheet Stylesheet file@
         * @returns {Function} Promise callback
         */
        function cssLoader(stylesheet) {
            return (resolve) => {
                onloadCSS(loadCSS(stylesheet), resolve);
            };
        }

        // Assynchronously load scripts
        if (scts.length) {
            for (const script of scts) {
                promises.push(new Promise(jsLoader(script)));
            }
        }

        // Assynchronously load stylesheets
        if (stls.length) {
            for (const stylesheet of stls) {
                promises.push(new Promise(cssLoader(stylesheet)));
            }
        }

        // If there's something to load at all
        const cookie = ((typeof hash === 'string' || hash instanceof String) ? hash.trim() : '') || null;
        if (promises.length) {
            Promise
            .all(promises)
            .then(() => {
                if (cookie !== null) {
                    const expires = new Date(+new Date() + 604800000).toUTCString();
                    document.cookie = `ccl=${cookie}; expires=${expires}`;
                }
                cb(count);
            });

            return;
        }

        cb(count);
    }

    // commonjs
    if (typeof module !== 'undefined') {
        module.exports = ccl;
    } else {
        scope.cookieCacheLoad = ccl;
    }
}
