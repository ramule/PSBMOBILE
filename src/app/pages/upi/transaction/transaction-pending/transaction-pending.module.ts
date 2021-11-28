import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionPendingRoutingModule } from './transaction-pending-routing.module';
import { TransactionPendingComponent } from './transaction-pending.component';


@NgModule({
  declarations: [TransactionPendingComponent],
  imports: [
    CommonModule,
    TransactionPendingRoutingModule
  ]
})
export class TransactionPendingModule { }
