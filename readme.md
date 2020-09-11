# Bootflow; A Modern Frontend Development Starter Kit With Faster Build Speeds

Hi, I'm Bootflow. I am a frontend starter kit to get you started with your next awesome project in no time. I orchestrate modern tools like gulp, webpack, SCSS, ES2016+ support via Babel, CSS Sprites generation, Image optimization, assets minification and more.

![Gulp + Webpack Frontend Boilerplate](./bootflow-bolierplate.png)

## My Dependencies?

Yeah! to start working I would require [nodejs](https://nodejs.org/en/) with [npm](https://www.npmjs.com/get-npm) and a global installation of [gulp 4.x](http://gulpjs.com/) on your development machine.

```
# Install gulp globally
npm install -g gulp

# Make sure you have correct Gulp version
gulp --version
```

## Let's get you started quickly!

```
1. Clone this repo
git clone https://github.com/vineet05/bootflow

2. cd into directory bootflow

3. run `npm install` to install all dependencies

4. Run `npm run serve` and I will start a development server and watch your assets for changes.

Happy Hacking :)

```

## Development & Production Builds

```
Use DEV_MODE in gulpconfig.json to switch between development & production mode.
True sets the DEV_MODE to development, false sets it to production.

Run: npm run build
It creates a dist folder to distribute your production application.

Run: npm run dist
It creates a dev-dist folder to redistribute your project with all development files.

```

## For Advanced Configuration

```
=> Gulpconfig.json holds the configuration object for your gulp.

=> webpack.config.json holds the webpack config for your project.

```

## Working with Node Modules & Webpack

```
Write your node module based JS inside Scripts.modules.js file found at src/js/scripts.modules.js.

You can create your custom modules inside src/js/modules and they will be watched for changes automatically compiled to scripts.bindle.min.js inside assets/js folder using Webpack.

```

## Working with Plain JS with Babel Support

```
Create your script files or functions inside src/js/scripts folder. All the *.js files inside src/js/scripts folder will be concatenated with src/js/scripts.js file, then transpiled using babel and placed inside assets/js/scripts.js.

```

## List of available Gulp Commands for advanced usage

<table class="table">
  <thead>
    <tr>
      <th colspan="3">Gulp Command</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gulp copy-assets</td>
      <td>Copies vendors assets like Bootstrap, FontAwesome and jQuery from node_modules folder inside src folder.</td>
    </tr>
    <tr>
      <td>gulp scss</td>
      <td>Compies style.scss file found at src/scss/style.scss </td>
    </tr>
    <tr>
      <td>gulp vendorsscss</td>
      <td>Compiles vendors.scss file found at src/scss/vendors.scss</td>
    </tr>
    <tr>
      <td>gulp minifycss</td>
      <td>Minifies all the CSS file found inside assets/css folder.</td>
    </tr>
    <tr>
      <td>gulp scripts</td>
      <td>Concatenates and transpile all the .js files within src/js/scripts folder and src/js/scripts.js</td>
    </tr>
    <tr>
      <td>gulp scriptsBundle</td>
      <td>Compiles script.modules.js file using webpack and place it inside assets/js/scripts.bundle.min.js</td>
    </tr>
    <tr>
      <td>gulp vendorjs</td>
      <td>Creates a concatenated vendors.js file for production mode i.e. if MODE_DEV is false.</td>
    </tr>
    <tr>
      <td>gulp minifyjs</td>
      <td>Minifies JS files within ./assets/js folder</td>
    </tr>
    <tr>
      <td>gulp imagemin</td>
      <td>Runs image optimizing task on images found at src/images and place them inside assets/images</td>
    </tr>
    <tr>
      <td>gulp sprite</td>
      <td>Creates CSS Sprite Image & SCSS file using images inside src/sprite_images. SCSS will be generated and placed inside src/scss/componenets. Browse the gulp package <a href="https://www.npmjs.com/package/gulp.spritesmith">Gulp.Spritesmith</a> for more options.</td>
    </tr>
    <tr>
      <td>gulp watch-assets</td>
      <td>Start watching the SCSS, JS, Images file for changes and relaod the browserSync.</td>
    </tr>
    <tr>
      <td>gulp serve</td>
      <td>Serves the application and watching for changes in scss, js, images inside src folder</td>
    </tr>
      <td>gulp build</td>
      <td>Copies the files to the /dist folder for the distribution of your end product</td>
    </tr>
      <td>gulp devdist</td>
      <td>Copies the files to the /dev-dist folder for distribution of development bundle of the product</td>
    </tr>
  </tbody>
</table>

## GulpConfig.json File

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
      <td>DEV_MODE</td>
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
    <td>BROWSER_ENV</td>
    <td>String</td>
    <td>"Static" or "Server"</td>
    <td>Static for HTML development; Server if you are running a local development server.</td>
    </tr>
    <tr>
    <td>browserSyncOptions</td>
    <td>Object</td>
    <td>Static or Server Object</td>
    <td>Change Proxy value if you're using local server to serve your application.</td>
    </tr>
    <tr>
    <td>watchFiles</td>
    <td>Object</td>
    <td>{...}</td>
    <td>Select the type of files watched by gulp.</td>
    </tr>
  </tbody>
</table>

There are more options that can be tweaked inside gulpconfig.json feel free to check them out.
