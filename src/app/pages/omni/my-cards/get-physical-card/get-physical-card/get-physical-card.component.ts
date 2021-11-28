import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../../services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';
import { GetPhysicalService } from './get-physical.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DatePipe, Location } from '@angular/common';
import {FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';



@Component({
  selector: 'app-get-physical-card',
  templateUrl: './get-physical-card.component.html',
  styleUrls: ['./get-physical-card.component.scss']
})
export class GetPhysicalCardComponent implements OnInit {


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
  selectedCard :any;
  maskedAccNo = "";
  selCard: any;
  physicalCardForm: FormGroup;

  constructor(
    private router: Router,
    public DataService: DataService,
    private commonMethod : CommonMethods,
    private getPhysicalService : GetPhysicalService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private constant: AppConstants,
    private location : Location,
    private formValidation: FormValidationService,
    private translate: TranslatePipe
) { }


  ngOnInit(): void {
    this.DataService.setPageSettings('Get Physical Card');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true);
    this.DataService.getBreadcrumb('GET_PHYSICAL_CARD' , this.router.url)
    this.onInitilize();
  }

  onInitilize(){
    console.log("this.DataService.previousPageUrl ====>"+this.DataService.previousPageUrl);
    history.pushState({},this.DataService.previousPageUrl,this.location.prepareExternalUrl(this.DataService.previousPageUrl));
    history.pushState({},'self',this.location.prepareExternalUrl(this.router.url));
    //get card list
    console.log(this.DataService.cardList);
    console.log(this.DataService.currentCard);
    this.selCard = this.DataService.cardList.filter(obj => (obj.CardNo == this.DataService.currentCard.CardNo))
    this.dataSelection(this.selCard[0]);
    this.buildForm();
  }

  buildForm(){
    this.physicalCardForm = new FormGroup({
     generalConcent: new FormControl('', [Validators.required] ),
    })
  }

  goToPage(routeName){
    if(routeName == 'getPhysicalCardAuthorization'){
      if(this.physicalCardForm.valid){
        this.DataService.resetTransactionObj();
        var param = this.getPhysicalService.getPhysicalCardParam( this.selectedCard?.CardNo  , this.selectedCard?.Cifid , "CHANGECARDSTATE" );
        this.DataService.request = param;
        this.DataService.endPoint = this.constant.serviceName_CHANGECARDSTATE;
        this.DataService.cardServiceType = "CHANGECARDSTATE";
        this.DataService.authorizeHeader =  "Get Physical Card";
        this.DataService.transactionReceiptObj = this.selectedCard;
        this.DataService.transactionReceiptObj.accountNumber = this.selectedCard.AccountNo;
        this.DataService.transactionReceiptObj.cardNo = this.selectedCard.CardNo;
        //this.DataService.debitCardIssuedData = this.selectedCard.AccountNo+"|"+this.selectedCard.CardType+"|"+this.selectedCard.ECOM_dom+"|"+this.selectedCard.NameOnCard+"|"+this.selectedCard.CardNo+"|Y|";
        this.DataService.debitCardIssuedData = this.selectedCard.AccountNo+"|"+this.selectedCard.CardNo +"|N|N|VP|",////account number|card number|ecom flg|domestic or international flg|personalized flg|
        this.DataService.transactionReceiptObj.cardApplyType = this.translate.transform('PHYSICAL');
        this.DataService.screenType = 'getPhysicalCard'
        this.DataService.otpSessionPreviousPage = "/getPhysicalCard";
        this.router.navigate(['/otpSession']);
      }
      else{
        this.validateForm()
      }
      //this.getPhysicalCard(this.selectedCard?.AccountNo);
    }
    else{
      this.router.navigateByUrl('/'+routeName);
    }
  }


  validateForm(){
    if (this.physicalCardForm.invalid) {
      this.physicalCardForm.get('generalConcent').markAsTouched();
    }
  }

  // getPhysicalCard(debitCardNo){
  //   this.http .callBankingAPIService( param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_CHANGECARDSTATE)
  //     .subscribe((data) => {
  //       console.log(data);
  //       if (data.responseParameter.opstatus == '00') {

  //       }
  //     });
  // }

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

  dataSelection(selCard){
    this.selectedCard = selCard;
    console.log(this.selectedCard);
    this.maskedAccNo = this.commonMethod.maskAccNo(this.selectedCard?.AccountNo);
  }

  toggleOpen(){
    this.openDropDown = !this.openDropDown
  }

  goBack(){
    this.router.navigateByUrl('/debitCards');
  }

  openchargespopup(){
    this.commonMethod.openPopup('div.popup-bottom.chargesPopup');
  }

  _closePopup(popupName){
    this.commonMethod.closePopup(popupName);
  }
}
