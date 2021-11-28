import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from '../../../../../utilities/common-methods';

@Component({
  selector: 'app-pending-bill-pay-now',
  templateUrl: './pending-bill-pay-now.component.html',
  styleUrls: ['./pending-bill-pay-now.component.scss']
})
export class PendingBillPayNowComponent implements OnInit {

  constructor(
    private router: Router,
    public DataService: DataService,
    public commonMethod: CommonMethods,) { }

    paymentType = 'payUPI'

    pendingBillPayCheckForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm();
    this.DataService.setPageSettings('PAY_NOW');
    this.DataService.setShowThemeObservable(true)
    this.DataService.setShowsideNavObservable(true)
    this.DataService.setShowNotificationObservable(true)
    this.DataService.getBreadcrumb('PAY_NOW' , this.router.url)
  }

  buildForm(){
    this.pendingBillPayCheckForm = new FormGroup({
      terms: new FormControl('', [Validators.required])
    });
  }

  validateForm(){
    if(this.pendingBillPayCheckForm.invalid){
      this.pendingBillPayCheckForm.get('terms').markAsTouched();
      return ;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  pendingBillPaySubmit(routeName){
    if(this.pendingBillPayCheckForm.valid){
      this.goToPage(routeName) ;
    }else{
      this.validateForm();
    }
  }
}
