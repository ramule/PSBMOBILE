#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
// #import <Cordova/CDVPlugin.h>
#import <Cordova/CDV.h>
#import "InitializeCommon.h"
#import <CommonLibrary/CommonLibrary.h>
#include <CommonCrypto/CommonDigest.h>
#import "Encrypt.h"
#import "NSData+Base64.h"
#import "EncryptionWithAES128.h"
#import "Constants.h"

@interface InitializeCommon : CDVPlugin
{   
    id viewControllerToPresent;
    NSMutableDictionary *dictnForParam;
    
    NSString *endPoint;
    NSString *venderId;
    NSString *sessionId;
    NSString *txnIdIdentifier;
    NSString *messageEncKey;
    NSString *encryptionKey;
    BOOL isEncryptionRequest;
}

+ (InitializeCommon *)sharedInstance;

@property(nonatomic,retain)NSString *device_id,*App_Id,*challange,*mobileNumber,*token,*txnId,*refId,*entityId,*mobileNo,*refUrl;
@property(nonatomic,retain)NSDictionary *credDataDict;
@property(nonatomic,retain)NSDictionary *Salt;
@property(nonatomic,retain)NSDictionary *controls; /////////show control fields
@property(nonatomic,retain)NSString *keyCode;
@property(nonatomic,retain)NSString *keyXmlPayload;
@property(nonatomic,retain)NSString *keyid;
@property(nonatomic,retain)NSDictionary *configuration;
@property(nonatomic,retain)NSString *trust;
@property(nonatomic,retain)NSArray *payInfo;
@property(nonatomic,retain)NSDictionary *Cred;///UI Parameter of transaction/////////////////////////////////////////
@property(nonatomic)BOOL isRegistrationWithLibCompleted;
@property(nonatomic)BOOL isFirstTime;


- (CDVPluginResult *)initializeCommonLib:(CDVInvokedUrlCommand *)command;

- (CDVPluginResult *)generateChallenge:(CDVInvokedUrlCommand *)command deviceId:(NSString *)device_id AppID:(NSString *)App_Id;

- (NSString *) convertStringToSHA256Encryption:(NSString *)securityString;

// - (CDVPluginResult *)registeredAppForNPCI:(CDVInvokedUrlCommand *)command;
// -(CDVPluginResult *)registeredAppForNPCI:(CDVInvokedUrlCommand *)command mobileNumber:(NSString *)mobileNumber deviceId:(NSString *)deviceId appID:(NSString *)appId;
-(CDVPluginResult *)registeredAppForNPCI:(CDVInvokedUrlCommand *)command mobileNumber:(NSString *)mobileNumber deviceId:(NSString *)deviceId appID:(NSString *)appId tokenValue:(NSString *)tokenValue tokenExpiry:(NSString *)tokenExpiry;

- (NSString *)getCredData;

- (NSString *)getEncryptionDatafromKeySalt:(NSString *)key salt:(NSString *)saltValue;

- (NSString *)encryptRSA:(NSString *)plainTextString key:(SecKeyRef)publicKeyNext;

- (CDVPluginResult *)getEncryptedValueWithString:(CDVInvokedUrlCommand *)command strPlainText:(NSString *)strPlainText andCertData:(NSString *)strCertDataBase64;

- (CDVPluginResult *) getTxnId:(CDVInvokedUrlCommand *)command txnIdIdent:(NSString *)txnIdIdent;
 
- (CDVPluginResult *)setDataNPCI:(CDVInvokedUrlCommand *)command mobileNo:(NSString *)mobileNumber appId:(NSString *)App_Id deviceId:(NSString *)device_id typeV:(NSString *)type entityID:(NSString *)entityId refURL:(NSString *)refUrl token:(NSString *)tokenValue;

- (void)showNPCIPageNative:(CDVInvokedUrlCommand *)command credLen:(NSString*)credLength otpCredLength:(NSString *)otpCredLength atmCredLength:(NSString *)atmCredLength taxnID:(NSString *)txtId token:(NSString *)tokenValue xmlPayload:(NSString *)xmlPayloadValue bankN:(NSString*)bankName noteV:(NSString *)note taxnAmount:(NSString *)txnAmount payerAddress:(NSString *)payerAddr payeeDetails:(NSString *)payeeDetails payeeN:(NSString *)payeeName isATMPINRequired:(NSString *)atmPIN mobileNo:(NSString *)mobileNumber appId:(NSString *)App_Id deviceId:(NSString *)device_id typeV:(NSString *)type entityID:(NSString *)entityId refURL:(NSString *)refUrl tokenExpiry:(NSString *)tokenExpiry andCallback:(void (^)(NSString *))callback;

@end
