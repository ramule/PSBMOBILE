import { SharedModule } from './../../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExistingBillPaymentAuthenticationRoutingModule } from './existing-bill-payment-authentication-routing.module';
import { ExistingBillPaymentAuthenticationComponent } from './existing-bill-payment-authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExistingBillPaymentAuthenticationComponent],
  imports: [
    CommonModule,
    ExistingBillPaymentAuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class ExistingBillPaymentAuthenticationModule { }
