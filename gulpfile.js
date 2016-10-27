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


watchTask.push('images')
gulp.task('images', function() {
    gulp.src('./assets/images/*')
        .pipe(gulp.dest('./public/images'))
});

watch.scripts = './assets/js/app.js'
watchTask.push('scripts')
gulp.task('scripts', function() {
    gulp.src(['node_modules/vue/dist/vue.min.js', 'node_modules/jquery-ajax/jquery.min.js', './assets/js/app.js'])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
        .pipe(livereload());
});

watch.stylus = './assets/styl/*';
watchTask.push('stylus');
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
watchTask.push('views');
gulp.task('views', function() {
    gulp.src('./views/*.pug')
        .pipe(livereload());
});

watchTask.push('watch')
gulp.task('watch', function() {
    livereload.listen();
    autowatch(gulp, watch);
});

watch.stylus

gulp.task('default', watchTask);
