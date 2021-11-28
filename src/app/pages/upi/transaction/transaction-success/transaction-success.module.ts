import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionSuccessRoutingModule } from './transaction-success-routing.module';
import { TransactionSuccessComponent } from './transaction-success.component';


@NgModule({
  declarations: [TransactionSuccessComponent],
  imports: [
    CommonModule,
    TransactionSuccessRoutingModule
  ]
})
export class TransactionSuccessModule { }
