'use strict';

/****Dependencies****/
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var input = './public/sass/main.scss';
var output = './public/css';

gulp.task('sass', function() {
    gulp.src(input)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(output))
    .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);