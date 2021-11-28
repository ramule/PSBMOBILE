//
//  BarcodeReader.h
//  QRCodeReader
//


#import <Foundation/Foundation.h>
#import "BarcodeScannerVC.h"
#import <Cordova/CDV.h>

@interface BarcodeReader : CDVPlugin<BarcodeScannerDelegate,UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@property (nonatomic, retain) CDVInvokedUrlCommand *callbackObj;
@property (nonatomic, retain) CDVPlugin *cdv;

+(id)init;
-(void)startCamera:(CDVInvokedUrlCommand*)command;

@end
