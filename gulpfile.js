const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create();
const webpack = require("webpack");
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

sass.compiler = require('sass');

const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false, 
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome"
    });

    cb();
}

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

const js = function(cb) {
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        browserSync.reload();
        cb();
    })
}

const html = function(cb) {
    return gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
}

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
}

const images = function(cb) {
    return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}
const watch = function(cb) {
    gulp.watch("src/scss/**/*.scss", {usePolling : true}, gulp.series(css));
    gulp.watch("src/html/**/*.html", {usePolling : true}, gulp.series(html, htmlReload));
    gulp.watch("src/js/**/*.js", {usePolling : true}, gulp.series(js));
    gulp.watch('src/images/**/*.{gif,jpg,png,svg}', gulp.series(images));
    // gulp.watch("dist/**/*.html").on("change", browserSync.reload);
    cb();
}


exports.default = gulp.series(css, html, js, images, server, watch);
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.js = js;
exports.images = images;
