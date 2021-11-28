//
//  CryptLib.h
//

#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonCryptor.h>
#import <Foundation/Foundation.h>

@interface Encrypt : NSObject

-  (NSData *)encrypt:(NSData *)plainText key:(NSString *)key iv:(NSString *)iv;
-  (NSString*) sha256:(NSString *)key length:(NSInteger) length;

@end
