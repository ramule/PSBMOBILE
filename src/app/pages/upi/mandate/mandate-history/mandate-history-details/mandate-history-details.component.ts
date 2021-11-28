import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app.constant';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { UPIBankAccount } from '../../../../../models/account-detail-model';
import { NpciAndroidService } from '../../../../../services/npci-android.service';
import { NpciIosService } from '../../../../../services/npci-ios.service';
import { UPIMandateService } from '../../upi-mandate/upi-mandate/upi-mandate-service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { Subject } from 'rxjs';

declare var cordova: any;

@Component({
  selector: 'app-mandate-history-details',
  templateUrl: './mandate-history-details.component.html',
  styleUrls: ['./mandate-history-details.component.scss']
})

export class MandateHistoryDetailsComponent implements OnInit {
  mandateHistoryDetails:any;
  favoriteName:any;
  favoriteVpa:any;
  popupData: any = {};
  isFavorite = false;
  mandatePause: boolean = false;
  popupMsg: any;
  VPAAccountDetails: any;
  selectedMandate: any;
  pauseUnpauseMsg: any;

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  constructor( private router:Router, public DataService: DataService, private location: Location, private http : HttpRestApiService, private localStorage : LocalStorageService, private constant : AppConstants, private commonMethod : CommonMethods,private benificiaryService : BenificiaryService, private ngZone : NgZone, private translatePipe: TranslatePipe, private npciIosService: NpciIosService, private npciAndroidService: NpciAndroidService, private upiMandateService: UPIMandateService, private loaderService: pageLoaderService) { }
  
  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.mandateHistoryDetails = this.DataService.mandateHistoryDetails;
    console.log('this.mandateHistoryDetails => ');
    console.log(this.mandateHistoryDetails);
    this.favoriteName = this.mandateHistoryDetails?.TYPE == 'DR' ? this.mandateHistoryDetails.payeeName : this.mandateHistoryDetails.payerName,
    this.favoriteVpa = this.mandateHistoryDetails?.TYPE == 'DR' ? this.mandateHistoryDetails.payeeAddr : this.mandateHistoryDetails.payerAddr
    history.pushState({}, 'mandateHistory', this.location.prepareExternalUrl("mandateHistory"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName){
    this.DataService.routeWithNgZone(routeName);
    // this.router.navigateByUrl('/'+routeName);
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
            case this.constant.upiserviceName_ADDBENIFICIARY:
              this.DataService.fetchUPIbenificiaryLists = true;
              if (response.msg) {
                this.ngZone.run(() => {
                  this.DataService.information = response.msg;
                  this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
                  this.DataService.primaryBtnText = this.translatePipe.transform('OK');
                  this.commonMethod.openPopup('div.popup-bottom.show-common-info');
                })
              }
              break;
              case this.constant.upiserviceName_PAUSEMANDATE:
                this.mandatePause = !this.mandatePause;
                this.pauseUnpauseMsg = response.msg;
                this.showPopup('pauseUnpause-success');
                break;
              case this.constant.upiserviceName_UNPAUSEMANDATE:
                this.mandatePause = !this.mandatePause;
                this.pauseUnpauseMsg = response.msg;
                this.showPopup('pauseUnpause-success');
                break;
            default:
              console.log("default ", response.subActionId);
              break;
          }
        } else {
          
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

  
  /**
   * Api call for adding payee as favorite payee
   */
   addPayeeToFavorite() {
    this.closePopup('fav-popup');
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize(
      {
        isFavourite: favorite,
        payeeName: this.mandateHistoryDetails?.TYPE == 'DR' ? this.mandateHistoryDetails.payeeName : this.mandateHistoryDetails.payerName,
        nickName: this.mandateHistoryDetails?.TYPE == 'DR' ? this.mandateHistoryDetails.payeeName : this.mandateHistoryDetails.payerName,
        payeeVPA: this.mandateHistoryDetails?.TYPE == 'DR' ? this.mandateHistoryDetails.payeeAddr : this.mandateHistoryDetails.payerAddr
      });

    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, false, true, false);
    this.closePopup('fav-popup');
    this.UpiApiCall(reqParams);
  }

  
  /**
   * Download Image in desktop
   * @param name 
   * @param type 
   */
   downloadPdf() {
    if (this.DataService.isCordovaAvailable) {
      var self = this;
      //   var options = {
      //     documentSize: 'A4',
      //     type: 'base64'
      // };
      // The name of your file, note that you need to know if is .png,.jpeg etc
      var filename = "transaction_Details" + Date.now() + '.png';
      let section = document.querySelector('#transactionDtl');
      
      if(self.DataService.platform.toLowerCase() == self.constant.val_android) {
        self.commonMethod.savePDFInDevice(section,filename);
      } else if(self.DataService.platform.toLowerCase() == self.constant.val_ios){
        self.commonMethod.takeScreenshot();
      } else {
        console.log("Unknown Platform...");
      }
    }
  }

  /**
  * Share Receipt via available methods in device
  */
   shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "transaction_Details" + Date.now();
      let section = document.querySelector('#transactionDtl');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
      //   this.commonMethod.takeScreenshot();
      // } else {
      //   console.log("Unknown Platform...");
      // }
    }
  }

  goBack(){
    this.location.back();
  }

  showPauseUnpausePopup(popupName, mandate) {
    this.selectedMandate = mandate;
    if (this.mandatePause) {
      this.popupMsg = 'DO_YOU_WANT_TO_PAUSE_MANDATE_TO_PAYEE';
    } else {
      this.popupMsg = 'DO_YOU_WANT_TO_UNPAUSE_MANDATE_TO_PAYEE';
    }
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  hidePauseUnpausePopup(popupName) {
    this.mandatePause = !this.mandatePause;
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  pauseUnpauseMandate() {
    this.closePopup('pauseMandate');
    this.VPAAccountDetails = this.DataService.VPAAccountDetails;
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
        this.npciAndroidService.selectedMandateDetails.payerVPA = this.selectedMandate.payerAddr;
        this.npciAndroidService.selectedMandateDetails.payeeVPA = this.selectedMandate.payeeAddr;
        this.npciAndroidService.selectedMandateDetails.txnAmount = this.selectedMandate.txnAmount;
        this.npciAndroidService.selectedMandateDetails.payeeName = this.selectedMandate.payeeName;
        this.npciAndroidService.selectedMandateDetails.txnId = this.selectedMandate.txnId;
      } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
        this.npciIosService.selectedMandateDetails.payerVPA = this.selectedMandate.payerAddr;
        this.npciIosService.selectedMandateDetails.payeeVPA = this.selectedMandate.payeeAddr;
        this.npciIosService.selectedMandateDetails.txnAmount = this.selectedMandate.txnAmount;
        this.npciIosService.selectedMandateDetails.payeeName = this.selectedMandate.payeeName;
        this.npciIosService.selectedMandateDetails.txnId = this.selectedMandate.txnId;
      } else {
        console.log("Unknown platform...");
      }
      
      if (accountDetails.ifsc.includes("PSIB")) {
        this.DataService.preApprovedFlowIdentifier = "activeViewPauseUnpauseMandate";
        this.DataService.preApprovedBankName = accountDetails.bankName;
        this.DataService.preApprovedAccNo = accountDetails.maskedAccountNumber;
        this.DataService.preApprovedAmount = this.selectedMandate.amount;
        this.DataService.mandatePauseFlag = this.mandatePause;
        this.DataService.preApprovedPreviousPageUrl = this.router.url;
        this.router.navigateByUrl('/transactionPin');
      } else {
        this.callNpciLibrary(accountDetails, this.constant.val_npci_flow_pauseUnpauseMandate);
      }
    }
  }

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
              let reqParams = this.upiMandateService.pauseUnpauseMandate(NPCIResponse, this.mandatePause, this.selectedMandate);
                this.UpiApiCall(reqParams);
            // } else if (flowName == this.constant.val_npci_flow_pauseUnpauseMandate_android) {
            //   this.mandatePause = !this.mandatePause;
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
              let reqParams = this.upiMandateService.pauseUnpauseMandate(NPCIResponse, this.mandatePause, this.selectedMandate);
              this.UpiApiCall(reqParams);
            } else {
              console.log("NPCI flow cancelled...");
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

  viewInvoice(url) {
    if (!this.DataService.isCordovaAvailable) window.open(url);
    else cordova.InAppBrowser.open(url, '_blank', 'location=no');
  }
}
