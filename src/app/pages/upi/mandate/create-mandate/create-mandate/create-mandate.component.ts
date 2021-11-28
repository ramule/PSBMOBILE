import { Location } from '@angular/common';
import { NgZone, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { ScanQrService } from '../../../../../services/ScanQr.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { DataService } from '../../../../../services/data.service';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import { CreateMandateService } from './create-mandate-service';
import { ScanQrRequestService } from '../../../../upi/scan-qr/scan-qr-code/scan-qr-request.service';
declare var mandate: any;
declare var cordova: any;
@Component({
  selector: 'app-create-mandate',
  templateUrl: './create-mandate.component.html',
  styleUrls: ['./create-mandate.component.scss']
})
export class CreateMandateComponent implements OnInit, OnDestroy {
  showFavPayeeLength = 10;
  showRecentPayeeLength = 10;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'CREATE_MANDATE',
    'footertype': 'none'
  }
  createMandateForm: FormGroup;
  showUserInfo = false;
  showMoreFav = false;
  showMoreRecentRequest = false;

  defaultVPAAccountDetails: any;
  recentPayeeReqList = [];
  favPayeeList = [];
  scanQrText: any;
  popupData: any = {};
  qrScanResult: any;

  constructor(private router: Router,
    public DataService: DataService,
    private location: Location,
    private pluginService: PluginService,
    private commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private createMandateService: CreateMandateService,
    private beneficiaryService: BenificiaryService,
    private scanQrRequestService: ScanQrRequestService,
    private translate: TranslatePipe,
    private scanQrService: ScanQrService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.DataService.fetchContactsFromDevice = false;
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.changeMessage(this.headerdata);
    this.DataService.upiSearchPayeeList = [];
    this.buildForm();
    this.validateAddressByVPAorMobNo();
    this.getBenificiaryList();
    this.DataService.contactPrevURL = this.router.url;
    // this.getFavPayeeList();
    // mandate();
  }

  /**
  * Form Creation
  */
  buildForm() {
    this.createMandateForm = new FormGroup({
      upiIdOrMobno: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])
    });
  };

  goToPage(routeName) {
    if (routeName == 'searchContactList') {
      this.DataService.contactPrevURL = this.router.url;
      this.DataService.fetchContactsFromDevice = true;
    } else {
      this.DataService.fetchContactsFromDevice = false;
    }
    // if(routeName == '')
    this.router.navigateByUrl('/' + routeName);
  }

/**
   * Get Recent & Favorite Collect Request List
   */
 getBenificiaryList() {
  this.beneficiaryService.getBenificiaryList().then((response: any) => {
    this.recentPayeeReqList = []
    response.recentBeneList.map((benificiary, index) => {
      if (benificiary.txnMode == "VPA") {
        this.recentPayeeReqList.push(benificiary);
      }
    });
    this.favPayeeList = this.DataService.favPayeeList;
    if (this.recentPayeeReqList.length > 10) {
      this.showMoreRecentRequest = true;
    }
    if (this.favPayeeList.length > 10) {
      this.showMoreFav = true;
    }
  });
}

  /**
   * Get Favorite Payee List
   */
  getFavPayeeList() {
    var req = this.createMandateService.setFavoritePayeeRequest();
    this.UpiApiCall(req);
  }

  /**
   * To check if User UPI Id or Mobile number is valid 
   */
  verify() {
    // this.formValidation.markFormGroupTouched(this.collectRecentReqForm);
    this.createMandateForm.markAllAsTouched();
    if (this.createMandateForm.valid) {
      let upiIdOrMobno = this.createMandateForm.get('upiIdOrMobno').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.createMandateService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        this.pluginService.getTransactionId().subscribe((transactionID) => {
          this.createMandateService.getUserLocation();
          var req = this.createMandateService.setValidateRequest(this.createMandateForm.value, this.defaultVPAAccountDetails, transactionID);
          this.UpiApiCall(req);
        });
      }
    }
  }

  validateVpa() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateVpaRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
  }

  /**
  * To check if User UPI Id or Mobile number is valid 
  */
  validateQrGST() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateQrRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
  }

  validateQrSign() {
    var req = this.scanQrRequestService.setValidateQrSignRequest(this.scanQrText);
    this.UpiApiCall(req);
  }

  validateGlobalQr() {
    var req = this.scanQrRequestService.setValidateGlobalQrRequest(this.scanQrText, this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails);
    this.UpiApiCall(req);
  }

  scanMandate() {
    if (this.defaultVPAAccountDetails) {
      var self = this;
      if (self.DataService.platform.toLowerCase() == this.constant.val_android) {
        cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
          switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              if (self.DataService.platform.toLowerCase() == this.constant.val_android) {
                cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: self.translate.transform(self.constant.QRCodeErrorDesc), pointQRMsg: self.translate.transform(self.constant.QRCodeDesc), scanGalleryMsg: self.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }, (QRDetals) => {
                  console.log('QRDetals Success => ', QRDetals);
                  self.scanQrText = JSON.parse(QRDetals.text);
                  let scanQrResponse = self.scanQrText.response
                  // alert(this.scanQrText);
                  this.qrScanResult = self.scanQrService.getQrResponse(scanQrResponse);
                  if (!this.qrScanResult) {
                    self.showPopup("inValidQrCode", "");
                  } else {
                    self.DataService.ScanQrCodeData = this.qrScanResult;
                    console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
                    if (self.DataService.ScanQrCodeData.sign) {
                      if (this.qrScanResult.qrPaymentAddress || this.qrScanResult.pa) {
                        self.validateVpa();
                        // self.goToPage('/createMandatePayment');
                      } else {
                        self.showPopup("inValidQrCode", "");
                      }
                    } else {
                      self.showPopup("insecure-qrcode", "");
                    }
                  }
                }, (e) => {
                  console.log("QRDetals Error => ", e)
                });
              }
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
              this.showPopup('enable-camera-permissions');
              return;
            default:
              break;
          }
        }, function (error) {
          console.error(error);
        });
      } else if (self.DataService.platform.toLowerCase() == this.constant.val_ios) {
        window['plugins'].qrscan.startCamera((data) => {
          console.log('qrscan success', data);
          console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
          if (data != "Cancelled") {
            //success handler
            if (data == "DENIED" || data == "Not Authorized") {
              //show popup to user to go to settings
              this.DataService.cameraPermissionGrantedIos = false;
              this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
            } else {
              this.scanQrText = data;
              this.validateQR();
            }
          } else {
            //failure handler
          }
        }, (error) => {
          console.log('qrscan error ', error);
        });
      } else {
        console.log("Unknown Platform");
      }
    } else {
      this.showPopup("noAccountLinkAlert", "");
    }
  }

  scanQRCode() {
    // this.scanQr.scanQRCode();
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    this.DataService.resetCreateMandateData();
    this.DataService.resetUpiPayData();
    if (this.defaultVPAAccountDetails) {
      var self = this;
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
          switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              console.log("Other data =>", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));

              cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }, (QRDetals) => {
                console.log('QRDetals Success => ', QRDetals);
                // ScanQR check condition
                this.scanQrText = JSON.parse(QRDetals.text);
                if (this.scanQrText.isValidQR == 'Y') {
                  this.validateQR();
                } else {
                  self.showPopup("inValidQrCode", this.scanQrText);
                }
              }, (e) => {
                console.log("QRDetals Error => ", e)
              });
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
              cordova.plugins.diagnostic.switchToSettings(function () {
                console.log("Successfully switched to Settings app");
              }, function (error) {
                console.error("The following error occurred: " + error);
              });
              return;
            default:
              break;
          }
        }, function (error) {
          console.error(error);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        window['plugins'].qrscan.startCamera((data) => {
          console.log('qrscan success', data);
          //data => upi://pay?pa=9029522110@psb&pn=ABC&cu=INR&mode=02&purpose=00&orgid=189999
          console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
          if (data != "Cancelled") {
            //success handler
            if (data == "DENIED" || data == "Not Authorized") {
              //show popup to user to go to settings
              this.DataService.cameraPermissionGrantedIos = false;
              this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
            } else {
              this.scanQrText = data;
              this.validateQR();
            }
          } else {
            //failure handler
          }
        }, (error) => {
          console.log('qrscan error ', error);
        });
      }
    } else {
      self.showPopup("noAccountLinkAlert", "");
    }
  }

  validateQR() {
    var self = this;
    let qrScanResult = "";
    if (self.DataService.platform.toLowerCase() == self.constant.val_android) {
      this.qrScanResult = self.scanQrService.getQrResponse(self.scanQrText.response);
    } else if (self.DataService.platform.toLowerCase() == self.constant.val_ios) {
      this.qrScanResult = self.scanQrService.getQrResponse(self.scanQrText);
    } else {
      console.log("Unknown platform...");
    }
    if (!this.qrScanResult) {
      self.showPopup("inValidQrCode", "");
    } else {
      self.DataService.ScanQrCodeData = this.qrScanResult;
      console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
      if (self.DataService.ScanQrCodeData.qrType == 'upiGlobal') {
        // Condition to check user enablement for UPI global
        self.validateGlobalQr();
      } else if (self.DataService.ScanQrCodeData.qrType == 'GST') {
        console.log("qrType=>", self.DataService.ScanQrCodeData.qrType);
        if (self.DataService.ScanQrCodeData.sign) {
          self.validateQrSign();
        } else {
          self.validateQrGST();
        }
      } else if (self.DataService.ScanQrCodeData.qrType == 'pay' || self.DataService.ScanQrCodeData.qrType == 'mandate' || self.DataService.ScanQrCodeData.qrType == 'collect' || self.DataService.ScanQrCodeData.qrType == 'BHARAT_QR') {
        if (self.DataService.ScanQrCodeData.sign) {
          if (self.DataService.ScanQrCodeData.qrPaymentAddress || this.DataService.ScanQrCodeData.pa) {
            self.validateQrSign();
            // self.goToPage('/createMandatePayment');
          } else {
            self.showPopup("inValidQrCode", "");
          }
        } else {
          self.showPopup("insecure-qrcode", "");
        }
        // if ((this.DataService.ScanQrCodeData.qrPaymentAddress || this.DataService.ScanQrCodeData.pa) && this.DataService.ScanQrCodeData.sign) {
        //   self.validateQrSign();
        //   // this.routeTo("/scanQRPayment");
        // } else {
        //   self.showPopup("inValidQrCode", "");
        // }
      }
    }
  }

  /**
   * Common Api Call for collect 
   * @param request 
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETDEFAULTVPA:
            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            this.pluginService.getTransactionId().subscribe((transactionID) => {
              this.createMandateService.getUserLocation();
              var req = this.createMandateService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, transactionID);
              this.UpiApiCall(req);
            });
          case this.constant.upiserviceName_VALIDATEADDRESS:
            // this.validateQrSign();
            // this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.showUserInfo = true;
            this.ngZone.run(() => {
              this.DataService.validateAddressResp = response.responseParameter;
            });
            if (this.qrScanResult) {
              // this.DataService.resetCreateMandateData();
              this.ngZone.run(() => {
                // if (this.qrScanResult.qrType == 'collect') {
                //   this.pluginService.getTransactionId().subscribe((transactionID) => {
                //     var req = this.scanQrRequestService.setValidateMandateRequest(transactionID);
                //     this.UpiApiCall(req);
                //   });
                // } else 
                // if (this.qrScanResult.qrType == 'mandate' || this.qrScanResult.qrType == 'collect') {
                //   this.DataService.createMandateObj.frequency = this.DataService.ScanQrCodeData.recur
                //   this.DataService.createMandateObj.startDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validitystart);
                //   this.DataService.createMandateObj.endDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validityend)
                //   this.DataService.createMandateObj.amount = this.DataService.ScanQrCodeData.am
                //   this.DataService.createMandateObj.validatedVpaAdress = this.DataService.ScanQrCodeData.pa;
                //   this.goToPage('/createMandatePayment');
                // } else {
                //   this.showUserInfo = false;
                //   this.DataService.validateAddressResp = '';
                //   this.showPopup("inValidQrCode", "");
                // }
                if (this.DataService.ScanQrCodeData.qrType == 'upiGlobal') {
                  this.goToPage("/internationalPaymentConfirmation");
                } else if (this.DataService.ScanQrCodeData.qrType == 'mandate' || this.DataService.ScanQrCodeData.qrType == 'collect') {
                  this.DataService.createMandateObj.frequency = this.DataService.ScanQrCodeData.recur
                  this.DataService.createMandateObj.startDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validitystart);
                  this.DataService.createMandateObj.endDate = this.commonMethod.convertNumToDate(this.DataService.ScanQrCodeData.validityend)
                  this.DataService.createMandateObj.amount = this.DataService.ScanQrCodeData.am
                  this.DataService.createMandateObj.validatedVpaAdress = this.DataService.ScanQrCodeData.pa;
                  this.goToPage('/createMandatePayment');
                } else {
                  this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
                  this.goToPage("/scanQRPayment");
                }
              })
            }
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            // this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.ngZone.run(() => {
              this.goToPage('/createMandatePayment');
            })
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
            if (this.DataService.ScanQrCodeData.qrType == 'GST') {
              this.validateQrGST();
            } else {
              this.validateVpa();
            }
            // this.routeTo("/scanQRPayment");
            break;
          case this.constant.upiserviceName_VALIDATEQR:
            this.DataService.selectedFlow = this.constant.val_npci_upiPayVpa;
            this.DataService.validateAddressResp = response.responseParameter;
            if (this.DataService.ScanQrCodeData.qrType == 'GST') {
              this.goToPage("/scanQRPayment");
            } else {
              this.validateVpa();
            }
            break;
          case this.constant.upiserviceName_VALIDATEGLOBALQR:
            this.validateQrSign();
            break;
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            // this.showPopup("inValidQrCode", "");
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            let response = data.responseParameter.upiResponse;
            this.showPopup("inValidSignature", response);
            // this.validateVpa();
            break;
          case this.constant.upiserviceName_VALIDATEQR:
            // this.showPopup("inValidQrCode", "");
            // this.validateQrSign();
            break;
          case this.constant.upiserviceName_VALIDATEGLOBALQR:
            // this.showPopup("inValidQrCode", "");
            // this.validateQrSign();
            break;
          default:
            this.ngZone.run(() => {
              this.DataService.errorMsg = response.msg;
              this.DataService.informationLabel = this.translate.transform('ERROR');
              this.DataService.primaryBtnText = this.translate.transform('OK');
              this.commonMethod.openPopup('div.popup-bottom.show-common-error')
            })
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  // ngAfterViewInit() {
  //   this.validateAddressByVPAorMobNo();
  // }

  /**
     * Get Default Vpa Adress/Account Details
     */
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }


  /**
   * Get Default Vpa AccountNo Details
   * @param array 
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }

  /**
   * Api call to Validate Upi Id using mobile number
   */
  validateAddressByVPAorMobNo() {
    if (this.DataService.deviceMobileNo) {
      var reqParams = this.createMandateService.setDefaultVPARequest(this.DataService.deviceMobileNo);
      this.UpiApiCall(reqParams);
    }
    if (this.DataService.upiValidatedVpaAdress) {
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        this.createMandateService.getUserLocation();
        var req = this.createMandateService.setValidateRequest({ upiIdOrMobno: this.DataService.upiValidatedVpaAdress }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    }
  }

  /**
 * show popup by popupName
 * @param popupName 
 * @param data 
 */
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  /**
 * Close popup by popupName
 * @param popupName 
 */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  /**
 * Navigate to the collect amount screen
 */
  proceed() {
    this.DataService.resetCreateMandateData();
    this.router.navigateByUrl('/createMandatePayment');
  }

  ngOnDestroy() {
    this.DataService.deviceMobileNo = "";
    this.DataService.upiValidatedVpaAdress = "";
  }

  /**
  * On cancel form will be reset
  */
  cancel() {
    this.showUserInfo = false;
    this.createMandateForm.reset();
  }

  searchContact(type) {
    if (type == 'recent') {
      this.DataService.upiSearchCollectPayeeList = this.recentPayeeReqList;
    } else {
      this.DataService.upiSearchCollectPayeeList = this.favPayeeList;
    }
    this.DataService.upiCollectsearchType = type;
    this.router.navigateByUrl('/collectSearchContact')
  }

  /**
  * This function is check if the user is valid vpa
  * @param payee 
  */
  validatePayee(type, payee) {
    var req;
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      this.createMandateService.getUserLocation();
      if (type == 'recent') {
        req = this.createMandateService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      } else {
        req = this.createMandateService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      }
      this.UpiApiCall(req);
    });
  }

  showMore(type) {
    if (type == 'recent') {
      this.showRecentPayeeLength = this.recentPayeeReqList.length;
    } else {
      this.showFavPayeeLength = this.favPayeeList.length;
    }
  }

  onClickYes() {
    if (this.DataService.ScanQrCodeData.qrType == 'GST') {
      this.validateQrGST();
    } else {
      this.validateVpa();
    }
  }
}
