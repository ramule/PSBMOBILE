import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUpiRoutingModule } from './pay-upi-routing.module';
import { PayUpiComponent } from './pay-upi.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PayUpiComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PayUpiRoutingModule
  ]
})
export class PayUpiModule { }
