import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistorySuccessRoutingModule } from './payment-history-success-routing.module';
import { PaymentHistorySuccessComponent } from './payment-history-success.component';


@NgModule({
  declarations: [PaymentHistorySuccessComponent],
  imports: [
    CommonModule,
    PaymentHistorySuccessRoutingModule
  ]
})
export class PaymentHistorySuccessModule { }
