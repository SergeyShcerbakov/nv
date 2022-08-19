const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require("gulp-cssnano");
const imagemin = require("gulp-imagemin");
const { series } = require("gulp");

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function htmlInckude() {
    return gulp
        .src(['app/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
};

function buildStyles() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
};

function cssNanotodest() {
    return gulp
        .src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dest/css'));
};

function imgmin() {
    return gulp
        .src('app/images/**/*.*')
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 80, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(gulp.dest("dest/images"));
};

function fontstodest() {
    return gulp
        .src('app/fonts/*.*')
        .pipe(gulp.dest('dest/fonts/'));
};

exports.default = defaultTask; // gulp
exports.html = htmlInckude;
exports.scss = buildStyles;
exports.css = cssNanotodest;
exports.img = imgmin;
exports.font = fontstodest;

exports.dev = series (
    htmlInckude,
    buildStyles,
    cssNanotodest,
    fontstodest,
    imgmin
);