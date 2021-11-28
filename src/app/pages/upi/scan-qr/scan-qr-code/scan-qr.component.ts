import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { PluginService } from '../../../../services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { ScanQrService } from '../../../../services/ScanQr.service';
import { ScanQrRequestService } from './scan-qr-request.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var cordova: any;
declare var showToastMessage: any;
declare var window: any;

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQrComponent implements OnInit {
  qrModel: any = {};
  popupData: any = {};
  FinalQR: any;
  BharatQRAryList = [];
  innerArray: any;
  addKeyArray: any[];
  addLengthArray: any[];
  addValueArray: any[];
  qrImage: any = "";
  croppedImageBase64 = "";
  information = "";
  defaultVPAAccountDetails: any;
  scanQrText: any;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Scan & Pay',
    'footertype': 'none'
  }
  constructor(public DataService: DataService,
    public pluginService: PluginService,
    public commonMethod: CommonMethods,
    public router: Router,
    private location: Location,
    private scanQrService: ScanQrService,
    private scanQrRequestService: ScanQrRequestService,
    private localStorage: LocalStorageService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private translate: TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    // this.DataService.vpaAddressList = this.DataService.processVPAlist([
    //   { "paymentAddress": "aishwarya06@psb", "default": "N", "limit": "50000", "accounts": [{ "mbeba": "Y", "isDefaultAccount": "Y", "credDLength": "4", "bankName": "Punjab & Sind Bank", "mcc": "0000", "credDType": "PIN", "debitFreezeStatus": "N", "atmDType": "NUM", "lastBalanceUpdate": "16-03-2021 01:15:01", "credSubType": "MPIN", "atmCredSubType": "ATMPIN", "ifsc": "PSIB0000606", "accType": "SAVINGS", "otpCredSubType": "OTP", "atmDLength": "4", "accNum": "06061000031054", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": "PIN", "active": "Y", "otpCredType": null, "defaultAccount": "true", "custName": "Aishwarya Nalawade", "balanceAmount": "21007.20", "maskedAccountNumber": "XXXXXXXXXX1054", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM" }], "frequency": null },
    //   { "paymentAddress": "npci@psb", "default": "N", "limit": "50000", "accounts": [{ "mbeba": "N", "isDefaultAccount": "N", "credDLength": "6", "bankName": "Mypsp2", "mcc": "0000", "credDType": "NUM", "debitFreezeStatus": null, "atmDType": "NUM", "lastBalanceUpdate": "NA", "credSubType": "MPIN", "atmCredSubType": "", "ifsc": "AABF0009009", "accType": "CURRENT", "otpCredSubType": "OTP", "atmDLength": "", "accNum": "857679479890125", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": "PIN", "active": "Y", "otpCredType": null, "defaultAccount": "true", "custName": "ABC", "balanceAmount": "4", "maskedAccountNumber": "XXXXXXXXXXX0125", "otpCredDLength": "6", "credType": "NUM", "otpCredDType": "NUM" }], "frequency": null }
    // ]);
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    // this.scanQR();
    this.scanQRCode();
  }

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
    } else {
      if (this.DataService.vpaAddressList.length > 0) {
        let vpaAddressListCopy = this.DataService.vpaAddressList
        vpaAddressListCopy.map((vpaAddress: any, index) => {
          if (index == 0) {
            vpaAddress.default = "Y";
          } else {
            vpaAddress.default = "N";
          }
        });
        let defaultVpaAccountArr = vpaAddressListCopy.find((vpaAddress) => { return vpaAddress.default == "Y" });
        if (defaultVpaAccountArr) {
          let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
          return {
            vpaDetails: defaultVpaAccountArr,
            accountDetails: accountDetails
          }
        }
      } else {
        this.showPopup("noAccountAvailable", "");
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

  displayContents(err, text) {
    if (err) {
      // an error occurred, or the scan was canceled (error code `6`)
    } else {
      // The scan completed, display the contents of the QR code:
      // alert(text);
    }
  }

  scanQRCode() {
    var self = this;
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestCameraAuthorization((status) => {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            cordova.plugins.QRCodeScannerPlugin.scan({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }, (QRDetals) => {
              console.log('QRDetals Success => ', QRDetals);
              this.scanQrText = JSON.parse(QRDetals.text);
              let qrScanResult = self.scanQrService.getQrResponse(this.scanQrText.response);
              if (!qrScanResult) {
                self.showPopup("inValidQrCode", "");
              } else {
                self.DataService.ScanQrCodeData = qrScanResult;
                console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
                if (self.DataService.ScanQrCodeData.sign) {
                  if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                    // self.validateVpa();
                    this.routeTo("/scanQRPayment");
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
        console.log("Other data => ", JSON.stringify({ invalidQRMsg: this.translate.transform(this.constant.QRCodeErrorDesc), pointQRMsg: this.translate.transform(this.constant.QRCodeDesc), scanGalleryMsg: this.translate.transform(this.constant.ScanGalleryDesc), recentPayees: '' }));
        if(data != "Cancelled") {
          //success handler
          if (data) {
            if (data == "DENIED" || data == "Not Authorized") {
            //show popup to user to go to settings
            this.DataService.cameraPermissionGrantedIos = false;
            this.commonMethod.openPopup('div.popup-bottom.enable-camera-permission');
            } else {
            this.scanQrText = data;
            let qrScanResult = self.scanQrService.getQrResponse(this.scanQrText);
            if (!qrScanResult) {
              self.showPopup("inValidQrCode", "");
            } else {
              self.DataService.ScanQrCodeData = qrScanResult;
              console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
              if (self.DataService.ScanQrCodeData.sign) {
                if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                  this.routeTo("/scanQRPayment");
                } else {
                  self.showPopup("inValidQrCode", "");
                }
              } else {
                self.showPopup("insecure-qrcode", "");
              }
            }
            }
          }
        } else {
          //failure handler
        }
      }, (error) => {
        console.log('qrscan error ', error);
      });
    } else {
      console.log("unknown platform");
    }
  }

  scanQR() {
    var self = this;
    this.pluginService.qrCodeScan().subscribe((result) => {
      console.log(result);
      this.scanQrText = result.text;
      // alert(this.scanQrText);
      let qrScanResult = self.scanQrService.getQrResponse(result.text);
      if (!qrScanResult) {
        self.showPopup("inValidQrCode", "");
      } else {
        self.DataService.ScanQrCodeData = qrScanResult;
        console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
        if (self.DataService.ScanQrCodeData.sign) {
          if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
            // self.validateVpa();
            this.routeTo("/scanQRPayment");
          } else {
            self.showPopup("inValidQrCode", "");
          }
        } else {
          self.showPopup("insecure-qrcode", "");
        }
      }
    });
    // this.DataService.ScanQrCodeData = self.scanQrService.getQrResponse(1);
  }

  /**
   * Select image from gallery and crop image for UPI and BharatOR code.
   */
  qrFrmGallery() {
    var self = this;
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      cordova.plugins.diagnostic.requestExternalStorageAuthorization(function (status) {
        switch (status) {
          case cordova.plugins.diagnostic.permissionStatus.GRANTED:
            self.pluginService.checkImagePickerReadPermission().subscribe((isPermissionAvailable) => {
              if (isPermissionAvailable) {
                self.pluginService.pickImage().subscribe((filePath) => {
                  self.pluginService.cropImage(filePath).then((fileUri) => {
                    if (fileUri) {
                      self.commonMethod.getQRDataFrmGalryImg(fileUri).then((result) => {
                        // alert(result);
                        let qrScanResult = self.scanQrService.getQrResponse(result);
                        if (!qrScanResult) {
                          self.showPopup("inValidQrCode", "");
                        } else {
                          self.DataService.ScanQrCodeData = qrScanResult;
                          console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
                          if (self.DataService.ScanQrCodeData.sign) {
                            if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                              // self.validateVpa();
                              this.routeTo("/scanQRPayment");
                            } else {
                              self.showPopup("inValidQrCode", "");
                            }
                          } else {
                            self.showPopup("insecure-qrcode", "");
                          }
                        }
                      });
                    }
                  });
                });
              }
            });
            break;
          // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
          //   window['imagePicker'].requestReadPermission();
          //   break;
          case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
            self.information = 'ENABLE_STORAGE_PERMISSION_MSG';
            setTimeout(() => {
              self.commonMethod.openPopup('div.popup-bottom.header-info');
            }, 100)
            // case cordova.plugins.diagnostic.permissionStatus.DENIED_ONCE:
            //   window['imagePicker'].requestReadPermission();
            //   break; self.commonMethod.openPopup('div.popup-bottom.header-info');
            break;
          default:
            break;
        }
      }, function (error) {
        console.error(error);
      });
    }
    else{
      self.pluginService.openCameraGallery().then((fileUri) => {
        self.pluginService.cropImage(fileUri).then((fileUri) => {
          if (fileUri) {
            self.commonMethod.getQRDataFrmGalryImg(fileUri).then((result) => {
              // alert(result);
              let qrScanResult = self.scanQrService.getQrResponse(result);
              if (!qrScanResult) {
                self.showPopup("inValidQrCode", "");
              } else {
                self.DataService.ScanQrCodeData = qrScanResult;
                console.log("DataService.ScanQrCodeData", self.DataService.ScanQrCodeData);
                if (self.DataService.ScanQrCodeData.sign) {
                  if (qrScanResult.qrPaymentAddress || qrScanResult.pa) {
                    // self.validateVpa();
                    this.routeTo("/scanQRPayment");
                  } else {
                    self.showPopup("inValidQrCode", "");
                  }
                } else {
                  self.showPopup("insecure-qrcode", "");
                }
              }
            });
          }
        },(err)=>{
          console.log(err);
        });
      },(err)=>{
        console.log(err);
      })
    }
    // window['imagePicker'].requestReadPermission();

  }

  /**
   * To check if User UPI Id or Mobile number is valid 
   */
  validateVpa() {
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.scanQrRequestService.getUserLocation();
      var req = this.scanQrRequestService.setValidateVpaRequest(this.DataService.ScanQrCodeData, this.defaultVPAAccountDetails, transactionID);
      this.UpiApiCall(req);
    });
  }

  validateQrSign() {
    var req = this.scanQrRequestService.setValidateQrSignRequest(this.scanQrText);
    this.UpiApiCall(req);
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log(data);
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.DataService.verifyAddressResp = response.responseParameter;
            // this.validateQrSign();
            this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.routeTo("/scanQRPayment");
            break;
          case this.constant.upiserviceName_VALIDATEQRSIGNATURE:
            this.DataService.selectedFlow = this.constant.val_npci_scanQrPay;
            this.routeTo("/scanQRPayment");
            break;
          // case this.constant.upiserviceName_GETBENIFICIARYLIST:
          //   let benficiaryList = response.responseParameter.beneficiaryList;
          //   this.recentPayeeReqList = []
          //   benficiaryList.map((benificiary, index) => {
          //     if (benificiary.txnMode == "PAY") {
          //       // this.recentPayeeReqList.push(benificiary);
          //     }
          //   });
          //   break;
          // case this.constant.upiserviceName_GETDEFAULTVPA:
          //   let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress
          //   // var req = this.payUpiRequestService.setValidateRequest({upiIdOrMobno:vpaAddress},this.defaultVPAAccountDetails);
          //   // this.UpiApiCall(req);
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            // showToastMessage(response.msg, "error");
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
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

  routeTo(location) {
    console.log('location', location);
    this.DataService.routeWithNgZone(location);
  }
}
