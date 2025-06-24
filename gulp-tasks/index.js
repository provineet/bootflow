import { series, parallel } from "gulp";
import { scss } from "./scss.js";
import { srcVendorAssets as copyAssets, vendorAssets } from "./copyAssets.js";
import { minify } from './minify.js';
import { scripts } from './scripts.js';
import { build, devBuild, cleanDist, cleanDevDist } from "./createDist.js";
import { sprites } from "./sprites.js";
import { imgMinify } from "./imageMin.js";
import { browsersync, reloadBrowser } from "./browserSync.js";
import { watch } from "./watch.js";

// // Importing Tasks
// const { scss } = require("./scss");
// const { browserSync } = require("./browserSync");
// const { minify } = require("./minify");
// const { scripts } = require("./scripts");
// // const { imgMin } = require("./imagemin");
// const { sprites } = require("./sprites");
// const { copyAssets, fonts } = require("./copyAssets");
// const { watch } = require("./watch");

// const { build, devBuild, cleanDist, cleanDevDist } = require("./createDist");

// Serves website on localhost and watch for changes
// Compiles SCSS, JS, Optimize Images, Create Sprite Images and SCSS
// Create a dev server using browserSync and serve it on localhost
// To change your proxy address edit gulpconfig.json
const serve = series(
  parallel(scss, vendorAssets, scripts, imgMinify, sprites),
  browsersync,
  watch
);

export {
  serve,
  build,
  devBuild,
  cleanDist,
  cleanDevDist,
  vendorAssets,
  copyAssets,
  minify,
  scss,
  scripts,
  sprites,
  imgMinify
};
