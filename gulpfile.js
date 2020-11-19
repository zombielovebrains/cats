"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

// gulp.task('scripts', function () {
//   return gulp.src('./src/js/index.js')
//     .pipe(webpackStream({
//       output: {
//         filename: 'app.js',
//       },
//       module: {
//         rules: [
//           {
//             test: /\.(js)$/,
//             exclude: /(node_modules)/,
//             loader: 'babel-loader',
//             query: {
//               presets: ['env']
//             }
//           }
//         ]
//       }
//     }))
//     .pipe(gulp.dest('./build/'))
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('./build/'));
// });

gulp.task("server", function () {
  server.init({
    server: "source/",
    injectChanges: true,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
