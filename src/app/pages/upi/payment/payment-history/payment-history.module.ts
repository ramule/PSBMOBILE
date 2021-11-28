import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryRoutingModule } from './payment-history-routing.module';
import { PaymentHistoryComponent } from './payment-history.component';


@NgModule({
  declarations: [PaymentHistoryComponent],
  imports: [
    CommonModule,
    PaymentHistoryRoutingModule
  ]
})
export class PaymentHistoryModule { }
