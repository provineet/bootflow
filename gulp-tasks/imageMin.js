import config from './gulpfile.config.js';

const { PATHS } = config;

import { src, dest } from 'gulp';
import imageMin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

// Running image optimizing task
function imgMinify() {
  return src(PATHS.src.images + "/**", {encoding: false})
    .pipe(
      imageMin(
        [
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              { removeViewBox: true, 
                active: true
              }, 
              { cleanupIDs: false,
                active: false
               }],
          }),
        ],
        {
          verbose: true, // uncomment to see the output of compression stats in the console
        }
      )
    )
    .pipe(dest(PATHS.assets.images));
}

export { imgMinify };
