import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateUpiGlobalRoutingModule } from './activate-upi-global-routing.module';
import { ActivateUpiGlobalComponent } from './activate-upi-global.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [ActivateUpiGlobalComponent],
  imports: [
    CommonModule,
    ActivateUpiGlobalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ActivateUpiGlobalModule { }
