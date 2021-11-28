//
//  BarcodeScannerVC.h
//  QRCodeReader
//


#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

@protocol BarcodeScannerDelegate
-(void) scanResult:(NSString*) scanData;
-(void) openGallery;
@end

@interface BarcodeScannerVC : UIViewController <AVCaptureMetadataOutputObjectsDelegate,UINavigationControllerDelegate,UIImagePickerControllerDelegate>

@property (assign, nonatomic) IBOutlet UIView *viewPreview;
@property (weak, nonatomic) IBOutlet UIView *transView;
@property (assign, nonatomic) id<BarcodeScannerDelegate> scanDelegate;
- (IBAction)cancelReading:(id)sender;

@end
