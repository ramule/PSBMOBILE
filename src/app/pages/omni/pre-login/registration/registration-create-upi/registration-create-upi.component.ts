import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { Output, EventEmitter } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { RegistrationCustDetailsService } from '../registration-cust-details/registration-cust-details.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var showToastMessage: any;
@Component({
  selector: 'app-registration-create-upi',
  templateUrl: './registration-create-upi.component.html',
  styleUrls: ['./registration-create-upi.component.scss']
})
export class RegistrationCreateUpiComponent implements OnInit {
  @Output() nextEvent2 = new EventEmitter<number>();
  @Output() prevEvent = new EventEmitter<number>();

  commonPageComponent = {
    'headerType': 'preloginHeader',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/registration'
  }


  registrationFormUpiDtl: FormGroup;
  public formErrorsstep1 = {
    upiId: '',
  };

  upiDtl:any;
  selVpaAcc:any;
  accountList :any;
  isUpiAvailable: boolean = false;
  upiVerified: boolean = false;
  ifAlreadyLinked:boolean = false;
  onGetAccList:boolean = false;
  vpaAddressList:any;
  accountDtl:any=[];
  accDtl:any=[];
  addAccNo:boolean = false;
  errorResult:any;


  constructor(private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private formValidation: FormValidationService,
    private constant: AppConstants,
    private regServices: RegistrationCustDetailsService,
    private localStorage: LocalStorageService,
    private commonMethod:CommonMethods
    ) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
    this.buildForm();
    this.onCheckIsAccValidForVpa();
  }

  onCheckIsAccValidForVpa(){
    var param = this.regServices.getMobileList();
    this.getAccList(param);
  }

  getAccList(param){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_MOBILELIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this._getUpiIfAvailable();
      }
      else {
        this.commonMethod.closeAllPopup();
        this.commonMethod.openPopup('div.popup-bottom.entered-upi-error')
      }
    });
  }



  _getUpiIfAvailable(){
    var param = this.regServices.getVPAListRequestObject();
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_GetPaymentAddressListDetails).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        console.log(data);
        let upiResponse = data.responseParameter.upiResponse;
        let vpaAddressList = upiResponse.responseParameter?.addresslist ? this.DataService.processVPAlist(upiResponse.responseParameter.addresslist) : [];
        console.log(JSON.stringify(vpaAddressList));
        if (vpaAddressList.length > 0 ) {
          vpaAddressList.forEach(el => {
           var _accountDtl = el.accounts.filter(obj => obj.accNum == this.DataService.regFeildData.accNo);
           if(_accountDtl.length != 0){
            this.accountDtl.push(_accountDtl[0]);
            this.accDtl.push(el);
           }
          });

          if(this.accountDtl.length == 1){
            console.log("in one record");
            var paymentAddress = this.accDtl[0].paymentAddress;
            this.registrationFormUpiDtl.patchValue({upiId: paymentAddress.split('@')[0] });
            this.registrationFormUpiDtl.get("upiId").disable();
            this.accountList = this.accountDtl[0];
            this.ifAlreadyLinked = true;
            this.isUpiAvailable = true;
            this.upiVerified = true;
            this.selVpaAcc = this.accountList;
          }
          else if(this.accountDtl.length > 1){
            console.log("more than one record");
            var defaultVpaAc = this.accDtl.filter(obj => obj.default == "Y");
            if(defaultVpaAc.length != 0){
              console.log("is default");
              let _paymentAddress = defaultVpaAc[0].paymentAddress;
              this.registrationFormUpiDtl.patchValue({upiId: _paymentAddress.split('@')[0] });
              this.registrationFormUpiDtl.get("upiId").disable();
              this.accountList = defaultVpaAc[0];
              this.selVpaAcc = this.accountList.accounts.filter(obj => obj.accNum == this.DataService.regFeildData.accNo)[0]
            }
            else{
              console.log("is not default");
              let _paymentAddress = this.accDtl[0].paymentAddress;
              this.registrationFormUpiDtl.patchValue({upiId: _paymentAddress.split('@')[0] });
              this.registrationFormUpiDtl.get("upiId").disable();
              this.accountList = this.accountDtl[0];
              this.selVpaAcc = this.accountList;
            }
            this.ifAlreadyLinked = true;
            this.isUpiAvailable = true;
            this.upiVerified = true;
            console.log("selVpaAcc =======>");
            console.log(this.selVpaAcc);
            console.log(this.accountList);
          }
          else{
            vpaAddressList.forEach(el => {
              if(el.default == "Y"){
                let _paymentAddress = el.paymentAddress;
                this.registrationFormUpiDtl.patchValue({upiId: _paymentAddress.split('@')[0] });
                this.registrationFormUpiDtl.get("upiId").disable();
              }
            });
            this.isUpiAvailable = true;
            this.upiVerified = true;
            var param = this.regServices.getAccountListParam(this.registrationFormUpiDtl.value.upiId);
            this.getAccountListApiCall(param,'onload');
          }
          console.log(this.accountDtl)
        } else {
          var param = this.regServices.checkUpiAddress(this.localStorage.getLocalStorage(this.constant.storage_mobileNo));
          this.checkAvailabilityApiCall(param,'onload');
        }
      }
      else {
        var param = this.regServices.checkUpiAddress(this.localStorage.getLocalStorage(this.constant.storage_mobileNo));
        this.checkAvailabilityApiCall(param,'onload');
      }
    });
  }

  getUpiIfAvailable(){
    var param = this.regServices.getVPAListRequestObject();
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        console.log(data);
        let upiResponse = data.responseParameter.upiResponse;
        let vpaAddressList = upiResponse.responseParameter?.addresslist ? this.DataService.processVPAlist(upiResponse.responseParameter.addresslist) : [];

        if (vpaAddressList.length > 0) {
          //(upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'N')
          this.onGetAccList = false;
          this.ifAlreadyLinked = true;
          this.upiVerified = true;

          if (vpaAddressList.length > 0) {
            console.log(vpaAddressList);
            this.vpaAddressList = vpaAddressList;
            vpaAddressList.forEach(el => {
              if(el.default == "Y"){
                var paymentAddress = el.paymentAddress
                this.registrationFormUpiDtl.patchValue({upiId: paymentAddress.split('@')[0] });
                this.registrationFormUpiDtl.get("upiId").disable();
                this.accountList = el.accounts;
                this.upiDtl = el
              }
            });
            this.isUpiAvailable = true;
          }
          else{
            this.registrationFormUpiDtl.patchValue({upiId: this.localStorage.getLocalStorage(this.constant.storage_mobileNo) });
          }

          // if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'Y') {
          //   this.registrationFormUpiDtl.patchValue({upiId: this.localStorage.getLocalStorage(this.constant.storage_mobileNo) });
          // } else if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'N') {
          //   this.registrationFormUpiDtl.patchValue({upiId: this.localStorage.getLocalStorage(this.constant.storage_mobileNo) });
          // }else{
          //   if (vpaAddressList.length > 0) {
          //     console.log(vpaAddressList);
          //     this.vpaAddressList = vpaAddressList;
          //     vpaAddressList.forEach(el => {
          //       if(el.default == "Y"){
          //         this.registrationFormUpiDtl.patchValue({upiId: el.paymentAddress });
          //         this.accountList = el.accounts;
          //       }
          //     });
          //     this.isUpiAvailable = true;
          //   }
          //   else{
          //     this.registrationFormUpiDtl.patchValue({upiId: this.localStorage.getLocalStorage(this.constant.storage_mobileNo) });
          //   }
          // }




          //User has existing VPAs, check length & default VPA
          // if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'Y') {
          //   if(this.dataService.platform.toLowerCase() == this.constant.val_android) this.plugin.enableSmartIntent(true);
          //   this.commonMethod.openPopup('div.popup-bottom.user-verification');
          // } else if (upiResponse.responseParameter.hasOwnProperty('migratedUser') && upiResponse.responseParameter.migratedUser == 'Y' && upiResponse.responseParameter.activeUser == 'N') {
          //   this.dataService.migratedVPAList = vpaAddressList;
          //   this.commonMethod.openPopup('div.popup-bottom.user-profile-inactive');
          // } else {
          //   if (vpaAddressList.length == 3) {
          //     //Max Limit reached, navigate to upiRegSuccess
          //     this.router.navigate(['/upiRegSuccess']);
          //   } else {
          //     this.dataService.prevUrlForCreateVpaSuccess = "upiRegSuccess";
          //     if (vpaAddressList.some(vpaDetails => vpaDetails.default === 'Y')) {
          //       //navigate to createUPI with defaultVPAflag set to no
          //       this.dataService.createDefaultVPAFlag = false;
          //       this.router.navigate(['/createUpi']);
          //     } else {
          //       //navigate to createUPI with defaultVPAflag set to yes
          //       this.dataService.createDefaultVPAFlag = true;
          //       this.router.navigate(['/createUpi']);
          //     }
          //   }
          // }


        } else {
          var param = this.regServices.checkUpiAddress(this.registrationFormUpiDtl.value.upiId);
          this.checkAvailabilityApiCall(param,'onload');
        }
      }
      else {
        this.checkAvailabilityApiCall(param,'onload');
      }
    });
  }


  getLast4digit(accNo){
    return accNo.toString().substring((accNo).toString().length - 4, (accNo).toString().length);
  }


  /**
   * form intiallization
   */
   buildForm() {
    this.registrationFormUpiDtl = new FormGroup({
      upiId: new FormControl('',[Validators.required])
    });

    this.registrationFormUpiDtl.valueChanges.subscribe((data) => {
      this.formErrorsstep1 = this.formValidation.validateForm(this.registrationFormUpiDtl, this.formErrorsstep1, true);
    });
  }

  submitStep4(){
    //this.nextEvent2.next(4);
    //var param;
    if(this.ifAlreadyLinked){
      //param = this.regServices.addPaymentAddressParam(this.upiDtl,this.registrationFormUpiDtl.value.upiId);
      this.nextEvent2.next(4);
    }
    else if(this.addAccNo){
      this.addAccountAddress();
    }
    else{
      var param = this.regServices._addPaymentAddressParam(this.vpaAddressList,this.registrationFormUpiDtl.value.upiId);
      this.addPaymentAddressApiCall(param);
    }
  }
  prevStep(){
    this.prevEvent.next(4);
  }

  validatesForm() {
    if (this.registrationFormUpiDtl.invalid) {
      this.formValidation.markFormGroupTouched(this.registrationFormUpiDtl);
      return;
    }
  }

  checkAvailability(){
    this.validatesForm();
    if(this.registrationFormUpiDtl.valid){
      console.log(this.registrationFormUpiDtl.value);
      var param = this.regServices.checkUpiAddress(this.registrationFormUpiDtl.value.upiId);
      this.checkAvailabilityApiCall(param);
    }else{
      this.formErrorsstep1 = this.formValidation.validateForm(this.registrationFormUpiDtl, this.formErrorsstep1, true);
    }
  }

  checkAvailabilityApiCall(param,type?:any){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_VERIFYUPIPAYMENTADDRESS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        // var param = this.regServices.fetchAccountListParam();
        // this.fetchAccountListApiCall(param);
        if(type == "onload"){
          this.registrationFormUpiDtl.patchValue({upiId: this.localStorage.getLocalStorage(this.constant.storage_mobileNo) });
          this.registrationFormUpiDtl.get("upiId").enable();
        }
        var param = this.regServices.getAccountListParam(this.registrationFormUpiDtl.value.upiId);
        this.getAccountListApiCall(param);

      }
      else {
        if(type != "onload"){
          this.DataService.errorResult = resp.Result
          this.commonMethod.openPopup('div.popup-bottom.entered-upi-error')
        }
      }
    });
  }

  getAccountListApiCall(param,type?:any){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_GetAccountList).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter.upiResponse);
        if(data.responseParameter.hasOwnProperty('upiResponse')){
          var userDtl = data.responseParameter.upiResponse.responseParameter
          this.vpaAddressList = userDtl.RESULT.filter(obj => obj.ACCNUMBER == this.DataService.regFeildData.accNo);
          this.ifAlreadyLinked = false;
          this.onGetAccList = true;
          this.upiVerified = true;
          if(type == "onload"){
            this.addAccNo = true;
          }
        }

      }
      else {
        this.commonMethod.openPopup('div.popup-bottom.entered-upi-error');
      }
    });

  }

  skip(popup){
    this.nextEvent2.next(4);
    this.commonMethod.closePopup('div.popup-bottom.'+popup);
  }

  closePopup(popup){
    this.commonMethod.closePopup(popup);
  }

  fetchAccountListApiCall(param){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_FETCHUPIACCOUNTLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter.upiResponse);
        if(data.responseParameter.hasOwnProperty('upiResponse')){
          this.upiDtl = JSON.parse(data.responseParameter.upiResponse);
        }

      }
      else {

      }
    });
  }

  addPaymentAddressApiCall(param){
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_ADDUPIPAYMENTADDRESS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent2.next(4);
      }
      else {
      }
    });
  }

  addAccountAddress(){
    var param = this.regServices.addAccountAddress(this.registrationFormUpiDtl.value.upiId,this.vpaAddressList[0]);
    this.http.callBankingAPIService(param, this.localStorage.getLocalStorage(this.constant.key_deviceId), this.constant.serviceName_AddAccountToVpa).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);
        this.nextEvent2.next(4);
      }
      else {
      }
    });
  }

  _skip(){
    this.nextEvent2.next(4);
  }
}
