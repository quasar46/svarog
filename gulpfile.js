'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var htmlmin = require('gulp-htmlmin');

gulp.task('css', function () {
  return gulp.src('./source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(server.stream());
});

gulp.task('owl', function () {
  return gulp.src('./source/vendor/*.css')
    .pipe(gulp.dest('build/css'))
});

gulp.task('html', function () {
  return gulp.src('./source/*.html')

    .pipe(gulp.dest('./build'));
});

gulp.task('js', function () {
  return gulp.src('./source/js/*.js')
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('images', function () {
  console.log(imagemin);
  return gulp.src('./source/img/*.{jpg, png, svg}')
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
})

gulp.task('server', function () {
  server.init({
    server: './build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('./source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('./source/*.html', gulp.series('html'));
  gulp.watch('./source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('./source/js/*.js', gulp.series('js'));
  gulp.watch('./source/js/*.js', gulp.series('js', 'refresh'));
  gulp.watch('./source/img/*.{jpg, png, svg}', gulp.series('images', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('copy', function () {
  return gulp.src([
      './source/fonts/**/*.{woff,woff2}',
      './source/img/**',
      './source/js/**',
      './source/*.ico'
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('./build');
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'owl',
  'js', 'images'));
gulp.task('start', gulp.series('build', 'server'));