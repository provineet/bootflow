import config from './gulpfile.config.js';

const { PATHS, watchFiles } = config;

import { watch as gulpWatch, series } from 'gulp';
import { reloadBrowser } from './browserSync.js';
import { scss } from './scss.js';
import { vendorJS, themeScripts } from './scripts.js';
import { imgMinify } from './imageMin.js';
import { sprites } from './sprites.js';
// import unhandledError from 'cli-handle-unhandled';

function watchSCSS() {
  // Watches for SCSS file changes
  if (watchFiles.scss == true) {
    // gulpWatch(
    //   [
    //     PATHS.src.scss + "/vendors/**/*.scss",
    //     PATHS.src.scss + "/vendors.scss",
    //     PATHS.src.scss + "/abstract/_variables.scss",
    //   ],
    //   series(vendorSCSS, reloadBrowser)
    // );

    gulpWatch(
      PATHS.src.scss + "/**/*.scss",
      {
        ignored: [
          PATHS.src.scss + "/vendors/**/*.scss",
          PATHS.src.scss + "/vendors.scss",
        ],
      },
      series(scss, reloadBrowser)
    );
  }
}

function watchJS() {
  // Watches for JS file changes inside ./src
  if (watchFiles.js == true) {
    gulpWatch(
      PATHS.src.js + "/vendors/**/*.js",
      series(vendorJS, reloadBrowser)
    );
    gulpWatch(
      [
        `${PATHS.src.js}/scripts/*.js`,
        `${PATHS.src.js}/scripts.js`,
        `${PATHS.src.js}/modules/*.js`,
        `${PATHS.src.js}/scripts.modules.js`,
      ],
      series(themeScripts, reloadBrowser)
    );
  }
}

function watchImg() {
  // Watches for Images file changes inside ./src
  if (watchFiles.images == true) {
    gulpWatch(PATHS.src.images + "/*", series(imgMinify, reloadBrowser));
  }

  // Watches for sprite_images folder changes inside ./src
  // Sprite generation will in-turn call SCSS and Images watcher and hence reload the browser as a side-effect
  if (watchFiles.sprites == true) {
    gulpWatch(PATHS.src.sprites + "/*", series(sprites));
  }
}

function watchAssetsFolder() {
  // Watches for CSS file changes inside ./assets
  if (watchFiles.assetsCSS == true) {
    gulpWatch(PATHS.assets.css + "/**/*.css", series(reloadBrowser));
  }

  // Watches for JS file changes inside ./assets
  if (watchFiles.assetsJS == true) {
    gulpWatch(PATHS.assets.js + "/**/*.js", series(reloadBrowser));
  }
}

function watchPHP() {
  // Watches for PHP files changes
  if (watchFiles.php == true) {
    gulpWatch(
      "**/*.php",
      { ignored: ["./node_modules/**/*.php"] },
      series(reloadBrowser)
    );
  }
}

// Watches for changes in style.scss, _template_variables.scss, *js files and images within src folder
function watch() {
  watchSCSS();
  watchJS();
  watchImg();
  watchAssetsFolder();
  watchPHP();
}

export { watch };
