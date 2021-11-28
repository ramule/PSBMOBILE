import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { payUpiRequestService } from './pay-upi-request.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { FormValidationService } from 'src/app/services/form-validation.service'
import { PluginService } from '../../../../services/plugin-service';
import { Location } from '@angular/common';
import { BenificiaryService } from '../../benificiary/benificiary.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
declare var createGlobalNavMore: any;
declare var showToastMessage: any;
declare var networkinterface: any;
declare var $: any;

@Component({
  selector: 'app-pay-upi',
  templateUrl: './pay-upi.component.html',
  styleUrls: ['./pay-upi.component.scss']
})
export class PayUpiComponent implements OnInit, OnDestroy {
  showFavPayeeLength = 10;
  showRecentPayeeLength = 10;
  mobileContacts = [];
  recColReqList: any[];
  favList: any[];
  bankList: any[];
  recentPayeeReqList = [];
  favPayeeList = [];
  showMoreRecentRequest = false;
  payRecentReqForm: FormGroup;
  payBankActForm: FormGroup;
  mmidForm: FormGroup;
  showUserInfo = false;
  firstLastChar = "";
  showMoreFav = false;
  defaultVPAAccountDetails: any;
  actAndIfscPay: any = {};
  mmidPay: any = {};
  bankDtls: any;
  popupData: any = {};
  payeeAddr: any;
  bankPayeeNameExists: boolean = false;
  isBranchVerified: boolean = false;
  activeTabName: string = "VPA";
  payeeDisabled: boolean = false;
  favRecntFlag: boolean = false;
  showVerifyButton: boolean = true;
  favRecntValue: any = {};
  transferActList: any = [];
  vpaActList: any = [];
  vpaDistinctActList: any = [];
  selfTransferActList: any = [];
  depositActList: any = [];
  transferAct: any;
  depositAct: any;
  proceedEnable = true;
  mbebaFlag: any;
  payerAccountDetails: any;
  searchUPIId: any;
  benficiaryListData: any;
  bankIfsCode: any;
  payeeCode :any;
  defaultTab = 'upi';
  bankName: any;
  bankIin: any;
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'PAY',
    'footertype': 'none'
  }

  constructor(public DataService: DataService,
    private router: Router,
    private payUpiRequestService: payUpiRequestService,
    private http: HttpRestApiService,
    private localStorage: LocalStorageService,
    private constant: AppConstants,
    private formValidation: FormValidationService,
    private pluginService: PluginService,
    private location: Location,
    private benificiaryService: BenificiaryService,
    public commonMethod: CommonMethods,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    if (this.DataService.isSelfTransfer) { this.defaultTab = 'self'; this.DataService.isSelfTransfer = false; }
    this.DataService.payFetchContacts = false;
    this.DataService.changeMessage(this.headerdata);
    // this.DataService.vpaAddressList = this.DataService.processVPAlist([
    //   { "paymentAddress": "kanishjugdar@psb", "default": "Y", "limit": "50000", "accounts": [{ "mbeba": "Y", "isDefaultAccount": "Y", "credDLength": "6", "bankName": "MYPSP", "mcc": "0000", "credDType": "NUM", "atmDType": "NUM", "lastBalanceUpdate": "23-04-2021 01:51:32", "credSubType": "MPIN", "atmCredSubType": "ATMPIN", "ifsc": "AABC0876543", "accType": "SAVINGS", "otpCredSubType": "SMS", "atmDLength": "6", "accNum": "857679479890127", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": "PIN", "active": "Y", "otpCredType": "OTP", "defaultAccount": "true", "custName": "ABC", "balanceAmount": "405.25", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM", "maskedAccountNumber": "XXXXXXXXXXX0127", "showBalance": false, "maskedBalance": " XXX.XX", "isUpiGlobalActive": "N", "debitFreezeStatus": "N" }, { "mbeba": "Y", "isDefaultAccount": "N", "credDLength": "6", "bankName": "Mypsp2", "mcc": "0000", "credDType": "NUM", "atmDType": null, "lastBalanceUpdate": "22-04-2021 03:19:12", "credSubType": "MPIN", "atmCredSubType": null, "ifsc": "AABF0009009", "accType": "SAVINGS", "otpCredSubType": "SMS", "atmDLength": null, "accNum": "857679479890125", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": null, "active": "Y", "otpCredType": "OTP", "custName": "ABC", "balanceAmount": "405.25", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM", "maskedAccountNumber": "XXXXXXXXXXX0125", "showBalance": false, "maskedBalance": " XXX.XX", "isUpiGlobalActive": "N", "debitFreezeStatus": "N" }], "frequency": null },
    //   { "paymentAddress": "8591192297@psb", "default": "N", "limit": "50000", "accounts": [{ "mbeba": "N", "isDefaultAccount": "Y", "credDLength": "6", "bankName": "Mypsp2", "mcc": "0000", "credDType": "NUM", "atmDType": null, "lastBalanceUpdate": "NA", "credSubType": "MPIN", "atmCredSubType": null, "ifsc": "AABF0009009", "accType": "SAVINGS", "otpCredSubType": "SMS", "atmDLength": null, "accNum": "857679479890125", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": null, "active": "Y", "otpCredType": "OTP", "defaultAccount": "true", "custName": "ABC", "balanceAmount": "NA", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM", "maskedAccountNumber": "XXXXXXXXXXX0125", "showBalance": false, "maskedBalance": " XXX", "isUpiGlobalActive": "N", "debitFreezeStatus": "N" }, { "mbeba": "Y", "isDefaultAccount": "N", "credDLength": "6", "bankName": "MYPSP", "mcc": "0000", "credDType": "NUM", "atmDType": "NUM", "lastBalanceUpdate": "23-04-2021 01:51:32", "credSubType": "MPIN", "atmCredSubType": "ATMPIN", "ifsc": "AABC0876543", "accType": "SAVINGS", "otpCredSubType": "OTP", "atmDLength": "6", "accNum": "857679479890127", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": "PIN", "active": "Y", "otpCredType": "SMS", "custName": "ABC", "balanceAmount": "405.25", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM", "maskedAccountNumber": "XXXXXXXXXXX0127", "showBalance": false, "maskedBalance": " XXX.XX", "isUpiGlobalActive": "N", "debitFreezeStatus": "N" }], "frequency": null }
    // ]);
    // this.DataService.vpaAddressList = this.DataService.processVPAlist([
    //   { "paymentAddress": "kanishjugdar@psb", "default": "Y", "limit": "50000", "accounts": [{ "mbeba": "Y", "isDefaultAccount": "Y", "credDLength": "6", "bankName": "Mypsp2", "mcc": "0000", "credDType": "NUM", "atmDType": null, "lastBalanceUpdate": "22-04-2021 03:19:12", "credSubType": "MPIN", "atmCredSubType": null, "ifsc": "AABF0009009", "accType": "SAVINGS", "otpCredSubType": "SMS", "atmDLength": null, "accNum": "857679479890125", "addressType": "ACCOUNT", "isValid": "Y", "atmCredType": null, "active": "Y", "otpCredType": "OTP", "custName": "ABC", "balanceAmount": "405.25", "otpCredDLength": "6", "credType": "PIN", "otpCredDType": "NUM", "maskedAccountNumber": "XXXXXXXXXXX0125", "showBalance": false, "maskedBalance": " XXX.XX", "isUpiGlobalActive": "N", "debitFreezeStatus": "N" }], "frequency": null },
    // ])

    this.defaultVPAAccountDetails = this.getDefaultVpaAccountDetails();
    console.log("this.defaultVPAAccountDetails", this.defaultVPAAccountDetails)
    this.DataService.upiSearchCollectPayeeList = [];
    this.validateAddressByVPAorMobNo();
    createGlobalNavMore();
    this.buildForm();

  }

  ngAfterViewInit() {
    // this.validateAddressByVPAorMobNo();
    if (this.DataService.bankDetails || this.DataService.accountIFscDetails || this.DataService.previousPageUrl == 'payBankList') {
      $("#account").tab('show');
      $("#accountHeader").tab('show');
      if (this.DataService.accountIFscDetails) {
        this.filterRecFavList('ACCOUNT');
        this.validatePayee('', this.DataService.accountIFscDetails);
      } else if (this.DataService.bankDetails) {
        this.payBankActForm.get('bankIin').setValue(this.DataService.bankDetails ? this.DataService.bankDetails.iin : '');
        this.bankName = this.DataService.bankDetails ? this.DataService.bankDetails.bankName : '';
        this.bankIin = this.DataService.bankDetails ? this.DataService.bankDetails.iin : '';
      } else {

      }
    }
    if (this.DataService.previousPageUrl == 'manageAccounts' || this.DataService.previousPageUrl == 'selfTransferPayment' || this.DataService.previousPageUrl == 'createUpi') {
      history.pushState({}, this.DataService.previousPageUrl == 'manageAccounts' ? this.DataService.previousPageUrl : 'upiDashboard', this.location.prepareExternalUrl(this.DataService.previousPageUrl == 'manageAccounts' ? this.DataService.previousPageUrl : 'upiDashboard'));
      history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
      this.activeTabName = 'SELF_TRANSFER'; // parameter to passs in resetForm function
      this.getBenificiaryList();
      $("#selft").tab('show');
      $("#selftHeader").tab('show');
      this.upiAccountList();
    } else if (this.DataService.previousPageUrl == 'payUpiPayment') {
      history.pushState({}, "upiDashboard", this.location.prepareExternalUrl("upiDashboard"));
      history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
      if (this.DataService.verifyAddressResp.payType == "BNK_ACT") {
        $("#account").tab('show');
        $("#accountHeader").tab('show');
        this.payBankActForm.get('acctNum').setValue(this.DataService.verifyAddressResp.acctNum);
        this.payBankActForm.get('reActNum').setValue(this.DataService.verifyAddressResp.reActNum);
        this.payBankActForm.get('bankIin').setValue(this.DataService.verifyAddressResp.bankIin);
        this.payBankActForm.get('bankIfsc').setValue(this.DataService.verifyAddressResp.bankIfsc.substring(4));
        this.payBankActForm.get('bankPayeeName').setValue(this.DataService.verifyAddressResp.bankPayeeName);
        this.activeTabName = 'ACCOUNT';
        // this.getBenificiaryRequest();
        this.getBankListRequest();
      } else if (this.DataService.verifyAddressResp.payType == "MMID") {
        this.mmidForm.get('mobileNumber').setValue(this.DataService.verifyAddressResp.mobileNumber);
        this.mmidForm.get('enterMmid').setValue(this.DataService.verifyAddressResp.enterMmid);
        this.mmidForm.get('mmidPayeeName').setValue(this.DataService.verifyAddressResp.mmidPayeeName);
        this.activeTabName = 'MMID';
      } else {
        this.payRecentReqForm.get('upiIdOrMobNo').setValue(this.DataService.verifyAddressResp.validatedVpa);
        this.activeTabName = 'VPA';
      }
      this.filterRecFavList(this.activeTabName);
    } else {
      history.pushState({}, "upiDashboard", this.location.prepareExternalUrl("upiDashboard"));
      history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
      this.activeTabName = 'VPA';// parameter to passs in resetForm function
      if (this.DataService.accountIFscDetails || this.DataService.bankDetails) {
        this.activeTabName = 'ACCOUNT';
      }
      this.getBenificiaryList();
    }
    this.DataService.contactPrevURL = this.router.url;
  }

  buildForm() {
    this.payRecentReqForm = new FormGroup({
      upiIdOrMobNo: new FormControl('', [Validators.required, Validators.pattern(/^(\d{10}|\w+[\w.-]+@[\w.-]+$)$/)])
    });
    if (this.DataService.platform.toLowerCase() == this.constant.val_android) {
      this.payBankActForm = new FormGroup({
        acctNum: new FormControl('', [Validators.required, Validators.pattern(/^\d{5,30}/)]),
        reActNum: new FormControl('', [Validators.required, Validators.pattern(/^\d{5,30}/)]),
        bankIin: new FormControl({ value: '', disabled: true }, [Validators.required]),
        bankIfsc: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9]{7}$/)]),
        bankPayeeName: new FormControl('')
      });
    } else {
      this.payBankActForm = new FormGroup({
        acctNum: new FormControl('', [Validators.required, Validators.pattern(/^\d{5,30}/)]),
        reActNum: new FormControl('', [Validators.required, Validators.pattern(/^\d{5,30}/)]),
        bankIin: new FormControl({ value: '' }, [Validators.required]),
        bankIfsc: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9]{7}$/)]),
        bankPayeeName: new FormControl('')
      });
    }

    this.mmidForm = new FormGroup({
      mobileNumber: new FormControl('', [Validators.required]),
      enterMmid: new FormControl('', [Validators.required]),
      mmidPayeeName: new FormControl('', [Validators.required])
    })
  };

  // To get bank list for Account payment
  getBankListRequest() {
    var req = this.payUpiRequestService.getBankListRequest();
    this.UpiApiCall(req);
  }

  /**
   * Get Favorite Payee List
   */
  getFavPayReq() {
    var req = this.payUpiRequestService.getFavoritePayeeRequest();
    this.UpiApiCall(req);
  }

  /**
   * Get Recent Collect Request List
   */
  /**
    * Get Recent & Favorite Collect Request List
    */
  getBenificiaryList() {
    this.benificiaryService.getBenificiaryList().then((response: any) => {
      this.DataService.benficiaryListData = response.recentBeneList;
      this.recentPayeeReqList = [];
      this.favPayeeList = [];
      response.recentBeneList.map((benificiary, index) => {
        if (benificiary.txnMode == this.activeTabName) {
          this.recentPayeeReqList.push(benificiary);
        }
      });
      this.favPayeeList = this.DataService.favPayeeList;
      if (this.recentPayeeReqList.length > 10) {
        this.showMoreRecentRequest = true;
      }
      if (this.favPayeeList.length > 10) {
        this.showMoreFav = true;
      }
      this.resetForm(this.activeTabName);
    });
  }


  searchContact(type) {
    if (type == 'recent') {
      this.DataService.upiSearchCollectPayeeList = this.recentPayeeReqList;
    } else {
      this.DataService.upiSearchCollectPayeeList = this.favPayeeList;
    }
    this.DataService.upiCollectsearchType = type;
    this.router.navigateByUrl('/collectSearchContact')
  }

  showMore(type) {
    if (type == 'recent') {
      this.showRecentPayeeLength = this.recentPayeeReqList.length;
    } else {
      this.showFavPayeeLength = this.favPayeeList.length;
    }
  }

  compActNo() {
    this.showVerifyButton = true;
    if ((this.payBankActForm.value.acctNum && this.payBankActForm.value.reActNum) && (this.payBankActForm.value.acctNum != this.payBankActForm.value.reActNum)) {
      showToastMessage("Account number and re-enter account number doesn’t match. Please enter re-enter account number.", "error");
      // this.payBankActForm.reset({acctNum: ''});
      // this.payBankActForm.reset({reActNum: ''});
      this.payBankActForm.patchValue({
        acctNum: '',
        reActNum: ''
      });
      return;
    } else {
      this.DataService.verifyAddressResp = this.payBankActForm.value;
      this.DataService.verifyAddressResp.payType = 'BNK_ACT';
      this.DataService.verifyAddressResp.bankName = this.bankDtls ? this.bankDtls.bankName : '';
      if (this.payBankActForm.value.bankIfsc) {
        this.DataService.verifyAddressResp.bankIfsc = this.bankIfsCode + this.payBankActForm.value.bankIfsc;
      }
    }
  }

  onBankSel(bankiin) {
    this.showVerifyButton = this.favRecntFlag ? false : true;
    this.bankList = this.DataService.bankList;
    this.actAndIfscPay.bankIin = bankiin;
    this.bankDtls = this.DataService.bankList.find((bank) => { return bankiin == bank.iin });
    this.actAndIfscPay.selectedBankName = this.bankDtls.bankName;
    this.bankName = this.bankDtls ? this.bankDtls.bankName : '';
    this.bankIin = bankiin;
    this.bankIfsCode = this.bankDtls.ifsc.substring(0, 4);
    this.payBankActForm.patchValue({ bankIin: bankiin, acctNum: this.favRecntFlag ? this.favRecntValue.beneAccount : this.DataService.verifyAddressResp.acctNum ? this.DataService.verifyAddressResp.acctNum : this.DataService.bankDetails.acctNum , reActNum: this.favRecntFlag ? this.favRecntValue.beneAccount : this.DataService.verifyAddressResp.reActNum ? this.DataService.verifyAddressResp.reActNum : this.DataService.bankDetails.reActNum, bankIfsc: this.favRecntFlag ? this.favRecntValue.beneIfsc.substring(4) : (this.DataService.verifyAddressResp?.bankIfsc ? this.DataService.verifyAddressResp.bankIfsc.substring(4) : this.DataService.bankDetails.bankIfsc), bankPayeeName: this.favRecntFlag ? this.favRecntValue.beneName : this.DataService.verifyAddressResp.bankPayeeName ? this.DataService.verifyAddressResp.bankPayeeName : this.DataService.bankDetails.bankPayeeName });
    this.activeTabName = 'ACCOUNT';

    // this.payBankActForm.patchValue({
    //   bankIfsc: this.bankDtls.ifsc
    // });
  }

  // to fetch recent pay request and favorite pay details
  getRecPayReq() {
    var reqParms = this.payUpiRequestService.getPayRecentRequest();
    this.http.callBankingAPIService(reqParms, this.localStorage.getLocalStorage(this.constant.key_deviceId), '').subscribe(data => {
      console.log(data);

    })
  }

  /**
 * Api call to Validate Upi Id using mobile number
 */
  validateAddressByVPAorMobNo() {
    if (this.DataService.upiPayRequest.mobileNo) {
      var reqParams = this.payUpiRequestService.setDefaultVPARequest(this.DataService.upiPayRequest.mobileNo);
      this.UpiApiCall(reqParams);
    }
    if (this.DataService.upiPayRequest.validatedVpaAdress) {
      this.pluginService.getTransactionId().subscribe((transactionID) => {
        // this.payUpiRequestService.getUserLocation();
        var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.DataService.upiPayRequest.validatedVpaAdress }, this.defaultVPAAccountDetails, transactionID);
        this.UpiApiCall(req);
      });
    }
  }

  /**
   * This function is check if the user is valid vpa
   * @param payee
   */
  validatePayee(type, payee) {
    this.favRecntFlag = true;
    this.favRecntValue = payee;
    this.showVerifyButton = false;
    var req;
    this.pluginService.getTransactionId().subscribe((transactionID) => {
      // this.payUpiRequestService.getUserLocation();
      if (payee.txnMode == 'VPA') {
        this.activeTabName = 'VPA';
        req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: payee.beneVpa }, this.defaultVPAAccountDetails, transactionID);
      } else if (payee.txnMode == 'ACCOUNT') {
        this.activeTabName = 'ACCOUNT';
        this.payeeAddr = payee.beneAccount + "@" + payee.beneIfsc + ".ifsc.npci";
        req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.payeeAddr }, this.defaultVPAAccountDetails, transactionID);
      } else {

      }
      this.UpiApiCall(req);
    });
  }

  /**
  * To check if User bank account and ifsc is valid
  */
  onVerifyClick(type) {
    this.formValidation.markFormGroupTouched(this.payRecentReqForm);
    this.payeeAddr = (type == 'UPI_ID') ? this.payRecentReqForm.value.upiIdOrMobNo : this.payBankActForm.value.acctNum + "@" + this.bankIfsCode + this.payBankActForm.value.bankIfsc + ".ifsc.npci";
    console.log("this.payRecentReqForm => ", this.payRecentReqForm);
    if (this.payRecentReqForm.valid || this.payBankActForm.value) {
      let upiIdOrMobno = this.payRecentReqForm.get('upiIdOrMobNo').value;
      if (/^\d{10}$/.test(upiIdOrMobno)) {
        var reqParams = this.payUpiRequestService.setDefaultVPARequest(upiIdOrMobno);
        this.UpiApiCall(reqParams);
      } else {
        this.pluginService.getTransactionId().subscribe((transactionID) => {
          console.log('1 => transactionID', transactionID);
          // this.payUpiRequestService.getUserLocation();
          var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: this.payeeAddr }, this.defaultVPAAccountDetails, transactionID);
          console.log("Calling API");
          this.UpiApiCall(req);
        });
      }
    }
  }

  upiAccountList() {
    this.vpaDistinctActList = [];
    this.vpaActList = [];
    this.selfTransferActList = [];
    var uniqueAccNum = [];
    var uniqueIfsc = [];
    let vpaSelfTransAddressList = this.DataService.vpaAddressList
    vpaSelfTransAddressList.forEach((vpaActDetails, index) => {
      var vpaAddress = vpaActDetails.paymentAddress;
      // vpaDetails.accounts.push(vpaAddress);
      this.getAccount(vpaActDetails.accounts, vpaAddress);
    });
    for (let i = 0; i < this.vpaActList.length; i++) {
      if ((uniqueAccNum.indexOf(this.vpaActList[i].accNum) === -1)) {
        uniqueAccNum.push(this.vpaActList[i].accNum);
        if (uniqueIfsc.indexOf(this.vpaActList[i].ifsc) === -1) uniqueIfsc.push(this.vpaActList[i].ifsc);
        this.selfTransferActList.push(this.vpaActList[i])
      }
    }
    if (this.selfTransferActList.length > 0) {
      this.DataService.selfTransferActList = this.selfTransferActList;
      console.log("selfTransferActList", this.selfTransferActList);
      console.log("uniqueAccNum", uniqueAccNum);
      console.log("uniqueIfsc", uniqueIfsc);
      this.asignTransferDepositAct();
    } else {
      // this.payerAccountDetails = this.selfTransferActList[0];
      // this.showPopup('selfTransferAlert')
    }
  }

  getAccount(accountList, vpaAddress) {
    accountList.forEach(account => {
      account["paymentAddress"] = vpaAddress;
      this.vpaActList.push(account);
    });
  }

  asignTransferDepositAct() {
    this.depositActList = [];
    this.transferActList = [];
    this.DataService.selfTransferActList.forEach((account, index) => {
      if (index == 0) {
        account.isSelected = true;
      } else {
        account.isSelected = false;
        this.depositActList.push(account);
      }
      this.transferActList.push(account);
    });
    this.getAccountSelected('TRNS', 0);
  }

  getAccountSelected(type, index) {
    if (type == 'TRNS') {
      this.transferAct = {};
      this.depositActList = [];
      this.proceedEnable = true;
      this.transferActList.forEach((trnAccount, trnsInd) => {
        if (index == trnsInd) {
          trnAccount.isSelected = true;
          trnAccount.isDeposit = false;
          this.transferAct = trnAccount;
        }
        else {
          trnAccount.isSelected = false;
          trnAccount.isDeposit = false;
          this.depositActList.push(trnAccount);
        }
      });
    } else {
      this.depositAct = {};
      this.proceedEnable = false;
      this.depositActList.forEach((depAccount, depInd) => {
        if (index == depInd) {
          // depAccount.isSelected = true;
          depAccount.isDeposit = true;
          this.depositAct = depAccount;
        } else {
          // depAccount.isSelected = false;
          depAccount.isDeposit = false;
          // this.depositActList.push(depAccount)
        }
      });
    }
    // let depositAct :DepositAct = new DepositAct().deserialize(this.depositAct);
    // let transferAct :TransferAct = new TransferAct().deserialize(this.transferAct);
    this.mbebaFlag = this.transferAct.mbeba;
    this.DataService.selfTransferActList.depositAct = this.depositAct
    console.log("depositAct => ", this.DataService.selfTransferActList.depositAct);
    this.DataService.selfTransferActList.transferAct = this.transferAct
    console.log("tansferAct => ", this.DataService.selfTransferActList.transferAct);
  }

  getDepstActSelected(type, index) {
    if (type == 'DPST') {
      // this.depositActList = []
      this.depositActList.forEach((account, ind) => {
        if (index == ind) {
          account.isSelected = true;
          account.isDeposit = true;
          this.depositAct.push(account)
        } else {
          // account.isSelected = false;
          // account.isDeposit = true;
          // this.depositActList.push(account)
        }
      });

      // let depositActList:DepositAct = new DepositAct().deserialize(this.depositActList);
      // let transferActList:TransferAct = new TransferAct().deserialize(this.transferActList);
    }
    // else {
    //     this.depositActList.forEach((account, ind) => {
    //         if (index == ind) {
    //             account.isSelected = true;
    //         }
    //     });
    // }
  }

  proceed(payType) {
    if (payType == "BNK_ACT") {
      this.formValidation.markFormGroupTouched(this.payBankActForm);
      console.log(this.payBankActForm)
      if (this.payBankActForm.valid) {
        this.DataService.verifyAddressResp = this.payBankActForm.value;
        this.DataService.verifyAddressResp.payType = payType;
        this.DataService.verifyAddressResp.CODE = this.payeeCode;
        this.DataService.verifyAddressResp.bankName = this.bankDtls ? this.bankDtls.bankName : '';
        this.DataService.verifyAddressResp.bankIfsc = this.bankIfsCode + this.payBankActForm.value.bankIfsc;
        this.DataService.verifyAddressResp.bankIin = this.actAndIfscPay.bankIin;
        this.DataService.bankDetails = undefined;
        this.payRecentReqForm.reset();
        this.payBankActForm.reset();
        this.mmidForm.reset();
        this.router.navigateByUrl('/payUpiPayment');
      }
    } else if (payType == "MMID") {
      this.formValidation.markFormGroupTouched(this.mmidForm);
      console.log(this.mmidForm)
      if (this.mmidForm.valid) {
        this.DataService.verifyAddressResp = this.mmidForm.value;
        this.DataService.verifyAddressResp.payType = payType;
        this.payRecentReqForm.reset();
        this.payBankActForm.reset();
        this.mmidForm.reset();
        this.router.navigateByUrl('/payUpiPayment');
      }
    } else {
      this.DataService.verifyAddressResp.payType = payType;
      this.payRecentReqForm.reset();
      this.payBankActForm.reset();
      this.mmidForm.reset();
      this.router.navigateByUrl('/payUpiPayment');
    }
    this.DataService.resetUpiPayData();
  }

  UpiApiCall(request) {
    this.http.callBankingAPIService(request, this.localStorage.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log("API response => ", data);
      let response = data.responseParameter.upiResponse;
      console.log('UPI response => ');
      console.log(response.responseParameter);
      if (response.status == "00") {
        switch (response.subActionId) {
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.showUserInfo = true;
            console.log('this.showUserInfo', this.showUserInfo);
            this.DataService.verifyAddressResp = response.responseParameter;
            console.log('this.DataService.verifyAddressResp');
            console.log(this.DataService.verifyAddressResp);
            this.DataService.validateAddressResp = response.responseParameter;
            this.payeeCode = response.responseParameter.CODE;
            console.log("activeTabName => ", this.activeTabName);
            if (this.activeTabName == "VPA") {
              console.log("payRecentReqForm.value = ");
              console.log(this.payRecentReqForm.value);
              this.ngZone.run(() => {
                this.payRecentReqForm.get('upiIdOrMobNo').setValue(this.DataService.verifyAddressResp.validatedVpa);
              });
            } else if (this.activeTabName == "ACCOUNT") {
              // if(this.payBankActForm.value.acctNum) {
              this.bankPayeeNameExists = true;
              this.showVerifyButton = false;
              this.payeeDisabled = true;
              $("#account").tab('show');
              $("#accountHeader").tab('show');
              this.ngZone.run(() => {
                if (this.favRecntFlag || this.DataService.accountIFscDetails) {
                  this.favRecntFlag = true;
                  this.payBankActForm.get('acctNum').setValue(this.favRecntValue.beneAccount);
                  this.payBankActForm.get('reActNum').setValue(this.favRecntValue.beneAccount);
                  this.bankIfsCode = this.favRecntValue.beneIfsc.substring(0, 4)
                  this.payBankActForm.get('bankIfsc').setValue(this.favRecntValue.beneIfsc.substring(4));
                  this.payBankActForm.get('bankPayeeName').setValue(this.favRecntValue.beneName);
                  // this.payBankActForm.removeControl('bankIin');
                  this.onBankSel(this.DataService.verifyAddressResp.IIN);
                } else {
                  this.payBankActForm.get('bankPayeeName').setValue(this.DataService.verifyAddressResp.MASKNAME);
                }
              });
            } else {
              console.log("mmid form..");
              this.mmidForm.get('mmidPayeeName').setValue(this.DataService.verifyAddressResp.MASKNAME);
            }
            if (this.DataService.fromRecentTransaction) {
              this.proceed('UPI_ID');
            }
            break;
          case this.constant.upiserviceName_GETBANKDETAILLIST:
            this.bankList = response.responseParameter.BankList;
            this.DataService.bankList = this.bankList;
            if (this.DataService.verifyAddressResp.bankIin) this.onBankSel(this.DataService.verifyAddressResp.bankIin);
            break;
          case this.constant.upiserviceName_GETDEFAULTVPA:

            let vpaAddress = response.responseParameter.defaultVpaDetail.paymentAddress;
            this.payRecentReqForm.get("upiIdOrMobNo").setValue(vpaAddress);
            this.pluginService.getTransactionId().subscribe((transactionID) => {
              // this.payUpiRequestService.getUserLocation();
              var req = this.payUpiRequestService.setValidateRequest({ upiIdOrMobno: vpaAddress }, this.defaultVPAAccountDetails, transactionID);
              this.UpiApiCall(req);
            });
            break;

          case this.constant.upiserviceName_FETCHBANKNAME:
            console.log("Bank name ===>", response);
            this.isBranchVerified = true;
            break;
          case this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST:
            this.depositActList = [];
            this.transferActList = [];
            this.DataService.selfTransferActList = response.responseParameter.accountlist;
            if (this.DataService.selfTransferActList.length > 1) {
              this.DataService.selfTransferActList.forEach((account, index) => {
                if (index == 0) {
                  account.isSelected = true;
                } else {
                  account.isSelected = false;
                  this.depositActList.push(account);
                }
                this.transferActList.push(account);
              });
              this.getAccountSelected('TRNS', 0);
              break;
            } else {
              // this.showPopup('selfTransferAlert')
              break;
              // this.goToPage('payUpi');
            }
          default:
            break;
        }
      } else {
        switch (response.subActionId) {
          case this.constant.upiserviceName_GETDEFAULTVPA:
            // showToastMessage(response.msg, "error");
            break;
          case this.constant.upiserviceName_VALIDATEADDRESS:
            this.payeeDisabled = false;
            this.bankPayeeNameExists = false;
            this.showVerifyButton = true;
            this.payBankActForm.addControl('bankPayeeName', new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9]{30}$/)]));
            this.payBankActForm.updateValueAndValidity();
            break;
          case this.constant.upiserviceName_FETCHDISTINCTACCOUNTLIST:
            this.goToPage('payUpi');
            break;
          case this.constant.upiserviceName_GETBENIFICIARYLIST:
            // this.resetForm('VPA');
            break;
          default:
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  /**
   * Get Default Vpa Adress/Account Details
   */
  getDefaultVpaAccountDetails() {
    let defaultVpaAccountArr = this.DataService.vpaAddressList.find((vpaAddress) => { return vpaAddress.default == "Y" });
    if (defaultVpaAccountArr) {
      let accountDetails = this.payerAccountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
      return {
        vpaDetails: defaultVpaAccountArr,
        accountDetails: accountDetails
      }
    } else {
      if (this.DataService.vpaAddressList.length > 0) {
        let vpaAddressListCopy = this.DataService.vpaAddressList
        vpaAddressListCopy.map((vpaAddress: any, index) => {
          if (index == 0) {
            vpaAddress.default = "Y";
          } else {
            vpaAddress.default = "N";
          }
        });
        let defaultVpaAccountArr = vpaAddressListCopy.find((vpaAddress) => { return vpaAddress.default == "Y" });
        if (defaultVpaAccountArr) {
          let accountDetails = this.payerAccountDetails = this.getDefaultAccountNoByVpa(defaultVpaAccountArr.accounts);
          return {
            vpaDetails: defaultVpaAccountArr,
            accountDetails: accountDetails
          }
        }
      } else {
        this.showPopup("noAccountAvailable", "");
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

  filterRecFavList(type) {
    let benficiaryList = this.DataService.benficiaryListData;
    this.recentPayeeReqList = [];
    this.favPayeeList = [];
    benficiaryList.map((benificiary, index) => {
      if (benificiary.txnMode == type) {
        this.recentPayeeReqList.push(benificiary);
      }
      if (benificiary.favourites == 'Y' && benificiary.txnMode == type) {
        this.favPayeeList.push(benificiary);
      }
      if (benificiary.txnMode == 'ACCOUNT') {
        benificiary.beneVpa = benificiary.beneVpa ? benificiary.beneVpa : benificiary.beneAccount + "@" + benificiary.beneIfsc + ".ifsc.npci";
      }
    });
    this.DataService.favPayeeList = this.favPayeeList;
    if (this.recentPayeeReqList.length > 10) {
      this.showMoreRecentRequest = true;
    }
    if (this.favPayeeList.length > 10) {
      this.showMoreFav = true;
    }
  }

  cancel(type) {
    this.showUserInfo = false;
    this.payRecentReqForm.reset();
    this.payBankActForm.reset();
    this.mmidForm.reset();
  }

  resetForm(id) {
    // if (id != 'VPA') this.payRecentReqForm.reset();
    // if (id != 'ACCOUNT') this.payBankActForm.reset();
    // if (id != 'MMID') this.mmidForm.reset();
    this.payRecentReqForm.reset();
    this.payBankActForm.reset();
    this.mmidForm.reset();
    this.activeTabName = id;
    this.showUserInfo = false;
    this.payeeDisabled = false;
    this.bankPayeeNameExists = false;
    this.showVerifyButton = true
    this.favRecntFlag = false;
    console.log('this.activeTabName', this.activeTabName);
    // if (this.DataService.previousPageUrl != 'payUpiPayment') this.buildForm();
    this.buildForm();
    if (id != 'SELF_TRANSFER') {
      this.filterRecFavList(id);
    }
    if (this.DataService.bankDetails || this.DataService.previousPageUrl == 'payBankList') {
      if (this.DataService.bankDetails.iin) {
        this.onBankSel(this.DataService.bankDetails.iin);
      } else {
        this.payBankActForm.patchValue({ acctNum: this.favRecntFlag ? this.favRecntValue.beneAccount : this.DataService.verifyAddressResp.acctNum ? this.DataService.verifyAddressResp.acctNum : this.DataService.bankDetails.acctNum , reActNum: this.favRecntFlag ? this.favRecntValue.beneAccount : this.DataService.verifyAddressResp.reActNum ? this.DataService.verifyAddressResp.reActNum : this.DataService.bankDetails.reActNum, bankIfsc: this.favRecntFlag ? this.favRecntValue.beneIfsc.substring(4) : (this.DataService.verifyAddressResp?.bankIfsc ? this.DataService.verifyAddressResp.bankIfsc.substring(4) : this.DataService.bankDetails.bankIfsc), bankPayeeName: this.favRecntFlag ? this.favRecntValue.beneName : this.DataService.verifyAddressResp.bankPayeeName ? this.DataService.verifyAddressResp.bankPayeeName : this.DataService.bankDetails.bankPayeeName });
      }
    } else {
      this.bankIfsCode = "";
      this.DataService.verifyAddressResp = '';
    }
    this.DataService.bankDetails = undefined;

  }

  onSelfTrnsClick() {
    this.router.navigateByUrl('/selfTransfer');
  }

  /**
 * show popup by popupName
 * @param popupName
 * @param data
 */
  showPopup(popupName, data?) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
    this.popupData = data ? data : {};
    console.log('this.popupData', this.popupData);
  }

  /**
   * Close popup by popupName
   * @param popupName
   */
  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  goToPage(routeName) {
    if (routeName == 'searchContactList') {
      this.DataService.contactPrevURL = this.router.url;
      this.DataService.payFetchContacts = true;
    } else if (routeName == 'createUpi') {
      this.DataService.isLinkAccountFlow = true;
      this.DataService.linkAccSelectedVpaDetails = this.payerAccountDetails ? this.payerAccountDetails : '';
    } else {
      this.DataService.resetUpiPayModelData();
      this.DataService.payFetchContacts = false;
    }
    this.router.navigateByUrl(routeName);
  }

  favPayeeBtn(bt) {

  }

  verifyBranch() {
    var req = this.payUpiRequestService.setVerifyBranchRequest(this.payBankActForm.value.bankIfsc);
    this.UpiApiCall(req);
  }

  goBack() {
    this.location.back();
  }

  navigate(event, routeName) {
    if (routeName == 'payBankList') {
      this.DataService.bankDetails = this.payBankActForm.value;
      this.DataService.bankDetails.iin =  this.actAndIfscPay.bankIin;
    } else {
    }
    event.preventDefault();
    this.DataService.routeWithNgZone(routeName);
  }

  ngOnDestroy() {
    this.DataService.accountIFscDetails = "";
  }

}
