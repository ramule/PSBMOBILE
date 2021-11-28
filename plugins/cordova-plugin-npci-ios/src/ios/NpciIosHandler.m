#import "NpciIosHandler.h"
#import "InitializeCommon.h"
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@implementation NpciIosHandler

// Create shared instance
+ (NpciIosHandler *)sharedInstance
{
    static NpciIosHandler *sharedInstance_ = nil;
    sharedInstance_ = [[NpciIosHandler alloc] init];
    [sharedInstance_ setIsFirstTime:true];
    return sharedInstance_;
}

- (void) testMethod:(CDVInvokedUrlCommand*)command
{
    BOOL arg = YES;
    
    CDVPluginResult* result;
 
    if (arg)
    {
        // Success Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Hello Worldd!"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
    else
    {
        // Error Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void) setDataNpci:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => setDataNpci");
    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *devId = dict[@"devId"];
    NSString *moNo = dict[@"moNo"];
    NSString *localid = dict[@"id"];
    NSString *localurl = dict[@"url"];
    NSString *entity = dict[@"entity"];
    NSString *tokenValue = dict[@"tokenValue"];
    NSString *expiry = dict[@"expiry"];
    
    CDVPluginResult* result;
    
    result = [[InitializeCommon sharedInstance] setDataNPCI:command mobileNo:moNo appId:localid deviceId:devId typeV:@"" entityID:entity refURL:localurl token:tokenValue];

    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

    NSLog(@"NPCI_IOS => result => %@", result);
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];

    // CDVPluginResult* result1;
    // result1 = [sharedInstance generateChallenge:command deviceId:devId AppID:localid];
 
    // [self.commandDelegate sendPluginResult:result1 callbackId:command.callbackId];
}

- (void) getTransactionId:(CDVInvokedUrlCommand*)command {
     NSLog(@"NPCI_IOS => NpciIosHandler => getTransactionId");
    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *txnIdIdent = dict[@"txnIdIdent"];
    NSLog(@"NPCI_IOS => txnIdIdent => %@", txnIdIdent);
    CDVPluginResult* result;
    
    result = [[InitializeCommon sharedInstance] getTxnId: command txnIdIdent:txnIdIdent];
    NSLog(@"NPCI_IOS => getTxnId result => %@", result);
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) initializeCommonLib:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => initializeCommonLib");
    CDVPluginResult* result;
    
    result = [[InitializeCommon sharedInstance] initializeCommonLib:command];

    NSLog(@"NPCI_IOS => Handler result => %@", result);
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) generateChallenge:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => generateChallenge");
    CDVPluginResult* result;

    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *deviceId = dict[@"deviceId"];
    NSString *AppID = dict[@"appId"];
    
    result = [[InitializeCommon sharedInstance] generateChallenge:command deviceId:deviceId AppID:AppID];

    NSLog(@"NPCI_IOS => Handler result => %@", result);
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) isAppRegisteredForNpci:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => isAppRegisteredForNpci");
    CDVPluginResult* result;

    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *mobileNumber = dict[@"mobileNumber"];
    NSString *deviceId = dict[@"deviceId"];
    NSString *appID = dict[@"appId"];
    NSString *tokenValue = dict[@"tokenValue"];
    NSString *tokenExpiry = dict[@"tokenExpiry"];
    
    result = [[InitializeCommon sharedInstance] registeredAppForNPCI:command mobileNumber:mobileNumber deviceId:deviceId appID:appID tokenValue:tokenValue tokenExpiry:tokenExpiry];

    NSLog(@"NPCI_IOS => Handler result => %@", result);
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}


- (void) showNpciPageNative:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => showNpciPageNative");
    
    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *credLength = dict[@"credLength"];
    NSString *otpCredLength = dict[@"otpCredLength"];
    NSString *atmCredLength = dict[@"atmCredLength"];
    NSString *txnId = dict[@"txnId"];
    NSString *tokenValue = dict[@"tokenValue"];
    NSString *xmlPayloadValue = dict[@"xmlPayloadValue"];
    NSString *bankName = dict[@"bankName"];
    NSString *note = dict[@"note"];
    NSString *txnAmount = dict[@"txnAmount"];
    NSString *payerAddr = dict[@"payerAddress"];
    NSString *payeeDetails = dict[@"payeeDetails"];
    NSString *payeeName = dict[@"payeeName"];
    NSString *atmPIN = dict[@"isAtmPINRequired"];
    NSString *devId = dict[@"devId"];
    NSString *moNo = dict[@"moNo"];
    NSString *appId = dict[@"id"];
    NSString *localurl = dict[@"url"];
    NSString *entity = dict[@"entity"];
    NSString *expiry = dict[@"expiry"];
    NSString *type = @"Initial";
    
    [[InitializeCommon sharedInstance] showNPCIPageNative:command credLen:credLength otpCredLength:otpCredLength atmCredLength:atmCredLength taxnID:txnId token:tokenValue xmlPayload:xmlPayloadValue bankN:bankName noteV:note taxnAmount:txnAmount payerAddress:payerAddr payeeDetails:payeeDetails payeeN:payeeName isATMPINRequired:atmPIN mobileNo:moNo appId:appId deviceId:devId typeV:type entityID:entity refURL:localurl tokenExpiry:expiry andCallback:^(NSString* resultString){
        CDVPluginResult* result;
        result = [CDVPluginResult
                 resultWithStatus: CDVCommandStatus_OK
                 messageAsString: resultString
                 ];
        NSLog(@"NPCI_IOS => Handler result => %@", result);
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }];
}

- (void) getEncryptedValueWithString:(CDVInvokedUrlCommand*)command {
    NSLog(@"NPCI_IOS => NpciIosHandler => getEncryptedValueWithString");

    CDVPluginResult* result;

    NSDictionary *dict = [command argumentAtIndex:0];
    NSString *strPlainText = dict[@"plainValue"];
    NSString *andCertData = dict[@"certificateString"];
    
    result = [[InitializeCommon sharedInstance] getEncryptedValueWithString:command strPlainText:strPlainText andCertData:andCertData];

    NSLog(@"NPCI_IOS => Handler result => %@", result);
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
