#import "ScreenMirrorDetectorClass.h"
#import "HandlerClass.h"
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDV.h>

@implementation ScreenMirrorDetectorClass

@synthesize isFirstTime;

+ (ScreenMirrorDetectorClass *)sharedInstance
{
    static ScreenMirrorDetectorClass *sharedInstance_ = nil;
    sharedInstance_ = [[ScreenMirrorDetectorClass alloc] init];
    [sharedInstance_ setIsFirstTime:true];
    return sharedInstance_;
}

- (CDVPluginResult *) appLaunchEvent:(CDVInvokedUrlCommand *)command {
    NSLog(@"SCREEN_DETECTION_IOS => ScreenMirrorDetectorClass => appLaunchEvent");
    CDVPluginResult* pluginResult;
    if (@available(iOS 11.0, *)) {
        [[NSNotificationCenter defaultCenter] addObserver:self
        selector:@selector(handleScreenCaptureChange)name:UIScreenCapturedDidChangeNotification object:nil];
       [self handleScreenCaptureChange];
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"appLaunchEvent Success"]];
    }
    
    NSLog(@"SCREEN_DETECTION_IOS => ScreenMirrorDetectorClass => pluginResult => %@", pluginResult);
    
    return pluginResult;
}

 - (void) handleScreenCaptureChange {
    NSLog(@"SCREEN_DETECTION_IOS => ScreenMirrorDetectorClass => handleScreenCaptureChange");
    if (@available(iOS 11.0, *)) {
        BOOL isCaptured = [[UIScreen mainScreen] isCaptured];
        NSLog(@"SCREEN_DETECTION_IOS => isCaptured =");
        NSLog(isCaptured ? @"true" : @"false");
        if (isCaptured) {
            NSLog(@"SCREEN_DETECTION_IOS => Inside IF");
            UIView *blackView = [[UIView alloc]initWithFrame:[[[UIApplication sharedApplication] delegate] window].frame];

            blackView.backgroundColor = [UIColor blackColor];

            blackView.tag= 1234;

            blackView.alpha = 1 ;

            [[[[UIApplication sharedApplication] delegate] window]makeKeyAndVisible];

            [[[[UIApplication sharedApplication] delegate] window].rootViewController.view addSubview:blackView];
        } else {
            NSLog(@"SCREEN_DETECTION_IOS => Inside ELSE");
            UIView *blackView = [[[[UIApplication sharedApplication] delegate] window]viewWithTag:1234];
            if (blackView) {
                blackView.alpha = 0;
                [blackView removeFromSuperview];
            }
        }
    }
}

@end
