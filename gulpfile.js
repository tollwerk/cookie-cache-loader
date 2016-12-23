const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('default', function () {
    return gulp.src('test/test-browser.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/'));
});

