import config from "./gulpfile.config.js";

const {
  MODE, 
  COMPRESSION, 
  PATHS, 
  JSBUILD
} = config;

import { src, dest, parallel } from 'gulp';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import concat from 'gulp-concat';

// JSBUILD: "webpack" modules
import named from 'vinyl-named';
import webpackCompiler from 'webpack';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';

// JSBUILD: "concat" modules
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import gulpIgnore from 'gulp-ignore';


// const unhandledError = require("cli-handle-unhandled");

// COPIES JS FROM /src/vendors to assets/js
// Creates a concatenated vendors.js file for production mode i.e. if MODE_DEV is false.
function vendorJS() {
  var scripts = [
    // Order of dependencies matter in DEV_MOD: false.
    // All the vendors scripts will be concatenated in single vendors.js file in production mode.
    // Bootstrap JS
    PATHS.src.js + "/vendors/bootstrap/bootstrap.bundle.min.js",
    // Root Files in the vendors folder are automatically picked and processed
    PATHS.src.js + "/vendors/*.js",
  ];

  return src(scripts)
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(gulpIf(MODE == "production", concat("vendors.js")))
    .pipe(dest(PATHS.assets.js));
}

// Build custom theme scripts without bundling
// Simply Concatenates all the .js files within src/js/scripts/* folder and src/js/scripts.js
function concatScripts() {
  return src([PATHS.src.js + "/scripts/*.js", PATHS.src.js + "/scripts.js"], {
    sourcemaps: true,
  })
    .pipe(
      plumber({
        errorHandler: function (err) {
          console.log(err);
          this.emit("end");
        },
      })
    )
    .pipe(concat("scripts.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest(PATHS.assets.js, { sourcemaps: "./maps" }))
    .pipe(gulpIgnore.exclude((file) => /map?$/.test(file.path)))
    .pipe(
      gulpIf(
        COMPRESSION,
        terser({
          mangle: {
            toplevel: true,
          },
        })
      )
    )
    .pipe(gulpIf(COMPRESSION, rename({ suffix: ".min" })))
    .pipe(gulpIf(COMPRESSION, dest(PATHS.assets.js, { sourcemaps: "./maps" })));
}

// creates script.bundle for custom theme scripts
// build /src/js/scripts.bundle.js file via Webpack
function scriptsBundle() {
  return src(PATHS.src.js + "/scripts.bundle.js")
    .pipe(named())
    .pipe(
      webpack(webpackConfig, webpackCompiler, function (err, stats) {
        console.log(err);
      })
    )
    .pipe(rename({ basename: "scripts.bundle", suffix: ".min" }))
    .pipe(dest(PATHS.assets.js));
}

function themeScripts() {
  if (JSBUILD == "webpack") {
    return scriptsBundle();
  } else {
    return concatScripts();
  }
}

const scripts = parallel(themeScripts, vendorJS);

export { vendorJS, themeScripts, scripts };
