const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compiling sass and injecting into browser

gulp.task('sass', function () {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

//Moving js files to src/js

gulp.task('js', function () {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task(
  'serve',
  gulp.series('sass', function () {
    browserSync.init({
      server: './src',
    });

    gulp.watch(
      ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
      gulp.series('sass')
    );
    gulp.watch('src/*.html').on('change', browserSync.reload);
  })
);

//Moving Fonts to src

gulp.task('fonts', function () {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

//Moving font awesome CSS to src

gulp.task('fa', function () {
  return gulp
    .src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'));
});

gulp.task('default', gulp.series('js', 'serve', 'fa', 'fonts'));
