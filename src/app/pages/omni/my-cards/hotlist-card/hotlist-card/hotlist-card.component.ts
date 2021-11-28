import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import {FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { HotlistCardService } from '../hotlist-card/hotlist-card.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-hotlist-card',
  templateUrl: './hotlist-card.component.html',
  styleUrls: ['./hotlist-card.component.scss']
})
export class HotlistCardComponent implements OnInit {
  hotListDebitCardForm: FormGroup;
  accountValue : any = '';
  bankImage : any = '' ;
  bankImageSelection: any = '';
  accountNumber: any = '';
  openDropDown : boolean = false;
  accountList:any=[];
  cardNolist:any=[];
  multipleCardList:any=[];
  cardNo:any;
  reason:any;
  debitCardNumber: any;
  accountListData:any;
  selectedAccount:any;
  accountNO:any='';
  maskedAccNo:any;
  selectedCard:any;
  selCard:any;


  constructor(
    private form: FormBuilder,
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private formValidation: FormValidationService,
    private hotlistCardService:HotlistCardService,
    private http: HttpRestApiService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private location: Location
) { }


  ngOnInit(): void {
    this.DataService.setPageSettings('HOTLIST_CARD');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('HOTLIST_CARD' , this.router.url)

    console.log(this.cardNolist);
    this.buildForm();
    this.onInitilize();
  }

  onInitilize(){
    history.pushState({},this.DataService.previousPageUrl,this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));
    this.accountList = this.DataService.cardList;
    this.selCard = this.DataService.cardList.filter(obj => (obj.CardNo == this.DataService.currentCard.CardNo))
    this.dataSelection(this.selCard[0]);
  }
  buildForm(){
    this.hotListDebitCardForm = new FormGroup({
     //accountNo: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required] ),
    })
  }
  validateForm() {
    if (this.hotListDebitCardForm.invalid) {
      this.hotListDebitCardForm.get('accountNo').markAsTouched();
      this.hotListDebitCardForm.get('reason').markAsTouched();
  }
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
    this.bankImage = bankImage;
    this.debitCardNumber =  accountNo;
   }
   selectCardNo(accountValue){
    this.debitCardNumber=accountValue;
   }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  dataSelection(selCard){
    this.selectedCard = selCard;
    console.log(this.selectedCard);
    this.maskedAccNo = this.commonMethod.maskAccNo(this.selectedCard?.AccountNo);
  }

  toggleOpen(){
    this.openDropDown = !this.openDropDown
  }

  cancel() {
    this.router.navigate(['/debitCards']);
  }

  onSubmit(){
    this.validateForm()
    if(this.hotListDebitCardForm.valid){
      this.DataService.resetTransactionObj();
      console.log("selectedCard =====>");
      console.log(this.selectedCard);
      var param = this.hotlistCardService.getHotlistDebitCard(this.selectedCard?.CardNo ,this.selectedCard?.AccountNo, "HOTLISTBLOCKCARD");
      this.DataService.request = param;
      this.DataService.endPoint = this.constant.serviceName_BLOCKCARD;
      this.DataService.cardServiceType = "HOTLISTBLOCKCARD";
      this.DataService.authorizeHeader =  "Block Card";
      this.DataService.transactionReceiptObj = this.selectedCard;
      this.DataService.transactionReceiptObj.accountNumber = this.selectedCard.AccountNo;
      this.DataService.transactionReceiptObj.reason = this.hotListDebitCardForm.value.reason;
      this.DataService.screenType = 'blockCard';
      this.DataService.otpSessionPreviousPage = "/hotlistCard";
      this.router.navigate(['/otpSession']);
    }

  }

  onReasonChange(event){
    this.reason= event;
  }

}
