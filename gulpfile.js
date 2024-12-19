var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less-compile', function(cb) {
    gulp
      .src('styles/*.less')
      .pipe(less())
      .pipe(
        gulp.dest(function(f) {
          return f.base;
        })
      );
    cb();
  });

gulp.task('default', gulp.series('less-compile', function(cb) {
    gulp.watch('styles/*.less', gulp.series('less-compile'));
    cb();
}));