//
//  MFMessageComposeViewController+EditDisabled.h
//  MessageComposer
//
//  Created by Hemant Hindlekar on 22/07/19.
//  Copyright © 2019 Hemant Hindlekar. All rights reserved.
//

#import "MFMessageComposeViewController+EditDisabled.h"
#import <MessageUI/MessageUI.h>
//#import "MFMessageComposeViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface MFMessageComposeViewController (EditDisabled)
-(void)_setCanEditRecipients: (BOOL)value;
-(void)_setShouldDisableEntryField: (BOOL)value;

@end

NS_ASSUME_NONNULL_END
