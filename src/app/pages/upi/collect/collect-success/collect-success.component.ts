import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { CollectRecentReqService } from '../collect-recent-request/collect-recent-request.service';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import * as moment from 'moment';

declare var pdf:any;
declare var showToastMessage:any;
@Component({
  selector: 'app-collect-success',
  templateUrl: './collect-success.component.html',
  styleUrls: ['./collect-success.component.scss']
})
export class CollectSuccessComponent implements OnInit {
  headerdata = {
    // 'headerType': 'upiNonQrSuccessHeader',  
    'headerType': 'none',
    'sidebarNAv':'none',            
    'footertype':'none'
  };
  collectReceiptResponse:any;
  benficiaryListData:any;
  favPayeeList:any;
  isFavorite = false;
  activeTabName: string = "VPA";
  information ="";
  transactionTime:any;
  constructor( public DataService: DataService, private http: HttpRestApiService,public constant : AppConstants,private localStorage : LocalStorageService, private collectService : CollectRecentReqService,private commonMethod : CommonMethods, private router : Router,private location : Location, private benificiaryService : BenificiaryService) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.DataService.fetchUPIbenificiaryLists = true;
    history.pushState({}, 'collectRecentRequest', this.location.prepareExternalUrl("collectRecentRequest"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log('DataService.collectReceiptObj => ');
    console.log(this.DataService.collectReceiptObj);
    this.collectReceiptResponse = this.DataService.collectReceiptObj;
    this.transactionTime = this.collectReceiptResponse.responseParameter.txnTime;
    this.collectReceiptResponse.responseParameter.txnTime = moment(this.collectReceiptResponse.responseParameter.txnTime).format('DD MMM yyyy, hh:mm a');
    this.collectReceiptResponse.responseParameter.expiredDate = moment(this.collectReceiptResponse.responseParameter.expiredDate).format('DD MMM yyyy, hh:mm a');

    this.getBenificiaryRequest()
  }

  /**
 * Get Recent Collect Request List
 */
   getBenificiaryRequest() {
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.getBenficiaryListReq(this.constant.val_upi_benListType_ALL, this.constant.val_upi_ANY);
    this.UpiApiCall(reqParams);
  }

  getFavoritePayee(){
    if(this.DataService.favPayeeList.length > 0){
      this.isFavorite = this.DataService.isFavoritePayee(this.DataService.validateAddressResp.validatedVpa);
    }
  }

  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite(){
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary:AddBenificiary = new AddBenificiary().deserialize({isFavourite:favorite,payeeName:this.DataService.validateAddressResp.MASKNAME,nickName:this.DataService.validateAddressResp.MASKNAME,payeeVPA:this.DataService.validateAddressResp.validatedVpa});
    this.benificiaryService.getUserLocation();
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary,false,true,false);
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
              this.information = response.msg;
              this.DataService.fetchUPIbenificiaryLists = true
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
   * Share Receipt via available methods in device
   */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "collectRequest_" + Date.now();
      let section = document.querySelector('#collectSuccess');
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
      var filename = "collectRequest_" + Date.now() + '.png';
      let section = document.querySelector('#collectSuccess');
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
   * 
   * @param routeName 
   */
  navigate(routeName:string){
    if(routeName == 'pendingRequestUpi'){
      this.DataService.enablePendingWithPayerTab = true;
    }
    this.DataService.resetUpiCollectData();
    this.DataService.routeWithNgZone(routeName);
  }

  /**
   * Repeat Payment
   */
  repeatPayment(){
    this.navigate('collectAmount');
  }

  /**
   * Raise Complaint
   */
  raiseComplaint(){
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({rrn:this.collectReceiptResponse.responseParameter.rrn,transactionID:this.DataService.collectReceiptTransId,complaintType:'TRANSACTION',txnAmount:this.collectReceiptResponse.amount,payerAddress:this.collectReceiptResponse.vpaAddress,payeeAddress:this.collectReceiptResponse.selectedVpa.vpaDetails.paymentAddress,transactionDate:this.collectReceiptResponse.responseParameter.txnTime,refID:this.DataService.collectReceiptTransId });
    this.navigate('raiseComplaint');
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup){
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }
}
