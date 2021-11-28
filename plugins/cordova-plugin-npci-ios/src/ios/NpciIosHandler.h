#import <Cordova/CDVPlugin.h>
#import "InitializeCommon.h"

@interface NpciIosHandler : CDVPlugin

+ (NpciIosHandler *)sharedInstance;

@property(nonatomic)BOOL isFirstTime;

@property (nonatomic, retain) CDVInvokedUrlCommand *callbackObj;

- (void) testMethod:(CDVInvokedUrlCommand*)command;

- (void) setDataNpci:(CDVInvokedUrlCommand*)command;

- (void) getTransactionId:(CDVInvokedUrlCommand*)command;

- (void) initializeCommonLib:(CDVInvokedUrlCommand*)command;

- (void) generateChallenge:(CDVInvokedUrlCommand*)command;

- (void) isAppRegisteredForNpci:(CDVInvokedUrlCommand*)command;

- (void) showNpciPageNative:(CDVInvokedUrlCommand*)command;

- (void) getEncryptedValueWithString:(CDVInvokedUrlCommand*)command;

@end
