import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../../../../../app.constant';
import { AddBenificiary } from '../../../../../models/add-benificiary-model';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import * as moment from 'moment';

@Component({
  selector: 'upi-execute-mandate-success',
  templateUrl: './upi-mandate-execute-sucess.component.html',
  styleUrls: ['./upi-mandate-execute-sucess.component.scss']
})
export class ExecuteMandateSuccessComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'sidebarNAv':'none',
    'footertype':'none'
  } 
  isFavorite=false;
  mandateDetails:any;
  information ="";
  favPayeeList:any;
  benficiaryListData:any;
  activeTabName: string = "VPA";

  constructor(public DataService: DataService,private location : Location, private router : Router, private commonMethod : CommonMethods, private http: HttpRestApiService, private localStorage : LocalStorageService, public constant: AppConstants,private benificiaryService : BenificiaryService, private ngZone : NgZone, private translate : TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.DataService.fetchUPIbenificiaryLists = true;
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.mandateDetails = this.DataService.executeMandateResp;
    this.mandateDetails.responseParameter.txnTime = moment(this.mandateDetails.responseParameter.txnTime).format('DD MMM yyyy, hh:mm:ss a');
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

  getFavoritePayee() {
    if (this.DataService.favPayeeList.length > 0) {
      this.isFavorite = this.DataService.isFavoritePayee(this.DataService.validateAddressResp.validatedVpa);
    }
  }

  
  /**
   * Share Receipt via available methods in device
   */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "executeMandate_" + Date.now();
      let section = document.querySelector('#upiMandate');
      this.commonMethod.shareImageInDevice(section,filename);
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
      var filename = "executeMandate_" + Date.now() + '.png';
      let section = document.querySelector('#upiMandate');
      
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
   * Api call for adding payee as favorite payee
   */
  addPayeeToFavorite(){
    let mandateDetails = this.mandateDetails.responseParameter;
    this.isFavorite = !this.isFavorite;
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary:AddBenificiary = new AddBenificiary().deserialize({isFavourite:favorite,payeeName: this.DataService.acceptedMandate.payerName, nickName: this.DataService.acceptedMandate.payerName, payeeVPA: this.DataService.acceptedMandate.payerAddress});
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
            if(response.msg){
              // showToastMessage(response.msg, "success");
              this.ngZone.run(()=>{
                this.DataService.information = response.msg;
                this.DataService.informationLabel = this.translate.transform('INFORMATION');
                this.DataService.primaryBtnText = this.translate.transform('OK');
                this.commonMethod.openPopup('div.popup-bottom.show-common-info');
              })
            }
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
        this.ngZone.run(()=>{
          this.DataService.errorMsg = response.msg;
          this.DataService.informationLabel = this.translate.transform('ERROR');
          this.DataService.primaryBtnText = this.translate.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  close(){
    this.location.back();
  }

  closePopup(popup) {
    this.commonMethod.closePopup('div.popup-bottom.' + popup)
  }

  
  openPopup(popup){
    this.commonMethod.openPopup('div.popup-bottom.' + popup)
  }

}
