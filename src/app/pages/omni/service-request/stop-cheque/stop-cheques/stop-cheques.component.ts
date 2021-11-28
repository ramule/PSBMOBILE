import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { StopChequesService } from './stop-cheques.service';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common'
declare var showToastMessage: any;
@Component({
  selector: 'app-stop-cheques',
  templateUrl: './stop-cheques.component.html',
  styleUrls: ['./stop-cheques.component.scss']
})
export class StopChequesComponent implements OnInit {
  stopChequeForm: FormGroup;
  public formErrorsStopCheques = {
    // accountNo:'',
    accNo: '',
    chequeType: '',
    chequeNo: '',
    chequeStartNo: '',
    chequeEndNo: '',
    remark: ''
  };
  stopChequeTpe: string = ''
  chequeType:any;
  commonPageComponent :any;
  chequeTypeModel = "single" ;
  status = '';
  statusSingle = '';
  noOfLeaves:any = '';
  reasonList:any = [];
  reasonProductList:any=[];
  accountList:any=[];
  selAccNo:any ="";
  SchemeCode:any;
  platform:any;
  selectedAccount:any;
  selectedAccName:any;
  

  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private storage:LocalStorageService,
    private formValidation: FormValidationService,
    private constant:AppConstants,
    private stopChequeService: StopChequesService,
    private commonMethod:CommonMethods,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.buildForm();
    this.platform = this.constant.getPlatform()
    this.DataService.setPageSettings('STOP_CHEQUES');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);

    this.DataService.getBreadcrumb('STOP_CHEQUES' , this.router.url);

    // var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile'
    var backURL = '';
    if(this.DataService.isCordovaAvailable){
      if(this.DataService.quickAccessFromDashboard){
        backURL = 'mobQuickAccessLanding';
      }else{
        backURL = 'dashboardMobile';
      }
    }else{
      backURL = 'dashboard';
    }
    history.pushState({}, backURL, this.location.prepareExternalUrl(backURL));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));


    this.accountList = this.DataService.customerOperativeAccList;
    this.accountList = this.accountList.filter( (obj) =>(obj.accountType!='CAPPI' && obj.Status.toLowerCase()=='active'));
    var fromIndex = this.accountList.findIndex(e => e.accountFlag == 'P');
    var element = this.accountList[fromIndex];
    this.accountList.splice(fromIndex, 1);
    this.accountList.splice(0, 0, element);
    this.stopChequeForm.patchValue({ account : this.accountList[0].accountNo });
    this.stopChequeForm.patchValue({ accountNo : this.accountList[0].SchemeCode +" "+ this.accountList[0].sbAccount }); //for mobile
    this.selectedAccount = this.accountList[0].accountNo;

    
    this.DataService.otpSessionPreviousPage = '/stopcheques';
    let param = this.stopChequeService.getReasonChequeParam();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_PRODUCTLIST).subscribe(data => {
      console.log(data);
      this.reasonList = data.set.records;
       console.log("reasonList", this.reasonList)
        // this.reasonList.forEach(element => {
        //  if(element.productId=="114" || element.productId=="107"  || element.productId=="108" ){
        //   this.reasonProductList.push(element);
        //  }
        // });
        console.log("reasonProductList", this.reasonProductList)

      var resp = data.responseParameter
      if (resp.opstatus == "00") {

      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })

  }

  buildForm() {
    // this.stopChequeForm = new FormGroup({
    //   // accountNo :new FormControl('', [Validators.required,]),
    //   accNo: new FormControl('', [Validators.required]),
    //   chequeType: new FormControl('', [Validators.required]),
    //   chequeNo: new FormControl(''),
    //   chequeStartNo: new FormControl(''),
    //   chequeEndNo: new FormControl(''),
    //   remark: new FormControl('', [Validators.required]),
    // });
    // this.stopChequeForm.valueChanges.subscribe((data) => {
    //   this.formErrorsStopCheques = this.formValidation.validateForm(this.stopChequeForm, this.formErrorsStopCheques, true);
    // });

    this.stopChequeForm = new FormGroup({
      account: new FormControl('', [Validators.required]),
      radioboxdemo: new FormControl('', [Validators.required]),
      chequeNumber: new FormControl('', [Validators.required,Validators.minLength(6),Validators.min(1)]),
      frmChequeNumber: new FormControl(''),
      toChequeNumber: new FormControl(''),
      reason: new FormControl('', [Validators.required] ),
      remark: new FormControl('', [Validators.required]),
      accountNo: new FormControl(''),
    });

  }


  // stopType(stopType) {
  //   if (stopType == 'Single') {
  //     $('#Scheque').show();
  //     $('#Mcheque').hide()
  //     this.chequeType = 'single';
  //     //this.stopChequeForm.get('chequeNo').setValidators(Validators.required)
  //     this.stopChequeForm.get('chequeNo').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
  //     this.stopChequeForm.get('chequeNo').updateValueAndValidity();
  //     this.stopChequeForm.get('chequeStartNo').clearValidators(); // 6. Clear All Validators
  //     this.stopChequeForm.get('chequeStartNo').updateValueAndValidity();
  //     this.stopChequeForm.get('chequeEndNo').clearValidators(); // 6. Clear All Validators
  //     this.stopChequeForm.get('chequeEndNo').updateValueAndValidity();
  //   } else {
  //     $('#Scheque').hide();
  //     $('#Mcheque').show();
  //     this.chequeType = 'Bulk';
  //     //this.stopChequeForm.get('chequeNo').clearValidators();
  //     this.stopChequeForm.get('chequeNo').clearValidators(); // 6. Clear All Validators
  //     this.stopChequeForm.get('chequeNo').updateValueAndValidity();
  //     this.stopChequeForm.get('chequeStartNo').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
  //     this.stopChequeForm.get('chequeStartNo').updateValueAndValidity();
  //     this.stopChequeForm.get('chequeEndNo').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
  //     this.stopChequeForm.get('chequeEndNo').updateValueAndValidity();
  //   }
  // }

  stopType() {
    if (this.stopChequeForm.value.radioboxdemo == 'single') {
      this.stopChequeForm.get('frmChequeNumber').clearValidators(); // 6. Clear All Validators
      this.stopChequeForm.get('frmChequeNumber').updateValueAndValidity();
      this.stopChequeForm.get('toChequeNumber').clearValidators(); // 6. Clear All Validators
      this.stopChequeForm.get('toChequeNumber').updateValueAndValidity();
      this.stopChequeForm.get('chequeNumber')?.setValidators([Validators.required,Validators.minLength(6)]);
      this.stopChequeForm.get('chequeNumber')?.updateValueAndValidity();
    } else {
      this.stopChequeForm.get('chequeNumber').clearValidators(); // 6. Clear All Validators
      this.stopChequeForm.get('chequeNumber').updateValueAndValidity();
      this.stopChequeForm.get('frmChequeNumber').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
      this.stopChequeForm.get('frmChequeNumber').updateValueAndValidity();
      this.stopChequeForm.get('toChequeNumber').setValidators([Validators.required,Validators.minLength(6)]); // 5.Set Required Validator
      this.stopChequeForm.get('toChequeNumber').updateValueAndValidity();
    }
  }

  validateForm() {
    // if (this.stopChequeForm.invalid) {
    //   this.formValidation.markFormGroupTouched(this.stopChequeForm);
    //   return;
    // }

    if (this.stopChequeForm.invalid) {
      if(this.stopChequeForm.value.reason == "999"){
      this.stopChequeForm.get('account').markAsTouched();
      this.stopChequeForm.get('radioboxdemo').markAsTouched();
      this.stopChequeForm.get('chequeNumber').markAsTouched();
      this.stopChequeForm.get('frmChequeNumber').markAsTouched();
      this.stopChequeForm.get('toChequeNumber').markAsTouched();
      this.stopChequeForm.get('reason').markAsTouched();
       this.stopChequeForm.get('remark').markAsTouched();
      
      }else{
        this.stopChequeForm.get('account').markAsTouched();
        this.stopChequeForm.get('radioboxdemo').markAsTouched();
        this.stopChequeForm.get('chequeNumber').markAsTouched();
        this.stopChequeForm.get('frmChequeNumber').markAsTouched();
        this.stopChequeForm.get('toChequeNumber').markAsTouched();
        this.stopChequeForm.get('reason').markAsTouched();
      }

       return;
    }
  }


  onReasonChange(value){
 
    if(value == "999"){ 
     
      this.stopChequeForm.controls['remark'].setValidators([Validators.required]);
      }
      else{
      this.stopChequeForm.controls['remark'].clearValidators();
      }

      this.stopChequeForm.controls['remark'].updateValueAndValidity();
  }


  // stopChequeFormSubmit() {
  //   var custId = this.DataService.userDetails.cifNumber;
  //   this.validateForm();
  //   if (this.stopChequeForm.valid) {
  //       if(this.chequeType == 'single'){
  //         this.DataService.request = this.stopChequeFormervice.getSingleStopChequeParam(this.stopChequeForm.value,custId);
  //         this.DataService.endPoint = this.constant.serviceName_STOPCHEQUEPAYMENT;
  //       }
  //       else{
  //         this.DataService.request = this.stopChequeFormervice.getBulkStopChequeParam(this.stopChequeForm.value,custId);
  //         this.DataService.endPoint = this.constant.serviceName_STOPBULKCHEQUEPAYMENT;
  //       }
  //       this.DataService.authorizeHeader = "Stop cheque";
  //       this.DataService.screenType = 'stopCheque';
  //       this.router.navigate(['/otpSession']);
  //   }
  //   else {
  //     this.formErrorsstopChequeForm = this.formValidation.validateForm(this.stopChequeForm, this.formErrorsstopChequeForm, true);
  //   }
  // }

  stopSingleChequeApiCall(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_STOPCHEQUEPAYMENT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage(resp.Result);
        this.stopChequeForm.reset();
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }

  stopMultipleChequeApiCall(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BULKCHEQUESTOPPAYMENT).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage(resp.Result);
        this.stopChequeForm.reset();
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
    //showToastMessage(resp.Result,"error");
  }

  cancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl("/dashboard");
    }
    else{
      this.location.back();
    }
  }
  closePoup(){
    this.commonMethod.closePopup('div.popup-bottom');
  }

  openpopup(){

  }

  checkEnquiry(type){
    this.statusSingle = '';
    this.status = '';
    if(type == 'chqNo'){
      if(this.stopChequeForm.value.chequeNumber.length == 6){
        let param = this.stopChequeService.getSingleChequeInquiryParam(this.stopChequeForm.value , 'Stop');
        this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHEQUESTATUSINQUIRY).subscribe(data => {
          console.log(data);
          var resp = data.responseParameter
          if (resp.opstatus == "00") {
            this.statusSingle = data.set.records[0].status;
          }
          else {
            this.errorCallBack(data.subActionId, resp);
          }
        })
      }
    }
    else{
      if(this.stopChequeForm.value.frmChequeNumber.length == 6){
        let param = this.stopChequeService.getSingleChequeInquiryParam(this.stopChequeForm.value , 'fromStop');
        this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHEQUESTATUSINQUIRY).subscribe(data => {
          console.log(data);
          var resp = data.responseParameter
          if (resp.opstatus == "00") {
            this.status = data.set.records[0].status;
          }
          else {
            this.errorCallBack(data.subActionId, resp);
          }
        })
      }
    }
  }

  //New Code
  stopChequeSubmit(){
    this.stopType()
    this.validateForm()
    this.noOfLeaves = +this.stopChequeForm.value.toChequeNumber - +this.stopChequeForm.value.frmChequeNumber + 1;
    // this.commonMethod.openPopup('div.popup-bottom.confirmation1');
    if(this.stopChequeForm.valid && (this.status.toLocaleLowerCase() == 'unused' || this.statusSingle.toLocaleLowerCase()  === 'unused')){
      this.commonMethod.openPopup('div.popup-bottom.confirmation1');
    }

  }
  openchargespopup(){
    this.commonMethod.openPopup('div.popup-bottom.chargesPopup');
  }
  openPopup(){
    // this.DataService.chequeInquiryList =
    this.router.navigateByUrl('/chequeStatusList');
  }
  onCancel() {
    if(this.constant.getIsCordova() == "web"){
      this.router.navigateByUrl('/dashboard');
    }
    else{
      this.location.back();
    }
  }

  stopChequeAPICall(){


    if(this.stopChequeForm.valid){


      var _remark = this.reasonList.filter(obj => obj.productName == this.stopChequeForm.value.reason)[0].ProductCode;

      if(this.stopChequeForm.value.radioboxdemo == 'single'){
        if(this.stopChequeForm.value.chequeNumber < 1 )
        {
          showToastMessage("Invalid Cheque number")
          return;
        }

        this.DataService.request = this.stopChequeService.getSingleStopChequeParam(this.stopChequeForm.value);
        this.DataService.endPoint = this.constant.serviceNmae_CHEQUESTOPPAYMENT;
        this.DataService.stopChequeReceiptObj.accountNo = this.stopChequeForm.value.account == "" ? "-" : this.stopChequeForm.value.account
        this.DataService.stopChequeReceiptObj.chequeNo = this.stopChequeForm.value.chequeNumber == "" ? "-" : this.stopChequeForm.value.chequeNumber
        this.DataService.stopChequeReceiptObj.remark = this.stopChequeForm.value.reason == "999" ? this.stopChequeForm.value.remark : _remark
        this.DataService.stopChequeReceiptObj.fromChequeNo = "-"
        this.DataService.stopChequeReceiptObj.toChequeNo = "-"
      }
      else{

        if(status == 'STOPPED'){
          return;
        }

        this.DataService.request = this.stopChequeService.getBulkStopChequeParam(this.stopChequeForm.value);
        this.DataService.endPoint = this.constant.serviceName_BULKCHEQUESTOPPAYMENT;
        this.DataService.stopChequeReceiptObj.accountNo = this.stopChequeForm.value.account == "" ? "-" : this.stopChequeForm.value.account
        this.DataService.stopChequeReceiptObj.remark = this.stopChequeForm.value.reason == "999" ? this.stopChequeForm.value.remark : _remark
        this.DataService.stopChequeReceiptObj.fromChequeNo = this.stopChequeForm.value.frmChequeNumber == "" ? "-" : this.stopChequeForm.value.frmChequeNumber
        this.DataService.stopChequeReceiptObj.toChequeNo = this.stopChequeForm.value.toChequeNumber == "" ? "-" : this.stopChequeForm.value.toChequeNumber
         this.DataService.stopChequeReceiptObj.chequeNo = "-"
      }

      this.DataService.authorizeHeader = "Stop cheque";
      this.DataService.screenType = 'stopCheque';
      var objCheckFlag = this.DataService.activitySettingData.findIndex(x => x.ACTIVITYNAME == this.DataService.endPoint.split('/')[1]);
      if(this.DataService.activitySettingData[objCheckFlag].OTPALLOWED == 'Y') {
            this.router.navigate(['/stopChequeAuth']);
            this.DataService.otpName = "OTP"
      }
      else if(this.DataService.activitySettingData[objCheckFlag].TPINALLOWD == 'Y')
      {       
       this.router.navigate(['/stopChequeAuth']);
       this.DataService.otpName = "TPIN"
      }

    }
    else{
      this.validateForm();
    }
  }

  proceed() {
    this.commonMethod.closePopup('div.popup-bottom.confirmation1');
    this.stopChequeAPICall();
  }



  onAccountSelectType(){
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    } 
  }

  _closePopup(){
    this.commonMethod.closePopup('div.popup-bottom.sel-account');
  }


  onFromAccountSelect(accountNumber){
    this.selectedAccount = "";
    console.log(this.selectedAccount);
    this.selectedAccount = accountNumber;
    this.selectedAccName = this.DataService.userDetails?.customerName;
    this.selAccNo = accountNumber;
    
    this.SchemeCode = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].SchemeCode;
    var accountNo = this.DataService.customerOperativeAccList.filter(obj => (obj.accountNo == this.selectedAccount))[0].sbAccount;
    var userDtl = this.SchemeCode +" "+accountNo; 
    this.stopChequeForm.patchValue({ accountNo: userDtl });

    this.stopChequeForm.patchValue({ account: this.selectedAccount });
  }

  changeCheque(event){
    if (this.stopChequeForm.value.radioboxdemo == 'single') {
      this.stopChequeForm.patchValue({ chequeNumber: '' });
    } else{
      this.stopChequeForm.patchValue({ frmChequeNumber: '' });
      this.stopChequeForm.patchValue({ toChequeNumber: '' });
    }
  }

}
