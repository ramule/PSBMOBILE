import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { Complaint } from 'src/app/models/complaint-model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { ComplaintService } from '../complaint/complaint.service';
import * as moment from 'moment';
import { Location } from '@angular/common';

declare var raiseComplaintDetails: any;
@Component({
  selector: 'app-complaint-view-details',
  templateUrl: './complaint-view-details.component.html',
  styleUrls: ['./complaint-view-details.component.scss']
})
export class ComplaintViewDetailsComponent implements OnInit {
  complaint:Complaint;
  escalateResp:any;
  escalateRequest = false;
  payeePaymentType: any;
  payerPaymentType: any;

  headerdata = {
    'headerType': 'TitleClose',
    'titleName':'VIEW_DETAILS',
    'footertype':'none'
  } 
  constructor(private router:Router, public DataService: DataService,private http:HttpRestApiService,private constant:AppConstants,private localStorage: LocalStorageService,private complaintService : ComplaintService,private commonMethods:CommonMethods,private location : Location) { }

  ngOnInit(): void {
    this.complaint = this.DataService.complaint;
    this.payeePaymentType = this.getPaymentTypeNValue(this.complaint.payeeAddr);
    this.payerPaymentType = this.getPaymentTypeNValue(this.complaint.payerAddr);
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'complaint', this.location.prepareExternalUrl("complaint"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    raiseComplaintDetails();
    this.checkExpiryDate();
  }

  checkExpiryDate(){
    let expiredDate = moment(this.complaint.feedbackTime).toDate();
    let expiryDate =  moment().diff(expiredDate,'days');
    if(expiryDate >= 3 && this.complaint.status == "OPEN"){
      this.escalateRequest = true;
    }
    console.log('expiryDate ',expiryDate)
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  /**
   * Api call for Escalate Request
   */
  escalateReq(){
    var reqParams = this.complaintService.getEscalateRequest(this.complaint);
    this.UpiApiCall(reqParams);
  }

   /**
   * Common Api Call for complaint 
   * @param request 
   */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      this.escalateResp = response;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ESCALATECOMPLAINT:
            this.commonMethods.openPopup('div.popup-bottom.escalate-success');
            break;
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_ESCALATECOMPLAINT:
            this.commonMethods.openPopup('div.popup-bottom.escalate-fail');
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  closePopup(popupName){
    this.router.navigateByUrl('/complaint');
    this.commonMethods.closePopup(popupName);
  }
  
  getPaymentTypeNValue(value) {
    var paymentDtl = [];
    let paymentValue = value;
    if (value.indexOf("ifsc") != -1) {
      paymentDtl[0] = "ifsc"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else if (value.indexOf("mmid") != -1) {
      paymentDtl[0] = "mmid"
      paymentValue = paymentValue.replace(".", "@");
      paymentValue = paymentValue.split("@");
      paymentDtl[1] = paymentValue[0];
      paymentDtl[2] = paymentValue[1];
    }
    else {
      paymentDtl[0] = "vpa"
      paymentDtl[1] = paymentValue;
    }
    return paymentDtl
  }
}
