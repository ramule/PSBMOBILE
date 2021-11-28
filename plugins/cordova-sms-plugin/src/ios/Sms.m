#import "Sms.h"
#import "MFMessageComposeViewController+EditDisabled.h"
#import <CoreTelephony/CTTelephonyNetworkInfo.h>
#import <CoreTelephony/CTCarrier.h>
#import <CoreTelephony/CTCallCenter.h>
#import <CoreTelephony/CTCall.h>

@implementation Sms
@synthesize callbackID;

- (void)send:(CDVInvokedUrlCommand*)command {
    NSLog(@"SMS_IOS => Inside send...");
    [self.commandDelegate runInBackground:^{
        self.callbackID = command.callbackId;
        
        if(![MFMessageComposeViewController canSendText]) {
            NSString *errorMessage = @"SMS Text not available.";
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Notice"
                                                            message:errorMessage
                                                           delegate:self
                                                  cancelButtonTitle:@"OK"
                                                  otherButtonTitles:nil
                                  ];

            dispatch_async(dispatch_get_main_queue(), ^{
                [alert show];
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                  messageAsString:errorMessage];
                
                NSLog(@"SMS_IOS => 1 %@", pluginResult);

                [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
            });
            return;
        }
        
        MFMessageComposeViewController *composeViewController = [[MFMessageComposeViewController alloc] init];
        composeViewController.messageComposeDelegate = self;
        
        NSString* body = [command.arguments objectAtIndex:1];
        if (body != nil) {
            BOOL replaceLineBreaks = [[command.arguments objectAtIndex:3] boolValue];
            if (replaceLineBreaks) {
                body = [body stringByReplacingOccurrencesOfString: @"\\n" withString: @"\n"];
            }
            [composeViewController setBody:body];
        }
        
        NSMutableArray* recipients = [command.arguments objectAtIndex:0];
        if (recipients != nil) {
            if ([recipients.firstObject isEqual: @""]) {
                [recipients replaceObjectAtIndex:0 withObject:@"?"];
            }
            
            [composeViewController setRecipients:recipients];
        }
        [composeViewController _setCanEditRecipients: NO];
        [composeViewController _setShouldDisableEntryField: YES]; // Rutuja Phadke
        //TODO: need to modify later
        // will work after whitelist of bundel Id
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"SMS_IOS => Presenting compose view...");
            [self.viewController presentViewController:composeViewController animated:YES completion:nil];
        });
        // Code to dismiss SMS Composer after 5 seconds (OC-100 Implementation)
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
            NSLog(@"SMS_IOS => Dismissing compose view...");
            [self.viewController dismissViewControllerAnimated:YES completion:^{
                
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK  messageAsString:@"Dismissed"];

                [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
                
            }];
        });
    }];
}

- (void)sendOtherSms:(CDVInvokedUrlCommand*)command {
    NSLog(@"SMS_IOS => Inside sendOtherSms...");
    [self.commandDelegate runInBackground:^{
        self.callbackID = command.callbackId;
        
        if(![MFMessageComposeViewController canSendText]) {
            NSString *errorMessage = @"SMS Text not available.";
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Notice"
                                                            message:errorMessage
                                                           delegate:self
                                                  cancelButtonTitle:@"OK"
                                                  otherButtonTitles:nil
                                  ];
            
            dispatch_async(dispatch_get_main_queue(), ^{
                [alert show];
                CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                                  messageAsString:errorMessage];
                
                NSLog(@"SMS_IOS => 1 %@", pluginResult);

                [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
            });
            return;
        }
        
        MFMessageComposeViewController *composeViewController = [[MFMessageComposeViewController alloc] init];
        composeViewController.messageComposeDelegate = self;
        
        NSString* body = [command.arguments objectAtIndex:1];
        if (body != nil) {
            BOOL replaceLineBreaks = [[command.arguments objectAtIndex:3] boolValue];
            if (replaceLineBreaks) {
                body = [body stringByReplacingOccurrencesOfString: @"\\n" withString: @"\n"];
            }
            [composeViewController setBody:body];
        }
        
        NSMutableArray* recipients = [command.arguments objectAtIndex:0];
        if (recipients != nil) {
            if ([recipients.firstObject isEqual: @""]) {
                [recipients replaceObjectAtIndex:0 withObject:@"?"];
            }
            
            [composeViewController setRecipients:recipients];
        }
        [composeViewController _setCanEditRecipients: NO];
        [composeViewController _setShouldDisableEntryField: YES]; // Rutuja Phadke
        //TODO: need to modify later
        // will work after whitelist of bundel Id
        dispatch_async(dispatch_get_main_queue(), ^{
            NSLog(@"SMS_IOS => Presenting compose view...");
            [self.viewController presentViewController:composeViewController animated:YES completion:nil];
        });
        
        // dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        //     NSLog(@"SMS_IOS => Dismissing compose view...");
        //     [self.viewController dismissViewControllerAnimated:YES completion:^{
                
        //         CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK  messageAsString:@"Dismissed"];

        //         [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
                
        //     }];
        // });
    }];
}

#pragma mark - MFMessageComposeViewControllerDelegate Implementation
// Dismisses the composition interface when users tap Cancel or Send. Proceeds to update the message field with the result of the operation.
- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result {
    // Notifies users about errors associated with the interface
    int webviewResult = 0;
    NSString* message = @"";
    
    switch(result) {
        case MessageComposeResultCancelled:
            webviewResult = 0;
            message = @"Message cancelled.";
            break;
        case MessageComposeResultSent:
            webviewResult = 1;
            message = @"Message sent.";
            break;
        case MessageComposeResultFailed:
            webviewResult = 2;
            message = @"Message failed.";
            break;
        default:
            webviewResult = 3;
            message = @"Unknown error.";
            break;
    }
    
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
    
    if(webviewResult == 1) {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                                          messageAsString:message];
        NSLog(@"SMS_IOS => 2 %@", pluginResult);
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    } else {
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                          messageAsString:message];
        NSLog(@"SMS_IOS => 3 %@", pluginResult);
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
}

- (void) checkForEsim :(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult;
    CTTelephonyNetworkInfo *networkStatus = [[CTTelephonyNetworkInfo alloc] init];

    NSLog(@"SMS_IOS => Inside checkForEsim...");

    if (@available(iOS 12.0, *)) {
        NSDictionary<NSString *, CTCarrier *>  *providers  = networkStatus.serviceSubscriberCellularProviders;
        int providersCount = 0;
        NSLog(@"Providers = %@", providers);
   
        for (id key in providers) {
            if ([providers objectForKey:key].mobileNetworkCode != nil){
                providersCount += 1;
            }
        }
        
        if (providersCount > 1) {
            // return true;
            NSLog(@"SMS_IOS => eSim found...");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK  messageAsBool:true];
            
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }   else    {
            // return false;
            NSLog(@"SMS_IOS => 1 eSim not found...");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK  messageAsBool:false];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    } else {
        // return false;
        NSLog(@"SMS_IOS => 2 eSim not found...");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK  messageAsBool:false];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
}


@end
