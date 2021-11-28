import { SharedModule } from './../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMoneyLoanAuthRoutingModule } from './send-money-loan-auth-routing.module';
import { SendMoneyLoanAuthComponent } from './send-money-loan-auth.component';


@NgModule({
  declarations: [SendMoneyLoanAuthComponent],
  imports: [
    CommonModule,
    SendMoneyLoanAuthRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SendMoneyLoanAuthModule { }
