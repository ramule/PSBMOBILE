// #import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import "ScreenMirrorDetectorClass.h"

@interface HandlerClass : CDVPlugin

+ (HandlerClass *)sharedInstance;

@property (nonatomic, retain) CDVInvokedUrlCommand *callbackObj;

@property(nonatomic)BOOL isFirstTime;

- (void) callAppLaunchMethod:(CDVInvokedUrlCommand*)command;

@end
