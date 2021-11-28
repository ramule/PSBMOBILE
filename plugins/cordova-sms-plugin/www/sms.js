'use strict';

var exec = require('cordova/exec');

var sms = {};

function convertPhoneToArray(phone) {
    if (typeof phone === 'string' && phone.indexOf(',') !== -1) {
        phone = phone.split(',');
    }
    if (Object.prototype.toString.call(phone) !== '[object Array]') {
        phone = [phone];
    }
    return phone;
}

// Changed For Send sms from selected sim Author Vaibhav Khot
// Used for all Send SMS scenarios on Android
// Used only for sim binding on iOS, where the SMS Composer needs to be dismissed after 5 seconds (OC-100 implementation)
sms.send = function(phone, message, subscriptionId, options, success, failure) {
    // parsing phone numbers
    phone = convertPhoneToArray(phone);

    // parsing options
    var replaceLineBreaks = false;
    var androidIntent = '';
    if (typeof options === 'string') { // ensuring backward compatibility
        window.console.warn('[DEPRECATED] Passing a string as a third argument is deprecated. Please refer to the documentation to pass the right parameter: https://github.com/cordova-sms/cordova-sms-plugin.');
        androidIntent = options;
    } else if (typeof options === 'object') {
        replaceLineBreaks = options.replaceLineBreaks || false;
        if (options.android && typeof options.android === 'object') {
            androidIntent = options.android.intent;
        }
    }

    // fire
    exec(
        success,
        failure,
        'Sms',
        'send', [phone, message, subscriptionId, androidIntent, replaceLineBreaks]
    );
};

//Used for all scenarios other than Sim Binding on iOS
sms.sendOtherSms = function(phone, message, subscriptionId, options, success, failure) {
    // parsing phone numbers
    phone = convertPhoneToArray(phone);

    // parsing options
    var replaceLineBreaks = false;

    if (typeof options === 'string') { // ensuring backward compatibility
        window.console.warn('[DEPRECATED] Passing a string as a third argument is deprecated. Please refer to the documentation to pass the right parameter: https://github.com/cordova-sms/cordova-sms-plugin.');
    } else if (typeof options === 'object') {
        replaceLineBreaks = options.replaceLineBreaks || false;
    }

    // fire
    exec(
        success,
        failure,
        'Sms',
        'sendOtherSms', [phone, message, subscriptionId, replaceLineBreaks]
    );
};

sms.hasPermission = function(success, failure) {
    // fire
    exec(
        success,
        failure,
        'Sms',
        'has_permission', []
    );
};

sms.requestPermission = function(success, failure) {
    // fire
    exec(
        success,
        failure,
        'Sms',
        'request_permission', []
    );
};

//Used to check if eSim exists on iPhone
sms.checkForEsim = function(success, failure) {
    exec(
        success,
        failure,
        'Sms',
        'checkForEsim', []
    );
};

module.exports = sms;