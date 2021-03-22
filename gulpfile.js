const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const rigger = require('gulp-rigger');
const htmlFiles = './src/*.html';
const styleFiles = './src/scss/*.**';
const scriptFiles = './src/js/*.**';
const imgFiles = 'src/img/**/*.*';
const fontsFiles = 'src/fonts/**/*.*';




gulp.task('html', () => {
  return gulp.src(htmlFiles)
    .pipe(rigger())    
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream())
});


gulp.task('styles', () => {
  return gulp.src(styleFiles)
    .pipe(sass())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src(scriptFiles)
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});


gulp.task('images', function () {
  return gulp.src(imgFiles)
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.stream());
});


gulp.task('fonts', function () {
  return gulp.src(fontsFiles)
    .pipe(gulp.dest('build/fonts'))
    .pipe(browserSync.stream());
});


gulp.task('watch', () => {

  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch("./src/**/*.html", gulp.series('html')).on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/scss/**/*.css', gulp.series('styles'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('./src/img/**/*.*', gulp.series('images'));
  gulp.watch('./src/fonts/**/*.*', gulp.series('fonts'));

});



gulp.task('del', () => {
  return del(['build/*'])

});


gulp.task('start', gulp.series(gulp.parallel('html', 'styles', 'scripts', 'images', 'fonts'), 'watch'));






