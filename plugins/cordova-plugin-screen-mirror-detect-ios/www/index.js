var iosHandler = function() {};
var exec = require('cordova/exec');

iosHandler.prototype.callAppLaunchMethod = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "HandlerClass", "callAppLaunchMethod", []);
}

var ioshandler = new iosHandler();
module.exports = ioshandler;