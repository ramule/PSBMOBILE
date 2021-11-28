import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRejectedRoutingModule } from './transaction-rejected-routing.module';
import { TransactionRejectedComponent } from './transaction-rejected.component';


@NgModule({
  declarations: [TransactionRejectedComponent],
  imports: [
    CommonModule,
    TransactionRejectedRoutingModule
  ]
})
export class TransactionRejectedModule { }
