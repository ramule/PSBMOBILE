var exec = require('cordova/exec');
module.exports = {
    //Methods called from NpciAndroidPlugin.java
    setNPCIWrapperVariables: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'setNPCIWrapperVariables', [paramObj]);
    },
    startWrapperCLLibrary: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'startWrapperCLLibrary', [paramObj]);
    },
    generateTransactionId: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'generateTransactionId', [paramObj]);
    },
    //Methods called from NPCIHandler.java
    setNPCIVariables: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'setNPCIVariables', [paramObj]);
    },
    startCLService: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'startCLService', [paramObj]);
    },
    setOtpCredValues: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'setOtpCredValues', [paramObj]);
    },
    setBankNameCredXML: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'setBankNameCredXML', [paramObj]);
    },
    initiateSetUpiPin: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'initiateSetUpiPin', [paramObj]);
    },
    initiateBalanceEnquiry: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'initiateBalanceEnquiry', [paramObj]);
    },
    initiateSendMoney: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'initiateSendMoney', [paramObj]);
    },
    initiateChangeUpiPin: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'initiateChangeUpiPin', [paramObj]);
    },
    initiateCollectRequestAccept: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'initiateCollectRequestAccept', [paramObj]);
    },
    // Methods called from EncryptCert.java
    getEncryptedValueFromCert: function(paramObj, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'getEncryptedValueFromCert', [paramObj]);
    },

    // getNPCIHandlerInstance: function(successCallback, errorCallback) {
    //     exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'getNPCIHandlerInstance', []);
    // },
    // coolMethod: function(arg0, successCallback, errorCallback) {
    //     exec(successCallback, errorCallback, 'NpciAndroidPlugin', 'coolMethod', [arg0]);
    // },
};