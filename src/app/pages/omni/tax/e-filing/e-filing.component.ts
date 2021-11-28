import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/app.constant';
import * as moment from 'moment';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { TracesFormService } from '../traces-form/traces-form.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { MyAccountInfoService } from '../../my-accounts/my-accounts-info/my-account-info.service';

@Component({
  selector: 'app-e-filing',
  templateUrl: './e-filing.component.html',
  styleUrls: ['./e-filing.component.scss']
})
export class EFilingComponent implements OnInit {

  signedData: any;
  constructor(
    private router: Router,
    public dataService: DataService,
    public constant: AppConstants,
    private http: HttpRestApiService,
    private traceFormService: TracesFormService,
    private storage: LocalStorageService,
    private myAccountInfoService : MyAccountInfoService,
    private encryptDecryptService: EncryptDecryptService) { }
    accountDtls:any;
  directTaxEfilingForm: FormGroup;
  accountNo: any;
  panNumber: any;
  ifscCode="";
  accountList = [];
  selectedAccount:any;
  eFillingLink = 'https://eportalut.incometax.gov.in/iecuat/netbanking/login'
  // eFillingLink = 'https://uatfoportal.incometax.gov.in/services/login/banksso.html';

  ngOnInit(): void {
    this.buildForm();
    this.setAccountDetails();
    this.dataService.setPageSettings('E-FILING');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('E-FILING', this.router.url)
    this.panNumber = this.dataService.profiledateDetails[0].panNumber
    this.accountNo = this.dataService.primaryAccountDtl.accountNo
    // this.ifscCode = this.dataService.primaryAccountDtl.ifscCode
    this.AccountEnquiryDtl();
    // this.getIFSCCodefromBranchCode()
  }

  setAccountDetails(){
    this.accountList = this.dataService.customerOperativeAccList;
    this.accountList.map((account)=>{
      if(account.accountFlag == 'P'){
        this.directTaxEfilingForm.patchValue({
          accountNumber:account.accountNo
        })
        this.getSelectedAccount(account.accountNo);
      }
    })
  }

  getSelectedAccount(accountNo){
    this.selectedAccount = this.accountList.filter((account)=>{ return account.accountNo == accountNo})
  }

  getIFSCCodefromBranchCode() {
    // let param = this.traceFormService.getPKCS7Signature(formData);
    // this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GENERATESIGNATURE).subscribe(data => {
    //   var resp = data.responseParameter;
    //   if (resp.opstatus == "00") {

    //   }
    //   else {
    //     // this.errorCallBack(data.subActionId, resp);
    //   }
    // });

}

goToPage(routeName) {
  this.router.navigateByUrl('/' + routeName);
}

buildForm() {
  this.directTaxEfilingForm = new FormGroup({
    accountNumber : new FormControl('', [Validators.required]),
    termsCondition: new FormControl('', [Validators.required]),
  })
}

validateForm(value) {
  if (this.directTaxEfilingForm.invalid) {
    this.directTaxEfilingForm.get('termsCondition').markAsTouched();
  }

}


AccountEnquiryDtl() {
  var param = this.myAccountInfoService.getAccountEnquiryParam(this.dataService.primaryAccountDtl);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ACCOUNTINQUIRY).subscribe(data => {
    var resp = data.responseParameter;
    if (resp.opstatus == "00") {
      console.log(data);
      if (data.hasOwnProperty("set")) {
        this.accountDtls = data.set.records[0];
        this.ifscCode = this.accountDtls.ifscCode;
      }
    }
    else {

    }
  });
}

directTaxSubmit() {
  var self = this
  console.log("profile data ", this.dataService.profiledateDetails)
  var userAccountDetails = this.dataService.primaryAccountDtl
  console.log("account No ", userAccountDetails)

  if (this.directTaxEfilingForm.valid) {

    var userData = {
      'UserID': 'B100000031',
      'PAN': this.dataService.profiledateDetails[0].panNumber ? this.dataService.profiledateDetails[0].panNumber : null,
      'RequestTimestamp': moment(new Date()).format("YYYY-MM-DD-HH.mm.ss.SSSSSS"),
      'AccountNumber': this.directTaxEfilingForm.get('accountNumber').value ? this.directTaxEfilingForm.get('accountNumber').value : null,
      'IFSC': this.ifscCode,
      'AccountType': "SB", //  // TODO : Change this  AccountType from hardcoded to dynamic value currently we are not getting AccountType from MW, just for testing purpose added one AccountType
      'MobileNumber': '91-' + this.storage.getLocalStorage(this.constant.storage_mobileNo),
      'AccountName': this.dataService.profiledateDetails[0].custName ? this.dataService.profiledateDetails[0].custName : null,
      'AccountStatus': this.selectedAccount[0].Status == 'Active' ? '00':  this.selectedAccount[0].Status == 'InActive' ? '53' : this.selectedAccount[0] == 'Dormant' ? '54' : null, // TODO : Change this If account active send 00 else null
      'EmailId': this.dataService.profiledateDetails[0].emailId ? this.dataService.profiledateDetails[0].emailId : null
    }
    console.log("USER DATA :: ", userData)


    console.log(moment(new Date()).format("YYYY-MM-DD-HH.mm.ss.SSSSSS"))

    var formData = userData.UserID + "^" + userData.PAN + "^" + userData.RequestTimestamp + "^" + userData.AccountNumber + "^" + userData.IFSC + "^" + userData.AccountType + "^" + userData.MobileNumber + "^" + userData.AccountName + "^" + userData.AccountStatus + "^" + userData.EmailId
    console.log(formData)

    let param = this.traceFormService.getPKCS7Signature(formData,'E-filling');
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GENERATESIGNATURE).subscribe(data => {
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        // this.router.navigate([]).then(result => {  window.open(this.traceFormLink, '_blank'); });
        var efileForm = document.createElement("form");
        efileForm.setAttribute("method", "post");
        efileForm.setAttribute("action", this.eFillingLink);
        efileForm.setAttribute("name", 'LoginToEFiling');
        efileForm.setAttribute("target", 'EFile');

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "data");
        hiddenField.setAttribute("value", formData);
        efileForm.appendChild(hiddenField);
        var hiddenField2 = document.createElement("input");
        hiddenField2.setAttribute("type", "hidden");
        hiddenField2.setAttribute("name", "signature");
        // hiddenField2.setAttribute("value", this.constant.DSC_Key);
        // this.signedData = this.encryptDecryptService.pkcsEncryptDigitallySignBase64Method(this.constant.DSC_Key, formData);
        // console.log('abc: ', this.signedData);
        hiddenField2.setAttribute("value", resp.Signature);
        //  hiddenField2.setAttribute("value", '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');

        efileForm.appendChild(hiddenField2);
        document.body.appendChild(efileForm);

        // console.log(this.constant.DSC_Key)

        var map = window.open('', 'EFile');

        if (map) {
          efileForm.submit();
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
    this.validateForm('efiling');
  }
}

formatDate() {
  let date_ob = new Date();
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();

  return year + "-" + month + "-" + date + "-" + hours + "." + minutes + "." + seconds;
}


}
