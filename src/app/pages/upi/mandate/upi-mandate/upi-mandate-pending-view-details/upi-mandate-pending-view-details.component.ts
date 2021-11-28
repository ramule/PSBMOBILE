import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { UPIMandateService } from '../upi-mandate/upi-mandate-service';
import { MyProfileService } from '../../../profile/my-profile/my-profile.service';
declare var showQR: any;

@Component({
  selector: 'app-upi-mandate-pending-view-details',
  templateUrl: './upi-mandate-pending-view-details.component.html',
  styleUrls: ['./upi-mandate-pending-view-details.component.scss']
})
export class UpiMandatePendingViewDetailsComponent implements OnInit {
  revokeMandateForm: FormGroup;
  headerdata = {
    'headerType': 'TitleCloseScanQr',
    'titleName': 'VIEW_DETAILS',
    'footertype': 'none'
  }
  pendingMandateWithPayer: Mandate;
  mandateRevokeMsg = "";
  VPADetails: any;
  VPAAccountDetails: any;
  generateQR: any;
  frequency: any;

  constructor(private router: Router, 
    public DataService: DataService, 
    private location: Location, 
    private commonMethod: CommonMethods, 
    private localStorage: LocalStorageService, 
    private http: HttpRestApiService, 
    public constant: AppConstants, 
    private upiMandateService: UPIMandateService, 
    private npciIosService: NpciIosService, 
    private npciAndroidService: NpciAndroidService, 
    private loaderService: pageLoaderService, 
    private ngZone: NgZone, 
    private translatePipe: TranslatePipe, 
    private pluginService: PluginService,
    private myprofileservice: MyProfileService) { }

  ngOnInit(): void {
    showQR();
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.pendingMandateWithPayer = this.DataService.pendingMandateWithPayer;
    this.frequency = this.pendingMandateWithPayer.frequency;
    this.npciAndroidService.selectedMandateDetails = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    this.npciIosService.selectedMandateDetails = { txnId: '', payerVPA: '', payeeVPA: '', txnAmount: '', payeeName: '' };
    if (this.pendingMandateWithPayer.initiatedBy == 'PAYER') {
      this.getVPADetails(this.pendingMandateWithPayer.payerAddress);
    } else if (this.pendingMandateWithPayer.initiatedBy == 'PAYEE') {
      this.getVPADetails(this.pendingMandateWithPayer.payeeAddress);
    }
  }

  goToPage(routeName) {
    if (routeName == 'modifyMandate') {
      this.DataService.upiModifyMandateCommonURL = this.router.url;
    }
    this.DataService.routeWithNgZone(routeName);
  }

  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  revokeMandate() {
    this.closePopup('revokeMandate');
    if (this.DataService.getMandateInciatedBy(this.pendingMandateWithPayer) == 'PAYEE') {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          var reqParams = this.upiMandateService.revokeMandateRequest(null, this.pendingMandateWithPayer);
          this.UpiApiCall(reqParams);
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          this.DataService.payeeRevokeTransId = transactionId;
          var reqParams = this.upiMandateService.revokeMandateRequest(null, this.pendingMandateWithPayer);
          this.UpiApiCall(reqParams);
        });
      }
    }
    else {
      if (this.VPAAccountDetails.mbeba == 'N') {
        this.ngZone.run(() => {
          this.DataService.information = this.translatePipe.transform('UPI_PIN_NOT_SET');
          this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        })
      } else {
        let accountDetails = new UPIBankAccount().deserialize(this.VPAAccountDetails);
        console.log('this.VPAAccountDetails');
        console.log(this.VPAAccountDetails);
        if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
          this.npciAndroidService.selectedMandateDetails.payerVPA = this.pendingMandateWithPayer.payerAddress;
          this.npciAndroidService.selectedMandateDetails.payeeVPA = this.pendingMandateWithPayer.payeeAddress;
          this.npciAndroidService.selectedMandateDetails.txnAmount = this.pendingMandateWithPayer.amount;
          this.npciAndroidService.selectedMandateDetails.payeeName = this.pendingMandateWithPayer.payeeName;
          this.npciAndroidService.selectedMandateDetails.txnId = this.pendingMandateWithPayer.txnId;
        } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
          this.npciIosService.selectedMandateDetails.payerVPA = this.pendingMandateWithPayer.payerAddress;
          this.npciIosService.selectedMandateDetails.payeeVPA = this.pendingMandateWithPayer.payeeAddress;
          this.npciIosService.selectedMandateDetails.txnAmount = this.pendingMandateWithPayer.amount;
          this.npciIosService.selectedMandateDetails.payeeName = this.pendingMandateWithPayer.payeeName;
          this.npciIosService.selectedMandateDetails.txnId = this.pendingMandateWithPayer.txnId;
        } else {
          console.log("Unknown platform");
        }
        if (this.VPAAccountDetails.ifsc.includes("PSIB")) {
          let amount = this.pendingMandateWithPayer.amount.trim().replace(/[^.0-9]+/g, '');
          this.DataService.preApprovedBankName = accountDetails.bankName;
          this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
          this.DataService.preApprovedAmount = amount;
          this.DataService.preApprovedPreviousPageUrl = this.router.url;
          this.DataService.preApprovedFlowIdentifier = "pendingViewRevokeMandate";
          this.DataService.routeWithNgZone('transactionPin');
        } else {
          this.callNpciLibrary(accountDetails, this.constant.val_npci_flow_revokeMandate);
        }
      }
    }
  }


  /**
  * Call NPCI Library
  * @param accountData 
  */
  callNpciLibrary(accountData, flowIdentifier) {
    console.log("calling npci library...");
    console.log('accountData', accountData);
    this.loaderService.showLoader();
    if (window.hasOwnProperty('cordova')) {
      if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        let subject = new Subject<any>();
        this.loaderService.showLoader();
        // this.npciAndroidService.selectedFlow = this.constant.val_npci_approveMandate;
        //this.constant.val_npci_flow_acceptPendingRequest
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.npciAndroidService.androidStartCLLibrary(accountData, flowIdentifier, subject).subscribe((NPCIResponse) => {
            console.log('Android StartCLLibrary Success => ', NPCIResponse);
            /**
            * set cred data in api
            */
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              if (flowIdentifier == this.constant.val_npci_flow_revokeMandate) {
                var reqParams = this.upiMandateService.revokeMandateRequest(NPCIResponse, this.pendingMandateWithPayer);
                this.UpiApiCall(reqParams);
              }
            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.loaderService.showLoader();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          // this.npciIosService.transactionId = transactionId;
          this.npciIosService.txnId = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_revokeMandate, subject).subscribe((NPCIResponse) => {
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              /**
              * set cred data in api
              */
              if (flowIdentifier == this.constant.val_npci_flow_revokeMandate) {
                let reqParams = this.upiMandateService.revokeMandateRequest(NPCIResponse, this.pendingMandateWithPayer);
                this.UpiApiCall(reqParams);
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


  /**
  * Common Api Call for pending request 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.DataService.declineMandateResp = response;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_REVOKEMANDATE:
            this.mandateRevokeMsg = response.responseParameter.msg;
            console.log('upiserviceName_REVOKEMANDATE ', JSON.stringify(response));
            this.openPopup('revoke-success');

            break;
          default:
            break;
        }
      } else {

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


  getVPADetails(vpaAdress) {
    if (this.DataService.vpaAddressList.length > 0) {
      if (this.DataService.checkIfUPIIdExists(vpaAdress)) {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.paymentAddress == vpaAdress);
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      } else {
        this.VPADetails = this.DataService.vpaAddressList.find(vpa => vpa.default == 'Y');
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }
    }
  }

  goToBack() {
    this.DataService.routeWithNgZone("upiMandate");
  }

  /**
   * Dynamic QR Code Generation
   * @param vpaDetails 
   */
  generateQRCode(download?: boolean, share?: boolean) {
    if (this.DataService.isCordovaAvailable) {
      let encodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.pendingMandateWithPayer.umn, amt: this.pendingMandateWithPayer.amount, remarks: this.pendingMandateWithPayer.remarks, validityStartDate: this.pendingMandateWithPayer.validityStart, validityEndDate: this.pendingMandateWithPayer.validityEnd, toPayee: this.pendingMandateWithPayer.payeeAddress, recur: this.frequency })
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
              let qrCodeText = this.commonMethod.getCollectMandateScanQRString({ umn: this.pendingMandateWithPayer.umn, amt: this.pendingMandateWithPayer.amount, remarks: this.pendingMandateWithPayer.remarks, validityStartDate: this.pendingMandateWithPayer.validityStart, validityEndDate: this.pendingMandateWithPayer.validityEnd, toPayee: this.pendingMandateWithPayer.payeeAddress, recur: this.frequency, signature: qrSignature });
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
    this.DataService.umn = this.pendingMandateWithPayer.umn;
    this.router.navigateByUrl('/mandateHistory');
  }
}
