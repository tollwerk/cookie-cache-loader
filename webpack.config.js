const webpack = require('webpack');

module.exports = {
    entry: [
        './test/fixture/test-browser.js'
    ],
    module: {
        loaders: [
            // {
            //     test: /\.js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
            {
                test: /\/onloadCSS.js$/,
                loader: "uglify-loader!script-loader"
            }
        ]
    },
    output: {
        path: 'tmp',
        filename: 'build.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }), /*
         new webpack.ProvidePlugin({
         Promise: 'es6-promise-promise'
         })*/
    ]
};
