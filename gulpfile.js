const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('default', function () {
    const webpackConfig = require('./webpack.config.js');
    webpackConfig.watch = true;
    delete webpackConfig.output.path;
    return gulp.src('./test/fixture/test-browser.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('tmp/'));
});

