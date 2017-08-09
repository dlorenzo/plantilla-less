
var gulp = require('gulp');
var less = require('gulp-less');
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var clean = require('gulp-clean');

gulp.task('build', ['clean'], function () {
  procLess(true);
});

gulp.task('watch', ['clean'], function () {
  procLess();
  gulp.watch('./less/**/*.less', ['less']);
});

gulp.task('clean', function () {
  return gulp.src('./css/*', { read: false })
    .pipe(clean());
});

gulp.task('less', procLess);

/**
* Estilos
*/
function procLess(release = false) {
  if (release === true) {
    return gulp.src('./less/**/[^_]*.less')
      .pipe(wait(500))
      .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest('./css'));
  } else {
    return gulp.src('./less/**/[^_]*.less')
      .pipe(wait(1000))
      .pipe(sourcemaps.init())
      .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./css'));
  }
}