import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';
import { HttpRestApiService } from '../../../../services/http-rest-api.service';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DetailStatementService } from '../../my-accounts/detailed-statement/detailed-statement.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var debitCardScript:any;
declare var rangeSlider : any ;


@Component({
  selector: 'app-mob-mycards-manage',
  templateUrl: './mob-mycards-manage.component.html',
  styleUrls: ['./mob-mycards-manage.component.scss']
})
export class MobMycardsManageComponent implements OnInit {

  topForm: FormGroup;
  DomesticForm: FormGroup;
  InternationalForm: FormGroup;

  myCardType = 'domestic' ;
  selCardNo : any;
  selCard:any;
  accountList:any;
  currentCard:any;
  inactiveCard: boolean = false;
  blocked:boolean = false;
  isPhysical:boolean = false;
  internationalNotCard:boolean = false;
  posDom:boolean = true;
  posDomInput:boolean = false;
  ecomDom:boolean = true;
  ecomDomInput:boolean = false;
  atmDom:boolean = true;
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
  colData:boolean = true;
  colDataInt:boolean = true;


  constructor(
    public dataService : DataService,
    private commonMethod:CommonMethods,
    private router : Router,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private detailStatementService: DetailStatementService,
    private constant: AppConstants,
    private location: Location
  ) { }

  ngOnInit(): void {
    rangeSlider(this.currentCard) ;
    // debitCardScript(this.currentCard);
    this.dataService.setPageSettings('MY_CARDS');
    this.dataService.setShowThemeObservable(true)
    this.dataService.setShowsideNavObservable(true)
    this.dataService.setShowNotificationObservable(true);
    this.dataService.getBreadcrumb('MY_CARDS' , this.router.url);
    
    this.accountList = this.dataService.cardList;
    this.currentCard = this.dataService.currentCard;
    console.log("accountValue =======>",this.currentCard);
    this.selCardNo = this.currentCard.MaskCardNumber
    this.buildForm();
    this.getCardDetails();
  }

  buildForm(){
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


  getCardDetails(){
    this.DomesticForm.patchValue({
      pos_dom_val: this.currentCard.POS_dom_limit,
      ecom_dom_val: this.currentCard.ECOM_dom_limit,
      atm_dom_val: this.currentCard.ATM_dom_limit,
      contact_dom_val: this.currentCard.CONT_dom_limit = this.currentCard.CONT_dom_limit ? this.currentCard.CONT_dom_limit : 0,
    });


    this.InternationalForm.patchValue({
      pos_int_val: this.currentCard.POS_int_limit,
      ecom_int_val: this.currentCard.ECOM_int_limit,
      atm_int_val: this.currentCard.ATM_int_limit,
      contact_int_val: this.currentCard.CONT_int_limit = this.currentCard.CONT_int_limit ? this.currentCard.CONT_int_limit : 0,
    });
    console.log(this.currentCard);
    this.isPhysical = this.currentCard.PinMailer == "P" ? true : false;
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

    // debitCardScript(this.currentCard);
    rangeSlider(this.currentCard);
  }


  cardType(value){
    this.cardType = value ;
  }

  getToAccValue(accountType, accountNo){
    // this.accountValue = accountType.concat(" ", accountNo);
    this.selCardNo =  accountNo ;

   }

   
  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

}
