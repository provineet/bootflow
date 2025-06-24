import config from "./gulpfile.config.js";

const {
  MODE, // 'development' or 'production'
  PATHS,
} = config;

import { src, dest, parallel } from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import sourceMaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
// import unhandledError from 'cli-handle-unhandled';


// Minifies all the CSS files within ./assets/css folder
function minifyCSS() {
  return src(PATHS.assets.css + "/*.css", {
    ignore: PATHS.assets.css + "/*.min.css",
    sourcemaps: true,
  })
    .pipe(gulpIf(MODE == "development", sourceMaps.init({ loadMaps: true })))
    .pipe(cleanCSS({ compatibility: "*", debug: true }))
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(gulpIf(MODE == "development", sourceMaps.write("./maps")))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(PATHS.assets.css));
}

// Minifies JS files within ./assets/js folder
function minifyJS() {
  return src(PATHS.assets.js + "/*.js", {
    ignore: PATHS.assets.js + "/*.min.js",
  })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(gulpIf(MODE == "development", sourceMaps.init({ loadMaps: true })))
    .pipe(
      terser({
        mangle: {
          toplevel: true,
        },
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulpIf(MODE == "development", sourceMaps.write("./maps")))
    .pipe(dest(PATHS.assets.js));
}

const minify = parallel(minifyCSS, minifyJS);

export { minify };
