import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeElectricityBillPaymentSuccessRoutingModule } from './home-electricity-bill-payment-success-routing.module';
import { HomeElectricityBillPaymentSuccessComponent } from './home-electricity-bill-payment-success.component';


@NgModule({
  declarations: [HomeElectricityBillPaymentSuccessComponent],
  imports: [
    CommonModule,
    HomeElectricityBillPaymentSuccessRoutingModule
  ]
})
export class HomeElectricityBillPaymentSuccessModule { }
