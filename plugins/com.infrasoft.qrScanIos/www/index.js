module.exports = {
    startCamera: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, 'qrScanIos', 'startCamera', []);
        // cordova.exec(successCallback, errorCallback, 'BarcodeReader', 'startCamera', []);
    }
};