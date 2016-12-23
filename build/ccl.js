/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const ccl = __webpack_require__(1);

	document.write(new Date().toLocaleString());
	ccl(['/test/stylesheet-1.css'], ['/test/script-1.js'], 'abc');


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// Async: {
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
	            const loadJS = __webpack_require__(2);
	            for (let script of scripts) {
	                promises.push(new Promise((resolve/*, reject*/) => {
	                    loadJS(script, resolve);
	                }));
	            }
	        }

	        // Assynchronously load stylesheets
	        if (stylesheets.length) {
	            const loadCSS = __webpack_require__(3).loadCSS;
	            __webpack_require__(4);
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
	    if (true) {
	        module.exports = cookieCacheLoad;
	    }
	    else {
	        w.cookieCacheLoad = cookieCacheLoad;
	    }
	}(typeof global !== 'undefined' ? global : this));




	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
	(function( w ){
		var loadJS = function( src, cb ){
			"use strict";
			var ref = w.document.getElementsByTagName( "script" )[ 0 ];
			var script = w.document.createElement( "script" );
			script.src = src;
			script.async = true;
			ref.parentNode.insertBefore( script, ref );
			if (cb && typeof(cb) === "function") {
				script.onload = cb;
			}
			return script;
		};
		// commonjs
		if( true ){
			module.exports = loadJS;
		}
		else {
			w.loadJS = loadJS;
		}
	}( typeof global !== "undefined" ? global : this ));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
	(function(w){
		"use strict";
		/* exported loadCSS */
		var loadCSS = function( href, before, media ){
			// Arguments explained:
			// `href` [REQUIRED] is the URL for your CSS file.
			// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
				// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
			// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
			var doc = w.document;
			var ss = doc.createElement( "link" );
			var ref;
			if( before ){
				ref = before;
			}
			else {
				var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
				ref = refs[ refs.length - 1];
			}

			var sheets = doc.styleSheets;
			ss.rel = "stylesheet";
			ss.href = href;
			// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
			ss.media = "only x";

			// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
			function ready( cb ){
				if( doc.body ){
					return cb();
				}
				setTimeout(function(){
					ready( cb );
				});
			}
			// Inject link
				// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
				// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
			ready( function(){
				ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
			});
			// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
			var onloadcssdefined = function( cb ){
				var resolvedHref = ss.href;
				var i = sheets.length;
				while( i-- ){
					if( sheets[ i ].href === resolvedHref ){
						return cb();
					}
				}
				setTimeout(function() {
					onloadcssdefined( cb );
				});
			};

			function loadCB(){
				if( ss.addEventListener ){
					ss.removeEventListener( "load", loadCB );
				}
				ss.media = media || "all";
			}

			// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
			if( ss.addEventListener ){
				ss.addEventListener( "load", loadCB);
			}
			ss.onloadcssdefined = onloadcssdefined;
			onloadcssdefined( loadCB );
			return ss;
		};
		// commonjs
		if( true ){
			exports.loadCSS = loadCSS;
		}
		else {
			w.loadCSS = loadCSS;
		}
	}( typeof global !== "undefined" ? global : this ));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5)(__webpack_require__(6))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "/*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */\n/* global navigator */\n/* exported onloadCSS */\nfunction onloadCSS( ss, callback ) {\n\tvar called;\n\tfunction newcb(){\n\t\t\tif( !called && callback ){\n\t\t\t\tcalled = true;\n\t\t\t\tcallback.call( ss );\n\t\t\t}\n\t}\n\tif( ss.addEventListener ){\n\t\tss.addEventListener( \"load\", newcb );\n\t}\n\tif( ss.attachEvent ){\n\t\tss.attachEvent( \"onload\", newcb );\n\t}\n\n\t// This code is for browsers that don’t support onload\n\t// No support for onload (it'll bind but never fire):\n\t//\t* Android 4.3 (Samsung Galaxy S4, Browserstack)\n\t//\t* Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)\n\t//\t* Android 2.3 (Pantech Burst P9070)\n\n\t// Weak inference targets Android < 4.4\n \tif( \"isApplicationInstalled\" in navigator && \"onloadcssdefined\" in ss ) {\n\t\tss.onloadcssdefined( newcb );\n\t}\n}\n"

/***/ }
/******/ ]);