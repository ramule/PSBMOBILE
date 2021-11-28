import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionFailRoutingModule } from './transaction-fail-routing.module';
import { TransactionFailComponent } from './transaction-fail.component';


@NgModule({
  declarations: [TransactionFailComponent],
  imports: [
    CommonModule,
    TransactionFailRoutingModule
  ]
})
export class TransactionFailModule { }
