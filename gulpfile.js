var gulp = require("gulp");
var sass = require("gulp-sass");
var livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");
var clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');


// Development
gulp.task("sassDev", function () {
    return gulp
        .src("./sass/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("."))
        .pipe(livereload());
});

gulp.task("watch", function () {
    livereload.listen();
    gulp.watch(["sass/*.scss", "sass/**/*.scss"], ["sassDev"]);
});
gulp.task("default", ["sassDev", "watch"]);

// Production
gulp.task("clean", function () {
    return gulp
        .src(['./style.css', './style.css.map'])
        .pipe(clean({
            force: true
        }))
})
gulp.task("sassProd", function () {
    return gulp
        .src("./sass/style.scss")
        .pipe(sass({
            outputStyle: "nested"
        }))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("."));
});

gulp.task("build", ["clean", "sassProd"]);