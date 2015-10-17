// gulpfile.js

var gulp = require('gulp');
var gutil = require('gulp-util');
var batch = require('gulp-batch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var portNumber = require('port-number');
var path = require('path');

var devServer = {
  port: portNumber(31337),
  server: '0.0.0.0',
  livereload: portNumber(35000),
  root: './dist'
};

var paths = {
  scripts: ['src/**/*.*'],
  markup: ['src/*.html'],
  styles: { paths: [path.join(__dirname, 'src/styles')] }
};

gulp.task('build', ['make dist', 'run browserify', 'copy dist', 'compile less']);
gulp.task('watch changes', watchChanges);
gulp.task('run browserify', runBrowserify);
gulp.task('make dist', makeDist);
gulp.task('copy dist', copyDist);
gulp.task('compile less', compileLess);
gulp.task('start static server', startStaticServer);

gulp.task('default', ['build', 'start static server', 'watch changes']);

function runBrowserify() {
  var bundle = browserify({
    entries: 'src/index.js',
    extensions: ['js', '.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', gutil.log);

  bundle.pipe(source('bundle.js')).pipe(gulp.dest('dist'));
}

function watchChanges() {
  gulp.watch(paths.scripts, ['run browserify']);
  gulp.watch('src/styles/*.less', ['compile less']);
  gulp.watch(paths.markup, ['copy dist']);

  gulp.watch(['dist/**'], batch(function (events, done) {
    // todo: don't use internal properties:
    notifyLivereload(events._list);
    done();
  }));
}

function makeDist() {
  var fs = require('fs');
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
  if (!fs.existsSync('./dist/textures')) {
    fs.mkdirSync('./dist/textures');
  }
}

function copyDist() {
  var concat = require('gulp-concat');

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  gulp.src('./node_modules/bootstrap/fonts/*')
      .pipe(gulp.dest('./dist/fonts/'));

  gulp.src('./textures/*')
      .pipe(gulp.dest('./dist/textures'));
}

function compileLess() {
  var less = require('gulp-less')(paths.styles);
  less.on('error', function (err) {
    gutil.log(gutil.colors.red('Failed to compile less: '), gutil.colors.yellow(err.message));
  });

  gulp.src('src/styles/style.less')
    .pipe(less)
    .pipe(gulp.dest('dist/styles'));
}

var lr;
function startStaticServer() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: devServer.livereload }));
  app.use(express.static(devServer.root));
  app.listen(devServer.port, devServer.server, function () {
    gutil.log("opened server on http://" + devServer.server + ":" + devServer.port);
  });

  lr = require('tiny-lr')();
  lr.listen(devServer.livereload);
}

function notifyLivereload(events) {
  var files = events.map(torelativePath);
  lr.changed({ body: { files: files } });
  var serverName = devServer.server === '0.0.0.0' ? '127.0.0.1' : devServer.server;
  gutil.log("Notified live reload for http://" + serverName + ":" + devServer.port);
}

function torelativePath(event) {
  return path.relative(devServer.root, event.path);
}
