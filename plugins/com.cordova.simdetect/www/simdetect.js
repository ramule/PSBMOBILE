// cordova.define("com.cordova.simdetect.simdetect", function(require, exports, module) {
    var exec = require('cordova/exec');

    exports.getSharedPreferences = function(success, error) {
        exec(success, error, 'simdetect', 'getSharedPreferences', []);
    };

    exports.setSharePreferences = function(prefObj, success, error) {
        exec(success, error, 'simdetect', 'setSharePreferences', [prefObj]);
    };

    exports.checkSimStatusAndroid = function(deviceSimObject, success, error) {
        exec(success, error, 'simdetect', 'checkSimStatus', [deviceSimObject]);
    };


    exports.registerSimChange = function(success, error) {
        exec(success, error, 'simdetect', 'registerSimChange', []);
    };
    
    exports.isSimAvailableAndroid = function(success, error) {
        exec(success, error, 'simdetect', 'isSimAvailable', []);
    }

    exports.isSimAvailableIos = function(success, error) {
        exec(success, error, 'SimDetector', 'isSimAvailable', []);
    }

    // exports.exitApp = function(success, error) {
    //     exec(success, error, 'SimDetector', 'exitApp', []);
    // }
// });
