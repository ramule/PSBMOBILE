import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeactivateUpiGlobalSuccessRoutingModule } from './deactivate-upi-global-success-routing.module';
import { DeactivateUpiGlobalSuccessComponent } from './deactivate-upi-global-success.component';


@NgModule({
  declarations: [DeactivateUpiGlobalSuccessComponent],
  imports: [
    CommonModule,
    DeactivateUpiGlobalSuccessRoutingModule
  ]
})
export class DeactivateUpiGlobalSuccessModule { }
