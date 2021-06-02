# BootFlow | A WordPress Scaffolding Developer Theme

A powerful yet easy to setup WordPress Scaffolding Developer Theme that kickstarts your modern WordPress theme development cycle.

For the frontend folks it has built-in support for SASS, Babel, Webpack, Image Optimizer, BrowserSync and Gulp.

In the theme PHP it has built-in support for Namespaces, Classes Autoloading, even an autoloader for your functions files.

![Gulp + Webpack Frontend Boilerplate](./bootflow-bolierplate.png)

## ⚙️ Installtion

It requires [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) and a global installation of [gulp 4.x](http://gulpjs.com/) on your development machine.

You can install NodeJs from [here](https://nodejs.org/en/download/).

Once Node is installed on your system, open your terminal and run:

```
npm install --global gulp gulp-cli
```

To check your gulp version run:

```
gulp --version

CLI version: 2.*.*
Local version: 4.*.*
```

## 🚀 Let's get you started quickly!

```
1. Clone this repo
git clone https://github.com/provineet/bootflow

2. cd into directory bootflow

3. Run `npm install` to install all dependencies

4. Edit gulpconfig.js/gulpfile.config.js and place your localhost url in line 10 : proxy: "wpdev.local"

4. Finally, Run `npm run serve` to start a development server

Happy Coding 👍

```

## ⚙️ Gulp Configurations

Manage your gulp configration via gulpfile.config.js file inside gulpfile.js folder.

## Important Configs

Gulpconfig.json file contains settings and variables used by the gulpfile.js. Below are a few important settings:

<table class="table">
  <thead>
    <tr>
      <th>Setting</th>
      <th>Option Type</th>
      <th>Option Value</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MODE</td>
      <td>Boolean</td>
      <td>true/false</td>
      <td>Turn Development mode on and off</td>
    </tr>
    <tr>
      <td>COMPRESSION</td>
      <td>Boolean</td>
      <td>true/false</td>
      <td>Enable/Disable assets minification while compilation.</td>
    </tr>
    <tr>
    <td>browserSyncOptions.proxy</td>
    <td>String</td>
    <td>wpdev.local</td>
    <td>Your localhost development url.</td>
    </tr>
    <tr>
    <td>JSBUILD</td>
    <td>String</td>
    <td>webpack | concat</td>
    <td>Controls how your theme's custom JavaScript files will be compiled.</td>
    </tr>
  </tbody>
</table>

There are more options that can be tweaked inside gulpconfig.json feel free to check them out.

### MODE

Manage the development or production mode of your theme.

```
{
    MODE: String ("development|production")
}
```

### COMPRESSION

Enable or disable this setting to enable compression for your CSS & JS files.

```
{
    COMPRESSION: BOOLEAN (true|false)
}
```

### JSBUILD

Controls how your theme's custom JavaScript files will be compiled.

```
{
    JUSBUILD: String ("concat|webpack")
}
```

- "webpack" lets you use ES6 modules style building with webpack. You can edit your webpack configuration using gulpfile.js/webpack.config.js file. Create all your custom modules in the modules directory found at assets_src/js/modules and use them in assets_src/js/scripts.bundle.js file. Output file name will be scripts.bundle.min.js.
- With "concat" option all your scripts inside assets_src/js/scripts directory will be concated with the assets_src/js/scripts.js file. Output file name will be scripts.js.

### browserSyncOptions

Option to proxy your localhost development URL used by BrowserSync Module.

```
{
  browserSyncOptions: {
    proxy: "wpdev.local", // your localhost development url goes here.
    notify: false,
  }
}
```

### watchFiles

This option contains the files that are watched by Gulp to refresh your browser on file change event.

```
{
  watchFiles: {
    php: true,
    scss: true,
    js: true,
    images: true,
    sprites: true,
    assetsCSS: false,
    assetsJs: false,
    assetsImg: false,
  },
}
```

### cssSprites

This option manages how your CSS Sprites will be generated. Place all your Sprite icons inside assets_src/sprite_images and a composite sprite image will be created inside assets_src/images folder and the corresponding SCSS file to use the sprite will be generated inside assets_src/scss/components folder.

```
{
  cssSprites: {
    retina: false,
    algorithm: "binary-tree",
  },
}
```

### PATHS

This option contains paths used by gulp.

```
{
  PATHS: {
    root: "/",
    assets: {
      folder: "./assets",
      css: "./assets/css",
      js: "./assets/js",
      fonts: "./assets/webfonts",
      images: "./assets/images",
    },
    src: {
      folder: "./assets_src",
      scss: "./assets_src/scss",
      js: "./assets_src/js",
      images: "./assets_src/images",
      fonts: "./assets_src/webfonts",
      sprites: "./assets_src/sprite_images",
    },
    dist: "./dist", // this folder contains your distributable theme files.
    devdist: "./dev-dist", // this folder contains your distributable theme files for further development.
    node: "./node_modules/",
  },
}
```

## Work with ES6 or Node Modules via Webpack

```
Write your node module based JS inside Scripts.modules.js file at src/js/scripts.modules.js.

You can create your custom modules inside assets_src/js/modules and they will be watched for changes automatically compiled to scripts.bindle.min.js inside assets/js folder using Webpack.

Edit your webpack configration via webpack.config.js inside gulpfile.js folder.

```

## Work with unbundled/plain JS with Babel Support

```
Create your script files or functions inside src/js/scripts folder. All the *.js files inside src/js/scripts folder will be concatenated with src/js/scripts.js file, then transpiled using babel and placed inside assets/js/scripts.js.

```

## List of available NPM Commands

<table class="table">
  <thead>
    <tr>
      <th>NPM Command</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>npm run serve</td>
      <td>To compile your SCSS, JS, Minify Images and start a development server. Watch for changes in .js, .scss, .php files.</td>
    </tr>
    <tr>
      <td>npm run build</td>
      <td>Creats a production distributable folder of your theme.</td>
    </tr>
    <tr>
      <td>npm run devbuild</td>
      <td>Creats a development distributable folder of your theme. Along with yout PHP theme files this version contains all your assets_src and gulpfile.js and other settings files.</td>
    </tr>
  </tbody>
</table>

<br>

## List of available Gulp Commands for advanced usage

<table class="table">
  <thead>
    <tr>
      <th>Gulp Command</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gulp serve</td>
      <td>To compile your SCSS, JS, Minify Images and start a development server. Watch for changes in .js, .scss, .php files.</td>
    </tr>
    <tr>
      <td>gulp build</td>
      <td>Creats a production distributable folder of your theme.</td>
    </tr>
    <tr>
      <td>gulp devbuild</td>
      <td>Creats a development distributable folder of your theme. Along with yout PHP theme files this version contains all your assets_src and gulpfile.js and other settings files.</td>
    </tr>
    <tr>
      <td>gulp minify</td>
      <td>Minify all CSS and JS files inside assets folder.</td>
    </tr>
    <tr>
      <td>gulp scss</td>
      <td>Compiles your scss files to assets/css folder.</td>
    </tr>
    <tr>
      <td>gulp scripts</td>
      <td>Compiles your JS files to assets/js folder.</td>
    </tr>
  </tbody>
</table>

<br>
