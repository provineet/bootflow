import config from './gulpfile.config.js';

const { 
  PATHS, 
  distIgnore, 
  devDistIgnore } = config;

import { src, dest, series, parallel } from 'gulp';
import { deleteAsync } from 'del';
import { resolve, sep, dirname } from 'path';
import { fileURLToPath } from 'url';
import zip from 'gulp-zip';

import { scss } from "./scss.js";
import { srcVendorAssets as copyAssets, vendorAssets } from "./copyAssets.js";
import { minify } from './minify.js';
import { scripts } from './scripts.js';
import { sprites } from "./sprites.js";
import { imgMinify } from "./imageMin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// remove the dist folder
function cleanDist() {
  return deleteAsync([PATHS.dist]);
}

// remove the dev-dist folder
function cleanDevDist() {
  return deleteAsync([PATHS.devdist]);
}

// Create a dist folder
function createDist(distFolder, ignoreFiles) {
  const themeName = resolve(__dirname, "..").split(sep).pop();

  return src(["**/*", "*"], {
    ignore: ignoreFiles,
    buffer: true,
    dot: true,
  })
    .pipe(dest(`${distFolder}/${themeName}`))
    .pipe(zip(`${themeName}.zip`))
    .pipe(dest(distFolder));
}

// Create a production dist
function dist() {
  return createDist(PATHS.dist, distIgnore);
}

// Create a development dist
function devDist() {
  return createDist(PATHS.devDist, devDistIgnore);
}

// Build a production dist
const build = series( copyAssets, parallel( vendorAssets, scss, scripts, sprites, imgMinify ), minify, cleanDist, dist);

// Build a dist for development
const devBuild = series(cleanDevDist, devDist);

export { build, devBuild, cleanDist, cleanDevDist };
