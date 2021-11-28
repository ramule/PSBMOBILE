import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentRoutingModule } from './direct-tax-payment-routing.module';
import { DirectTaxPaymentComponent } from './direct-tax-payment.component';

import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DirectTaxPaymentComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class DirectTaxPaymentModule { }
