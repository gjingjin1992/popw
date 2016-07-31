const gulp = require('gulp');
const server = require('gulp-server-livereload');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const babelify = require('babelify');
const fs = require('fs');
const moment = require('moment');

gulp.task('bundle-client', () => {
  const bundler = browserify({
    entries: ['./app/client/index.jsx'],
    transform: [['babelify', {presets: ['es2015', 'react']}]], // JSX to JS
    debug: true, // sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // watchify
  });

  const watcher_client = watchify(bundler, {  });
  return watcher_client
    .on('update', function () {
      const updateStart = Date.now();
      watcher_client.bundle()
        .on('error', console.error.bind(console))
        .pipe(source('client.js'))
        .pipe(gulp.dest('./public_static/build_dev'));
      console.log('Updated in ', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('client.js'))
    .pipe(gulp.dest('./public_static/build_dev'));
});

gulp.task('bundle-admin', () => {
  const bundler = browserify({
    entries: ['./app/admin/index.js'],
    transform: [['babelify', {presets: ['es2015', 'react']}]], // JSX to JS
    debug: true, // sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // watchify
  });

  const watcher_admin = watchify(bundler, {});
  return watcher_admin
    .on('update', function () {
      const updateStart = Date.now();
      watcher_admin.bundle()
        .on('error', console.error.bind(console))
        .pipe(source('admin.js'))
        .pipe(gulp.dest('./public_static/build_dev'));
      console.log('Updated in ', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('admin.js'))
    .pipe(gulp.dest('./public_static/build_dev'));
});

gulp.task('bundle-production-client', () => {

  var bundler = browserify({
    entries: ['./app/client/index.jsx'],
    transform: [['babelify', {presets: ['es2015', 'react']}]], // JSX to JS
    debug: false, // sourcemapping
    cache: {}, packageCache: {}, fullPaths: false // watchify
  });

  bundler.bundle().pipe(fs.createWriteStream('./public_static/build_prod/client.js'));
});

gulp.task('bundle-production-admin', () => {

  var bundler = browserify({
    entries: ['./app/admin/index.js'],
    transform: [['babelify', {presets: ['es2015', 'react']}]], // JSX to JS
    debug: false, // sourcemapping
    cache: {}, packageCache: {}, fullPaths: false // watchify
  });

  bundler.bundle().pipe(fs.createWriteStream('./public_static/build_prod/admin.js'));
});

gulp.task('webserver-client', function () {
  gulp.src('public_static')
    .pipe(server({
      livereload: true,
      host: '0.0.0.0',
      port: 8000
    }));
});

gulp.task('webserver-extra', function () {
  gulp.src('extra_files/landing-page')
    .pipe(server({
      livereload: false,
      port: 8001
    }));
});


gulp.task('default', ['bundle-client', 'webserver-client'], () => {
});
