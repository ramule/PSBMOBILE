import { Location } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../services/data.service';
import { UpiDashboardService } from '../dashboard/upi-dashboard.service';
declare var showToastMessage: any;
declare var searchContactListToast: any;
declare var searchContactList: any;
declare var cordova: any;
declare var window: any;
declare var $;
declare var sms;

@Component({
  selector: 'app-search-contact-list',
  templateUrl: './search-contact-list.component.html',
  styleUrls: ['./search-contact-list.component.scss']
})
export class SearchContactListComponent implements OnInit,AfterViewInit {
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'Contact',
    'footertype': 'none'
  }
  searchContacts = '';
  contactUserName = '';
  mobileContacts = [];
  batchUpdatedContacts = [];
  prevURL = "";
  link = "";
  batches = [];
  batchIndex = 0;
  contactMobileNo = '';
  isReferFriend = false;
  constructor(private router: Router,
    public DataService: DataService,
    private loader: pageLoaderService,
    private pluginService: PluginService,
    private location: Location,
    private localStorage: LocalStorageService,
    private ngZone: NgZone,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private translate: TranslatePipe,
    private upiDashboardService: UpiDashboardService,
    private commonMethod: CommonMethods) { }

  ngOnInit(): void {
    this.DataService.setPageSettings('CONTACT_LIST');
    this.link = this.DataService.platform.toLowerCase() == "android" ? this.constant.playStoreLink : this.DataService.platform.toLowerCase() == "ios" ? this.constant.appStoreLink : "NA";
    history.pushState({}, this.DataService.contactPrevURL, this.location.prepareExternalUrl(this.DataService.contactPrevURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.fetchContacts();
    })
  }

  fetchContacts(){
    if (this.DataService.mobileContacts.length == 0 && this.DataService.isCordovaAvailable) {
      this.getContactsList();
    }
    this.isReferFriend = this.DataService.previousPageUrl == 'referFriend' ? true : false;
    if (this.DataService.isCordovaAvailable) {
      if (this.DataService.isContactSyncCompleted && this.DataService.isContactsSyncEnabled) {
        this.DataService.mobileContacts = this.DataService.updatedContacts;
        this.DataService.isContactsSyncEnabled = true;
      } else {
        this.DataService.isContactsSyncEnabled = false;
      }
      this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
    } else {

      this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
      this.DataService.mobileContactsClone = this.DataService.mobileContacts;
    }
  }

  getContactsList() {
    this.commonMethod.closePopup('div.popup-bottom.contact-permission');
    this.pluginService.checkContactPermission().subscribe(authorized => {
      if (authorized == "0") {
        if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
          this.pluginService.getDeviceContactsAndroid().subscribe(contacts => {
            this.ngZone.run(() => {
              this.DataService.mobileContacts = contacts.allContacts;
              this.DataService.mobileContactsClone = contacts.allContacts;
              this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
              if (this.localStorage.hasKeyLocalStorage('isContactSynced') && this.localStorage.getLocalStorage('isContactSynced') == "Y") {
                this.DataService.isContactsSyncEnabled = true;
                this.batchUpdateContacts(this.DataService.mobileContacts);
              }
            });
          });
        } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
          this.pluginService.getDeviceContactsIos().subscribe(contacts => {
            this.ngZone.run(() => {
              this.DataService.mobileContacts = contacts.allContacts;
              this.DataService.mobileContactsClone = contacts.allContacts;
              this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
              if (this.localStorage.hasKeyLocalStorage('isContactSynced') && this.localStorage.getLocalStorage('isContactSynced') == "Y") {
                this.DataService.isContactsSyncEnabled = true;
                this.batchUpdateContacts(this.DataService.mobileContacts);
              }
            });
          });
        } else {
          console.log("Unknown platform...");
        }

        
      } else if (authorized == "1") {
        this.commonMethod.openPopup('div.popup-bottom.contact-permission-deniedAlways');
      } else if (authorized == "2") {
        this.commonMethod.openPopup('div.popup-bottom.contact-permission');
      } else {
        console.log("Not Authorized..");
        this.commonMethod.openPopup('div.popup-bottom.contact-permission-not-granted');
      }
    });
  }

  selectContact(contact) {
    if (this.isReferFriend) {
      if(contact.isPSBRegister == 'Y'){
        return;
      }
      this.showPopup('show-confirmation',contact)
    } else {
      if (this.DataService.fetchContacts) {
        this.DataService.upiCollectRequest.mobileNo = contact.mobileNo;
      } if (this.DataService.fetchContactsFromDevice) {
        this.DataService.deviceMobileNo = contact.mobileNo;
      } else {
        this.DataService.upiPayRequest.mobileNo = contact.mobileNo;
      }
      this.location.back();
    }
  }

  synContactListApiCall(contacts, index) {
    if (this.DataService.mobileContacts.length > 0) {
      if (this.DataService.isContactsSyncEnabled) {
        let contactSyncRequest = this.upiDashboardService.getContactSyncRequest(contacts);
        this.UpiApiCall(contactSyncRequest, index);
      } else {
        this.ngZone.run(() => {
          this.DataService.mobileContacts = this.DataService.mobileContactsClone;
          this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
        })
      }
    }
  }

  batchUpdateContacts(contacts: any[], batchSize = 500) {
    this.commonMethod.closePopup('div.popup-bottom.contactsSync-popup');
    this.batches = [];
    this.batchIndex = 0
    this.batchUpdatedContacts = [];
    let offset = 0;
    while (offset < contacts.length) {
      this.batches.push(
        contacts.slice(offset, offset + batchSize)
      );
      offset += batchSize;
    }
    // return forkJoin(
    //   this.batches.map((batch, index) =>  this.synContactListApiCall(batch, index))
    // );
    this.synContactListApiCall(this.batches[0], this.batchIndex)
  }

  /**
 * Common Api Call for collect 
 * @param request 
 */
  UpiApiCall(request, index) {
    console.log('Batch Index', this.batchIndex);
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true, {contactSync:true}).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_CONTACTSYNC:
            this.ngZone.run(() => {
              this.batchUpdatedContacts = this.batchUpdatedContacts.concat(response.responseParameter.mobileList)
              this.batches[index].updated = true;
              this.batchIndex = this.batchIndex + 1;
              if ((this.batches.length - 1) >= this.batchIndex) {
                this.synContactListApiCall(this.batches[this.batchIndex], this.batchIndex)
              }
              if (this.batches.every((batch) => batch.updated)) {
                this.DataService.mobileContacts = this.batchUpdatedContacts;
                this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
                console.log("final list");
                console.log(this.DataService.upiContactsList);
                this.DataService.isContactSyncCompleted = true;
                this.DataService.updatedContacts = this.batchUpdatedContacts;
                this.localStorage.setLocalStorage('isContactSynced', 'Y')
                this.showCommonToastMsgWithKey('CONTACTS_SYNC_COMPLETED', 'success')
              }
            })
            break;
          default:
            break;
        }
      } else {
        this.ngZone.run(() => {
          this.showCommonToastMsgWithKey('CONTACTS_SYNC_FAILED', 'error')
          this.DataService.isContactsSyncEnabled = false;
          this.localStorage.setLocalStorage('isContactSynced', "N")
          this.DataService.mobileContacts = this.DataService.mobileContactsClone;
          this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
        });
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  openPopup(popupName) {
    this.ngZone.run(() => {
      if (this.DataService.isContactsSyncEnabled && !this.DataService.isContactSyncCompleted) {
        this.commonMethod.openPopup('div.popup-bottom.' + popupName)
      } else if (this.DataService.isContactSyncCompleted && this.DataService.isContactsSyncEnabled) {
        this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.updatedContacts);
      } else {
        this.DataService.mobileContacts = this.DataService.mobileContactsClone;
        this.DataService.upiContactsList = this.commonMethod.getAscendingContactList(this.DataService.mobileContacts);
      }
    });
  }

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName)
    if (popupName == 'contactsSync-popup') {
      this.DataService.isContactsSyncEnabled = !this.DataService.isContactsSyncEnabled;
    } else if (popupName == 'contact-permission' || popupName == 'contact-permission-deniedAlways') {
      this.location.back();
    }
  }

  /**	
  * Show Toast message with multilingual	
  * @param msgKey 	
  * @param toastColor 	
  */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }

  goToSettings() {
    this.location.back();
    cordova.plugins.diagnostic.switchToSettings(function () {
      console.log("Successfully switched to Settings app");
    }, function (error) {
      console.error("The following error occurred: " + error);
    });
  }

  showPopup(popupName, contact) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.contactUserName = contact.custName;
    this.contactMobileNo = contact.mobileNo;
  }

  shareLink() {
    if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.pluginService.checkSMSPermission().subscribe((status) => {
        console.log("checkSMSPermission", status);
        if (status) {
          this.sendSMS();
        } else {
          this.pluginService.requestSMSPermission().subscribe((status) => {
            if (status) {
              this.sendSMS();
            }
            else {
              console.log("request denied");
              this.showNotGrantedModel();
            }
          });
        }
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.sendSMS();
    } else {
      console.log("Unknown platform...");
    }
  }

  showNotGrantedModel() {
    $('#notgrantedsmspermodel').modal('show');
  }


  hideNotGrantedModal() {
    $('#notgrantedsmspermodel').modal('hide');
  }


  gotoSetting() {
    this.hideNotGrantedModal();
    this.pluginService.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
    }, (err) => {
      console.log("gotoSetting error", err);
    });
  }

  sendSMS() {
    let subscriptionId, smsOptions, msg;
  
    // msg = `${this.constant.linkMSG}${this.link}`;
    msg = this.DataService.getAppShareLink();
    // this.showCommonToastMsgWithKey('INVITATION_SENT_SUCCESSFULLY', 'success');
    if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
      subscriptionId = this.localStorage.hasKeyLocalStorage('SimOneId') ? this.localStorage.getLocalStorage('SimOneId') : this.localStorage.getLocalStorage('SimTwoId');
      smsOptions = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          // intent: 'INTENT'  // send SMS with the native android SMS messaging
          intent: '' // send SMS without opening any other app
        }
      };
      sms.send(this.contactMobileNo, msg, subscriptionId, smsOptions, (d) => {
        if (d == 'Error') {
          showToastMessage("Error while sending message . Please try again", "error");
        } else {
          this.showCommonToastMsgWithKey('INVITATION_SENT_SUCCESSFULLY', 'success');
        }
      }, (e) => {
          showToastMessage("Message sending failed " + e, "error");
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      subscriptionId = 0;
      smsOptions = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
      };
      sms.sendOtherSms(this.contactMobileNo, msg, subscriptionId, smsOptions, (d) => {
        if (d == 'Error') {
          showToastMessage("Error while sending message . Please try again", "error");
        } else {
          this.showCommonToastMsgWithKey('INVITATION_SENT_SUCCESSFULLY', 'success');
        }
      }, (e) => {
          showToastMessage("Message sending failed " + e, "error");
      });
    } else {
      console.log("Unknown platform...");
    }
  }
}