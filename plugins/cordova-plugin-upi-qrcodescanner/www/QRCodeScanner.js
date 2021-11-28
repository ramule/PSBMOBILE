var exec = require('cordova/exec');
module.exports = {
  
    scan: function(arg0, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'PSBUPIAndroidQRCode', 'scan', [arg0]);
    },
};