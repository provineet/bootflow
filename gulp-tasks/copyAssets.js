import config from "./gulpfile.config.js";
const { PATHS } = config;

import merge from 'merge-stream';

import { src, dest, parallel } from "gulp";

// Copies jQuery, Bootstrap & FontAwesome5 files node_modules to src folders
function copyGeneralVendors() {

  const vendorFiles = [
    "jquery/dist/*.js",
    "bootstrap/dist/**/**"
  ];

  return src(vendorFiles.map(f => `${PATHS.node}/${f}`), {
    base: `${PATHS.node}`
  })
  .on('error', console.error)
  .pipe(dest(PATHS.src.folder + "/vendors/"));

}

function copyFontAwesome() {
  return src(`${PATHS.node}/@fortawesome/fontawesome-free/**/**`, {
    base: `${PATHS.node}/@fortawesome/fontawesome-free`
  })
  .pipe(dest(`${PATHS.src.folder}/vendors/fontawesome`));
}

const copySrcVendorAssets = parallel(copyGeneralVendors, copyFontAwesome);

// Copy selected files to the assets folder (compressed ones and required ones; you can add more files to the array as per your needs after analyzing the assets_src/vendors folder. )
function copyVendorAssets() {

  // add files to this array that you want to export to the assets folder.
  const vendorFiles = [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/js/bootstrap.bundle.min.js',
    'bootstrap/dist/js/bootstrap.min.js',
    'fontawesome/css/all.min.css',
    'fontawesome/js/all.min.js',
    'fontawesome/webfonts/**/**'
  ];

  return src(vendorFiles.map(f => `${PATHS.src.folder}/vendors/${f}`), {
    base: `${PATHS.src.folder}/vendors`
  })
  .pipe(
    dest(PATHS.assets.folder + "/vendors/")
  );

}

export { copySrcVendorAssets as srcVendorAssets, copyVendorAssets as vendorAssets };
