//
//  BarcodeScannerVC.m
//  QRCodeReader
//


#import "BarcodeScannerVC.h"

@interface BarcodeScannerVC ()
@property (nonatomic, retain) AVCaptureSession *captureSession;
@property (nonatomic, retain) AVCaptureVideoPreviewLayer *videoPreviewLayer;

-(BOOL)startReading;
-(void)stopReading;

@end

@implementation BarcodeScannerVC

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        NSLog(@"ScanQR => initWithNibName => Inside IF");
    } else {
        NSLog(@"ScanQR => initWithNibName => Inside ELSE");
    }
    return self;
}

- (void)viewDidLoad
{
    NSLog(@"ScanQR => viewDidLoad");
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    
    // Initially make the captureSession object nil.
    _captureSession = nil;
    
    //Start reading for barcode.
    [self checkCameraAuthorization];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(BOOL) shouldAutorotate {
    return YES;
}

- (NSUInteger)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskAll;
}

-(void) checkCameraAuthorization {



AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];



if(status == AVAuthorizationStatusAuthorized) { // authorized

    NSLog(@"camera authorized");

}

else if(status == AVAuthorizationStatusDenied){ // denied

    if ([AVCaptureDevice respondsToSelector:@selector(requestAccessForMediaType: completionHandler:)]) {

        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {

            // Will get here on both iOS 7 & 8 even though camera permissions weren't required

            // until iOS 8. So for iOS 7 permission will always be granted.

            dispatch_async(dispatch_get_main_queue(), ^{

                [self sendResult:@"DENIED"];

                NSLog(@"DENIED");

            });





            if (granted) {

                // Permission has been granted. Use dispatch_async for any UI updating

                // code because this block may be executed in a thread.

                dispatch_async(dispatch_get_main_queue(), ^{

                    //[self doStuff];

                    [self startReading];

                });

            } else {

                // Permission has been denied.

                dispatch_async(dispatch_get_main_queue(), ^{

                    [self sendResult:@"Not Authorized"];

                    NSLog(@"Not Authorized-Please go to Settings and enable the camera for this app to use this feature.");

                });

                

//                UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Not Authorized" message:@"Please go to Settings and enable the camera for this app to use this feature." delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK", nil];

//                [alert show];

            }

        }];

    }

}

else if(status == AVAuthorizationStatusRestricted){ // restricted

    dispatch_async(dispatch_get_main_queue(), ^{

        [self sendResult:@"Not Authorized"];

        NSLog(@"Not Authorized-Please go to Settings and enable the camera for this app to use this feature.");

    });

    //    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Not Authorized" message:@"Please go to Settings and enable the camera for this app to use this feature." delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK", nil];

//    [alert show];

}

else if(status == AVAuthorizationStatusNotDetermined){ // not determined



    [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {

        if(granted){ // Access has been granted ..do something

            dispatch_async(dispatch_get_main_queue(), ^{

            [self startReading];

            NSLog(@"camera authorized");

            });

        } else { // Access denied ..do something

            dispatch_async(dispatch_get_main_queue(), ^{

            [self sendResult:@"Not Authorized"];

            NSLog(@"Not Authorized-Please go to Settings and enable the camera for this app to use this feature.");

            });

//            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Not Authorized" message:@"Please go to Settings and enable the camera for this app to use this feature." delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK", nil];

//            [alert show];

        }

    }];

}

}

- (BOOL)startReading {
    NSError *error;
    
    // Get an instance of the AVCaptureDevice class to initialize a device object and provide the video
    // as the media type parameter.
    AVCaptureDevice *captureDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    // Get an instance of the AVCaptureDeviceInput class using the previous device object.
    AVCaptureDeviceInput *input = [AVCaptureDeviceInput deviceInputWithDevice:captureDevice error:&error];
    
    if (!input) {
        // If any error occurs, simply log the description of it and don't continue any more.
        NSLog(@"%@", [error localizedDescription]);
        return NO;
    }
    
    // Initialize the captureSession object.
    _captureSession = [[AVCaptureSession alloc] init];
    // Set the input device on the capture session.
    [_captureSession addInput:input];
    
    
    // Initialize a AVCaptureMetadataOutput object and set it as the output device to the capture session.
    AVCaptureMetadataOutput *captureMetadataOutput = [[AVCaptureMetadataOutput alloc] init];
    [_captureSession addOutput:captureMetadataOutput];
    
    // Create a new serial dispatch queue.
    dispatch_queue_t dispatchQueue;
    dispatchQueue = dispatch_queue_create("myQueue", NULL);
    [captureMetadataOutput setMetadataObjectsDelegate:self queue:dispatchQueue];
    //[captureMetadataOutput setMetadataObjectTypes:[NSArray arrayWithObject:AVMetadataObjectTypeQRCode]];
    [captureMetadataOutput setMetadataObjectTypes:[captureMetadataOutput availableMetadataObjectTypes]];
    
    // Initialize the video preview layer and add it as a sublayer to the viewPreview view's layer.
    _videoPreviewLayer = [[AVCaptureVideoPreviewLayer alloc] initWithSession:_captureSession];
    [_videoPreviewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
    [_videoPreviewLayer setFrame:_viewPreview.layer.bounds];
    [_viewPreview.layer addSublayer:_videoPreviewLayer];
    [self.view bringSubviewToFront:self.transView];
    // Start video capture.
    [_captureSession startRunning];
    
    return YES;
}

- (void)viewWillLayoutSubviews {
    if(_videoPreviewLayer) {
        _videoPreviewLayer.frame = self.view.bounds;
        if (_videoPreviewLayer.connection.supportsVideoOrientation) {
            _videoPreviewLayer.connection.videoOrientation = [self interfaceOrientationToVideoOrientation:[UIApplication sharedApplication].statusBarOrientation];
        }
    }
}

- (AVCaptureVideoOrientation)interfaceOrientationToVideoOrientation:(UIInterfaceOrientation)orientation {
    switch (orientation) {
        case UIInterfaceOrientationPortrait:
            return AVCaptureVideoOrientationPortrait;
        case UIInterfaceOrientationPortraitUpsideDown:
            return AVCaptureVideoOrientationPortraitUpsideDown;
        case UIInterfaceOrientationLandscapeLeft:
            return AVCaptureVideoOrientationLandscapeLeft;
        case UIInterfaceOrientationLandscapeRight:
            return AVCaptureVideoOrientationLandscapeRight;
        default:
            break;
    }
    return AVCaptureVideoOrientationPortrait;
}


-(void)stopReading{
    // Stop video capture and make the capture session object nil.
    [_captureSession stopRunning];
    //[_captureSession release], _captureSession = nil;
    
    // Remove the video preview layer from the viewPreview view's layer.
    [_videoPreviewLayer removeFromSuperlayer];
    //[_videoPreviewLayer release], _videoPreviewLayer = nil;
    
    [self dismissViewControllerAnimated:NO completion:nil];
}

-(void) cancelReading:(id)sender {
    [self stopReading];
    [self sendResult:@"Cancelled"];
}

-(void) sendResult:(NSString*) result
{
    [_scanDelegate scanResult:result];
}

#pragma mark - AVCaptureMetadataOutputObjectsDelegate method implementation

-(void)captureOutput:(AVCaptureOutput *)captureOutput didOutputMetadataObjects:(NSArray *)metadataObjects fromConnection:(AVCaptureConnection *)connection{
    
    NSString *detectionString = nil;
    NSArray *barCodeTypes = @[AVMetadataObjectTypeUPCECode, AVMetadataObjectTypeCode39Code, AVMetadataObjectTypeCode39Mod43Code,
                              AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode93Code, AVMetadataObjectTypeCode128Code,
                              AVMetadataObjectTypePDF417Code, AVMetadataObjectTypeQRCode, AVMetadataObjectTypeAztecCode];
    
    for (AVMetadataObject *metadata in metadataObjects) {
        for (NSString *type in barCodeTypes) {
            if ([metadata.type isEqualToString:type])
            {
                detectionString = [(AVMetadataMachineReadableCodeObject *)metadata stringValue];
                break;
            }
        }
        
        if (detectionString != nil)
        {
            // Everything is done on the main thread.
            [self performSelectorOnMainThread:@selector(stopReading) withObject:nil waitUntilDone:NO];
            [self performSelectorOnMainThread:@selector(sendResult:) withObject:detectionString waitUntilDone:YES];
            break;
        }
    }
}
- (IBAction)btnChooseFromGalleryClick:(id)sender {
//    UIImagePickerController *pickerController = [[UIImagePickerController alloc]
//                                                 init];
//    pickerController.delegate = self;
    [_scanDelegate openGallery];
    [self dismissViewControllerAnimated:YES completion:nil];
//    UIWindow * currentwindow = [[UIApplication sharedApplication] keyWindow];
//   // [currentwindow.rootViewController presentViewController:controller animated:NO completion:nil];
//    [currentwindow.rootViewController presentViewController:pickerController animated:YES completion:nil];
}


@end
