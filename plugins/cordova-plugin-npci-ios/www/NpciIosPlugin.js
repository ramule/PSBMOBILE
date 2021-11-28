var iosHandler = function() {};
var exec = require('cordova/exec');

iosHandler.prototype.getTxnId = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "testMethod", []);
}

iosHandler.prototype.setDataNpci = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "setDataNpci", [paramObj]);
}

iosHandler.prototype.getTransactionId = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "getTransactionId", [paramObj]);
}

iosHandler.prototype.initializeCommonLib = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "initializeCommonLib", []);
}

iosHandler.prototype.generateChallenge = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "generateChallenge", [paramObj]);
}

iosHandler.prototype.isAppRegisteredForNpci = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "isAppRegisteredForNpci", [paramObj]);
}

iosHandler.prototype.showNpciPageNative = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "showNpciPageNative", [paramObj]);
}

iosHandler.prototype.getEncryptedValueWithString = function(paramObj, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NpciIosHandler", "getEncryptedValueWithString", [paramObj]);
}

var ioshandler = new iosHandler();
module.exports = ioshandler;