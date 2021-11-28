import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUpiGlobalConfirmationRoutingModule } from './update-upi-global-confirmation-routing.module';
import { UpdateUpiGlobalConfirmationComponent } from './update-upi-global-confirmation.component';


@NgModule({
  declarations: [UpdateUpiGlobalConfirmationComponent],
  imports: [
    CommonModule,
    UpdateUpiGlobalConfirmationRoutingModule
  ]
})
export class UpdateUpiGlobalConfirmationModule { }
