import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopChequeReceiptRoutingModule } from './stop-cheque-receipt-routing.module';
import { StopChequeReceiptComponent } from './stop-cheque-receipt.component';


@NgModule({
  declarations: [StopChequeReceiptComponent],
  imports: [
    CommonModule,
    StopChequeReceiptRoutingModule
  ]
})
export class StopChequeReceiptModule { }
