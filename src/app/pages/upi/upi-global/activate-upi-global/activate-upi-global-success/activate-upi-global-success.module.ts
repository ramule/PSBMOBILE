import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateUpiGlobalSuccessRoutingModule } from './activate-upi-global-success-routing.module';
import { ActivateUpiGlobalSuccessComponent } from './activate-upi-global-success.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [ActivateUpiGlobalSuccessComponent],
  imports: [
    CommonModule,
    ActivateUpiGlobalSuccessRoutingModule,
    SharedModule
  ]
})
export class ActivateUpiGlobalSuccessModule { }
