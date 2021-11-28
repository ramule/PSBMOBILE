import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../../services/data.service';
import { FormValidationService } from '../../../../../services/form-validation.service';
import { DonationBillService } from './donation-bill-service';
declare var showToastMessage: any;

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})

export class DonationComponent implements OnInit {
  donationLists: any;
  type:'';
  showCustomer: boolean = false;
  donationForm: FormGroup;
  public formErrorsDonation = {
    donationType: '',
    dynamicID: '',
    transferFrom:'',
    amount:''
  };
  billDetails: any;
  accountList = [];
  selectedAccount: any;
  selectedAccBal: any;
  isAccountSelected: boolean = false;

  labelName = "";
  showDetails = false;
  DONATION_BILL_ERR_MSG="";
  amountInWords="";
  constructor(private router: Router, private formBuilder: FormBuilder, public dataService: DataService, private formValidation: FormValidationService, private constant: AppConstants, private http: HttpRestApiService, private storage: LocalStorageService, private donationBillService: DonationBillService,private customCurrencyPipe: CustomCurrencyPipe,private commonMethod:CommonMethods) { }

  ngOnInit(): void {
    this.initialize()
  }


  buildform() {
    this.donationForm = new FormGroup({
      donationType: new FormControl('', [Validators.required,]),
      transferFrom:new FormControl('', [Validators.required,]),
      amount:new FormControl('', [Validators.required,]),
      dynamicID: new FormControl('', [Validators.required]),
    });
    this.donationForm.valueChanges.subscribe((data) => {
      this.formErrorsDonation = this.formValidation.validateForm(this.donationForm, this.formErrorsDonation, true);
    });
  }



  initialize() {
    // this.donationLists= this.constant.donationLists;
    this.accountList = this.dataService.customerCanTransferAccountList;
    this.buildform();
    this.dataService.otpSessionPreviousPage = this.router.url;
    var param = this.donationBillService.getDonationList();
    this.getDonationTypeList(param);
  }

  formatCurrency(value) {
    this.formValidation.formatCurrency(value, this.donationForm);  
  }

  getDonationTypeList(param) {
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DONATIONLIST).subscribe(data => {
      console.log("=========>",data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        this.donationLists = data.set.records;
      }
      else {
        this.donationLists = [];
        this.errorCallBack(data.subActionId, resp);
      }

    });
  }

  fundTransferCall(){

  }

  submitDonation() {
    if (this.donationForm.valid) {
      //TODO: change the below request to actual request after getting the api
      let req = this.donationBillService.getDonationBillPayRequest(this.donationForm.value);
      this.dataService.request = req;
      this.dataService.endPoint = this.constant.serviceName_WATERBILLPAYMENT; 7
      this.dataService.screenType = 'donationBillPay';
      this.dataService.authorizeHeader = "Recharge and bill pay";
      this.dataService.billPayObj = {};
      this.dataService.billPayObj.accountno= this.donationForm.get('transferFrom').value;
      this.dataService.billPayObj.boardName= this.getDonationNameById(this.donationForm.get('donationType').value);
      this.dataService.billPayObj.labelName = this.labelName;
      this.dataService.billPayObj.dynamicID = this.donationForm.get('dynamicID').value;
      this.dataService.billPayObj.amount= this.donationForm.get('amount').value.trim().replace(/[^.0-9]+/g,'');
      this.dataService.otpSessionPreviousPage = "/donation";
      this.dataService.feedbackType = 'donation';

      this.router.navigate(['/otpSession']);
    } else {
      this.formErrorsDonation = this.formValidation.validateForm(this.donationForm, this.formErrorsDonation, false)
    }
  }

  selectDonation(id) {
    this.donationForm.get('transferFrom').reset('');
    this.donationForm.get('amount').reset('');
    this.isAccountSelected = false;
    this.type = id;
    switch (id) {
      case '0':
        this.labelName = "Your Name";
        this.donationForm.get('dynamicID').reset();
        this.donationForm.get('dynamicID').setValidators([Validators.required]);
        this.donationForm.updateValueAndValidity();
        this.showDetails = true;
        break;

      default:
        this.showDetails = false;
        break;
    }
  }


  /**
    * function to called on unsuccessfull responce
    * @subActionId
    * @resp
    */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, "error");
  }

  /**
 * On account number change this function is invoked
 * @param account
 */
  onAccountNoChange(accountNumber) {
    // this.selectedAccount = accountNumber;
    if (accountNumber != '') {
      this.isAccountSelected = true;
      this.selectedAccount = this.accountList.find(i => i.accountNumber == accountNumber);
      this.selectedAccBal = this.selectedAccount.sbBalance;
    } else {
      this.donationForm.get('transferFrom').reset();
      this.isAccountSelected = false;
    }
  }

  getDonationNameById(id) {
    return this.constant.donationLists.filter(obj => obj.id == id)[0].name;
  }


  addBillerClick(){
    this.router.navigate(['/addBiller']);
  }

  onInput(value) {
    if(value == '0'){
      if(this.donationForm.contains('amount')) this.donationForm.get('amount').reset();
      this.amountInWords = "";
      return;
    }
    if (value != '') {
      let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
      this.donationForm.patchValue({ amount: updatedCurrency });
      this.amountInWords = this.commonMethod.convertNumberToWords(value);
    } else {
      this.amountInWords = "";
      this.donationForm.get('amount').reset();
    }
  }
}


