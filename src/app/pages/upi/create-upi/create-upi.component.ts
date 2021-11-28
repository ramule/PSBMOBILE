import { Component, NgZone, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { LocalStorageService } from '../../../services/local-storage-service.service';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { CommonMethods } from '../../../utilities/common-methods';
import { Location } from '@angular/common';
import { CreateUpiService } from './create-upi.service';
import { UPIBankAccount } from '../../../models/account-detail-model';
import { NpciAndroidService } from '../../../services/npci-android.service';
import { NpciIosService } from '../../../services/npci-ios.service';
import { PluginService } from '../../../services/plugin-service';
import * as moment from 'moment';
import { pageLoaderService } from '../../../services/pageloader.service';
import { FormValidationService } from '../../../services/form-validation.service';
import { Subject } from 'rxjs';

declare var moboVerification: any;

@Component({
  selector: 'app-create-upi',
  templateUrl: './create-upi.component.html',
  styleUrls: ['./create-upi.component.scss']
})

export class CreateUPIComponent implements OnInit {
  createUpiIdForm: FormGroup;
  debitCardForm: FormGroup;
  selectAccountForm: FormGroup
  selectedBanktype: number;
  selectedBankError: boolean = false;
  selectedBankName: any;
  otherBankList = [];
  upiIdSuggestionStatic = [];
  upiIdAlreadyUsed: boolean = false;
  upiId: any;
  upiIdSuggestionsList: any;
  accountList: any;
  migratedUser: boolean = false;
  showDebitCardForm: boolean = false;
  showOtherBankList: boolean = false;
  selectedAccount: any;
  prevPageUrl: any;
  linkAccountFlow: boolean = false;
  linkAccUpiId: string;
  errorText: string;
  disableFooterSubmitButton: boolean = false;
  disableSelectAccountSubmitButton: boolean = false;
  disableDebitSubmitButton: boolean = false;
  minDate: any;
  maxDate: any;
  showFormat1Screen: boolean = false;
  showFormat2Screen: boolean = true;
  finalCredResponse: any;
  isMbeba = 'N';
  headerdata = {
    'headerType': 'createUpiIdHeader',
    'titleName': 'Create UPI ID',
    'footertype': 'none'
  }

  mobileNumber: any;
  isBankAccountAvailable: boolean; //false
  bankDetailsArray: any;

  public formErrorsDebitCard = {
    cardNumber: '',
    expDate: '',
    cardPin: ''
  };

  paymentAddress: any;
  showAccountListPopup: boolean = false;
  searchBanks = '';
  userBankName: any;
  psbSelected: boolean = false;
  emptyUpiId: boolean = false;
  psbBankDetails: any;

  formInput = ['spassword1', 'spassword2', 'spassword3', 'spassword4', 'spassword5', 'spassword6'];
  formInputExp = ['expdate1', 'expdate2', 'expdate3', 'expdate4'];
  @ViewChildren('mPINformRow') mPinRows: any;
  @ViewChildren('expiryDateRow') expDateRows: any;

  constructor(private router: Router, private form: FormBuilder, public dataService: DataService, private translate: TranslatePipe, private http: HttpRestApiService, private localStorageService: LocalStorageService, public constant: AppConstants, private encryptDecryptService: EncryptDecryptService, private commonMethod: CommonMethods, private location: Location, private createUpiService: CreateUpiService, private npciAndroidService: NpciAndroidService, private npciIosService: NpciIosService, private pluginService: PluginService, private pageLoaderService: pageLoaderService, private formValidationService: FormValidationService, private ngZone: NgZone, private loaderService: pageLoaderService) { }

  ngOnInit(): void {
    this.prevPageUrl = this.dataService.previousPageUrl ? this.dataService.previousPageUrl : "";
    console.log("Coming from => ", this.prevPageUrl);

    if (this.prevPageUrl == "manageAccounts" || this.prevPageUrl == "payUpi") {
      //Manage Accounts => Link Account Flow
      if (this.dataService.isLinkAccountFlow) {
        console.log("Manage Accounts => Link Account Flow");
        this.continueLinkAccountFlow();
      } else {
        console.log("Manage Accounts => Create VPA Flow");
        this.continueCreateVpaFlow();
      }
      this.dataService.prevUrlForCreateVpaSuccess = "manageAccounts";
    } else if (this.prevPageUrl == "upiDashboard" || this.prevPageUrl == "") {
      this.dataService.prevUrlForCreateVpaSuccess = "upiDashboard";
      //Check VPA List
      if (this.dataService.vpaAddressList.length > 0) {
        //VPA List exists, coming from Dashboard Carousel
        this.continueLinkAccountFlow();
      } else {
        //Coming from No VPA Popup
        this.continueCreateVpaFlow();
      }
    } else if (this.prevPageUrl == "myProfile") {
      //comming from myprofile will redirect to dashboard
      this.dataService.prevUrlForCreateVpaSuccess = "upiDashboard";
      this.continueCreateVpaFlow();
    } else {
      //Registration => Create UPI Id Flow
      this.dataService.prevUrlForCreateVpaSuccess = "upiRegSuccess";
      this.continueCreateVpaFlow();
      if (this.prevPageUrl == "setMpin") {
        this.prevPageUrl = "upiRegSuccess";
      }
    }

    console.log(this.prevPageUrl);
    history.pushState({}, this.prevPageUrl, this.location.prepareExternalUrl(this.prevPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    // this.dataService.isLinkAccountFlow = this.linkAccountFlow;

    this.selectedBankError = false;
    this.dataService.changeMessage(this.headerdata);
    moboVerification();
    this.createUpiService.initData();

    this.isBankAccountAvailable = true;

    console.log("isBankAccountAvailable = ", this.isBankAccountAvailable);
    console.log('linkAccountFlow = ', this.linkAccountFlow);
    console.log("omniApiName = ", this.createUpiService.omniApiName);

    this.upiIdSuggestionStatic = [
      "rajesh9omprakashs",
      "rajeshomprakashs.7109",
      "rajesh.7210"
    ];

    this.buildCreateUpiIdForm();
    this.buildDebitCardForm();
    this.buildSelectAccountForm();

    this.disableFooterSubmitButton = true;
    this.disableSelectAccountSubmitButton = true;
    this.disableDebitSubmitButton = true;

    // this.UpiApiCall(this.constant.upiserviceName_GETACCOUNTPROVIDERLIST);
    this.UpiApiCall(this.constant.upiserviceName_GETBANKDETAILLIST);
  }

  continueLinkAccountFlow() {
    this.linkAccountFlow = true;
    console.log("UPI Id => ", this.dataService.linkAccSelectedVpaDetails);
    this.linkAccUpiId = this.dataService.linkAccSelectedVpaDetails.paymentAddress ? this.dataService.linkAccSelectedVpaDetails.paymentAddress : "";
    this.createUpiService.paymentAddress = this.linkAccUpiId;
    this.headerdata.titleName = "Link Account";
  }

  continueCreateVpaFlow() {
    console.log("Registration => Create UPI Id Flow");
    this.linkAccountFlow = false;
    this.headerdata.titleName = "Create UPI ID";
  }

  buildCreateUpiIdForm() {
    if (this.dataService.vpaAddressList.length == 0) {
      this.upiId = this.localStorageService.getLocalStorage(this.constant.storage_mobileNo);
    } else {
      this.upiId = "";
    }

    if (this.linkAccountFlow) {
      this.upiId = this.linkAccUpiId;
    }

    this.createUpiIdForm = new FormGroup({
      upiId: new FormControl(this.upiId, [Validators.required, Validators.minLength(4)])
      // selectAccount: new FormControl('', [Validators.required]),
      // otherbank: new FormControl('', [Validators.required])
    });

    if (this.prevPageUrl != "manageAccounts" && this.prevPageUrl != "upiDashboard") {
      this.createUpiIdForm.get('upiId').setValue(this.upiId);
      this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
    } else {
      this.createUpiService.paymentAddress = this.linkAccUpiId;
    }

    this.createUpiIdForm.get('upiId').valueChanges.subscribe(data => {
      if (data) {
        console.log('RESET!! changed data => ', data);
        this.paymentAddress = data + "@psb";
        console.log('this.paymentAddress', this.paymentAddress);
      }
    });
  };

  // setBankName(bankName) {
  //   this.selectedBankName = bankName;
  //   this.createUpiService.bankName = bankName;

  //   this.disableFooterSubmitButton = false;
  //   console.log("this.bankDetailsArray => ", this.bankDetailsArray);

  //   let selectedBankDetails = this.bankDetailsArray.filter((item) => {
  //     return this.selectedBankName == item.bankName;
  //   });

  //   this.createUpiService.selectedBankIfsc = selectedBankDetails[0].ifsc;

  //   if (bankName == this.constant.val_bankName_PSB) {
  //     if (this.showOtherBankList) {
  //       this.showOtherBankList = false;
  //     }
  //   }
  //   console.log("Calling upiserviceName_GETACCOUNTLIST..");
  //   this.UpiApiCall(this.constant.upiserviceName_GETACCOUNTLIST);
  // }

  setBankName(bank) {
    this.selectedBankName = bank.bankName;
    this.createUpiService.bankName = bank.bankName;
    this.disableFooterSubmitButton = false;
    this.createUpiService.selectedBankIfsc = bank.ifsc;

    if (bank.ifsc == "PSIB") {
      if (this.showOtherBankList) {
        this.showOtherBankList = false;
      }
    }
    console.log("Calling upiserviceName_GETACCOUNTLIST..");
    this.UpiApiCall(this.constant.upiserviceName_GETACCOUNTLIST);
  }

  verifyUpiId(bankName?) {
    if (!this.linkAccountFlow) {
      if (bankName == this.constant.val_bankName_PSB) {
        // this.setBankName(bankName);
        this.userBankName = bankName;
      }
      this.UpiApiCall(this.constant.upiserviceName_VERIFYPAYMENTADDRESS);
    }


    // if (!this.upiIdAlreadyUsed) {
    //   console.log("UPI Id available...");
    //   this.upiIdAlreadyUsed = false;
    // } else {
    //   console.log("UPI Id is already used...");
    //   //call UPI Id Suggestions API
    // }
  }

  showOtherBanksList() {
    this.showOtherBankList = true;
    console.log("showOtherBankList = ", this.showOtherBankList);

    if (!this.isBankAccountAvailable) {
      this.isBankAccountAvailable = true;
    }
  }

  buildDebitCardForm() {
    // this.debitCardForm = new FormGroup({
    //   cardNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    //   expiryDate: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    // });
    this.debitCardForm = new FormGroup({
      spassword1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword5: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      spassword6: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      expdate4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)])
    });

    // this.debitCardForm.get('cardNumber').valueChanges.subscribe((data) => {
    //   if (data) {
    //     this.createUpiService.debitCardNumber = data;
    //   }
    // });

    // this.debitCardForm.get('expiryDate').valueChanges.subscribe((data) => {
    //   if (data) {
    //     let expiryDate = data;
    //     if (expiryDate.length == 3) {
    //       expiryDate = "0" + expiryDate;
    //     }
    //     this.createUpiService.debitCardExpiryDate = expiryDate;
    //     this.disableDebitSubmitButton = false;
    //   }
    // });

    // this.debitCardForm.valueChanges.subscribe((data) => {
    //   if (data) {
    //     this.formErrorsDebitCard = this.formValidationService.validateForm(this.debitCardForm, this.formErrorsDebitCard, true);
    //   }
    // });
  }

  buildSelectAccountForm() {
    this.selectAccountForm = new FormGroup({
      account: new FormControl('', [Validators.required])
    });
  }

  validateCreateUpiForm() {
    if (this.createUpiIdForm.invalid) {
      this.createUpiIdForm.get('upiId').markAsTouched();
      this.createUpiIdForm.get('selectAccount').markAsTouched();
      this.createUpiIdForm.get('otherbank').markAsTouched();
      return;
    }
  }

  upiSubmit() {
    this.validateCreateUpiForm();
    if (this.createUpiIdForm.valid) {
      if (this.createUpiIdForm.value.otherbank) {
        //  this.router.navigate(['/createUpi/otherbank']);
        this.router.navigate(['/upiOtherBanks']);
      } else if (this.createUpiIdForm.value.selectAccount) {
        this.router.navigate(['/upiOtherBanks']);
      } else {
        console.log("smebank")
        this.selectedBankError = true;
      }
    }
  }

  bankTabclick(Banktype) {
    if (Banktype == 'ownBank') {
      this.selectedBanktype = 1;
      this.createUpiIdForm.controls['otherbank'].reset()
    } else {
      this.selectedBanktype = 2;
      this.createUpiIdForm.controls['selectAccount'].reset()
    }
  }

  checkUpiId(i) {
    console.log(i);
    this.createUpiIdForm.controls['upiId'].reset()
    // this.createUpiIdForm.patchValue({ upiId: this.upiIdSuggestion[i] });
  }

  proceedWithPIN() {
    this.isMbeba = 'Y';
    this.closePopup('allowSetUpiPinPopup');
    this.showPopup('debitcard-info');
  }

  proceedWithoutPIN() {
    this.isMbeba = 'N';
    this.closePopup('allowSetUpiPinPopup');
    if (this.linkAccountFlow) {
      this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
    } else {
      this.UpiApiCall(this.constant.upiserviceName_ADDPAYMENTADDRESS);
    }
  }

  goToPage(routeName) {
    if (routeName == "searchContactList") {
      this.dataService.payFetchContacts = true;
    }
    // this.router.navigateByUrl('/' + routeName);
    this.dataService.routeWithNgZone(routeName);
  }

  back() {
    this.location.back();
  }

  setSelectedAccount(account) {
    this.disableSelectAccountSubmitButton = false;

    let accountJSON = {
      "mbeba": account.MBEBA ? account.MBEBA : "",
      "bankName": this.selectedBankName,
      "ifsc": account.IFSC ? account.IFSC : "",
      "accType": account.ACCTYPE ? account.ACCTYPE : "",
      "accNum": account.ACCNUMBER ? account.ACCNUMBER : "",
      "custName": account.NAME ? account.NAME : "",
      "maskedAccountNumber": account.MASKED_ACCNUMBER ? account.MASKED_ACCNUMBER : "",
      "paymentAddress": this.createUpiIdForm.get('upiId').value + '@psb',
      "credType": account.CRED_TYPE ? account.CRED_TYPE : "",
      "credDType": account.CRED_DTYPE ? account.CRED_DTYPE : "",
      "credSubType": account.CRED_SUB_TYPE ? account.CRED_SUB_TYPE : "",
      "credDLength": account.CRED_DLENGTH ? account.CRED_DLENGTH : "",
      "atmDType": account.ATM_CRED_DTYPE ? account.ATM_CRED_DTYPE : "",
      "atmCredType": account.ATM_CRED_TYPE ? account.ATM_CRED_TYPE : "",
      "atmCredSubType": account.ATM_CRED_SUB_TYPE ? account.ATM_CRED_SUB_TYPE : "",
      "atmDLength": account.ATM_CRED_DLENGTH ? account.ATM_CRED_DLENGTH : "",
      "otpCredType": account.OTP_TYPE ? account.OTP_TYPE : "",
      "otpCredDType": account.OTP_DTYPE ? account.OTP_DTYPE : "",
      "otpCredSubType": account.OTP_SUB_TYPE ? account.OTP_SUB_TYPE : "",
      "otpCredDLength": account.OTP_CRED_DLENGTH ? account.OTP_CRED_DLENGTH : ""
    };

    this.selectedAccount = new UPIBankAccount().deserialize(accountJSON);
    // this.selectedAccount.forEach(element => {
    //   if(element.accType == 'SOD' || element.accType == 'UOD') {
    //     element.actualAccType = 'Overdraft';
    //   } else {
    //     element.actualAccType = element.accType;
    //   }
    // });
    console.log('this.selectedAccount');
    console.log(this.selectedAccount);
    this.createUpiService.selectedAccountDetails = this.selectedAccount;
    if (this.linkAccountFlow) {
      this.checkMbebaFlag();
      // this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
    } else {
      if (this.dataService.createDefaultVPAFlag) {
        if (this.dataService.vpaAddressList.length == 0) {
          this.setDefaultVpa(true);
        } else {
          this.showPopup('setDefaultVpaPopup');
        }
      } else {
        this.createUpiService.isDefaultVpa = "N";
        this.checkMbebaFlag();
      }
    }
  }

  checkMbebaFlag() {
    // Check if MBEBA is set or not
    if (this.selectedAccount.mbeba == "Y") {
      // set - Add VPA & navigate to success
      if (this.linkAccountFlow) {
        this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
      } else {
        this.UpiApiCall(this.constant.upiserviceName_ADDPAYMENTADDRESS);
      }
    } else {
      // not set - show popup & proceed further to NPCI flow
      this.showPopup('allowSetUpiPinPopup');
      //check Format depending on ATM data or not
      //if ATM Data = format 2, else format 1
      if (this.dataService.isEmpty(this.selectedAccount.atmCredType)) {
        this.showFormat1Screen = true;
        this.showFormat2Screen = false;
      } else {
        this.showFormat1Screen = false;
        this.showFormat2Screen = true;
      }
      console.log('this.showFormat1Screen', this.showFormat1Screen);
      console.log('this.showFormat2Screen', this.showFormat2Screen);
    }
  }

  checkUpiPinStatus() {
    if (this.selectedAccount.mbeba == "Y") {
      // UPI Pin is set, navigate to dashboard
      this.goToPage('/upiDashboard');
    } else {
      // UPI Pin is not set, ask user whether they want to set UPI Pin or not
      this.showPopup('allowSetUpiPinPopup');
      // this.showDebitCardForm = true;
      // this.showPopup('debitcard-info');
    }
  }

  UpiApiCall(apiName) {
    this.pageLoaderService.showLoader();
    switch (apiName) {
      case this.constant.upiserviceName_GETPAYMENTADDRESS:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value;
          } else {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
          }
          this.createUpiService.getPaymentAddressRequestObject();
        }
        break;
      case this.constant.upiserviceName_VERIFYPAYMENTADDRESS:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.verifyPaymentAddressRequestObject(this.createUpiIdForm.get('upiId').value);
          } else {
            this.createUpiService.verifyPaymentAddressRequestObject(this.createUpiIdForm.get('upiId').value + "@psb");
          }
        } else {
          this.errorText = "Please enter a valid UPI Id";
          this.showPopup('errorPopup');
        }
        break;
      case this.constant.upiserviceName_GETACCOUNTPROVIDERLIST:
        this.createUpiService.getAccountProviderListRequestObject();
        break;
      case this.constant.upiserviceName_GETBANKDETAILLIST:
        this.createUpiService.getBankDetailListRequestObject();
        break;
      case this.constant.upiserviceName_GETACCOUNTLIST:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value;
          } else {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
          }
          this.createUpiService.getAccountListRequestObject();
        } else {
          console.log("upiId not found ");
        }
        break;
      case this.constant.upiserviceName_ADDPAYMENTADDRESS:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value;
          } else {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
          }
          this.createUpiService.addPaymentAddressRequestObject(this.createUpiService.paymentAddress, this.isMbeba);
        } else {
          console.log("upiId not found ");
        }
        break;
      case this.constant.upiserviceName_REQUESTOTP:
        this.createUpiService.requestOTPRequestObject();
        break;
      case this.constant.upiserviceName_REGMOBILE:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value;
          } else {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
          }
          this.createUpiService.regMobileRequestObject(this.finalCredResponse);
        } else {
          console.log("upiId not found ");
        }
        break;
      case this.constant.upiserviceName_ADDACCOUNTTOVPA:
        if (this.createUpiIdForm.get('upiId').value) {
          if (this.createUpiIdForm.get('upiId').value.includes("@psb")) {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value;
          } else {
            this.createUpiService.paymentAddress = this.createUpiIdForm.get('upiId').value + "@psb";
          }
          this.createUpiService.addAccountToVpaRequestObject(this.selectedAccount);
        } else {
          console.log("upiId not found ");
        }
        break;
      default:
        console.log('Default case => apiName = ', apiName);
        break;
    }

    var requestObj = this.createUpiService.getEncryptedOmniRequestObject();

    this.http.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.createUpiService.omniApiName, true).subscribe(data => {
      this.pageLoaderService.hideLoader();
      console.log('success', data);
      if (data.responseParameter.opstatus == "00") {
        //success handler
        let upiResponseData = data.responseParameter.upiResponse;
        console.log('upiResponseData => ', upiResponseData);

        switch (upiResponseData.subActionId) {
          case this.constant.upiserviceName_GETPAYMENTADDRESS:
            console.log("GETPAYMENTADDRESS Response handling...");
            if (upiResponseData.status == "00") {
              //success handler
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_VERIFYPAYMENTADDRESS:
            console.log("VERIFYPAYMENTADDRESS Response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.upiIdAlreadyUsed = false;
              if (this.psbSelected) {
                // this.setBankName(this.constant.val_bankName_PSB);
                this.setBankName(this.psbBankDetails);
              } else {
                this.showOtherBanksList();
              }
            } else {
              //failure handler, user blocked
              this.upiIdAlreadyUsed = true;
              //call suggestions API
            }
            break;
          case this.constant.upiserviceName_GETACCOUNTPROVIDERLIST:
            console.log("GETACCOUNTPROVIDERLIST Response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              this.otherBankList = upiResponseData.responseParameter.AccPvdList;
              console.log('this.otherBankList', this.otherBankList);
              this.dataService.accountProviderList = upiResponseData.responseParameter.AccPvdList;
              this.UpiApiCall(this.constant.upiserviceName_GETBANKDETAILLIST);
            } else {
              //failure handler 
            }
            break;
          case this.constant.upiserviceName_GETBANKDETAILLIST:
            console.log("GETBANKDETAILLIST Response handling...");
            console.log('upiResponseData', upiResponseData);
            if (upiResponseData.status == "00") {
              this.bankDetailsArray = upiResponseData.responseParameter.BankList;
              this.bankDetailsArray.forEach(element => {
                if(element.ifsc != "PSIB") {
                  this.otherBankList.push(element);
                } else {
                  this.psbBankDetails = element;
                }
              });
            }
            break;
          case this.constant.upiserviceName_GETACCOUNTLIST:
            console.log("GETACCOUNTLIST Response handling...");
            if (upiResponseData.status == "00") {
              this.accountList = upiResponseData.responseParameter.RESULT;
              this.selectAccountForm.reset();
              if (this.accountList.length > 0) {
                this.isBankAccountAvailable = true;
                if (this.showOtherBankList) {
                  this.showOtherBankList = false;
                }
                this.showPopup('selectAccountPopup');
              } else {
                this.isBankAccountAvailable = false;
                this.showOtherBankList = false;
              }
            } else {
              this.isBankAccountAvailable = false;
              this.showOtherBankList = false;
            }
            break;
          case this.constant.upiserviceName_ADDPAYMENTADDRESS:
            console.log("ADDPAYMENTADDRESS Response handling...");
            if (upiResponseData.status == "00") {
              this.dataService.upiIdDetails = upiResponseData.responseParameter;
              this.dataService.vpaAddressList = [];
              console.log('this.dataService.upiIdDetails', this.dataService.upiIdDetails);
              if (this.prevPageUrl != 'manageAccounts') {
                if (this.isMbeba == 'N') {
                  this.dataService.routeWithNgZone('createUpiSuccess');
                } else {
                  if (this.showFormat1Screen) {
                    if (this.finalCredResponse) {
                      this.UpiApiCall(this.constant.upiserviceName_REGMOBILE);
                    } else {
                      this.dataService.routeWithNgZone('createUpiSuccess');
                    }
                  } else if (this.showFormat2Screen) {
                    if (this.finalCredResponse) {
                      this.UpiApiCall(this.constant.upiserviceName_REGMOBILE);
                    } else {
                      this.dataService.routeWithNgZone('createUpiSuccess');
                    }
                  } else {

                  }
                }
              } else {
                this.dataService.isSetVpaDtl = true;
                this.dataService.vpaDtls = this.dataService.linkAccSelectedVpaDetails;
              }
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_REQUESTOTP:
            console.log("REQUESTOTP response handling...");
            if (upiResponseData.status == "00") {
              //success handler
              console.log('this.showFormat1Screen', this.showFormat1Screen);
              console.log('this.showFormat2Screen', this.showFormat2Screen);
              if (this.showFormat1Screen) {
                if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
                  this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeSetUpiPin;
                } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
                  this.npciIosService.credTypeValue = this.constant.val_npci_credTypeSetUpiPin;
                } else {
                  console.log("Unknown platform..");
                }
                this.callNpciLibrary(this.selectedAccount);
              }

              if (this.showFormat2Screen) {
                if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
                  this.npciAndroidService.credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
                } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
                  this.npciIosService.credTypeValue = this.constant.val_npci_credTypeSetUPIPinWithATM;
                } else {
                  console.log("Unknown platform..");
                }
                this.callNpciLibrary(this.selectedAccount);
              }
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_REGMOBILE:
            console.log("REGMOBILE response handling...");
            //navigate to success with appropriate message
            if (this.linkAccountFlow) {
              this.dataService.routeWithNgZone('linkAccountSuccess');
            } else {
              this.dataService.routeWithNgZone('createUpiSuccess');
            }
            this.dataService.regMobileAPIResponse = upiResponseData;
            if (upiResponseData.status == "00") {
              //success handler
            } else {
              //failure handler
            }
            break;
          case this.constant.upiserviceName_ADDACCOUNTTOVPA:
            if (upiResponseData.status == "00") {
              //success handler
              if (this.prevPageUrl == 'manageAccounts' || this.prevPageUrl == 'upiDashboard') {
                this.dataService.vpaAddressList = [];
                this.dataService.linkedAccountDetails = upiResponseData;
                this.dataService.linkedAccountDetails.bankName = this.selectedAccount.bankName;
                this.dataService.linkedAccountDetails.maskedAccNo = this.selectedAccount.maskedAccountNumber;
                this.dataService.linkedAccountDetails.accType = this.selectedAccount.accType;
                this.dataService.linkedAccountDetails.actualAccType = (this.selectedAccount.accType == 'SOD' || this.selectedAccount.accType == 'UOD') ? 'Overdraft' : this.selectedAccount.accType;
                if (this.selectedAccount.mbeba == 'Y') {
                  this.dataService.routeWithNgZone('linkAccountSuccess');
                } else {
                  if (this.isMbeba == 'Y') {
                    this.UpiApiCall(this.constant.upiserviceName_REGMOBILE);
                  } else {
                    this.dataService.routeWithNgZone('linkAccountSuccess');
                  }
                }
              } else {
                console.log("ELSE Coming from => ", this.prevPageUrl);
              }
            }
            break;
          default:
            console.log("DEFAULT => subAction Id = ", upiResponseData.subActionId);
            break;
        }
      } else {
        //failure handler
        console.log("FAILURE");
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  callNpciLibrary(accountData) {
    console.log("calling npci library...");
    console.log('accountData', accountData);
    this.loaderService.showLoader();

    if (window.hasOwnProperty('cordova')) {
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        console.log("Calling NPCI Android service...");
        this.npciAndroidService.initData();
        var subject = new Subject<any>();

        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.createUpiService.txnID = transactionId;
          console.log('Setting txnId => ', this.npciAndroidService.transactionId);
          this.npciAndroidService.androidStartCLLibrary(accountData, this.constant.val_npci_flow_setUpiPin_android, subject).subscribe((data) => {
            let NPCIResponse = data;
            console.log('Android StartCLLibrary Success NPCIResponse => ', NPCIResponse);
            if (NPCIResponse.hasOwnProperty('status') && NPCIResponse.status == "00") {
              this.finalCredResponse = NPCIResponse;
              if (this.linkAccountFlow) {
                this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
              } else {
                this.UpiApiCall(this.constant.upiserviceName_ADDPAYMENTADDRESS);
              }
            } else {

            }
          }, err => {
            console.log('Android StartCLLibrary error => ', err);
          });
        });
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        console.log("Calling NPCI iOS service...");
        this.npciIosService.initData();
        let subject = new Subject<any>();
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          console.log('transactionId Received => ', transactionId);
          this.npciIosService.txnId = transactionId;
          this.createUpiService.txnID = transactionId;
          this.npciIosService.iosStartCLLibrary(accountData, this.constant.val_npci_flow_setUpiPin, subject).subscribe((data) => {
            let NPCIResponse = data;
            console.log('iOS StartCLLibrary Success => ', NPCIResponse);
            if (NPCIResponse && NPCIResponse.credkey) {
              this.finalCredResponse = NPCIResponse;
              if (this.linkAccountFlow) {
                this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
              } else {
                this.UpiApiCall(this.constant.upiserviceName_ADDPAYMENTADDRESS);
              }
            } else {
              console.log("NPCI flow cancelled...");
            }
          }, err => {
            console.log('iOS StartCLLibrary error => ', err);
          });
        });
      } else {
        console.log("unknown platform = ", this.dataService.platform);
      }
    } else {
      console.log("Cordova not available... unable to start NPCI Library on web");
    }
  }

  showPopup(popupName) {
    this.commonMethod.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    this.commonMethod.closePopup('div.popup-bottom.' + popupName);
  }

  openDatePicker() {
    this.minDate = moment().toDate();
    this.maxDate = moment().add(20, 'years').toDate();
    this.pluginService.openDatePicker('date', new Date(), this.minDate, this.maxDate).subscribe((date) => {
      console.log('Success date', date);
      if (date) {
        this.debitCardForm.get('expiryDate').setValue(moment(date).format('YYYY/MM'));
        this.disableDebitSubmitButton = false;
        this.createUpiService.debitCardExpiryDate = moment(date).format('MMYY');
      }
    });
  }

  setDefaultVpa(isDefaultVpa) {
    this.closePopup('setDefaultVpaPopup');
    if (isDefaultVpa) {
      this.createUpiService.isDefaultVpa = "Y";
    } else {
      this.createUpiService.isDefaultVpa = "N";
    }
    this.checkMbebaFlag();
  }

  callAPIAndNpci() {
    this.closePopup('debitcard-info');
    this.createUpiService.debitCardNumber = this.getMPINValue();
    this.createUpiService.debitCardExpiryDate = this.getExpDate();
    console.log('this.createUpiService.debitCardNumber', this.createUpiService.debitCardNumber);
    console.log('this.createUpiService.debitCardExpiryDate', this.createUpiService.debitCardExpiryDate);

    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.createUpiService.requestOtpTxnId = transactionId;
        console.log('requestOtpTxnId => ', this.createUpiService.requestOtpTxnId);
        this.UpiApiCall(this.constant.upiserviceName_REQUESTOTP);
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.createUpiService.requestOtpTxnId = transactionId;
        console.log('requestOtpTxnId => ', this.createUpiService.requestOtpTxnId);
        this.UpiApiCall(this.constant.upiserviceName_REQUESTOTP);
      });
    }
  }

  psbBankFlow() {
    this.ngZone.run(() => {
      if (this.createUpiIdForm.valid) {
        //TO check if entered or received UPI ID is empty or not
        if ((this.prevPageUrl == "manageAccounts" || this.prevPageUrl == "upiDashboard") && (this.createUpiService.paymentAddress == "")) {
          this.emptyUpiId = true; return;
        }
        else if ((this.prevPageUrl != "manageAccounts" && this.prevPageUrl != "upiDashboard") && (this.createUpiIdForm.value.upiId == "")) {
          this.emptyUpiId = true; return;
        }
        console.log('this.emptyUpiId', this.emptyUpiId);


        this.psbSelected = true;
        if (this.linkAccountFlow) {
          // this.setBankName(this.constant.val_bankName_PSB);
          this.setBankName(this.psbBankDetails);
        } else {
          this.UpiApiCall(this.constant.upiserviceName_VERIFYPAYMENTADDRESS);
        }
      } else {
        console.log("form is invalid");
        console.log(this.createUpiIdForm);
        this.errorText = "Please enter a valid UPI Id";
        this.showPopup("errorPopup");
      }
    });
  }

  otherBankFlow() {
    this.ngZone.run(() => {
      if (this.createUpiIdForm.valid) {

        if (this.prevPageUrl == "manageAccounts" || this.prevPageUrl == "upiDashboard") {
          if (this.createUpiService.paymentAddress == "") { this.emptyUpiId = true; return; };
        }
        else {
          if (this.createUpiIdForm.value.upiId == "") { this.emptyUpiId = true; return; };
        }

        this.psbSelected = false;
        if (this.linkAccountFlow) {
          this.showOtherBanksList();
        } else {
          this.UpiApiCall(this.constant.upiserviceName_VERIFYPAYMENTADDRESS);
        }
      } else {
        console.log("form is invalid");
        console.log(this.createUpiIdForm);
        this.errorText = "Please enter a valid UPI Id";
        this.showPopup('errorPopup');
      }
    })
  }

  showDebitCardFailedPopup() {
    this.closePopup('debitcard-info');
    //show popup with failed message & call AddPaymentAddress
    this.showPopup('debitCardFail');
  }

  proceedWithVpaCreation() {
    this.closePopup('debitCardFail');
    // this.closePopup('debitcard-info');
    if (this.linkAccountFlow) {
      this.UpiApiCall(this.constant.upiserviceName_ADDACCOUNTTOVPA);
    } else {
      this.UpiApiCall(this.constant.upiserviceName_ADDPAYMENTADDRESS);
    }
  }

  onUpiIdChange() {
    this.selectAccountForm.reset();
    this.debitCardForm.reset();
    this.accountList = [];
    this.emptyUpiId = false;
    this.upiIdAlreadyUsed = false;
  }

  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (type == "mpin") {
      if (index <= 5)
        return this.mPinRows._results[index].nativeElement;
    }
    else if (type == "expdate") {
      if (index <= 4)
        return this.expDateRows._results[index].nativeElement;
    }

  }

  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log("onKeyUpEvent");
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "mpin").value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1, "mpin").focus();
      } else {
        // this.getSpasswordElement(index).blur();
        // // Submit code
        // console.log('submit code ');
        // ////console.log(this.getMPINValue());
        // let mpin = this.getMPINValue();
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "mpin").focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.debitCardForm.get(this.formInput[index]).setValue("");
        this.getSpasswordElement(index - 1, "mpin").focus();
      }
    }
  }

  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "mpin");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  keyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log("keyupevent");
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);

    if (this.getSpasswordElement(index, "expdate").value.length === 1) {
      if (index !== 3) {
        this.getSpasswordElement(index + 1, "expdate").focus();
      } else {
        // this.getSpasswordElement(index).blur();
        // // Submit code
        // console.log('submit code ');
        // ////console.log(this.getMPINValue());
        // let mpin = this.getMPINValue();
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, "expdate").focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.debitCardForm.get(this.formInputExp[index]).setValue("");
        this.getSpasswordElement(index - 1, "expdate").focus();
      }
    }
  }


  focusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, "expdate");
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  getMPINValue() {
    var mpin = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.debitCardForm.controls) { // 'field' is a string
      const control = this.debitCardForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required') && this.formInputExp.indexOf(field) == -1) {
        mpin += control.value;
        //console.log(mpin);
      }
    }
    return mpin;
  }

  getExpDate() {
    var expDate = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.debitCardForm.controls) { // 'field' is a string
      const control = this.debitCardForm.get(field); // 'control' is a FormControl  
      //console.log("value", control.value);
      if (!control.hasError('required') && this.formInput.indexOf(field) == -1) {
        expDate += control.value;
        //console.log(mpin);
      }
    }
    return expDate;
  }
}