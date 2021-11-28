//
//  EncryptionWithAES128.m
//  iOS Encryption Demo
//
//  Created by admin on 06/08/18.
//  Copyright © 2018 cdp. All rights reserved.
//

#import "EncryptionWithAES128.h"

@implementation EncryptionWithAES128

+ (EncryptionWithAES128 *)sharedInstance
{
    static EncryptionWithAES128 *sharedInstance_ = nil;
//    static dispatch_once_t pred;
//    dispatch_once(&pred, ^{
//        sharedInstance_ = [[EncryptionWithAES128 alloc] init];
//
//    });
    sharedInstance_ = [[EncryptionWithAES128 alloc] init];
    return sharedInstance_;
    
}


-(NSString *)convertStringToSHA256Encryption:(NSString *)securityString {
    
    //  NSData * data = [securityString dataUsingEncoding:NSUTF8StringEncoding];
    
    const char* str = [securityString UTF8String];
    unsigned char result[CC_SHA256_DIGEST_LENGTH];
    CC_SHA256(str, strlen(str), result);
    
    NSMutableString *encryptedString = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH*2];
    for(int i = 0; i<CC_SHA256_DIGEST_LENGTH; i++)
    {
        [encryptedString appendFormat:@"%02x",result[i]];
    }
    return  encryptedString;
}


-(NSString *)convertStringToAES128WithMessage:(NSString *)message key:(NSString *)myKey {
    
    NSData *cipherData = [[message dataUsingEncoding:NSUTF8StringEncoding] AES128DecryptedDataWithKey:myKey iv : @"RandomInitVector"];
    NSString * base64Text = [cipherData base64EncodedStringWithOptions:0];
    return base64Text;
    
}

-(NSString *)convertEncDataToString:(NSString *)message key:(NSString *)myKey {
    NSData *data = [[NSData alloc]initWithBase64EncodedString:message options:NSDataBase64DecodingIgnoreUnknownCharacters];
    NSString *result = [[NSString alloc] initWithData:[data AES128DecryptedDataWithKey:myKey] encoding: NSUTF8StringEncoding];
    return result;
}


-(NSDictionary *)converEncDataToStringWithAES128WithMessage:(NSString *)message key:(NSString *)myKey {
    
    NSData *data = [[NSData alloc]initWithBase64EncodedString:message options:NSDataBase64DecodingIgnoreUnknownCharacters];
    
    NSString *result = [[NSString alloc] initWithData:[data AES128DecryptedDataWithKey:myKey] encoding: NSUTF8StringEncoding];
    
    return [self convertStringToDictionary: result];
}

-(NSDictionary *)convertStringToDictionary: (NSString *)text {
    NSData * data =[text dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *dict = nil;
    NSError *error;
    if (data!= nil) {
        return  [ NSJSONSerialization JSONObjectWithData:data options:nil error:&error];
    }
    return dict;
}

//-(NSString *)generateEncryptionKey {
//    return @"1234567890";
//    
//    let hash_key : String = keyParam
//    let saltKey : String = saltParam
//    
//    //        let keyData : NSData = hash_key.dataUsingEncoding(NSUTF8StringEncoding)!
//    let salt : NSData = saltKey.data(using: String.Encoding.utf8)! as NSData
//    
//    let rounds = 100
//    let keySize : Int = kCCKeySizeAES128
//    
//    let derivedKey : NSMutableData = NSMutableData(length: Int(keySize))!
//    
//    let ptr = salt.bytes.assumingMemoryBound(to: UInt8.self)
//    let dataBuffer = derivedKey.mutableBytes.assumingMemoryBound(to: UInt8.self)
//    
//    let result = CCKeyDerivationPBKDF(kCCPBKDF2,NSString(string: hash_key).utf8String,size_t((hash_key as NSString).length),ptr,size_t(salt.length),CCPseudoRandomAlgorithm(kCCPRFHmacAlgSHA1),uint(rounds),dataBuffer,size_t(derivedKey.length))
//    
//    if result != 0 {
//        print("CCKeyDerivationPBKDF failed with error: '\(result)'")
//        return ""
//    }
//    
//    NSString *key = derivedKey.base64EncodedString(options: NSData.Base64EncodingOptions(rawValue: UInt(0)))
//    
//}
-(NSString *)genrateEncryptKeykey:(NSString *)keyParam saltValue:(NSString *)saltParam
{
    NSData *salt = [saltParam dataUsingEncoding:NSUTF8StringEncoding];
    NSData *hash_key_val = [keyParam dataUsingEncoding:NSUTF8StringEncoding];
    uint    rounds = 100;
    NSInteger keySize = kCCKeySizeAES128;
    
//    NSMutableData *derivedKey = [NSMutableData dataWithLength:keySize];
//    uint8_t *ptr=(uint8_t *) CVPixelBufferGetBaseAddress((__bridge CVPixelBufferRef _Nonnull)(salt));
//    uint8_t *dataBuffer=(uint8_t *) CVPixelBufferGetBaseAddress((__bridge CVPixelBufferRef _Nonnull)(derivedKey));
    
    uint    keySizeNew = kCCKeySizeAES128;
    NSMutableData *derivedKeyNew = [NSMutableData dataWithLength:keySize];
    //onst char *bar = [hash_key UTF8String];
    int result = CCKeyDerivationPBKDF(kCCPBKDF2, hash_key_val.bytes, hash_key_val.length,salt.bytes, salt.length, kCCPRFHmacAlgSHA1, rounds, derivedKeyNew.mutableBytes, derivedKeyNew.length);
  //  NSString *result=CCKeyDerivationPBKDF(kCCPBKDF2, [hash_key UTF8String], sizeof(hash_key.length), ptr, sizeof(salt.length), kCCPRFHmacAlgSHA1, rounds, dataBuffer, sizeof(derivedKey.length));
    if (result != 0) {\
        //print("CCKeyDerivationPBKDF failed with error: '\(result)'")
        return @"";
    }
    NSString *key = [derivedKeyNew base64EncodedStringWithOptions:0];
    
    return key;
    
}
-(NSDictionary *)converEncDataToStringWithAES128WithHash:(NSString *)message key:(NSString *)myKey {
    NSData *data = [[NSData alloc]initWithBase64EncodedString:message options:NSDataBase64DecodingIgnoreUnknownCharacters];
    
    NSString *result = [[NSString alloc] initWithData:[data AES128DecryptedDataWithKey:myKey] encoding: NSUTF8StringEncoding];
    
    return [self convertStringToDictionary: result];
}


@end
