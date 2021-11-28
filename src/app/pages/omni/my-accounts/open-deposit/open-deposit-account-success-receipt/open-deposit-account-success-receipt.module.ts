import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenDepositAccountSuccessReceiptRoutingModule } from './open-deposit-account-success-receipt-routing.module';
import { OpenDepositAccountSuccessReceiptComponent } from './open-deposit-account-success-receipt.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OpenDepositAccountSuccessReceiptComponent],
  imports: [
    CommonModule,
    SharedModule,
    OpenDepositAccountSuccessReceiptRoutingModule
  ]
})
export class OpenDepositAccountSuccessReceiptModule { }
