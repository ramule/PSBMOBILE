import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUpiSuccessRoutingModule } from './pay-upi-success-routing.module';
import { PayUpiSuccessComponent } from './pay-upi-success.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [PayUpiSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    PayUpiSuccessRoutingModule
  ]
})
export class PayUpiSuccessModule { }
