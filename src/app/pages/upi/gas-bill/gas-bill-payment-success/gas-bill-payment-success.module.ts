import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasBillPaymentSuccessRoutingModule } from './gas-bill-payment-success-routing.module';
import { GasBillPaymentSuccessComponent } from './gas-bill-payment-success.component';


@NgModule({
  declarations: [GasBillPaymentSuccessComponent],
  imports: [
    CommonModule,
    GasBillPaymentSuccessRoutingModule
  ]
})
export class GasBillPaymentSuccessModule { }
