import config from "./gulpfile.config.js";
const { PATHS } = config;

import { src, dest } from "gulp";

// Copies jQuery, Bootstrap & FontAwesome5 files node_modules to src folders
function copyVendorAssets() {
  // Copy Slim Minified version of Jquery 3.*.* from node_modules
  var stream = src(PATHS.node + "jquery/dist/*.js").pipe(
    dest(PATHS.src.folder + "/vendors/jquery")
  );

  // Copy BS5 files
  src(PATHS.node + "bootstrap/dist/**/**").pipe(
    dest(PATHS.src.folder + "/vendors/bootstrap")
  );

  // Copy FontAwesome5 files
  src(
    PATHS.node +
      "@fortawesome/fontawesome-free/**/**"
  ).pipe(dest(PATHS.src.folder + '/vendors/fontawesome'));

  return stream;
}

// Copies font src to assets folder
function fonts() {
  return src(PATHS.src.fonts + "/**/*").pipe(dest(PATHS.assets.fonts));
}

export { copyAssets, fonts };
