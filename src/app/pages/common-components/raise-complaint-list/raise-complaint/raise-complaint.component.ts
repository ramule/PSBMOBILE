import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { DataService } from '../../../../services/data.service';
import { RaiseComplaint } from '../../../../models/raise-complaint.model';
import { Location } from '@angular/common';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { TrackStatus } from 'src/app/models/track-status.model';
import { TrackStatusService } from '../../../upi/track-status/track-status.service';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import * as moment from 'moment';
declare var raiseComplaintDetails: any;
declare var $: any;

@Component({
  selector: 'app-raise-complaint',
  templateUrl: './raise-complaint.component.html',
  styleUrls: ['./raise-complaint.component.scss']
})
export class RaiseComplaintComponent implements OnInit, OnDestroy {
  raiseComplaintForm: FormGroup;
  raiseComplaint: RaiseComplaint;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'RAISE_COMPLAINT',
    'footertype': 'none'
  }
  upiTrans: any;
  transactionId: any;

  constructor(private router: Router, public DataService: DataService, private http: HttpRestApiService, private localStorage: LocalStorageService, private constant: AppConstants, private location: Location, private formValidation: FormValidationService,
    private npciAndroidService: NpciAndroidService,
    private npciIosService: NpciIosService,
    private trackStatusService: TrackStatusService) { }

  ngOnInit(): void {
    $('#amt').autoNumeric('init', { aSign: "₹ " });
    this.DataService.changeMessage(this.headerdata);
    raiseComplaintDetails();
    // this.upiTrans = this.DataService.getUPITransactionSelected();
    // this.upiTrans.DATETIME = moment(this.upiTrans.DATETIME).format('DD MMM yyyy hh:mm a');
    console.log("this.upiTrans", this.upiTrans);
    // history.pushState({}, 'complaint', this.location.prepareExternalUrl("complaint"));
    history.pushState({}, this.DataService.previousPageUrl == 'raiseComplaintConfirmation' || this.DataService.isRaiseComplaint ? 'upiDashboard' : this.DataService.previousPageUrl, this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'raiseComplaintConfirmation' || this.DataService.isRaiseComplaint ? 'upiDashboard' : this.DataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.setModel();
  }

  setModel() {
    // this.raiseComplaint = new RaiseComplaint().deserialize({"subject":"","complaintType":"Transaction","customerEmail":"","customerId":"","description":"","transactionID":"","rrn":""});
    // console.log('raised ',this.raiseComplaint);
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  /**
   * Form Creation
   */
  buildForm() {
    this.raiseComplaintForm = new FormGroup({
      transactionID: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z]*$)/)]),
      customerEmail: new FormControl(this.DataService.upiUserEmailAdress, [Validators.pattern(this.constant.email_regex), Validators.required]),
      rrn: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z]*$)/)]),
      subject: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      description: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
    });

    if (this.DataService.isRaiseComplaint) {
      this.raiseComplaintForm.get('amount').disable();
      this.raiseComplaintForm.patchValue({
        transactionID: this.DataService.raiseComplaint.transactionID,
        customerEmail: this.DataService.raiseComplaint.customerEmail,
        rrn: this.DataService.raiseComplaint.rrn,
        amount: this.DataService.raiseComplaint.txnAmount,
        subject: this.DataService.raiseComplaint.subject,
        description: this.DataService.raiseComplaint.description
      })
    }

  };

  raiseRequest() {
    this.raiseComplaintForm.markAllAsTouched();
    if (this.raiseComplaintForm.valid) {
      let { customerEmail, subject, description, rrn, transactionID, amount } = this.raiseComplaintForm.value;
      if (this.DataService.raiseComplaint) {
        this.DataService.raiseComplaint.customerEmail = customerEmail ? customerEmail : this.DataService.raiseComplaint.customerEmail;
        this.DataService.raiseComplaint.subject = subject ? subject : this.DataService.raiseComplaint.subject;
        this.DataService.raiseComplaint.description = description ? description : this.DataService.raiseComplaint.description;
      } else {
        this.DataService.raiseComplaint = new RaiseComplaint().deserialize({ rrn: rrn, transactionID: transactionID, complaintType: 'Transaction', txnAmount: amount.replace(/[^.0-9]+/g, ''), payerAddress: this.getDefaultVPA().paymentAddress, subject: subject, description: description, customerEmail: customerEmail });
      }
      console.log('dataService RaiseComplaint ', this.DataService.raiseComplaint)
      if (this.DataService.isTrackStatus == false) {
        this.trackStatus();
      } else {
        this.goToPage('raiseComplaintConfirmation');
      }
    }
  }

  /**
 * Track Status
 */
  trackStatus() {
    this.DataService.trackStatus = new TrackStatus().deserialize({ rrn: this.DataService.raiseComplaint.rrn, transactionID: this.DataService.raiseComplaint.transactionID, complaintType: this.DataService.raiseComplaint.complaintType, txnAmount: this.DataService.raiseComplaint.txnAmount.replace(/[^.0-9]+/g, ''), payerAddress: this.getDefaultVPA().paymentAddress, payeeAddress: this.DataService.raiseComplaint.payeeAddress, transactionDate: this.DataService.raiseComplaint.transactionDate, refID: this.DataService.raiseComplaint.refID, initiationMode: this.DataService.raiseComplaint.initiationMode, txnStatus: '', transactionType: '', payeeCode: '' });
    // this.navigate('trackStatus');  
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        console.log('Android transactionId Received => ', transactionId);
        this.transactionId = transactionId;
        var reqParams = this.trackStatusService.getTrackStatusReq(this.DataService.trackStatus, this.transactionId);
        this.UpiApiCall(reqParams);
      });
    } else if (this.DataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        console.log('IOS transactionId Received => ', transactionId);
        this.transactionId = transactionId;
        var reqParams = this.trackStatusService.getTrackStatusReq(this.DataService.trackStatus, this.transactionId);
        this.UpiApiCall(reqParams);
      });
    }
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
          case this.constant.upiserviceName_TRACKSTATUS:
            this.DataService.trackStatusRes = response.responseParameter;
            this.router.navigateByUrl('trackStatus');
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

  ngOnDestroy() {
    // this.DataService.raiseComplaint = new RaiseComplaint();
  }

  getDefaultVPA() {
    return this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == 'Y' });
  }

  selectTransaction() {
    this.DataService.isRaiseComplaint = true;
    this.DataService.navigationFromDashboard = true;
    this.router.navigateByUrl('/transactionList');
  }


  /**
   * set update currency value
   * @param value 
   */
  formatCurrency(value) {
    this.formValidation.formatDynamicCurrency('amt', this.raiseComplaintForm);
  }
}
