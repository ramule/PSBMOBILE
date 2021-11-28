import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternationalPaymentConfirmationRoutingModule } from './international-payment-confirmation-routing.module';
import { InternationalPaymentConfirmationComponent } from './international-payment-confirmation.component';

import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InternationalPaymentConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalPaymentConfirmationRoutingModule
  ]
})
export class InternationalPaymentConfirmationModule { }
