#import "HandlerClass.h"
#import "ScreenMirrorDetectorClass.h"
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@implementation HandlerClass

// Create shared instance
+ (HandlerClass *)sharedInstance
{
    static HandlerClass *sharedInstance_ = nil;
    sharedInstance_ = [[HandlerClass alloc] init];
    [sharedInstance_ setIsFirstTime:true];
    return sharedInstance_;
}

- (void) callAppLaunchMethod:(CDVInvokedUrlCommand*)command {
    NSLog(@"SCREEN_DETECTION_IOS => HandlerClass => callAppLaunchMethod");
    CDVPluginResult* result;
    result = [[ScreenMirrorDetectorClass sharedInstance] appLaunchEvent:command];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    NSLog(@"SCREEN_DETECTION_IOS => Handler result => %@", result);
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
