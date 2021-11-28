import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { AccountOpeningStepsService } from '../../../pre-login/account-opening/account-opening-steps/account-opening-steps.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { ApyDetailsService } from './apy-details.service'
import { AppConstants } from 'src/app/app.constant';
import { InstantPayService } from '../../../fund-transfer/instant-pay/instant-pay.service';
import { DropDownMaster, AccountOpeningSteps } from '../../../../../utilities/app-enum';
import * as moment from 'moment';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

@Component({
  selector: 'app-apy-details',
  templateUrl: './apy-details.component.html',
  styleUrls: ['./apy-details.component.scss']
})
export class ApyDetailsComponent implements OnInit {
  serviceName_APYDetails = 'TRANSACTION/APYENROLLMENTTRANSACTION';
  additionalDetailsForm : FormGroup ;
  pensionDetailsForm : FormGroup ;
  curentTabIndex = 1;
  activeTab = "step1";
  currentDate: any = moment().toDate();
  nomineeAge: number = 18;
  max = new Date();
  stateList: any = [];
  cityList: any = [];
  nomineeCityList: any = [];
  stateNomineeList: any = [];
  gardianTypeList: any;
  relationShipList: any;
  add1val = '';
  add2val = '';
  stateval = '';
  cityval = '';
  pinval = '';
  accountList:any;
  availBal = '';
  additionalData:any;
  pensionDetailsData:any;
  nomineeMajorMinor:any;
  spouseAliveSec:boolean = false;
  premiumVal:any = '';

  navStepClose : boolean  ;
  userDetail:any;
  custmoernamesss:any;
  personaldetailForm:FormGroup;
  currState:any;
  apyEnrolledCheck: boolean = true;
  spousIsAliveVal:any;
  spousIsAliveCheck:boolean = false;
  balGreaterThenPremium:boolean = false;

  apyDetails = [{
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



  constructor(
    private router: Router, public DataService: DataService,
    private commonMethod:CommonMethods,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private apyDetailServ: ApyDetailsService,
    private instantPayService: InstantPayService,
    public translatePipe: TranslatePipe
  ) { }


  ngOnInit(): void {
    if(window.innerWidth < 767) {
      this.navStepClose = false ;
    }else{
      this.navStepClose = true ;
    }
    this.DataService.setPageSettings('APY_DETAILS');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('APY_DETAILS' , this.router.url)
    this.buildForm();
    this.DataService.profiledateDetails;
    console.log("customerFetchDetailInsocialsecurity::::::::",this.DataService.profiledateDetails);
    this.userDetail=this.DataService.profiledateDetails;
    console.log("permenantStateCode::::::::",  this.userDetail);
    //console.log(this.DataService.customerAccountList);
    console.log(this.DataService.customerOperativeAccList);
    this.accountList = this.DataService.customerOperativeAccList.filter(
      (obj) =>
        !(obj.SchemeCode.toLowerCase() == 'oda')
    );
    console.log(this.accountList)
    //console.log(this.accountList);
    //this.getAccountBalance(this.accountList[0].accountNo);
    this.getState();
    this.getRelationShip();
    this.getGardianType();
    //console.log(this.stateList.find(e => e.ID === this.userDetail[0].stateCode));
    this.currState = this.stateList.find(e => e.ID === this.userDetail[0].stateCode);
    if(!this.currState){
      this.currState = '';
    }
  //   var emailId=''
  //    this.custmoernamesss=this.userDetail[0].emailId;
  //  console.log("custmoernamesss::::::::",  this.custmoernamesss);
    // this.personaldetailForm.patchValue({
    //   gender:this.userDetail.custName
    // })
  }



  buildForm(){
    this.additionalDetailsForm = new FormGroup({
      maritalStatus: new FormControl('', [Validators.required]),
      spouseName: new FormControl(''),
      spName: new FormControl(''),
      spTitle: new FormControl(''),
      nomineeName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      nomineeRelation: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*$")]),
      //mobileNumber: new FormControl('', [Validators.required,  Validators.minLength(10)]),
      aadharNumber: new FormControl('',[Validators.required, Validators.minLength(12)]),
      datepicker1: new FormControl('', [Validators.required]),
      guardianName: new FormControl('' ),

    });

    this.pensionDetailsForm = new FormGroup({
      debitAccount: new FormControl('', [Validators.required]),
      invest: new FormControl('', [Validators.required]),
      premium: new FormControl(''),
      frequency: new FormControl('MON'),
      radioboxdemo: new FormControl('', [Validators.required]),
      radioboxdemo2: new FormControl('', [Validators.required]),
    })
    this.personaldetailForm = new FormGroup({
      gender: new FormControl('', [Validators.required]),

    })
  }

  validateForm(formType){

    switch(formType){
      case 'additionalDetails':
        if (this.additionalDetailsForm.invalid) {
          if(this.nomineeAge < 18){
          this.additionalDetailsForm.get('spouseName').markAsTouched();
          this.additionalDetailsForm.get('spName').markAsTouched();
          this.additionalDetailsForm.get('spTitle').markAsTouched();
          this.additionalDetailsForm.get('nomineeName').markAsTouched();
          this.additionalDetailsForm.get('nomineeRelation').markAsTouched();

          this.additionalDetailsForm.get('aadharNumber').markAsTouched();
          this.additionalDetailsForm.get('datepicker1').markAsTouched();
          this.additionalDetailsForm.get('guardianName').markAsTouched();

          return;
        }else {
          this.additionalDetailsForm.get('spouseName').markAsTouched();
          this.additionalDetailsForm.get('spName').markAsTouched();
          this.additionalDetailsForm.get('spTitle').markAsTouched();
          this.additionalDetailsForm.get('nomineeName').markAsTouched();
          this.additionalDetailsForm.get('nomineeRelation').markAsTouched();
          this.additionalDetailsForm.get('aadharNumber').markAsTouched();
          this.additionalDetailsForm.get('datepicker1').markAsTouched();
         }
        }
        break;

        case 'pensionDetails':
          if(this.pensionDetailsForm.invalid){
            this.pensionDetailsForm.get('debitAccount').markAsTouched();
            this.pensionDetailsForm.get('invest').markAsTouched();
            //this.pensionDetailsForm.get('frequency').markAsTouched();
            this.pensionDetailsForm.get('radioboxdemo').markAsTouched();
            this.pensionDetailsForm.get('radioboxdemo2').markAsTouched();
            return;
          }
          break;
      }


  }

  /**
   * This function is use to call api to fetch
   * accounts balance
   */
   getAccountBalance(selectedAccount) {
    var param = this.instantPayService.getAccountBalanceParam(selectedAccount.debitAccount);
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
          this.availBal = data.set.records[0].ledgerBalance;
          console.log('account balance: ', this.availBal);
          // var bal = Number(this.availBal);
          // if(bal > 0){

          // }
        } else {
          // this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  checkedVal(val){
    //console.log(val);
    //console.log(val.target.checked);
    this.apyEnrolledCheck = val.target.checked;
  }

  closePopup(popup){
    this.commonMethod.closePopup(popup);
  }

  spousIsAlive(){
    console.log('in');
    console.log(this.additionalDetailsForm.get('spouseName').value);
    this.spousIsAliveVal = this.additionalDetailsForm.get('spouseName').value;
    if(this.spousIsAliveVal == 'Yes'){
      this.spousIsAliveCheck = false;
    }else{
      this.spousIsAliveCheck = true;
    }
  }

  investment(val){
    console.log(val);
    var investVal = val.invest;
    var debitAccount = val.debitAccount;
    var frequency = 'MON';
    var mobNo = this.userDetail[0].mobileNo;

    var apyAccData = debitAccount+'|'+investVal+'|'+frequency;

    var param = this.apyDetailServ.calculatePremium(mobNo,apyAccData,debitAccount,investVal);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.service_CalculatePremium).subscribe(data => {
      console.log(data);
      if (data.responseParameter.opstatus == '00') {
        if(data.hasOwnProperty('set')){
          this.DataService.transactionReceiptObj.premiumAmount = data.set.records[0].premiumAmount;
          this.premiumVal = data.set.records[0].premiumAmount;
          this.pensionDetailsForm.patchValue({
            premium: data.set.records[0].premiumAmount
          });
        }
      }
      else if(data.responseParameter.opstatus == '01')
      {
        this.DataService.information = this.translatePipe.transform(data.set.records[0]['CBS_RES_FAIL_MSG']);
            this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.DataService.primaryBtnText = this.translatePipe.transform('OK');
            this.commonMethod.openPopup('div.popup-bottom.show-common-info');
      }

    });
  }

  apySubmit(formType, value, input) {

    switch (formType) {
      case 'additionalDetails':
        if (this.additionalDetailsForm.valid) {
          if(value == 2){
            if(this.spousIsAliveCheck){
              return;
            }
          }
          this.nextstep(value);
          console.log(input);
          this.additionalData = input;
          console.log(this.additionalData);
        }
        else {
          this.validateForm(formType)
        }
        break;
      case 'pensionDetails':
        if (this.pensionDetailsForm.valid) {
          this.pensionDetailsData = input;
          console.log(this.additionalData);
          console.log(this.pensionDetailsData);
          if(Number(this.availBal) >= Number(this.pensionDetailsData.premium)){
            this.balGreaterThenPremium = false;
          }else{
            this.balGreaterThenPremium = true;
            return;
          }
          var incomeTaxFlag;
          if(this.pensionDetailsData.radioboxdemo){
            incomeTaxFlag = 'Y';
          }else{
            incomeTaxFlag = 'N';
          }

          var spouseNameData;
          var titleData;
          if(this.additionalData.spouseName == 'Yes'){
            spouseNameData = this.additionalData.spName;
            titleData = this.additionalData.spTitle;
          }else{
            spouseNameData = '';
            if(this.userDetail[0].gender=="Female")
            titleData = 'KUMARI';
            else
            titleData = 'SHRI';
          }
          var apyEnrollmentdata = this.pensionDetailsData.debitAccount + '|' + this.pensionDetailsData.invest + '|' + incomeTaxFlag + '|' + this.additionalData.maritalStatus + '|' + spouseNameData + '|' + titleData + '|' + this.additionalData.nomineeName + '|' + this.additionalData.nomineeRelation + '|' + this.nomineeMajorMinor + '|' + '' + '|' + '023' + '|' + this.pensionDetailsData.frequency;
          console.log (apyEnrollmentdata);
          // this.router.navigate(['/apyOverview'])
          var param = this.apyDetailServ.apyDetailsParam(apyEnrollmentdata, this.pensionDetailsData);
          this.DataService.request = param;
          this.DataService.endPoint = this.constant.serviceName_APYDetails;


          this.DataService.transactionReceiptObj.nomineeName = this.additionalData.nomineeName;
          this.DataService.transactionReceiptObj.name = this.userDetail[0].custName;
          this.DataService.transactionReceiptObj.dob = this.userDetail[0].custBirthDate;
          this.DataService.transactionReceiptObj.debitAcc = this.pensionDetailsData.debitAccount;
          this.DataService.transactionReceiptObj.pensionAmt = this.pensionDetailsData.invest;
          this.DataService.transactionReceiptObj.premiumFreq = this.pensionDetailsData.frequency;
          this.DataService.transactionReceiptObj.nomineeAge = ''+this.nomineeAge;

         if(this.pensionDetailsData.frequency== 'MON'){
          this.DataService.transactionReceiptObj.premiumFreq = "Monthly"
         }else if(this.pensionDetailsData.frequency== 'YEA'){
          this.DataService.transactionReceiptObj.premiumFreq = "Yearly"
         }else{
          this.DataService.transactionReceiptObj.premiumFreq = "Daily"
         }




          this.DataService.authorizeHeader = "APY AUTH";
          this.DataService.screenType = 'apyOtpAuth';
          this.DataService.otpSessionPreviousPage = "/apyDetails";
          // this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.serviceName_APYDetails).subscribe(data => {
          //   console.log(data);
          //    var resp = data.responseParameter;
          //   if(resp.opstatus == "00"){
          //     this.router.navigateByUrl('/'+ value);
          //     this.DataService.apyPensionDetails = data.set.records[0];
          //   }
          // });
          console.log(value)
          this.router.navigateByUrl('/'+ value);
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

   onstepChange(stepname, stepindex) {
    console.log(stepname,stepindex);
    this.activeTab =  "step" + (stepindex)

    for (let i = 0; i < this.apyDetails.length; i++) {
      this.apyDetails[i].stepActive = false;
    }
    this.apyDetails[stepindex - 1].stepActive = true;
  }

  nextstep(step) {
    if(step == 1){
      if(!this.apyEnrolledCheck){
        this.DataService.information = this.translatePipe.transform("Please confirm you havn't enrolled for APY scheme earlier.");
            this.DataService.informationLabel = this.translatePipe.transform('INFORMATION');
            this.DataService.primaryBtnText = this.translatePipe.transform('OK');
        this.commonMethod.openPopup('div.popup-bottom.show-common-info');
        console.log("already enrolled by other bank");
        return;
      }
    }

    console.log("Step: ",step);
    let stepindex = step - 1
    console.log("Step index",stepindex)
    this.apyDetails[stepindex].stepStatus = "completed"
    this.apyDetails[stepindex].stepActive = false
    this.apyDetails[stepindex + 1].stepActive = true
    if (this.apyDetails[stepindex + 1].stepStatus != "completed") {
      this.apyDetails[stepindex + 1].stepStatus = "inprogress"
    }
    this.activeTab = "step" + (step + 1)
    this.curentTabIndex = step + 1
  }

  prevstep(step) {

    let stepindex = step - 2
    console.log(stepindex)
    this.apyDetails[stepindex].stepActive = true
    this.apyDetails[stepindex + 1].stepActive = false
    this.activeTab = "step" + (step - 1)
    console.log(step)
    this.curentTabIndex = step - 1

  }

  close(){
    this.navStepClose =  !this.navStepClose ;
  }

  // comCheck(event){
  //   // console.log('in');
  //   // console.log(event);
  //   // console.log(event.target.checked);

  //   var checked = event.target.checked;
  //   if(checked){

  //     this.add1val = this.userDetail[0].add1;
  //     this.add2val = this.userDetail[0].add2;
  //     this.stateval = '';
  //     this.cityval = '';
  //     this.pinval = this.userDetail[0].pin;

  //     this.additionalDetailsForm.patchValue({
  //       address1 : this.add1val,
  //       pin: this.pinval
  //     })

  //     this.additionalDetailsForm.get('address1').clearValidators();
  //     //this.additionalDetailsForm.get('state').clearValidators();
  //     //this.additionalDetailsForm.get('city').clearValidators();
  //     this.additionalDetailsForm.get('pin').clearValidators();
  //   }else{
  //     this.add1val = '';
  //     this.add2val = '';
  //     this.stateval = '';
  //     this.cityval = '';
  //     this.pinval = '';

  //     this.additionalDetailsForm.patchValue({
  //       address1 : this.add1val,
  //       pin: this.pinval
  //     })

  //     this.additionalDetailsForm.get('address1').setValidators([Validators.required]);
  //     //this.additionalDetailsForm.get('state').setValidators([Validators.required]);
  //     //this.additionalDetailsForm.get('city').setValidators([Validators.required]);
  //     this.additionalDetailsForm.get('pin').setValidators([Validators.required]);
  //   }
  //   this.additionalDetailsForm.get('address1').updateValueAndValidity;
  //   //this.additionalDetailsForm.get('state').updateValueAndValidity;
  //   //this.additionalDetailsForm.get('city').updateValueAndValidity;
  //   this.additionalDetailsForm.get('pin').updateValueAndValidity;
  // }

  spouseAlive(event){
    console.log(event);
    var currVal = event.target.value;
    console.log(currVal);
    if(currVal == 'Yes'){
      this.spouseAliveSec = true;
      $('#spouseSection').slideDown();
      this.additionalDetailsForm.get('spName').setValidators([Validators.required]);
      this.additionalDetailsForm.get('spTitle').setValidators([Validators.required]);
    }else{
      this.spouseAliveSec = false;
      $('#spouseSection').slideUp();
      this.additionalDetailsForm.get('spName').clearValidators();
      this.additionalDetailsForm.get('spTitle').clearValidators();
    }
    this.additionalDetailsForm.get('spName').updateValueAndValidity;
    this.additionalDetailsForm.get('spTitle').updateValueAndValidity;
  }

  showAlive(event){
    var currVal = event.target.value;
    if(currVal == 'Y'){
      $('#spouseAliveSection').slideDown();
      this.additionalDetailsForm.get('spouseName').setValidators([Validators.required]);
      this.additionalDetailsForm.get('spTitle').clearValidators();
    }else{
      this.spousIsAliveCheck = false;
      $('#spouseAliveSection').slideUp();
      this.additionalDetailsForm.get('spouseName').clearValidators();
      this.additionalDetailsForm.get('spTitle').setValidators([Validators.required]);
    }
    this.additionalDetailsForm.get('spouseName').updateValueAndValidity;
    this.additionalDetailsForm.get('spTitle').updateValueAndValidity;
  }

  getBalance(data){
    //console.log(data);
    var debitAcc = data.debitAccount;
    this.accountList.forEach(el => {
      console.log(el);
      if(el.accountNo == debitAcc){
        this.availBal = el.acctBalance;
        console.log(this.availBal);
      }

    });
  }

  onDateChange(event) {
    console.log(this.currentDate);
    console.log(event);
    var diff = Math.floor(this.currentDate - event);
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    this.nomineeAge = Math.floor(months / 12);

    console.log("this.nomineeAge: " + this.nomineeAge)
    if (this.nomineeAge < 18) {
      $('#guardian').slideDown();
      this.nomineeMajorMinor = 'Y';
      this.additionalDetailsForm.controls['guardianName'].setValidators([Validators.required, Validators.pattern("[a-zA-Z ]*$")]);
    } else {
      $('#guardian').slideUp();
      this.nomineeMajorMinor = 'N';
      this.additionalDetailsForm.controls['guardianName'].clearValidators();
    }
    this.additionalDetailsForm.controls['guardianName'].updateValueAndValidity();
  }

  getState() {
    let stateListParams = this.accOpeningService.getStateListParams();
    this.http.callBankingAPIService(stateListParams, this.constant.deviceID, this.constant.serviceName_GETSTATES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.stateList = data.set.records;
          this.stateNomineeList = data.set.records;
          console.log(this.stateList);

        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);

      }
    });
  }

  getCity(stateId) {
    this.cityList = [];
    let cityListParams = this.accOpeningService.getCityListParams(stateId);
    this.http.callBankingAPIService(cityListParams, this.constant.deviceID, this.constant.serviceName_GETCITIES).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        if (data.hasOwnProperty('set')) {
          this.cityList = data.set.records;
          console.log(this.cityList);
        }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  getRelationShip() {
    var param = this.accOpeningService.getDropDownMasterParam(DropDownMaster.NOMINEE_TYPE);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_GETREFCODE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        if (data.hasOwnProperty('listofDataset')) {
          this.relationShipList = data.listofDataset[0].records;
          console.log(this.relationShipList);
          var relationData = this.relationShipList;
          var finalrelation = []

          for( var i = 0; i < relationData.length; i++){
              //console.log(relationData);
              if ( relationData[i].ref_code === 'HUS') {
                  relationData.splice(i, 1);
                  i--;
              }
              console.log(JSON.stringify(relationData))
              if(relationData[i].DESCRIPTION == 'MOTHER' || relationData[i].DESCRIPTION == 'SON'|| relationData[i].DESCRIPTION == 'DAUGHTER' || relationData[i].DESCRIPTION == 'OTHERS'){
                finalrelation.push(relationData[i])
              }

          }
          //console.log(relationData);
          this.relationShipList = finalrelation;
          console.log(this.relationShipList);
        }
      }
      else {
        this.relationShipList = [
          { "DESCRIPTION": "Father", "ref_code": "1" },
          { "DESCRIPTION": "Mother", "ref_code": "2" },
          { "DESCRIPTION": "Daughter", "ref_code": "3" },
          { "DESCRIPTION": "Son", "ref_code": "4" },
          { "DESCRIPTION": "Brother", "ref_code": "5" },
          { "DESCRIPTION": "Sister", "ref_code": "6" },

        ]
        this.errorCallBack(data.subActionId, resp);
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
        ]
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }
  openPopUp(){

    this.commonMethod.openPopup("div.tpin-popup")
  }
  closepopup(){
    this.commonMethod.closePopup("div.tpin-popup")
  }
}
