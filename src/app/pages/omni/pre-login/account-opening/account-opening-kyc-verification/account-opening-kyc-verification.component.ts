import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { TranslatePipe } from '../../../../../pipes/translate.pipe';
import { AccountOpeningStepsService } from '../account-opening-steps/account-opening-steps.service';
import { DropDownMaster, AccountOpeningSteps } from '../../../../../utilities/app-enum';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-account-opening-kyc-verification',
  templateUrl: './account-opening-kyc-verification.component.html',
  styleUrls: ['./account-opening-kyc-verification.component.scss']
})
export class AccountOpeningKycVerificationComponent implements OnInit {
  kycValidtionForm: FormGroup;
  verifyAadhar = false;
  notValidPanMsg: any;
  headerdata = {
    'headerType': 'UpiMainHeader',  //Options: TitleHeader , preloginHeader
    'titleName': '',            // Note : add titlename if headerType = TitleHeader
    'footertype': 'none' //Options: upiFooter , none
  };

  transactionId:any;
  errorMsg:any;
  addharhide: boolean = true;
  panhide: boolean = true;

  constructor(private router: Router,
    private commonMethods: CommonMethods,
    private form: FormBuilder,
    private dataService: DataService,
    private translate: TranslatePipe,
    public accOpeningService: AccountOpeningStepsService,
    private http: HttpRestApiService,
    private constant: AppConstants,
  ) { }

  ngOnInit(): void {
    this.transactionId = "PSB:OMNI:"+this.commonMethods.genRandomDigit(4)
    this.dataService.changeMessage(this.headerdata);
    this.buildForm();
  }

  routeTo(location) {
    console.log('location', location);
    this.router.navigateByUrl(location);
  }

  validateForm() {
    if (this.kycValidtionForm.invalid) {
      this.kycValidtionForm.get('panNumber').markAsTouched();
      this.kycValidtionForm.get('aadhaarNumber').markAsTouched();
      this.kycValidtionForm.get('acceptTerms1').markAsTouched();
      this.kycValidtionForm.get('acceptTerms2').markAsTouched();
      this.kycValidtionForm.get('aadharOTP').markAsTouched();
      return;
    }
  }


  buildForm() {
    this.kycValidtionForm = new FormGroup({
      panNumber: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/),Validators.minLength(10),Validators.maxLength(10)]),
      aadhaarNumber: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validators.minLength(12)]),
      acceptTerms1: new FormControl('', [Validators.required]),
      acceptTerms2: new FormControl('', [Validators.required]),
      aadharOTP: new FormControl()
    });
  }

  verifyAadharclick() {
    this.validateForm();
    console.log(this.kycValidtionForm.value);
    if (this.kycValidtionForm.valid && this.kycValidtionForm.value.acceptTerms1 && this.kycValidtionForm.value.acceptTerms2) {
      this.validatePanNumber(); //TODO: to be enabled if nsdl services are working
      //this.validateAadharNoFromCbs();
    }
    else{

    }
  }


  /***************************************************************/
  /******** Validate pan from Cbs ********/
  /******** Function to validate pan from cbs and check if ********/
  /******** Customer exist ********/
  /***************************************************************/

  validatePanNumber() {//AAIPM3854E
    var param = this.accOpeningService.getPanValidationParam(this.dataService.accountOpenMobNo, this.kycValidtionForm.value.panNumber);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_PANVALIDATION).subscribe(data => {
      console.log("=====validatePanNumber=====", data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        var panDtl;
        if (data.responseParameter.hasOwnProperty('PanDetails')) {
          panDtl = JSON.parse(data.responseParameter.PanDetails);
          if (panDtl.hasOwnProperty('firstName') && panDtl.panStatus == "EXISTING AND VALID") {
        if(panDtl == undefined || panDtl == null || panDtl == ""){
          this.errorMsg = "Unable to fetch PAN information";
          this.commonMethods.openPopup("div.popup-bottom.invalid-pan-aadhar");
          return;
        }

        var name = "";
        if(this.dataService.accountOpenFldData.middlename == ""){
          name = this.dataService.accountOpenFldData.FirstName+ " "+ this.dataService.accountOpenFldData.LastName;
        }
        else{
          name = this.dataService.accountOpenFldData.FirstName+ " "+ this.dataService.accountOpenFldData.middlename +" "+ this.dataService.accountOpenFldData.LastName;
        }

      // if(panDtl.nameOnCard.trim().toLowerCase() == name.trim().toLowerCase()){
      if(this.dataService.accountOpenFldData.FirstName.toLowerCase()==panDtl.firstName.toLowerCase() && this.dataService.accountOpenFldData.middlename.toLowerCase() == panDtl.middleName.toLowerCase() && this.dataService.accountOpenFldData.LastName.toLowerCase()==panDtl.lastName.toLowerCase()){
        this.validateAadharNoFromCbs();
       }
       else{
         this.errorMsg = "Please enter valid details as per PAN records";
         this.commonMethods.openPopup('div.popup-bottom.invalid-pan-aadhar');
       }

          }
          else {
            this.notValidPanMsg = panDtl.panStatus;
            this.commonMethods.openPopup('div.popup-bottom.not-a-valid-pan');
          }

        }

        else{
          //this.validateAadharNo();
          this.notValidPanMsg = "pan record not avialable";
          this.commonMethods.openPopup('div.popup-bottom.not-a-valid-pan');
        }
        //"{"pan":"AAIPM3854E","panStatus":"EXISTING AND VALID","lastName":"MAHESHWARI","firstName":"SUDHA","middleName":"","panTitle":"Smt","lastUpdateDate":"31/05/2018"}"

      }
      else {
      //  this.validateAadharNoSendOtp(); /// PAN already exist in cbs
      }
    });
  }

  /***************************************************************/
  /******** Validate pan from nsdl ********/
  /******** Function to validate pan from nsdl and check if ********/
  /******** Entered pan Number is valid or not ********/
  /***************************************************************/


  /***************************************************************/
  /******** Validate Aadhaar from cbs ********/
  /******** Function to validate pan from cbs and check if ********/
  /******** Entered Aadhar detail of existing customer ********/
  /***************************************************************/

  panInput(){
    this.kycValidtionForm.patchValue({
      panNumber: this.kycValidtionForm.value.panNumber.toUpperCase()
    })
  }

  validateAadharNoFromCbs() {
    var param = this.accOpeningService.getAadharValidationFromCbs(this.dataService.accountOpenMobNo, this.kycValidtionForm.value.aadhaarNumber);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_AAADHARCVALIDATION).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.errorMsg = "Entered Aadhaar Number already exists in our records. Please try registering for PSB UnIC or Contact your nearest Branch";
         this.commonMethods.openPopup('div.popup-bottom.invalid-pan-aadhar');
      }
      else {
        this.validateAadharNoSendOtp();
      }
    });
  }


  /***************************************************************/
  /******** Validate Aadhaar from UIDAI ********/
  /******** Function to generate otp ********/
  /******** Otp will be sent to mobile number of entered aadhar ********/
  /***************************************************************/

  validateAadharNoSendOtp(clickFrom?: any) {
    this.transactionId = "PSB:OMNI:"+this.commonMethods.genRandomDigit(4)
    var param = this.accOpeningService.getAadharOtpValidation( this.kycValidtionForm.value.aadhaarNumber,this.transactionId);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_UIDAIOTPGENERATE).subscribe(data => {
      console.log("=====validateAadharNo=====", data);
      this.kycValidtionForm.patchValue({ "aadharOTP" : "" });
      
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        if (clickFrom != 'resend') {
          this.verifyAadhar = !this.verifyAadhar;
          this.kycValidtionForm.controls['aadharOTP'].setValidators([Validators.required]);
          this.kycValidtionForm.controls['aadharOTP'].updateValueAndValidity();
        }
        this.commonMethods.openPopup('div.popup-bottom.aadhar-otp-confirm')
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }



  /***************************************************************/
  /******** Validate Aadhaar from UIDAI ********/
  /******** Function to validate otp ********/
  /******** And get user detail to map record ********/
  /***************************************************************/

  submitForm() {
    console.log("submitForm");
    if (this.kycValidtionForm.valid) {
      this.validateAadharOtp(); //validate
      // this.dataService.accountOpenFldData.panNumber = this.kycValidtionForm.value.panNumber;
      // this.dataService.accountOpenFldData.aadharNumber = this.kycValidtionForm.value.aadhaarNumber;
      // this.getSaveAccountDtl();
    }
  }

  validateAadharOtp(){
    //this.transactionId = "PSB:OMNI:"+this.commonMethods.genRandomDigit(4)
    var param = this.accOpeningService.getAadhaarValOtp(this.kycValidtionForm.value.aadhaarNumber,this.kycValidtionForm.value.aadharOTP,this.transactionId);
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_UIDAIKYCDETAILS).subscribe(data => {
      console.log("=====validateAadharNo=====", data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        var uadaiDetails = JSON.parse(resp.UIDAIDetails);

        if(uadaiDetails?.name == undefined || uadaiDetails?.name == null || uadaiDetails?.name == ""){
          this.errorMsg = "Unable to fetch Aadhaar information";
          this.commonMethods.openPopup("div.popup-bottom.invalid-pan-aadhar");
          return;
        }

        var name = "";
        if(this.dataService.accountOpenFldData.middlename == ""){
          name = this.dataService.accountOpenFldData.FirstName+ " "+ this.dataService.accountOpenFldData.LastName;
        }
        else{
          name = this.dataService.accountOpenFldData.FirstName+ " "+ this.dataService.accountOpenFldData.middlename +" "+ this.dataService.accountOpenFldData.LastName;
        }

       if(uadaiDetails.name.trim().toLowerCase() == name.trim().toLowerCase()){
        this.dataService.accountOpenFldData.permanentAddrState = uadaiDetails.state!="" ? uadaiDetails.state : ""
        this.dataService.accountOpenFldData.gender = uadaiDetails?.gender!=""  ? uadaiDetails?.gender : ""
        this.dataService.accountOpenFldData.dob = uadaiDetails?.dob !="" ? uadaiDetails?.dob : ""
        var p1 = uadaiDetails.hasOwnProperty('house') ? uadaiDetails?.house : "" 
        var p2 = uadaiDetails.hasOwnProperty('street') ? uadaiDetails?.street : "" 
        var p3 = uadaiDetails.hasOwnProperty('landMark') ? uadaiDetails?.landMark : "" 
        this.dataService.accountOpenFldData.permanentAddrL1 = p1 +" "+ p2 +" "+ p3
        this.dataService.accountOpenFldData.permanentAddrCity = uadaiDetails?.dist!="" ? uadaiDetails?.dist : ""
        this.dataService.accountOpenFldData.permanentAddrPin = uadaiDetails?.pinCode!="" ? uadaiDetails?.pinCode : ""
        this.dataService.accountOpenFldData.nationality = "Indian";
        // this.dataService.accountOpenFldData.FirstName = data.set.records[0].FirstName
        // this.dataService.accountOpenFldData.LastName = data.set.records[0].LastName
        var add1 = uadaiDetails.hasOwnProperty('locality') ? uadaiDetails?.locality : "" 
        var add3 = uadaiDetails.hasOwnProperty('dist') ? uadaiDetails?.dist : "" 
        var add4 = uadaiDetails.hasOwnProperty('pinCode') ? uadaiDetails?.pinCode : "" 
        var add2 = uadaiDetails.hasOwnProperty('vtc') ? uadaiDetails?.vtc : ""
        this.dataService.accountOpenFldData.permanentAddrL2 = add1 +" "+ add2 +" "+ add3 +" "+ add4
        //this.dataService.accountOpenFldData.permanentAddrL2 = uadaiDetails['locality'] +" " + uadaiDetails['dist'] +" " + uadaiDetails['pinCode'] +" " + uadaiDetails['vtc']
        this.dataService.accountOpenFldData.panNumber = this.kycValidtionForm.value.panNumber!="" ? this.kycValidtionForm.value.panNumber : "";
        this.dataService.accountOpenFldData.aadharNumber = this.kycValidtionForm.value.aadhaarNumber!="" ? this.kycValidtionForm.value.aadhaarNumber : "";
        this.getSaveAccountDtl();

        
       }
       else{
         this.errorMsg = "Please enter valid details as per Aadhaar records";
         this.commonMethods.openPopup('div.popup-bottom.invalid-pan-aadhar');
         //Please enter valid details
       }
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }








  goBack() {
    if(this.constant.getPlatform() == 'web'){
      this.router.navigateByUrl("/nliLanding");
    }
    else{
      this.router.navigateByUrl("/LandingPage");
    }
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    //showToastMessage(resp.Result, "error");
  }

  closePopup(popUpName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popUpName);
  }

  /***************************************************************/
  /******** Get Already Filled Account Detail to pre-fill and migrate to respective step ********/
  /***************************************************************/

  getSaveAccountDtl() {
    var param = this.accOpeningService.getSaveaAccOpenParam(AccountOpeningSteps.ACCOUNT_SELECTION, 0, 'GET');
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serivceName_SAVEACCOUNTOPENINGDATA).subscribe(data => {
      console.log("=====GET CREATEACCOUNT=====", data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.dataService.accountOpenFldData.aadharLinkDBT1 = data.responseParameter.addharLinkDBT1 == "Y" ? true : false;
        this.dataService.accountOpenFldData.aadharLinkDBT2 = data.responseParameter.addharLinkDBT2 == "Y" ? true : false;
        this.dataService.accountOpenFldData.annualIncome = data.responseParameter.annualIncome!="" ? data.responseParameter.annualIncome:'';
        this.dataService.accountOpenFldData.branchCode = data.responseParameter.branchCode!=""?data.responseParameter.branchCode:'';
        this.dataService.accountOpenFldData.branchPinCode = data.responseParameter.branchPinCode!=""?data.responseParameter.branchPinCode:'';
        this.dataService.accountOpenFldData.branchSearchType = data.responseParameter.branchSearchType == 'state' ? data.responseParameter.branchSearchType : 'pincode';
        this.dataService.accountOpenFldData.category = data.responseParameter.category!="" ? data.responseParameter.category:'';
        this.dataService.accountOpenFldData.isCommunAdrSameAsPermanent = data.responseParameter.commAddSameAsPermanent == "Y" ? true : false;
        this.dataService.accountOpenFldData.communicationAddrCity = data.responseParameter.communicationAddrCity!=""?data.responseParameter.communicationAddrCity:'';
        this.dataService.accountOpenFldData.communicationAddrL1 = data.responseParameter.communicationAddrL1!=""?data.responseParameter.communicationAddrL1:'';
        this.dataService.accountOpenFldData.communicationAddrL2 = data.responseParameter.communicationAddrL2!=""?data.responseParameter.communicationAddrL2:'';
        this.dataService.accountOpenFldData.communicationAddrPin = data.responseParameter.communicationAddrPin!=""?data.responseParameter.communicationAddrPin:'';
        this.dataService.accountOpenFldData.communicationAddrState = data.responseParameter.communicationAddrState!=""?data.responseParameter.communicationAddrState:'';
        this.dataService.accountOpenFldData.community = data.responseParameter.community!=""?data.responseParameter.community:''
        this.dataService.accountOpenFldData.donNotWantNominee = data.responseParameter.donNotWantNominee == "Yes" ? true : false;
        this.dataService.accountOpenFldData.fatherName = data.responseParameter.fatherName!=""?data.responseParameter.fatherName:'';
        this.dataService.accountOpenFldData.maritalStatus = data.responseParameter.maritalStatus!=""?data.responseParameter.maritalStatus:'';
        this.dataService.accountOpenFldData.motherName = data.responseParameter.motherName!=""?data.responseParameter.motherName:'';
        this.dataService.accountOpenFldData.isNomineeAddSameAsPermanent = data.responseParameter.nomineeAddSameAsPermanent == "Y" ? true : false;
        this.dataService.accountOpenFldData.nomineeAddrCity = data.responseParameter.nomineeAddrCity!=""?data.responseParameter.nomineeAddrCity:'';
        this.dataService.accountOpenFldData.nomineeAddrL1 = data.responseParameter.nomineeAddrL1!=""?data.responseParameter.nomineeAddrL1:'';
        this.dataService.accountOpenFldData.nomineeAddrL2 = data.responseParameter.nomineeAddrL2!=""?data.responseParameter.nomineeAddrL2:'';
        this.dataService.accountOpenFldData.nomineeAddrPin = data.responseParameter.nomineeAddrPin!=""?data.responseParameter.nomineeAddrPin:'';
        this.dataService.accountOpenFldData.nomineeAddrState = data.responseParameter.nomineeAddrState!=""?data.responseParameter.nomineeAddrState:'';
        this.dataService.accountOpenFldData.nomineeDOB = new Date(data.responseParameter.nomineeDOB);
        this.dataService.accountOpenFldData.nomineeName = data.responseParameter.nomineeName!=""?data.responseParameter.nomineeName:'';
        this.dataService.accountOpenFldData.nomineeRelationship = data.responseParameter.nomineeRelationship!=""?data.responseParameter.nomineeRelationship:'';
        this.dataService.accountOpenFldData.occupation = data.responseParameter.occupation!=""?data.responseParameter.occupation:'';
        this.dataService.accountOpenFldData.guardianAddrL1 = data.responseParameter.guardianAddrL1!=""?data.responseParameter.guardianAddrL1:'';
        this.dataService.accountOpenFldData.guardianAddrL2 = data.responseParameter.guardianAddrL2!=""?data.responseParameter.guardianAddrL2:'';
        this.dataService.accountOpenFldData.guardianAddrCity = data.responseParameter.guardianAddrCity!=""?data.responseParameter.guardianAddrCity:'';
        this.dataService.accountOpenFldData.guardianAddrState = data.responseParameter.guardianAddrState!=""?data.responseParameter.guardianAddrState:'';
        this.dataService.accountOpenFldData.guardianAddrPin = data.responseParameter.guardianAddrPin!=""?data.responseParameter.guardianAddrPin:'';
        this.dataService.accountOpenFldData.guardian = data.responseParameter.guardian!=""?data.responseParameter.guardian:'';
        this.dataService.accountOpenFldData.guardianType = data.responseParameter.guardianType!=""?data.responseParameter.guardianType:'';

        if(data.responseParameter.branchCode!="")
        this.dataService.accountOpenFldData.branchSearchType = 'state'
        else
        this.dataService.accountOpenFldData.branchSearchType = 'pincode'

        switch (data.responseParameter.lastDraftPage) {
          case AccountOpeningSteps.PERSONAL_DETAILS: {
            this.dataService.accountOpenIsAtStep = 1;
            break;
          }
          case AccountOpeningSteps.ADDITIONAL_DETAILS: {
            this.dataService.accountOpenIsAtStep = 2;
            break;
          }
          case AccountOpeningSteps.BRANCH_DETAILS: {
            this.dataService.accountOpenIsAtStep = 3;
            break;
          }
          case AccountOpeningSteps.NOMINEE_DETAILS: {
            this.dataService.accountOpenIsAtStep = 4;
            break;
          }
          case AccountOpeningSteps.CREATE_UPI_ID: {
            this.dataService.accountOpenIsAtStep = 5;
            break;
          }
          case AccountOpeningSteps.ACCOUNT_SELECTION: {
            this.dataService.accountOpenIsAtStep = 6;
            break;
          }
          default: {
            this.dataService.accountOpenIsAtStep = 1;
            break;
          }
        }

        this.router.navigateByUrl("/accountOpeningSteps")
      }
      else if(resp.opstatus == "02"){
        this.dataService.accountOpenIsAtStep = 1;
        this.router.navigateByUrl("/accountOpeningSteps");
      }
      else {
      //  this.errorCallBack(data.subActionId, resp);
        this.dataService.accountOpenIsAtStep = 1;
        this.router.navigateByUrl("/accountOpeningSteps")


      }
    });
  }

  aadharShow()
  {
    if(this.addharhide==true)
    this.addharhide=false
    else
    this.addharhide=true
  }

  panShow()
  {
    if(this.panhide==true)
    this.panhide=false
    else
    this.panhide=true
  }

}
