import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Component({
  selector: 'app-dth-bill',
  templateUrl: './dth-bill.component.html',
  styleUrls: ['./dth-bill.component.scss']
})
export class DthBillComponent implements OnInit {

  constructor(
    private router:Router, 
    public DataService: DataService,
    private commonMethod : CommonMethods
  ) { }

  dthBillForm : FormGroup 
  paymentTypeForm : FormGroup
  boardValue = ''
  boardImage =''

  billPaymentBoardName = [
    { 'imagName' : 'assets/images/icons/mahavitran.png', 'boardName' : 'Ahmedabad Municipal Corporation'},
    { 'imagName' : 'assets/images/icons/aasam-power.png', 'boardName' : 'Kalyan Dombivali Municipal Corporation'},
  ]

  boardNameValue : any = ''

  boardNameToggle : boolean = false
  showFetchBill : boolean = false 


  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('DTH_BILL');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('DTH_BILL' , this.router.url)
  }

  buildForm(){
    this.dthBillForm = new FormGroup({
      consumerId: new FormControl('', [Validators.required]),
      termCondition: new FormControl('', [Validators.required]),
    });

    this.paymentTypeForm = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
    })
  }
  
  
  validateForm(){
    if(this.dthBillForm.invalid){
      this.dthBillForm.get('consumerId').markAsTouched();
      this.dthBillForm.get('termCondition').markAsTouched();
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
  
  
  dthBillSubmit(){
    if(this.dthBillForm.valid){
      this.showFetchBill = true ;
      // this.goToPage('existingGetBill') ;
    } else{ 
      this.validateForm() ;
    }
  }

  dethBillPaySubmit(){
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
