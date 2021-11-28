//
//  BarcodeReader.m
//  QRCodeReader
//


#import "BarcodeReader.h"
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDV.h>

@implementation BarcodeReader

+(id)init
{
    static BarcodeReader *reader = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        reader = [[self alloc] init];
    });
    return reader;
}

-(void)startCamera:(CDVInvokedUrlCommand*)command
{
  NSLog(@"ScanQR => startCamera");
  self.callbackObj = command;
  
  [self presentView];
}

// -(void) presentView
// {
//   dispatch_async(dispatch_get_main_queue(), ^{
//     BarcodeScannerVC * controller = [[BarcodeScannerVC alloc] initWithNibName:@"BarcodeScannerVC" bundle:[NSBundle mainBundle]];
//     controller.scanDelegate = self;
//     UIWindow * currentwindow = [[UIApplication sharedApplication] keyWindow];
//     [currentwindow.rootViewController presentViewController:controller animated:NO completion:nil];
//   });
// }

-(void) presentView
{
    dispatch_async(dispatch_get_main_queue(), ^{
      BarcodeScannerVC * controller = [[BarcodeScannerVC alloc] initWithNibName:@"BarcodeScannerVC" bundle:[NSBundle mainBundle]];
      controller.scanDelegate = self;
      controller.view.hidden = NO;
      //[self presentViewController:controller animated:YES completion:nil];
      UIWindow * currentwindow = [[UIApplication sharedApplication] keyWindow];
      [currentwindow.rootViewController presentViewController:controller animated:NO completion:nil];
    });
}

-(void) scanResult:(NSString*) scanData
{
  NSLog(@"ScanQR => scanResult");
    CDVPluginResult* result = [CDVPluginResult
                               resultWithStatus:CDVCommandStatus_OK
                               messageAsString:scanData];
    NSLog(@"ScanQR => result => %@", result);
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackObj.callbackId];
}
-(void)openGallery{
    dispatch_async(dispatch_get_main_queue(), ^{
    UIImagePickerController *pickerController = [[UIImagePickerController alloc]
                                                 init];
    pickerController.delegate = self;
    
    UIWindow * currentwindow = [[UIApplication sharedApplication] keyWindow];
   // [currentwindow.rootViewController presentViewController:controller animated:NO completion:nil];
    [currentwindow.rootViewController presentViewController:pickerController animated:YES completion:nil];
    });
}
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info
{
    [picker dismissViewControllerAnimated:YES completion:nil];
    
    UIImage *image = [info objectForKey:UIImagePickerControllerOriginalImage];
    CIImage *img = [[CIImage alloc]initWithImage:image];
    
    CIDetector* detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:nil options:@{CIDetectorAccuracy:CIDetectorAccuracyHigh}];
    if (detector)
    {
        NSArray* featuresR = [detector featuresInImage:img];
        NSString* decodeR;
        if (featuresR.count==0) {
//            [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
            [self performSelectorOnMainThread:@selector(scanResult:) withObject:@"InvalidQR" waitUntilDone:YES];
        } else {
            
            for (CIQRCodeFeature* featureR in featuresR)
            {
                NSLog(@"decode %@ ",featureR.messageString);
                decodeR = featureR.messageString;
                
//                [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
                [self performSelectorOnMainThread:@selector(scanResult:) withObject:decodeR waitUntilDone:YES];
                return;
            }
        }
        
    }
    
}

@end
