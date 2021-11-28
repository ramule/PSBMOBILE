import {
  Component,
  OnInit,
  HostListener,
  OnDestroy,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationStart,
} from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormValidationService } from '../../../../services/form-validation.service';
import { AddPayeeService } from './add-payee.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { RegistrationCustDetailsService } from '../../pre-login/registration/registration-cust-details/registration-cust-details.service';
import { OtherBankService } from '../other-bank/other-bank.service';
import { payUpiRequestService } from 'src/app/pages/upi/pay/pay-upi/pay-upi-request.service';
import { UpiDashboardService } from 'src/app/pages/upi/dashboard/upi-dashboard.service';

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-add-payee',
  templateUrl: './add-payee.component.html',
  styleUrls: ['./add-payee.component.scss'],
})
export class AddPayeeComponent implements OnInit, OnDestroy {
  activePayee: string = 'within';
  paymentType: string = 'within';
  withinPayeeForm: FormGroup;
  outsidePayeeForm: FormGroup;
  mmidPayeeForm: FormGroup;
  vpaPayeeForm: FormGroup;
  searchIfscForm: FormGroup;
  formType: any = '';
  beneficiaryype: any = '1';
  searchIfsc: any = [];
  resp: any;
  bankAddress: any;
  upiVerified: boolean = false;
  isPSBCustomer: boolean = false;
  ifscresp: any;
  upiDtl: any;
  bankDtl: any;
  isSelfAccount: boolean = false;
  ownAccCheck: boolean = false;
  invalidAccount = false;
  validUPI = false;
  validUPIMessage: any = '';
  invalidUPIMessage: any = '';
  accountDetails: any;
  verified = false;
  vpaAddressList = [];
  query;

  withInPayeeList:any = [];
  oursidePayeeList :any;
  mmidPayeeList :any;
  vpaPayeeList :any;

  commonPageComponent = {
    headerType: 'innerHeader',
    sidebarNAv: 'OmniNAv',
    footer: 'innerFooter',
  };

  public formErrorsWithinPayee = {
    payeeName: '',
    payeeAccNo: '',
    payeeCnfAccNo: '',
    payeeNickName: '',
  };

  public formErrorsOutsidePayee = {
    payeeName: '',
    payeeAccType: '',
    payeeAccNo: '',
    payeeCnfAccNo: '',
    ifscCode: '',
    payeeNickName: '',
  };

  public formErrorsMmidPayee = {
    mobileNo: '',
    mmid: '',
    payeeName: '',
    payeeNickName: '',
  };

  public formErrorsVpaPayee = {
    vpa: '',
    payeeName: '',
    payeeNickName: '',
  };

  accountindex = -1;
  payeeIndex = -1;
  // old design
  ownBankPayeeForm: FormGroup;
  otherBankPayeeForm: FormGroup;
  internationalBankPayeeForm: FormGroup;
  ifscCodeForm: FormGroup;
  isCodeFound: boolean = false;
  bankTypeLists = [];
  selectedBankType: any;
  accountNumberLen;
  commonResp: any;
  accountList: any = [];
  payeeList: any = [];
  bankTypeCode: any;
  isIFSCCodeAvail: boolean = false;
  isSwiftCodeAvail: boolean = false;
  defaultVPAAccountDetails: any;
  amountInWordSB: string = ''; // variable for amount in words for Same bank
  amountInWordOB: string = ''; // variable for amount in words for Other bank
  amountInWordIB: string = ''; // variable for amount in words for International bank
  //listner for all focusout event
  // @HostListener("focusout")
  // onBlur() {
  //   //call form validarion on focus out
  //   this.formErrors = this.formValidation.validateForm(this.otherBankPayee, this.formErrors, true);
  //   this.formErrorsIFSC = this.formValidation.validateForm(this.ifscCodeForm, this.formErrorsIFSC, true);
  // }
  public formErrorsOwnPayee = {
    accNumber: '',
    ConfAccNumber: '',
    accName: '',
    nickName: '',
    limitAmount: '',
  };

  public formErrorsOtherPayee = {
    accNumber: '',
    ConfAccNumber: '',
    accName: '',
    ifscCode: '',
    nickName: '',
    bankName: '',
    branchName: '',
    city: '',
    limitAmount: '',
  };

  public formErrorsInterPayee = {
    accNumber: '',
    ConfAccNumber: '',
    accName: '',
    swiftCode: '',
    nickName: '',
    bankName: '',
    branchName: '',
    city: '',
    limitAmount: '',
    bankType: '',
  };

  public formErrorsIFSC = {
    bankName: '',
    branchName: '',
  };
  showUserInfo = false;
  //New
  withinBankForm: FormGroup;
  outsideBankForm: FormGroup;
  mmidForm: FormGroup;
  vpaForm: FormGroup;

  ifscCode: any = '';
  beneficiaryTypeValue: any;
  transactionMMID: any;
  transactionWithinBank : any ;
  transactionOutsideBank : any ;
  transactionVpa : any ;
  
  constructor(
    private router: Router,
    private form: FormBuilder,
    public dataService: DataService,
    private formValidation: FormValidationService,
    private addPayeeService: AddPayeeService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private customCurrencyPipe: CustomCurrencyPipe,
    public commonMethod: CommonMethods,
    private location: Location,
    private regServices: RegistrationCustDetailsService,
    private otherBankService: OtherBankService,
    private payUpiRequestService: payUpiRequestService,
    private upiDashboardService: UpiDashboardService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.initialization();
    this.getBenificiaryList();
    if(this.dataService.vpaAddressList.length > 0){
      this.fetchVPAAdressList();
    }
    // this.commonMethod.openPopup('div.popup-bottom.search-ifsc2');
    this.dataService.changeMessage(this.commonPageComponent);
    if (
      this.dataService.previousPageUrl == 'managePayee' ||
      this.dataService.previousPageUrl == 'sendMoney'
    ) {

      this.selectedBankType = this.dataService.managePayeeToAddpayee
      if(this.dataService.isEditPayee){
        this.patchPayeeValue()
      }

      // if (this.dataService.managePayeeToAddpayee == 'within') {
      //   this.selectedBankType = 'within';
      // } else if (this.dataService.managePayeeToAddpayee == 'outside') {
      //   this.selectedBankType = 'outside';
      // } else if (this.dataService.managePayeeToAddpayee == 'mmid') {
      //   this.selectedBankType = 'mmid';
      // } else if (this.dataService.managePayeeToAddpayee == 'Vpa') {
      //   this.selectedBankType = 'Vpa';
      // }
    } else if (this.dataService.previousPageUrl == 'otpSession' || this.dataService.previousPageUrl == 'receipt') {
      switch (this.dataService.beneficiaryType) {
        case '1': {
          this.selectedBankType = 'within';
          break;
        }
        case '2': {
          this.selectedBankType = 'outside';
          break;
        }
        case '3': {
          this.selectedBankType = 'mmid';
          break;
        }
        case '4': {
          this.selectedBankType = 'Vpa';
          break;
        }
      }
    }
    else{
      this.selectedBankType = 'within';
    }

    history.pushState({}, this.dataService.isAddPayeeFrompage, this.location.prepareExternalUrl(this.dataService.isAddPayeeFrompage));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.dataService.setShowThemeObservable(true);
    this.dataService.setShowsideNavObservable(true);
    this.dataService.changeMessage(this.commonPageComponent);
    this.dataService.setPageSettings('ADD_PAYEE');
    this.dataService.getBreadcrumb('ADD_PAYEE', this.router.url)


    if(this.dataService.fromInstantPay){

      switch(this.dataService.instaSelectedTab){
          case 'withinbank':
          this.selectedBankType = 'within'
          break;
          case 'outsidebank':
            this.selectedBankType = 'outside'
            break;
          case 'mmid':
              this.selectedBankType = 'mmid'
          break;
          case 'vpa':
            this.selectedBankType = 'vpa'
          break;
      }

      console.log("this.dataService.transactionReceiptObj" + JSON.stringify(this.dataService.transactionReceiptObj));
      this.patchInstaPayeeValue()
    }

  }

  patchPayeeValue(){
    switch (this.selectedBankType) {
      case 'within': {
        this.withinBankForm.patchValue({
          payeeName : this.dataService.payeeDtl.benefName,
          payeeaccountNumber : this.dataService.payeeDtl.beneficiary_account_no,
          confirmaccountNumber :  this.dataService.payeeDtl.beneficiary_account_no,
          payeenickName : this.dataService.payeeDtl.beneficiary_nick_name,
          transactionLimit : this.dataService.payeeDtl.maxAmount
        })
        break;
      }
      case 'outside': {
        this.outsideBankForm.patchValue({
          payeeName : this.dataService.payeeDtl.benefName,
          payeeaccountNumber : this.dataService.payeeDtl.beneficiary_account_no,
          confirmaccountNumber :  this.dataService.payeeDtl.beneficiary_account_no,
          payeenickName : this.dataService.payeeDtl.beneficiary_nick_name,
          ifsc : this.dataService.payeeDtl.ifsc_code,
          transactionLimit : this.dataService.payeeDtl.maxAmount
        })
        this.getBranchDtlFromIfsc();
        break;
      }
      case 'mmid': {
        this.mmidForm.patchValue({
          mobileNumber : "",
          mmid : "",
          payeeName : this.dataService.payeeDtl.benefName,
          payeenickName : this.dataService.payeeDtl.beneficiary_nick_name,
          transactionLimit : this.dataService.payeeDtl.maxAmount
        })
        break;
      }
      case 'Vpa': {
        this.vpaForm.patchValue({
          vpa : "",
          payeeName : this.dataService.payeeDtl.benefName,
          payeenickName : this.dataService.payeeDtl.beneficiary_nick_name,
          validatedVPA : "",
          transactionLimit : this.dataService.payeeDtl.maxAmount
        });
        break;
      }
    }
  }

  patchInstaPayeeValue(){

    var val = this.dataService.transactionReceiptObj;
    console.log(this.selectedBankType)
    switch (this.selectedBankType) {
      case 'within': {
        this.withinBankForm.patchValue({
          payeeName : this.dataService.transactionReceiptObj.payee_name,
          payeeaccountNumber : this.dataService.transactionReceiptObj.to_acc,
          confirmaccountNumber :  this.dataService.transactionReceiptObj.to_acc,
          payeenickName : this.dataService.transactionReceiptObj.payee_name,
          transactionLimit : '10,000'
        })
        break;
      }
      case 'outside': {
        this.outsideBankForm.patchValue({
          payeeName : this.dataService.transactionReceiptObj.payee_name,
          payeeaccountNumber : this.dataService.transactionReceiptObj.to_acc,
          confirmaccountNumber :  this.dataService.transactionReceiptObj.to_acc,
          payeenickName : this.dataService.transactionReceiptObj.payee_name,
          ifsc : this.dataService.transactionReceiptObj.ifscCode,
          transactionLimit : '10,000'
        })
        this.getBranchDtlFromIfsc();
        break;
      }
      case 'mmid': {
        this.mmidForm.patchValue({
          mobileNumber : this.dataService.transactionReceiptObj.confirmmobilenumber,
          mmid :  this.dataService.transactionReceiptObj.mmid,
          payeeName : this.dataService.transactionReceiptObj.payee_name,
          payeenickName : this.dataService.transactionReceiptObj.payee_name,
          transactionLimit :'10,000'
        })
        break;
      }
      case 'vpa': {
        this.vpaForm.patchValue({
          vpa : "",
          payeeName :this.dataService.transactionReceiptObj.payee_name,
          payeenickName :this.dataService.transactionReceiptObj.payee_name,
          validatedVPA : "",
          transactionLimit : "10,000"
        });
        break;
      }
    }
  }


  OnInput(evn, form: FormGroup) {

    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({
      transactionLimit: evn
    })

    // if (Number(this.accBalance) > Number((evn.trim().replace('₹', '')).replace(/,/g, ''))) {
    //   this.invalidAmount = false
    // } else {
    //   this.invalidAmount = true
    // }

  }

  focusTransactionLimit(el, type){
    console.log("TEST", el)
    var amountText = el
    switch(type){
      case 'mmidForm':
       amountText = amountText.replace(/^\₹|,|\.\d*$/gm, '')
       this.transactionMMID = amountText
        break;

      case 'withinBankForm':
        this.transactionWithinBank = amountText.replace(/^\₹|,|\.\d*$/gm, '')
        break;

        case 'outsideBankForm':
          this.transactionOutsideBank = amountText.replace(/^\₹|,|\.\d*$/gm, '')
          break;

          case 'vpaForm':
            this.transactionVpa = amountText.replace(/^\₹|,|\.\d*$/gm, '')
            break;
    }
  }

  inputClick() {
    this.commonMethod.openPopup('div.popup-bottom.search-ifsc1');
  }

  getBenificiaryList() {
    this.accountList = [];
    this.payeeList = [];

    this.accountList = this.dataService.customerOperativeAccList.filter(
      (obj) =>
        obj?.Status == 'Active'
    );

    this.accountList = this.accountList.filter((obj) => obj.accountType != 'CAPPI');
    console.log(this.accountList);

    this.getBenefListAPICall();

  }

  getBenefListAPICall() {

    var param = this.otherBankService.benificiaryListParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BENIFICIARYLIST
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.payeeList = data.set.records.filter(
            (obj) => obj.statusId == '3'
          );
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  /**
   * Initialization functionality
   */
  initialization() {
    this.buildForm();

    if(!this.dataService.isEditPayee){
      this.withInPayeeList = this.dataService.withinBankPayeeList;
      this.oursidePayeeList = this.dataService.outsideBankPayeeList;
      this.mmidPayeeList = this.dataService.mmidBankPayeeList;
      this.vpaPayeeList = this.dataService.vpainBankPayeeList;
    }

  }

  /**
   * Validation if accountNo & confirm accountNo doesn't match
   * @param formGroup
   */
  accountNo(formGroup: FormGroup) {
    this.ownAccCheck = false;
    const { value: payeeAccNo } = formGroup.get('payeeaccountNumber');
    const { value: payeeCnfAccNo } = formGroup.get('confirmaccountNumber');
    return payeeAccNo === payeeCnfAccNo ? null : { accountNotMatch: true };
  }

  validMobileNo(formGroup: FormGroup) {
    const { value: mobileNumber } = formGroup.get('mobileNumber');
    console.log('mobileNumber', mobileNumber);
    return mobileNumber === '0000000000' ? { invalidMobNo: true } : null;
  }

  validMmid(formGroup: FormGroup) {
    console.log('accountNo');
    const { value: mmid } = formGroup.get('mmid');
    return mmid === '0000000' ? { invalidmmid: true } : null;
  }

  /**
   * Function call on fund transfer click
   * validate form with respect to @activePayee
   * and add payee with respect to it
   */

  validateWithinBankPayeeForm() {
    if (this.withinPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.withinPayeeForm);
      return;
    }
  }

  validateOutsideBankPayeeForm() {
    if (this.outsidePayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.outsidePayeeForm);
      return;
    }
  }

  validateMmidPayeeForm() {
    if (this.mmidPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.mmidPayeeForm);
      return;
    }
  }

  validateOtherVpaPayeeForm() {
    if (this.vpaPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.vpaPayeeForm);
      return;
    }
  }

  /**
   * Reset all forms on click
   */
  resetForm() {
    this.withinPayeeForm.reset();
    this.outsidePayeeForm.reset();
    this.mmidPayeeForm.reset();
    this.vpaPayeeForm.reset();
  }

  /**
   * Function check transfer type and redirect to otpscreen
   * @param
   */
  fundTransferCall(param) {
    console.log(param);
  }

  // old code
  /**
   * On other bank click
   */
  ownBankPayeeClick() {
    //this.DataService.customerOperativeAccList.find(lang => lang.langCode === language)
    this.validateOwnBankPayeeForm();
    if (this.ownBankPayeeForm.valid) {
      this.setBankTypeDetails();
      this.router.navigateByUrl('/addPayeeConfirm');
    } else {
      this.formErrorsOwnPayee = this.formValidation.validateForm(
        this.ownBankPayeeForm,
        this.formErrorsOwnPayee,
        true
      );
    }
  }

  /**
   * On other bank click
   */
  otherBankPayeeClick() {
    this.validateOtherBankPayeeForm();
    if (this.otherBankPayeeForm.valid) {
      this.setBankTypeDetails();
    } else {
      this.formErrorsOtherPayee = this.formValidation.validateForm(
        this.otherBankPayeeForm,
        this.formErrorsOtherPayee,
        true
      );
    }
  }

  /**
   * On international bank click
   */
  interBankPayeeClick() {
    this.validateInternationalBankPayeeForm();
    if (this.internationalBankPayeeForm.valid) {
      this.setBankTypeDetails();
    } else {
      this.formErrorsInterPayee = this.formValidation.validateForm(
        this.internationalBankPayeeForm,
        this.formErrorsInterPayee,
        true
      );
    }
  }

  /**
   * set add payee details according to bank type
   */
  setBankTypeDetails() {
    let customerDetails, amntInWords;
    if (this.bankTypeCode == '1') {
      customerDetails = this.ownBankPayeeForm.getRawValue();
      amntInWords = this.amountInWordSB;
    } else if (this.bankTypeCode == '3') {
      customerDetails = this.otherBankPayeeForm.getRawValue();
      amntInWords = this.amountInWordOB;
    } else if (this.bankTypeCode == '4') {
      customerDetails = this.internationalBankPayeeForm.getRawValue();
      amntInWords = this.amountInWordIB;
    } else {
    }
    this.dataService.setPayeeConfirmationDetails({
      bankType: this.bankTypeCode,
      values: customerDetails,
      amountLimit: customerDetails.limitAmount.trim().replace(/[^0-9]+/g, ''),
      amountInWords: amntInWords,
    });
    this.router.navigateByUrl('/addPayeeConfirm');
  }

  /**
   * Form Validations
   */
  validateOwnBankPayeeForm() {
    if (this.ownBankPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.ownBankPayeeForm);
      return;
    }
  }

  /**
   * Form Validations
   */
  validateOtherBankPayeeForm() {
    if (this.otherBankPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.otherBankPayeeForm);
      return;
    }
  }

  /**
   * Form Validations
   */
  validateInternationalBankPayeeForm() {
    if (this.internationalBankPayeeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.internationalBankPayeeForm);
      return;
    }
  }

  /**
   * Form Validations
   */
  validateIFSCCodeForm() {
    if (this.ifscCodeForm.invalid) {
      this.formValidation.markFormGroupTouched(this.ifscCodeForm);
      return;
    }
  }
  /**
   * Clear ifscode form records
   */
  clear() {
    this.ifscCodeForm.reset();
    this.isCodeFound = false;
    this.ifscCode = '';
  }

  /**
   * get selected IFSc Code
   */
  selectCode() {
    if (this.bankTypeCode == '3') {
      this.addControlsForOtherPayee();
      this.otherBankPayeeForm.patchValue({
        ifscCode: this.commonResp.ifsc_code,
      });
      this.otherBankPayeeForm.patchValue({
        bankName: this.commonResp.bankName,
      });
      this.otherBankPayeeForm.patchValue({
        branchName: this.commonResp.branch_name,
      });
      this.otherBankPayeeForm.patchValue({ city: this.commonResp.city });
      this.isIFSCCodeAvail = true;
    } else if (this.bankTypeCode == '4') {
      this.internationalBankPayeeForm.patchValue({
        swiftCode: this.commonResp.swiftCode,
      });
    }
    $('#confirmationModal').modal('hide');
  }

  /**
   * searchCode based on bank Type
   */
  searchCodeByBankType() {
    this.searchIFSCCode();
  }

  /**
   * Search IFSC Code from backend api
   */
  searchIFSCCode() {
    this.validateIFSCCodeForm();
    if (this.ifscCodeForm.valid) {
      var param = this.addPayeeService.getIFSCCodeParams(
        this.ifscCodeForm.value
      );
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_IFSCSEARCH
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            this.commonResp = resp;
            this.isCodeFound = true;
          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });
    } else {
      this.formErrorsIFSC = this.formValidation.validateForm(
        this.ifscCodeForm,
        this.formErrorsIFSC,
        true
      );
    }
  }

  /**
   * Search Swift Code from backend api
   */
  searchSwiftCode() {
    this.validateIFSCCodeForm();
    if (this.ifscCodeForm.valid) {
      var param = this.addPayeeService.getIFSCCodeParams(
        this.ifscCodeForm.value
      );
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_GETINFOBYSWIFT
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            this.commonResp = resp;
            this.isCodeFound = true;
          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });
    } else {
      this.formErrorsIFSC = this.formValidation.validateForm(
        this.ifscCodeForm,
        this.formErrorsIFSC,
        true
      );
    }
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    // if (resp.opstatus == "02" || resp.opstatus == "01") {
    //   showToastMessage(resp.Result, "error");
    // }
  }

  /**
   * onIFSCBtnClick
   */
  onSearchCodeClick() {
    this.ifscCodeForm.reset();
    this.isCodeFound = false;
    this.otherBankPayeeForm.patchValue({ ifscCode: '' });
    this.removeControlsForOtherPayee();
  }

  /**
   * Set bankType on select
   * @param bankType
   */
  selectBankType(bankType) {
    this.selectedBankType = bankType;
    console.log('Selected Bank type', this.selectedBankType);
    this.dataService.addPayeeSelectedBankType = bankType;
  }

  /**
   * on cancel click
   */
  onCancel() {
    this.router.navigateByUrl('/managePayee');
  }

  /**
   * set selected bank type
   */
  setSelectedBankType(code) {
    this.dataService.bankTypeCode = code;
    this.bankTypeCode = code;
    this.ownBankPayeeForm.reset();
    this.otherBankPayeeForm.reset();
    this.internationalBankPayeeForm.reset();
    this.removeControlsForOtherPayee();
    this.removeControlsForInterBankPayee();
  }

  setActiveTab() {
    setTimeout(() => {
      if (this.bankTypeCode != '') {
        if (this.bankTypeCode == '1') {
          $('.ux-nav-tabs a[href="#own"]').tab('show');
        } else if (this.bankTypeCode == '3') {
          $('.ux-nav-tabs a[href="#other"]').tab('show');
        } else if (this.bankTypeCode == '4') {
          $('.ux-nav-tabs a[href="#international"]').tab('show');
        } else {
          $('.ux-nav-tabs a[href="#own"]').tab('show');
        }
      } else {
        $('.ux-nav-tabs a[href="#own"]').tab('show');
        this.bankTypeCode = '1';
      }
    }, 0);
  }

  searchByIFSCCode(value) {
    if (value && value.length >= 11) {
      var param = this.addPayeeService.getInfoByIfscParams(
        this.otherBankPayeeForm.value
      );
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_GETINFOBYIFSC
        )
        .subscribe((data) => {
          console.log(data);
          var resp = JSON.parse(data.responseParameter);
          if (resp.opstatus == '00') {
          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });
    }
  }

  // vpaVerify() {

  //     var param = this.addPayeeService.getVpa();
  //     this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_VerifyPaymentAddress).subscribe(data => {
  //       console.log(data);
  //       var resp = JSON.parse(data.responseParameter);
  //       if (resp.opstatus == "00") {
  //         console.log("responseeeeeeeeeeeeeeee-->"+JSON.stringify(resp));
  //         this.commonResp = resp;
  //         this.isCodeFound = true;
  //       }
  //       else {
  //         this.errorCallBack(data.subActionId, resp);
  //       }
  //     })
  //     }

  searchBySwiftCode(value) {
    if (value && value.length >= 11) {
      var param = this.addPayeeService.getInfoBySwiftParams(
        this.internationalBankPayeeForm.value
      );
      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_GETINFOBYSWIFT
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            // this.commonResp = resp;
            this.addControlsForInterPayee();
            this.internationalBankPayeeForm.patchValue({
              bankName: resp.bankName,
              branchName: resp.branch_name,
              city: resp.city,
            });
            this.isSwiftCodeAvail = true;
          } else {
            this.errorCallBack(data.subActionId, resp);
          }
        });
    } else if (value.length < 11) {
      this.removeControlsForInterBankPayee();
    }
  }

  addControlsForOtherPayee() {
    this.otherBankPayeeForm.addControl(
      'bankName',
      new FormControl({ value: '', disabled: true })
    );
    this.otherBankPayeeForm.addControl(
      'branchName',
      new FormControl({ value: '', disabled: true })
    );
    this.otherBankPayeeForm.addControl(
      'city',
      new FormControl({ value: '', disabled: true })
    );
    this.otherBankPayeeForm.addControl(
      'limitAmount',
      new FormControl('', [Validators.required])
    );
  }

  addControlsForInterPayee() {
    this.internationalBankPayeeForm.addControl(
      'bankName',
      new FormControl({ value: '', disabled: true })
    );
    this.internationalBankPayeeForm.addControl(
      'branchName',
      new FormControl({ value: '', disabled: true })
    );
    this.internationalBankPayeeForm.addControl(
      'city',
      new FormControl({ value: '', disabled: true })
    );
    this.internationalBankPayeeForm.addControl(
      'limitAmount',
      new FormControl('', [Validators.required])
    );
  }

  removeControlsForOtherPayee() {
    this.isIFSCCodeAvail = false;
    this.otherBankPayeeForm.removeControl('bankName');
    this.otherBankPayeeForm.removeControl('branchName');
    this.otherBankPayeeForm.removeControl('city');
    this.otherBankPayeeForm.removeControl('limitAmount');
  }

  removeControlsForInterBankPayee() {
    this.isSwiftCodeAvail = false;
    this.internationalBankPayeeForm.removeControl('bankName');
    this.internationalBankPayeeForm.removeControl('branchName');
    this.internationalBankPayeeForm.removeControl('city');
    this.internationalBankPayeeForm.removeControl('limitAmount');
  }

  ngOnDestroy() {
    this.dataService.bankTypeCode = '';
  }

  // onInput(value, type) {
  //   if(value == '0'){
  //    if(this.ownBankPayeeForm.contains('limitAmount'))this.ownBankPayeeForm.get('limitAmount').reset();
  //    if(this.otherBankPayeeForm.contains('limitAmount'))this.otherBankPayeeForm.get('limitAmount').reset();
  //    if(this.internationalBankPayeeForm.contains('limitAmount'))this.internationalBankPayeeForm.get('limitAmount').reset();
  //     return;
  //   }
  //   if (value != '') {
  //     let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
  //     if (type == '1') {
  //       this.ownBankPayeeForm.patchValue({ limitAmount: "₹" + updatedCurrency });
  //       this.amountInWordSB = this.commonMethod.convertNumberToWords(value);
  //     } else if (type == '3') {
  //       this.otherBankPayeeForm.patchValue({ limitAmount: "₹" + updatedCurrency });
  //       this.amountInWordOB = this.commonMethod.convertNumberToWords(value);
  //     } else if (type == '4') {
  //       this.internationalBankPayeeForm.patchValue({ limitAmount: "₹" + updatedCurrency });
  //       this.amountInWordIB = this.commonMethod.convertNumberToWords(value);
  //     }
  //   } else {
  //     this.amountInWordSB = "";
  //     this.amountInWordOB = "";
  //     this.amountInWordIB = "";
  //     this.ownBankPayeeForm.patchValue({ limitAmount: "" });
  //     this.otherBankPayeeForm.patchValue({ limitAmount: "" });
  //     this.otherBankPayeeForm.patchValue({ limitAmount: "" });
  //   }
  // }

  // addBeneficiary(param) {
  //   this.validateIFSCCodeForm();
  //   if (this.ifscCodeForm.valid) {
  //     var param = this.addPayeeService.getIFSCCodeParams(this.ifscCodeForm.value);
  //     this.http.callBankingAPIService(param, this.storage.getLocalStorage(9), this.constant.serviceName_ADDBENEFICIARY).subscribe(data => {
  //       console.log(data);
  //       var resp = data.responseParameter;
  //       if (resp.opstatus == "00") {
  //         this.commonResp = resp;
  //         this.isCodeFound = true;
  //       }
  //       else {
  //         this.errorCallBack(data.subActionId, resp);
  //       }
  //     })
  //   } else {
  //     this.formErrorsIFSC = this.formValidation.validateForm(this.ifscCodeForm, this.formErrorsIFSC, true);
  //   }
  // }

  // onFundTransferSubmit(){
  //   var param = this.addPayeeService.getAddBenficiaryParamsnew(data, benificiaryType, amountLimit);
  //   this.addBeneficiary(param);
  // }

  /*********** New Code  ***********/

  // New Code
  buildForm() {
    //within bank
    this.withinBankForm = new FormGroup(
      {
        payeeName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required
        ]),
        payeeaccountNumber: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
        confirmaccountNumber: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
        payeenickName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
        transactionLimit: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(200000),
        ]),
      },
      { validators: [this.accountNo.bind(this)] }
    );

    //outside bank
    this.outsideBankForm = new FormGroup(
      {
        payeeName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
        // payeeaccountType: new FormControl('', [Validators.required]),
        payeeaccountNumber: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.min(1),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]),
        confirmaccountNumber: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
          Validators.min(1),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]),
        ifsc: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [Validators.required, , Validators.pattern("^[A-Z0-9_]*$"), Validators.minLength(11)]),
        payeenickName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9 ]*'),

        ]),
        transactionLimit: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(500000),
        ]),
      },
      { validators: [this.accountNo.bind(this)] }
    );

    //mmid
    this.mmidForm = new FormGroup(
      {
        mobileNumber: new FormControl(
          {value:'',disabled:this.dataService.isEditPayee},
          Validators.compose([Validators.required, Validators.minLength(10)])
        ),
        mmid: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.maxLength(7),
          Validators.minLength(7),
        ]),
        payeeName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
        payeenickName: new FormControl({value:'',disabled:this.dataService.isEditPayee}, [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9 ]*'),
        ]),
        transactionLimit: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(200000),
        ]),
      },
      { validators: Validators.compose([this.validMobileNo.bind(this)]) }
    );
    //, this.validMmid.bind(this)

    //vpa
    this.vpaForm = new FormGroup({
      vpa: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)]),
      payeeName: new FormControl({value:'',disabled:true}, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*$'),
      ]),
      payeenickName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9 ]*$'),
      ]),
      validatedVPA: new FormControl('', [
        Validators.required,
      ]),
      transactionLimit: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(200000),
      ]),
      // sendTo: new FormControl('', [
      //   Validators.required
      // ]),
      // remark: new FormControl('', [
      // ]),
    });

    //search Ifsc
    this.searchIfscForm = new FormGroup({
      enterBank: new FormControl(''),
      enterBranch: new FormControl(''),
    });
  }

  validateForm(formType) {
    //within bank
    if (this.withinBankForm.invalid && formType == 'withinBank') {
      this.withinBankForm.get('payeeName').markAsTouched();
      this.withinBankForm.get('payeeaccountNumber').markAsTouched();
      this.withinBankForm.get('confirmaccountNumber').markAsTouched();
      this.withinBankForm.get('payeenickName').markAsTouched();
      this.withinBankForm.get('transactionLimit').markAsTouched();
      return;
    }

    //outside bank
    if (this.outsideBankForm.invalid && formType == 'outsideBank') {
      this.outsideBankForm.get('payeeName').markAsTouched();
      // this.outsideBankForm.get('payeeaccountType').markAsTouched();
      this.outsideBankForm.get('payeeaccountNumber').markAsTouched();
      this.outsideBankForm.get('confirmaccountNumber').markAsTouched();
      this.outsideBankForm.get('ifsc').markAsTouched();
      this.outsideBankForm.get('payeenickName').markAsTouched();
      this.outsideBankForm.get('transactionLimit').markAsTouched();
      return;
    }

    //mmid
    if (this.mmidForm.invalid && formType == 'mmid') {
      this.mmidForm.get('mobileNumber').markAsTouched();
      this.mmidForm.get('mmid').markAsTouched();
      this.mmidForm.get('payeeName').markAsTouched();
      this.mmidForm.get('payeenickName').markAsTouched();
      this.mmidForm.get('transactionLimit').markAsTouched();
      return;
    }

    //vpa
    if (this.vpaForm.invalid && formType == 'vpa') {
      this.vpaForm.get('vpa').markAsTouched();
      this.vpaForm.get('payeeName').markAsTouched();
      this.vpaForm.get('payeenickName').markAsTouched();
      this.vpaForm.get('transactionLimit').markAsTouched();
      return;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  gotoContinue() {
    this.commonMethod.closePopup('div.popup-bottom.search-ifsc1');
    console.log('Star form:', this.searchIfscForm.value);
    var param = this.addPayeeService.getIFSCCodeParams(
      this.searchIfscForm.value
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETBRANCHLISTBYBRANCHBANK
      )
      .subscribe((data) => {
        console.log(data);
        console.log('get favourite list', this.searchIfsc);
        var resp = data.responseParameter;
        // console.log("data.responseParameter " + data.responseParameter.bankName)
        if (resp.opstatus == '00') {
          this.commonMethod.openPopup('div.search-ifsc2');
          this.searchIfsc = data.set['records'];
        } else {
          this.errorCallBack(data.subActionId, this.resp);
        }
      });
  }

  closepopup(popup) {
    this.commonMethod.closePopup(popup);
    if(popup == 'div.popup-bottom.limit-updated-successfully'){
      if(this.constant.getPlatform() == "web"){
        this.router.navigateByUrl("/managePayee");
      }
      else{
        this.location.back();
      }
    }
  }

  submitPayee(formValue, formType){
    if(this.dataService.isEditPayee){
      this.editPayeeSubmit(formValue,formType)
      //this.getAllOtherBankStandingInstruction(formValue, formType)
    }
    else{
      this.addPayeeSubmit(formValue, formType);
    }
  }

  editPayeeSubmit(formValue,formType){
    this.dataService.formType = formType;
    this.dataService.beneficiaryTypeValue = this.beneficiaryTypeValue;
    this.dataService.feedbackType = 'addPayee';

    if (formType == 'withinBank') {

      let accNo = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == formValue.payeeaccountNumber)
      if (accNo.length != 0) { this.ownAccCheck = true; return };
      console.log('withinPayeeList',this.withInPayeeList);
      let alreadyAccExist = this.withInPayeeList.filter(obj => obj.beneficiary_account_no == formValue.payeeaccountNumber);
      console.log('alreadyAccExist',alreadyAccExist);
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.withinBankForm.valid) {
        this.beneficiaryTypeValue = '1';

        if (this.invalidAccount) {
          return;
        }

        this.modifyBenificary(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'outsideBank') {
      let accNo = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == formValue.payeeaccountNumber)
      if (accNo.length != 0) { this.ownAccCheck = true; return };

      let alreadyAccExist = this.oursidePayeeList.filter(obj => obj.beneficiary_account_no == formValue.payeeaccountNumber)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.outsideBankForm.valid && this.isPSBCustomer == false) {
        this.beneficiaryTypeValue = '2';

        if (this.invalidAccount) {
          return;
        }

        this.modifyBenificary(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'mmid') {
      console.log(this.mmidForm.valid);
      let alreadyAccExist = this.mmidPayeeList.filter(obj => obj.MMID == formValue.mmid)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.mmidForm.valid) {
        this.beneficiaryTypeValue = '3';
        this.modifyBenificary(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'vpa') {
      let alreadyAccExist = this.vpaPayeeList.filter(obj => obj.VPA == formValue.vpa)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.vpaForm.valid) {

        if (!this.showUserInfo) {
          return
        }

        this.beneficiaryTypeValue = '4';
        this.modifyBenificary(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    }
  }


  getAllOtherBankStandingInstruction(formValue,formType){
    var param = this.addPayeeService.getOutsidePayeeSIParam(this.dataService.payeeDtl);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId) , this.constant.serviceName_STANDINGINSTRUCTIONCHECKDETAILS).subscribe(data => {
      console.log(data);
      let response = data.responseParameter;
      if (response.opstatus == "00") {
        this.editPayeeSubmit(formValue,formType)
      }
      else{

      }
    }, error => {
    });
  }

  addPayeeSubmit(formValue, formType) {
    this.dataService.formType = formType;
    this.dataService.beneficiaryTypeValue = this.beneficiaryTypeValue;
    this.dataService.feedbackType = 'addPayee';

    if (formType == 'withinBank') {

      let accNo = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == formValue.payeeaccountNumber)
      if (accNo.length != 0) { this.ownAccCheck = true; return };
      console.log('withinPayeeList',this.withInPayeeList);
      let alreadyAccExist = this.withInPayeeList.filter(obj => obj.beneficiary_account_no == formValue.payeeaccountNumber);
      console.log('alreadyAccExist',alreadyAccExist);
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.withinBankForm.valid) {
        this.beneficiaryTypeValue = '1';

        if (this.invalidAccount) {
          return;
        }

        this.addBeneficy(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'outsideBank') {
      let accNo = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == formValue.payeeaccountNumber)
      if (accNo.length != 0) { this.ownAccCheck = true; return };

      let alreadyAccExist = this.oursidePayeeList.filter(obj => obj.beneficiary_account_no == formValue.payeeaccountNumber)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.outsideBankForm.valid && this.isPSBCustomer == false) {
        this.beneficiaryTypeValue = '2';

        if (this.invalidAccount) {
          return;
        }

        this.addBeneficy(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'mmid') {
      console.log(this.mmidForm.valid);
      let alreadyAccExist = this.mmidPayeeList.filter(obj => obj.MMID == formValue.mmid)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.mmidForm.valid) {
        this.beneficiaryTypeValue = '3';
        this.addBeneficy(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    } else if (formType == 'vpa') {
      let alreadyAccExist = this.vpaPayeeList.filter(obj => obj.VPA == formValue.vpa)
      if (alreadyAccExist.length != 0) { this.commonMethod.openPopup('div.popup-bottom.payee-already-added'); return };

      if (this.vpaForm.valid) {

        if (!this.showUserInfo) {
          return
        }

        this.beneficiaryTypeValue = '4';
        this.addBeneficy(formValue, this.beneficiaryTypeValue);
        console.log('FormTye :: ', formType);
        console.log('FormTye :: ', formValue);
      } else {
        this.validateForm(formType);
      }
    }
  }

  //  addBeneficiary(param) {

  //     this.http.callBankingAPIService(param, 9, this.constant.serviceName_ADDBENEFICIARY).subscribe(data => {
  //       console.log(data);
  //       var resp = data.responseParameter;
  //       if (resp.opstatus == "00") {
  //         this.commonResp = resp;
  //         this.isCodeFound = true;
  //       }
  //       else {
  //         this.errorCallBack(data.subActionId, resp);
  //       }
  //     })

  // }

  onVPAChange(value) {

    this.validUPI = false;
    this.invalidUPIMessage = 'Please verify UPI to proceed'

  }

  modifyBenificary(formValue, beneficiaryType){
    // var param = this.addPayeeService.editPayeeParam(this.dataService.payeeDtl.ID,formValue.transactionLimit);
    // this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId) , this.constant.serviceName_UPDATEBENEFICIARYTRANSACTIONLIMIT).subscribe(data => {
    //   console.log(data);
    //   let response = data.responseParameter;
    //   if (response.opstatus == "00") {
    //     this.commonMethod.openPopup('div.popup-bottom.limit-updated-successfully');
    //   }
    //   else{

    //   }
    // }, error => {
    // });

    this.dataService.resetTransactionObj();
    this.dataService.beneficiaryType = beneficiaryType;
    this.beneficiaryype = beneficiaryType;
    this.dataService.request = '';
    var param = this.addPayeeService.editPayeeParam(this.dataService.payeeDtl.ID,formValue.transactionLimit);
    // this.addBeneficiary(param);
    this.dataService.endPoint = this.constant.serviceName_UPDATEBENEFICIARYTRANSACTIONLIMIT;
    this.dataService.request = param;

    this.dataService.authorizeHeader = 'MODIFY PAYEE';
    if (beneficiaryType == 1) {
      this.dataService.transactionReceiptObj.payeeAccName = this.dataService.payeeDtl.benefName;
      this.dataService.transactionReceiptObj.payeeAccNo = this.dataService.payeeDtl.beneficiary_account_no;
      this.dataService.transactionReceiptObj.payeeNickName = this.dataService.payeeDtl.beneficiary_nick_name;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.withinBankForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 2) {
      this.dataService.transactionReceiptObj.payeeAccName = this.dataService.payeeDtl.benefName;
      this.dataService.transactionReceiptObj.payeeAccNo = this.dataService.payeeDtl.beneficiary_account_no;
      this.dataService.transactionReceiptObj.payeeNickName = this.dataService.payeeDtl.beneficiary_nick_name;
      this.dataService.transactionReceiptObj.payeeIfsc = this.dataService.payeeDtl.ifsc_code;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.outsideBankForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 3) {
      this.dataService.transactionReceiptObj.payeeMobileNo = this.mmidForm.value.mobileNumber;
      this.dataService.transactionReceiptObj.payeeAccName = this.dataService.payeeDtl.benefName;
      this.dataService.transactionReceiptObj.payeeNickName = this.dataService.payeeDtl.beneficiary_nick_name;
      this.dataService.transactionReceiptObj.payeeMMID = this.mmidForm.value.mmid;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.mmidForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 4) {
      this.dataService.transactionReceiptObj.payeeAccName = this.dataService.validateAddressResp.RESULT;
      this.dataService.transactionReceiptObj.payeeNickName = this.dataService.payeeDtl.beneficiary_nick_name;
      this.dataService.transactionReceiptObj.payeeIfsc = this.dataService.validateAddressResp.IFSC;

      this.dataService.transactionReceiptObj.payeeVpa = this.dataService.validateAddressResp.validatedVpa;
      this.dataService.transactionReceiptObj.payeeTransLimit =
        this.vpaForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    }

    this.dataService.screenType = 'addPayee';
    this.dataService.paymentType = this.selectedBankType;
    this.router.navigate(['/otpSession']);

  }

  addBeneficy(formValue, beneficiaryType) {
    this.dataService.resetTransactionObj();
    this.dataService.beneficiaryType = beneficiaryType;
    this.beneficiaryype = beneficiaryType;
    this.dataService.request = '';
    var param = this.addPayeeService._getAddBenficiaryParamss(formValue, beneficiaryType, this.bankDtl);
    // this.addBeneficiary(param);
    this.dataService.endPoint = this.constant.serviceName_ADDBENEFICIARY;
    this.dataService.request = param;

    this.dataService.authorizeHeader = 'ADD PAYEE';
    if (beneficiaryType == 1) {
      this.dataService.transactionReceiptObj.payeeAccName = this.withinBankForm.value.payeeName;
      this.dataService.transactionReceiptObj.payeeAccNo = this.withinBankForm.value.confirmaccountNumber;
      this.dataService.transactionReceiptObj.payeeNickName = this.withinBankForm.value.payeenickName;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.withinBankForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 2) {
      this.dataService.transactionReceiptObj.payeeAccName = this.outsideBankForm.value.payeeName;
      this.dataService.transactionReceiptObj.payeeAccNo = this.outsideBankForm.value.confirmaccountNumber;
      this.dataService.transactionReceiptObj.payeeNickName = this.outsideBankForm.value.payeenickName;
      this.dataService.transactionReceiptObj.payeeIfsc = this.outsideBankForm.value.ifsc;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.outsideBankForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 3) {
      this.dataService.transactionReceiptObj.payeeMobileNo = this.mmidForm.value.mobileNumber;
      this.dataService.transactionReceiptObj.payeeAccName = this.mmidForm.value.payeeName;
      this.dataService.transactionReceiptObj.payeeNickName = this.mmidForm.value.payeenickName;
      this.dataService.transactionReceiptObj.payeeMMID = this.mmidForm.value.mmid;
      this.dataService.transactionReceiptObj.payeeTransLimit = this.mmidForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    } else if (beneficiaryType == 4) {
      this.dataService.transactionReceiptObj.payeeAccName = this.dataService.validateAddressResp.RESULT;
      this.dataService.transactionReceiptObj.payeeNickName = this.vpaForm.value.payeenickName;
      this.dataService.transactionReceiptObj.payeeIfsc = this.dataService.validateAddressResp.IFSC;

      this.dataService.transactionReceiptObj.payeeVpa = this.dataService.validateAddressResp.validatedVpa;
      this.dataService.transactionReceiptObj.payeeTransLimit =
        this.vpaForm.value.transactionLimit.trim().replace(/[^.0-9]+/g, '');
    }

    this.dataService.screenType = 'addPayee';
    this.dataService.paymentType = this.selectedBankType;
    this.router.navigate(['/otpSession']);

  }

  getToAccValue(bankDtl) {
    this.outsideBankForm.patchValue({ ifsc: bankDtl.IFSC });
    this.bankAddress = bankDtl.bank + "," + bankDtl.city + "," + bankDtl.cust_address;
    this.bankDtl = bankDtl;
    this.commonMethod.closePopup('div.search-ifsc2');
  }


  /**
 * Fetch VPA Address List
 */
  fetchVPAAdressList() {
    var param = this.upiDashboardService.getVPAAddressListAPICall();
    let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
    this.fetchVPAListAPICall(param, deviceId, false)
  }

  fetchVPAListAPICall(request, deviceId, notificationSync) {

    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_PROCESSUPISERVICESESSION, true, { notificationSync: notificationSync }).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      console.log('1 => response', response);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS => ", response);
            this.vpaAddressList = this.dataService.processVPAlist(response.responseParameter.addresslist);
            // this.accountDetails = this.getDefaultVPA(this.vpaAddressList);
            this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();


            console.log(JSON.stringify("this.vpaAddressList" + this.vpaAddressList))
          default:
            console.log("default => ", response.subActionId);
            break;
        }
      }
      // else
      // showToastMessage(response.msg,'error')
    }, error => {
      console.log("ERROR!", error);
    });
  }

  getDefaultVPA(VPAList) {
    let vpaDetails = VPAList.filter((item) => {
      return item.default == 'Y';
    });

    let vpaAccountDetails = vpaDetails.forEach(element => {
      element.accounts.filter((item) => {
        return item.isDefaultAccount == 'Y';
      });
    })

    var defaultVPA = {
      'vpaDetails': vpaDetails,
      'vpaAccountDetails': vpaAccountDetails
    }
    return defaultVPA;
  }

  checkAvailability() {
    // var param = this.addPayeeService.checkUpiAddress(this.vpaForm.value.vpa);
    // this.checkAvailabilityApiCall(param);
    // this.verified = true
    if (this.vpaForm.value.vpa) {
      let upiIdOrMobno = this.vpaForm.get('vpa').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.payUpiRequestService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.vpaForm.value.vpa }, this.defaultVPAAccountDetails, this.commonMethod.randomString(9, 'PSB'));
        this.UpiApiCall(req);
      }
    }

  }

  selectUPI(item) {

  }

  searchAccount(event) {

  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log("API response => ", data);
      let response = data.responseParameter.upiResponse;
      console.log('UPI response => ');
      console.log(response.responseParameter);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.showUserInfo = true;
            this.dataService.verifyAddressResp = response.responseParameter; // CODE , UPI ID ,
            this.dataService.validateAddressResp = response.responseParameter;
            // if(this.dataService.validateAddressResp.MASKNAME.trim() !="" && this.dataService.validateAddressResp.MASKNAME != null )
            if(this.dataService.validateAddressResp.MASKNAME !="" && this.dataService.validateAddressResp.MASKNAME != null )
            {
            this.vpaForm.get('validatedVPA').setValue(response.responseParameter.MASKNAME);
            this.vpaForm.patchValue({'payeeName' : response.responseParameter.MASKNAME});
            }
            else
            {
              this.vpaForm.get('validatedVPA').setValue('-');
            this.vpaForm.patchValue({'payeeName' : '-'});
            }
            break;
          case this.constant.upiserviceName_GETDEFAULTVPA:
            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, this.commonMethod.randomString(9, 'PSB'));
            this.UpiApiCall(req);
            break;
          default:
            break;
        }
        this.validUPI = true;
      } else {
        this.validUPI = false;
        // Form Reset
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  // checkAvailabilityApiCall(param) {
  //   this.http
  //     .callBankingAPIService(
  //       param,
  //       this.storage.getLocalStorage(this.constant.storage_deviceId),
  //       this.constant.serviceName_VERIFYUPIPAYMENTADDRESS
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //       var resp = data.responseParameter;
  //       if (resp.opstatus == '00') {
  //         this.validUPI = true;
  //         this.validUPIMessage = "UPI ID Available"
  //         console.log(data.responseParameter);
  //         var param = this.addPayeeService.fetchAccountListParam();
  //         this.fetchAccountListApiCall(param);
  //       } else {
  //         this.validUPI = false
  //         this.invalidUPIMessage = "UPI ID already exists"
  //       }
  //     });
  // }

  fetchAccountListApiCall(param) {
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_FETCHUPIACCOUNTLIST
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter.upiResponse);
          if (data.responseParameter.hasOwnProperty('upiResponse')) {
            this.upiDtl = JSON.parse(data.responseParameter.upiResponse);
          }
        } else {
        }
      });
  }

  changePaymentType(type) {
    this.invalidAccount = false;
    this.showUserInfo = false;
    this.paymentType = type;
    switch (type) {
      case 'within':
        this.withinBankForm.reset();
        break;
      case 'outside':
        this.outsideBankForm.reset();
        this.bankAddress = ''
        break;
      case 'vpa':
        this.vpaForm.reset();
        break;
      case 'mmid':
        this.mmidForm.reset();
        break;
    }
  }

  clearIfscPrevData(){
    if(this.outsideBankForm.value.ifsc.length != 0 &&  this.outsideBankForm.controls.ifsc.invalid){
      this.outsideBankForm.patchValue({
        ifsc : ''
      })
      this.bankAddress = ''
    }
  }

  getBranchDtlFromIfsc() {
    this.isPSBCustomer = false;
    if (this.outsideBankForm.value.ifsc.length != 11) {
      this.bankAddress = ''
      return;
    }

    this.outsideBankForm.patchValue({
      ifsc: this.outsideBankForm.value.ifsc.toUpperCase()
    })

    if (
      this.outsideBankForm.value.ifsc.length == 11 &&
      this.outsideBankForm.value.ifsc.slice(0, 4).toLowerCase() == 'psib'
    ) {
      this.isPSBCustomer = true;
      return;
    }

    var param = this.addPayeeService.getBranchFromIFSC(
      this.outsideBankForm.value.ifsc
    );
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_GETIMPSMASTERBYIFSC
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          if (data.hasOwnProperty('set')) {
            this.bankAddress = data.set.records[0].bank + "," + data.set.records[0].city + "," + data.set.records[0].cust_address;
            this.bankDtl = data.set.records[0];
          }
          // this.outsideBankForm.patchValue({ifsc: ifsc_code});
        } else {
          this.outsideBankForm.patchValue({
            ifsc: ''
          })
          this.bankAddress = ''
        }
      });
  }

  /**
   * set update currency value
   * @param value
   */
  formatCurrency(value) {
    let amt = this.customCurrencyPipe
      .transform(value, 'decimal')
      .replace(/[^.0-9]+/g, '');
    switch (this.paymentType) {
      case 'within':
        this.formValidation.formatTransLimit(value, this.withinBankForm);
        break;
      case 'outside':
        this.formValidation.formatTransLimit(value, this.outsideBankForm);
        break;
      case 'mmid':
        this.formValidation.formatTransLimit(value, this.mmidForm);
        break;
      case 'vpa':
        this.formValidation.formatTransLimit(value, this.vpaForm);
        break;
    }
  }

  onConfirmAccountChange(number, from) {

    if(this.withinBankForm.hasError("accountNotMatch")){
      return;
    }

    if (number.length == 14) {

      var param;
      switch (from) {
        case "within":
          param = this.addPayeeService.validatePayee(this.withinBankForm.value);
          break;
        case "outside":
          param = this.addPayeeService.validatePayee(this.outsideBankForm.value);
          break;
      }

      this.http
        .callBankingAPIService(
          param,
          this.storage.getLocalStorage(this.constant.storage_deviceId),
          this.constant.serviceName_ACCOUNTNAME
        )
        .subscribe((data) => {
          console.log(data);
          var resp = data.responseParameter;
          if (resp.opstatus == '00') {
            switch (from) {
              case "within":
                this.withinBankForm.patchValue({
                  payeeName: data.set.records[0].accountName
                })
                break;
              case "outside":
                // this.outsideBankForm.patchValue({
                //   payeeName : data.set.records[0].accountName
                // })
                break;
            }
            this.invalidAccount = false;
          } else {
            this.invalidAccount = true;
            this.errorCallBack(data.subActionId, resp);
          }
        });

      // this.accountindex = this.accountList.findIndex(x => x.accountNo == number);
      // this.payeeIndex = this.payeeList.findIndex(x => x.beneficiary_account_no == number);
      // if(this.accountindex == -1 && this.payeeIndex == -1){
      //   this.invalidAccount = false;
      // }else{
      //   this.invalidAccount = true;
      // }

    }
  }


  /**
   * Get Default Vpa Adress/Account Details
   */
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }


  /**
   * Get Default Vpa AccountNo Details
   * @param array
   */
  getDefaultAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isDefaultAccount == "Y" });
    }
  }
}
