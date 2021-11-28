import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { ComplaintService } from '../../complaint-list/complaint/complaint.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';

@Component({
  selector: 'app-raise-complaint-confirmation',
  templateUrl: './raise-complaint-confirmation.component.html',
  styleUrls: ['./raise-complaint-confirmation.component.scss']
})
export class RaiseComplaintConfirmationComponent implements OnInit {
  raiseComplaint: RaiseComplaint;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'CONFIRMATION',
    'footertype': 'none'
  }
  amount = "";
  payeePaymentType: any;
  payerPaymentType: any;
  transactionId: any;

  constructor(
    private router: Router,
    public DataService: DataService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private complaintService: ComplaintService,
    private location: Location,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService) { }

  ngOnInit(): void {
    this.raiseComplaint = this.DataService.raiseComplaint;
    this.amount = this.DataService.raiseComplaint.txnAmount.trim().replace(/[^.0-9]+/g, '')
    this.payeePaymentType = this.getPaymentTypeNValue(this.raiseComplaint.payeeAddress);
    this.payerPaymentType = this.getPaymentTypeNValue(this.raiseComplaint.payerAddress);
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'raiseComplaint', this.location.prepareExternalUrl("raiseComplaint"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  /**
   * Submit Api call for raise complaint
   */
  submitRaiseComplaintReq() {
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        console.log('Android transactionId Received => ', transactionId);
        this.transactionId = transactionId;
        var reqParams = this.complaintService.getRaiseComplaintRequest(this.DataService.raiseComplaint, this.transactionId);
        this.UpiApiCall(reqParams);
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        console.log('IOS transactionId Received => ', transactionId);
        this.transactionId = transactionId;
        var reqParams = this.complaintService.getRaiseComplaintRequest(this.DataService.raiseComplaint, this.transactionId);
        this.UpiApiCall(reqParams);
      });
    }
  }

  /**
 * Common Api Call for complaint 
 * @param request 
 */
  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_RAISECOMPLAINT:
            this.DataService.raiseComplaintResp = response;
            this.goToPage('raiseComplaintSuccess');
            // this.pendingWithMeList =response.responseParameter.Pending;
            break;
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_RAISECOMPLAINT:
            // showToastMessage(response.msg, "error");
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
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
