import { series, parallel } from "gulp";
import { scss } from "./scss.js";
import { srcVendorAssets as copyAssets, vendorAssets } from "./copyAssets.js";
import { minify } from './minify.js';
import { scripts } from './scripts.js';
import { build, devBuild, cleanDist, cleanDevDist } from "./createDist.js";
import { sprites } from "./sprites.js";
import { imgMinify } from "./imageMin.js";
import { browserSync, reloadBrowser } from "./browserSync.js";
import { watch } from "./watch.js";

// Serves website on localhost and watch for changes
// Compiles SCSS, JS, Optimize Images, Create Sprite Images and SCSS
// Create a dev server using browserSync and serve it on localhost
// To change your proxy address edit gulpconfig.json
const serve = series(
  parallel(scss, vendorAssets, scripts, imgMinify, sprites),
  browserSync,
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
