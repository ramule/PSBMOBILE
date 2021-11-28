import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMoneyLoanReceiptRoutingModule } from './send-money-loan-receipt-routing.module';
import { SendMoneyLoanReceiptComponent } from './send-money-loan-receipt.component';


@NgModule({
  declarations: [SendMoneyLoanReceiptComponent],
  imports: [
    CommonModule,
    SendMoneyLoanReceiptRoutingModule
  ]
})
export class SendMoneyLoanReceiptModule { }
