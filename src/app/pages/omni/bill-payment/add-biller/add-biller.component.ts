import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { AddBillerService } from './add-biller.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-add-biller',
  templateUrl: './add-biller.component.html',
  styleUrls: ['./add-biller.component.scss']
})
export class AddBillerComponent implements OnInit {
  
  addBillerForm: FormGroup;
  public formErrorsAddBiller = {
    category: '',
    billerName: '',
    billerId: '',
    billerNickName: '',
    accountNo:''
  };

  accountList:any=[];
  isAccountSelected : boolean = false;
  selectedAccount: any;
  selectedAccBal: any;

  categoryList:any= []
  billerList:any = []




  constructor(
    private router: Router,
    public dataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    public commonMethod: CommonMethods,
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    private form: FormBuilder,
    private billerService: AddBillerService,
    public formValidation: FormValidationService
  ) { }

  ngOnInit(): void {
    this.initialization();
  }

  /**
   * function to load all the on load element
   */
  initialization(){
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.buildForm();
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.categoryList = this.constant.categoryList;
    this.dataService.otpSessionPreviousPage = "/addBiller"
  }


  buildForm(){
    this.addBillerForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      billerName: new FormControl('', [Validators.required]),
      billerId: new FormControl('', [Validators.required,Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9_]*$")]),
      billerNickName: new FormControl('', [Validators.required]),
      accountNo: new FormControl('', [Validators.required])
    }, {
      validators: [this.billerIdValidate.bind(this)] 
    });

    this.addBillerForm.valueChanges.subscribe((data) => {
      this.formErrorsAddBiller = this.formValidation.validateForm(this.addBillerForm, this.formErrorsAddBiller, true);
    });
  }

  
  autoPay(checkValues){
    if(checkValues){
      $('#details').slideDown();
    }else{
      $('#details').slideUp();
    }

  }


  /**
   * On account number change this function is invoked
   * @param account 
   */
  onAccountNoChange(accountNumber) {
    if (accountNumber != '') {
      this.isAccountSelected = true;
      this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
      this.selectedAccBal = this.selectedAccount.sbBalance;
    } else {
      $("#transferFrom").val('');
      this.isAccountSelected = false;
    } 
  }
  

  validateForm(){
    if (this.addBillerForm.invalid) {
      this.formValidation.markFormGroupTouched(this.addBillerForm);
      return;
    }
  }

  submitAddBiller(){
    console.log("submitAddBiller ===>"); 
    this.validateForm();
    if (this.addBillerForm.valid) {
      console.log(this.addBillerForm.value);
      var param = this.billerService.addBillerParam(this.addBillerForm.value);
      //this.addBiller(param);

      let req = this.billerService.addBillerParam(this.addBillerForm.value);
      this.dataService.request = req;
      this.dataService.endPoint = this.constant.serviceName_ADDBILLER;
      this.dataService.screenType = 'addBiller';
      this.dataService.authorizeHeader = "Add Biller";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.category = this.getCategoryNameById(this.addBillerForm.value.category);
      this.dataService.billPayObj.billerName= this.getBillerNameNameById(this.addBillerForm.value.billerName) ;
      this.dataService.billPayObj.billerId= this.addBillerForm.value.billerId;
      this.dataService.billPayObj.billerNickName= this.addBillerForm.value.billerNickName;
      this.dataService.billPayObj.accountno= this.addBillerForm.value.accountNo;

      this.router.navigate(['/otpSession']);
    } else {
      this.formErrorsAddBiller = this.formValidation.validateForm(this.addBillerForm, this.formErrorsAddBiller, true);
    }
  }

  addBiller(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_ADDBILLER).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        showToastMessage(resp.DESC); 
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


  onCategoryChange(value){
    this.billerList = [];
    this.addBillerForm.patchValue({ billerName: ''});
    this.addBillerForm.patchValue({ billerId: ''});
    switch (value) {
      case 'mobileRecharge': {
        this.constant.mobileOperatorList.forEach(el => {
          let userValue = { id : el.ID , billerName : el.operatorName }
          this.billerList.push(userValue);
        });
        break;
      }
      case 'water': {
        this.constant.waterSupplyBoardList.forEach(el => {
          let userValue = { id : el.id , billerName : el.boardName }
          this.billerList.push(userValue);
        });
        break;
      }
      case 'DTH': {
        this.constant.operatorList.forEach(el => {
          let userValue = { id : el.id , billerName : el.operatorName }
          this.billerList.push(userValue);
        });
        break;
      }
      case 'gas': {
        this.constant.gasLineOperatorList.forEach(el => {
          let userValue = { id : el.id , billerName : el.value }
          this.billerList.push(userValue);
        });
        break;
      }
      case 'electricity': {
        this.constant.electricityBoardlist.forEach(el => {
          let userValue = { id : el.id , billerName : el.name }
          this.billerList.push(userValue);
        });
        break;
      }
      case 'landline': {
        this.constant.landLineOperatorList.forEach(el => {
          let userValue = { id : el.id , billerName : el.name }
          this.billerList.push(userValue);
        });
        break;
      }
    }
  }

  getCategoryNameById(id) {
    return this.categoryList.filter(obj => obj.id == id)[0].type;
  }

  getBillerNameNameById(id) {
    return this.billerList.filter(obj => obj.id == id)[0].billerName;
  }
  

  gotoPrevPage(){
    this.router.navigate(['/rechargeBillPay']);
  }

  
  /**
   * Validation if bilerId is only string
   * @param formGroup 
   */
  billerIdValidate(formGroup: FormGroup) {
    let validBillerId =  true;
    const { value: billerId } = formGroup.get('billerId');

    console.log(/[^a-zA-Z]/.test(billerId));
    if(!/[^a-zA-Z]/.test(billerId)){
      validBillerId = false;
    }
    console.log(validBillerId);
    return validBillerId ? null : { invalidBillerId: true };
}
}
