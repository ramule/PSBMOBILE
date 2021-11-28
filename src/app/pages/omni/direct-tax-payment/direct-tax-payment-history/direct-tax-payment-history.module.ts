import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxPaymentHistoryRoutingModule } from './direct-tax-payment-history-routing.module';
import { DirectTaxPaymentHistoryComponent } from './direct-tax-payment-history.component';

import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DirectTaxPaymentHistoryComponent],
  imports: [
    CommonModule,
    DirectTaxPaymentHistoryRoutingModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class DirectTaxPaymentHistoryModule { }
