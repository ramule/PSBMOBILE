import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintTransactionSuccessRoutingModule } from './bill-raise-complaint-transaction-success-routing.module';
import { BillRaiseComplaintTransactionSuccessComponent } from './bill-raise-complaint-transaction-success.component';


@NgModule({
  declarations: [BillRaiseComplaintTransactionSuccessComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintTransactionSuccessRoutingModule
  ]
})
export class BillRaiseComplaintTransactionSuccessModule { }
