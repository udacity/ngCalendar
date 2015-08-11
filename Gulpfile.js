var gulp = require('gulp');
var sync = require('run-sequence');
var webpack = require('webpack-stream');
var config = require('./webpack.config');
var minConfig = require('./webpack.configMinify');

var paths = {
  entry: 'src/index.js',
  js: './src/**/*.js',
  output: './dist'
};

gulp.task('bundle', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(paths.output));
});

gulp.task('minify', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(minConfig))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(done) {
  sync(['bundle', 'minify'], done);
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['bundle']);
});

gulp.task('default', function(done) {
  sync('bundle', 'watch', done);
});

