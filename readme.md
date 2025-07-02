# Bootflow ⚡️  
*A modern WordPress scaffolding theme for fast, modular development.*

Bootflow is a streamlined WordPress scaffolding theme I created to simplify and accelerate custom theme development. It’s built with modern development workflows in mind—think clean structure, modular code, and CLI-driven setup. Whether you're building your next client project or a complex web app on WordPress, Bootflow gives you a solid, developer-friendly foundation to start fast and scale cleanly.


![Gulp + Webpack Frontend Boilerplate](./bootflow-bolierplate.png)

## Features

- ⚙️ **Modern Development Workflow**  
  Built with Gulp to automate SCSS compilation, JavaScript transpilation (via Babel), and live browser reloading for a seamless dev experience.

- 🎨 **SCSS Support**  
  Write modular, maintainable styles with Sass. Folder structure encourages scalability and clean code practices.

- ✨ **ES6+ JavaScript**  
  Use modern JavaScript syntax. Transpiling via Babel ensures broad browser compatibility.

- 🧹 **Linting and Code Quality**  
  Includes ESLint and SCSS-Lint (via Stylelint) to enforce best practices and maintain clean, consistent code across the project.

- 📦 **Optimized Asset Management**  
  Gulp handles both development and production environments efficiently—minifies, versions, and organizes assets.

- 📐 **WordPress Best Practices**  
  Theme structure follows WordPress standards, making it extensible and compatible with gutenberg, plugins, and future updates.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v22+)
- [NPM](https://nodejs.org/) (v10+)
- [GULP](https://gulpjs.com/) (v4+)
- [Composer](https://getcomposer.org/) (optional, for PHP dependencies)

You can install Node and NPM from [here](https://nodejs.org/en/download/).

Once Node.js and npm are installed, verify that you are using the recommended versions:

```
node --version && npm --version
```
> ✅ **Recommended**: Node.js **v14+** and npm **v6+**


To install gulp, open your terminal window and run the command:

```
npm install --global gulp gulp-cli
```

To check your gulp version run:

```
gulp --version
```
> ✅ **Recommended**: Local Version **v4+** and CLI Version **v3+**

## ⚙️ Installation

#1: Clone the repo
```
git clone https://github.com/provineet/bootflow
```

#2: cd into directory bootflow
```
cd bootflow
```

#3: Install npm dependencies

```
npm install
```

#4: Edit gulp config options to serve your WordPress site in gulp-tasks/gulp.config.js file.

Find and edit the below give code in the file.

``` 
...
browserSyncOptions: {
    // localhost url to proxy
    proxy: "PASTE YOUR WORDPRESS SITE URL HERE",
    notify: false,
  },
...
  ```

#5: Finally, Run `npm run serve` to start a development server.

Happy Coding 👍


## 📁 Folder Structure

```
bootflow/
├── assets/
│   ├── css/
│   ├── images/
│   ├── js/
│   └── vendors/
├── assets_src/
│   ├── images/
│   ├── js/
│   ├── scss/
│   ├── sprite_images/
│   └── vendors/
├── gulp-tasks/
│   ├── browserSync.js
│   ├── copyAssets.js
│   ├── createDist.js
│   ├── gulpfile.config.js
│   ├── imageMin.js
│   ├── index.js
│   ├── minify.js
│   ├── scripts.js
│   ├── scss.js
│   ├── sprites.js
│   ├── vendorAssets.js
│   ├── watch.js
│   └── webpack.config.js
├── inc/
│   ├── class-autoloader.php
│   ├── classes/
│   ├── helper-functions.php
│   └── loader.php
├── babel.config.json
├── bootflow-bolierplate.png
├── footer.php
├── functions.php
├── gulpfile.js
├── header.php
├── index.php
├── LICENSE
├── package.json
├── package-lock.json
├── phpcs.xml
├── readme.md
├── screenshot.png
└── style.css
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

> **Connect with me on X (formerly Twitter)**
> I share dev tools, coding tips, and tutorials to help fellow developers level up.  
> <br>[![Follow on X](https://img.shields.io/badge/X-@MrVineetVerma-black?logo=x)](https://twitter.com/mrvineetverma) for insights, experiments, and open-source goodness.

<br>

> 📝 **Follow my blog**  
> I write about WordPress development, performance tips, and the latest in the dev world at [BlogOhBlog.com](https://blogohblog.com) — check it out for more hands-on content.

<br>

> 💡 **Have feedback or ideas?**  
> Reach out on X or fork this repo, open a pull request, and let’s build something better together.

