var gulp = require('gulp');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');
var autowatch = require('gulp-autowatch');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

var watch = {},
    watchTask = [];

gulp.task('images', function() {
    gulp.src('./assets/images/*')
        .pipe(gulp.dest('./public/images'))
});

watch.scripts = './assets/js/app.js'
gulp.task('scripts', function() {
    gulp.src(['node_modules/vue/dist/vue.min.js', 'node_modules/jquery-ajax/jquery.min.js', './assets/js/app.js'])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

watch.stylus = './assets/styl/*';
gulp.task('stylus', function() {
    gulp.src('./assets/styl/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            'include css': true
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

watch.views = './views/*.pug';
gulp.task('views', function() {
    gulp.src('./views/*.pug')
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    autowatch(gulp, watch);
});


gulp.task('default', ['scripts', 'images', 'stylus']);
gulp.task('live', ['scripts', 'images', 'stylus', 'views', 'watch']);
