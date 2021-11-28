import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { DataService } from '../../../../services/data.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import * as moment from 'moment';
import { PluginService } from 'src/app/services/plugin-service';

declare var window: any;

@Component({
  selector: 'app-pay-upi-success',
  templateUrl: './pay-upi-success.component.html',
  styleUrls: ['./pay-upi-success.component.scss']
})
export class PayUpiSuccessComponent implements OnInit {
  headerdata = {
    // 'headerType': 'upiNonQrSuccessHeader',
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  }
  payReceiptResponse: any;
  isFavorite = false;
  information = "";
  favPayeeList:any;
  benficiaryListData:any;
  activeTabName: string = "VPA";

  constructor(public DataService: DataService,
    private router: Router,
    private translate: TranslatePipe,
    private http: HttpRestApiService,
    public constant: AppConstants,
    private localStorage: LocalStorageService,
    private commonMethod: CommonMethods,
    private benificiaryService: BenificiaryService,
    private pluginService:PluginService,
    private location: Location) { }

  ngOnInit(): void {
    history.pushState({}, 'payUpi', this.location.prepareExternalUrl("payUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    
    this.DataService.fetchUPIbenificiaryLists = true;
    this.commonMethod.closePopup('div.popup-bottom.show-common-error');
    this.DataService.changeMessage(this.headerdata);
    this.payReceiptResponse = this.DataService.payReceiptObj;
    this.payReceiptResponse.responseParameter.txnTime = moment(this.payReceiptResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm a');
    console.log('this.payReceiptResponse');
    console.log(this.payReceiptResponse);
    this.getBenificiaryRequest();
    
    console.log("Success Coming from = ", this.DataService.previousPageUrl);
    if(this.DataService.previousPageUrl == "transactionPin" || this.DataService.previousPageUrl == "payUpiConfirm") {
      if(this.payReceiptResponse.status == '00'){
        console.log("Playing success sound...");
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
  * Repeat Payment
  */
  repeatPayment() {
    this.router.navigateByUrl('/payUpiPayment')
  }

  /**
   * 
   * @param routeName 
   */
  navigate(routeName: string) {
      this.DataService.resetUpiPayData();
      this.DataService.verifyAddressResp = ''
      this.DataService.routeWithNgZone(routeName);
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
      var filename = "payRequest_" + Date.now() + '.png';
      console.log('filename', filename);
      let section = document.querySelector('#payUpi');

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
      var filename = "payRequest_" + Date.now();
      let section = document.querySelector('#payUpi');
      // if(this.DataService.platform.toLowerCase() == this.constant.val_android) {
        this.commonMethod.shareImageInDevice(section, filename);
      // } else if(this.DataService.platform.toLowerCase() == this.constant.val_ios){
        // this.commonMethod.takeScreenshot();
      // } else {
        // console.log("Unknown Platform...");
      // }
    }
  }

  /**
   * Raise Complaint
   */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: this.payReceiptResponse.responseParameter.rrn, transactionID: this.payReceiptResponse.payReceiptTransId, complaintType: 'TRANSACTION', txnAmount: this.payReceiptResponse.amount, payerAddress: this.payReceiptResponse.selectedVpa.vpaDetails.paymentAddress,payeeAddress:this.payReceiptResponse.payeeUpiAddress,transactionDate:this.payReceiptResponse.responseParameter.txnTime,refID:this.payReceiptResponse.payReceiptTransId });
    this.navigate('raiseComplaint');
  }


  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite() {
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({ isFavourite: favorite, payeeName: this.DataService.validateAddressResp.MASKNAME, nickName: this.DataService.validateAddressResp.MASKNAME, payeeVPA: this.DataService.validateAddressResp.validatedVpa });
    this.benificiaryService.getUserLocation();
    var isMMid = false, isAccIFsc = false, isVPA = false;
    if (this.DataService.verifyAddressResp.payType == "MMID") {
      isMMid = true;
    } else if (this.DataService.verifyAddressResp.payType == "BNK_ACT") {
      isAccIFsc = true;
    } else {
      isVPA = true;
    }
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, isAccIFsc, isVPA, isMMid);
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

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup) {
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }
}
