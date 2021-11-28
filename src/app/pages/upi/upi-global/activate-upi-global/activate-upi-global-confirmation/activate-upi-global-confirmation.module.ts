import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateUpiGlobalConfirmationRoutingModule } from './activate-upi-global-confirmation-routing.module';
import { ActivateUpiGlobalConfirmationComponent } from './activate-upi-global-confirmation.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [ActivateUpiGlobalConfirmationComponent],
  imports: [
    CommonModule,
    ActivateUpiGlobalConfirmationRoutingModule,
    SharedModule
  ]
})
export class ActivateUpiGlobalConfirmationModule { }
