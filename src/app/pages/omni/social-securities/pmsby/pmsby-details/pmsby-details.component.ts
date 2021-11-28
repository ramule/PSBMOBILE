import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { AccountOpeningStepsService } from '../../../pre-login/account-opening/account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { DropDownMaster } from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { InstantPayService } from '../../../fund-transfer/instant-pay/instant-pay.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { PmsbyDetailsService } from './pmsby-details.service';
declare var showToastMessage: any;


@Component({
  selector: 'app-pmsby-details',
  templateUrl: './pmsby-details.component.html',
  styleUrls: ['./pmsby-details.component.scss']
})
export class PmsbyDetailsComponent implements OnInit {
  isNomineeAddCheckBoxChecked: boolean = false;
  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod:CommonMethods,
    private location: Location,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private datePipe: DatePipe,
    private instantPayService: InstantPayService,
    private storage: LocalStorageService,
    private pmsbyDetailsService: PmsbyDetailsService
  ) { }


  additionalDetailsForm : FormGroup ;
  pensionDetailsForm : FormGroup ;
  curentTabIndex = 1;
  activeTab = "step1";

  relationShipList: any = [];
  gardianTypeList: any = [];
  nomineeCityList: any = [];
  stateNomineeList: any = [];
  accList: any = [];
  savingAccList: any = [];
  pmsbyAccDetailsArr: any = [];
  currentDate: any = moment().toDate();
  nomineeAge: any;
  minorFlag: boolean = false;
  selectedAccount: any = '';
  // pmjjbyDetailsForm: FormGroup;
  accBalance: any = "";
  navStepClose : boolean  ;
  customerData: any;
  customerJSON: any;
  isStep1ConfirmCheckboxChange: boolean = true;

  pmsby = [{
    "stepIndex": 1,
    "stepName": "Personal Details",
    "stepActive": true,
    "stepStatus": "inprogress",
    "tabName": "personalDetails"
  },
  {
    "stepIndex": 2,
    "stepName": "Additional Details",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "additionalDetails"
  },
  {
    "stepIndex": 3,
    "stepName": "Pension Details",
    "stepActive": false,
    "stepStatus": "incomplete",
    "tabName": "pensionDetails"
  }

]

  ngOnInit(): void {
    if(window.innerWidth < 767) {
      this.navStepClose = false ;
    }else{
      this.navStepClose = true ;
    }
    this.customerJSON = this.location.getState();
    this.buildForm();

    history.pushState({}, 'pmsby', this.location.prepareExternalUrl('pmsby'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log('operative account list: ', this.DataService.customerOperativeAccList);
    this.accList = this.DataService.customerOperativeAccList;
    this.filterSavingAccList();
    console.log('customer data: ', this.customerJSON.customerData);
    this.customerData = this.customerJSON.customerData;
    this.DataService.setPageSettings('PMSBY');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('PMSBY' , this.router.url)

    // this.getRelationShip();
    // this.getGardianType();
    // this.getState();
    this.getDropdownValues();
  }

  buildForm(){
    this.additionalDetailsForm = new FormGroup({
         // debitAccount: new FormControl('', [Validators.required]),
         nomineeName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
         relationship: new FormControl('', [Validators.required]),
         aadharNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
         dob: new FormControl('', [Validators.required]),
         communicationAddress: new FormControl('', []),
         guardianName: new FormControl('', []),
         guardianType: new FormControl('', []),
         nomineeAddress1: new FormControl('', [Validators.required]),
         nomineeState: new FormControl('', [Validators.required]),
         nomineeCity: new FormControl('', [Validators.required]),
         nomineePin: new FormControl('', [Validators.required]),
         guardianAddress1: new FormControl('', []),
         guardianState: new FormControl('', []),
         guardianCity: new FormControl('', []),
         guardianPin: new FormControl('', []),
         gender: new FormControl('', [Validators.required]),
    });

    this.pensionDetailsForm = new FormGroup({
      debitAccount: new FormControl('', [Validators.required]),
      termsCondition: new FormControl('', [Validators.required]),
      // radioboxdemo2: new FormControl('', [Validators.required]),

    })
  }

  validateForm(formType){

    switch(formType){
      case 'additionalDetails':
        if (this.additionalDetailsForm.invalid) {
          this.additionalDetailsForm.get('nomineeName').markAsTouched();
          this.additionalDetailsForm.get('relationship').markAsTouched();
          this.additionalDetailsForm.get('aadharNumber').markAsTouched();
          this.additionalDetailsForm.get('dob').markAsTouched();
          this.additionalDetailsForm.get('communicationAddress').markAsTouched();
          this.additionalDetailsForm.get('guardianName').markAsTouched();
          this.additionalDetailsForm.get('guardianType').markAsTouched();
          this.additionalDetailsForm.get('nomineeAddress1').markAsTouched();
          this.additionalDetailsForm.get('nomineeState').markAsTouched();
          this.additionalDetailsForm.get('nomineeCity').markAsTouched();
          this.additionalDetailsForm.get('nomineePin').markAsTouched();
          this.additionalDetailsForm.get('guardianAddress1').markAsTouched();
          this.additionalDetailsForm.get('guardianState').markAsTouched();
          this.additionalDetailsForm.get('guardianCity').markAsTouched();
          this.additionalDetailsForm.get('guardianPin').markAsTouched();
          this.additionalDetailsForm.get('gender').markAsTouched();
          // this.additionalDetailsForm.get('debitAccount').markAsTouched();
          return;
        }
        break;

        case 'pensionDetails':
          if(this.pensionDetailsForm.invalid){
            this.pensionDetailsForm.get('debitAccount').markAsTouched();
            this.pensionDetailsForm.get('termsCondition').markAsTouched();
            // this.pensionDetailsForm.get('radioboxdemo2').markAsTouched();

            return;
          }
          break;
      }


  }

  filterSavingAccList() {
    this.savingAccList = this.accList.filter(x => x.SchemeCode == 'SBA' &&  x.Status.toLowerCase() == 'active');
    this.selectedAccount = this.savingAccList[0].accountNo;
    this.accBalance = this.savingAccList[0].acctBalance;
    console.log(this.selectedAccount);
    console.log(this.accBalance);
  }

  onFromAccountSelect(event) {
    this.selectedAccount = '';
    console.log(this.selectedAccount);
    this.selectedAccount = event;
    this.getAccountBalance(event);
  }

   /**
   * This function is use to call api to fetch
   * accounts balance
   */
    getAccountBalance(selectedAccount) {
      if (selectedAccount == '') {
        //showToastMessage('Please select account');
        return;
      }

      var param = this.instantPayService.getAccountBalanceParam(selectedAccount);
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_BALANCEINQUIRY
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            this.accBalance = data.set.records[0].availableBalance;
            // this.refreshedTime = this.datePipe.transform(
            //   new Date().toISOString(),
            //   this.DataService.timeFormat
            // );
          } else {
            // this.errorCallBack(data.subActionId, resp);
          }
        });
    }

    getDropdownValues() {
      var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
      const request1 = this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE)

      let stateListParams = this.accOpeningService.getStateListParams();
      const request2 = this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES)

      const requestArray: any = [];
      requestArray.push(request1);
      requestArray.push(request2);

      forkJoin(requestArray).subscribe((results:any) => {
        console.log(results);
        var result = results[0].listofDataset[0]['records'];

        result.forEach(relationship => {
          if (relationship.ref_code === 'FAT' || relationship.ref_code === 'MOT' || relationship.ref_code === 'WIF' || relationship.ref_code === 'SON' || relationship.ref_code === 'DAU' || relationship.ref_code === '999'){
            this.relationShipList.push(relationship)
          }
      })


        this.stateNomineeList = results[1].set['records'];
      });
    }

  pmsbySubmit(formType, value) {
    switch (formType) {
      case 'additionalDetails':
        if (this.additionalDetailsForm.valid ) {
          this.nextstep(value);
          this.pensionDetailsForm.patchValue({
            debitAccount: this.selectedAccount
          });
        }
        else {
          this.validateForm(formType)
        }
        break;
      case 'pensionDetails':
        if (this.pensionDetailsForm.valid) {
          console.log(value)
          this.DataService.feedbackType = "pmjjbyDetails";
          var param = this.pmsbyDetailsService.getEnrollmentTransactionCall(this.selectedAccount, this.additionalDetailsForm.value, this.customerJSON.age);
          this.DataService.request = param;
          this.DataService.endPoint = this.constant.serviceName_SBYENROLLMENTDETAILS;
          var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
          if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
            this.DataService.pmsbyDetailsOverviewObj.scheme = 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)';
            this.DataService.pmsbyDetailsOverviewObj.name = this.DataService.userDetails?.customerName,
            this.DataService.pmsbyDetailsOverviewObj.dob = this.DataService.profiledateDetails[0].custBirthDate,
            this.DataService.pmsbyDetailsOverviewObj.nomineeName = this.additionalDetailsForm.value.nomineeName,
            this.DataService.pmsbyDetailsOverviewObj.debitAccount = this.selectedAccount,
            this.DataService.pmsbyDetailsOverviewObj.premiumAmount = 12,
            this.DataService.pmsbyDetailsOverviewObj.dateOfEnrollment = this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
            this.router.navigateByUrl('/'+ value);
          }
        }
        else {
          this.validateForm(formType)
        }
        break;
    }
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  cancel(){
    this.location.back();
  }

   onstepChange(stepname, stepindex) {
    console.log(stepname,stepindex);
    this.activeTab =  "step" + (stepindex)

    for (let i = 0; i < this.pmsby.length; i++) {
      this.pmsby[i].stepActive = false;
    }
    this.pmsby[stepindex - 1].stepActive = true;
  }

  nextstep(step) {
    if(this.isStep1ConfirmCheckboxChange ==true)
    {
      console.log("Step: ",step);
      // if(step == 1 && this.isStep1ConfirmCheckboxChange) {
      //   this.getSBYAccountDetails();
      // }
      // else {
      console.log("Step: ",step);
      let stepindex = step - 1
      console.log("Step index",stepindex)
      this.pmsby[stepindex].stepStatus = "completed"
      this.pmsby[stepindex].stepActive = false
      this.pmsby[stepindex + 1].stepActive = true
      if (this.pmsby[stepindex + 1].stepStatus != "completed") {
        this.pmsby[stepindex + 1].stepStatus = "inprogress"
      }
      this.activeTab = "step" + (step + 1)
      this.curentTabIndex = step + 1
    }

  }

  prevstep(step) {

    let stepindex = step - 2
    console.log(stepindex)
    this.pmsby[stepindex].stepActive = true
    this.pmsby[stepindex + 1].stepActive = false
    this.activeTab = "step" + (step - 1)
    console.log(step)
    this.curentTabIndex = step - 1

  }

  close(){
    this.navStepClose =  !this.navStepClose ;
  }

  getRelationShip() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.relationShipList = data.listofDataset[0].records;
        }
      }
      else {
        this.relationShipList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "Daughter", "ref_code": "3" },
          { "DESCRIPTION": "Son", "ref_code": "4" },
          { "DESCRIPTION": "Brother", "ref_code": "5" },
          { "DESCRIPTION": "Sister", "ref_code": "6" }
        ];
      }
    });
  }

  getGardianType() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.GUARDIAN_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.gardianTypeList = data.listofDataset[0].records;
        }
      }
      else {
        this.gardianTypeList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "grandFather", "ref_code": "3" },
          { "DESCRIPTION": "Uncle", "ref_code": "4" }
        ];
      }
    });
  }

  getState() {
    let stateListParams = this.accOpeningService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateNomineeList = data.set.records;
        }
      }
      else {
      }
    });
  }

  getNomineeCity(stateId) {
    this.nomineeCityList = [];
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.nomineeCityList = data.set.records;
        }
      }
      else {
      }
    });
  }

  onDateChange(event) {
    var diff = Math.floor(this.currentDate - event);
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.nomineeAge = Math.floor(months / 12);

    if(this.nomineeAge < 18){
      this.minorFlag = true;

      this.additionalDetailsForm.get('guardianName').setValidators([Validators.required, Validators.pattern("[a-zA-Z ]*$")]);
      this.additionalDetailsForm.get('guardianType').setValidators([Validators.required]);
      this.additionalDetailsForm.get('guardianAddress1').setValidators([Validators.required]);
      this.additionalDetailsForm.get('guardianState').setValidators([Validators.required]);
      this.additionalDetailsForm.get('guardianCity').setValidators([Validators.required]);
      this.additionalDetailsForm.get('guardianPin').setValidators([Validators.required]);
      this.additionalDetailsForm.get('nomineeAddress1').setValidators([Validators.required]);
      this.additionalDetailsForm.get('nomineeState').setValidators([Validators.required]);
      this.additionalDetailsForm.get('nomineeCity').setValidators([Validators.required]);
      this.additionalDetailsForm.get('nomineePin').setValidators([Validators.required]);
    }else{
      this.minorFlag= false;

      this.additionalDetailsForm.get('guardianName').setValidators([]);
      this.additionalDetailsForm.get('guardianType').setValidators([]);
      this.additionalDetailsForm.get('guardianAddress1').setValidators([]);
      this.additionalDetailsForm.get('guardianState').setValidators([]);
      this.additionalDetailsForm.get('guardianCity').setValidators([]);
      this.additionalDetailsForm.get('guardianPin').setValidators([]);
    }

    this.additionalDetailsForm.get('guardianName').updateValueAndValidity();
    this.additionalDetailsForm.get('guardianType').updateValueAndValidity();
    this.additionalDetailsForm.get('guardianAddress1').updateValueAndValidity();
    this.additionalDetailsForm.get('guardianState').updateValueAndValidity();
    this.additionalDetailsForm.get('guardianCity').updateValueAndValidity();
    this.additionalDetailsForm.get('guardianPin').updateValueAndValidity();
    this.additionalDetailsForm.get('nomineeAddress1').updateValueAndValidity();
    this.additionalDetailsForm.get('nomineeState').updateValueAndValidity();
    this.additionalDetailsForm.get('nomineeCity').updateValueAndValidity();
    this.additionalDetailsForm.get('nomineePin').updateValueAndValidity();
  }

  onCheckboxValChange() {
    this.isStep1ConfirmCheckboxChange = !this.isStep1ConfirmCheckboxChange;
    console.log('checkboxval: ', this.isStep1ConfirmCheckboxChange);
  }

  getSBYAccountDetails() {
    var param = this.pmsbyDetailsService.getSBYAccountEnquiryCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_SBYACCOUNTINQUIRY).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.pmsbyAccDetailsArr = data.set.records[0];
        console.log('pmsbyAccDetailsArr: ', this.pmsbyAccDetailsArr);
        this.router.navigateByUrl('/pmsbyOverview', {state: {enrollmentDetails: this.pmsbyAccDetailsArr}});
      }
      if(resp.Result == "Not Enrolled to this scheme") {
        let stepindex = 0;
        console.log("Step index",stepindex)
        this.pmsby[stepindex].stepStatus = "completed";
        this.pmsby[stepindex].stepActive = false;
        this.pmsby[stepindex + 1].stepActive = true;
        if (this.pmsby[stepindex + 1].stepStatus != "completed") {
          this.pmsby[stepindex + 1].stepStatus = "inprogress"
        }
        this.activeTab = "step" + 2
        this.curentTabIndex = 2
      }
    });
  }

  onNomineeAddCheckboxCheck() {
    this.isNomineeAddCheckBoxChecked = !this.isNomineeAddCheckBoxChecked;

    if(this.isNomineeAddCheckBoxChecked) {
      this.additionalDetailsForm.patchValue({
        nomineeAddress1: this.DataService.profileDetails[0].add1 +", "+this.DataService.profileDetails[0].add2,
        nomineeState: this.DataService.custProfileStateCityObj.state,
        nomineeCity: this.DataService.custProfileStateCityObj.city,
        nomineePin: this.DataService.profileDetails[0].pin
      });
    }
    else {
      this.additionalDetailsForm.patchValue({
        nomineeAddress1: "",
        nomineeState: "",
        nomineeCity: "",
        nomineePin: ""
      });
    }
  }

  openPopUp(){

    this.commonMethod.openPopup("div.tpin-popup")
  }
  closepopup(){
    this.commonMethod.closePopup("div.tpin-popup")
  }
}
