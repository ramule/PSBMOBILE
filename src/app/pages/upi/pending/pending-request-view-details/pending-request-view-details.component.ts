import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { PendingWithMe } from 'src/app/models/pending-request.model';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PluginService } from 'src/app/services/plugin-service';
import { DataService } from '../../../../services/data.service';
import { PendingReqService } from '../pending-request/pending-request.service';
import * as moment from 'moment';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';


declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var cordova;

@Component({
  selector: 'app-pending-request-view-details',
  templateUrl: './pending-request-view-details.component.html',
  styleUrls: ['./pending-request-view-details.component.scss']
})

export class PendingRequestViewDetailsComponent implements OnInit, OnDestroy {
  pendingWithMe: PendingWithMe;
  setReminderForm: FormGroup;
  blockUPIIdForm: FormGroup;
  rejectForm: FormGroup;
  setReminderResp: any;
  maxExpiredDate: any;
  currentDate = moment().toDate();
  headerdata = {
    'headerType': 'TitleClose',
    'titleName': 'VIEW_DETAILS',
    'footertype': 'none'
  }
  selectedDate: any;
  selectedTime: any;
  minDate: any;
  maxDate: any;
  timeError = false;

  constructor(private router: Router, public DataService: DataService, private pendingReqService: PendingReqService, private http: HttpRestApiService, private localStorage: LocalStorageService, private constant: AppConstants, private pluginService: PluginService, private commonMethods: CommonMethods, private location: Location, private translatePipe: TranslatePipe, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.headerdata);
    this.pendingWithMe = this.DataService.pendingWithMe;
    this.minDate = moment().toDate();
    // this.maxDate = moment().add(45, 'days').toDate();
    this.maxDate = moment(this.pendingWithMe.expiredDateTimeStamp).toDate();;
    createGlobalNavMore();
    this.buildForm();
    // this.setExpiredMaxDate();
    history.pushState({}, 'pendingRequestUpi', this.location.prepareExternalUrl("pendingRequestUpi"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.checkFlowPendingReq();
  }

  /**
   * Navigate to page by route name
   * @param routeName 
   */
  goToPage(routeName) {
    if (routeName == 'pendingConfirmation') {
      // if (!this.DataService.checkIfUPIIdExists(this.pendingWithMe.payerAddress)) {
      //   this.ngZone.run(() => {
      //     this.DataService.information = this.translatePipe.transform('SOMETHING_WENT_WRONG');
      //     this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
      //     this.DataService.primaryBtnText = this.translatePipe.transform('OK');
      //     this.commonMethods.openPopup('div.popup-bottom.show-common-info');
      //   })
      // } else {
      this.DataService.upiCollectVpaList =[];  
      this.router.navigateByUrl('/' + routeName);
      // }
    }
    this.router.navigateByUrl('/' + routeName);
  }

  /**
   * Form build
   */
  buildForm() {
    this.setReminderForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
    this.blockUPIIdForm = new FormGroup({
      blockPeriod: new FormControl('forever', [Validators.required]),
      reason: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      spam: new FormControl(false),
    });
    this.rejectForm = new FormGroup({
      reason: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
      spam: new FormControl(false),
    });
    this.setReminderForm.valueChanges.subscribe((data) => {
      console.log('Changed data => ', data);
      console.log("setReminderForm Valid = ", this.setReminderForm.valid);
    });
  }


  /**
    * Api call for set reminder 
    */
  setSnoozeNotification() {
    this.setReminderForm.markAllAsTouched();
    if (this.setReminderForm.valid) {
      // let { date, time } = this.setReminderForm.value;
      var dateTime = moment(this.selectedDate).format('DD/MM/YYYY') + " " + moment(this.selectedTime).format("hh:mm a");
      this.closePopup('div.popup-bottom.snoozeReminder');
      var reqParams = this.pendingReqService.snoozeNotificationReq(dateTime, this.pendingWithMe);
      this.UpiApiCall(reqParams);
    }
  }

  /**
  * Api call for block upi id
  */
  blockUPI() {
    if (this.blockUPIIdForm.valid) {
      console.log(this.blockUPIIdForm.value);
      // let { blockPeriod } = this.blockUPIIdForm.value;
      this.closePopup('div.popup-bottom.blockUPI');
      var reqParams = this.pendingReqService.setBlockUPIReq(this.blockUPIIdForm.value, this.pendingWithMe);
      this.UpiApiCall(reqParams);
    }
  }

  /**
   * Api call for reject request
   */
  rejectReq() {
    this.rejectForm.markAllAsTouched();
    if (this.rejectForm.valid) {
      console.log(this.rejectForm.value);
      this.closePopup('div.popup-bottom.rejectPendingReq');
      var reqParams = this.pendingReqService.setRejectCollectReq(this.rejectForm.value, this.pendingWithMe);
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
          case this.constant.upiserviceName_SNOOZENOTIFICATION:
            console.log('upiserviceName_SNOOZENOTIFICATION ', JSON.stringify(response));
            this.setReminderResp = response;
            this.showSuccessPopupReminder();
            break;
          case this.constant.upiserviceName_BLOCKNOTIFICATION:
            console.log('upiserviceName_BLOCKNOTIFICATION ', JSON.stringify(response));
            this.DataService.pendingBlockSuccessURL = 'pendingRequestUpi';
            this.DataService.pendingReqBlockUPIResp = response;
            this.DataService.pendingReqBlockUPIResp.payeeAddress = this.pendingWithMe.payeeAddress;
            this.DataService.pendingReqBlockUPIResp.blockPeriod = this.blockUPIIdForm.get('blockPeriod').value;
            this.router.navigateByUrl('/pendingUpIdBlockSuccess');
            break;
          case this.constant.upiserviceName_REJECTNOTIFICATION:
            this.DataService.pendingReqRejectResp = response;
            this.DataService.reportSpam = this.rejectForm.value.spam;
            this.router.navigateByUrl('/pendingRejected');
            console.log('upiserviceName_REJECTNOTIFICATION ', JSON.stringify(response));
            break;


          default:
            break;
        }
      } else {
        // switch (response.subActionId) {
        //   case this.constant.upiserviceName_SNOOZENOTIFICATION:
        //     showToastMessage(response.msg, "error");
        //     break;
        //   case this.constant.upiserviceName_BLOCKNOTIFICATION:
        //     showToastMessage(response.msg, "error");
        //     break;
        //   case this.constant.upiserviceName_REJECTNOTIFICATION:
        //     showToastMessage(response.msg, "error");
        //     break;
        //   default:
        //     break;
        // }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * Open Native Date Picker
   */
  openDatePicker() {
    this.pluginService.openDatePicker('date', this.maxDate, this.minDate, this.maxDate,).subscribe((date) => {
      console.log('date from plugin => ', date);
      this.ngZone.run(() => {
        this.selectedDate = date;
        this.setReminderForm.controls.date.setValue(moment(date).format('DD/MM/YYYY'));
        this.validateTime();
      });
    });
  }

  /**
   * Open Time Picker
   */
  openTimePicker() {
    this.pluginService.openDatePicker('time', this.maxDate).subscribe((time) => {
      console.log('time from plugin =>', time);
      this.ngZone.run(() => {
        this.selectedTime = time;
        this.setReminderForm.controls.time.setValue(moment(time).format('hh:mm A'));
        this.validateTime();
      });
    })
  }


  validateTime() {
    this.setReminderForm.get('time').markAsTouched();
    var now = new Date();
    var selectedDate = moment(this.selectedDate).format('YYYY-MM-DD');
    var expiredDate = moment(this.pendingWithMe.expiredDate).format('YYYY-MM-DD');
    if (selectedDate < expiredDate) {
// this.timeError = false;
     if(this.minutesOfDay(moment(this.selectedTime)) < this.minutesOfDay(moment(now.getTime()))) {
        this.timeError = true;
     }else{
        this.timeError = false; 
     } 
    }else if (this.minutesOfDay(moment(this.selectedTime)) > this.minutesOfDay(moment(this.pendingWithMe.expiredDate))) {
        this.timeError = true;
    }
    else {
        this.timeError = false;
    }
}

  minutesOfDay(m) {
    return m.minutes() + m.hours() * 60;
  }


  openSetReminderPopup() {
    this.setReminderForm.get('date').reset('');
    this.setReminderForm.get('time').reset('');
    this.commonMethods.openPopup('div.popup-bottom.snoozeReminder')
  }


  /**
   * Show sucess popup reminder
   */
  showSuccessPopupReminder() {
    $('div.popup-bottom.snoozeReminder').removeClass('popup-active');
    this.commonMethods.openPopup('div.popup-bottom.successReminder')
  }


  /**
   * Open Block UPI popup
   */
  openBlockUPIPopup() {
    this.blockUPIIdForm.patchValue({ blockPeriod: 'Forever' });
    this.commonMethods.openPopup('div.popup-bottom.blockUPI')
  }

  /**
   * show Reject popup
   */
  openRejectPopup() {
    this.rejectForm.get('reason').reset('');
    this.rejectForm.get('spam').reset(false);
    this.commonMethods.openPopup('div.popup-bottom.rejectPendingReq')
  }

  /**
   * close Popup Modal
   */
  closePopup(popupName: string) {
    this.commonMethods.closePopup(popupName);
  }

  viewInvoice() {
    cordova.InAppBrowser.open(this.pendingWithMe.refUrl, '_blank', 'location=no');
  }

  checkFlowPendingReq() {
    if (this.DataService.isSetReminderClicked) {
      this.openSetReminderPopup();
    } else if (this.DataService.isBlockUPIIdClicked) {
      this.openBlockUPIPopup();
    } else if (this.DataService.isRejectClicked) {
      this.openRejectPopup()
    }
  }

  ngOnDestroy() {
    this.DataService.isSetReminderClicked = false;
    this.DataService.isRejectClicked = false;
    this.DataService.isAcceptClicked = false;
    this.DataService.isBlockUPIIdClicked = false;
  }

}
