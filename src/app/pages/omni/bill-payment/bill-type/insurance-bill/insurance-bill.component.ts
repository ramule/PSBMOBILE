import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { WaterBillService } from '../water-bill/water-bill-service';

@Component({
  selector: 'app-insurance-bill',
  templateUrl: './insurance-bill.component.html',
  styleUrls: ['./insurance-bill.component.scss']
})
export class InsuranceBillComponent implements OnInit {

  insuranceForm: FormGroup;
  public formErrorsInsurance = {
    insuanceType:'',
    policyNumber:''
  };

  paybillForm: FormGroup;
  public formErrorsPayBill = {
    transferFrom:''
  };
  
  isAccountSelected: boolean = false;
  selectedAccount: any;
  selectedAccBal: any;
  accountList:any = [];
  showInsurance:boolean = false;
  showInsuranceDetail:boolean = false;
  customerLabel: string = '';
  insuranceList:any =[];

  constructor(
    private router: Router,
    public dataService: DataService,
    public loader: pageLoaderService,
    public commonMethod: CommonMethods,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private form: FormBuilder,
    public formValidation: FormValidationService,
    private waterBillService: WaterBillService
  ) { }

  ngOnInit(): void {
    this.initialization();
  }


  initialization() {
    this.buildForm();
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.insuranceList = this.constant.InsuranceLists;
    this.dataService.otpSessionPreviousPage = "/insurancePayment";
    this.dataService.otpSessionPreviousPage = this.router.url;
  }

  buildForm() {
    this.insuranceForm = new FormGroup({
      insuanceType: new FormControl('', [Validators.required]),
      policyNumber: new FormControl('', [Validators.required])
    });

    this.insuranceForm.valueChanges.subscribe((data) => {
      this.formErrorsInsurance = this.formValidation.validateForm(this.insuranceForm, this.formErrorsInsurance, true);
    });


    this.paybillForm = new FormGroup({
      transferFrom: new FormControl('', [Validators.required])
    });

    this.paybillForm.valueChanges.subscribe((data) => {
      this.formErrorsPayBill = this.formValidation.validateForm(this.paybillForm, this.formErrorsPayBill, true);
    });
  }


  /**
   * On account number change this function is invoked
   * @param account 
   */
  onAccountNoChange(accountNumber) {
    this.isAccountSelected = true;
    this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
    this.selectedAccBal = this.selectedAccount.sbBalance; 
  }


  getBillDetails(){
    this.validateForm('getPremium');
    if (this.insuranceForm.valid) {
      console.log(this.insuranceForm.value);
      this.showInsuranceDetail = true;
    } else {
      this.formErrorsInsurance = this.formValidation.validateForm(this.insuranceForm, this.formErrorsInsurance, true);
    }
  }


  payBill(){
    this.validateForm('paybill');
    if (this.paybillForm.valid) {
      console.log(this.paybillForm.value);
      let selectedBoard = this.insuranceList.find(i => i.id == this.insuranceForm.value.insuanceType);
      

      let req = this.waterBillService.getInsuranceBillPayRequest(this.insuranceForm.value,this.paybillForm.value,20000);
      this.dataService.request = req;
      this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT;
      this.dataService.screenType = 'gasBillPay';
      this.dataService.authorizeHeader = "Recharge and bill pay";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno= this.paybillForm.value.transferFrom;
      this.dataService.billPayObj.boardName= selectedBoard.name;
      this.dataService.billPayObj.labelName = this.customerLabel;
      this.dataService.billPayObj.dynamicID = this.insuranceForm.value.policyNumber;
      this.dataService.billPayObj.amount= 20000;

      this.router.navigate(['/otpSession']);
    } else {
      this.formErrorsPayBill = this.formValidation.validateForm(this.paybillForm, this.formErrorsPayBill, true);
    }
  }


  validateForm(type){
    if(type == "getPremium"){
      if (this.insuranceForm.invalid) { 
        this.formValidation.markFormGroupTouched(this.insuranceForm);
        return;
      }
    }
    else{
      if (this.paybillForm.invalid) { 
        this.formValidation.markFormGroupTouched(this.paybillForm);
        return;
      }
    }
  }

  selectInsurance(value){
    this.showInsuranceDetail = false;
    this.paybillForm.reset();
    if(value == ""){
      this.showInsurance = false;
      return;
    }
    this.showInsurance = true;
    let seletedOperator = this.constant.InsuranceLists.find(i => i.id == value);
    this.customerLabel = seletedOperator.label;
    this.insuranceForm.get('policyNumber').setValidators([Validators.required, Validators.minLength(seletedOperator.minLength),Validators.maxLength(seletedOperator.maxLength),Validators.pattern(seletedOperator.validateRegx)]);
    this.insuranceForm.get('policyNumber').updateValueAndValidity();
    this.insuranceForm.patchValue({ policyNumber: ''});
  }


  onPolicyNoChange(){
    this.showInsuranceDetail = false;
    this.paybillForm.reset();
  }

  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }


}
