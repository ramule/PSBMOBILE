import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUpiConfirmationRoutingModule } from './pay-upi-confirmation-routing.module';
import { PayUpiConfirmationComponent } from './pay-upi-confirmation.component';
import { SharedModule } from '../../../../../app/shared/shared.module';


@NgModule({
  declarations: [PayUpiConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    PayUpiConfirmationRoutingModule
  ]
})
export class PayUpiConfirmationModule { }
