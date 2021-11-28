import { SharedModule } from './../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMoneyLoanRoutingModule } from './send-money-loan-routing.module';
import { SendMoneyLoanComponent } from './send-money-loan.component';


@NgModule({
  declarations: [SendMoneyLoanComponent],
  imports: [
    CommonModule,
    SendMoneyLoanRoutingModule,
    FormsModule,
    SharedModule, 
    ReactiveFormsModule
  ]
})
export class SendMoneyLoanModule { }
