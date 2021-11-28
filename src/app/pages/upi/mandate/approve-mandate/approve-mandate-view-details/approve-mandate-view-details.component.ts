import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { Mandate, MandateList } from 'src/app/models/mandate-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { ApproveMandateDetailService } from './approve-mandate-view-details.service';
import * as moment from 'moment';

declare var cordova: any;
@Component({
  selector: 'app-approve-mandate-view-details',
  templateUrl: './approve-mandate-view-details.component.html',
  styleUrls: ['./approve-mandate-view-details.component.scss']
})
export class ApproveMandateViewDetailsComponent implements OnInit {

  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'VIEW_DETAILS',
    'footertype': 'none'
  }
  approveMandateDetail: Mandate;
  blockUPIIdForm: FormGroup;
  declineMandateForm: FormGroup;
  VPADetails :any;
  VPAAccountDetails:any;
  validityStart:any;
  validityEnd:any;
  constructor(private router: Router, public DataService: DataService, private commonMethod: CommonMethods, private approveMandateDetailService: ApproveMandateDetailService, private http: HttpRestApiService, private localStorage: LocalStorageService, private constant: AppConstants, private location: Location) { }

  ngOnInit() {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'approveMandate', this.location.prepareExternalUrl("approveMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.approveMandateDetail = this.DataService.approveMandateDetail;
    this.validityStart = moment(this.approveMandateDetail.validityStart).format('DD/MM/yyyy');
    this.validityEnd = moment(this.approveMandateDetail.validityEnd).format('DD/MM/yyyy');
    this.getLinkedAccount();
    this.buildForm();
  }

  /**
  * Form build
  */
  buildForm() {
    this.blockUPIIdForm = new FormGroup({
      blockPeriod: new FormControl('Forever', [Validators.required]),
    });
    this.declineMandateForm = new FormGroup({
      spam: new FormControl(false),
    });
  }

  goToPage(routeName) {
    // this.router.navigateByUrl('/' + routeName);
    this.DataService.routeWithNgZone(routeName);
  }

  openPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  /**
  * close Popup Modal
  */
  closePopup(popupName: string) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  openRejectPopup(popupName) {
    this.declineMandateForm.get('spam').reset(false);
    this.commonMethod.openPopup('div.popup-bottom.' + popupName)
  }


  // this.DataService.approveMandateResp = response;

  declineMandate() {
    if (this.declineMandateForm.valid) {
      this.closePopup('declineMandate');
      var reqParams = this.approveMandateDetailService.declineMandateRequest(this.approveMandateDetail, this.declineMandateForm.value);
      this.UpiApiCall(reqParams);
    }
  }

  /**
  * Api call for block upi id
  */
  blockUPI() {
    if (this.blockUPIIdForm.valid) {
      console.log(this.blockUPIIdForm.value);
      let { blockPeriod } = this.blockUPIIdForm.value;
      this.closePopup('blockUPI');
      var reqParams = this.approveMandateDetailService.setBlockUPIReq(blockPeriod, this.approveMandateDetail);
      this.UpiApiCall(reqParams);
    }
  }

  /**
  * Common Api Call for pending request 
  * @param request 
  */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_REJECTMANDATE:
            this.DataService.declineMandateResp = response;
            console.log('upiserviceName_REJECTMANDATE ', JSON.stringify(response));
            this.DataService.declineMandateLinkedAccount = this.VPAAccountDetails;
            this.DataService.declineMandateLinkedVPA = this.VPADetails;

            this.goToPage('approveMandateDecline');
            break;
          case this.constant.upiserviceName_BLOCKNOTIFICATION:
            console.log('upiserviceName_BLOCKNOTIFICATION ', JSON.stringify(response));
            this.DataService.pendingBlockSuccessURL = 'approveMandate';
            //TODO : Handle block UPI scenario design not yet given by UI Team so just implementedd the functionality
            this.DataService.pendingReqBlockUPIResp = response;
            this.DataService.pendingReqBlockUPIResp.payeeAddress = this.approveMandateDetail.payeeAddress;
            this.DataService.pendingReqBlockUPIResp.blockPeriod = this.blockUPIIdForm.get('blockPeriod').value;
            this.router.navigateByUrl('/pendingUpIdBlockSuccess');
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
   * Open in app browser 
   * @param url 
   */
  viewInvoice(url) {
    if (!this.DataService.isCordovaAvailable) window.open(url);
    else cordova.InAppBrowser.open(url, '_blank', 'location=no');
  }

  
  getLinkedAccount(){
    if(this.DataService.vpaAddressList.length > 0){
      if(this.DataService.checkIfUPIIdExists(this.approveMandateDetail.payerAddress)){
        this.VPADetails = this.DataService.vpaAddressList.find(vpa=> vpa.paymentAddress == this.approveMandateDetail.payerAddress);
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }else{
        this.VPADetails = this.DataService.vpaAddressList.find(vpa=> vpa.default == 'Y');
        this.VPAAccountDetails = this.VPADetails.accounts.find(account => account.isDefaultAccount == 'Y');
      }
    }
  }
}
