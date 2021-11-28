import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityBillPaymentRoutingModule } from './electricity-bill-payment-routing.module';
import { ElectricityBillPaymentComponent } from './electricity-bill-payment.component';


@NgModule({
  declarations: [ElectricityBillPaymentComponent],
  imports: [
    CommonModule,
    ElectricityBillPaymentRoutingModule
  ]
})
export class ElectricityBillPaymentModule { }
