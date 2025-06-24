import config from './gulpfile.config.js';
const { PATHS, cssSprites } = config;

import { src, dest } from 'gulp';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import { finished } from 'stream/promises'; // Node.js built-in

function sprites() {
  let spriteOptions = {
    imgName: 'sprite.png',
    cssName: '_sprite.css',
    imgPath: PATHS.assets.images + '/sprite.png',
    algorithm: 'binary-tree',
  };

  if (cssSprites.retina === true) {
    spriteOptions = {
      ...spriteOptions,
      retinaSrcFilter: PATHS.src.sprites + '/*@2x.png',
      retinaImgName: 'sprite@2x.png',
      retinaImgPath: PATHS.src.images + '/sprite@2x.png',
    };
  }

  const spriteData = src(PATHS.src.sprites + '/*.png', {encoding: false}).pipe(spritesmith(spriteOptions));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(dest(PATHS.src.images));

  const cssStream = spriteData.css
    .pipe(dest(PATHS.src.scss + '/components/'));

  // ✅ Return a promise that resolves when both streams finish
  return Promise.all([
    finished(imgStream),
    finished(cssStream)
  ]);
}

export { sprites };
