import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppConstants } from 'src/app/app.constant';
import { UPIBankAccount } from 'src/app/models/account-detail-model';
import { Mandate } from 'src/app/models/mandate-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { NpciAndroidService } from 'src/app/services/npci-android.service';
import { NpciIosService } from 'src/app/services/npci-ios.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { PluginService } from 'src/app/services/plugin-service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { CollectEnterAmountService } from '../../../collect/collect-enter-amount/collect-enter-amount.service';
import { UPIMandateService } from '../upi-mandate/upi-mandate-service';
import { MyProfileService } from '../../../profile/my-profile/my-profile.service';
declare var cordova: any;
declare var showQR: any;
@Component({
  selector: 'app-upi-mandate-revoke-view-details',
  templateUrl: './upi-mandate-revoke-view-details.component.html',
  styleUrls: ['./upi-mandate-revoke-view-details.component.scss']
})
export class UpiMandateRevokeViewDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  mandateDetails: Mandate;
  mandateRevokeMsg = "";
  mandatePause = false;
  popupMsg = "";
  pauseUnpauseMsg = "";
  VPADetails: any;
  VPAAccountDetails: any;
  generateQR: any
  frequency: any

  constructor(private router: Router, 
    public DataService: DataService, 
    private location: Location, 
    private commonMethod: CommonMethods, 
    private npciAndroidService: NpciAndroidService, 
    private npciIosService: NpciIosService, 
    public constant: AppConstants, 
    private upiMandateService: UPIMandateService, 
    private localStorage: LocalStorageService, 
    private http: HttpRestApiService, 
    private loaderService: pageLoaderService, 
    private pluginService: PluginService, 
    private collectAmtService: CollectEnterAmountService, 
    private ngZone: NgZone, 
    private translatePipe: TranslatePipe,
    private myprofileservice: MyProfileService) { }

  ngOnInit(): void {
    showQR();
    history.pushState({}, this.DataService.previousPageUrl == "upiDashboard" ? "upiDashboard" : "upiMandate", this.location.prepareExternalUrl(this.DataService.previousPageUrl == "upiDashboard" ? "upiDashboard" : "upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.mandateDetails = this.DataService.acceptedMandate;
    this.frequency = this.mandateDetails.frequency;
    this.checkPauseMandate();
    this.mandatePause = this.mandateDetails.status == 'PAUSED';
    this.npciAndroidService.selectedMandateDetails = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    this.npciIosService.selectedMandateDetails = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    this.DataService.validateAddressResp = {};
    if (this.mandateDetails.initiatedBy == 'PAYER') {
      this.getVPADetails(this.mandateDetails.payeeAddress);
    } else if (this.mandateDetails.initiatedBy == 'PAYEE') {
      this.getVPADetails(this.mandateDetails.payeeAddress);
    }
  }

  goToPage(routeName) {
    if (routeName == 'modifyMandate') {
      this.DataService.pendingMandateWithPayer = this.mandateDetails;
      this.DataService.upiModifyMandateCommonURL = this.router.url;
    }
    this.DataService.routeWithNgZone(routeName);
  }

  executeMandate() {
    this.closePopup('executeMandate');
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      this.DataService.validateAddressResp = {};
      this.DataService.validateAddressResp.validatedVpa = this.mandateDetails.umn;
      this.DataService.validateAddressResp.MASKNAME = this.mandateDetails.payerName;
      var reqParams = this.collectAmtService.setCollectRequest({ amount: this.mandateDetails.amount, remarks: this.mandateDetails.remarks }, { expiryTime: '' }, { vpaDetails: { paymentAddress: this.mandateDetails.payeeAddress }, accountDetails: { custName: this.mandateDetails.payeeName, accNum: this.mandateDetails.payeeAccount, mcc: this.mandateDetails.merchantCode, ifsc: this.mandateDetails.payeeIfsc } }, transactionID, true);
      this.UpiApiCall(reqParams);
    });
  }


  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  revokeMandate() {
    if (this.DataService.getMandateInciatedBy(this.mandateDetails) == 'PAYEE') {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          var reqParams = this.upiMandateService.revokeMandateRequest(null, this.mandateDetails);
          this.UpiApiCall(reqParams);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          var reqParams = this.upiMandateService.revokeMandateRequest(null, this.mandateDetails);
          this.UpiApiCall(reqParams);
        });
      }
    } else {
      if (this.VPAAccountDetails.mbeba == 'N') {
        this.ngZone.run(() => {
          this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
          this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
      } else {
        let accountDetails = new UPIBankAccount().deserialize(this.VPAAccountDetails);
        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          this.npciAndroidService.selectedMandateDetails.payerVPA = this.mandateDetails.payerAddress;
          this.npciAndroidService.selectedMandateDetails.payeeVPA = this.mandateDetails.payeeAddress;
          this.npciAndroidService.selectedMandateDetails.txnAmount = this.mandateDetails.amount;
          this.npciAndroidService.selectedMandateDetails.payeeName = this.mandateDetails.payeeName;
          this.npciAndroidService.selectedMandateDetails.txnId = this.mandateDetails.txnId;
        } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
          this.npciIosService.selectedMandateDetails.payerVPA = this.mandateDetails.payerAddress;
          this.npciIosService.selectedMandateDetails.payeeVPA = this.mandateDetails.payeeAddress;
          this.npciIosService.selectedMandateDetails.txnAmount = this.mandateDetails.amount;
          this.npciIosService.selectedMandateDetails.payeeName = this.mandateDetails.payeeName;
          this.npciIosService.selectedMandateDetails.txnId = this.mandateDetails.txnId;
        } else {
          console.log("Unknown platform");
        }

        if (accountDetails.ifsc.includes("PSIB")) {
          this.DataService.preApprovedBankName = accountDetails.bankName;
          this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
          this.DataService.preApprovedAmount = this.mandateDetails.amount;
          this.DataService.preApprovedPreviousPageUrl = this.router.url;
          this.DataService.preApprovedFlowIdentifier = "revokeViewRevokeMandate";
          this.DataService.routeWithNgZone('transactionPin');
        } else {
          this.callNpciLibrary(accountDetails, this.constant.val_npci_flow_revokeMandate);
        }
      }
    }
  }

  getVPADetails(vpaAddress) {
    if (this.DataService.vpaAddressList.length > 0) {
      if (this.DataService.checkIfUPIIdExists(vpaAddress)) {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.paymentAddress == vpaAddress);
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      } else {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.default == 'Y');
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }
      this.DataService.VPAAccountDetails = this.VPAAccountDetails;
    }
  }

  /**
  * Call NPCI Library
  * @param accountData 
  */
  callNpciLibrary(accountData, flowName) {
    console.log("calling npci library...");
    console.log('accountData', accountData);
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.androidStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            /**
            * set cred data in api
            */
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              if (flowName == this.constant.val_npci_flow_revokeMandate_android) {
                var reqParams = this.upiMandateService.revokeMandateRequest(NPCIResponse, this.mandateDetails);
                this.UpiApiCall(reqParams);
              } else if (flowName == this.constant.val_npci_flow_pauseUnpauseMandate_android) {
                var reqParams = this.upiMandateService.pauseUnpauseMandate(NPCIResponse, this.mandatePause, this.mandateDetails);
                this.UpiApiCall(reqParams);
              }
            } else if (flowName == this.constant.val_npci_flow_pauseUnpauseMandate_android) {
              this.mandatePause = !this.mandatePause;
            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, flowName, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              if (flowName == this.constant.val_npci_flow_revokeMandate) {
                let reqParams = this.upiMandateService.revokeMandateRequest(NPCIResponse, this.mandateDetails);
                this.UpiApiCall(reqParams);
              } else if (flowName == this.constant.val_npci_flow_pauseUnpauseMandate) {
                let reqParams = this.upiMandateService.pauseUnpauseMandate(NPCIResponse, this.mandatePause, this.mandateDetails);
                this.UpiApiCall(reqParams);
              }
              else if (flowName == this.constant.val_npci_flow_pauseUnpauseMandate) {
                this.mandatePause = !this.mandatePause;
              } else {
                console.log("ELSE flowName = ", flowName);
              }
            } else {
              console.log("NPCI Flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.DataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }



  showPopup(popupName, event) {
    if (this.mandatePause) {
      this.popupMsg = 'DO_YOU_WANT_TO_PAUSE_MANDATE_TO_PAYEE';
    } else {
      this.popupMsg = 'DO_YOU_WANT_TO_UNPAUSE_MANDATE_TO_PAYEE';
    }
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }


  hidePopup(popupName) {
    this.mandatePause = !this.mandatePause;
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  /**
  * Common Api Call for pending request 
  * @param request 
  */
  UpiApiCall(request) {
    this.closePopup('revokeMandate');
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.declineMandateResp = response;
      if (response.status == "00") {
        this.ngZone.run(() => {
          switch (response.subActionId) {
            case this.constant.upiserviceName_REVOKEMANDATE:
              this.mandateRevokeMsg = response.responseParameter.msg;
              console.log('upiserviceName_REVOKEMANDATE ', JSON.stringify(response));
              this.openPopup('revoke-success');
              break;
            case this.constant.upiserviceName_FUNDSTRANSFER:
              this.DataService.executeMandateResp = response;
              this.DataService.executeMandateResp.payeeAccount = this.mandateDetails.payeeAccount;
              this.goToPage('upiExecuteMandateSuccess')
              break;
            case this.constant.upiserviceName_PAUSEMANDATE:
              this.pauseUnpauseMsg = response.msg;
              this.openPopup('pauseUnpause-success');
              break;
            case this.constant.upiserviceName_UNPAUSEMANDATE:
              this.pauseUnpauseMsg = response.msg;
              this.openPopup('pauseUnpause-success');
              break;
            default:
              break;
          }
        })
      } else {
        if (response.subActionId == this.constant.upiserviceName_PAUSEMANDATE || response.subActionId == this.constant.upiserviceName_PAUSEMANDATE) {
          this.mandatePause = !this.mandatePause;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * common close Popup
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  /**
   * Open in app browser 
   * @param url 
   */
  viewInvoice(url) {
    if (!this.DataService.isCordovaAvailable) window.open(url);
    else cordova.InAppBrowser.open(url, '_blank', 'location=no');
  }

  checkPauseMandate() {
    $('#customSwitch1').prop("checked", false); //TODO : set value true if already paused mandate else false
  }
  // createdByMe and initiatedBy payee = > Payee
  pauseUnPauseMandate() {
    this.closePopup('pauseMandate');
    if (this.VPAAccountDetails.mbeba == 'N') {
      this.ngZone.run(() => {
        this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
        this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
        this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      })
    } else {
      let accountDetails = new UPIBankAccount().deserialize(this.VPAAccountDetails);
      if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.npciAndroidService.selectedMandateDetails.payerVPA = this.mandateDetails.payerAddress;
        this.npciAndroidService.selectedMandateDetails.payeeVPA = this.mandateDetails.payeeAddress;
        this.npciAndroidService.selectedMandateDetails.txnAmount = this.mandateDetails.amount;
        this.npciAndroidService.selectedMandateDetails.payeeName = this.mandateDetails.payeeName;
        this.npciAndroidService.selectedMandateDetails.txnId = this.mandateDetails.txnId;
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.selectedMandateDetails.payerVPA = this.mandateDetails.payerAddress;
        this.npciIosService.selectedMandateDetails.payeeVPA = this.mandateDetails.payeeAddress;
        this.npciIosService.selectedMandateDetails.txnAmount = this.mandateDetails.amount;
        this.npciIosService.selectedMandateDetails.payeeName = this.mandateDetails.payeeName;
        this.npciIosService.selectedMandateDetails.txnId = this.mandateDetails.txnId;
      } else {
        console.log("Unknown platform...");
      }
      if (accountDetails.ifsc.includes("PSIB")) {
        this.DataService.preApprovedFlowIdentifier = "revokeViewPauseUnpauseMandate";
        this.DataService.preApprovedBankName = accountDetails.bankName;
        this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
        this.DataService.preApprovedAmount = this.mandateDetails.amount;
        this.DataService.mandatePauseFlag = this.mandatePause;
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.DataService.createdMandate = this.mandateDetails;
        this.DataService.mandatePauseFlag = this.mandatePause;
        this.DataService.routeWithNgZone('transactionPin');
      } else {
        this.callNpciLibrary(accountDetails, this.constant.val_npci_flow_pauseUnpauseMandate);
      }
    }
  }


  goToBack() {
    // this.router.navigateByUrl("/upiMandate");
    this.DataService.routeWithNgZone(this.DataService.previousPageUrl);
  }

  /**
   * Dynamic QR Code Generation
   * @param vpaDetails 
   */
  generateQRCode(download?: boolean, share?: boolean) {
    if (this.DataService.isCordovaAvailable) {
      let encodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.mandateDetails.umn, amt: this.mandateDetails.amount, remarks: this.mandateDetails.remarks, validityStartDate: this.mandateDetails.validityStart, validityEndDate: this.mandateDetails.validityEnd, toPayee: this.mandateDetails.payeeAddress, recur: this.frequency });
      this.myprofileservice.getUserLocation();
      var reqParams = this.myprofileservice.getGenSigParam(encodeText);
      
      this.http.callBankingAPIService(reqParams, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
        console.log('success', data);
        let profileResponseData = data.responseParameter.upiResponse;
        if (data.responseParameter.opstatus == "00" && profileResponseData.status == "00") {
          //success handler
          console.log('profileResponseData => ', profileResponseData);
          switch (profileResponseData.subActionId) {
            case this.constant.upiserviceName_GENERATEQRSIGNATURE:
              let qrSignature = profileResponseData.responseParameter.RESULT;
              console.log("SETDEFAULTVPA response handling...");
              let qrCodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.mandateDetails.umn, amt: this.mandateDetails.amount, remarks: this.mandateDetails.remarks, validityStartDate: this.mandateDetails.validityStart, validityEndDate: this.mandateDetails.validityEnd, toPayee: this.mandateDetails.payeeAddress, recur: this.frequency, signature: qrSignature });
              this.pluginService.generateQRCode('TEXT_TYPE', qrCodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
                // setTimeout(() => {
                //   if (download) {
                //     this.QRDownload(base64EncodedQRImage);
                //   } else if (share) {
                //     this.shareQRCode(base64EncodedQRImage);
                //   } else {
                    this.generateQR = base64EncodedQRImage;
                    this.commonMethod.openPopup('div.popup-bottom.show-qr-code');
                //   }
                // })
              }, (error) => {
                console.error('Error generating qr code ', error);
              })
              break;
          }
        }
      }, error => {
        console.log("ERROR!", error);
      });
      // this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
      //   if (download) {
      //     this.QRDownload(base64EncodedQRImage);
      //   } else if (share) {
      //     this.shareQRCode(base64EncodedQRImage);
      //   }
      //   else {
      //     this.generateQR = base64EncodedQRImage;
      //     this.openPopup('show-qr-code');
      //   }
      // }, (error) => {
      //   console.error('Error generating qr code ', error);
      // })
    }
  }


  /**
   * Download QR Code
   * @param base64Image 
   */
  QRDownload() {
    // var filename = "qrCode" + "_" + Date.now() + '.png';
    //   this.loaderService.hideLoader();
    //   // this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success');
    //   var block = base64Image.split(";");
    //   var dataType = block[0].split(":")[1];// In this case "image/png"
    //   var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
    //   // this.commonMethod.savebase64AsImageFile(filename, realData, dataType);
    //   var msgKey = this.translatePipe.transform("QR_DOWNLOADED_SUCCESSFULLY");
    //   this.commonMethod.savebase64AsImageFile(filename, realData, dataType,msgKey,'success');

    // First we get our section to save from dom
    let section = document.querySelector('#QRContainer');
    var filename = "qrCode" + "_" + Date.now() + '.png';
    // We pass that section to html2Canvas
    console.log(section);
    this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
      this.loaderService.hideLoader();
      //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success'); 
      var block = base64Image.split(";");
      var dataType = block[0].split(":")[1];// In this case "image/png"
      var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
      this.commonMethod.closePopup('div.popup-bottom.show-qr-code');
      var msgKey = this.translatePipe.transform("QR_DOWNLOADED_SUCCESSFULLY");
      this.commonMethod.savebase64AsImageFile(filename, realData, dataType, msgKey, 'success');
    });
  }

  /**
   * Share QR Code 
   * @param base64Image 
   */
  shareQRCode() {
    if (this.DataService.isCordovaAvailable) {
      // First we get our section to save from dom
      let section = document.querySelector('#QRContainer');
      var filename = "qrCode" + "_" + Date.now();
      // We pass that section to html2Canvas
      console.log(section);
      this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
        this.loaderService.hideLoader();
        //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success'); 
        // var block = base64Image.split(";");
        // var dataType = block[0].split(":")[1];// In this case "image/png"
        // var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
        // this.commonMethod.closePopup('div.popup-bottom.show-qr-code');
        // var msgKey = this.translatePipe.transform("QR_DOWNLOADED_SUCCESSFULLY");
        this.commonMethod.shareImage(filename, base64Image);
      });
      // this.loaderService.hideLoader();
      // var filename = "QRCode_" + Date.now() + '.png';
      // this.commonMethod.shareImage(filename, base64Image);
    }
  }

  viewMandateHistory(){
    this.DataService.umn = this.mandateDetails.umn;
    this.router.navigateByUrl('/mandateHistory');
  }
}
