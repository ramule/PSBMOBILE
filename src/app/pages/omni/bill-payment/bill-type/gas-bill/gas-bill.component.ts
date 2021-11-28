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
import { FormValidationService } from 'src/app/services/form-validation.service';
import { WaterBillService } from '../water-bill/water-bill-service';
declare var showToastMessage: any;

@Component({
  selector: 'app-gas-bill',
  templateUrl: './gas-bill.component.html',
  styleUrls: ['./gas-bill.component.scss']
})
export class GasBillComponent implements OnInit {
  
  gasBillForm: FormGroup;
  public formErrorsGasBill = {
    gasProvider: '',
    customerNo: '',
    accountNoGasLine: '',

    gasProviderCylinder: '',
    lpgId: '',
    accountNoCylinder: '',
  };
  
  operatorSelected:boolean = false;
  customerVerified:boolean = false;
  dealerSelected:boolean = false;
  gasCustomerVerified:boolean = false;

  selectedType: string = 'payGasBill';
  operatorList:any;
  accountList:any = [];
  isAccountSelected: boolean = false;
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelectedpayGasBill: boolean = false;
  selectedAccountpayGasBill:any;
  selectedAccBalpayGasBill:any;
  customerLabel:any = '';

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
    public formValidation: FormValidationService,
    private waterBillService: WaterBillService
  ) { }

  ngOnInit(): void {
    this.initialization();
  }

  
  initialization(){
    this.buildForm();
    this.operatorList = this.constant.gasLineOperatorList
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.dataService.otpSessionPreviousPage = "/gasBillPayment";
    this.dataService.otpSessionPreviousPage = this.router.url;
  }

  buildForm(){
    this.gasBillForm = new FormGroup({
      gasProvider: new FormControl('', [Validators.required]),
      customerNo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9_]*$")]),
      accountNoGasLine: new FormControl('', [Validators.required]),
      
      gasProviderCylinder: new FormControl({value:'',disabled:true}),
      lpgId: new FormControl({value:'',disabled:true}),
      accountNoCylinder: new FormControl({value:'',disabled:true}),
    });

    this.gasBillForm.valueChanges.subscribe((data) => {
      this.formErrorsGasBill = this.formValidation.validateForm(this.gasBillForm, this.formErrorsGasBill, true);
    });
  }


  selOperator(value){
    this.operatorSelected = false;
    this.dealerSelected = false;
    this.customerVerified = false;
    this.gasCustomerVerified = false;
    if(this.selectedType == "payGasBill"){
      if(this.gasBillForm.value.gasProvider == ""){
        this.operatorSelected = false;
        this.customerLabel =  "";
      }
      else{
        this.operatorSelected = true;
        let seletedOperator = this.constant.gasLineOperatorList.find(i => i.id == value);
        this.customerLabel = seletedOperator.label;
        this.gasBillForm.get('customerNo').setValidators([Validators.required, Validators.minLength(seletedOperator.minLength),Validators.maxLength(seletedOperator.maxLength)]);
        this.gasBillForm.get('customerNo').updateValueAndValidity();
      }
      this.gasBillForm.patchValue({ customerNo: ''});
      this.gasBillForm.patchValue({ accountNoGasLine: ''});
    }
    else{
      if(this.gasBillForm.value.gasProviderCylinder == ""){
        this.dealerSelected = false;
        this.customerLabel =  "";
      }
      else{
        this.dealerSelected = true;
        let seletedOperator = this.constant.gasCylinderOperator.find(i => i.id == value);
        this.customerLabel = seletedOperator.label;
        this.gasBillForm.get('lpgId').setValidators([Validators.required, Validators.minLength(seletedOperator.minLength),Validators.maxLength(seletedOperator.maxLength)]);
        this.gasBillForm.get('lpgId').updateValueAndValidity();
      }
      this.gasBillForm.patchValue({ lpgId: ''});
      this.gasBillForm.patchValue({ accountNoCylinder: ''});
    }
    
     console.log("de;elcetd value",value);

    // this.customerLabel = "test";
  }


  selectBillType(type){
    this.gasBillForm.reset();
    this.selectedType = type;
    if(type == 'payGasBill'){
      this.operatorList = this.constant.gasLineOperatorList
      this.gasBillForm.get('gasProvider').setValidators(Validators.required);
      this.gasBillForm.get('customerNo').setValidators(Validators.required);
      this.gasBillForm.get('customerNo').setValidators(Validators.pattern("^[a-zA-Z0-9_]*$"));
      this.gasBillForm.get('accountNoGasLine').setValidators(Validators.required);
      this.gasBillForm.get('gasProviderCylinder').setValidators(Validators.nullValidator);
      this.gasBillForm.get('lpgId').setValidators(Validators.nullValidator);
      this.gasBillForm.get('accountNoCylinder').setValidators(Validators.nullValidator);
      
      this.gasBillForm.get('gasProvider').updateValueAndValidity();
      this.gasBillForm.get('customerNo').updateValueAndValidity();
      this.gasBillForm.get('accountNoGasLine').updateValueAndValidity();
      this.gasBillForm.get('gasProviderCylinder').updateValueAndValidity();
      this.gasBillForm.get('lpgId').updateValueAndValidity();
      this.gasBillForm.get('accountNoCylinder').updateValueAndValidity();

      this.gasBillForm.get('gasProvider').enable();
      this.gasBillForm.get('customerNo').enable();
      this.gasBillForm.get('accountNoGasLine').enable();
      this.gasBillForm.get('gasProviderCylinder').disable();
      this.gasBillForm.get('lpgId').disable();
      this.gasBillForm.get('accountNoCylinder').disable();
    }
    else{
      this.operatorList = this.constant.gasCylinderOperator
      this.gasBillForm.get('gasProviderCylinder').setValidators(Validators.required);
      this.gasBillForm.get('lpgId').setValidators(Validators.required);
      this.gasBillForm.get('lpgId').setValidators(Validators.minLength(3));
      this.gasBillForm.get('lpgId').setValidators(Validators.pattern("^[a-zA-Z0-9_]*$"));
      this.gasBillForm.get('accountNoCylinder').setValidators(Validators.required);
      this.gasBillForm.get('gasProvider').setValidators(Validators.nullValidator);
      this.gasBillForm.get('customerNo').setValidators(Validators.nullValidator);
      this.gasBillForm.get('accountNoGasLine').setValidators(Validators.nullValidator);
      
      this.gasBillForm.get('gasProvider').updateValueAndValidity();
      this.gasBillForm.get('customerNo').updateValueAndValidity();
      this.gasBillForm.get('accountNoGasLine').updateValueAndValidity();
      this.gasBillForm.get('gasProviderCylinder').updateValueAndValidity();
      this.gasBillForm.get('lpgId').updateValueAndValidity();
      this.gasBillForm.get('accountNoCylinder').updateValueAndValidity();

      this.gasBillForm.get('gasProvider').disable();
      this.gasBillForm.get('customerNo').disable();
      this.gasBillForm.get('accountNoGasLine').disable();
      this.gasBillForm.get('gasProviderCylinder').enable();
      this.gasBillForm.get('lpgId').enable();
      this.gasBillForm.get('accountNoCylinder').enable();
    }
  }


  onGasBillSubmit(){
    this.validateForm();
    console.log(this.gasBillForm.controls['customerNo'].hasError('minlength'));
    console.log(this.gasBillForm.controls['customerNo'].hasError('maxlength'));
    
    if(this.selectedType == 'payGasBill' && this.operatorSelected && !this.customerVerified && this.gasBillForm.value.customerNo != ""){
      if(!this.gasBillForm.controls['customerNo'].hasError('minlength') && !this.gasBillForm.controls['customerNo'].hasError('maxlength')){
        this.customerVerified = true;
      }
      return;
    }

    if(this.selectedType == 'bookCylinder' && this.dealerSelected && !this.gasCustomerVerified && this.gasBillForm.value.lpgId != ""){
      this.gasCustomerVerified = true;
      return;
    }

    
    if (this.gasBillForm.valid) {
      console.log(this.gasBillForm.value);
      let boardName;
      if(this.selectedType == "payGasBill"){
        boardName = this.constant.gasLineOperatorList.find(i => i.id == this.gasBillForm.value.gasProvider);
      }
      else{
        boardName = this.constant.gasCylinderOperator.find(i => i.id == this.gasBillForm.value.gasProviderCylinder);
      }
      let req = this.waterBillService.getGasBillPayRequest(this.gasBillForm.value,200,this.selectedType,boardName.value);
      this.dataService.request = req;
      this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
      this.dataService.screenType = 'gasBillPay';
      this.dataService.authorizeHeader = "Recharge and bill pay";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno = this.selectedType == "payGasBill" ? this.gasBillForm.value.accountNoGasLine: this.gasBillForm.value.accountNoCylinder;
      this.dataService.billPayObj.boardName = boardName.value;
      this.dataService.billPayObj.labelName = this.customerLabel;
      this.dataService.billPayObj.dynamicID = this.selectedType == "payGasBill" ? this.gasBillForm.value.customerNo: this.gasBillForm.value.lpgId;
      this.dataService.billPayObj.amount= 200;

      this.router.navigate(['/otpSession']);

    } else {
      this.formErrorsGasBill = this.formValidation.validateForm(this.gasBillForm, this.formErrorsGasBill, true);
    }
  }


  validateForm(){
    if (this.gasBillForm.invalid) {
      this.formValidation.markFormGroupTouched(this.gasBillForm);
      return;
    }
  }


  changeNo(){
    if(this.selectedType == 'bookCylinder'){
      this.gasCustomerVerified = false;
    }
    else{
      this.customerVerified = false;
    }
  }


  /**
   * On account number change this function is invoked
   * @param account 
   */
  onAccountNoChange(accountNumber,type) {
    if(type == 'bookCylinder'){
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
        this.isAccountSelectedpayGasBill = true;
        this.selectedAccountpayGasBill = this.accountList.find(i => i.accountNumber == accountNumber);
        this.selectedAccBalpayGasBill = this.selectedAccountpayGasBill.sbBalance;
      } else {
        $("#transferFrom").val('');
        this.isAccountSelectedpayGasBill = false;
      }
    }
    
  }

  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }

}



export class boardList{
  
  static gasBoardList = [
    {
      id:"1",
      value:"Aavantika Gas Ltd"
    },
    {
      id:"2",
      value:"Adani Gas Limited"
    },
    {
      id:"3",
      value:"Assam Gas Company Limited"
    },
    {
      id:"4",
      value:"Bhagyanagar Gas Limited"
    },
    {
      id:"5",
      value:"Central U.P. Gas Limited"
    },
    {
      id:"6",
      value:"Charotar Gas Sahakari Mandali Ltd"
    },
    {
      id:"7",
      value:"GAIL Gas Limited"
    },
    {
      id:"8",
      value:"Green Gas Limited"
    },
    {
      id:"9",
      value:"Gujarat Gas Limited"
    },
    {
      id:"10",
      value:"Tripura Natural Gas"
    },
    {
      id:"11",
      value:"Vadodara Gas Limited"
    }

  ];
}
