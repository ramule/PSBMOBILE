import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonMethods } from '../utilities/common-methods';
import { pageLoaderService } from '../services/pageloader.service';
import { AppConstants } from '../app.constant';
import { DataService } from './data.service';
import { LocalStorageService } from './local-storage-service.service';
import { data } from 'jquery';
import { TransactionSuccessComponent } from '../pages/upi/transaction/transaction-success/transaction-success.component';
import { TransactionSuccessModule } from '../pages/upi/transaction/transaction-success/transaction-success.module';


declare var cordova: any;
declare var showToastMessage: any;
declare var FingerprintAuth: any;
declare var Fingerprint: any;
declare var device: any;
declare var window: any;
declare var SyncStatus: any;
declare var InstallMode: any;
declare var navigator: any;
declare var IRoot: any;
declare var addressimpl: any;
declare var sms: any;
declare var Connection: any;
declare var plugins: any;
declare var Media: any;

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  imeiNumber: any;

  constructor(
    public commonMethods: CommonMethods,
    private loader: pageLoaderService,
    private constant: AppConstants,
    private dataService: DataService,
    private storage: LocalStorageService,
    private ngZone: NgZone
  ) { }

  biometricType: '';
  biometicChanged: boolean = false;
  /**
   * plugin to get mac address
   */
  getMacAddress(): Observable<any> {
    const subject = new Subject<any>();
    var params = {};
    addressimpl.request("getMACAddress", JSON.stringify(params), function (message) {
      let val = { status: true, value: message }
      subject.next(val);
      subject.complete();
    }, function () {
      let val = { status: false, value: "" }
      subject.next(val);
      subject.complete();
    });
    return subject.asObservable();
  }
  /**
   * plugin to detect sim and help for registration
   */

  hasReadPermission(): Observable<any> {
    //alert("hasReadPermission")
    const subject = new Subject<any>();
    window['plugins'].sim.hasReadPermission(function (simPermission) {
      console.log("hasReadPermission success", simPermission);
      if (simPermission) {
        subject.next(true);
        subject.complete();
      }
      else {
        subject.next(false);
        subject.complete();
      }
    }, function (error) {
      console.log("hasReadPermission error", error);
      subject.next(false);
      subject.complete();
    });

    return subject.asObservable();
  }


  checkSMSPermission(): Observable<any> {
    const subject = new Subject<any>();
    sms.hasPermission(function (smsPermission) {
      console.log("checkSMSPermission => hasPermission success", smsPermission);
      if (smsPermission) {
        subject.next(true);
        subject.complete();
      } else {
        subject.next(false);
        subject.complete();
      }
    }, function (error) {
      console.log("checkSMSPermission => hasPermission error", error);
      subject.next(false);
      subject.complete();
    });

    return subject.asObservable();
  }

  getSIMInfo(): Observable<any> {
    const subject = new Subject<any>();
    let _this = this;
    window['plugins'].sim.getSimInfo(function (result) {
      console.log("getSIMInfo result", JSON.stringify(result));
      _this.dataService.simData = result;
      if (_this.dataService.platform.toLowerCase() == _this.constant.val_android) {
        if (result && result.cards) {
          _this.dataService.activeSimCount = result.cards.length;
        } else {
          _this.dataService.activeSimCount = 0;
        }
      } else if (_this.dataService.platform.toLowerCase() == _this.constant.val_ios) {
        _this.dataService.activeSimCount = 1;
      } else {
        console.log("Unknown platform...");
      }
      subject.next(true);
      subject.complete();
    }, function (error) {
      console.log("getSIMInfo error", error);
      _this.dataService.activeSimCount = 0;
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }


  getIosQrScan(): Observable<any> {
    const subject = new Subject<any>();
    let _this = this;
    window.plugins.qrScanIos.startCamera(function (result) {
      console.log(result);
      subject.next(true);
      subject.complete();
    }, function (error) {
      console.log(error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }


  requestReadPermission(): Observable<any> {
    const subject = new Subject<any>();
    window['plugins'].sim.requestReadPermission(function (result) {
      console.log("requestReadPermission result", result);
      subject.next(true);
      subject.complete();
    }, function (error) {
      console.log("requestReadPermission error", error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

  requestSMSPermission(): Observable<any> {
    const subject = new Subject<any>();
    sms.requestPermission(function (result) {
      console.log("requestSMSPermission result", result);
      console.log(result);
      subject.next(true);
      subject.complete();
    }, function (error) {
      console.log("requestSMSPermission error", error);
      console.log(error);
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }


  gotoSetting(redirectionPage?: any): Observable<any> {

    var pagedtl = "application_details"
    if (redirectionPage) { pagedtl = redirectionPage; }
    const subject = new Subject<any>();
    window.cordova.plugins.settings.open(pagedtl, function () {
      console.log("opened setting");
      subject.next(true);
      subject.complete();
    }, function () {
      console.log("failed to open setting");
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

  getSIMDetails() {
    window['plugins'].sim.hasReadPermission(function (simPermission) {
      console.log("getSIMDetails => hasReadPermission success", simPermission);
      if (simPermission) {
        window['plugins'].sim.getSimInfo(function (result) {
          console.log("getSIMDetails => getSimInfo result", result);
        }, function (error) {
          console.log("getSIMDetails => getSimInfo error", error);
        });
      } else {
        window['plugins'].sim.requestReadPermission(function (result) {
          console.log("getSIMDetails => requestReadPermission result", result);
          console.log(result);
          window['plugins'].sim.getSimInfo(function (result) {
            console.log("getSIMDetails => getSimInfo result", result);
          }, function (error) {
            console.log("getSIMDetails => getSimInfo error", error);
          });
        }, function (error) {
          console.log("getSIMDetails => requestReadPermission error", error);
          console.log(error);
        });
      }
    }, function (error) {
      console.log("getSIMDetails => hasReadPermission error", error);
      window['plugins'].sim.requestReadPermission(function (result) {
        console.log("getSIMDetails => requestReadPermission result", result);
        console.log(result);
      }, function (error) {
        console.log("getSIMDetails =>requestReadPermission error", error);
        console.log(error);
      });
    });
  }

  checkSimStatusAndroid(simOne, simTwo, isDualSim): Observable<any> {
    console.log("checkSimStatusAndroid params => ", simOne, simTwo, isDualSim);
    var subject = new Subject<any>();
    cordova.plugins.simdetect.checkSimStatusAndroid({ simOne: simOne, simTwo: simTwo, isDualSim: isDualSim }, function (success) {
      console.log('Android SimDetect => checkSimStatus success', success);
      subject.next(success);
      subject.complete();
    }, function (error) {
      console.log('Android SimDetect => checkSimStatus error', error);
      subject.next(error);
      subject.complete();
    });
    return subject.asObservable();
  }

  checkSIMAvailable(): Observable<any> {
    var subject = new Subject<any>();
    if (this.constant.getPlatform().toLowerCase() == this.constant.val_android) {
      cordova.plugins.simdetect.isSimAvailableAndroid(function (success) {
        console.log('Android SimDetect => checkSimStatus success', success);
        subject.next(success);
        subject.complete();
      }, function (error) {
        console.log('Android SimDetect => checkSimStatus error', error);
        subject.next(error);
        subject.complete();
      });
    } else if (this.constant.getPlatform().toLowerCase() == this.constant.val_ios) {
      cordova.plugins.simdetect.isSimAvailableIos(function (success) {
        console.log('iOS SimDetect => checkSimStatus success', success);
        subject.next(success);
        subject.complete();
      }, function (error) {
        console.log('iOS SimDetect => checkSimStatus error', error);
        subject.next(error);
        subject.complete();
      });
    }

    return subject.asObservable();
  }



  registerSIMChangeEvent(): Observable<any> {
    var subject = new Subject<any>();
    if (this.constant.getPlatform().toLowerCase() == this.constant.val_android) {
      cordova.plugins.simdetect.registerSimChange(function (success) {
        console.log('Android SimDetect => registerSIMChangeEvent success', success);
        subject.next(success);
        subject.complete();
      }, function (error) {
        console.log('Android SimDetect => registerSIMChangeEvent error', error);
        subject.next(error);
        subject.complete();
      });
    } else if (this.constant.getPlatform().toLowerCase() == this.constant.val_ios) {

    }

    return subject.asObservable();
  }

  checkSIMBinding() {
    var subject = new Subject<any>();
    if (this.constant.getPlatform().toLowerCase() == this.constant.val_android) {
      cordova.plugins.simdetect.getSharedPreferences(function (success) {
        console.log('Android SimDetect => getSharedPreferences success', success);
        subject.next(success);
        subject.complete();
      }, function (error) {
        console.log('Android SimDetect => getSharedPreferences error', error);
        subject.next(error);
        subject.complete();
      });
    } else if (this.constant.getPlatform().toLowerCase() == this.constant.val_ios) {

    }

    return subject.asObservable();
  }


  setSharedPreferences(prefObj) {
    var subject = new Subject<any>();
    if (this.constant.getPlatform().toLowerCase() == this.constant.val_android) {
      cordova.plugins.simdetect.setSharePreferences(prefObj, function (success) {
        console.log('Android SimDetect => setSharedPreferences success', success);
        subject.next(success);
        subject.complete();
      }, function (error) {
        console.log('Android SimDetect => setSharedPreferences error', error);
        subject.next(error);
        subject.complete();
      });
    } else if (this.constant.getPlatform().toLowerCase() == this.constant.val_ios) {

    }

    return subject.asObservable();
  }

  isSimAvailableIos() {
    var subject = new Subject<any>();
    cordova.plugins.simdetect.isSimAvailableIos(function (success) {
      console.log('iOS SimDetect => isSimAvailable success', success);
      subject.next(success);
      subject.complete();
    }, function (error) {
      console.log('iOS SimDetect => isSimAvailable error', error);
      subject.next(error);
      subject.complete();
    });
    return subject.asObservable();
  }

  authenticateBiometric(title): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.storage.getLocalStorage(this.constant.key_localStorage_biometricRegistered) != this.constant.val_localStorage_Y) {
        Fingerprint.registerBiometricSecret({
          title: title,
          // description: "Scan your fingerprint please",
          secret: "psbApp",
          invalidateOnEnrollment: true,
          // confirmationRequired: true,
          disableBackup: true, // always disabled on Android
        }, () => {
          {
            console.log('psbApp value');
            if (this.constant.getPlatform() == this.constant.val_ios) {
              Fingerprint.loadBiometricSecret({
                title: title,
                disableBackup: true, // always disabled on Android
              }, (secret) => {
                console.log('psbApp value 1');
                this.storage.setLocalStorage(this.constant.key_localStorage_biometricRegistered, this.constant.val_localStorage_Y);
                resolve(true);
              }, (error) => {
                console.log('psbApp value 2');
                resolve(error);
              });
            }
            else {
              console.log('psbApp value 3');
              this.storage.setLocalStorage(this.constant.key_localStorage_biometricRegistered, this.constant.val_localStorage_Y);
              resolve(true);
            }

          }
        }, (error) => {
          console.log('psbApp value 4');
          resolve(error);
        });
      } else if (this.storage.getLocalStorage(this.constant.key_localStorage_biometricChanged) == this.constant.val_localStorage_Y) {
        var error = { code: -113 };
        resolve(error);
      } else {
        console.log('psbApp value 5');
        Fingerprint.loadBiometricSecret({
          title: title,
          disableBackup: true, // always disabled on Android
        }, (secret) => {
          console.log('secret value', secret);
          resolve(true);
        }, (error) => {
          console.log('psbApp value 6');
          if (error.code == -113) {
            //Biometric secret not found
            this.storage.setLocalStorage(this.constant.key_localStorage_biometricChanged, this.constant.val_localStorage_Y);
          }
          resolve(error);
        });
      }

    })
  }


  checkIfBiometricAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);

      function isAvailableSuccess(result) {
        /*
        result depends on device and os.
        iPhone X will return 'face' other Android or iOS devices will return 'finger'
        */
        resolve({ available: true, result: result });
        // subject.complete();
      }

      function isAvailableError(error) {
        // 'error' will be an object with an error code and message
        resolve(error);
        // subject.complete();
      }
    });
    // return subject.asObservable();
  }

  checkForRootedDevice(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.dataService.isCordovaAvailable) {
        IRoot.isRooted(successCallback, failureCallback);
        function successCallback(rooted) {
          console.log('Is Device Rooted = ', rooted);
          if (rooted) {
            resolve({ rooted: true });
          } else {
            console.log("App access allowed on this device...");
            resolve({ rooted: false });
          }
        }

        function failureCallback(error) {
          console.error("Root Detection => The following error occurred: " + error);
          resolve(error);
        }
      } else {
        console.log("Cordova not available");
      }
    });
  }


  qrCodeScan(): Observable<any> {
    var subject = new Subject();
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        console.log(result);
        subject.next(result);
        subject.complete();
      },
      function (error) {
        subject.next(false);
        subject.complete();
      }, {
      showTorchButton: true,
    }
    );

    return subject.asObservable();
  }

  displayContents(err, text) {
    if (err) {
      console.log(err)
      // an error occurred, or the scan was canceled (error code `6`)
    } else {
      // The scan completed, display the contents of the QR code:
      alert(text);
    }
  }


  /************************Dignostic plugin call --Start ***************************/
  checkDeviceIMEIPermission(): Observable<any> {
    const subject = new Subject<any>();

    cordova.plugins.diagnostic.requestRuntimePermission(function (status) {
      console.log("inside check ====>", status);
      if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
        subject.next(true);
        subject.complete();
      } else {
        showToastMessage('Allow phone permission');
        subject.next(false);
        subject.complete();
      }

    }, function (error) {
      console.log(error);
      showToastMessage('Allow phone permission');
      subject.next(false);
      subject.complete();
    }, cordova.plugins.diagnostic.permission.READ_PRIVILEGED_PHONE_STATE);

    return subject.asObservable();
  }

  /************************Dignostic plugin call --End ***************************/


  /************************Device IMIE call --Start ***************************/
  getDeviceIMEI() {

    const myObj = this;
    try {
      window.plugins.imei.get(
        function (imei) {
          if (myObj.commonMethods.validateEmpty(imei)) { myObj.imeiNumber = ''; } else { myObj.imeiNumber = imei; }
          console.log('got imei: ' + myObj.imeiNumber);
        },
        function (error) {
          console.log(error);
          myObj.imeiNumber = '';
          console.log('error loading imei');
        }
      );
    }
    catch (e) {
      myObj.imeiNumber = '';
    }


  }

  getDeviceUUID() {
    var uuid = ""
    try {
      uuid = device.uuid;
      console.log(device.uuid);
    }
    catch (e) {
      uuid = "";
    }
    return uuid;
  }

  getDevicePlatform() {
    var platform = ""
    try {
      platform = device.platform;
      console.log(device.platform);
    }
    catch (e) {
      platform = "";
    }
    return platform;
  }

  getDeviceModel() {
    var model = ""
    try {
      model = device.model;
      console.log(device.model);
    }
    catch (e) {
      model = "";
    }
    return model;
  }

  getDeviceOsversion() {
    var version = ""
    try {
      version = device.version;
      console.log(device.version);
    }
    catch (e) {
      version = "";
    }
    return version;
  }


  /************************CodePush call --Start ***************************/
  checkCodePushUpdates() {
    $("#pageLoader").append("<p style='position: absolute;color: #fff;height: 100vh;width: 100%;top: 53%;text-align: center;'></p>");
    var self = this;
    window.codePush.sync(
      function (syncStatus) {
        switch (syncStatus) {
          // Result (final) statuses
          case SyncStatus.UPDATE_INSTALLED:
            self.loader.hideCodePushLoader()
            self.displayMessage("The update was installed successfully.");
            break;
          case SyncStatus.UP_TO_DATE:
            self.loader.hideCodePushLoader()
            self.displayMessage("The application is up to date.");
            break;
          case SyncStatus.UPDATE_IGNORED:
            // app.displayMessage("The user decided not to install the optional update.");
            self.loader.hideCodePushLoader()
            break;
          case SyncStatus.ERROR:
            self.loader.hideCodePushLoader()
            self.displayMessage("An error occured while checking for updates");
            break;

          // Intermediate (non final) statuses
          case SyncStatus.CHECKING_FOR_UPDATE:
            //console.log("Checking for update.");
            self.loader.showCodePushLoader("Checking for updates...")
            break;
          case SyncStatus.AWAITING_USER_ACTION:
            console.log("Alerting user.");
            break;
          case SyncStatus.DOWNLOADING_PACKAGE:
            console.log("Downloading package.");
            self.loader.showCodePushLoader("Downloading package...")
            break;
          case SyncStatus.INSTALLING_UPDATE:
            console.log("Installing update");
            self.loader.showCodePushLoader("Installing updates...")
            break;
        }
      },
      {
        installMode: InstallMode.ON_NEXT_RESTART, updateDialog: true
      },
      function (downloadProgress) {
        console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
      });
  }

  displayMessage(message) {
    navigator.notification.alert(
      message,
      null,
      'PSB',
      'OK');
  }

  /************************CodePush call --End ***************************/



  checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI] = 'WiFi';
    states[Connection.CELL_2G] = '2G';
    states[Connection.CELL_3G] = '3G';
    states[Connection.CELL_4G] = '4G';
    states[Connection.CELL] = 'generic';
    states[Connection.NONE] = 'Nonetwork';

    console.log('Connection type: ' + states[networkState]);
    return states[networkState];
  }

  //   checkPermissions() {
  //   let list = [
  //     this.permissions.SEND_SMS,
  //     this.permissions.READ_PHONE_STATE,
  //     this.permissions.RECEIVE_SMS,
  //     this.permissions.ACCESS_COARSE_LOCATION

  //   ];
  //   let _this = this;
  //   this.permissions.checkPermission(list, (status)=>{
  //     console.log("hasPermission",status);
  //     if( !status.hasPermission ) {

  //       _this.permissions.requestPermissions(
  //         list,
  //         (status)=> {
  //           console.log("requestPermissions",status);
  //           if( !status.hasPermission ) {
  //             // this.reqSmsPerm();
  //             // this.reqSimPerm();

  //            }  else {
  //             // _this.getSIMSettings();
  //            }
  //             // _this.checkGeoLoc();

  //           },
  //         (err)=>{
  //           console.warn('requestPermissions not turned on',err);
  //         });
  //     } else {
  //       // _this.getSimInfo();
  //       // _this.checkGeoLoc();
  //       // _this.getSIMSettings();
  //     }
  //   }, (err)=>{
  //     console.warn('hasPermission not turned on',err);
  //   });
  // }


  shareSheet(title, buttonLabel, returnFunction, subtitle?) {
    var options = {
      androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
      title: title,
      subtitle: subtitle, // supported on iOS only
      buttonLabels: buttonLabel,
      androidEnableCancelButton: true, // default false
      winphoneEnableCancelButton: true, // default false
      addCancelButtonWithLabel: 'Cancel',
      position: [20, 40], // for iPad pass in the [x, y] position of the popover
      destructiveButtonLast: true // you can choose where the destructive button is shown
    };
    // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
    // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
    window.plugins.actionsheet.show(options, returnFunction);
  };


  // cameraClick(successCallBack,errorCallBack){
  //   var cameraOptions ={
  //     quality: 50,
  //     destinationType: window.Camera.DestinationType.DATA_URL
  //   }
  //   navigator.camera.getPicture(successCallBack, errorCallBack, cameraOptions)
  // }

  cameraClick(): Observable<any> {
    var subject = new Subject();
    navigator.camera.getPicture(
      function (result) {
        console.log(result);
        subject.next(result);
        subject.complete();
      },
      function (error) {
        subject.next(false);
        subject.complete();
      }, {
      quality: 50,
      destinationType: window.Camera.DestinationType.DATA_URL,
      correctOrientation: true
    }
    );

    return subject.asObservable();
  }

  _openCamera(): Observable<any> {
    var subject = new Subject();
    navigator.camera.getPicture(
      function (result) {
        console.log("result" + result);
        subject.next(result);
        subject.complete();
      },
      function (error) {
        subject.next(false);
        subject.complete();
      }, {
      quality: 50,
      destinationType: window.Camera.DestinationType.FILE_URI,
      correctOrientation: true
    }
    );

    return subject.asObservable();
  }

  openCamera(): Promise<any> {
    this.dataService.imageUploadSelected = true;
    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    return new Promise((resolve, reject) => {
      navigator.camera.getPicture((result) => {
        console.log(result);
        resolve(result);
      }, (error) => {
        console.error('error', error);
        reject(error)
      }, {
        quality: 50,
        destinationType: window.Camera.DestinationType.FILE_URI,
        correctOrientation: true
      });
      // return subject.asObservable();
    });
  }


  openCameraGallery(): Promise<any> {
    this.dataService.imageUploadSelected = true;
    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    return new Promise((resolve, reject) => {
      navigator.camera.getPicture(
        function (result) {
          console.log("getPicture result =>");
          console.log(result);
          resolve(result);
        },
        function (error) {
          console.log("getPicture error =>");
          console.log(error);
          reject(error);
        }, {
        quality: 50,
        destinationType: window.Camera.DestinationType.FILE_URI,
        sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true
      });
    });
  }

  // cameraSuccess(value){
  //   console.log(value);
  // }

  // cameraError(er){
  //   console.log(er);
  // }


  // fetchGallery() {
  //   var self =  this;
  //   console.log("inside fetch gallery===>");
  //   window.imagePicker.hasReadPermission(
  //     function(result) {
  //       console.log("inside fetch gallery===>",result);
  //       if(!result){
  //         window.imagePicker.requestReadPermission();
  //       }
  //       else{
  //         self.openGallery();
  //       }
  //   })

  // }

  openGallery(successCallBack, errorCallBack) {
    window.imagePicker.getPictures(successCallBack, errorCallBack, {
      // if no title is passed, the plugin should use a sane default (preferrably the same as it was, so check the old one.. there are screenshots in the marketplace doc)
      maximumImagesCount: 1,
      title: 'Select pix',
      message: 'Pick max 1 items', // optional default no helper message above the picker UI
      // be careful with these options as they require additional processing
      //width: 400,
      //quality: 80
      outputType: window.imagePicker.OutputType.BASE64_STRING
    }
    );
  }

  openInAppBrowser(link) {
    cordova.InAppBrowser.open(link, '_blank', 'location=no');
  }

  getDeviceContactsAndroid(): Observable<any> {
    var specialRegex = /[^A-Z a-z0-9]/;
    var self = this;
    var subject = new Subject<any>();
    self.loader.showLoader();
    try {
      navigator.contactsPhoneNumbers.list(function (contacts) {
        console.log(contacts.length + ' contacts found');
        console.log(contacts);
        var phoneNo;
        var allContactList = [];
        for (var i = 0; i < contacts.length; i++) {
          var tempPhoneNumberArray = [];
          if (contacts[i].phoneNumbers != null) {
            contacts[i].phoneNumbers.forEach(element => {
              if (element.type == 'MOBILE') {
                let contactObj = {};
                var tempContNo = element.number;
                var newtempContNo = tempContNo.replace(/[^A-Z0-9]/ig, "");
                // newtempContNo = newtempContNo.substring(newtempContNo.length - 8)
                if (tempPhoneNumberArray.length > 0 && !tempPhoneNumberArray.includes(newtempContNo) && i != 0 && newtempContNo.length >= 8) {
                  if (contacts[i].displayName != null) { contactObj['custName'] = contacts[i].displayName; }
                  contactObj['mobileNo'] = newtempContNo;
                  // contactObj['isPSBRegister'] = 'N';
                  // contactObj['type'] = "M";
                  if(!specialRegex.test(contactObj['custName'])){
                    allContactList.push(contactObj);
                  }
                  phoneNo = i == 0 ? newtempContNo : phoneNo + "," + newtempContNo;
                }
                else if (tempPhoneNumberArray.length == 0 && newtempContNo.length >= 8) {
                  if (contacts[i].displayName != null) { contactObj['custName'] = contacts[i].displayName; }
                  contactObj['mobileNo'] = newtempContNo;
                  // contactObj['isPSBRegister'] = 'N';
                  // contactObj['type'] = "M";
                  console.log(newtempContNo);
                  if(!specialRegex.test(contactObj['custName'])){
                    allContactList.push(contactObj);
                  }
                  phoneNo = i == 0 ? newtempContNo : phoneNo + "," + newtempContNo;
                }

                if (phoneNo) tempPhoneNumberArray = self.commonMethods.validateEmpty(phoneNo) ? phoneNo : phoneNo.split(",");
              }
            });
          }
        }

        var allContact = {
          phoneNo: phoneNo,
          allContacts: allContactList
        };
        self.loader.hideLoader();
        subject.next(allContact);
        subject.complete();
      }, function (error) {
        self.loader.hideLoader();
        console.error(error);
      });

    } catch (error) {
      self.loader.hideLoader();
    }

    return subject.asObservable();
  }

  getDeviceContactsIos(): Observable<any> {
    var specialRegex = /[^A-Z a-z0-9]/;
    var self = this;
    var subject = new Subject<any>();
    self.loader.showLoader();
    try {
      navigator.contactsPhoneNumbers.list(function (contacts) {
        console.log(contacts.length + ' contacts found');
        console.log(contacts);
        var phoneNo;
        var allContactList = [];
        for (var i = 0; i < contacts.length; i++) {
          var tempPhoneNumberArray = [];
          if (contacts[i].phoneNumbers != null) {
            contacts[i].phoneNumbers.forEach(element => {
              let contactObj = {};
              var tempContNo = element.number;
              var newtempContNo = tempContNo.replace(/[^A-Z0-9]/ig, "");
              if (tempPhoneNumberArray.length > 0 && !tempPhoneNumberArray.includes(newtempContNo) && i != 0 && newtempContNo.length >= 8) {
                if (contacts[i].displayName != null) { contactObj['custName'] = contacts[i].displayName; }
                contactObj['mobileNo'] = newtempContNo;
                if(!specialRegex.test(contactObj['custName'])){
                  allContactList.push(contactObj);
                }
                phoneNo = i == 0 ? newtempContNo : phoneNo + "," + newtempContNo;
              }
              else if (tempPhoneNumberArray.length == 0 && newtempContNo.length >= 8) {
                if (contacts[i].displayName != null) { contactObj['custName'] = contacts[i].displayName; }
                contactObj['mobileNo'] = newtempContNo;
                console.log(newtempContNo);
                if(!specialRegex.test(contactObj['custName'])){
                  allContactList.push(contactObj);
                }
                phoneNo = i == 0 ? newtempContNo : phoneNo + "," + newtempContNo;
              }

              if (phoneNo) tempPhoneNumberArray = self.commonMethods.validateEmpty(phoneNo) ? phoneNo : phoneNo.split(",");
            });
          }
        }

        var allContact = {
          phoneNo: phoneNo,
          allContacts: allContactList
        };
        self.loader.hideLoader();
        subject.next(allContact);
        subject.complete();
      }, function (error) {
        self.loader.hideLoader();
        console.error(error);
      });

    } catch (error) {
      self.loader.hideLoader();
    }

    return subject.asObservable();
  }

  isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }

  checkContactPermission(): Observable<any> {
    var self = this;
    var subject = new Subject<any>();

    cordova.plugins.diagnostic.isContactsAuthorized(function (authorized) {
      if (!authorized) {
        cordova.plugins.diagnostic.requestContactsAuthorization(function (status) {
          if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
            subject.next("0");
            subject.complete();
          } else if (status == cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS) {
            subject.next("1");
            subject.complete();
          } else {
            subject.next("2");
            subject.complete();
          }
        }, function (error) {
          subject.next(false);
          subject.complete();
        });
      } else {
        subject.next("0");
        subject.complete();
      }
    }, function (error) {
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

  // checkContactPermissionIos(): Observable<any> {
  //   var subject = new Subject<any>();
  //   cordova.plugins.diagnostic.getContactsAuthorizationStatus(function(status) {
  //     console.log('status', status);
  //     if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
  //       console.log("Contacts use is authorized");
  //     } else if (status === cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED) {
  //       cordova.plugins.diagnostic.requestContactsAuthorization(function(status) {
  //         if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
  //             console.log("Contacts use is authorized");
  //             subject.next(true);
  //             subject.complete();
  //         } else {
  //           console.log("1 Contacts use is not authorized");
  //           subject.next(false);
  //           subject.complete();
  //         }
  //       }, function(error){
  //           console.error(error);
  //           subject.next(false);
  //           subject.complete();
  //       });
  //     } else {
  //       console.log("2 Contacts use is not authorized");
  //       subject.next(false);
  //       subject.complete();
  //     }
  //   }, function(error){
  //       console.error("The following error occurred: "+error);
  //       subject.next(false);
  //       subject.complete();
  //   });

  //   return subject.asObservable();
  // }

  openDatePicker(mode, date, minDate?, maxDate?): Observable<any> {
    console.log("openDatePicker called...");
    console.log('mode', mode);
    console.log('date', date);
    console.log('minDate', minDate);
    console.log('maxDate', maxDate);

    var self = this;
    var subject = new Subject<any>();
    if (this.dataService.isCordovaAvailable) {
      cordova.plugins.DateTimePicker.show(
        {
          mode: mode,
          date: date,
          minDate: minDate,
          maxDate: maxDate,
          android: {
            is24HourView: false
          },
          success: function (date) {
            subject.next(date);
            subject.complete();
          },
          error: function (err) {
            console.error('Error opening date picker ', err)
            subject.next(false);
            subject.complete();
          }
        });
    }
    return subject.asObservable();
  }

  /**
    * Get transaction ID based on platform type
    */
  getTransactionId() {
    var subject = new Subject<any>();
    if (this.dataService.isCordovaAvailable) {
      if (this.constant.getPlatform().toLowerCase() == this.constant.val_android) {
        cordova.plugins.npciAndroidPlugin.generateTransactionId("PSB", (transactionId) => {
          console.log("getTransactionId Success => ", transactionId);
          subject.next(transactionId);
        }, (error) => {
          console.log("getTransactionId Error => ", error);
          subject.next(false);
        });
      } else if (this.constant.getPlatform().toLowerCase() == this.constant.val_ios) {
        let paramObj = {
          "txnIdIdent": "PSB"
        }
        cordova.plugins.npciIosPlugin.getTransactionId(paramObj, (transactionId) => {
          console.log("getTxnId Success = ", transactionId);
          subject.next(transactionId);
        }, (e) => {
          console.log("getTxnId Error = ", e);
          subject.next(false);
        });
      }
    } else {
      // Remove this else condition after testing
      setTimeout(() => {
        subject.next("PSB0071abe236ce403eaaa16c0cf545f80c");
      }, 200)
    }
    // subject.complete();
    return subject.asObservable();
  }

  pickImage() {
    var subject = new Subject<any>();
    window.imagePicker.getPictures(function (results) {
      for (var i = 0; i < results.length; i++) {
        // self.cropImage(results[i]);
        subject.next(results[i]);
        subject.complete();
        console.log('Image URI: ' + results[i]);
      }
    }, function (error) {
      subject.next(false);
      subject.complete()
      console.log('Error: ' + error);
    }, {
      maximumImagesCount: 1,
      quality: 50
    });
    return subject.asObservable();
  }

  checkImagePickerReadPermission() {
    var subject = new Subject<any>();
    window.imagePicker.hasReadPermission(
      function (result) {
        subject.next(result);
        subject.complete();
      }
    )
    return subject.asObservable();
  }

  // cropImage(imgPath) {
  //   var subject = new Subject<any>();
  //   plugins.crop(function success(newPath) {
  //     subject.next(newPath);
  //     subject.complete();
  //   }, function fail(e) {
  //     console.log("crop error ====> ",e);
  //     subject.next(false);
  //     subject.complete();
  //   }, imgPath, { quality: 50 });
  //   return subject.asObservable();
  // }
  cropImage(imgPath): Promise<any> {
    return new Promise((resolve, reject) => {
      plugins.crop((result) => {
        console.log(result);
        resolve(result);
      }, (error) => {
        console.error('error', error);
        reject(error)
      }, imgPath, { quality: 50 });
      // return subject.asObservable();
    });
  }

  _cropImage(imgPath) {
    var subject = new Subject<any>();
    plugins.crop(function success(newPath) {
      subject.next(newPath);
      subject.complete();
    }, function fail(e) {
      console.log("crop error ====> ", e);
      subject.next(false);
      subject.complete();
    }, imgPath, { quality: 50 });
    return subject.asObservable();
  }
  /**
   * Generate QR generic function
   */
  generateQRCode(txtType, qrText, correctLevel): Promise<any> {
    return new Promise((resolve, reject) => {
      cordova.plugins.qrcodejs.encode(txtType, qrText, (result) => {
        resolve(result);
      }, (error) => {
        console.error('Plugin service ===> Error generating qr code ', error);
        reject(error)
      }, { correctLevel: correctLevel ? correctLevel : this.constant.QRErrorCorrectLevel.L });
      // return subject.asObservable();
    });
  }

  isLocationEnabled(): Observable<any> {
    const subject = new Subject<any>();

    cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
      console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
      if (enabled) {
        console.log("Permission already granted...");
        subject.next(true);
        subject.complete();
      } else {
        //request permission coarse location
        // this.requestRuntimeLocationPermissions();
        subject.next(false);
        subject.complete();
      }
    }, function (error) {
      console.error("isLocationEnabled => The following error occurred: " + error);
      subject.next(false);
      subject.complete();
    });

    return subject.asObservable();
  }

  switchOnLocation() {
    cordova.plugins.diagnostic.switchToLocationSettings();
  }

  requestRuntimeLocationPermissions(): Observable<any> {
    const subject = new Subject<any>();
    cordova.plugins.diagnostic.requestRuntimePermissions(function (statuses) {
      console.log("requestRuntimePermissions => Success ", statuses);
      for (var permission in statuses) {
        switch (statuses[permission]) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            console.log("Permission granted to use " + permission);
            subject.next(true);
            subject.complete();
            break;
          case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
            console.log("Permission to use " + permission + " has not been requested yet");
            subject.next(false);
            subject.complete();
            break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            console.log("Permission denied to use " + permission + " - ask again?");
            subject.next(false);
            subject.complete();
            break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            console.log("Permission permanently denied to use " + permission + " - guess we won't be using it then!");
            //show modal to allow location
            subject.next(true);
            subject.complete();
            break;
        }
      }
    }, function (error) {
      console.error("requestRuntimePermissions => The following error occurred: " + error);
      subject.next(true);
      subject.complete();
    }, [
      cordova.plugins.diagnostic.permission.ACCESS_FINE_LOCATION,
      cordova.plugins.diagnostic.permission.ACCESS_COARSE_LOCATION
    ]);
    return subject.asObservable();
  }


  getSendSMSIos(): Observable<any> {
    const subject = new Subject<any>();
    let _this = this;

    window['plugins'].SMSHandler(function (result) {
      console.log("getSendSMSIos result", result);
      subject.next(true);
      subject.complete();
    }, function (error) {
      console.log("getSendSMSIos error", error);
      _this.dataService.activeSimCount = 0;
      subject.next(false);
      subject.complete();
    });
    return subject.asObservable();
  }

  playUPIMogoSuccessTone(isCreateVPA?:boolean) {
    if (this.dataService.isCordovaAvailable) {
      let src = '';
      if(this.dataService.platform.toLowerCase() == this.constant.val_android) {
        src = isCreateVPA ? cordova.file.applicationDirectory + 'www/assets/audio/UPI_Mogo.mp3' : cordova.file.applicationDirectory + 'www/assets/audio/UPI_Mogo_1sec.mp3';
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        src = isCreateVPA ? decodeURI(cordova.file.applicationDirectory) + 'www/assets/audio/UPI_Mogo.mp3' : decodeURI(cordova.file.applicationDirectory) + 'www/assets/audio/UPI_Mogo_1sec.mp3';
        src = src.replace('file://', '');
      } else {
        console.log("Unknown platform...");
      }

      console.log('src => ');
      console.log(src);

      var myMedia = new Media(src, function () {
        console.log('Media Play success: ');
      }, function (e) {
        console.log('Media Error: ');
        console.log(e);
        console.log(e.message);
      });

      console.log('myMedia');
      console.log(myMedia);
      myMedia.play();

      // myMedia.setVolume('1.0');
    }
  }

  checkScreenMirroring() {
    let subject = new Subject<any>();
    cordova.plugins.ScreenMirrorDetectIosPlugin.callAppLaunchMethod({}, (data) => {
      console.log("ScreenMirrorDetectIosPlugin Success = ");
      console.log(data);
      subject.next(data);
      subject.complete();
    }, (error) => {
      console.log("ScreenMirrorDetectIosPlugin Error = ");
      console.log(error);
      subject.next(error);
      subject.complete();
    });

    return subject.asObservable();
  }


  enableSmartIntent(enableIntent){
    window.plugins.launchmyapp.setIntentEnabled({enableIntent:enableIntent}, (d) => {
      console.log('setIntent Success => ', d);
    }, (e) => {
      console.log('setIntent Error => ', e);
    });
  }
}
