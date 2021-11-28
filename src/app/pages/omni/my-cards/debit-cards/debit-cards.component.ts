import { Component, Input, OnInit , ViewChildren} from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { DebitCardsService } from './debit-cards.service'
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
declare var showToastMessage: any;
declare var debitCardScript:any;
declare var $: any;
import { getCurrencySymbol } from '@angular/common';

declare var OSREC: any;

@Component({
  selector: 'app-debit-cards',
  templateUrl: './debit-cards.component.html',
  styleUrls: ['./debit-cards.component.scss']
})
export class DebitCardsComponent implements OnInit {
  topForm: FormGroup;
  DomesticForm: FormGroup;

  @ViewChildren('otpRow') otpRow: any;
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];
  InternationalForm: FormGroup;
  otpFormLimit: FormGroup;
  accountCarouselOptions: OwlOptions;
  countDown: Subscription;
  activeTab="fixed0";
  accountList:any;
  multipleAccounts:any = '';
  cardsData=[];
  currDebitCardNo:any;
  selCurrentCardAccount:any;
  currentCard:any;
  CVV:any = 'XXX';
  succRes:any = "";
  errRes:any = "";
  sliderData:any;
  colData:boolean = true;
  colDataInt:boolean = true;
  refresh:boolean = true;
  showDebitForm = false;
  posDom:boolean = true;
  posDomInput:boolean = false;
  ecomDom:boolean = true;
  ecomDomInput:boolean = false;
  atmDom:boolean = true;
  mobileshowCardlimit:boolean =false
  desktopshowCardlimit:boolean =false
  atmDomInput:boolean = false;
  contactlessDom:boolean = true;
  contactlessDomInput:boolean = false;
  posInt:boolean = true;
  posIntInput:boolean = false;
  ecomInt:boolean = true;
  ecomIntInput:boolean = false;
  atmInt:boolean = true;
  atmIntInput:boolean = false;
  contactlessInt:boolean = true;
  contactlessIntInput:boolean = false;
  noCardAvailable: boolean = false;
  inactiveCard: boolean = false;
  blocked:boolean = false;
  isPhysical:boolean = false;
  internationalNotCard:boolean = false;
  activeSlides: SlidesOutputData;
  slidesStore: any[];
  otpfailMsg:any;
  buttonDisabled:boolean = true;
  maskedMobileNo: any;
  counter = 120 ;
  tick = 1000;
  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    public constant: AppConstants,
    private form: FormBuilder,
    private debitService: DebitCardsService,
    private location: Location,
    private translate: TranslatePipe
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.maskedMobileNo = this.maskCharacter(this.storage.getLocalStorage(this.constant.storage_mobileNo), 4);
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('DEBIT_CARDS' , this.router.url)

    // var dom = (<HTMLInputElement>document.getElementById("posdom")).value;
    // console.log(dom);

    this.topForm = new FormGroup({
      quickLock: new FormControl(false),
      domesticUsage: new FormControl(true),
      internationalUsage: new FormControl(true),
    });

   
    this.DomesticForm = new FormGroup({
      pos: new FormControl(true),
      pos_dom_val: new FormControl(0),
      ecom: new FormControl(true),
      ecom_dom_val: new FormControl(0),
      atm: new FormControl(true),
      atm_dom_val: new FormControl(0),
      contactLess: new FormControl(true),
      contact_dom_val: new FormControl(0),
    });

    this.InternationalForm = new FormGroup({
      pos1: new FormControl(true),
      pos_int_val: new FormControl(0),
      ecom1: new FormControl(true),
      ecom_int_val: new FormControl(0),
      atm1: new FormControl(true),
      atm_int_val: new FormControl(0),
      contactLess1: new FormControl(true),
      contact_int_val: new FormControl(0),
    });
  }
 
  initialize(){
    this.buildForm();
    var backUrl = this.constant.getPlatform() == 'web' ? 'dashboard' : 'dashboardMobile';
    history.pushState({},backUrl,this.location.prepareExternalUrl(backUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));
    //console.log(this.dataService.customerAccountList);
    this.accountCarouselOptions = this.dataService.getAccountCarouselOptions();

    this.dataService.setPageSettings('Debit Cards');
    console.log("sliderData =====> ",this.sliderData);
    debitCardScript(this.sliderData);

    this.accountList = this.dataService.customerAccountList;
    console.log(this.accountList);
    this.dataService.transactionReceiptObj.amount = null;

    var mystring = '';

    this.accountList.forEach(function (value,index) {
      if(index > 0){
        mystring += ','+value.accountNo;
      }else{
        mystring += value.accountNo;
      }
    });

    this.multipleAccounts = mystring;
    // this.accountList.forEach(el => {
    //   el.myvar = "test";
    // });
    // console.log(this.accountList);

    this.getDebitCardList();
    //this.getCvv();

    // let num = [7, 8, 9];
    // num.forEach(function (value,index) {
    //   console.log(value);
    //   console.log(index);
    //   if(index > 0){
    //     mystring += ','+value;
    //   }else{
    //     mystring += value;
    //   }
    //   //console.log(mystring);
    // });
    //console.log(mystring);
    //let test = num.join("+");
    //console.log(test);

    //var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.interestCertificateForm.value.accNo );

  }
  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    return ('' + str).slice(0, -n).replace(/./g, 'X') + ('' + str).slice(-n);
  }
  onKeyUpEventOtp(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElementOtp(index, type).value.length === 1) {
      if (index !== 6) {
        this.getSpasswordElementOtp(index + 1, type).focus();
      } else {
        this.getSpasswordElementOtp(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElementOtp(index - 1, type).focus();
    }
    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
       
          this.otpFormLimit.get(this.otpInput[index])?.setValue("");
      
        this.getSpasswordElementOtp(index - 1, type).focus();
      }
    }
  }

  onFocusEvent(index, type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElementOtp(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }
  getSpasswordElementOtp(index: any, type: any) {
  

      return this.otpRow._results[index].nativeElement;
    

  }
  closeOtpPopup(popupName, formname) {
    this.commonMethod.closePopup('div.popup-bottom');
  
      this.buttonDisabled = false;
      this.otpFormLimit.reset();
      this.counter = 120;
   

    this.otpfailMsg = "";
  }
  callOtp(type){
    this.buttonDisabled = true;
    this.otpFormLimit.reset()
    this.commonMethod.openPopup('div.otp-popuplimit');
    this.getResendOTPSession()
   }
   ResendOTP(){
    this.getResendOTPSession();
  }
  getResendOTPSession() {
    var param=this.debitService.getResendOTPSessionParam(this.constant.val_UPDATECARDLIMIT);
    let deviceID = this.storage.getLocalStorage(this.constant.storage_deviceId);
    this.getResendOTPSessionApiCall(param,deviceID)
  }

  getResendOTPSessionApiCall(param,deviceID) {
    this.http.callBankingAPIService(param,deviceID,this.constant.serviceName_RESENDOTPSESSION ).subscribe(data=>{
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        console.log(data.responseParameter);

        this.startCounter();
        this.otpFormLimit.reset();
      }
    });
  }
  startCounter(){
    this.counter = 120;
    if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
    this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
  }

  onRangeChange(event,type){

    // if(this.selCurrentCardAccount.currency == undefined) this.selCurrentCardAccount.currency = 'INR'
    // var currencySymbol = {currency: this.selCurrentCardAccount.currency, symbol: getCurrencySymbol( this.selCurrentCardAccount.currency , 'narrow') , negativePattern: '(! #)', formatWithSymbol: true}
    // //event.target.value = Number(event.target.value.trim().replace(/[^0-9]+/g, ''));
    // var rangeValueInCurrency = OSREC.CurrencyFormatter.format(event.target.value,currencySymbol );

    switch (type) {
      case 'domPosLimit':
        console.log(event.target.value);
        this.currentCard.POS_dom_limit = event.target.value;
        this.DomesticForm.patchValue({pos_dom_val: event.target.value})
        break;
      case 'domEcomLimit':
        console.log(event.target.value);
        this.currentCard.ECOM_dom_limit = event.target.value;
        this.DomesticForm.patchValue({ecom_dom_val: event.target.value})
        break;
      case 'domAtmLimit':
        console.log(event.target.value);
        this.currentCard.ATM_dom_limit = event.target.value;
        this.DomesticForm.patchValue({atm_dom_val: event.target.value})
        break;
      case 'intPosLimit':
        console.log(event.target.value);
        this.currentCard.POS_int_limit = event.target.value;
        this.InternationalForm.patchValue({pos_int_val: event.target.value})
        break;
      case 'intEcomLimit':
        console.log(event.target.value);
        this.currentCard.ECOM_int_limit = event.target.value;
        this.InternationalForm.patchValue({ecom_int_val: event.target.value})
        break;
      case 'intAtmLimit':
        console.log(event.target.value);
        this.currentCard.POS_int_limit = event.target.value;
        this.InternationalForm.patchValue({atm_int_val: event.target.value})
        break;
    }
    console.log(event);
  }


  validateOtpAddlimit(){
    if(this.otpFormLimit.valid){
    var mobileOtp =
      this.otpFormLimit.value.otp1 +
      this.otpFormLimit.value.otp2 +
      this.otpFormLimit.value.otp3 +
      this.otpFormLimit.value.otp4 +
      this.otpFormLimit.value.otp5 +
      this.otpFormLimit.value.otp6;
      var param = this.debitService.getChannelLeadOtpParamlimit(mobileOtp);
      this.http.callBankingAPIService(param,this.storage.getLocalStorage(this.constant.storage_deviceId),this.constant.serviceName_VALIDATEOTPSESSION).subscribe((data) => {
        console.log('=====validate otp=====', data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          console.log(data.responseParameter);
          this.domSubmit('domestic');
        }
         else {
          // this.errorCallBack(data.subActionId, resp);
            this.otpfailMsg =resp.Result
            this.otpFormLimit.reset();
        }
      });
    }
  }
  buildForm() {
  
    this.otpFormLimit = new FormGroup({
      otp1: new FormControl('', [Validators.required]),
      otp2: new FormControl('', [Validators.required]),
      otp3: new FormControl('', [Validators.required]),
      otp4: new FormControl('', [Validators.required]),
      otp5: new FormControl('', [Validators.required]),
      otp6: new FormControl('', [Validators.required]),
    });
  }
  


  getData(data: SlidesOutputData) {
    if(this.constant.getPlatform() !='web'){
      this.activeSlides = data;
      console.log(this.activeSlides);
      this.currentCardIndex(this.activeSlides.startPosition)
      this.dataService.currentCardIndex = this.activeSlides.startPosition
      this.activeTab='fixed'+ this.activeSlides.startPosition;
    }
  }


  backbtnClick(){
    this.location.back();
  }


  goToDashboard(){
    this.router.navigateByUrl('/dashboardMobile');
  }
  
  getDebitCardList() {

    var param = this.debitService.getDebitCardListParam(this.multipleAccounts);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CARDDETAILSBYACCOUNTNO).subscribe(data => {
      console.log(data);
      // var resp = JSON.parse(data.responseParameter.CardDetails);
      // console.log(resp);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.cardsData = JSON.parse(data.responseParameter.CardDetails);
        this.cardsData.forEach(function (value) {
          value.maskCvv = "XXX";
          value.maskValidFrom = "XX/XX";
          value.validFrom = value.ValidFrom.slice(2,4) + "/" + value.ValidFrom.slice(0,2);
          value.maskValifTo = "XX/XX";
          if(value?.ExpiryDate)
            value.validTo = value?.ExpiryDate.slice(2,4) + "/" + value?.ExpiryDate.slice(0,2);
          else
            value.validTo = "XX/XX";

          value.isMasked = true;
        });

        this.dataService.cardList = this.cardsData;
        console.log("this.cardsData" + this.cardsData);
        console.log(this.constant.getPlatform())
        if(this.cardsData.length != 0){

          this.desktopshowCardlimit = true
        }

        // if(this.cardsData.length != 0 && this.constant.getPlatform() =='web' ){

        //   this.desktopshowCardlimit = true
        // }
        // if(this.cardsData.length != 0 && this.constant.getPlatform() !='web' ){

        //   this.mobileshowCardlimit = true
        // }
        this.currDebitCardNo = this.cardsData[0].CardNo;
        this.currentCard = this.cardsData[0];
        this.selCurrentCardAccount = this.accountList.filter(v => v.accountNo === this.currentCard.AccountNo)[0];
        console.log(this.selCurrentCardAccount);//currency
        this.dataService.currentCard = this.currentCard;
        // this.isPhysical = this.currentCard.PinMailer == "P" || "G" ? true : false;

        if(this.currentCard.PinMailer == 'P' || this.currentCard.PinMailer == 'G'){
          this.isPhysical = true;
        }else{
          this.isPhysical = false;
        }

        this.DomesticForm.patchValue({
          pos_dom_val: this.currentCard.POS_dom_limit,
          ecom_dom_val: this.currentCard.ECOM_dom_limit,
          atm_dom_val: this.currentCard.ATM_dom_limit,
          contact_dom_val: this.currentCard.CONT_dom_maxlimt,
        });


        this.InternationalForm.patchValue({
          pos_int_val: this.currentCard.POS_int_limit,
          ecom_int_val: this.currentCard.ECOM_int_limit,
          atm_int_val: this.currentCard.ATM_int_limit,
          contact_int_val: this.currentCard.CONT_int_maxlimt,
        });

        this.showDebitForm = true;
        console.log(this.currentCard);
        // this.cardsData.forEach(function (value,index) {
        //   // console.log(value.ExpiryDate);
        //   // console.log(index);

        //   var num = value.ExpiryDate;
        //   let stringForm = num.toString();
        //   //console.log(stringForm);
        //   var firstTwoDigitExpiry = stringForm.slice(0, 2);
        //   var lastTwoDigitExpiry = stringForm.slice(2, 4);
        //   //console.log(firstTwoDigitExpiry);
        //   //console.log(lastTwoDigitExpiry);
        //   value.firstTwoExpiry = firstTwoDigitExpiry;
        //   value.lastTwoExpiry = lastTwoDigitExpiry;

        //   var valFromDate = value.ValidFrom;
        //   let stringValFrom = valFromDate.toString();

        //   var firstTwoDigitValidFrom = stringValFrom.slice(0, 2);
        //   var lastTwoDigitValidFrom = stringValFrom.slice(2, 4);

        //   value.firstTwoValFrom = firstTwoDigitValidFrom;
        //   value.lastTwoValFrom = lastTwoDigitValidFrom;


        // });

        // if(this.currentCard.CardState != "Active"){
        //   this.topForm.patchValue({
        //     quickLock: true,
        //     internationalUsage: false,
        //     domesticUsage: false
        //   });
        //   this.colData = false;
        //   this.colDataInt = false;
        //   this.inactiveCard = true;
        // }
      if(this.currentCard.Card_status == "1"){
        this.blocked = false;
        this.inactiveCard = false;
        this.colData = true;
        this.colDataInt = true;

        // if(this.currentCard.Is_Card_allowd_International_Transaction != null && this.currentCard.Is_Card_allowd_International_Transaction.toLowerCase() == "int"){
        //   this.internationalNotCard = true;
        // }

        if(this.currentCard.POS_dom == 'Y' ){
          this.DomesticForm.controls.pos.setValue(true);
          this.posDom = true;
          this.posDomInput = false;
        }else{
          this.DomesticForm.controls.pos.setValue(false);
          this.posDom = false;
          this.posDomInput = true;
        }

        if(this.currentCard.ECOM_dom == 'Y'){
          this.DomesticForm.controls.ecom.setValue(true);
          this.ecomDom = true;
          this.ecomDomInput = false;
        }else{
            this.DomesticForm.controls.ecom.setValue(false);
            this.ecomDom = false;
            this.ecomDomInput = true;
        }

        if(this.currentCard.ATM_dom == 'Y'){
          this.DomesticForm.controls.atm.setValue(true);
          this.atmDom = true;
          this.atmDomInput = false;
        }else{
          this.DomesticForm.controls.atm.setValue(false);
          this.atmDom = false;
          this.atmDomInput = true;
        }

        if(this.currentCard.CONT_dom == 'Y'){
          this.DomesticForm.controls.contactLess.setValue(true);
          this.contactlessDom = true;
          this.contactlessDomInput = false;
        }else{
          this.DomesticForm.controls.contactLess.setValue(false);
          this.contactlessDom = false;
          this.contactlessDomInput = true;
        }


        if(this.currentCard.POS_int == 'Y'){
          this.InternationalForm.controls.pos1.setValue(true);
          this.posInt = true;
          this.posIntInput = false;
        }else{
          this.InternationalForm.controls.pos1.setValue(false);
          this.posInt = false;
          this.posIntInput = true;
        }

        if(this.currentCard.ECOM_int == 'Y'){
          this.InternationalForm.controls.ecom1.setValue(true);
          this.ecomInt = true;
          this.ecomIntInput = false;
        }else{
          this.InternationalForm.controls.ecom1.setValue(false);
          this.ecomInt = false;
          this.ecomIntInput = true;
        }

        if(this.currentCard.ATM_int == 'Y'){
          this.InternationalForm.controls.atm1.setValue(true);
          this.atmInt = true;
          this.atmIntInput = false;
        }else{
          this.InternationalForm.controls.atm1.setValue(false);
          this.atmInt = false;
          this.atmIntInput = true;
        }

        if(this.currentCard.CONT_int == 'Y' ){
          this.InternationalForm.controls.contactLess1.setValue(true);
          this.contactlessInt = true;
          this.contactlessIntInput = false;
        }else{
          this.InternationalForm.controls.contactLess1.setValue(false);
          this.contactlessInt = false;
          this.contactlessIntInput = true;
        }

        if(this.currentCard.POS_dom == 'N' && this.currentCard.ECOM_dom == 'N' && this.currentCard.ATM_dom == 'N'){
          this.topForm.patchValue({
            domesticUsage: false
          });
          this.colData = false;
        }
        else{
          this.topForm.patchValue({ domesticUsage: true});
          this.colData = true;
        }

        if(this.currentCard.POS_int == 'N' && this.currentCard.ECOM_int == 'N' && this.currentCard.ATM_int == 'N'){
          this.topForm.patchValue({
            internationalUsage: false
          });
          this.colDataInt = false;
        }
        else{
          this.topForm.patchValue({ internationalUsage: true});
          this.colDataInt = true;
        }

        this.topForm.patchValue({ quickLock: false });
      }
      else{
        //for temporary block
        if(this.currentCard.Card_status == "3"){
          this.topForm.patchValue({ quickLock: true,domesticUsage: false,internationalUsage: false,});
          this.DomesticForm.patchValue({ pos: false, ecom: false, atm: false, contactLess: false, });
          this.InternationalForm.patchValue({ pos1: false, ecom1: false, atm1: false, contactLess1: false, });
          this.colData = false;
          this.colDataInt = false;
          this.inactiveCard = true;
          this.blocked = false;
        }
        else{
          this.topForm.patchValue({ quickLock: false,domesticUsage: false,internationalUsage: false,});
          this.DomesticForm.patchValue({ pos: false, ecom: false, atm: false, contactLess: false, });
          this.InternationalForm.patchValue({ pos1: false, ecom1: false, atm1: false, contactLess1: false, });
          this.colData = false;
          this.colDataInt = false;
          this.inactiveCard = true;
          this.blocked = true;
        }
      }

      debitCardScript(this.currentCard);
        //this.getCvv(this.currentCard);
        //console.log(this.CVV);
        // this.cardsData.forEach(el => {
        //   el.myvar = "test";
        // });
        // console.log(this.cardsData);
        if(this.cardsData.length == 0){this.noCardAvailable = true;}
      }
      else {
        this.noCardAvailable = true;
        //this.errorCallBack(data.subActionId, resp);
      }

      // var resp = data.responseParameter;

      // if (resp.opstatus == "00") {
      //   console.log(data.responseParameter);

      // }
      // else {
      //   //this.closePopUp();
      // }
    });

  }

  intSubmit(type){

    this.succRes = "",this.errRes = "";
    var data1 = {pos: this.currentCard.POS_dom == 'Y' , ecom: this.currentCard.ECOM_dom == 'Y' , atm: this.currentCard.ATM_dom == 'Y' , contactLess: this.currentCard.CONT_dom == 'Y'};
    var data= {pos1: this.InternationalForm.value.pos1, ecom1: this.InternationalForm.value.ecom1, atm1: this.InternationalForm.value.atm1, contactLess1: this.InternationalForm.value.contactLess1};
    var param = this.debitService.cardServiceOnOffParamInternational(data,data1, this.currentCard, 'N',"CARDSERVICEONOFF",);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CARDSERVICEONOFF).subscribe(res => {
      var resp = res.responseParameter;
      if(resp.opstatus == "00"){
        this.setInternationalValue();
      }
      else{
        if(resp.hasOwnProperty('errorMessage')){
          this.errRes = resp.errorMessage;
        }
        else if(resp.hasOwnProperty('Result')){
          this.errRes = resp.Result;
        }
        this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
      }
    });
  }


  setInternationalValue(){
    this.succRes = "" , this.errRes = "";
    
    this.InternationalForm.patchValue({
      pos_int_val : $('#posint').val(),
      ecom_int_val : $('#ecomint').val(),
      atm_int_val : $('#atmint').val(),
      contact_int_val : this.currentCard.CONT_int_maxlimt,
    });
 
    var paramDomLimit = this.debitService.postLimitParam(this.DomesticForm.value, this.InternationalForm.value, this.currentCard , "SETDEBITCARDLIMIT","international", !this.isPhysical );
    this.dataService.request = paramDomLimit;
    this.dataService.endPoint = this.constant.serviceName_DOMINTLIMIT;
    this.dataService.cardServiceType = "SETDEBITCARDLIMIT";
    this.dataService.transactionReceiptObj.cardNo = this.currentCard.MaskCardNumber;
    this.dataService.transactionReceiptObj.accountNumber = this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.accountNo =  this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.operation = this.translate.transform('MODIFY_CARD_LIMIT');
    this.dataService.transactionReceiptObj.cardOnOffType = '';
    this.dataService.authorizeHeader =  "Debit Card";
    this.dataService.screenType = 'debitCard';
    this.dataService.otpSessionPreviousPage = "/debitCards";
    this.router.navigate(['/otpSession']);

    // this.http.callBankingAPIService(paramDomLimit, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DOMINTLIMIT).subscribe(data => {
    //   console.log(data);
    //   var resultParse
    //   console.log(resultParse);
    //   var resp = data.responseParameter;
    //   if(data.responseParameter.responseMsg != undefined ) { resultParse = JSON.parse(data.responseParameter.responseMsg); }

    //   if(resp.opstatus == "00"){
    //     this.getDebitCardList();
    //     this.succRes = resultParse[0].description;
    //     this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
    //   }
    //   else{
    //     this.errRes = resp.errorMessage;
    //     this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
    //   }
    // });
  }

  domSubmit(type){
    this.succRes = "",this.errRes = "";
    var data1 = {pos: this.DomesticForm.value.pos , ecom: this.DomesticForm.value.ecom, atm: this.DomesticForm.value.atm, contactLess: this.DomesticForm.value.contactLess};
    var data = {pos1: this.currentCard.POS_int == 'Y' , ecom1: this.currentCard.ECOM_int == 'Y' , atm1: this.currentCard.ATM_int == 'Y' , contactLess1: this.currentCard.CONT_int == 'Y' };

    var param = this.debitService.cardServiceOnOffParamInternational(data,data1, this.currentCard,'N',"CARDSERVICEONOFF");
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CARDSERVICEONOFF).subscribe(res => {
      var resp = res.responseParameter;
      if(resp.opstatus == "00"){
        this.setDomesticValue();
      }
      else{
        if(resp.hasOwnProperty('errorMessage')){
          this.errRes = resp.errorMessage;
        }
        else if(resp.hasOwnProperty('Result')){
          this.errRes = resp.Result;
        }
        
        this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
      }
    });
  }

  setDomesticValue(){
    this.succRes = "",this.errRes = "";
    this.DomesticForm.patchValue({
      pos_dom_val : $('#posdom').val(),
      ecom_dom_val : $('#ecomdom').val(),
      atm_dom_val : $('#atmdom').val(),
      contact_dom_val : this.currentCard.CONT_dom_maxlimt,
    });
    var paramDomLimit = this.debitService.postLimitParam(this.DomesticForm.value, this.InternationalForm.value, this.currentCard , "SETDEBITCARDLIMIT","domestic", !this.isPhysical);
    
    this.dataService.request = paramDomLimit;
    this.dataService.endPoint = this.constant.serviceName_DOMINTLIMIT;
    this.dataService.cardServiceType = "SETDEBITCARDLIMIT";
    this.dataService.transactionReceiptObj.cardNo = this.currentCard.MaskCardNumber;
    this.dataService.transactionReceiptObj.accountNumber = this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.accountNo =  this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.operation = this.translate.transform('MODIFY_CARD_LIMIT');
    this.dataService.transactionReceiptObj.cardOnOffType = '';
    this.dataService.authorizeHeader =  "Debit Card";
    this.dataService.screenType = 'debitCard';
    this.dataService.otpSessionPreviousPage = "/debitCards";
    this.router.navigate(['/otpSession']);

    
    // this.http.callBankingAPIService(paramDomLimit, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DOMINTLIMIT).subscribe(data => {
    //   console.log(data);
    //   var resultParse;
    //   console.log(resultParse);
    //   var resp = data.responseParameter;
    //   if(data.responseParameter.responseMsg != undefined ) { resultParse = JSON.parse(data.responseParameter.responseMsg); }

    //   if(resp.opstatus == "00"){
    //     this.succRes = resultParse[0].description;
    //     this.getDebitCardList();
    //     this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
    //   }
    //   else{
    //     this.errRes = resp.errorMessage;
    //     this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
    //   }
    // });
  }

  setCardValue(){
    var data,data1;
    if(this.topForm.value.domesticUsage){
      data1 = {pos: this.DomesticForm.value.pos , ecom: this.DomesticForm.value.ecom, atm: this.DomesticForm.value.atm, contactLess: this.DomesticForm.value.contactLess};

    }else{
      data1 = {pos: false, ecom: false, atm: false, contactLess: false};
    }

    if(this.topForm.value.internationalUsage){
      data= {pos1: this.InternationalForm.value.pos1, ecom1: this.InternationalForm.value.ecom1, atm1: this.InternationalForm.value.atm1, contactLess1: this.InternationalForm.value.contactLess1};
    }
    else{
      data = {pos1: false, ecom1: false, atm1: false, contactLess1: false};
    }
    console.log("setCardValue");
    var param = this.debitService.cardServiceOnOffParamInternational(data,data1, this.currentCard,'N',"");
    this.onCarServiceOnOffApiCall(param);
  }



  closePopup(popup){
    // if(popup == 'div.popup-bottom.show-common-info'){
    //   this.getDebitCardList();
    // }
    this.commonMethod.closePopup(popup);
  }

  currentCardIndex(index){
    console.log(index);
    this.currentCard = this.cardsData[index];

    this.dataService.currentCard = this.currentCard;
    this.DomesticForm.patchValue({
      pos_dom_val: this.currentCard.POS_dom_limit,
      ecom_dom_val: this.currentCard.ECOM_dom_limit,
      atm_dom_val: this.currentCard.ATM_dom_limit,
      contact_dom_val: this.currentCard.CONT_dom_maxlimt,
    });


    this.InternationalForm.patchValue({
      pos_int_val: this.currentCard.POS_int_limit,
      ecom_int_val: this.currentCard.ECOM_int_limit,
      atm_int_val: this.currentCard.ATM_int_limit,
      contact_int_val: this.currentCard.CONT_int_maxlimt,
    });
    console.log(this.currentCard);
    this.selCurrentCardAccount = this.accountList.filter(v => v.accountNo === this.currentCard.AccountNo)[0];
    console.log(this.selCurrentCardAccount);//currency

    if(this.currentCard.PinMailer == 'P' || this.currentCard.PinMailer == 'G'){
      this.isPhysical = true;
    }else{
      this.isPhysical = false;
    }

    //this.isPhysical = this.currentCard.PinMailer == "P" || "G" ? true : false;
    //this.getCvv(this.currentCard);
    //console.log(this.CVV);

    if(this.currentCard.Card_status == "1"){
      this.blocked = false;
      this.inactiveCard = false;
      this.colData = true;
      this.colDataInt = true;


      console.log(!this.colData || this.isPhysical);

      if(this.currentCard.POS_dom == 'Y'){
        this.DomesticForm.controls.pos.setValue(true);
        this.posDom = true;
        this.posDomInput = false;
      }else{
        this.DomesticForm.controls.pos.setValue(false);
        this.posDom = false;
        this.posDomInput = true;
      }

      if(this.currentCard.ECOM_dom == 'Y'){
        this.DomesticForm.controls.ecom.setValue(true);
        this.ecomDom = true;
        this.ecomDomInput = false;
      }else{
        this.DomesticForm.controls.ecom.setValue(false);
        this.ecomDom = false;
        this.ecomDomInput = true;
      }

      if(this.currentCard.ATM_dom == 'Y'){
        this.DomesticForm.controls.atm.setValue(true);
        this.atmDom = true;
        this.atmDomInput = false;
      }else{
        this.DomesticForm.controls.atm.setValue(false);
        this.atmDom = false;
        this.atmDomInput = true;
      }

      if(this.currentCard.CONT_dom == 'Y'){
        this.DomesticForm.controls.contactLess.setValue(true);
        this.contactlessDom = true;
        this.contactlessDomInput = false;
      }else{
        this.DomesticForm.controls.contactLess.setValue(false);
        this.contactlessDom = false;
        this.contactlessDomInput = true;
      }


      if(this.currentCard.POS_int == 'Y'){
        this.InternationalForm.controls.pos1.setValue(true);
        this.posInt = true;
        this.posIntInput = false;
      }else{
        this.InternationalForm.controls.pos1.setValue(false);
        this.posInt = false;
        this.posIntInput = true;
      }

      if(this.currentCard.ECOM_int == 'Y'){
        this.InternationalForm.controls.ecom1.setValue(true);
        this.ecomInt = true;
        this.ecomIntInput = false;
      }else{
        this.InternationalForm.controls.ecom1.setValue(false);
        this.ecomInt = false;
        this.ecomIntInput = true;
      }

      if(this.currentCard.ATM_int == 'Y'){
        this.InternationalForm.controls.atm1.setValue(true);
        this.atmInt = true;
        this.atmIntInput = false;
      }else{
        this.InternationalForm.controls.atm1.setValue(false);
        this.atmInt = false;
        this.atmIntInput = true;
      }

      if(this.currentCard.CONT_int == 'Y'){
        this.InternationalForm.controls.contactLess1.setValue(true);
        this.contactlessInt = true;
        this.contactlessIntInput = false;
      }else{
        this.InternationalForm.controls.contactLess1.setValue(false);
        this.contactlessInt = false;
        this.contactlessIntInput = true;
      }

      if(this.currentCard.POS_dom == 'N' && this.currentCard.ECOM_dom == 'N' && this.currentCard.ATM_dom == 'N'){
        this.topForm.patchValue({
          domesticUsage: false
        });
        this.colData = false;
      }
      else{
        this.topForm.patchValue({ domesticUsage: true});
        this.colData = true;
      }

      if(this.currentCard.POS_int == 'N' && this.currentCard.ECOM_int == 'N' && this.currentCard.ATM_int == 'N'){
        this.topForm.patchValue({
          internationalUsage: false
        });
        this.colDataInt = false;
      }
      else{
        this.topForm.patchValue({ internationalUsage: true});
        this.colDataInt = true;
      }

      // if(this.currentCard.Is_Card_allowd_International_Transaction != null && this.currentCard.Is_Card_allowd_International_Transaction.toLowerCase() == "dom"){
      //   //this.internationalNotCard = true;
      //   this.topForm.patchValue({internationalUsage: false,});
      //   this.InternationalForm.patchValue({ pos1: false, ecom1: false, atm1: false, contactLess1: false, });
      //   this.colDataInt = false;
      // }

      if(this.currentCard.PinMailer == "V"){

      }

      this.topForm.patchValue({ quickLock: false });
    }
    else{
      //for temporary block
      if(this.currentCard.Card_status == "3"){
        this.topForm.patchValue({ quickLock: true,domesticUsage: false,internationalUsage: false,});
        this.DomesticForm.patchValue({ pos: false, ecom: false, atm: false, contactLess: false, });
        this.InternationalForm.patchValue({ pos1: false, ecom1: false, atm1: false, contactLess1: false, });
        this.colData = false;
        this.colDataInt = false;
        this.inactiveCard = true;
        this.blocked = false;
      }
      else{
        this.topForm.patchValue({ quickLock: false,domesticUsage: false,internationalUsage: false,});
        this.DomesticForm.patchValue({ pos: false, ecom: false, atm: false, contactLess: false, });
        this.InternationalForm.patchValue({ pos1: false, ecom1: false, atm1: false, contactLess1: false, });
        this.colData = false;
        this.colDataInt = false;
        this.inactiveCard = true;
        this.blocked = true;
      }
    }

    debitCardScript(this.currentCard);

    console.log("colData =====>"+this.colData);
    console.log("colDataInt ====>"+this.colDataInt);
    if(this.colData == false){
      $('#collapse1').slideUp();
      $('#collapse1').parent().removeClass('active')
    }

    if(this.colDataInt == false){
      $('#collapse2').slideUp();
      $('#collapse2').parent().removeClass('active')
    }

  }

  // onPercentChange(percent) {
  //   console.log('here');
  //   console.log(percent);
  //   //this.percent = percent;
  // }

  domUsage(val){
    console.log(val);
    if(val.domesticUsage == true){
      this.colData = true;
      var data = {pos: true, ecom: true, atm: true, contactLess: true};
    }
    else{
      this.colData = false;
      var data = {pos: false, ecom: false, atm: false, contactLess: false};
    }
    var param = this.debitService.cardServiceOnOffParamDomestic(data, this.currentCard);
    this.onCarServiceOnOffApiCall(param);
  }

  cardOnOffUsage(val,type){
    console.log(val);
    var data,data1;
    var servieType = ""
    if(val.internationalUsage == true){

      this.colDataInt = true;
      if(!this.isPhysical){
        data = {pos1: false, ecom1: true, atm1: false, contactLess1: false};
      }
      else{
        data = {pos1: true, ecom1: true, atm1: true, contactLess1: true};
      }
      if(type == "international" ) servieType = 'CARDINTERNATIONALON'

    }else{
      this.colDataInt = false;
      data = {pos1: false, ecom1: false, atm1: false, contactLess1: false};
      if(type == "international" ) servieType = 'CARDINTERNATIONALOFF'
    }

    if(val.domesticUsage){
      this.colData = true;
      if(!this.isPhysical){
        data1 = {pos: false, ecom: true, atm: false, contactLess: false};
      }
      else{
        data1 = {pos: true, ecom: true, atm: true, contactLess: true};
      }
      if(type == "domestic" )  servieType = 'CARDDOMESTICON';
    }
    else{
      this.colData = false;
      data1 = {pos: false, ecom: false, atm: false, contactLess: false};
      if(type == "domestic" )  servieType = 'CARDDOMESTICOFF';
    }

    var param = this.debitService.cardServiceOnOffParamInternational(data,data1, this.currentCard,'Y' , servieType);

    this.dataService.request = param;
    this.dataService.screenType = 'debitCard';
    this.dataService.endPoint = this.constant.serviceName_CARDSERVICEONOFF;
    this.dataService.cardServiceType = "CARDSERVICEONOFF";
    this.dataService.transactionReceiptObj.cardNo = this.currentCard.MaskCardNumber;
    this.dataService.transactionReceiptObj.accountNumber = this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.accountNo =  this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.operation = type == 'domestic' ? this.translate.transform('DOMESTIC_VALUE_MODIFICATION') : this.translate.transform('INTERNATIONAL_VALUE_MODIFICATION');
    this.dataService.transactionReceiptObj.cardOnOffType = type;
    this.dataService.transactionReceiptObj.cardOperationType = type == 'domestic' ? (val.domesticUsage == true ? 'active' : 'inactive' ) : (val.internationalUsage == true ? 'active' : 'inactive' );
    this.dataService.authorizeHeader =  "Debit Card";
    this.dataService.otpSessionPreviousPage = "/debitCards";
    this.router.navigate(['/otpSession']);

    //card on off services
    //this.onCarServiceOnOffApiCall(param);
  }

  onCarServiceOnOffApiCall(param){
    this.succRes = "",this.errRes = "";
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CARDSERVICEONOFF).subscribe(res => {
      console.log(res);
      var resp = res.responseParameter;
      var resultParse;
      if(res.responseParameter.responseMsg != undefined ) { resultParse = JSON.parse(res.responseParameter.responseMsg); }

      if(resp.opstatus == "00"){
        this.toggleClass()
        this.getDebitCardList();
        this.succRes = resultParse[0].description;
        this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
      }
      else{
        this.errRes = resp.errorMessage;
        this.commonMethod.openPopup('div.popup-bottom.show-success-error-info');
      }
    });
  }

  toggleClass(){

    if(this.topForm.value.domesticUsage){
      $('#collapse1').slideDown();
      $('#collapse1').parent().addClass('active')
    }else{
      $('#collapse1').slideUp();
      $('#collapse1').parent().removeClass('active')
    }

    if(this.topForm.value.internationalUsage){
      $('#collapse2').slideDown();
      $('#collapse2').parent().addClass('active')
    }else{
      $('#collapse2').slideUp();
      $('#collapse2').parent().removeClass('active')
    }

  }


  lock(val){
    if(val.quickLock == true){
      var cardStatus = 3;
    }else{
      var cardStatus = 1;
    }
    this.dataService.resetTransactionObj();
    var paramLock = this.debitService.lockParam(this.currentCard, cardStatus , "TEMPORARYBLOCKCARD");
    this.dataService.request = paramLock;
    this.dataService.endPoint = this.constant.serviceName_BLOCKCARD;
    this.dataService.cardServiceType = "CARDSERVICEONOFF";
    this.dataService.transactionReceiptObj.cardNo = this.currentCard.MaskCardNumber;
    this.dataService.transactionReceiptObj.accountNumber = this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.accountNo =  this.currentCard.AccountNo;
    this.dataService.transactionReceiptObj.operation = cardStatus == 3 ? "Temporary Block" : "Active";
    this.dataService.transactionReceiptObj.cardOnOffType = "";
    this.dataService.authorizeHeader =  "Debit Card";
    this.dataService.screenType = 'debitCard';
    this.dataService.otpSessionPreviousPage = "/debitCards";
    this.router.navigate(['/otpSession']);

    //   this.http.callBankingAPIService(paramLock, this.storage.getLocalStorage(this.constant.storage_deviceId), this.serviceName_BlockCard).subscribe(res => {
    //     console.log(res);
    //     var resultParse = JSON.parse(res.responseParameter.responseMsg);
    //     console.log(resultParse);
    //     var resp = res.responseParameter;

    //     if(resp.opstatus == "00"){
    //       if(val.quickLock == true){
    //         this.inactiveCard = true;
    //         this.colData = false;
    //         this.colDataInt = false;
    //         this.DomesticForm.setValue({
    //           "pos":false,
    //           "ecom":false,
    //           "atm":false,
    //           "contactLess":false
    //         });
    //         this.posDom = false;
    //         this.posDomInput = true;
    //         this.ecomDom = false;
    //         this.ecomDomInput = true;
    //         this.atmDom = false;
    //         this.atmDomInput = true;
    //         this.contactlessDom = false;
    //         this.contactlessDomInput = true;

    //         this.InternationalForm.setValue({
    //           "pos1":false,
    //           "ecom1":false,
    //           "atm1":false,
    //           "contactLess1":false
    //         });
    //         this.posInt = false;
    //         this.posIntInput = true;
    //         this.ecomInt = false;
    //         this.ecomIntInput = true;
    //         this.atmInt = false;
    //         this.atmIntInput = true;
    //         this.contactlessInt = false;
    //         this.contactlessIntInput = true;
    //       }
    //       else{

    //       }
    //       this.getDebitCardList();
    //       this.succRes = resultParse[0].description;
    //       this.commonMethod.openPopup('div.popup-bottom.show-common-info');
    //     }
    //   });

  }

  collapseData(){
    if(this.topForm.value.domesticUsage){
      $('#collapse1').slideDown();
      $('#collapse1').parent().addClass('active')
    }else{
      $('#collapse1').slideUp();
      $('#collapse1').parent().removeClass('active')
    }
  }

  collapseDataInt(){
    if(this.topForm.value.internationalUsage){
      $('#collapse2').slideDown();
      $('#collapse2').parent().addClass('active')
    }else{
      $('#collapse2').slideUp();
      $('#collapse2').parent().removeClass('active')
    }
  }

  getCvv(currCard,index){
    console.log(currCard);
    var paramCvv = this.debitService.getCvvParam(currCard);
    this.http.callBankingAPIService(paramCvv, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DEBITCARDCVV).subscribe(data => {
      console.log(data);
      var cvvData = data.responseParameter.CVVDetails;
      //this.CVV = data.responseParameter.CVVDetails;
      var actualCVV = cvvData.slice(4, 7);
      this.cardsData[index].cvv = actualCVV;
      this.CVV = actualCVV;
      //return data.responseParameter.CVVDetails;
    });
  }

  refreshBtn(cardData,index){
    console.log(cardData);
    if(cardData.isMasked){
      this.currentCardIndex(index);
      console.log(this.dataService.currentCard);
      if(this.dataService.currentCard.Card_status== "1"){
        this.getCvv(this.currentCard,index);
        cardData.isMasked = false;
      }
      else{
        this.commonMethod.openPopup('div.popup-bottom.inactive-card');
      }
      
    }else{
      cardData.isMasked = true;
    }

  }

  posDomCheck(val){
    console.log(val);
    if(val.pos == true){
      this.posDom = true;
      this.posDomInput = false;
    }else{
      this.posDom = false;
      this.posDomInput = true;
    }
  }

  inputChanged(currentVal , type){

    // if(+currentVal > +maxLimit){
    //   (document.getElementById(sliderID) as HTMLInputElement).value = maxLimit;
    // }
    // if(this.selCurrentCardAccount.currency == undefined) this.selCurrentCardAccount.currency = 'INR'
    // var currencySymbol = {currency: this.selCurrentCardAccount.currency, symbol: getCurrencySymbol( this.selCurrentCardAccount.currency , 'narrow') , negativePattern: '(! #)', formatWithSymbol: true}
    // var currencyValue
    //var currentVal = Number(value.trim().replace(/[^0-9]+/g, ''));
    //var currentVal = value;

    switch (type) {
      case 'domPosLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.POS_dom_maxlimit) currentVal = this.currentCard.POS_dom_maxlimit;
        this.currentCard.POS_dom_limit = currentVal;
        //currencyValue = OSREC.CurrencyFormatter.format(currentVal,currencySymbol );
        this.DomesticForm.patchValue({pos_dom_val: currentVal})
        break;
      case 'domEcomLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.ECOM_dom_maxlimit) currentVal = this.currentCard.ECOM_dom_maxlimit;
        this.currentCard.ECOM_dom_limit = currentVal;
        this.DomesticForm.patchValue({ecom_dom_val: currentVal})
        break;
      case 'domAtmLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.ATM_dom_maxlimit) currentVal = this.currentCard.ATM_dom_maxlimit;
        this.currentCard.ATM_dom_limit = currentVal;
        this.DomesticForm.patchValue({atm_dom_val: currentVal})
        break;
      case 'intPosLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.POS_int_maxlimit) currentVal = this.currentCard.POS_int_maxlimit;
        this.currentCard.POS_int_limit = currentVal;
        this.InternationalForm.patchValue({pos_int_val: currentVal})
        break;
      case 'intEcomLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.ECOM_int_maxlimit) currentVal = this.currentCard.ECOM_int_maxlimit;
        this.currentCard.ECOM_int_limit = currentVal;
        this.InternationalForm.patchValue({ecom_int_val: currentVal})
        break;
      case 'intAtmLimit':
        console.log(currentVal);
        if(currentVal > this.currentCard.ATM_int_maxlimit) currentVal = this.currentCard.ATM_int_maxlimit;
        this.currentCard.ATM_int_limit = currentVal;
        this.InternationalForm.patchValue({atm_int_val: currentVal})
        break;
    }
    console.log(currentVal);

  }

  ecomDomCheck(val){
    console.log(val);
    if(val.ecom == true){
      this.ecomDom = true;
      this.ecomDomInput = false;
    }else{
      this.ecomDom = false;
      this.ecomDomInput = true;
    }
  }

  atmDomCheck(val){
    console.log(val);
    if(val.atm == true){
      this.atmDom = true;
      this.atmDomInput = false;
    }else{
      this.atmDom = false;
      this.atmDomInput = true;
    }
  }

  contactlessDomCheck(val){
    console.log(val);
    if(val.contactLess == true){
      this.contactlessDom = true;
      this.contactlessDomInput = false;
    }else{
      this.contactlessDom = false;
      this.contactlessDomInput = true;
    }
  }

  posIntCheck(val){
    console.log(val);
    if(val.pos1 == true){
      this.posInt = true;
      this.posIntInput = false;
    }else{
      this.posInt = false;
      this.posIntInput = true;
    }
  }

  ecomIntCheck(val){
    console.log(val);
    if(val.ecom1 == true){
      this.ecomInt = true;
      this.ecomIntInput = false;
    }else{
      this.ecomInt = false;
      this.ecomIntInput = true;
    }
  }

  atmIntCheck(val){
    console.log(val);
    if(val.atm1 == true){
      this.atmInt = true;
      this.atmIntInput = false;
    }else{
      this.atmInt = false;
      this.atmIntInput = true;
    }
  }

  contactlessIntCheck(val){
    console.log(val);
    if(val.contactLess1 == true){
      this.contactlessInt = true;
      this.contactlessIntInput = false;
    }else{
      this.contactlessInt = false;
      this.contactlessIntInput = true;
    }
  }



  goToPage(routeName){
    if(routeName == 'hotlistCard' || routeName == 'generatePin' || routeName == 'getPhysicalCard'){
      if(this.currentCard.Card_status == "9"){
        this.commonMethod.openPopup('div.popup-bottom.inactive-card');
        return;
      }
    }

    this.router.navigateByUrl('/'+routeName);
  }

}
