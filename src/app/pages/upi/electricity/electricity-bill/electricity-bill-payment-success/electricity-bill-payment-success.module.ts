import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityBillPaymentSuccessRoutingModule } from './electricity-bill-payment-success-routing.module';
import { ElectricityBillPaymentSuccessComponent } from './electricity-bill-payment-success.component';


@NgModule({
  declarations: [ElectricityBillPaymentSuccessComponent],
  imports: [
    CommonModule,
    ElectricityBillPaymentSuccessRoutingModule
  ]
})
export class ElectricityBillPaymentSuccessModule { }
