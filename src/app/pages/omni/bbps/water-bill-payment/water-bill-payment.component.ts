import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../utilities/common-methods';

@Component({
  selector: 'app-water-bill-payment',
  templateUrl: './water-bill-payment.component.html',
  styleUrls: ['./water-bill-payment.component.scss']
})
export class WaterBillPaymentComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods
  ) { }

  billPaymentBoardName = [
    { 'imagName' : 'assets/images/icons/mahavitran.png', 'boardName' : 'Ahmedabad Municipal Corporation'},
    { 'imagName' : 'assets/images/icons/aasam-power.png', 'boardName' : 'Kalyan Dombivali Municipal Corporation'},
  ]

  boardNameValue : any = ''

  boardNameToggle : boolean = false
  showFetchBill : boolean = false 

  waterBillPaymentForm : FormGroup
  paymentTypeForm : FormGroup

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.setPageSettings('WATER_BILL_PAYMENT');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('WATER_BILL_PAYMENT' , this.router.url)
  }

  buildForm(){
    this.waterBillPaymentForm = new FormGroup({
      custstate: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      termsCondition : new FormControl('', [Validators.required]),
    })

    this.paymentTypeForm = new FormGroup({
      paymentMode: new FormControl('', [Validators.required]),
    })
    
  }

  validateForm(){
    if(this.waterBillPaymentForm.invalid){
      this.waterBillPaymentForm.get('custstate').markAsTouched();
      this.waterBillPaymentForm.get('customerId').markAsTouched();
      this.waterBillPaymentForm.get('termsCondition').markAsTouched();
    }

    if(this.paymentTypeForm.invalid){
      this.paymentTypeForm.get('paymentMode').markAsTouched();
    }
  }

  waterBillPaymentSubmit() {
    if(this.waterBillPaymentForm.valid){
      this.showFetchBill = true ;
      // this.goToPage('existingGetBill') ;
    } else{ 
      this.validateForm() ;
    }
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

  boardTypeSelection(item){
    this.onSelectOption('')
    this.boardNameValue = item ;
  }

clickedOut($event){
  $('#board-name').slideUp();
  $('#board-name').parent().removeClass('active')
}


goToPage(routeName) {
  this.router.navigateByUrl('/' + routeName);
}

fetchBill(){
  this.showFetchBill = true ;
}

existingGetBillSubmit() {
  if(this.paymentTypeForm.valid){
    this.goToPage('existingBillPayment') ;
  } else{ 
    this.validateForm() ;
  }
}


}
