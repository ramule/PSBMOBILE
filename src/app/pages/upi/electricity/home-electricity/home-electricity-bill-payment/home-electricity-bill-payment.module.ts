import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeElectricityBillPaymentRoutingModule } from './home-electricity-bill-payment-routing.module';
import { HomeElectricityBillPaymentComponent } from './home-electricity-bill-payment.component';


@NgModule({
  declarations: [HomeElectricityBillPaymentComponent],
  imports: [
    CommonModule,
    HomeElectricityBillPaymentRoutingModule
  ]
})
export class HomeElectricityBillPaymentModule { }
