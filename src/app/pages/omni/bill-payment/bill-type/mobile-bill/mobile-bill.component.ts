import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { pageLoaderService } from '../../../../../services/pageloader.service';
import { HttpRestApiService } from '../../../../../services/http-rest-api.service';
import { EncryptDecryptService } from '../../../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { AppConstants } from '../../../../../app.constant';
import { LocalStorageService } from '../../../../../services/local-storage-service.service';
import { MobileBillService } from './mobile-bill.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
declare var showToastMessage: any;

@Component({
  selector: 'app-mobile-bill',
  templateUrl: './mobile-bill.component.html',
  styleUrls: ['./mobile-bill.component.scss']
})
export class MobileBillComponent implements OnInit {
  
  mobileBillForm: FormGroup;
  public formErrorsMobileBill = {
    mobileNoPrepaid: '',
    operatorPrepaid: '',
    amountPrepaid: '',
    accountNoPrepaid: '',
    mobileNoPostPaid: '',
    billerNamePostPaid: '',
    amountPostPaid: '',
    accountNoPostPaid: '',
  };
  operatorList:any= [];
  accountList:any=[];

  isAccountSelected : any;
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelectedPrePaid : any;
  selectedAccountPrePaid: any;
  selectedAccBalPrePaid: any;
  registeredBiller:any;
  selectedType:string="prepaid";
  mobileSelected:boolean = false;
  selectedTab='recentTransaction';
  prepaidAmtInwords: string = "";
  postpaidAmtInwords: string = "";
  showBrowsePlan:boolean = false;

  constructor(
    private router: Router,
    public dataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    public commonMethod: CommonMethods,
    private mobileBillService: MobileBillService,
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private form: FormBuilder,
    public formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
  ) { }

  ngOnInit(): void {
    // var $param = this.mobileBillService.payMobileBillParam("billerDetails");
    // this.deleteBiller($param);
    // var aparam = this.mobileBillService.getAddBillerParam("formData");
    // this.addBiller(aparam);
    this.initialization();
  }

  
  /**
   * function to load all the on load element
   */
  initialization(){
    this.buildForm();
    var param = this.mobileBillService.getOperatorList();
    this.getOperators(param);
    var _param = this.mobileBillService.getBillerInformationParam();
    this.billerInformation(_param);
    var pparam = this.mobileBillService.getAllPastParam();
    this.pastTransaction(pparam);
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.dataService.otpSessionPreviousPage = '/rechargeBillPay';
    this.dataService.otpSessionPreviousPage = this.router.url;
  }


  buildForm(){
    this.mobileBillForm = new FormGroup({
      mobileNoPrepaid: new FormControl('', [Validators.required,Validators.minLength(10)]),
      operatorPrepaid: new FormControl('', [Validators.required]),
      amountPrepaid: new FormControl('', [Validators.required]),
      accountNoPrepaid: new FormControl('', [Validators.required]),
      
      mobileNoPostPaid: new FormControl({value:'',disabled:true}),
      billerNamePostPaid: new FormControl({value:'',disabled:true}),
      amountPostPaid: new FormControl({value:'',disabled:true}),
      accountNoPostPaid: new FormControl({value:'',disabled:true}),
    });

    this.mobileBillForm.valueChanges.subscribe((data) => {
      this.formErrorsMobileBill = this.formValidation.validateForm(this.mobileBillForm, this.formErrorsMobileBill, true);
    });
  }
  

  selectBillType(type){
    this.mobileBillForm.reset();
    this.selectedType = type;
    if(type == 'prepaid'){
      this.mobileBillForm.get('mobileNoPrepaid').setValidators([Validators.required,Validators.minLength(10)]);
      this.mobileBillForm.get('operatorPrepaid').setValidators(Validators.required);
      this.mobileBillForm.get('amountPrepaid').setValidators(Validators.required);
      this.mobileBillForm.get('accountNoPrepaid').setValidators(Validators.required);
      this.mobileBillForm.get('mobileNoPostPaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('billerNamePostPaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('amountPostPaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('accountNoPostPaid').setValidators(Validators.nullValidator);
      this.prepaidAmtInwords ="";
      this.mobileBillForm.get('mobileNoPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('operatorPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('amountPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('accountNoPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('mobileNoPostPaid').updateValueAndValidity();
      this.mobileBillForm.get('billerNamePostPaid').updateValueAndValidity();
      this.mobileBillForm.get('amountPostPaid').updateValueAndValidity();
      this.mobileBillForm.get('accountNoPostPaid').updateValueAndValidity();

      this.mobileBillForm.get('mobileNoPrepaid').enable();
      this.mobileBillForm.get('operatorPrepaid').enable();
      this.mobileBillForm.get('amountPrepaid').enable();
      this.mobileBillForm.get('accountNoPrepaid').enable();
      this.mobileBillForm.get('mobileNoPostPaid').disable();
      this.mobileBillForm.get('billerNamePostPaid').disable();
      this.mobileBillForm.get('amountPostPaid').disable();
      this.mobileBillForm.get('accountNoPostPaid').disable();
      this.mobileBillForm.patchValue({ operatorPrepaid: ''});
      this.mobileBillForm.patchValue({ accountNoPrepaid: ''});
    }
    else{
      this.mobileBillForm.get('mobileNoPostPaid').setValidators([Validators.required,Validators.minLength(10)]);
      this.mobileBillForm.get('billerNamePostPaid').setValidators(Validators.required);
      this.mobileBillForm.get('amountPostPaid').setValidators(Validators.required);
      this.mobileBillForm.get('accountNoPostPaid').setValidators(Validators.required);
      this.mobileBillForm.get('mobileNoPrepaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('operatorPrepaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('amountPrepaid').setValidators(Validators.nullValidator);
      this.mobileBillForm.get('accountNoPrepaid').setValidators(Validators.nullValidator);
      this.postpaidAmtInwords ="";
      this.mobileBillForm.get('mobileNoPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('operatorPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('amountPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('accountNoPrepaid').updateValueAndValidity();
      this.mobileBillForm.get('mobileNoPostPaid').updateValueAndValidity();
      this.mobileBillForm.get('billerNamePostPaid').updateValueAndValidity();
      this.mobileBillForm.get('amountPostPaid').updateValueAndValidity();
      this.mobileBillForm.get('accountNoPostPaid').updateValueAndValidity();

      this.mobileBillForm.get('mobileNoPrepaid').disable();
      this.mobileBillForm.get('operatorPrepaid').disable();
      this.mobileBillForm.get('amountPrepaid').disable();
      this.mobileBillForm.get('accountNoPrepaid').disable();
      this.mobileBillForm.get('mobileNoPostPaid').enable();
      this.mobileBillForm.get('billerNamePostPaid').enable();
      this.mobileBillForm.get('amountPostPaid').enable();
      this.mobileBillForm.get('accountNoPostPaid').enable();
      this.mobileBillForm.patchValue({ billerNamePostPaid: ''});
      this.mobileBillForm.patchValue({ accountNoPostPaid: ''});
    }
  }

  validateForm() {
    if (this.mobileBillForm.invalid) {
      this.formValidation.markFormGroupTouched(this.mobileBillForm);
      return;
    }
  }
  
  /**
   * function to be called on submit burron clicked
   */

  onMobileBillSubmit(){
    this.validateForm();
    if (this.mobileBillForm.valid) {
      console.log(this.mobileBillForm.value);
    let operator = this.selectedType == "prepaid" ? this.getOperatorNameById(this.mobileBillForm.value.operatorPrepaid) : this.getOperatorNameById(this.mobileBillForm.value.billerNamePostPaid) ;
    this.dataService.request = this.mobileBillService.payMobileBillParam(this.mobileBillForm.value,this.selectedType,operator);
    this.dataService.endPoint = this.constant.serviceName_PAYMOBILEBILL;
    this.dataService.authorizeHeader = "Mobile Recharge";
    this.dataService.screenType = 'mobileRecharge';
    
    this.dataService.billPayObj = {};
    this.dataService.billPayObj.type = this.selectedType;
    this.dataService.billPayObj.mobileNo = this.selectedType == "prepaid" ? this.mobileBillForm.value.mobileNoPrepaid : this.mobileBillForm.value.mobileNoPostPaid;
    this.dataService.billPayObj.operator= operator;
    this.dataService.billPayObj.amount= this.selectedType == "prepaid" ? this.mobileBillForm.value.amountPrepaid : this.mobileBillForm.value.amountPostPaid;
    this.dataService.billPayObj.accountno= this.selectedType == "prepaid" ? this.mobileBillForm.value.accountNoPrepaid : this.mobileBillForm.value.accountNoPostPaid;


    this.router.navigate(['/otpSession']);


      // var _param = this.mobileBillService.payMobileBillParam(this.mobileBillForm.value,this.selectedType);
      // this.mobileBillPayment(_param);

    } else {
      this.formErrorsMobileBill = this.formValidation.validateForm(this.mobileBillForm, this.formErrorsMobileBill, true);
    }
  }


  /**
   * function to receive all the register biller
   * @param
   */
  billerInformation(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_BILLERINFORMATION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.registeredBiller = data.listofDataset[0].records
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
   * function to be called to delete biller
   * @param
   */
  deleteBiller(value){
    var param = this.mobileBillService.getDeleteBillerParam(value);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DELETEBILLER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage("Biller deleted successfully","success");
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  

  /**
   * function to get all transaction list of biller
   * @param
   */
  pastTransaction(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETLISTOFPASTPAYMENTS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }


  /**
   * function to get all transaction list of biller
   * @param
   */
  addBiller(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDBILLER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  /**
   * function to get all operators
   * @param
   */
  getOperators(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETOPERATORLIST).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.operatorList = data.set.records;
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    });
  }

  fetchPlans(){
    this.showBrowsePlan = true;
    this.selectedTab = 'browsePlan';
    var param = this.mobileBillService.getRechargePlanParam();
    this._fetchPlans(param);
  }
  /**
   * function to get all plans
   * @param
   */
  _fetchPlans(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_GETRECHARGEPLANS).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        
      }
      else {
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
    showToastMessage(resp.Result,"error");
  }
  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }

  /**
   * On account number change this function is invoked
   * @param account 
   */
  onAccountNoChange(accountNumber,type) {
    if(type == 'postpaid'){
      if (accountNumber != '') {
        this.isAccountSelected = true;
        this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
        this.selectedAccBal = this.selectedAccount.sbBalance;
      } else {
        $("#transferFrom").val('');
        this.isAccountSelected = false;
      }  
    }
    else{
      if (accountNumber != '') {
        this.isAccountSelectedPrePaid = true;
        this.selectedAccountPrePaid = this.accountList.find(i => i.accountNumber == accountNumber);
        this.selectedAccBalPrePaid = this.selectedAccountPrePaid.sbBalance;
      } else {
        $("#transferFrom").val('');
        this.isAccountSelectedPrePaid = false;
      }
    }
    
  }
  onInput(value,type?) {
    if(type != 'amount'){
      if(value == '0'){
        if(this.mobileBillForm.contains('mobileNoPrepaid')) this.mobileBillForm.get('amountPrepaid').reset();
        if(this.mobileBillForm.contains('mobileNoPostPaid')) this.mobileBillForm.get('amountPostPaid').reset();  
      }
      return;
    }
    if(value == '0'){
      if(this.mobileBillForm.contains('amountPrepaid')) this.mobileBillForm.get('amountPrepaid').reset();
      if(this.mobileBillForm.contains('amountPostPaid')) this.mobileBillForm.get('amountPostPaid').reset();
      this.prepaidAmtInwords = "";
      this.postpaidAmtInwords = "";
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
     
      if(this.mobileBillForm.contains('amountPrepaid'))  this.mobileBillForm.patchValue({ amountPrepaid: "₹" + updatedCurrency });
      if(this.mobileBillForm.contains('amountPostPaid'))  this.mobileBillForm.patchValue({ amountPostPaid: "₹" + updatedCurrency });
      if(this.selectedType == 'prepaid'){
        this.prepaidAmtInwords = this.commonMethod.convertNumberToWords(value);
      }else{
        this.postpaidAmtInwords = this.commonMethod.convertNumberToWords(value);
      }
    } else {
      if(this.selectedType == 'prepaid'){
        this.prepaidAmtInwords = '';
      }else{
        this.postpaidAmtInwords = '';
      }
      if(this.mobileBillForm.contains('amountPrepaid'))  this.mobileBillForm.get('amountPrepaid').reset();
      if(this.mobileBillForm.contains('amountPostPaid'))  this.mobileBillForm.get('amountPostPaid').reset();
      }
  }


   /**
   * function to be called on operator selected
   */
  selOperator(){
    console.log("selOperator");
    if(this.selectedType == "prepaid"){
      if(this.mobileBillForm.value.mobileNoPrepaid == "" || this.mobileBillForm.value.operatorPrepaid == ""){
        this.mobileSelected = false;
      }
      else{
        this.mobileSelected = true;
      }
    }
    else{
      if(this.mobileBillForm.value.mobileNoPostPaid == "" || this.mobileBillForm.value.billerNamePostPaid == ""){
        this.mobileSelected = false;
      }
      else{
        this.mobileSelected = true;
      }
    }
    
  }

  setAmount(){
    if(this.selectedType == "prepaid"){
      this.mobileBillForm.patchValue({ amountPrepaid: '299'});
    }
    else{
      this.mobileBillForm.patchValue({ amountPostPaid: '299'});
    }
  }


  getOperatorNameById(id) {
    return this.operatorList.filter(obj => obj.ID == id)[0].operatorName;
  }



}
