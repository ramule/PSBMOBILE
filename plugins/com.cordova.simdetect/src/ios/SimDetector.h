//
//  SimDetector.h
//  SIMDetector
//
//  Created by Admin on 06/02/19.
//  Copyright © 2019 Admin. All rights reserved.
//
#import <Cordova/CDVPlugin.h>
#import <Foundation/Foundation.h>

@interface SimDetector : CDVPlugin

+ (id) init;

- (BOOL) isSimAvailable;

- (void) exitApp;

@end
