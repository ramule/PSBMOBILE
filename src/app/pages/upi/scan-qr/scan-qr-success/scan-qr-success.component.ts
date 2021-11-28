import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseComplaint } from '../../../../models/raise-complaint.model';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { CommonMethods } from '../../../../utilities/common-methods';
import { Location } from '@angular/common';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import * as moment from 'moment';
import { PluginService } from 'src/app/services/plugin-service';
declare var window: any;
declare var cordova: any;

@Component({
  selector: 'app-scan-qr-success',
  templateUrl: './scan-qr-success.component.html',
  styleUrls: ['./scan-qr-success.component.scss']
})
export class ScanQrSuccessComponent implements OnInit {
  headerdata = {
    'headerType': 'none',
    'titleName': 'Pay',
    'footertype': 'none'
  }
  payReceiptResponse: any;
  isFavorite = false;
  information = "";
  favPayeeList:any;
  benficiaryListData:any;
  QRScanData:any;
  activeTabName: string = "VPA";

  constructor(public DataService: DataService,
    private router: Router,
    private translate: TranslatePipe,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private localStorage: LocalStorageService,
    private commonMethod: CommonMethods,
    private pluginService: PluginService,
    private benificiaryService: BenificiaryService,
    private location: Location) { }


  ngOnInit(): void {
    let prevousUrl = this.DataService.omniUPIFlow   ? 'dashboardMobile' : 'upiDashboard';
    history.pushState({}, prevousUrl, this.location.prepareExternalUrl(prevousUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.DataService.fetchUPIbenificiaryLists = true;
    console.log("this.DataService.payReceiptObj", this.DataService.payReceiptObj)
    this.payReceiptResponse = this.DataService.payReceiptObj;
    this.QRScanData = this.DataService.ScanQrCodeData;
    this.payReceiptResponse.responseParameter.txnTime = moment(this.payReceiptResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm a');
    this.getBenificiaryRequest();
    this.closeIntent();
    console.log("Success Coming from = ", this.DataService.previousPageUrl);
    if(this.DataService.previousPageUrl == "transactionPin" || this.DataService.previousPageUrl == "scanQrConfirm") {
      if(this.payReceiptResponse.status == '00'){
        this.pluginService.playUPIMogoSuccessTone();
      }
    }
  }

  

  closeIntent(){
    if(this.DataService.isDeepLinkIntentCalled && this.DataService.platform.toLowerCase() == this.constant.val_android){
      var paramObj = {
        txnId: this.DataService?.payReceiptTransId ? this.DataService?.payReceiptTransId : '',
        responseCode: this.DataService.payReceiptObj?.status ? this.DataService.payReceiptObj?.status : '',
        rrnValue: this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        status: this.DataService.payReceiptObj?.status == '00' ? 'SUCCESS' : 'FAILURE',
        refId:  this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        appId: this.constant.val_app_pakage_name
      }
      console.log('paramObj ',paramObj)
      setTimeout(()=>{
        window.plugins.launchmyapp.setIntent(paramObj, (d) => {
          console.log('setIntent Success => ', d);
        }, (e) => {
          console.log('setIntent Error => ', e);
        });
      },2000)
    }
  }


  
  /**
   * 
   * @param routeName 
   */
   navigatePage(routeName: string) {
    if(this.DataService.isDeepLinkIntentCalled && this.DataService.platform.toLowerCase() == this.constant.val_android){
      var paramObj = {
        txnId: this.DataService?.payReceiptTransId ? this.DataService?.payReceiptTransId : '',
        responseCode: this.DataService.payReceiptObj?.status ? this.DataService.payReceiptObj?.status : '',
        rrnValue: this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        status: this.DataService.payReceiptObj?.status == '00' ? 'SUCCESS' : 'FAILURE',
        refId:  this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        appId: this.constant.val_app_pakage_name
      }
      window.plugins.launchmyapp.setIntent(paramObj, (d) => {
        console.log('setIntent Success => ', d);
      }, (e) => {
        console.log('setIntent Error => ', e);
      });
    }else{
      this.DataService.routeWithNgZone(routeName);
    }
  }
  /**
 * Get Recent Collect Request List
 */
   getBenificiaryRequest() {
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.getBenficiaryListReq(this.constant.val_upi_benListType_ALL, this.constant.val_upi_ANY);
    this.UpiApiCall(reqParams);
  }

  /**
  * Repeat Payment
  */
  repeatPayment() {
    this.DataService.routeWithNgZone('scanQRPayment');
  }

  /**
   * 
   * @param routeName 
   */
  navigate(routeName: string) {
    this.DataService.resetUpiPayData();
    if (this.DataService.isDeepLinkIntentCalled) {
      var paramObj = {
        TxnID: this.DataService.payReceiptObj?.payReceiptTransId ?  this.DataService.payReceiptObj?.payReceiptTransId : '',
        responseCode: this.DataService.payReceiptObj?.responseParameter?.responseCode ? this.DataService.payReceiptObj?.responseParameter?.responseCode : '',
        ApprovalRefNo: this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        Status: this.DataService.payReceiptObj?.responseParameter.status ? 'SUCCESS' : 'FAILURE',
        txnRef:  this.DataService.payReceiptObj?.responseParameter ? this.DataService.payReceiptObj.responseParameter.rrn : '',
        AppId: this.constant.val_app_pakage_name
      }
      window.plugins.launchmyapp.setIntent(paramObj, (d) => {
        console.log('setIntent Success => ', d);
      }, (e) => {
        console.log('setIntent Error => ', e);
      });
      this.router.navigateByUrl(routeName);
    } else {
      this.router.navigateByUrl(routeName);
    }
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
      var filename = "scanPayRequest_" + Date.now() + '.png';
      let section = document.querySelector('#scanQr');
      
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
      var filename = "scanPayRequest_" + Date.now();
      let section = document.querySelector('#scanQr');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
      //   this.commonMethod.takeScreenshot();
      // } else {
      //   console.log("Unknown Platform...");
      // }
    }
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }

  getFavoritePayee() {
    if (this.DataService.favPayeeList.length > 0) {
      this.isFavorite = this.DataService.isFavoritePayee(this.DataService.validateAddressResp.validatedVpa);
    }
  }

  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite() {
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({ isFavourite: favorite, payeeName: this.QRScanData.pn ? this.QRScanData.pn : this.QRScanData.qrMerchantName, nickName: this.QRScanData.pn ? this.QRScanData.pn : this.QRScanData.qrMerchantName , payeeVPA: this.QRScanData.pa ? this.QRScanData.pa : this.QRScanData.qrPaymentAddress });
    this.benificiaryService.getUserLocation();
    var isMMid = false, isAccIFsc = false, isVPA = false;
    if (this.QRScanData.pa || this.QRScanData.qrPaymentAddress) {
      isVPA = true;
    } else if (this.QRScanData.qrAccountNo && this.QRScanData.qrIfsc) {
      isAccIFsc = true;
    } else {
      isMMid = true;
    }
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, isAccIFsc, isVPA, isMMid);
    this.closePopup('fav-popup');
    this.UpiApiCall(reqParams);
  }

  downloadInvoice(url) {
    cordova.InAppBrowser.open(url, '_blank', 'location=no');
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
            this.information = response.msg;
            this.commonMethod.openPopup('div.popup-bottom.show-fav-info');
            break;
          case this.constant.upiserviceName_GETBENIFICIARYLIST:
            this.benficiaryListData = response.responseParameter.beneficiaryList;
            let benficiaryList = this.benficiaryListData;
            this.favPayeeList = [];
            benficiaryList.map((benificiary, index) => {
              if (benificiary.favourites == 'Y' && benificiary.txnMode == this.activeTabName) {
                this.favPayeeList.push(benificiary);
              }
            });
            this.DataService.favPayeeList = this.favPayeeList;
            this.getFavoritePayee();
            break;
          default:
            break;
        }
      } else {
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * Raise Complaint
   */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: this.payReceiptResponse.responseParameter.rrn, transactionID: this.DataService.payReceiptTransId, complaintType: 'TRANSACTION', txnAmount: this.payReceiptResponse.amount, payerAddress: this.payReceiptResponse.selectedVpa.vpaDetails.paymentAddress, payeeAddress: this.payReceiptResponse.payeeUpiAddress,transactionDate:this.payReceiptResponse.responseParameter.txnTime,refID:this.DataService.payReceiptTransId});
    this.navigate('raiseComplaint');
  }

}
