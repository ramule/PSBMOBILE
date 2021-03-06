// cordova.define("cordova-plugin-customurlscheme.LaunchMyApp", function(require, exports, module) {
  (function () {
    "use strict";

  var remainingAttempts = 10;

  function waitForAndCallHandlerFunction(url) {
    if (typeof window.handleOpenURL === "function") {
      // Clear the intent when we have a handler (note that this is only done when the preference 'CustomURLSchemePluginClearsAndroidIntent' is 'true' in config.xml
      cordova.exec(
          null,
          null,
          "LaunchMyApp",
          "clearIntent",
          []);

      window.handleOpenURL(url);
    } else if (remainingAttempts-- > 0) {
      setTimeout(function(){waitForAndCallHandlerFunction(url);}, 500);
    }
  }

  function triggerOpenURL() {
    cordova.exec(
        waitForAndCallHandlerFunction,
        null,
        "LaunchMyApp",
        "checkIntent",
        []);
  }

  document.addEventListener("deviceready", triggerOpenURL, false);

  var launchmyapp = {
    getLastIntent: function(success, failure) {
      cordova.exec(
        success,
        failure,
        "LaunchMyApp",
        "getLastIntent",
        []);
    },
    setIntent: function(paramObj,success, failure) {
      cordova.exec(
        success,
        failure,
        "LaunchMyApp",
        "setIntent",
        [paramObj]);
    },
    setIntentEnabled: function(paramObj,success, failure) {
      cordova.exec(
        success,
        failure,
        "LaunchMyApp",
        "setIntentEnabled",
        [paramObj]);
    }
  }

  module.exports = launchmyapp;

}());

// });
