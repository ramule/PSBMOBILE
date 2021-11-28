#import "InitializeCommon.h"
#import "NpciIosHandler.h"
#import <CommonLibrary/CommonLibrary.h>
#include <CommonCrypto/CommonDigest.h>
#import "Encrypt.h"
#import "NSData+Base64.h"
#import "EncryptionWithAES128.h"
#import "Constants.h"
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDV.h>

// @class AppManager;

@implementation InitializeCommon
@synthesize keyXmlPayload;
@synthesize isRegistrationWithLibCompleted;
@synthesize isFirstTime;
@synthesize mobileNumber;
@synthesize device_id,App_Id,challange,token,txnId,refId,entityId,mobileNo,refUrl,credDataDict;
//Objective-C:
//#define NSLog(...) /* suppress NSLog */

// Create shared instance
+ (InitializeCommon *)sharedInstance
{
    static InitializeCommon *sharedInstance_ = nil;
    sharedInstance_ = [[InitializeCommon alloc] init];
    [sharedInstance_ setIsFirstTime:true];
    return sharedInstance_;
}

- (CDVPluginResult *)setDataNPCI:(CDVInvokedUrlCommand *)command mobileNo:(NSString *)mobileNumber appId:(NSString *)App_Id deviceId:(NSString *)device_id typeV:(NSString *)type entityID:(NSString *)entityId refURL:(NSString *)refUrl token:(NSString *)tokenValue
{
    NSLog(@"NPCI_IOS => InitializeCommon => setDataNPCI");
    self.mobileNumber = mobileNumber;
    self.mobileNo = mobileNumber;
    self.App_Id = App_Id;
    self.device_id = device_id;
    self.entityId = entityId;
    self.refUrl = refUrl;
    self.token = tokenValue;
    // Decode Token
    NSLog(@"NPCI_IOS => Mobile = %@,AppID = %@, DeviceID = %@,entityId = %@, RefURL = %@ , Token %@",mobileNumber,App_Id,device_id,entityId,refUrl,tokenValue);
    if (self.token.length>0) {
        NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:self.token options:0];
        self.token = [[NSString alloc] initWithData:decodedData encoding:NSUTF8StringEncoding];
    }
    BOOL arg = YES;
    
    CDVPluginResult* result;
 
    if (arg) {
        // Success Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[NSString stringWithFormat:@"Mobile =%@,AppID = %@, DeviceID = %@,entityId = %@, RefURL = %@ , Token %@",mobileNumber,App_Id,device_id,entityId,refUrl,tokenValue]];
        // result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Hello World!"];
        return result;
        // [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    } else {
        // Error Callback
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        return result;
        // [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
        // Success Callback
}

- (CDVPluginResult *)initializeCommonLib:(CDVInvokedUrlCommand *)command {
    NSString *resultFlag;
    BOOL isRegistered = [[NSUserDefaults standardUserDefaults]boolForKey:@"isRegistrationWithLibCompleted"];
    NSLog(@"NPCI_IOS => isRegistered => %@", isRegistered);
    if (isRegistered) {
        resultFlag = @"true";
    } else {
        resultFlag = @"false";
    }
    CDVPluginResult* pluginResult;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultFlag];
    return pluginResult;
}

-(CDVPluginResult *)generateChallenge:(CDVInvokedUrlCommand *)command deviceId:(NSString *)device_id AppID:(NSString *)App_Id {
    NSLog(@"NPCI_IOS => InitializeCommon => generateChallenge");
    NSString *challange_local;
    NSError *error = nil;
    CDVPluginResult* pluginResult = nil;
    self.device_id = device_id;
    @try {
        BOOL success = [CLServices getChallengeForDeviceId:self.device_id appId:App_Id type:@"Initial" challenge:&challange_local error:&error];
        NSLog(@"NPCI_IOS => %d",success);
    }
    @catch (NSException * e) {
        NSLog(@"NPCI_IOS => Exception: %@", e);
    }
    @finally {
        NSLog(@"NPCI_IOS => finally");
    }
    
    NSLog(@"NPCI_IOS => challange= %@",challange_local);
    challange = challange_local;
    
    if (challange.length > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:challange];
        return pluginResult;
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"error genrating challenge"];
        return pluginResult;
    }
}

-(CDVPluginResult *)registeredAppForNPCI:(CDVInvokedUrlCommand *)command mobileNumber:(NSString *)mobileNumber deviceId:(NSString *)deviceId appID:(NSString *)appId tokenValue:(NSString *)tokenValue tokenExpiry:(NSString *)tokenExpiry {
    CDVPluginResult* pluginResult = nil;
    BOOL isRegistered = [[NSUserDefaults standardUserDefaults]boolForKey:@"isRegistrationWithLibCompleted"];
    NSLog(@"NPCI_IOS => isRegistered => %@", isRegistered);
    self.mobileNumber = mobileNumber;
    self.device_id = deviceId;
    self.App_Id = appId;
    self.token = tokenValue;

    NSLog(@"NPCI_IOS => mobileNumber => %@", self.mobileNumber);
    NSLog(@"NPCI_IOS => device_id => %@", self.device_id);
    NSLog(@"NPCI_IOS => App_Id => %@", self.App_Id);

    if (isRegistered) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"registered"];
        NSLog(@"NPCI_IOS => pluginResult => %@", pluginResult);
        return pluginResult;
    } else {
        NSError *error = nil;
        NSString *concatenate = [self hmacApp_id:self.App_Id mobile:self.mobileNumber device:self.device_id];
        NSLog(@"NPCI_IOS => concatenate string -> %@",concatenate);
        // NSLog(@"NPCI_IOS => [[Encrypt alloc] sha256:token length:32]   %@",[[Encrypt alloc] sha256:token length:32]);
        
        BOOL success = [CLServices registerAppWithHmac:concatenate appID:self.App_Id mobile:self.mobileNumber deviceID:self.device_id error:&error];
        if (success) {
            [[NSUserDefaults standardUserDefaults]setBool:true forKey:@"isRegistrationWithLibCompleted"];
            [[NSUserDefaults standardUserDefaults]synchronize];
        }
        
        NSLog(@"NPCI_IOS => error in registration %@ %d",error.description,success);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"registered"];

        NSLog(@"NPCI_IOS => pluginResult => %@", pluginResult);

        return pluginResult;
    }
}

- (void)showNPCIPageNative:(CDVInvokedUrlCommand *)command credLen:(NSString*)credLength otpCredLength:(NSString *)otpCredLength atmCredLength:(NSString *)atmCredLength taxnID:(NSString *)txtId token:(NSString *)tokenValue xmlPayload:(NSString *)xmlPayloadValue bankN:(NSString*)bankName noteV:(NSString *)note taxnAmount:(NSString *)txnAmount payerAddress:(NSString *)payerAddr payeeDetails:(NSString *)payeeDetails payeeN:(NSString *)payeeName isATMPINRequired:(NSString *)atmPIN mobileNo:(NSString *)mobileNumber appId:(NSString *)App_Id deviceId:(NSString *)device_id typeV:(NSString *)type entityID:(NSString *)entityId refURL:(NSString *)refUrl tokenExpiry:(NSString *)tokenExpiry andCallback:(void (^)(NSString *))callback {
    
    self.refId = txtId;
    self.txnId = txtId;
    NSLog(@"showNPCIPageNative called");
    NSLog(@"NPCI_IOS => credLength = %@", credLength);
    NSLog(@"NPCI_IOS => xml payload for pge show = %@", xmlPayloadValue);
    self.keyXmlPayload = xmlPayloadValue;
    self.mobileNumber = mobileNumber;
    self.mobileNo = mobileNumber;
    self.App_Id = App_Id;
    self.device_id = device_id;
    self.entityId = entityId;
    self.refUrl = refUrl;
    self.token = tokenValue;

    if (self.token.length>0) {
        NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:self.token options:0];
        self.token = [[NSString alloc] initWithData:decodedData encoding:NSUTF8StringEncoding];
    }
    
    [self getControls:credLength atmCredLength:atmCredLength otpCredLength:otpCredLength noteV:note isATMPin:atmPIN];
    [self getKeyCode];
    [self getConfiguration:bankName];
    [self getTrust:txtId txnAmountV:txnAmount payerAddress:payerAddr payeeDetail:payeeDetails];
    [self getSalt:txtId txnAmountV:txnAmount payerAddress:payerAddr payeeDetail:payeeDetails];
    [self getPayInfo:payeeName noteV:note accountNumber:payeeDetails];
    __block CDVPluginResult* result;
    
    dispatch_async(dispatch_get_main_queue(), ^{
        UIWindow * currentwindow = [[UIApplication sharedApplication]keyWindow];
        UIViewController *root = currentwindow.rootViewController;
        root.modalPresentationStyle = UIModalPresentationFullScreen;

        //[CLServices getCredentialsPresentedFrom:[[[UIApplication sharedApplication]keyWindow]rootViewController] controls:self.controls keyCode:self.keyCode keyXMLPayload:self.keyXmlPayload configuration:self.configuration salt:self.Salt trust:self.trust payInfo:self.payInfo language:@"en_US" completionHandler:^(int success, NSError *error, NSDictionary *cred) {
        [CLServices getCredentialsPresentedFrom:root controls:self.controls keyCode:self.keyCode keyXMLPayload:self.keyXmlPayload configuration:self.configuration salt:self.Salt trust:self.trust payInfo:self.payInfo language:@"en_US" completionHandler:^(int success, NSError *error, NSDictionary *cred) {
            NSLog(@"NPCI_IOS => success = %d error = %@",success, error);
            NSLog(@"NPCI_IOS => cred= %@",cred);
            if (cred != NULL) {
                NSLog(@"NPCI_IOS => Cred found");
                NSMutableDictionary *credDataFromCred = [[cred objectForKey:@"credBlocks"] objectForKey:@"MPIN"]; // 1.5 lib
                NSMutableDictionary *credData = [[NSMutableDictionary alloc]initWithObjects:
                                                @[
                                                [[credDataFromCred objectForKey:@"data"] objectForKey:@"encryptedBase64String"],
                                                [[credDataFromCred objectForKey:@"data"] objectForKey:@"ki"],
                                                [credDataFromCred objectForKey:@"subType"],  // 1.5 Lib
                                                [credDataFromCred objectForKey:@"type"],
                                                [[credDataFromCred objectForKey:@"data"] 
                                                objectForKey:@"code"]]
                                                forKeys:@[@"CredData",@"Ki",@"SubType",@"Type",@"Code"]];
                
                [credData setObject:self.txnId forKey:@"txnId"];
                [credData setObject:self.txnId forKey:@"refId"];
                
                if ([[cred objectForKey:@"credBlocks"] objectForKey:@"NMPIN"] != nil) { // 1.5 Lib
                    credDataFromCred = [[cred objectForKey:@"credBlocks"] objectForKey:@"NMPIN"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"encryptedBase64String"] forKey:@"NewCredData"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"ki"] forKey:@"NewCredKi"];
                    [credData setObject:[credDataFromCred objectForKey:@"subType"] forKey:@"NewSubType"];
                    [credData setObject:[credDataFromCred objectForKey:@"type"] forKey:@"NewType"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"code"] forKey:@"NewCode"];
                }
                
                if ([[cred objectForKey:@"credBlocks"] objectForKey:@"SMS"] != nil) { // 1.5 Lib
                    credDataFromCred = [[cred objectForKey:@"credBlocks"] objectForKey:@"SMS"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"encryptedBase64String"] forKey:@"NewCredData"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"ki"] forKey:@"NewCredKi"];
                    [credData setObject:[credDataFromCred objectForKey:@"subType"] forKey:@"NewSubType"];
                    [credData setObject:[credDataFromCred objectForKey:@"type"] forKey:@"NewType"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"code"] forKey:@"NewCode"];
                }
                
                if ([[cred objectForKey:@"credBlocks"] objectForKey:@"ATMPIN"] != nil) { // 1.5 Lib
                    credDataFromCred = [[cred objectForKey:@"credBlocks"] objectForKey:@"ATMPIN"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"encryptedBase64String"] forKey:@"AtmCredData"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"ki"] forKey:@"AtmCredKi"];
                    [credData setObject:[credDataFromCred objectForKey:@"subType"] forKey:@"AtmCredSubType"];
                    [credData setObject:[credDataFromCred objectForKey:@"type"] forKey:@"AtmCredType"];
                    [credData setObject:[[credDataFromCred objectForKey:@"data"] objectForKey:@"code"] forKey:@"AtmCredCode"];
                }
                /////// ******* Make Changes Here For 1.5 Lib ******* ///////
                self.credDataDict = credData;     
            } else {
                self.credDataDict = [[NSMutableDictionary alloc]init];
                NSLog(@"NPCI_IOS => Cred is NULL");
            }
            NSString *jsonString;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:self.credDataDict
                                                            options:0 // Pass 0 if you don't care about the readability of the generated string
                                                            error:&error];
            if (! jsonData) {
                NSLog(@"NPCI_IOS => Got an error: %@", error);
            } else {
                jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
            }
            
            result = [CDVPluginResult
                                    resultWithStatus: CDVCommandStatus_OK
                                    messageAsString:jsonString
                                    ];
            
            callback((NSString*) jsonString);

            NSLog(@"NPCI_IOS => result => %@", result);
        }];
    });
}


-(NSString *)getCredData{
    //    return self.credDataDict;
    NSString *jsonString;
    NSError *error;
    if (self.credDataDict == nil) {
        return @"";
    }
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:[InitializeCommon sharedInstance].credDataDict
                                                       options:0 // Pass 0 if you don't care about the readability of the generated string
                                                         error:&error];
    if (! jsonData) {
        NSLog(@"NPCI_IOS => Got an error: %@", error);
    } else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    } 
    return jsonString;
}

- (CDVPluginResult *)getTxnId:(CDVInvokedUrlCommand *)command txnIdIdent:(NSString *)txnIdIdent {
    NSLog(@"NPCI_IOS => InitializeCommon => getTxnId");
    CDVPluginResult* pluginResult = nil;
    NSString *uuid = [[NSUUID UUID] UUIDString];
    uuid = [uuid stringByReplacingOccurrencesOfString:@"-" withString:@""];
    uuid = [NSString stringWithFormat:@"%@%@", txnIdIdent,uuid];
    NSLog(@"NPCI_IOS => UUID => %@", uuid);
    pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString:uuid];
    NSLog(@"NPCI_IOS => pluginResult => %@", pluginResult);
    return pluginResult;
}

- (NSString *)stringFromHexString:(NSString *)hexString {
    // The hex codes should all be two characters.
    if (([hexString length] % 2) != 0)
        return nil;
    
    NSMutableString *string = [NSMutableString string];
    
    for (NSInteger i = 0; i < [hexString length]; i += 2) {
        
        NSString *hex = [hexString substringWithRange:NSMakeRange(i, 2)];
        NSInteger decimalValue = 0;
        sscanf([hex UTF8String], "%x", &decimalValue);
        [string appendFormat:@"%c", decimalValue];
    }  
    return string;
}

-(NSString *) stringToHex:(NSString *)str
{
    NSUInteger len = [str length];
    //    unichar *chars = malloc(len * sizeof(unichar));
    unichar *chars = calloc(len,len * sizeof(unichar));
    [str getCharacters:chars];
    
    NSMutableString *hexString = [[NSMutableString alloc] init];
    
    for(NSUInteger i = 0; i < len; i++ )
    {
        // [hexString [NSString stringWithFormat:@"%02x", chars[i]]]; /*previous input*/
        [hexString appendFormat:@"%02x", chars[i]]; /*EDITED PER COMMENT BELOW*/
    }
    return hexString;
}
-(NSString *) stringFromHex:(NSString *)str
{
    NSMutableData *stringData = [[NSMutableData alloc] init];
    unsigned char whole_byte;
    char byte_chars[3] = {'\0','\0','\0'};
    int i;
    for (i=0; i < [str length] / 2; i++) {
        byte_chars[0] = [str characterAtIndex:i*2];
        byte_chars[1] = [str characterAtIndex:i*2+1];
        whole_byte = strtol(byte_chars, NULL, 16);
        [stringData appendBytes:&whole_byte length:1];
    }
    
    return [[NSString alloc] initWithData:stringData encoding:NSASCIIStringEncoding];
}
-(NSData *)dataFromHexString:(NSString *)string
{
    string = [string lowercaseString];
    NSMutableData *data= [NSMutableData new];
    unsigned char whole_byte;
    char byte_chars[3] = {'\0','\0','\0'};
    int i = 0;
    int length = (int)string.length;
    while (i < length-1) {
        char c = [string characterAtIndex:i++];
        if (c < '0' || (c > '9' && c < 'a') || c > 'f')
            continue;
        byte_chars[0] = c;
        byte_chars[1] = [string characterAtIndex:i++];
        whole_byte = strtol(byte_chars, NULL, 16);
        [data appendBytes:&whole_byte length:1];
    }
    return data;
}
-(NSString*)hmacApp_id: (NSString*)appId mobile:(NSString*)mobileNumber device:(NSString*)device_id
{
    NSString *total_str = [NSString stringWithFormat:@"%@|%@|%@",appId,mobileNumber,device_id];
    
    NSLog(@"NPCI_IOS => Hmac -> %@",total_str);
    NSString *sha_256 = [self sha256_string:total_str];
    NSLog(@"NPCI_IOS => Hmac sha_256 -> %@",sha_256);
    NSLog(@"NPCI_IOS => Hmac decrypted token -> %@",self.token);
    // NSString *token =@"704a4f424359494b37643263544b5135327a505555496a5744775130306f7851";//ipad//@"6e39323457716c734b37707739787a75674f4c77345164704458787769374573";///iphone///token provide by NPCI
    
    NSData *hash_data = [[Encrypt alloc] encrypt:[sha_256 dataUsingEncoding:NSUTF8StringEncoding] key: self.token iv:nil];
    NSString *hmac_str = [hash_data base64EncodedStringWithOptions:0];
    
    return hmac_str;
}
- (NSString *)sha256_string:(NSString *)input
{
    
    const char *cstr = [input cStringUsingEncoding:NSUTF8StringEncoding];
    NSData *data = [NSData dataWithBytes:cstr length:input.length];
    uint8_t digest[CC_SHA256_DIGEST_LENGTH];
    
    // This is an iOS5-specific method.
    // It takes in the data, how much data, and then output format, which in this case is an int array.
    CC_SHA256(data.bytes, data.length, digest);
    
    NSMutableString* output = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH * 2];
    
    // Parse through the CC_SHA256 results (stored inside of digest[]).
    for(int i = 0; i < CC_SHA256_DIGEST_LENGTH; i++) {
        [output appendFormat:@"%02x", digest[i]];
    }
    
    return output;
}

-(void)getControls:(NSString*)credLength atmCredLength:(NSString*)atmCredLength otpCredLength:(NSString *)otpCredLength noteV:(NSString *)note isATMPin:(NSString *)atmPIN
{
    
    /////// ******* Make Changes Here For New Bank / PROD ******* ///////
    if (credLength.length == 0) {
        credLength = @"4";
    }
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
    
    if (otpCredLength.length == 0) {
        otpCredLength = @"6";
    }
    
    if (atmCredLength.length == 0) {
        atmCredLength = @"4";
    }
    
    NSArray *keys_arr=[NSArray arrayWithObjects:@"type",@"subtype",@"dType",@"dLength", nil]; /// 1.5 Lib
    NSArray *arr_objects1=[NSArray arrayWithObjects:@"PIN",@"MPIN",@"NUM",credLength, nil];
    NSArray *arr_objects2=[NSArray arrayWithObjects:@"PIN",@"NMPIN",@"NUM",credLength, nil];
    NSArray *arr_objects3=[NSArray arrayWithObjects:@"OTP",@"SMS",@"NUM",otpCredLength, nil];
    NSArray *arr_objects4=[NSArray arrayWithObjects:@"PIN",@"ATMPIN",@"NUM",atmCredLength, nil];
    
    
    
    NSDictionary *dictn1=[NSDictionary dictionaryWithObjects:arr_objects1 forKeys:keys_arr];
    NSDictionary *dictn2=[NSDictionary dictionaryWithObjects:arr_objects2 forKeys:keys_arr];
    NSDictionary *dictn3=[NSDictionary dictionaryWithObjects:arr_objects3 forKeys:keys_arr];
    
    NSDictionary *dictn4=[NSDictionary dictionaryWithObjects:arr_objects4 forKeys:keys_arr];
    
    NSArray *controls_arr;
    if ([note isEqualToString:@"Set UPI PIN"]) { // "Set MPIN"
        if ([atmPIN isEqualToString:@"YES"]) {
            controls_arr = [NSArray arrayWithObjects:dictn3,dictn1,dictn4, nil]; /// dictn4 is for ATM pin
        }else{
            controls_arr = [NSArray arrayWithObjects:dictn3,dictn1, nil]; /// dictn3 is without ATM pin
        }
    }else{
        if ([note isEqualToString:@"Change UPI PIN"]) { // "Change MPIN"
            controls_arr = [NSArray arrayWithObjects:dictn1,dictn2, nil];
        }else{
            controls_arr = [NSArray arrayWithObjects:dictn1, nil];
        }
    }
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
    NSLog(@"NPCI_IOS => control success");
    self.controls=[NSDictionary dictionaryWithObjectsAndKeys:controls_arr, @"CredAllowed",nil];
}
-(void)setValueForKeyXmlPayload:(NSString*)keyPayLoad_temp
{
    self.keyXmlPayload = keyPayLoad_temp;
}
-(void)getXmlPayload
{
    self.keyXmlPayload = @"";
}
-(void)getKeyCode
{
    self.keyCode=@"NPCI";
}
-(void)getConfiguration:(NSString*)bankName
{
    NSLog(@"NPCI_IOS => Bank Name   %@",bankName);
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
    NSArray *config_objects=[NSArray arrayWithObjects:@"payerBankName", @"backgroundColor", @"color",@"resendOTPFeature", nil];
    NSArray *config_values=[NSArray arrayWithObjects:bankName,@"FFFFFF",@"000000",@"false", nil];
    self.configuration = [NSDictionary dictionaryWithObjects:config_values forKeys:config_objects];
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
    NSLog(@"NPCI_IOS => Configuration success");
}
-(void)getTrust:(NSString*)txnId txnAmountV:(NSString *)txnAmount payerAddress:(NSString *)payerAddr payeeDetail:(NSString *)payeeDetails{
    NSLog(@"NPCI_IOS => Inside Trust");
    NSString *trust_str = [NSString stringWithFormat:@"%@|%@|%@|%@|%@|%@|%@",txnAmount,txnId,payerAddr,payeeDetails,self.App_Id,self.mobileNumber,self.device_id];
    NSLog(@"NPCI_IOS => trust   %@",trust_str);
    
    NSData *hash_data = [[Encrypt alloc] encrypt:[trust_str dataUsingEncoding:NSUTF8StringEncoding] key: self.token iv:nil];
    self.trust = [hash_data base64EncodedStringWithOptions:0];
    NSLog(@"NPCI_IOS => trust   %@",self.trust);
    NSLog(@"NPCI_IOS => Trust success");
}

-(void)getSalt:(NSString*)txnId txnAmountV:(NSString *)txnAmount payerAddress:(NSString *)payerAddr payeeDetail:(NSString *)payeeDetails{
    NSLog(@"NPCI_IOS => Inside Salt %@,%@,%@,%@,%@,%@,%@",txnId,txnAmount,self.device_id,self.App_Id,self.mobileNumber,payerAddr,payeeDetails);
    
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
    self.Salt =  @{@"txnId":txnId,   /// changed according to pragyas mail - txnID - txnId
                   @"txnAmount":txnAmount,
                   @"deviceId":self.device_id,
                   @"appId":self.App_Id,
                   @"mobileNumber":self.mobileNumber,
                   @"payerAddr":payerAddr,
                   @"payeeAddr":payeeDetails
                   };
    NSLog(@"NPCI_IOS => salt   %@",self.Salt);
    NSLog(@"NPCI_IOS => Salt success");
    /////// ******* Make Changes Here For 1.5 Lib ******* ///////
}
-(void)getPayInfo:(NSString*)payeeName noteV:(NSString *)note accountNumber:(NSString *)accountNo
{
    NSLog(@"NPCI_IOS => payInfo values   %@ %@ %@ %@ %@ %@",payeeName,note,self.refId,self.txnId,self.refUrl,accountNo);
    NSString *str_padding=@"";
    if ([note isEqualToString:@"Set UPI PIN"] || [note isEqualToString:@"Balance enquiry"] || [note isEqualToString:@"Change UPI PIN"]) {
        NSRange subStringRange = NSMakeRange(0,[accountNo length]-4);
        str_padding =[str_padding stringByPaddingToLength:subStringRange.length withString:@"X" startingAtIndex:0];
        accountNo = [accountNo stringByReplacingOccurrencesOfString:[NSString stringWithFormat:@"%@",[accountNo substringToIndex:subStringRange.length]] withString:str_padding];
    }
    self.payInfo = @[
                     @{@"name":@"payeeName", @"value":payeeName},
                     @{@"name":@"note", @"value":note},
                     @{@"name":@"refId", @"value":self.refId},
                     @{@"name":@"txnID" , @"value":self.txnId},
                     @{@"name":@"refUrl", @"value": self.refUrl},
                     @{@"name":@"account", @"value":accountNo}//[dictn objectForKey:@"account"]}
                     ];
    NSLog(@"NPCI_IOS => payInfo   %@",self.payInfo);
    NSLog(@"NPCI_IOS => PayInfo success");
}
//Encription using key and salt
-(NSString *)getEncryptionDatafromKeySalt:(NSString *)key salt:(NSString *)saltValue
{
    NSString *strTemp = [[EncryptionWithAES128 sharedInstance] genrateEncryptKeykey:key saltValue:saltValue];
    if ([strTemp length] == 0){
        strTemp = @"";
    }
    if (strTemp.length>16) {
        strTemp = [strTemp substringToIndex:16];
    }
    return strTemp;
}
#pragma mark
#pragma Encription Webservice
- (NSString *)encryptData:(NSString *)json andkey:(NSString *)encKey iv:(NSString *)ivValue
{
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
//    NSData * encryptedValue = [data AES128EncryptedDataWithKey:encKey];
    NSData * encryptedValue = [data AES128EncryptedDataWithKey:encKey iv:ivValue];
    NSString *encryptedString = [encryptedValue base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
    encryptedString= [encryptedString stringByReplacingOccurrencesOfString:@"\r\n" withString:@""];
    if ([encryptedString length] == 0) {
        return json;
    }else{
        return encryptedString;
    }
}
- (NSString *)decryptData:(NSString *)json andkey:(NSString *)encKey iv:(NSString *)ivValue
{
    NSData *data = [[NSData alloc]initWithBase64EncodedString:json options:0];
    //    NSData * decryptedValue = [data AES128DecryptedDataWithKey:encKey];
    NSData * decryptedValue = [data AES128DecryptedDataWithKey:encKey iv:ivValue];
    NSString *decryptedString = [[NSString alloc] initWithData:decryptedValue encoding:NSUTF8StringEncoding];
    if ([decryptedString length] == 0) {
        return json;
    }else{
        return decryptedString;
    }
}
#pragma mark
#pragma GEnrate and ShareQR
-(NSString *)genrateQRCodeFromData:(NSString*)paymentAddress pnvalue:(NSString*)name amvalue:(NSString*)amount tnvalue:(NSString*)remark bundleId:(NSString *)appID isWallet:(BOOL) isWallet
{
    NSString *qrstring = [NSString stringWithFormat:@"upi://pay?appid=%@",appID];
    if (isWallet) {
        qrstring = [NSString stringWithFormat:@"digi://pay?appid=%@",appID];
        qrstring = [qrstring stringByAppendingString: [NSString stringWithFormat:@"pn=%@&tn=%@&am=%@&cu=INR&acno=%@",name,amount,remark,paymentAddress]];
        
    } else {
        qrstring = [NSString stringWithFormat:@"upi://pay?appid=%@",appID];
        qrstring = [qrstring stringByAppendingString: [NSString stringWithFormat:@"&pa=%@&pn=%@&tn=%@&am=%@&cu=INR", paymentAddress,name,amount,remark]];
    }
    
    CIFilter *filter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
    [filter setDefaults];
    NSData *data = [qrstring dataUsingEncoding:NSUTF8StringEncoding];
    [filter setValue:data forKey:@"inputMessage"];
    [filter setValue:@"Q" forKey:@"inputCorrectionLevel"];
    CIImage *outputImage = [filter outputImage];
    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef cgImage = [context createCGImage:outputImage fromRect:[outputImage extent]];
    UIImage *image = [UIImage imageWithCGImage:cgImage scale:1.0 orientation:UIImageOrientationUp];
    // Resize without interpolating
    UIImage *resized = [self resizeImage:image withQuality:kCGInterpolationNone rate:5.0];
    NSData *imageData = UIImagePNGRepresentation(resized);
    NSString * base64String = [imageData base64EncodedStringWithOptions:0];
    return base64String;
}

- (UIImage *)resizeImage:(UIImage *)image withQuality:(CGInterpolationQuality)quality rate:(CGFloat)rate
{
    UIImage *resized = nil;
    CGFloat width = image.size.width * rate;
    CGFloat height = image.size.height * rate;
    UIGraphicsBeginImageContext(CGSizeMake(width, height));
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetInterpolationQuality(context, quality);
    [image drawInRect:CGRectMake(0, 0, width, height)];
    resized = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return resized;
}

-(void)shareImage:(NSString *)stringImage
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"data:image/png;base64,%@",stringImage]];
    NSData *imageData = [NSData dataWithContentsOfURL:url];
    UIImage *img = [UIImage imageWithData:imageData];
    NSMutableArray *activityItems= [NSMutableArray arrayWithObjects:img, nil];
    
    NSArray * applicationActivities = nil;
    UIActivityViewController * activityController = [[UIActivityViewController alloc] initWithActivityItems:activityItems applicationActivities:applicationActivities];
    [[[[UIApplication sharedApplication]keyWindow]rootViewController] presentViewController:activityController animated:YES completion:nil];
}
-(void)saveImageToGallery:(NSString *)stringImage
{
    NSData *imageData = [[NSData alloc]initWithBase64EncodedString:stringImage options:0];
    UIImage *imageFromData = [UIImage imageWithData:imageData]; UIImageWriteToSavedPhotosAlbum(imageFromData,self,@selector(thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:),NULL);
    
}
- (void)thisImage:(UIImage *)image hasBeenSavedInPhotoAlbumWithError:(NSError *)error usingContextInfo:(void*)ctxInfo {
    if (error) {
        NSLog(@"NPCI_IOS => error %@",error);
        // Do anything needed to handle the error or display it to the user
    } else {
        UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"UnionBank" message:@"Image Save Successfully." preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction* ok = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
        [alertController addAction:ok];
        
        [[[[UIApplication sharedApplication]keyWindow]rootViewController] presentViewController:alertController animated:YES completion:nil];
    }
}
#pragma mark
#pragma Gaurav
// -(NSString *)getEncryptedValueWithString:(NSString * )strPlainText andCertData:(NSString *)strCertDataBase64{
- (CDVPluginResult *)getEncryptedValueWithString:(CDVInvokedUrlCommand *)command strPlainText:(NSString *)strPlainText andCertData:(NSString *)strCertDataBase64 {
    CDVPluginResult* pluginResult = nil;
    strCertDataBase64= [strCertDataBase64 stringByReplacingOccurrencesOfString:@"-----BEGIN CERTIFICATE-----\n" withString:@""];
    strCertDataBase64= [strCertDataBase64 stringByReplacingOccurrencesOfString:@"\n-----END CERTIFICATE-----\n" withString:@""];
    NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:strCertDataBase64 options:NSDataBase64DecodingIgnoreUnknownCharacters ];
    
    CFDataRef myCertData = (__bridge CFDataRef)decodedData;
    
    SecCertificateRef myCert;
    SecKeyRef aPublicKeyRef = NULL;
    SecTrustRef aTrustRef = NULL;
    
    //4. Create certificate with the data
    myCert = SecCertificateCreateWithData(NULL, myCertData);
    
    //5. Returns a policy object for the default X.509 policy
    SecPolicyRef aPolicyRef = SecPolicyCreateBasicX509();
    
    if (aPolicyRef) {
        SecCertificateRef certArray[1] = { myCert };
        CFArrayRef myCerts = CFArrayCreate(
                                           NULL, (void *)certArray,
                                           1, NULL);
        OSStatus status = SecTrustCreateWithCertificates(myCerts, aPolicyRef, &aTrustRef);
        if (status == noErr) {
            SecTrustResultType result;
            status = SecTrustEvaluate(aTrustRef, &result);
            if (SecTrustEvaluate(aTrustRef, &result) == noErr) {
                //6. Returns the public key for a leaf certificate after it has been evaluated.
                aPublicKeyRef = SecTrustCopyPublicKey(aTrustRef);
            }
        }
    }
    pluginResult = [CDVPluginResult resultWithStatus: CDVCommandStatus_OK messageAsString:[self encryptRSA:strPlainText key:aPublicKeyRef]];
    NSLog(@"NPCI_IOS => pluginResult => %@", pluginResult);
    return pluginResult;
}

-(NSString *)encryptRSA:(NSString *)plainTextString key:(SecKeyRef)publicKeyNext {
    size_t cipherBufferSize = SecKeyGetBlockSize(publicKeyNext);
    uint8_t *cipherBuffer = malloc(cipherBufferSize);
    uint8_t *nonce = (uint8_t *)[plainTextString UTF8String];
    SecKeyEncrypt(publicKeyNext,
                  kSecPaddingPKCS1,
                  nonce,
                  strlen( (char*)nonce ),
                  &cipherBuffer[0],
                  &cipherBufferSize);
    NSData *encryptedData = [NSData dataWithBytes:cipherBuffer length:cipherBufferSize];//base64EncodedString
    return [encryptedData base64EncodedStringWithOptions:nil];
}

-(NSString *) convertStringToSHA256Encryption:(NSString *)securityString {
    const char* str = [securityString UTF8String];
    unsigned char result[CC_SHA256_DIGEST_LENGTH];
    CC_SHA256(str, strlen(str), result);
    
    NSMutableString *ret = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH*2];
    for(int i = 0; i<CC_SHA256_DIGEST_LENGTH; i++)
    {
        [ret appendFormat:@"%02x",result[i]];
    }
    return(ret);
}
@end