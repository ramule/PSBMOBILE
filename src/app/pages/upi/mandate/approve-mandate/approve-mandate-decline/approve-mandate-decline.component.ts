import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { AddBenificiary } from 'src/app/models/add-benificiary-model';
import { Mandate } from 'src/app/models/mandate-model';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { BenificiaryService } from '../../../benificiary/benificiary.service';
import * as moment from 'moment';

@Component({
  selector: 'app-approve-mandate-decline',
  templateUrl: './approve-mandate-decline.component.html',
  styleUrls: ['./approve-mandate-decline.component.scss']
})
export class ApproveMandateDeclineComponent implements OnInit {

  headerdata = {
    'headerType': 'none',
    'titleName': '',
    'footertype': 'none'
  };
  isFavorite = false;
  declineMandateResp: any;
  mandateDetail: Mandate;
  favPayeeList:any;
  benficiaryListData:any;
  activeTabName: string = "VPA";
  popupData: any = {};
  constructor(public DataService: DataService, private location: Location, private router: Router, private commonMethod: CommonMethods, public constant: AppConstants, private http: HttpRestApiService, private localStorage: LocalStorageService, private benificiaryService: BenificiaryService, private translate: TranslatePipe, private ngZone: NgZone, private translatePipe: TranslatePipe) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.DataService.fetchUPIbenificiaryLists = true;
    history.pushState({}, 'approveMandate', this.location.prepareExternalUrl("approveMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.declineMandateResp = this.DataService.declineMandateResp;
    this.declineMandateResp.responseParameter.txnDateTime = moment(this.declineMandateResp.responseParameter.txnDateTime).format('DD MMM yyyy, hh:mm:ss a');
    this.declineMandateResp.responseParameter.validityStart = moment(this.declineMandateResp.responseParameter.validityStart).format('DD/MM/yyyy');
    this.declineMandateResp.responseParameter.validityEnd = moment(this.declineMandateResp.responseParameter.validityEnd).format('DD/MM/yyyy');
    this.mandateDetail = this.DataService.approveMandateDetail;
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
      var filename = "collectRequest_" + Date.now();
      let section = document.querySelector('#approveMandate');
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
      let section = document.querySelector('#approveMandate');
      
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
  addPayeeToFavorite() {
    let favorite = this.isFavorite ? 'Y' : 'N';
    let addBenificiary: AddBenificiary = new AddBenificiary().deserialize({ isFavourite: favorite, payeeName: this.DataService.validateAddressResp.MASKNAME, nickName: this.DataService.validateAddressResp.MASKNAME, payeeVPA: this.DataService.validateAddressResp.validatedVpa });
    var reqParams = this.benificiaryService.setAddBenificiaryRequest(addBenificiary, false, true, false);
    this.closePopup('fav-popup')
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
            this.isFavorite = !this.isFavorite;
            this.DataService.fetchUPIbenificiaryLists = true

            if (response.msg) {
              // showToastMessage(response.msg, "success");
              this.ngZone.run(() => {
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
        this.ngZone.run(() => {
          this.DataService.errorMsg = response.msg;
          this.DataService.informationLabel = this.translatePipe.transform('ERROR');
          this.DataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethod.openPopup('div.popup-bottom.show-common-error')
        })
        // showToastMessage(data.msg, "error");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  openPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }


  close() {
    this.location.back();
  }

}
