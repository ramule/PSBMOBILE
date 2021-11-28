import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import * as moment from 'moment';
import { PluginService } from 'src/app/services/plugin-service';

@Component({
  selector: 'app-self-transfer-success',
  templateUrl: './self-transfer-success.component.html',
  styleUrls: ['./self-transfer-success.component.scss']
})
export class SelfTransferSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName': 'RECEIPT',
    'footertype': 'none'
  }
  selfTransReceiptResponse: any;
  isFavorite = false;
  information = "";
  favPayeeList:any;
  benficiaryListData:any;
  activeTabName: string = "VPA";

  constructor(public DataService: DataService,
    private router: Router,
    private commonMethod: CommonMethods,
    private location: Location,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private benificiaryService: BenificiaryService,
    private ngZone : NgZone,
    private translatePipe : TranslatePipe,
    private pluginService : PluginService,
    public constant: AppConstants) { }


  ngOnInit(): void {
    history.pushState({}, 'payUpi', this.location.prepareExternalUrl("payUpi"));
    this.DataService.fetchUPIbenificiaryLists = true;
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.headerdata);
    this.selfTransReceiptResponse = this.DataService.selfTransReceiptObj;
    this.selfTransReceiptResponse.responseParameter.txnTime = moment(this.selfTransReceiptResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm a');
    console.log('this.selfTransReceiptResponse =>');
    console.log(this.selfTransReceiptResponse);
    this.getBenificiaryRequest();
    console.log("Success Coming from = ", this.DataService.previousPageUrl);
    if(this.DataService.previousPageUrl == "transactionPin" || this.DataService.previousPageUrl == "selfTransferPayment") {
      if(this.selfTransReceiptResponse.status == '00'){
        this.pluginService.playUPIMogoSuccessTone();
      }
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
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({
      isFavourite: favorite, 
      payeeName: this.DataService.selfTransReceiptObj.payeeName, 
      nickName: this.DataService.selfTransReceiptObj.payeeName, 
      payeeVPA: this.DataService.selfTransReceiptObj.payeePaymentAddress
    });
    var isAccIFsc = true;
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, isAccIFsc, false, false);
    this.closePopup('fav-popup');
    this.UpiApiCall(reqParams);
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
  * Repeat Payment
  */
  repeatPayment() {
    this.router.navigateByUrl('/selfTransferPayment')
  }

  /**
   * 
   * @param routeName 
   */
  navigate(routeName: string) {
    this.router.navigateByUrl(routeName);
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
      var filename = "selfTransferRequest_" + Date.now() + '.png';
      let section = document.querySelector('#selftransfer');

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
      var filename = "selftransfer_" + Date.now();
      let section = document.querySelector('#selftransfer');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
      //   this.commonMethod.takeScreenshot();
      // } else {
      //   console.log("Unknown Platform...");
      // }
    }
  }

  /**
   * Raise Complaint
   */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: this.selfTransReceiptResponse.responseParameter.rrn, transactionID: this.selfTransReceiptResponse.responseParameter.txnId, complaintType: 'TRANSACTION',txnAmount:this.selfTransReceiptResponse.amount,payerAddress:this.selfTransReceiptResponse.payerPaymentAddress,payeeAddress:this.selfTransReceiptResponse.payeePaymentAddress,transactionDate:this.selfTransReceiptResponse.responseParameter.txnTime,refID:this.selfTransReceiptResponse.responseParameter.txnId});
    this.navigate('raiseComplaint');
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }

}
