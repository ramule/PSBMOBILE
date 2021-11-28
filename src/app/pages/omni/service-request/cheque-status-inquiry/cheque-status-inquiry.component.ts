import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { StopChequesService } from '../stop-cheque/stop-cheques/stop-cheques.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { Location } from '@angular/common'
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var showToastMessage: any;
@Component({
  selector: 'app-cheque-status-inquiry',
  templateUrl: './cheque-status-inquiry.component.html',
  styleUrls: ['./cheque-status-inquiry.component.scss']
})
export class ChequeStatusInquiryComponent implements OnInit {

  chequeStatusEnquiryForm : FormGroup
  chequeTypeModel = "single" ;
  chequeList:any = [];
  newarr:any=[];
  selectedAccount:any;
  SchemeCode:any;
  platform:any;

  constructor( private router:Router, public dataService: DataService,
      private stopChequeService:StopChequesService,
      private http: HttpRestApiService,
      private storage:LocalStorageService,
      private constant:AppConstants,
      private location: Location,
      private commonMethod :CommonMethods
    ) { }

  ngOnInit(): void {
    this.platform = this.constant.getPlatform()
    this.dataService.setPageSettings('CHEQUE_STATUS_INQUIRY');
    this.buildForm();
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true);
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('CHEQUE_STATUS_INQUIRY' , this.router.url)
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    history.pushState({}, backUrl, this.location.prepareExternalUrl(backUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  buildForm() {
    this.chequeStatusEnquiryForm = new FormGroup({
      account: new FormControl('', [Validators.required]),
      radioboxdemo: new FormControl('', [Validators.required]),
      chequeNumber: new FormControl('', [Validators.required,Validators.minLength(6),Validators.min(1)]),
      fromChequeNumber: new FormControl('',[Validators.required, Validators.minLength(6),Validators.min(1)]),
      toChequeNumber: new FormControl('',[Validators.required, Validators.minLength(6),Validators.min(1)]),
      remarks: new FormControl('', {validators:Validators.pattern('^[A-Za-z0-9]*')} ),
      accountNo: new FormControl(''),
    });

  }

  validateForm() {
    if (this.chequeStatusEnquiryForm.invalid) {
      this.chequeStatusEnquiryForm.get('account').markAsTouched();
      this.chequeStatusEnquiryForm.get('radioboxdemo').markAsTouched();
      this.chequeStatusEnquiryForm.get('chequeNumber').markAsTouched();
      this.chequeStatusEnquiryForm.get('fromChequeNumber').markAsTouched();
      this.chequeStatusEnquiryForm.get('toChequeNumber').markAsTouched();
      this.chequeStatusEnquiryForm.get('remarks').markAsTouched();

       return;
    }
  }

  enqnuiryStatus() {
    if (this.chequeStatusEnquiryForm.value.radioboxdemo == 'single') {
      this.chequeStatusEnquiryForm.get('fromChequeNumber').clearValidators(); // 6. Clear All Validators
      this.chequeStatusEnquiryForm.get('fromChequeNumber').updateValueAndValidity();
      this.chequeStatusEnquiryForm.get('toChequeNumber').clearValidators(); // 6. Clear All Validators
      this.chequeStatusEnquiryForm.get('toChequeNumber').updateValueAndValidity();
    } else {
      this.chequeStatusEnquiryForm.get('chequeNumber').clearValidators(); // 6. Clear All Validators
      this.chequeStatusEnquiryForm.get('chequeNumber').updateValueAndValidity();
      this.chequeStatusEnquiryForm.get('fromChequeNumber').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
      this.chequeStatusEnquiryForm.get('fromChequeNumber').updateValueAndValidity();
      this.chequeStatusEnquiryForm.get('toChequeNumber').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
      this.chequeStatusEnquiryForm.get('toChequeNumber').updateValueAndValidity();
    }
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  chequeEnquiryStatusSubmit(){
    this.enqnuiryStatus()

    if(this.chequeStatusEnquiryForm.valid){
      console.log(this.chequeStatusEnquiryForm.value)

      if (this.chequeStatusEnquiryForm.value.radioboxdemo == 'single') {
        this.singleCheckEnquiry();
      }else{
        this.bulkCheckEnquiry();
      }

    }
    else{
      this.validateForm()
    }
  }

  singleCheckEnquiry(){

      let param = this.stopChequeService.getSingleChequeInquiryParam(this.chequeStatusEnquiryForm.value , '');
      this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHEQUESTATUSINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.dataService.singleChequeNumber = this.chequeStatusEnquiryForm.value.chequeNumber;
          this.dataService.bulkChequeInquiryList  = [];
          this.dataService.singleChequeInquiryList  = [];
          this.dataService.singleChequeInquiryList = data.set.records
          this.router.navigateByUrl('/chequeStatusList');
          // showToastMessage(resp.Result,"error");
        }
        else {
          this.errorCallBack(data.subActionId, resp);
        }
      })

}

bulkCheckEnquiry(){

  let param = this.stopChequeService.getBulkChequeInquiryParam(this.chequeStatusEnquiryForm.value);
  this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BULKCHEQUEINQUIRY).subscribe(data => {
    console.log(data);
    var resp = data.responseParameter
    if (resp.opstatus == "00") {
     
      this.dataService.singleChequeInquiryList  = [];
      this.dataService.bulkChequeInquiryList  = [];
    
      this.dataService.bulkChequeInquiryList=data.set.records;
      this.newarr= this.dataService.bulkChequeInquiryList.pop();
      this.dataService.bulkChequeInquiryList
      console.log("bulkChequeInquiryList", this.dataService.bulkChequeInquiryList)
      console.log("newarr",  this.newarr)
      this.router.navigateByUrl('/chequeStatusList');
    }
    else {
      this.errorCallBack(data.subActionId, resp);
    }
  })

}

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(subActionId, resp) {
    // showToastMessage(resp.Result,"error");
  }

  cancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.location.back();
    }
  }

  chequeInquirySubmit(){

  }


  onAccountSelectType(){
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  onFromAccountSelect(event){
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = event;
    this.SchemeCode = this.dataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].SchemeCode;
    var accountNo = this.dataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].sbAccount;
    var userDtl = this.SchemeCode +" "+accountNo; 
    this.chequeStatusEnquiryForm.patchValue({ accountNo: userDtl });
    this.chequeStatusEnquiryForm.patchValue({ account: this.selectedAccount });
  }


  closePopup(){
    this.commonMethod.closePopup('div.popup-bottom.sel-account');
  }


}
