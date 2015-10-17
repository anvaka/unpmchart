// gulpfile.js

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('build', function () {
  browserify({
    entries: 'src/index.js',
    extensions: ['js', '.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
  .on('error', gutil.log);
});

gulp.task('watch', function() {
  watch(['src/**/*.js'], batch(function (events, done) {
    gulp.start('build', done);
  }));
});

gulp.task('default', ['watch']);
