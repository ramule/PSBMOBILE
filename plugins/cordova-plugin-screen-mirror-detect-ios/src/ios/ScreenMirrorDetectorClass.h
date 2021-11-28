#import <Cordova/CDV.h>
// #import <Cordova/CDVPlugin.h>

@interface ScreenMirrorDetectorClass : CDVPlugin

+ (ScreenMirrorDetectorClass *)sharedInstance;

@property(nonatomic)BOOL isFirstTime;

- (CDVPluginResult *)appLaunchEvent:(CDVInvokedUrlCommand *)command;

- (void) handleScreenCaptureChange;

@end
