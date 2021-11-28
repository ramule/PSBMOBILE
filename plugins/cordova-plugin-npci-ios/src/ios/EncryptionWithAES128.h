//
//  EncryptionWithAES128.h
//  Cordova NPCI iOS Communication
//
//  Created by Hemant Hindlekar on 27/07/18.
//  Copyright © 2018 Hemant Hindlekar. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonKeyDerivation.h>
#import <CommonCrypto/CommonCrypto.h>
#import "NSData+AES128.h"
#import "Constants.h"

@interface EncryptionWithAES128 : NSObject



+ (EncryptionWithAES128 *)sharedInstance;

-(NSString *)convertStringToSHA256Encryption:(NSString *)securityString;
-(NSString *)convertStringToAES128WithMessage:(NSString *)message key:(NSString *)myKey;
-(NSString *)convertEncDataToString:(NSString *)message key:(NSString *)myKey;
-(NSDictionary *)converEncDataToStringWithAES128WithMessage:(NSString *)message key:(NSString *)myKey;
-(NSDictionary *)converEncDataToStringWithAES128WithHash:(NSString *)message key:(NSString *)myKey;
-(NSDictionary *)convertStringToDictionary: (NSString *)text;
//-(NSString *)generateEncryptionKey;
-(NSString *)genrateEncryptKeykey:(NSString *)keyParam saltValue:(NSString *)saltParam;



@end
