import { Component, OnInit, ViewChildren, NgZone, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppConstants } from '../../../../app.constant';
import { CommonMethods } from '../../../../utilities/common-methods';
import { LocalStorageService } from '../../../../services/local-storage-service.service';
import { PayUpiPaymentService } from '../../pay/pay-upi-payment/pay-upi-payment.service';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Location } from '@angular/common';
import { NpciAndroidService } from '../../../../services/npci-android.service';
import { PendingReqService } from '../../pending/pending-request/pending-request.service';
import { NpciIosService } from '../../../../services/npci-ios.service';
import { CreateMandateService } from '../../mandate/create-mandate/create-mandate/create-mandate-service';
import { ModifyMandateService } from '../../mandate/modify-mandate/modify-mandate/modify-mandate.service';
import { UPIMandateService } from '../../mandate/upi-mandate/upi-mandate/upi-mandate-service';
import { SelfTransferPaymentService } from '../../pay/self-transfer-payment/self-transfer-payment.service';
import { ApproveMandateService } from '../../mandate/approve-mandate/approve-mandate/approve-mandate.service';
import { ScanQrPaymentService } from '../../scan-qr/scan-qr-payment/scan-qr-payment.service';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { TPINService } from '../../../omni/tpin/tpin.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';

declare var cordova: any;
declare var Keyboard: any;

@Component({
  selector: 'app-transaction-pin',
  templateUrl: './transaction-pin.component.html',
  styleUrls: ['./transaction-pin.component.scss']
})

export class TransactionPinComponent implements OnInit {
  enterPinForm: FormGroup;
  tpinForm : FormGroup;
  formInput = ['pinInput1', 'pinInput2', 'pinInput3', 'pinInput4', 'pinInput5', 'pinInput6'];
  publicKey: any;
  enteredPinValue: any;
  prevPageUrl: any;
  encryptedString: any;
  preApprovedReq: any = {};
  mandateRevokeMsg: any;
  pauseUnpauseMsg: any;
  payErrorMsg = "";
  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'Enter UPI PIN',
    'footertype': 'none'
  }
  @ViewChildren('pinformRow') pinRows: any;
  invalidTpin: boolean = false;
  

  constructor(public router: Router, public dataService: DataService, private constant: AppConstants, private commonMethods: CommonMethods, private localStorageService: LocalStorageService, private payService: PayUpiPaymentService, private httpService: HttpRestApiService, private location: Location, private npciAndroidService: NpciAndroidService, private pendingReqService: PendingReqService, private ngZone: NgZone, private npciIosService: NpciIosService, private createMandateService: CreateMandateService, private modifyMandateService: ModifyMandateService, private upiMandateService: UPIMandateService, private selfTransferPaymentService: SelfTransferPaymentService, private approveMandateService: ApproveMandateService, private scanQrPaymentService: ScanQrPaymentService, private loader : pageLoaderService,private tpinService :TPINService, private formValidation : FormValidationService,private translatePipe : TranslatePipe ) { }

  ngOnInit(): void {
    if(this.dataService.omniUPIFlow){
      this.dataService.setPageSettings('AUTHORIZATION');
    }else{
      this.dataService.changeMessage(this.headerdata);
    }
    console.log("Coming From => ", this.dataService.preApprovedFlowIdentifier);
    this.buildForm();
    history.pushState({}, this.dataService.preApprovedPreviousPageUrl, this.location.prepareExternalUrl(this.dataService.preApprovedPreviousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

  }

  buildForm() {
    const group: any = {};
    this.formInput.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    this.enterPinForm = new FormGroup(group);
    console.log(this.enterPinForm.controls);
    if (this.dataService.tpinlength == 4) {
      this.tpinForm = new FormGroup({
        tpin1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    } else {
      this.tpinForm = new FormGroup({
        tpin1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin5: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        tpin6: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    }
  }

  
  onSearchChange(value, inputPlace) {

    this.invalidTpin = false;
    console.log(value);
    if (inputPlace == 1) {
      if (value.length == 1)
        document.getElementById("spassword2").focus();
    }
    else if (inputPlace == 2) {
      if (value.length == 1)
        document.getElementById("spassword3").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword1").focus();
    }
    else if (inputPlace == 3) {
      if (value.length == 1)
        document.getElementById("spassword4").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword2").focus();

    }
    else if (inputPlace == 4) {
      if (value.length == 1)
        document.getElementById("spassword5").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword3").focus();

    }
    else if (inputPlace == 5) {
      if (value.length == 1)
        document.getElementById("spassword6").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword4").focus();

    }
    else if (inputPlace == 6) {
      if (value.length == 0)
        document.getElementById("spassword5").focus();

    }
  }

   /**
   * On Otp confirmation this fucntion called
   */
    confirmTPINClick() {
      var tpinValue;
      this.validateForm();
      console.log(this.tpinForm.value);
      if (this.tpinForm.valid) {
        if (this.dataService.tpinlength == 4) {
          tpinValue =
            this.tpinForm.value.tpin1 +
            this.tpinForm.value.tpin2 +
            this.tpinForm.value.tpin3 +
            this.tpinForm.value.tpin4;
        } else {
          tpinValue =
            this.tpinForm.value.tpin1 +
            this.tpinForm.value.tpin2 +
            this.tpinForm.value.tpin3 +
            this.tpinForm.value.tpin4 +
            this.tpinForm.value.tpin5 +
            this.tpinForm.value.tpin6;
        }
  
        var param = this.tpinService.getVerifyTPINReq(tpinValue);
        this.validateTPIN(param)
        // this.router.navigateByUrl('/otpSession')
  
      }
    }

    /**
   * Validate Form
   */
  validateForm() {
    if (this.tpinForm.invalid) {
      this.tpinForm.get('tpin1').markAsTouched();
      this.tpinForm.get('tpin2').markAsTouched();
      this.tpinForm.get('tpin3').markAsTouched();
      this.tpinForm.get('tpin4').markAsTouched();
      if (this.dataService.tpinlength == 6) {
        this.tpinForm.get('tpin5').markAsTouched();
        this.tpinForm.get('tpin6').markAsTouched();
      }
    
      return;
    }
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  getPinValue() {
    var pin = "";
    console.log(this.enterPinForm.controls);
    for (const field in this.enterPinForm.controls) { // 'field' is a string
      const control = this.enterPinForm.get(field); // 'control' is a FormControl  
      console.log("value", control.value);
      if (!control.hasError('required')) {
        pin += control.value;
        console.log(pin);
      }
    }
    return pin;
  }


  getSpasswordElement(index) {
    console.log(this.pinRows);
    if (index <= 5)
      return this.pinRows._results[index].nativeElement;
  }

  onKeyUpEvent(index, event) {
    const eventCode = event.which || event.keyCode;
    console.log("index ", index);
    console.log("event.which ", event.which);
    console.log("event.keyCode ", event.keyCode);

    if (this.getSpasswordElement(index).value.length === 1) {
      if (index !== 5) {
        this.getSpasswordElement(index + 1).focus();
      } else {
        this.getSpasswordElement(index).blur();
        // Submit code
        // this.loader.showLoader();
        console.log('submit code ');
        this.enteredPinValue = this.getPinValue();
        console.log("ENTERED PIN = ", this.enteredPinValue);
        if(this.dataService.omniUPIFlow){
          // var param = this.tpinService.getVerifyTPINReq(this.enteredPinValue);
          // this.validateTPIN(param);
        }else{
          this.callPublicKeyApi();
        }
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        this.enterPinForm.get(this.formInput[index]).setValue("");
        this.getSpasswordElement(index - 1).focus();
      }
    }
  }

  keyBoardEvent(event, type?: any) {
    console.log(event);
    console.log(event.target.value);

    if (type != undefined) {
      if (type == "clear") {
        if (this.enterPinForm.valid) {
          this.enterPinForm.get(this.formInput[5]).setValue("")
        }
        else {
          for (let item = 0; item < this.formInput.length; item++) {
            if (!this.enterPinForm.value[this.formInput[item]]) {
              this.enterPinForm.get(this.formInput[item - 1]).setValue("");
              break;
            }
          }
        }
      }
      else if (type == "submit") {
        this.validateUPIPIN();
      }
    }
    else {
      for (let item = 0; item < this.formInput.length; item++) {
        if (!this.enterPinForm.value[this.formInput[item]]) {
          this.enterPinForm.get(this.formInput[item]).setValue(event.target.value);
          break;
        }
      }
    }
  }

  validateUPIPIN(){
    if (this.enterPinForm.valid) {
      this.loader.showLoader();
      console.log('submit code ');
      this.enteredPinValue = this.getPinValue();
      console.log("ENTERED PIN = ", this.enteredPinValue);
      if(this.dataService.omniUPIFlow){
        var param = this.tpinService.getVerifyTPINReq(this.enteredPinValue);
        this.validateTPIN(param);
      }else{
        this.callPublicKeyApi();
      }
    }
  }

  resetForm() {
    this.enterPinForm.reset();
    this.pinRows._results[0].nativeElement.focus();
  }

  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  goToPage(routeName) {
    this.dataService.routeWithNgZone(routeName);
  }

  callPublicKeyApi() {
    console.log("Calling API to get Key....");
    let requestObj = this.payService.getSystemConfigurationRequest();

    this.httpService.callBankingAPIService(requestObj, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe((data) => {
      this.loader.hideLoader();
      console.log('Omni API Success => ', data);
      if (data.responseParameter.opstatus == "00") {
        let upiResponse = data.responseParameter.upiResponse;
        if (upiResponse.status == "00") {
          this.publicKey = upiResponse.responseParameter.HsmPublicKey;
          console.log("Calling getEncryptedValueFromCert...");
          let paramObj = {
            [this.constant.key_alg]: this.constant.val_rsa,
            [this.constant.key_certFactory]: this.constant.val_X509,
            [this.constant.key_certificateString]: this.publicKey,
            [this.constant.key_plainValue]: this.enteredPinValue
          };

          if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
            cordova.plugins.npciAndroidPlugin.getEncryptedValueFromCert(paramObj, (data) => {
              console.log("getEncryptedValueFromCert Success => ", data);
              let encResponse = data.encryptedString;
              console.log('encResponse', encResponse);
              this.generatePreApprovedRequest(encResponse);
            }, (error) => {
              console.log("getEncryptedValueFromCert Error => ", error);
              this.resetForm();
            });
          } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
            cordova.plugins.npciIosPlugin.getEncryptedValueWithString(paramObj, (data) => {
              console.log("getEncryptedValueFromCert Success => ", data);
              let encResponse = data;
              console.log('encResponse', encResponse);
              this.generatePreApprovedRequest(encResponse);
            }, (error) => {
              console.log("getEncryptedValueFromCert Error => ", error);
              this.resetForm();
            });
          } else {
            console.log("Unknown Platform");
          }
        } else {
          console.log("Error in API... resetting form...");
          this.resetForm();
        }
      } else {
        console.log("Error in API... resetting form...");
        this.resetForm();
      }
    }, (err) => {
      console.log('Omni API Error => ', err);
      this.resetForm();
    });
  }

  generatePreApprovedRequest(encResponse) {
    if (encResponse.includes("\n")) {
      this.encryptedString = encResponse.replace(/\n/g, '');;
    } else {
      this.encryptedString = encResponse;
    }
    console.log('formattedString', this.encryptedString);
    this.preApprovedReq = {
      [this.constant.key_upi_credType]: this.constant.val_upi_PIN,
      [this.constant.key_upi_credSubType]: this.constant.val_upi_MPIN,
      [this.constant.key_upi_credDataForJson]: this.encryptedString,
      [this.constant.key_upi_credId]: this.constant.val_upi_NPCI,
      [this.constant.key_upi_credkey]: this.commonMethods.genRandomDigit(9)
    };
    this.callFlowForIdentifier();
  }

  callFlowForIdentifier() {
    if (this.dataService.preApprovedFlowIdentifier == "pay") {
      this.payFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "collectAccept") {
      this.collectFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "selfTransfer") {
      this.selfTransferFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "createMandate") {
      this.createMandateFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "modifyMandate") {
      this.modifyMandateFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "activeViewPauseUnpauseMandate" || this.dataService.preApprovedFlowIdentifier == "revokeViewPauseUnpauseMandate") {
      this.pauseUnpauseMandateFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "activeViewRevokeMandate" || this.dataService.preApprovedFlowIdentifier == "revokeViewRevokeMandate" || this.dataService.preApprovedFlowIdentifier == "pendingViewRevokeMandate") {
      this.revokeMandateFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "approveMandate") {
      this.approveMandateFlow();
    } else if (this.dataService.preApprovedFlowIdentifier == "scanQr") {
      this.scanQrFlow();
    } else {
      console.log("else => unidentified flow...", this.dataService.preApprovedFlowIdentifier);
      this.resetForm();
    }
  }

  payFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.payService.transactionId = transactionId;
        this.preApprovedReq.transactionId = this.payService.transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Fund Transfer API..");
        this.payService.fundTransferApiCall(this.preApprovedReq).subscribe((PayResponse) => {
          console.log('fundTransferApiCall success', PayResponse);
          // if(PayResponse.isPaymentSuccessful) {
          this.dataService.routeWithNgZone("payUpiSuccess");
          // } else {
          //   this.ngZone.run(()=>{
          //     this.resetForm();
          //     $('div.popup-bottom.show-common-error').removeClass('popup-active');
          //     $('div.ios-nav-overlay').fadeOut(400);
          //     this.payErrorMsg = PayResponse.errorMsg;
          //     this.commonMethods.openPopup('div.popup-bottom.retryMsg')
          //   })
          // }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.payService.transactionId = transactionId;
        this.preApprovedReq.transactionId = this.payService.transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Fund Transfer API..");
        // this.commonMethods.closePopup('div.popup-bottom.retryMsg')
        this.payService.fundTransferApiCall(this.preApprovedReq).subscribe((PayResponse) => {
          console.log('fundTransferApiCall success', PayResponse);
          // if(PayResponse.isPaymentSuccessful) {
          this.dataService.routeWithNgZone("payUpiSuccess");
          // } else {
          //   this.ngZone.run(()=>{
          //     this.resetForm();
          //     $('div.popup-bottom.show-common-error').removeClass('popup-active');
          //     $('div.ios-nav-overlay').fadeOut(400);
          //     this.payErrorMsg = PayResponse.errorMsg;
          //     this.commonMethods.openPopup('div.popup-bottom.retryMsg')
          //   })
          // }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  collectFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Accept Notification API..");
        let requestObj = this.pendingReqService.setAcceptCollectReq(this.dataService.pendingWithMe, this.preApprovedReq, false);
        this.pendingReqService.acceptNotificationApiCall(requestObj).subscribe((success) => {
          console.log('success', success);
          if (success) {
            this.dataService.routeWithNgZone("pendingSuccess");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Accept Notification API..");
        let requestObj = this.pendingReqService.setAcceptCollectReq(this.dataService.pendingWithMe, this.preApprovedReq, false);
        this.pendingReqService.acceptNotificationApiCall(requestObj).subscribe((success) => {
          console.log('success', success);
          if (success) {
            this.dataService.routeWithNgZone("pendingSuccess");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  selfTransferFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling FundsTransfer API...");
        let requestObj = this.selfTransferPaymentService.setSelfTransferRequest(this.selfTransferPaymentService.formValues, this.selfTransferPaymentService.depositAccount, this.selfTransferPaymentService.transferAccount, this.preApprovedReq);
        this.selfTransferPaymentService.selfTransferApiCall(requestObj).subscribe((success) => {
          console.log('fundTransferApiCall success', success);
          // if (success) {
          this.dataService.routeWithNgZone('selfTransferSuccess');
          // } else {
          //   this.resetForm();
          // }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling FundsTransfer API...");
        let requestObj = this.selfTransferPaymentService.setSelfTransferRequest(this.selfTransferPaymentService.formValues, this.selfTransferPaymentService.depositAccount, this.selfTransferPaymentService.transferAccount, this.preApprovedReq);
        this.selfTransferPaymentService.selfTransferApiCall(requestObj).subscribe((success) => {
          console.log('fundTransferApiCall success', success);
          // if (success) {
          this.dataService.routeWithNgZone('selfTransferSuccess');
          // } else {
          //   this.resetForm();
          // }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  createMandateFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        if (this.dataService.createMandateTxnId) {
          this.preApprovedReq.transactionId = this.dataService.createMandateTxnId;
        } else {
          this.preApprovedReq.transactionId = transactionId;
        }

        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Pay Mandate API...");
        let requestObj = this.createMandateService.createMandateReq(this.preApprovedReq);
        this.createMandateService.payMandateApiCall(requestObj).subscribe((success) => {
          if (!success) {
            this.resetForm();
          } else {
            this.dataService.routeWithNgZone("createMandateSuccess");
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        if (this.dataService.createMandateTxnId) {
          this.preApprovedReq.transactionId = this.dataService.createMandateTxnId;
        } else {
          this.preApprovedReq.transactionId = transactionId;
        }

        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Pay Mandate API...");
        let requestObj = this.createMandateService.createMandateReq(this.preApprovedReq);
        this.createMandateService.payMandateApiCall(requestObj).subscribe((success) => {
          if (success) {
            this.dataService.routeWithNgZone("createMandateSuccess");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  modifyMandateFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Edit Mandate API...");
        let requestObj = this.modifyMandateService.modifyMandateRequest(this.preApprovedReq, this.dataService.pendingMandateWithPayer, this.dataService.modifyMandateDetails);
        this.modifyMandateService.editMandateApiCall(requestObj).subscribe((success) => {
          if (!success) {
            this.resetForm();
          } else {
            this.dataService.routeWithNgZone("modifyMandateSuccess");
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        console.log("Calling Edit Mandate API...");
        let requestObj = this.modifyMandateService.modifyMandateRequest(this.preApprovedReq, this.dataService.pendingMandateWithPayer, this.dataService.modifyMandateDetails);
        this.modifyMandateService.editMandateApiCall(requestObj).subscribe((success) => {
          if (!success) {
            this.resetForm();
          } else {
            this.dataService.routeWithNgZone("modifyMandateSuccess");
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  pauseUnpauseMandateFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        if (this.dataService.mandatePauseFlag) {
          console.log("Calling Pause Mandate API...");
        } else {
          console.log("Calling Unpause Mandate API...");
        }
        let requestObject = this.upiMandateService.pauseUnpauseMandate(this.preApprovedReq, this.dataService.mandatePauseFlag, this.dataService.createdMandate);
        this.upiMandateService.mandateApiCall(requestObject).subscribe((success) => {
          if (success) {
            this.pauseUnpauseMsg = this.dataService.pauseUnpauseMsg;
            this.showPopup("pauseUnpause-success");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq', this.preApprovedReq);
        if (this.dataService.mandatePauseFlag) {
          console.log("Calling Pause Mandate API...");
        } else {
          console.log("Calling Unpause Mandate API...");
        }
        let requestObject = this.upiMandateService.pauseUnpauseMandate(this.preApprovedReq, this.dataService.mandatePauseFlag, this.dataService.createdMandate);
        this.upiMandateService.mandateApiCall(requestObject).subscribe((success) => {
          if (success) {
            this.pauseUnpauseMsg = this.dataService.pauseUnpauseMsg;
            this.showPopup("pauseUnpause-success");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  revokeMandateFlow() {
    let mandateData;
    if (this.dataService.preApprovedFlowIdentifier == "pendingViewRevokeMandate") {
      mandateData = this.dataService.pendingMandateWithPayer;
    } else if (this.dataService.preApprovedFlowIdentifier == "revokeViewRevokeMandate") {
      mandateData = this.dataService.acceptedMandate;
    } else {
      //activeViewRevokeMandate
      mandateData = this.dataService.createdMandate;
    }
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        this.dataService.payeeRevokeTransId = transactionId;
        console.log('preApprovedReq');
        console.log(this.preApprovedReq);
        console.log("Calling Revoke Mandate API...");

        let requestObject = this.upiMandateService.revokeMandateRequest(this.preApprovedReq, mandateData);
        console.log('TPin => requestObject', requestObject);
        this.upiMandateService.mandateApiCall(requestObject).subscribe((success) => {
          if (success) {
            this.mandateRevokeMsg = this.dataService.mandateRevokeMsg;
            this.showPopup("revoke-success");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      this.npciIosService.getTransactionId().subscribe((transactionId) => {
        this.preApprovedReq.transactionId = transactionId;
        console.log('preApprovedReq');
        console.log(this.preApprovedReq);
        console.log("Calling Revoke Mandate API...");
        let requestObject = this.upiMandateService.revokeMandateRequest(this.preApprovedReq, mandateData);
        console.log('TPin => requestObject', requestObject);
        this.upiMandateService.mandateApiCall(requestObject).subscribe((success) => {
          if (success) {
            this.mandateRevokeMsg = this.dataService.mandateRevokeMsg;
            this.showPopup("revoke-success");
          } else {
            this.resetForm();
          }
        }, (error) => {
          this.resetForm();
        });;
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  approveMandateFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      console.log('preApprovedReq', this.preApprovedReq);
      console.log("Calling Approve Mandate API...");
      let requestObject = this.approveMandateService.approveMandateRequest(this.dataService.approveMandateDetail, this.preApprovedReq);
      this.approveMandateService.approveMandateApiCall(requestObject).subscribe((success) => {
        if (success) {
          this.dataService.routeWithNgZone('approveMandateSuccess');
        } else {
          this.resetForm();
        }
      }, (error) => {
        this.resetForm();
      });
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      console.log('preApprovedReq', this.preApprovedReq);
      console.log("Calling Accept Mandate API..")
      let requestObject = this.approveMandateService.approveMandateRequest(this.dataService.approveMandateDetail, this.preApprovedReq);
      this.approveMandateService.approveMandateApiCall(requestObject).subscribe((success) => {
        if (success) {
          this.dataService.routeWithNgZone('approveMandateSuccess');
        } else {
          this.resetForm();
        }
      }, (error) => {
        this.resetForm();
      });
    } else {
      console.log("Unknown platform");
    }
  }

  scanQrFlow() {
    if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
      if(this.dataService.ScanQrCodeData.tid) {
        this.npciAndroidService.transactionId = this.dataService.ScanQrCodeData.tid;
        this.preApprovedReq.transactionId = this.dataService.ScanQrCodeData.tid;
        this.dataService.payReceiptTransId = this.dataService.ScanQrCodeData.tid;
        this.proceedWithQrPayment();
      } else {
        this.npciAndroidService.getTransactionId().subscribe((transactionId) => {
          this.npciAndroidService.transactionId = transactionId;
          this.preApprovedReq.transactionId = transactionId;
          this.dataService.payReceiptTransId = transactionId;
          this.proceedWithQrPayment();
        }, (err) => {
          this.resetForm();
        });
      }
    } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
      if(this.dataService.ScanQrCodeData.tid) {
        this.npciIosService.txnId = this.dataService.ScanQrCodeData.tid;
        this.preApprovedReq.transactionId = this.dataService.ScanQrCodeData.tid;
        this.dataService.payReceiptTransId = this.dataService.ScanQrCodeData.tid;
        this.proceedWithQrPayment();
      } else {
        this.npciIosService.getTransactionId().subscribe((transactionId) => {
          this.npciIosService.txnId = transactionId;
          this.preApprovedReq.transactionId = transactionId;
          this.dataService.payReceiptTransId = transactionId;
          this.proceedWithQrPayment();
        }, (err) => {
          this.resetForm();
        });
      }
    } else {
      console.log("Unknown platform");
    }
  }

  proceedWithQrPayment() {
    console.log('preApprovedReq', this.preApprovedReq);
    console.log("Calling Funds Transfer API...");
    let requestObject = this.scanQrPaymentService.setPaymentRequest(this.scanQrPaymentService.selectedVpa, this.scanQrPaymentService.payeeObj, this.preApprovedReq, this.dataService.ScanQrCodeData);
    this.scanQrPaymentService.fundsTransferApiCall(requestObject).subscribe((success) => {
      this.dataService.routeWithNgZone('scanQRSuccess');
    }, (error) => {
      this.resetForm();
    });
  }

  showPopup(popupName) {
    this.commonMethods.openPopup('div.popup-bottom.' + popupName);
  }

  closePopup(popupName) {
    if (popupName == 'retryMsg') {
      $('div.popup-bottom.show-common-error').removeClass('popup-active');
      $('div.ios-nav-overlay').fadeOut(400);
    }
    this.commonMethods.closePopup('div.popup-bottom.' + popupName);
    if (popupName != 'retryMsg') {
      this.goToPage('upiMandate');
    }
  }


  cancel() {
    this.closePopup('retryMsg');
    this.location.back();
  }

 
  validateTPIN(param) {
    // this.initiateFlow();
    this.httpService.callBankingAPIService(param,this.localStorageService.getLocalStorage("deviceId"),this.constant.serviceName_VERIFYPIN).subscribe((data) => {
      console.log('=====validate otp=====', data);
      var resp = data.responseParameter;
      if (resp.opstatus == '00') {
        console.log(data.responseParameter);
        this.callFlowForIdentifier()
      } else {
        this.ngZone.run(() => {
          this.enterPinForm.reset();
          this.dataService.information = resp.Result;
          this.dataService.informationLabel = this.translatePipe.transform('INFORMATION');
          this.dataService.primaryBtnText = this.translatePipe.transform('OK');
          this.commonMethods.openPopup('div.popup-bottom.show-common-info');
        })
        // this.errorCallBack(data.subActionId, resp);
      }
    });
  }
  

}