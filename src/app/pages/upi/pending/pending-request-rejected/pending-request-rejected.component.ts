import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { PendingWithMe } from 'src/app/models/pending-request.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { PendingReqService } from '../pending-request/pending-request.service';
import * as moment from 'moment';
declare var showToastMessage:any;
@Component({
  selector: 'app-pending-request-rejected',
  templateUrl: './pending-request-rejected.component.html',
  styleUrls: ['./pending-request-rejected.component.scss']
})
export class PendingRequestRejectedComponent implements OnInit {
  rejectResp:any;
  pendingWithMe : PendingWithMe;
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  }
  isFavorite = false;
  information: any;
  benficiaryListData: any;
  favPayeeList: any[];
  activeTabName: string = "VPA";
  constructor(private router:Router, public DataService: DataService,private commonMethod:CommonMethods,private localStorage : LocalStorageService,private http: HttpRestApiService,public constant: AppConstants,private pendingReqService : PendingReqService,private location : Location, private benificiaryService : BenificiaryService) {}

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.rejectResp = this.DataService.pendingReqRejectResp;
    this.rejectResp.responseParameter.txnTime = moment(this.rejectResp.responseParameter.txnTime).format('dd MMM yyyy, hh:mm a');
    this.pendingWithMe = this.DataService.pendingWithMe;
    history.pushState({}, 'pendingRequestUpi', this.location.prepareExternalUrl("pendingRequestUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName){
    this.DataService.routeWithNgZone(routeName);
  }

  /**
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite(){
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary:AddBenificiary = new AddBenificiary().deserialize({isFavourite:favorite,payeeName:this.pendingWithMe.payeeName,nickName:this.pendingWithMe.payeeName,payeeVPA:this.pendingWithMe.payeeAddress});
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

  getFavoritePayee() {
    if(this.DataService.favPayeeList.length > 0){
      this.isFavorite = this.DataService.isFavoritePayee(this.pendingWithMe.payeeAddress);
    }
  }

  /**
   * Share Receipt via available methods in device
   */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "prending_request_sucess_" + Date.now();
      let section = document.querySelector('#pendingReject');
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
      var filename = "prending_request_sucess_" + Date.now() + '.png';
      let section = document.querySelector('#pendingReject');

      if(self.DataService.platform.toLowerCase() == self.constant.val_android) {
        self.commonMethod.savePDFInDevice(section,filename);
      } else if(self.DataService.platform.toLowerCase() == self.constant.val_ios){
        self.commonMethod.takeScreenshot();
      } else {
        console.log("Unknown Platform...");
      }
    } 
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  openPopup(popup){
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }
}
