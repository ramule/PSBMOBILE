import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { GeneratePinService } from './generate-pin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-generate-pin',
  templateUrl: './generate-pin.component.html',
  styleUrls: ['./generate-pin.component.scss']
})
export class GeneratePinComponent implements OnInit {

  
  accountList =[
    {'bankImage': 'assets/images/icons/icici-icon.png', 'accountNo' : 'XXXX XXXX XXXX 9876'},
    {'bankImage': 'assets/images/icons/hdfc-icon.png', 'accountNo' : 'XXXX XXXX XXXX 9676'},
    {'bankImage': 'assets/images/icons/icici-icon.png', 'accountNo' : 'XXXX XXXX XXXX 1876'},
  ] ;

  accountValue : any = '';
  bankImage : any = '' ;
  bankImageSelection: any = '';
  accountNumber: any = '';
  openDropDown : boolean = false
  pinNotMatched: boolean = false;
  invalidForm: boolean = false;
  

  selCardDtl:any;
  selectedCard:any;
  maskedAccNo:any;
  regenratePinForm: FormGroup;

  @ViewChildren('EnterPin') enterPin: any;
  @ViewChildren('ReEnterPin') reEnterPin: any;

  constructor( 
    private router: Router, 
    public DataService: DataService,  
    private commonMethod : CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private generatePinService: GeneratePinService,
    private location: Location
) { }

  buildForm(){
    this.regenratePinForm = new FormGroup({
      pin1: new FormControl('', [Validators.required] ),
      pin2: new FormControl('', [Validators.required] ),
      pin3: new FormControl('', [Validators.required] ),
      pin4: new FormControl('', [Validators.required] ),

      reEnterpin1: new FormControl('', [Validators.required] ),
      reEnterpin2: new FormControl('', [Validators.required] ),
      reEnterpin3: new FormControl('', [Validators.required] ),
      reEnterpin4: new FormControl('', [Validators.required] ),
     })
  }

  ngOnInit(): void {
    this.DataService.setPageSettings('GENERATE_PIN');
    this.DataService.getBreadcrumb('GENERATE_PIN' , this.router.url);
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.buildForm();


    this.accountList = this.DataService.cardList;
    this.selCardDtl = this.DataService.cardList.filter(obj => (obj.CardNo == this.DataService.currentCard.CardNo))
    this.dataSelection(this.selCardDtl[0]);
  }

  /** Function to be called on card selection **/
  dataSelection(selCard){
    this.selectedCard = selCard;
    console.log(this.selectedCard);
    this.maskedAccNo = this.commonMethod.maskAccNo(this.selectedCard?.AccountNo);
  }
  
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  } 

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      //this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(bankImage, accountNo){
    this.accountValue =  accountNo ;
    this.bankImage = bankImage
   }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  toggleOpen(){
    this.openDropDown = !this.openDropDown
  }

  submit(){
    this.pinNotMatched = false;
    if(this.regenratePinForm.valid){
      var newPin = this.regenratePinForm.value.pin1 + this.regenratePinForm.value.pin2 + this.regenratePinForm.value.pin3 + this.regenratePinForm.value.pin4;
      var cnfPin = this.regenratePinForm.value.reEnterpin1 + this.regenratePinForm.value.reEnterpin2 + this.regenratePinForm.value.reEnterpin3 + this.regenratePinForm.value.reEnterpin4;

      if(newPin != cnfPin){
        this.pinNotMatched = true;
        return;
      }
      this.DataService.resetTransactionObj();
      var param = this.generatePinService.getRegenratePinParam(this.selectedCard?.CardNo,newPin,this.selectedCard?.ExpiryDate , "DEBITCARDPINCHANGE");
      this.DataService.request = param;
      this.DataService.endPoint = this.constant.serviceName_DEBITCARDPINCHANGE;
      this.DataService.cardServiceType = "DEBITCARDPINCHANGE";
      this.DataService.authorizeHeader =  "Generate Pin";
      this.DataService.transactionReceiptObj.MaskCardNumber = this.selectedCard?.MaskCardNumber;
      this.DataService.transactionReceiptObj.accountNumber = this.maskedAccNo;
      var cardDtl = this.DataService.cardDetailsNOffer.filter((obj)=> obj.cbsVarient == this.selectedCard?.CardProgram );
      this.DataService.transactionReceiptObj.cardType = cardDtl[0]?.cardType;
      this.DataService.screenType = 'generatePin';
      this.DataService.otpSessionPreviousPage = "/generatePin";
      this.router.navigate(['/otpSession']);
    }
    else{
      this.invalidForm = true;
    }
  }

  generatePin(param){
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_DEBITCARDPINCHANGE).subscribe(res => {
      console.log(res);
      if(res.opstatus == "00"){
        
      }
    });
  }


  onKeyUpEvent(index, event, type) {
    const eventCode = event.which || event.keyCode;
    console.log(index);
    console.log(event.which);
    console.log(event.keyCode);
    this.pinNotMatched = false;
    this.invalidForm = false;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 3) {
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
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocus(index,type) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }


  getSpasswordElement(index, type) {
    //console.log(this.mPinRows);
    if (type == "pin") {
      if (index <= 3)
        return this.enterPin._results[index].nativeElement;
    }
    else if (type == "reenterpin") {
      if (index <= 3)
        return this.reEnterPin._results[index].nativeElement;
    }

  }

  cancel() {
    if(this.constant.getPlatform() == "web"){
      this.router.navigate(['/debitCards']);
    }
    else{
      this.location.back();
    }
  }

}
