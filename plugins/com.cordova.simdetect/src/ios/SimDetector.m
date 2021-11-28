//
//  SimDetector.m
//  SIMDetector
//
//  Created by Admin on 06/02/19.
//  Copyright © 2019 Admin. All rights reserved.
//

#import "SimDetector.h"
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <CoreTelephony/CTCarrier.h>
@implementation SimDetector

+(id)init {
    static SimDetector *sharedInstance_ = nil;
    sharedInstance_ = [[SimDetector alloc] init];
    return sharedInstance_;
}

-(BOOL)isSimAvailable:(CDVInvokedUrlCommand *)command {
    CTTelephonyNetworkInfo* info = [[CTTelephonyNetworkInfo alloc] init];
    CTCarrier* carrier = info.subscriberCellularProvider;
    NSString *isAvailable = @"";
    NSString *mobileNetworkCode = carrier.mobileNetworkCode;
    if ([mobileNetworkCode  isEqualToString: @""] || mobileNetworkCode==nil || mobileNetworkCode == NULL) {
        isAvailable = @"false";
    } else {
        isAvailable = @"true";
    }
    CDVPluginResult* pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:isAvailable];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)exitApp:(CDVInvokedUrlCommand *)command {
    exit(0);
    CDVPluginResult* pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"success"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
