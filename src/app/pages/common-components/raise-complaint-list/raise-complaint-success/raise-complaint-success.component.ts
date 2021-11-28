import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import * as moment from 'moment';

@Component({
  selector: 'app-raise-complaint-success',
  templateUrl: './raise-complaint-success.component.html',
  styleUrls: ['./raise-complaint-success.component.scss']
})
export class RaiseComplaintSuccessComponent implements OnInit {
  raiseComplaintResp:any;
  headerdata = {
    'headerType': 'none',
    'titleName':'',
    'footertype':'none'
  } 
  raiseComplaint:RaiseComplaint;
  amount ="";
  payeePaymentType: any;
  payerPaymentType: any;
  
  constructor(public DataService: DataService,private router: Router,private commonMethod : CommonMethods, private location : Location, public constant: AppConstants) { }

  ngOnInit(): void {
    this.raiseComplaintResp = this.DataService.raiseComplaintResp;
    this.raiseComplaintResp.responseParameter.txnTime = moment(this.raiseComplaintResp.responseParameter.txnTime).format("DD MMM yyyy, hh:mm a");
    this.raiseComplaint = this.DataService.raiseComplaint;
    this.payeePaymentType = this.getPaymentTypeNValue(this.raiseComplaint.payeeAddress);
    this.payerPaymentType = this.getPaymentTypeNValue(this.raiseComplaint.payerAddress);
    console.log('this.raiseComplaintResp');
    console.log(this.raiseComplaintResp);
    this.DataService.changeMessage(this.headerdata);
    this.amount = this.DataService.raiseComplaint.txnAmount.trim().replace(/[^.0-9]+/g, '')
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage(routeName){
    // this.router.navigateByUrl('/'+routeName);
    this.DataService.routeWithNgZone(routeName);
  }

  
   /**
   * Share Receipt via available methods in device
   */
  shareReceipt() {
    if (this.DataService.isCordovaAvailable) {
      var filename = "raise_complaint_sucess_" + Date.now();
      let section = document.querySelector('#raiseComplaint');
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
      var filename = "raise_complaint_sucess_" + Date.now() + '.png';
      let section = document.querySelector('#raiseComplaint');
      
      if(self.DataService.platform.toLowerCase() == self.constant.val_android) {
        self.commonMethod.savePDFInDevice(section,filename);
      } else {
        self.commonMethod.takeScreenshot();
      }
    } 
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