import config from './gulpfile.config.js';

const { browserSyncOptions } = config;

import browserSyncModule from 'browser-sync';

// Create browserSync instance
const browserSyncInstance = browserSyncModule.create();

// Run: gulp browserSyncInstance
// Starts browser-sync task for starting the server.
function browserSync(done) {
  browserSyncInstance.init(browserSyncOptions);
  done();
}

function reloadBrowser(done) {
  browserSyncInstance.reload();
  done();
}

export { browserSync, browserSyncInstance, reloadBrowser };
