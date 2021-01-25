// Our project's custom script will go here...
//
// This file is bundled by webpack, we can configure webpack.config.json for more features, if required
//
// We can import packages from npm
// example: import React { Component } from 'react';
//
// Import from our local modules folder

import bootflow from "./modules/example-module.js";

import homeSlider from "./modules/home_slider";

import timepicker from "timepicker";

(function ($) {
  bootflow.run($);
  homeSlider.run($, ".slider");
  $("#hideExample").timepicker("isVisible");
})(jQuery);
