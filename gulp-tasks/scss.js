import config from "./gulpfile.config.js";

const {
  MODE, // 'development' or 'production'
  COMPRESSION, // true | false : compresses css and js files while compiling them
  PATHS,
} = config;

import { src, dest, parallel } from "gulp";
import plumber from "gulp-plumber";
import gulpIf from "gulp-if";
import autoPrefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";

import * as sass from 'sass';
import gulpSass from 'gulp-sass';
const sassCompiler = gulpSass(sass);


// Compiles assets_src/scss/style.scss
function scss() {
  return processSCSS(`${PATHS.src.scss}/style.scss`, { sourcemaps: true });
}

function processSCSS(source, srcObj = {}) {
  return src(source, srcObj)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(sassCompiler({ errLogToConsole: true }))
    .pipe(
      autoPrefixer({
        env: MODE,
        grid: "autoplace", // should Autoprefixer add IE 10-11 prefixes for Grid Layout properties? false | autoplace | no-autoplace
      })
    )
    .pipe(
      gulpIf(
        COMPRESSION,
        dest(PATHS.assets.css),
        dest(PATHS.assets.css, { sourcemaps: "./maps" })
      )
    )
    .pipe(gulpIf(COMPRESSION, cleanCSS({ compatibility: "*", debug: true })))
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(gulpIf(COMPRESSION, rename({ suffix: ".min" })))
    .pipe(
      gulpIf(COMPRESSION, dest(PATHS.assets.css, { sourcemaps: "./maps" }))
    );
}

export { scss };
