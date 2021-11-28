import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Component({
  selector: 'app-mobile-postpaid',
  templateUrl: './mobile-postpaid.component.html',
  styleUrls: ['./mobile-postpaid.component.scss']
})
export class MobilePostpaidComponent implements OnInit {
  constructor(
    private router:Router, 
    public DataService: DataService,
    private commonMethod : CommonMethods
  ) { }

  mobilePostpaidForm : FormGroup 
  paymentTypeForm : FormGroup
  boardValue = ''

  billPaymentBoardName = [
    { 'imagName' : 'assets/images/icons/airtel.png', 'boardName' : 'Airtel'},
    { 'imagName' : 'assets/images/icons/airtel.png', 'boardName' : 'Vodafone'},
  ]

  boardNameValue : any = ''

  boardNameToggle : boolean = false
  showFetchBill : boolean = false 


  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('MOBILE_POSTPAID');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('MOBILE_POSTPAID' , this.router.url)
  }

  buildForm(){
    this.mobilePostpaidForm = new FormGroup({
      consumerId: new FormControl('', [Validators.required]),
      termCondition: new FormControl('', [Validators.required]),
    });

    this.paymentTypeForm = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
    })
  }
  
  
  validateForm(){
    if(this.mobilePostpaidForm.invalid){
      this.mobilePostpaidForm.get('consumerId').markAsTouched();
      this.mobilePostpaidForm.get('termCondition').markAsTouched();
     }

     if(this.paymentTypeForm.invalid){
      this.paymentTypeForm.get('paymentMode').markAsTouched();
    }
  }

  boardTypeSelection(item){
    this.onSelectOption('')
    this.boardNameValue = item ;
  }

  onSelectOption(e){
    if (e.stopPropagation) e.stopPropagation();
    this.boardNameToggle = !this.boardNameToggle
    if(this.boardNameToggle){
      $('#board-name').slideToggle();
      $('#board-name').parent().toggleClass('active')
    } else{
      $('#board-name').slideUp();
      $('#board-name').parent().removeClass('active')
    }

  }

  clickedOut($event){
    $('#board-name').slideUp();
    $('#board-name').parent().removeClass('active')
  }
  
  
  mobilePostpaidSubmit(){
    if(this.mobilePostpaidForm.valid){
      this.showFetchBill = true ;
      // this.goToPage('existingGetBill') ;
    } else{ 
      this.validateForm() ;
    }
  }

  mobilePostpaidPaySubmit(){
    if(this.paymentTypeForm.valid){
      this.goToPage('existingBillPayment') ;
    } else{ 
      this.validateForm() ;
    }
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  openMobBoardName(){
      this.commonMethod.openPopup('div.mob-postpaid');
  }

  getToAccValue(e){
    this.boardValue = e.boardName;
    console.log("board name :: ", this.boardValue)
  }

  closePopup(){
    this.commonMethod.closeAllPopup() ;
  }
}
