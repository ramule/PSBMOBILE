import { ValidationErrors } from '@angular/forms';
import { Component, Input, NgZone, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { UpiDashboardService } from 'src/app/pages/upi/dashboard/upi-dashboard.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { payUpiRequestService } from 'src/app/pages/upi/pay/pay-upi/pay-upi-request.service';
import { OtherBankService } from '../../fund-transfer/other-bank/other-bank.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { InitiateSendMoneyService } from '../../fund-transfer/initiate-send-money/initiate-send-money.service';

import { Location } from '@angular/common';
import { MaskAccountNoPipe } from 'src/app/pipes/mask-account-no.pipe';
import { BhimUPIService } from '../bhim-upi-pay/bhim-upi-payment.service';

// import { PayUpiPaymentService } from 'src/app/pages/upi/pay/pay-upi-payment/pay-upi-payment.service';
declare var showToastMessage: any;
declare var $: any;
// declare var InitVPAUI: any;

@Component({
  selector: 'app-bhim-upi-pay',
  templateUrl: './bhim-upi-pay.component.html',
  styleUrls: ['./bhim-upi-pay.component.scss']
})
export class BhimUpiPayComponent implements OnInit, OnDestroy {
  isWeb = false;
  isAmountLimitExceeded = false;
  vpaDetails: any;
  vpaIndex = 0;
  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,
    private upiDashboardService: UpiDashboardService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private payUpiRequestService: payUpiRequestService,
    private otherBankService: OtherBankService,
    private location: Location,
    private formValidation: FormValidationService,
    private initiateSendMoneyService: InitiateSendMoneyService,
    private maskAccountNo: MaskAccountNoPipe,
    private bhimUPIService: BhimUPIService,
    private ngZone: NgZone
  ) { }
  @Input() type = "";
  query = " ";

  payeeList = []
  // payeeList = [
  //   { 'payeeName': 'Prasad Thakre', 'vpa': '9875214541@psb' },
  //   { 'payeeName': 'Mani Thakre', 'vpa': '9875215698@psb' },
  //   { 'payeeName': 'Manish Solanki', 'vpa': '98789215698@psb' },
  // ]
  selAccOfBenificiary = "";
  payeeType = "registered-payee";
  showUserInfo = false;
  registeredForm: FormGroup;
  nonRegisteredForm: FormGroup;
  accountForm: FormGroup;
  mmidForm: FormGroup;
  defaultVPAAccountDetails: any;
  vpaAddressList = [];
  tempVpaAddressList = [];
  callBackAllow = false;
  vpaBankPendingPayeeDetails: any = [];
  vpaBankPayeeDetailsList: any = [];
  ngOnInit(): void {
    // this.DataService.setPageSettings('BHIM UPI');
    this.isWeb = this.constant.getPlatform() == 'web';
    this.getBeneficiaryList();
    // InitVPAUI();
    this.fetchVPAAdressList();
    this.buildForm();
    if(this.DataService.fromInstaPay){
      this.payeeType = 'non-registered-payee'
    }
    this.verifyVPACallback();
  }

  verifyVPACallback() {
    this.DataService.updateVerifyVPAObservable.subscribe((payee: any) => {
      console.log("verifyVPACallback");
      if (payee && this.defaultVPAAccountDetails) {
        var req;
        this.DataService.isPayeeSelected = false;
        if (payee.txnMode == 'VPA') {
          this.nonRegisteredForm.get('upidMobileNumber').setValue(payee.beneVpa)
          req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, this.commonMethod.randomString(32, 'PSB'));
          this.ngZone.run(() => {
            this.UpiApiCall(req, true);
          })
        }
        // else if (payee.txnMode == 'ACCOUNT') {
        //   this.activeTabName = 'ACCOUNT';
        //   this.payeeAddr = payee.beneAccount + "@" + payee.beneIfsc + ".ifsc.npci";
        //   req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.payeeAddr }, this.defaultVPAAccountDetails, transactionID);
        // } else {

        // }
      }
    });
  }

  buildForm() {
    this.registeredForm = new FormGroup({
      registerPayee: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remark: new FormControl('', Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)),
    })

    this.nonRegisteredForm = new FormGroup({
      upidMobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)]),
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remark: new FormControl('', Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)),
    })

    this.accountForm = new FormGroup({
      accountNumber: new FormControl('', [Validators.required]),
      reAccountNumber: new FormControl('', [Validators.required]),
      selectBank: new FormControl('', [Validators.required]),
      ifscCode: new FormControl('', [Validators.required]),
      payeeName: new FormControl('', [Validators.required],),
    })

    this.mmidForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.min(1), Validators.minLength(10)]),
      mmid: new FormControl('', [Validators.required]),
      payeeName: new FormControl('', [Validators.required]),
    })
  }

  validateForm(value) {
    switch (value) {
      case 'account':
        if (this.accountForm.invalid) {
          this.accountForm.get('accountNumber').markAsTouched();
          this.accountForm.get('reAccountNumber').markAsTouched();
          this.accountForm.get('selectBank').markAsTouched();
          this.accountForm.get('ifscCode').markAsTouched();
          this.accountForm.get('payeeName').markAsTouched();
        }
        break;

      case 'mmid':
        if (this.mmidForm.invalid) {
          this.mmidForm.get('mobileNumber').markAsTouched();
          this.mmidForm.get('mmid').markAsTouched();
          this.mmidForm.get('payeeName').markAsTouched();
        }
        break;

    }
  }

  openSearchPayee(pageType, e) {
    if (e.stopPropagation) e.stopPropagation();
    switch (pageType) {
      case 'upid':
        $('#upid').slideToggle();
        $('#upid').parent().toggleClass('active')
        break;
      
      case 'vpaAddress':
        $('#vpa').slideToggle();
        $('#vpa').parent().toggleClass('active')
        break;
    }
  }


gotoAddPayee(code) {
    this.DataService.previousPageUrl = 'sendMoney';
    this.DataService.managePayeeToAddpayee = code;
    this.DataService.isEditPayee = false;
    this.DataService.vpainBankPayeeList  = [ ...this.vpaBankPayeeDetailsList , ...this.vpaBankPendingPayeeDetails ]
    this.router.navigate(['/addPayee']);
  }

  selectVPA(value) {
    $('#upid').slideToggle();
    $('#upid').parent().toggleClass('')
    this.selAccOfBenificiary = value.benefName + '-' + value.VPA;
    this.registeredForm.get('registerPayee').setValue(this.selAccOfBenificiary);
    if (value?.VPA) {
      this.nonRegisteredForm.get('upidMobileNumber').setValue(value.VPA)
      var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: value?.VPA }, this.defaultVPAAccountDetails, this.commonMethod.randomString(32, 'PSB'));
      this.UpiApiCall(req);
    }
  }

  nonRegisteredVerify() {
    // this.selAccOfBenificiary = 'test';
    this.verifyVPA()
  }

  typeSelection(value, reset?) {
    this.selAccOfBenificiary = '';
    this.payeeType = value;
    this.isAmountLimitExceeded = false;
    if (!reset) {
      this.showUserInfo = false;
      this.registeredForm.reset();
      this.nonRegisteredForm.reset();
    }
  }

  bhimPaySubmit(value) {
    switch (value) {
      case 'upid':

        break;

      case 'account':
        if (this.accountForm.valid) {
          console.log('Account form submitted')
        }
        else {
          this.validateForm(value)
        }
        break;

      case 'mmid':
        if (this.mmidForm.valid) {
          console.log('MMID form submitted')
        }
        else {
          this.validateForm(value)
        }
        break;
    }
  }


  /**
 * Fetch VPA Address List
 */
  fetchVPAAdressList() {
    if(this.DataService.vpaAddressList.length == 0){
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      let deviceId = this.storage.getLocalStorage(this.constant.storage_deviceId)
      this.fetchVPAListAPICall(param, deviceId, false)
    }else{
      this.setVPADetails(this.DataService.vpaAddressList);
    }
  }

  fetchVPAListAPICall(request, deviceId, notificationSync) {

    this.http.callBankingAPIService(request, deviceId, this.constant.upiserviceName_PROCESSUPISERVICESESSION, true, { notificationSync: notificationSync }).subscribe(data => {
      let response = data.responseParameter.upiResponse;
      console.log('1 => response', response);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS => ", response);
            var vpaAddressLists = this.DataService.processVPAlist(response.responseParameter.addresslist);
            this.setVPADetails(vpaAddressLists);
            console.log(JSON.stringify("this.vpaAddressList" + this.vpaAddressList))
          default:
            console.log("default => ", response.subActionId);
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  setVPADetails(vpaAddressLists){
    let vpaAddressList = JSON.parse(JSON.stringify(vpaAddressLists));
    if (this.vpaAddressList.length == 0 && vpaAddressList.length > 0) {
      this.vpaAddressList = vpaAddressList.map((vpaAddress: any) => {
        vpaAddress.isSelected || vpaAddress.default == "Y" ? vpaAddress.isSelected = true : vpaAddress.isSelected = false;
        vpaAddress.accounts = vpaAddress.accounts.map((account: any) => {
          if (account.isSelected || account.isDefaultAccount == "Y") {
            account.isSelected = true;
            vpaAddress.defaultAccName = account?.custName  ? account.custName : 'NA'
          }
          else {
           account.isSelected = false;
          }
          return account;
        }).filter(function (item) { return item.ifsc.includes('PSIB') })
        if (vpaAddress.accounts.length > 0) {
          var isSelected = vpaAddress.accounts.some(accountDetails => accountDetails['isSelected'] === true)
          if (!isSelected) {
            vpaAddress.accounts[0].isSelected = true;
          }
        }

        // var defaultAcc = vpaAddress.accounts((item) => {
        //   return item.isSelected === true;
        // });
        // vpaAddress.defaultAccName = defaultAcc?.custName && defaultAcc?.custName.trim() ? defaultAcc.custName : 'NA';
        // vpaAddress.isPSBAccount = vpaAddress.accounts.every(v => v.isPSBAccount === true)
        return vpaAddress;
      });
      this.tempVpaAddressList = this.vpaAddressList;
    }
    this.defaultVPAAccountDetails = this.getSelectedVpaAccountDetails();
    // this.getSelectedAccount(0,0)
  }

  // selectVPAAccount(vpaIndex,accountIndex){
  //   this.vpaAddressList.
  // }

  getSelectedAccount(vpaIdx, accountIdx) {
    this.vpaIndex = vpaIdx;
    this.vpaAddressList.map((vpaAddress, vpaIndex) => {
      if (vpaIndex == vpaIdx) {
        vpaAddress.isSelected = true;
        vpaAddress.accounts.map((accDetails, accIndex) => {
          accIndex == accountIdx ? accDetails.isSelected = true : accDetails.isSelected = false;
          return accDetails;
        })
      } else {
        vpaAddress.isSelected = false;
        vpaAddress.accounts.map((accDetails) => {
          accDetails.isSelected = false;
          return accDetails;
        })
      }
      return vpaAddress;
    });
    this.defaultVPAAccountDetails = this.getSelectedVpaAccountDetails();

    // this.getSelectedVPA();
  }

  setSelectedAccount(accIdex) {
    this.vpaAddressList[this.vpaIndex].accounts.map((account, accIndex) => {
      if (accIndex == accIdex) {
        account.isSelected = true;
      } else {
        account.isSelected = false;
      }
    })
  }

  getSelectedVPA() {
    this.vpaDetails = this.vpaAddressList.filter((item) => {
      return item.isSelected;
    });
  }

  verifyVPA() {
    // var param = this.addPayeeService.checkUpiAddress(this.vpaForm.value.vpa);
    // this.checkAvailabilityApiCall(param);
    // this.verified = true
    if (this.nonRegisteredForm.value.upidMobileNumber && !this.nonRegisteredForm.controls['upidMobileNumber'].hasError('required') && !this.nonRegisteredForm.controls['upidMobileNumber'].hasError('pattern')) {
      let upiIdOrMobno = this.nonRegisteredForm.get('upidMobileNumber').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.payUpiRequestService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.nonRegisteredForm.value.upidMobileNumber }, this.defaultVPAAccountDetails, this.commonMethod.randomString(32, 'PSB'));
        this.UpiApiCall(req);
      }
    } else {
      this.nonRegisteredForm.markAllAsTouched();
    }

  }

  // /**
  //  * Get Default Vpa Adress/Account Details
  //  */
  //  getDefaultVpaAccountDetails() {
  //   let defaultVpaAccountArr = this.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
  //   if (defaultVpaAccountArr) {
  //     let accountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
  //     return {
  //       vpaDetails: defaultVpaAccountArr,
  //       accountDetails: accountDetails
  //     }
  //   }
  // }

  // /**
  //  * Get Default Vpa AccountNo Details
  //  * @param array
  //  */
  //  getDefaultAccountNoByVpa(array) {
  //   if (array.length > 0) {
  //     return array.find((account) => { return account.isDefaultAccount == "Y" });
  //   }
  // }


  /**
   * Get Selected Vpa Adress/Account Details
   */
  getSelectedVpaAccountDetails() {
    let defaultVpaAccountArr = this.vpaAddressList.find((vpaAddress) => { return vpaAddress.isSelected == true });
    if (defaultVpaAccountArr) {
      let accountDetails = this.getSelectedAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    }
  }

  /**
   * Get Selected Vpa AccountNo Details
   * @param array
   */
  getSelectedAccountNoByVpa(array) {
    if (array.length > 0) {
      return array.find((account) => { return account.isSelected == true });
    }
  }

  UpiApiCall(request, nonReg?) {
    this.http.callBankingAPIService(request, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log("API response => ", data);
      let response = data.responseParameter.upiResponse;
      console.log('UPI response => ');
      console.log(response.responseParameter);
      this.DataService.verifyOmniVPACallback('')
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            if (nonReg) {
              this.typeSelection('non-registered-payee', true)
            }
            this.showUserInfo = true;
            setTimeout(() => {
              $('#amt1').autoNumeric('init', { aSign: "₹ " });
              $('#amt2').autoNumeric('init', { aSign: "₹ " });
            })
            this.DataService.verifyAddressResp = response.responseParameter; // CODE , UPI ID ,
            this.DataService.validateAddressResp = response.responseParameter;
            // this.vpaForm.get('validatedVPA').setValue(response.responseParameter.MASKNAME)
            break;
          case this.constant.upiserviceName_GETDEFAULTVPA:
            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, this.commonMethod.randomString(32, 'PSB'));
            this.UpiApiCall(req);
            break;
          default:
            break;
        }
      } else {
        // Form Reset
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  proceed(type) {
    switch (type) {
      case 'vpa':
        this.validateVPAForm()
        break;
      default:
        break;
    }
  }

  validateVPAForm() {
    if (this.payeeType == 'non-registered-payee') {
      if (this.nonRegisteredForm.valid && !this.isAmountLimitExceeded) {
        this.payByVPA(this.nonRegisteredForm.value);
      } else {
        this.nonRegisteredForm.markAllAsTouched();
      }
    } else if (this.payeeType == 'registered-payee' && !this.isAmountLimitExceeded) {
      if (this.registeredForm.valid) {
        this.payByVPA(this.registeredForm.value);
      } else {
        this.registeredForm.markAllAsTouched();
      }
    }
  }

  payByVPA(formData) {
    this.DataService.authorizeHeader = "INITIATE SEND MONEY";
    this.DataService.screenType = 'fundTransfer';
    var selectedVpa = this.getSelectedVpaAccountDetails();
    // var selfReqParam = this.initiateSendMoneyService.getFundTransferParam(formData, { ID: '' }, selectedVpa.accountDetails.accNum, 'self', this.payeeAccountNo);
    // this.DataService.request = selfReqParam;
    // this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION;
    this.DataService.transactionReceiptObj.payeeAddr = this.DataService.validateAddressResp.validatedVpa;
    this.DataService.transactionReceiptObj.payerAddr = selectedVpa.vpaDetails.paymentAddress;
    this.DataService.transactionReceiptObj.to_acc = undefined;
    this.DataService.transactionReceiptObj.type = 'vpa';
    this.DataService.transactionReceiptObj.from_acc = undefined;
    let transId = this.commonMethod.randomString(32, 'PSB');
    // this.DataService.transactionReceiptObj.to_acc = this.maskAccountNo.transform(this.payeeAccountNo);
    this.DataService.transactionReceiptObj.payee_name = this.DataService.validateAddressResp.MASKNAME;
    this.DataService.transactionReceiptObj.amount = formData.amount;
    this.DataService.transactionReceiptObj.remarks = formData.remark;
    this.DataService.transactionReceiptObj.date = new Date();
    this.DataService.upiPayRequest.remarks = formData.remark;
    this.DataService.upiPayRequest.amount = formData.amount;
    this.DataService.transactionReceiptObj.trans_Id = transId;
    this.DataService.receipdRefID = transId;
    this.DataService.request = this.bhimUPIService.setPaymentRequest(selectedVpa, { payeeName: this.DataService.validateAddressResp.MASKNAME, payeeUpiAddress: this.DataService.validateAddressResp.validatedVpa, payeeActNo: this.DataService.verifyAddressResp.actNo ? this.DataService.verifyAddressResp.actNo : '', payeeIfsc: this.DataService.verifyAddressResp.IFSC, payMode: this.constant.val_upi_PAYMENTADDRESS, }, { transactionId: transId });
    this.DataService.endPoint = this.constant.upiserviceName_PROCESSUPISERVICESESSION;
    if(this.DataService.fromInstaPay){
      this.DataService.otpSessionPreviousPage = "/instantPay";
    }else{
      this.DataService.otpSessionPreviousPage = "/fundTransfer";
    }
    this.router.navigateByUrl('/tpin');
  }


  //Collecting data for all beneficiary of different types mode
  getBeneficiaryListData(payeeDetailsListData) {
    this.payeeList = [];

    for (let i = 0; i < payeeDetailsListData.length; i++) {

      if (
        payeeDetailsListData[i]['statusId'] == '3' &&
        payeeDetailsListData[i]['VPA'] != 'null'
      ) {
        this.payeeList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }

       //Vpa Bank
      if (
        payeeDetailsListData[i]['statusId'] == '8' &&
        payeeDetailsListData[i]['VPA'] != 'null'
      ) {
        this.vpaBankPayeeDetailsList[i] = payeeDetailsListData[i]; //success payee list data Object.assign({}, ...this.payeeDetailsListData[i]);
      }
    }

    this.payeeList = this.payeeList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );

    
    this.vpaBankPayeeDetailsList = this.vpaBankPayeeDetailsList.filter(
      (obj) =>
        !(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
    );



  }


  /**
   * This function is invoked to get benificiary List
   */
  getBeneficiaryList() {
    var param = this.otherBankService.benificiaryListParam();
    this.http
      .callBankingAPIService(
        param,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_BENIFICIARYLIST
      )
      .subscribe((data) => {
        console.log(data);

        let payeeDetailsListData = data.set['records'];
        console.log('Temp Manage beneficiary Data :: ', payeeDetailsListData);

        this.DataService.beneficiaryList.payeeAccNumber =
          payeeDetailsListData.ID;

        // Payee List Data Collection
        this.getBeneficiaryListData(payeeDetailsListData);

        var resp = data.responseParameter;
        // this.ownBenificiaryList =[];

        // console.log("own",this.ownBenificiaryList)

        // this.otherBenificiaryList= [];

        // console.log("otherBenificiaryList",this.otherBenificiaryList)
        // this.internationalBenificiaryList=[];

        // console.log("internationalBenificiaryList",this.internationalBenificiaryList)
        if (resp.opstatus == '00') {

        } else {
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
    if (resp.opstatus == '02' || resp.opstatus == '01') {
      //showToastMessage(resp.Result, 'error');
    }
  }

  cancel() {
    if (this.constant.getIsCordova() == "web") {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/dashboardMobile']);
    }
  }

  /**
   * set update currency value
   * @param value
   */
  formatCurrency() {
    if (this.payeeType == 'registered-payee') {
      this.formValidation.formatDynamicCurrency('amt2', this.registeredForm);
    } else {
      this.formValidation.formatDynamicCurrency('amt1', this.nonRegisteredForm);
    }
  }


  goToSendMoneyPayee(payee) {
    // this.paymentType = "vpa"
    this.payeeType = 'non-registered-payee';
    this.selAccOfBenificiary = payee.beneVpa;
    this.nonRegisteredForm.patchValue({ upidMobileNumber: payee.beneVpa })
    var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.nonRegisteredForm.value.upidMobileNumber }, this.defaultVPAAccountDetails, this.commonMethod.randomString(32, 'PSB'));
    this.UpiApiCall(req);
    // var bankName = payee?.beneficiary_bank_name != undefined ? payee?.beneficiary_bank_name : "-";
    // this.selBankOfBenificiary = ""+bankName+","+payee?.ifsc_code;
    // this.payeeAccountNo = payee.VPA;
    // this.upiIdForm.patchValue({sendTo:this.selAccOfBenificiary})
  }

  ngOnDestroy() {
    this.DataService.isUPIInstantPay = false;
    this.DataService.isPayeeSelected = false;
    // this.DataService.updateVerifyVPABehaviourSource.complete();
  }


  checkLimit(value) {
    if (this.DataService.isUPIInstantPay) {
      if (/^0*$/.test(value)) {
        this.registeredForm.get('amount').reset();
        this.nonRegisteredForm.get('amount').reset();
      } else {
        this.formatCurrency()
        let amt = value.toString().replace(/[^.0-9]+/g, '');
        if (Number(amt) > 10000) {
          this.isAmountLimitExceeded = true;
          this.registeredForm.get('amount').markAllAsTouched();
          this.nonRegisteredForm.get('amount').markAllAsTouched();
          return;
        } else {
          this.formatCurrency()
          this.isAmountLimitExceeded = false;
        }
      }
    } else {
      this.formatCurrency()
    }
  }

  clickedOut(event) {
      $('#vpa').slideUp();
      $('#vpa').parent().removeClass('active');
  }

  stopsearchUpiId(event){
    event.stopPropagation();
  }

  searchUpiId(event){
    if (event.target.value != '') {
      
      let vpaAddressList = this.vpaAddressList;
      let filterArray = vpaAddressList.filter((objs) => objs.paymentAddress.toLowerCase().includes(event.target.value.toLowerCase()));

      this.tempVpaAddressList = [];
      this.tempVpaAddressList = filterArray;

    } else {
      this.tempVpaAddressList = [];
      this.tempVpaAddressList = this.vpaAddressList;
    }
  }

  
}
