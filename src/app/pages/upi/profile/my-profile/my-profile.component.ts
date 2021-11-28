import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../services/data.service';
import { PluginService } from '../../../../services/plugin-service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { CarouselComponent, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { MyProfileService } from '../my-profile/my-profile.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { UpiDashboardService } from '../../dashboard/upi-dashboard.service';
import { FormValidationService } from 'src/app/services/form-validation.service';

declare var boxCarousel3: any;
declare var cordova: any;
declare let html2canvas: any;
declare var showToastMessage: any;
declare var BarcodeScanner: any;
declare var myProfile: any;
declare var showNoVPAModal: any;
declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('owlCar') owlCar: CarouselComponent;

  headerdata = {
    'headerType': 'CloseNewHeader',
    'titleName': 'UPI_PROFILE',
    'footertype': 'upiDashboardFooter'
  }
  base64QRCodeImage: any;
  profileVpaAddressList = [];
  profiledashboardCarousel: OwlOptions;
  activeSlides: SlidesOutputData;
  htmlDivImg: any;
  popupData: any = {};
  myProfileForm: FormGroup;
  isAmountLimitExceeded = false;
  information = "";
  mobileNumber = "NA";
  vpaIndex = 0;
  sampleQrBase64Img: any;
  initAmount = true;

  
  otpFormInput = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6'] ;

  @ViewChildren('OTPFormRow') otpPinRows: any;
  otpSessionForm : FormGroup ;

  
  constructor(private router: Router,
    public dataService: DataService,
    public pluginService: PluginService,
    private translate: TranslatePipe,
    private commonMethod: CommonMethods,
    private myprofileservice: MyProfileService,
    private localStorageService: LocalStorageService,
    public constant: AppConstants,
    private http: HttpRestApiService,
    private location: Location,
    private upiDashboardService: UpiDashboardService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private pageLoaderService: pageLoaderService,
    private formValidation: FormValidationService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    $('#amt').autoNumeric('init', {aSign: "₹ "});
    this.dataService.changeMessage(this.headerdata);
    this.commonMethod.closeAllPopup();
    myProfile();
    boxCarousel3();
    this.pageLoaderService.showLoader();
    history.pushState({}, 'upiDashboard', this.location.prepareExternalUrl("upiDashboard"));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    console.log('this.dataService.vpaAddressList', this.dataService.vpaAddressList);
    if (this.dataService.vpaAddressList.length == 0) {
      this.pageLoaderService.hideLoader();
      if (this.dataService.platform.toLowerCase() == this.constant.val_android) {
        showNoVPAModal();
      } else if (this.dataService.platform.toLowerCase() == this.constant.val_ios) {
        this.showPopup('noVpaExitRetryIos');
      } else {
        console.log('profileVpaAddressList => ', this.profileVpaAddressList);
      }
    }
    console.log('profileVpaAddressList => ', this.profileVpaAddressList);
    this.profiledashboardCarousel = this.dataService.getProfileCarouselOptions();
    this.myprofileservice.initData();
    this.buildForm();
    this.mobileNumber = this.commonMethod.processPhoneNo(this.localStorageService.getLocalStorage(this.constant.storage_mobileNo))
    // this.getQRCode(1);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // this.dataService.vpaAddressList.map((vpaDetails: any) => {
      //   vpaDetails.isDynSelected = false;
      //   vpaDetails.showQrOnDynamic = true;
      //   vpaDetails.isQRDisabled = vpaDetails.vpaQrFlag == 'Y' ? false : true;
      //   if(!vpaDetails?.base64QRCodeImage){
      //     this.generateStaticQR(vpaDetails);
      //   }
      //   return vpaDetails;
      // });
      this.fetchVPAAdressList();
      this.pageLoaderService.hideLoader();
      this.commonMethod.closeAllPopup()
    })
  }

  /**
   * Form Creation
   */
  buildForm() {
    this.myProfileForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern(/(^[0-9.₹, ]*$)/)]),
      remarks: new FormControl('', [Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
    })

    this.otpSessionForm = new FormGroup({
      otp1: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      otp2: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      otp3: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      otp4: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      otp5: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
      otp6: new FormControl('', [ Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
    });
  }

  validateForm(){
    if (this.otpSessionForm.invalid) {
      this.otpSessionForm.get('otp1').markAsTouched();
      this.otpSessionForm.get('otp2').markAsTouched();
      this.otpSessionForm.get('otp3').markAsTouched();
      this.otpSessionForm.get('otp4').markAsTouched();
      this.otpSessionForm.get('otp5').markAsTouched();
      this.otpSessionForm.get('otp6').markAsTouched();
      return ;
    }
  }
  /**
  * Fetch VPA Address List
  */
  fetchVPAAdressList(islistRefresh?: any) {
    if (this.dataService.vpaAddressList.length == 0) {
      // this.upiDashboardService.getUserLocation();
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      // this.dashboardAPICall(param);
      this.UpiApiCall(param)
    } else if (islistRefresh) {
      this.upiDashboardService.getUserLocation();
      var param = this.upiDashboardService.getVPAAddressListAPICall();
      // this.dashboardAPICall(param);
      this.UpiApiCall(param, islistRefresh);
    } else {
      this.profileVpaAddressList = this.dataService.vpaAddressList;
      this.defaultVpaMove(this.profileVpaAddressList);
    }
  }

  // Move array on basis of default account set
  defaultVpaMove(profileVpaAddressList) {
    let default_Vpa_Set_Index = 0;
    let default_Vpa_index = profileVpaAddressList.findIndex(function (vpa) {
      return vpa.default === 'Y';
    });
    if (default_Vpa_Set_Index >= profileVpaAddressList.length) {
      var k = default_Vpa_Set_Index - profileVpaAddressList.length + 1;
      while (k--) {
        profileVpaAddressList.push(undefined);
      }
    }
    profileVpaAddressList.splice(default_Vpa_Set_Index, 0, profileVpaAddressList.splice(default_Vpa_index, 1)[0]);
    console.log('Sorted profileVpaAddressList', profileVpaAddressList)
    // if (this.profileVpaAddressList.length > 0) {
    //   this.setSelectedVpaAccountList(0);
    // }
    // return arr; // for testing
    this.generateFirstStaticQR(profileVpaAddressList);
  };

  /**
   * Static QR code generation
   * @param vpaDetails 
   */
  generateStaticQR(vpaDetails, qrContainer?: string, download?: boolean, share?: boolean) {
    console.log("Inside generateStaticQR...");
    console.log('vpaDetails', vpaDetails);
    // upi://pay?pa=8286363809@upi&pn=SACHIN%20SHAKTI%20SEMLETY&cu=INR&mode=02&purpose=00&orgid=159023&sign=MEQCIDaJYExnrxnAwKiCIRQq48gbvWVCcWce2tSA+xSIvHLyAiBqUKGqVskQxM7NoWMUsvN7ZFMqH/kpYoWkN/R/kL28RQ==
    if (this.dataService.isCordovaAvailable) {
      let payeeName = vpaDetails.accounts.find(function (account) { return account['isDefaultAccount'] == 'Y' }).custName;
      console.log('payeeName', payeeName);
      //TODO : generate signature api needed form MW Team fo sign
      let encodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&cu=INR&mode=02&purpose=00&orgid=159023`);
      this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
        vpaDetails.base64QRCodeImage = base64EncodedQRImage;
        this.generateSignature(vpaDetails);
        // setTimeout(() => {
        //   if (download) {
        //     this.QRDownload(qrContainer);
        //   } else if (share) {
        //     this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
        //   } else {
        //     console.log("undefined params => download & share");
        //   }
        // })
      }, (error) => {
        console.error('Error generating qr code ', error);
      })
    }
  }

  /**
   * Dynamic QR Code Generation
   * @param vpaDetails 
   */
  generateDynamicQR(vpaDetails, qrContainer?: string, download?: boolean, share?: boolean) {
    console.log('qrContainer', qrContainer);
    // upi://pay?pa=8286363809@upi&pn=v1|2|PKCS1|kZV7tYK2Ts4wA8NOR08B6yjXCtxBAvMIYS59sPxt2VJodXMOqUK6yK8KSVcKr9W8VpoQ7Psq9oNOCwGFCvOF8g==&am=12.00&cu=INR&mode=02&purpose=00&tn=test&orgid=159023&sign=MEQCIDF+HllhhYxZ30h17LwybFkJFNfqH1lInWTHfiM36xXgAiB7kD47X5dp5vB/WhxhzaRooZSmwx/OVGHBarQCBDUlXQ==

    if (this.dataService.isCordovaAvailable) {
      let payeeName = vpaDetails.accounts.find(function (account) { return account['isDefaultAccount'] == 'Y' }).custName;
      let { remarks, amount } = this.myProfileForm.value;
      remarks = this.commonMethod.validateEmpty(remarks) == true ? '' : remarks;
      let amt = this.commonMethod.addDecimalToFixed(amount.trim().replace(/[^.0-9]+/g, ''));
      //TODO : generate signature api needed form MW Team fo sign
      let qrCodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&am=${amt}&cu=INR&mode=02&purpose=00&tn=${remarks}&orgid=159023`);
      this.myprofileservice.getUserLocation();
      var reqParams = this.myprofileservice.getGenSigParam(qrCodeText);

      this.http.callBankingAPIService(reqParams, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
        console.log('success', data);
        let profileResponseData = data.responseParameter.upiResponse;
        if (data.responseParameter.opstatus == "00" && profileResponseData.status == "00") {
          //success handler
          console.log('profileResponseData => ', profileResponseData);
          switch (profileResponseData.subActionId) {
            case this.constant.upiserviceName_GENERATEQRSIGNATURE:
              let qrSignature = profileResponseData.responseParameter.RESULT;
              console.log("2 GENERATEQRSIGN response handling...");
              let encodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&am=${amt}&cu=INR&mode=02&purpose=00&tn=${remarks}&orgid=159023&sign=${qrSignature}`);
              this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
                vpaDetails.base64DynamicQRCodeImage = base64EncodedQRImage;
                vpaDetails.showQrOnDynamic = true;
                // setTimeout(() => {
                //   if (download) {
                //     this.QRDownload(qrContainer);
                //   } else if (share) {
                //     this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
                //   } else {
                //     console.log("undefined params => download & share");
                //   }
                // })
              }, (error) => {
                console.error('Error generating qr code ', error);
              })
              break;
          }
        } else {
          if (profileResponseData.subActionId == this.constant.upiserviceName_GENERATEQRSIGNATURE) {
            let qrSignature = profileResponseData.responseParameter.RESULT;
            console.log("3 GENERATEQRSIGN response handling...");
            let encodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&am=${amt}&cu=INR&mode=02&purpose=00&tn=${remarks}&orgid=159023&sign=${qrSignature}`);
            this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
              vpaDetails.base64QRCodeImage = base64EncodedQRImage;
              vpaDetails.showQrOnDynamic = true;
              setTimeout(() => {
                if (download) {
                  this.QRDownload(qrContainer);
                }
                else if (share) {
                  this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
                }
                else {
                  console.log("undefined params => download & share");
                }
              });
            }, (error) => {
              console.error('Error generating qr code ', error);
            });
          }
        }
      }, error => {
        console.log("ERROR!", error);
      });
    }
  }

  /**
   * get generate singature after generating static QR
   * @param data 
   */
  generateSignature(vpaDetails, qrContainer?: string) {
    let payeeName = vpaDetails.accounts.find(function (account) { return account['isDefaultAccount'] == 'Y' }).custName;
    console.log('payeeName', payeeName);
    let qrCodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&cu=INR&mode=02&purpose=00&orgid=159023`);
    this.myprofileservice.getUserLocation();
    var reqParams = this.myprofileservice.getGenSigParam(qrCodeText);

    this.http.callBankingAPIService(reqParams, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log('success', data);
      let profileResponseData = data.responseParameter.upiResponse;
      if (data.responseParameter.opstatus == "00" && profileResponseData.status == "00") {
        //success handler
        console.log('profileResponseData => ', profileResponseData);
        if (profileResponseData.subActionId == this.constant.upiserviceName_GENERATEQRSIGNATURE) {
          let qrSignature = profileResponseData.responseParameter.RESULT;
          console.log("4 GENERATEQRSIGN response handling...");
          let encodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&cu=INR&mode=02&purpose=00&orgid=159023&sign=${qrSignature}`);
          this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
            vpaDetails.base64QRCodeImage = base64EncodedQRImage;
          }, (error) => {
            console.error('Error generating qr code ', error);
          })
        }
      } else {
        if (profileResponseData.subActionId == this.constant.upiserviceName_GENERATEQRSIGNATURE) {
          let qrSignature = profileResponseData.responseParameter.RESULT;
          console.log("5 GENERATEQRSIGN response handling...");
          let encodeText = encodeURI(`upi://pay?pa=${vpaDetails.paymentAddress}&pn=${payeeName}&cu=INR&mode=02&purpose=00&orgid=159023`);
          this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
            vpaDetails.base64QRCodeImage = base64EncodedQRImage;
          }, (error) => {
            console.error('Error generating qr code ', error);
          })
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }

  generateFirstStaticQR(vpaAddressList) {
    console.log("Inside generateFirstStaticQR...");
    let firstVpaDetails = vpaAddressList[0];
    if (this.dataService.isCordovaAvailable && !firstVpaDetails?.base64QRCodeImage) {
      let payeeName = firstVpaDetails.accounts.find(function (account) { return account['isDefaultAccount'] == 'Y' }).custName;
      console.log('payeeName', payeeName);
      //TODO : generate signature api needed form MW Team fo sign
      let encodeText = encodeURI(`upi://pay?pa=${firstVpaDetails.paymentAddress}&pn=${payeeName}&cu=INR&mode=02&purpose=00&orgid=159023`);
      this.pluginService.generateQRCode('TEXT_TYPE', encodeText, this.constant.QRErrorCorrectLevel.L).then((base64EncodedQRImage) => {
        firstVpaDetails.base64QRCodeImage = base64EncodedQRImage;
        firstVpaDetails.isDynSelected = false;
        firstVpaDetails.showQrOnDynamic = true;
        firstVpaDetails.isQRDisabled = firstVpaDetails.vpaQrFlag == 'Y' ? false : true;
        // setTimeout(() => {
        //   if (download) {
        //     this.QRDownload(qrContainer);
        //   } else if (share) {
        //     this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
        //   } else {
        //     console.log("undefined params => download & share");
        //   }
        // })
        this.generateSignature(firstVpaDetails);
      }, (error) => {
        console.error('Error generating qr code ', error);
      })
    }
  }

  /**
   * get current Active slide of carousel
   * @param data 
   */
  getData(data: SlidesOutputData) {
    console.log("getData..");
    console.log(data);
    this.activeSlides = data;
    let index = this.activeSlides.startPosition;
    console.log('index', index);
    // this.profileVpaAddressList[index].isDynSelected = false;
    // this.myProfileForm.reset('');
    console.log(this.activeSlides.startPosition);
    this.profileVpaAddressList = this.dataService.vpaAddressList.map((vpaDetails: any) => {
      vpaDetails.isDynSelected = false;
      vpaDetails.showQrOnDynamic = true;
      this.slideDynamicSectionByIdx(vpaDetails, index);
      return vpaDetails;
    });
    setTimeout(() => {
      console.log("inside timeout...");
      console.log(this.profileVpaAddressList[index]);
      if (!this.profileVpaAddressList[index]?.base64QRCodeImage) {
        this.resetQR(this.profileVpaAddressList[index], this.activeSlides.startPosition);
      }
    })

    // if (this.profileVpaAddressList[index].isDynSelected) {
    //   $('.owl-dots').css({ "top": "574px" });
    // } else {
    //   $('.owl-dots').css({ "top": "400px" });
    // }
    //this.getQRCode(this.activeSlides.startPosition);
  }

  /**
   * Download Generated QRCode
   * @param vpaDetails 
   * @param qrContainer 
   */
  validateQRForDownload(vpaDetails, qrContainer) {
    if (this.isAmountLimitExceeded) {
      this.information = this.translate.transform('ENTER_AMOUNT_LESS_THAN_ONE_LAKH');
      this.showPopup('show-profile-info');
      return;
    }
    if (vpaDetails.isDynSelected) {
      this.myProfileForm.markAllAsTouched();
      if (this.myProfileForm.valid) {
        this.pageLoaderService.showLoader();
        this.QRDownload(qrContainer);
      }
    } else {
      this.pageLoaderService.showLoader();
      // this.generateStaticQR(vpaDetails, qrContainer, true, false);
      this.QRDownload(qrContainer);
    }
  }

  /**
   * Download QR Code
   * @param qrContainer 
   */
  QRDownload(qrContainer) {
    // First we get our section to save from dom
    let section = document.querySelector('#' + qrContainer);
    //let section = document.getElementById('#' + qrContainer);
    var filename = "qrCode" + "_" + Date.now() + '.png';
    console.log('filename', filename);
    // We pass that section to html2Canvas
    console.log(section);
    this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
      console.log(base64Image);
      if (base64Image) {

        this.pageLoaderService.hideLoader();
        //this.showCommonToastMsgWithKey("QR_DOWNLOADED_SUCCESSFULLY", 'success'); 
        var block = base64Image.split(";");
        var dataType = block[0].split(":")[1];// In this case "image/png"
        var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."
        var msgKey = this.translate.transform("QR_DOWNLOADED_SUCCESSFULLY");
        this.commonMethod.savebase64AsImageFile(filename, realData, dataType, msgKey, 'success');
        //this.commonMethod.savebase64AsImageFile(filename, base64Image, "application/pdf", msgKey, 'success');
      } else {
        this.pageLoaderService.hideLoader();
        console.log("ELSE BASE64 not found!");
      }
    }, (err) => {
      this.pageLoaderService.hideLoader();
      console.log("convertHtmlToImage ERROR", err);
    });
  }

  /**
   * Share Generated QRCode via available methods in device
  */
  validateQRForShare(vpaDetails, qrContainer) {
    if (this.isAmountLimitExceeded) {
      this.information = this.translate.transform('ENTER_AMOUNT_LESS_THAN_ONE_LAKH');
      this.showPopup('show-profile-info');
      return;
    }
    if (vpaDetails.isDynSelected) {
      this.myProfileForm.markAllAsTouched();
      if (this.myProfileForm.valid) {
        this.pageLoaderService.showLoader();
        this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
      }
    } else {
      this.pageLoaderService.showLoader();
      this.shareQRCode(vpaDetails.paymentAddress, qrContainer);
    }
  }

  /**
   * Share QR Code 
   * @param paymentAddress 
   * @param qrContainer 
   */
  shareQRCode(paymentAddress, qrContainer) {
    let section = document.querySelector('#' + qrContainer);
    console.log("inside shareQRCode ====>" + section);
    // var filename = "qrCode" + "_" + Date.now() + '.png';
    this.commonMethod.convertHtmlToImage(section).subscribe((base64Image) => {
      if (this.dataService.isCordovaAvailable) {
        this.pageLoaderService.hideLoader();
        var filename = paymentAddress + "_QRCode_" + Date.now();
        this.commonMethod.shareImage(filename, base64Image);
      }
    });
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

  /**
   * Make Default VPA Api Call
   * @param vpaDetails 
   */
  makeVpaDefault(vpaDetails) {
    this.myprofileservice.getUserLocation();
    var reqParams = this.myprofileservice.setDefaultVpaRequestObject(vpaDetails);
    this.UpiApiCall(reqParams);
  }

  /**
   * delete vpa by paymentAdress Api call
   * @param paymentAddress 
   */
  deleteVpaAdd(paymentAddress) {
    this.closePopup('deleteVpaConfirmationPopup')
    this.myprofileservice.getUserLocation();
    var reqParams = this.myprofileservice.deletePaymentAddressRequestObject(paymentAddress);
    this.UpiApiCall(reqParams);
  }

  /**
   * getPayment Adress List
   */
  getPaymentAddList() {
    this.myprofileservice.getUserLocation();
    var reqParams = this.myprofileservice.getPaymentAddressListRequestObject();
    this.UpiApiCall(reqParams);
  }

  /**
   * copy text in clipboard
   * @param paymentAddress 
   */
  copyToClipboard(paymentAddress) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (paymentAddress));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.showCommonToastMsgWithKey("UPI_ID_COPIED_TO_CLIPBOARD", 'success');
  }

  /**
   * Common UPI Api call
   * @param reqParams 
   */
  UpiApiCall(reqParams, isRefreshed?) {
    this.http.callBankingAPIService(reqParams, this.localStorageService.getLocalStorage(this.constant.storage_deviceId), this.constant.upiserviceName_PROCESSUPISERVICESESSION, true).subscribe(data => {
      console.log('success', data);
      let profileResponseData = data.responseParameter.upiResponse;
      if (data.responseParameter.opstatus == "00" && profileResponseData.status == "00") {
        //success handler
        console.log('profileResponseData => ', profileResponseData);
        switch (profileResponseData.subActionId) {
          case this.constant.upiserviceName_SETDEFAULTVPA:
            console.log("SETDEFAULTVPA response handling...");
            this.fetchVPAAdressList(true);
            break;

          case this.constant.upiserviceName_GETPAYMENTADDRESSLISTDETAILS:
            console.log("GETPAYMENTADDRESSLISTDETAILS response handling...");
            this.dataService.vpaAddressList = this.dataService.processVPAlist(profileResponseData.responseParameter.addresslist);
            //this.profileVpaAddressList = this.dataService.vpaAddressList;
            this.profileVpaAddressList = this.dataService.vpaAddressList.map((vpaDetails: any) => {
              vpaDetails.isDynSelected = false;
              vpaDetails.showQrOnDynamic = true;
              vpaDetails.isQRDisabled = vpaDetails.vpaQrFlag == 'Y' ? false : true;
              this.generateStaticQR(vpaDetails);
              return vpaDetails;
            });
            this.defaultVpaMove(this.profileVpaAddressList);
            setTimeout(() => {
              if (isRefreshed) {
                this.owlCar.to(this.vpaIndex.toString())
              }
            })
            break;
          case this.constant.upicheck_UPDATEPAYMENTADDRESS:
            console.log("SETDEFAULTVPA response handling...");
            // this.fetchVPAAdressList(true);
            break;
          case this.constant.upiserviceName_GENERATEQRSIGNATURE:
            console.log("1 GENERATEQRSIGN response handling...");
            // this.fetchVPAAdressList(true);
            break;
          case this.constant.upiserviceName_DELETEPAYMENTADDRESS:
            this.dataService.vpaAddressList = [];
            this.dataService.deleteVpaObj = profileResponseData;
            this.dataService.deleteVpaObj.paymentAddress = this.popupData.paymentAddress;

            this.goToPage('deleteSuccess');
            break;

          default:
            console.log("default case subActionId => ", profileResponseData.subActionId);
            break;
        }
      }
    }, error => {
      console.log("ERROR!", error);
    });
  }


  /**
   * Route page by route name
   */
  goToPage(routeName, vpaDtls?: any) {
    if (routeName == 'createUpi') {
      if (this.dataService.vpaAddressList.length > 0) {
        //User has existing VPAs, check length & default VPA
        if (this.dataService.vpaAddressList.length == 3) {
          //Max Limit reached, navigate to upiRegSuccess
        } else {
          if (this.dataService.vpaAddressList.some(vpaDetails => vpaDetails.default === 'Y')) {
            //navigate to createUPI with defaultVPAflag set to no
            this.dataService.createDefaultVPAFlag = false;
          } else {
            //navigate to createUPI with defaultVPAflag set to yes
            this.dataService.createDefaultVPAFlag = true;
          }
        }
      } else {
        //user has no VPAs, navigate to createUPI with defaultVPAflag set to yes
        this.dataService.createDefaultVPAFlag = true;
      }
    }
    if (routeName == 'manageAccounts') {
      console.log(vpaDtls);
      this.dataService.isSetVpaDtl = true;
      this.dataService.vpaDtls = vpaDtls;
    }
    // this.router.navigateByUrl('/' + routeName);
    this.dataService.routeWithNgZone(routeName);
  }

  /**
   * toggle dynamic QR
   */
  OnToggle(vpaDetails, index) {
    if(this.initAmount){
      $('#amt').autoNumeric('init', {aSign: "₹ "});
      this.initAmount = false;
    }

    this.slideDynamicSectionByIdx(vpaDetails, index);
    vpaDetails.showQrOnDynamic = vpaDetails.isDynSelected == true ? false : true;
  }

  /**
   * On disable click
   * @param vpaDetails 
   * @param index 
   */
  onDisable(vpaDetails, index) {
    if (vpaDetails.isQRDisabled) {
      vpaDetails.isDynSelected = false;
      vpaDetails.showQrOnDynamic = true;
    }
    vpaDetails.vpaQrFlag = vpaDetails.isQRDisabled == true ? 'N' : 'Y';
    this.vpaIndex = index;
    this.slideDynamicSectionByIdx(vpaDetails, index);
    var param = this.myprofileservice.getUpdatePaymentAddressAPICall(vpaDetails.paymentAddress, vpaDetails.isQRDisabled);
    // this.dashboardAPICall(param);
    this.UpiApiCall(param, true)
  }

  /**
   * Slide up/down dynamic content
   * @param vpaDetails 
   * @param index 
   */
  slideDynamicSectionByIdx(vpaDetails, index) {
    if (vpaDetails.isDynSelected) {
      $('.inner2.dynamicCnt_' + index).slideDown();
      // $('.owl-dots').css({ "top": "547px" });
    } else {
      $('.inner2.dynamicCnt_' + index).slideUp();
      // $('.owl-dots').css({ "top": "400px" });
    }
    this.myProfileForm.reset('');
  }

  /**
   * set update currency value
   * @param value 
   */
  // onInput(value) {
  //   if (value == '0') {
  //     if (this.myProfileForm.contains('amount')) this.myProfileForm.get('amount').reset();
  //     return;
  //   }
  //   // if (value != '') {
  //   if (parseInt(value) <= 100000) {
  //     let updatedCurrency = this.customCurrencyPipe.transform(value.trim(), 'noDecimal').replace(/(\.[0-9]*?)0+/g, '');
  //     this.myProfileForm.patchValue({ amount: "₹" + updatedCurrency });
  //     // this.amountInWords = this.commonMethod.convertNumberToWords(value);
  //   } else {
  //     // this.amountInWords ="";
  //     this.myProfileForm.get('amount').reset('');
  //   }
  // }

  /**
  * set update currency value
  * @param value 
  */
  formatCurrency(value, vpaDetails) {
    let amt = $('#amt').val().replace(/[^.0-9]+/g, '');
    if (Number(amt) > 100000) {
      this.isAmountLimitExceeded = true;
    } else {
      this.isAmountLimitExceeded = false;
    }
    this.formValidation.formatDynamicCurrency('amt',this.myProfileForm);

    vpaDetails.showQrOnDynamic = vpaDetails.isDynSelected == true ? false : true;
  }

  /**	
   * Show Toast message with multilingual	
   * @param msgKey 	
   * @param toastColor 	
   */
  showCommonToastMsgWithKey(msgKey, toastColor) {
    showToastMessage(this.translate.transform(msgKey), toastColor)
  }

  /**
   * updating remarks value for base64 image 
   * @param value 
   */
  updateRemarkVal(value, vpaDetails) {
    if (value) {
      this.myProfileForm.patchValue({ remarks: value });
      vpaDetails.showQrOnDynamic = vpaDetails.isDynSelected == true ? false : true;
    }
  }
  resetQR(vpaDetails, index) {
    console.log(vpaDetails, index);
    this.myProfileForm.reset('');
    vpaDetails.isDynSelected = false;
    vpaDetails.showQrOnDynamic = true;
    vpaDetails.isQRDisabled = vpaDetails.vpaQrFlag == 'Y' ? false : true;
    this.generateStaticQR(vpaDetails);
    this.slideDynamicSectionByIdx(vpaDetails, index);
  }

  routeTo(location) {
    console.log('location', location);
    this.ngZone.run(() => {
      this.router.navigateByUrl(location);
    })
  }


  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;
 
    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }
 
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.otpSessionForm.get(this.otpFormInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }
 
  }
 
  onFocusEvent(index: any, type: any) {
 
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }
 
  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.otpPinRows._results[index].nativeElement;
    }
  }
}
