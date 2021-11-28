import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RaiseComplaint } from 'src/app/models/raise-complaint.model';
import { Mandate } from '../../../../../models/mandate-model';
import { DataService } from '../../../../../services/data.service';
declare var cordova: any;
@Component({
  selector: 'app-upi-mandate-completed-details',
  templateUrl: './upi-mandate-completed-details.component.html',
  styleUrls: ['./upi-mandate-completed-details.component.scss']
})
export class UpiMandateCompletedDetailsComponent implements OnInit {
  revokeMandateForm: FormGroup;
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'VIEW_DETAILS',
    'footertype': 'none'
  }
  completedMandate: Mandate;
  constructor(private router: Router, public DataService: DataService, private location: Location) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    history.pushState({}, 'upiMandate', this.location.prepareExternalUrl("upiMandate"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.completedMandate = this.DataService.completedMandate;
  }

  /**
  * Open in app browser 
  * @param url 
  */
  viewInvoice(url) {
    if (!this.DataService.isCordovaAvailable) window.open(url);
    else cordova.InAppBrowser.open(url, '_blank', 'location=no');
  }

  /**
  * Raise Complaint
  */
  raiseComplaint() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: this.completedMandate.rrn, transactionID: this.completedMandate.txnId, complaintType: 'MANDATE', txnAmount: this.completedMandate.amount, payerAddress: this.completedMandate.payerAddress, payeeAddress: this.completedMandate.payeeAddress, transactionDate: this.completedMandate.createdTime,umn: this.completedMandate.umn,refID:this.completedMandate.txnId });
    this.navigate('raiseComplaint');
  }

  /**
   * 
   * @param routeName 
   */
  navigate(routeName: string) {
    // this.router.navigateByUrl(routeName);
    this.DataService.routeWithNgZone(routeName);
  }

  viewMandateHistory(){
    this.DataService.umn = this.completedMandate.umn;
    this.router.navigateByUrl('/mandateHistory');
  }

}
