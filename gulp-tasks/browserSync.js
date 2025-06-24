import config from './gulpfile.config.js';

const { browserSyncOptions } = config;

import browserSyncModule from 'browser-sync';

// Create browserSync instance
const browserSync = browserSyncModule.create();

// Run: gulp browsersync
// Starts browser-sync task for starting the server.
function browsersync(done) {
  browserSync.init({}, browserSyncOptions);
  done();
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

export { browsersync, reloadBrowser };
