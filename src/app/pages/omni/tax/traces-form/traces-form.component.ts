import { TracesFormService } from './traces-form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common';
declare var showToastMessage: any;
import * as moment from 'moment';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';

@Component({
  selector: 'app-traces-form',
  templateUrl: './traces-form.component.html',
  styleUrls: ['./traces-form.component.scss']
})
export class TracesFormComponent implements OnInit {


  constructor(
    private router: Router,
    public dataService: DataService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private traceFormService: TracesFormService,
    private location: Location) { }

  assessmentYearList:any= [];
  traceForm: FormGroup;
  pancardNumber: any;
  financialYear:any= '';
  traceFormLink = 'https://services.tdscpc.gov.in/serv/view26AS.xhtml'

  ngOnInit(): void {
    this.buildForm();
    this.pancardNumber = this.dataService.profiledateDetails[0].panNumber;
    // this.pancardNumber = this.dataService.accountOpenFldData.panNumber
    // console.log('pan card number :: ', this.pancardNumber)
    // var assessmentParam = this.traceFormService.getAssessmentYearCall();
    // this.getAssessmentYear(assessmentParam);
    this.dataService.setPageSettings('Traces Form 26 AS');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('FORM_26AS', this.router.url)
    // this.financialYear = this.getCurrentFinancialYear();
  }

   getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
      fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
      fiscalyear = today.getFullYear() + "-" + (today.getFullYear() + 1)
    }
    var splittedYear = fiscalyear.split('-');
    var financialYear = splittedYear[0] + '-' + splittedYear[1].substring(2);
    this.assessmentYearList.push({configVal : financialYear,financialYear: fiscalyear})
    return financialYear
  }

  buildForm() {
    this.traceForm = new FormGroup({
      termsCondition: new FormControl('', [Validators.required]),
      assestmentYear: new FormControl({value:this.getCurrentFinancialYear(),disabled:true}, [Validators.required]),
    });
  }

  validateForm() {
    if (this.traceForm.invalid) {
      this.traceForm.get('termsCondition').markAsTouched();
    }
  }

  getAssessmentYear(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CERTIFICATECONFIGS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.assessmentYearList = data.listofDataset[0].records;
        console.log('assessment year list: ', this.assessmentYearList);
      }
      else {
        //showToastMessage(resp.result);
      }
    });
  }

  /**
  * function to fetch profile Dtl and set profile Image
  * @accountNumber
  */
  proceedToForm26AS() {
    if (this.traceForm.valid) {
      var userData = {
        'UserID': 'B030023',
        'PAN': this.pancardNumber,
        'RequestTimestamp': moment(new Date()).format("YYYY-MM-DD-HH.mm.ss.SSSSSS"),
        'AssessmentYear': this.traceForm.get('assestmentYear').value
      }
      console.log('assessment Form value ',this.traceForm.get('assestmentYear').value);
      console.log("USER DATA :: ", userData)
      console.log(moment(new Date()).format("YYYY-MM-DD-HH.mm.ss.SSSSSS"))
      var formData = userData.UserID + "^" + userData.PAN + "^" + userData.AssessmentYear + "^" + userData.RequestTimestamp
      console.log(formData)
      let param = this.traceFormService.getPKCS7Signature(formData,'Form26AS');
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GENERATESIGNATURE).subscribe(data => {
        var resp = data.responseParameter;
        if (resp.opstatus == "00") {
          // this.router.navigate([]).then(result => {  window.open(this.traceFormLink, '_blank'); });
          var self = this
          console.log("profile data ", this.dataService.profiledateDetails)
          var userAccountDetails = this.dataService.primaryAccountDtl
          console.log("account No ", userAccountDetails)
          var tracesForm = document.createElement("form");
          tracesForm.setAttribute("method", "post");
          tracesForm.setAttribute("action", this.traceFormLink);
          tracesForm.setAttribute("name", 'LoginToEFiling');
          tracesForm.setAttribute("target", 'EFile');

          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", "data");
          hiddenField.setAttribute("value", formData);
          tracesForm.appendChild(hiddenField);
          var hiddenField2 = document.createElement("input");
          hiddenField2.setAttribute("type", "hidden");
          hiddenField2.setAttribute("name", "signature");
          // hiddenField2.setAttribute("value", this.constant.DSC_Key);
          // var signedData = this.encryptDecryptService.pkcsEncryptDigitallySignBase64Method(this.constant.DSC_Key, formData);
          // console.log('signedData: ', signedData);
          hiddenField2.setAttribute("value",resp.Signature);
          // hiddenField2.setAttribute("value", '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');
          tracesForm.appendChild(hiddenField2);
          document.body.appendChild(tracesForm);
          console.log(this.constant.DSC_Key)

          var map = window.open('', 'EFile');

          if (map) {
            tracesForm.submit();
          } else {
            console.log('Form is null');
          }
        }
        else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
    }
    else {
      this.validateForm();
    }

  }

}
