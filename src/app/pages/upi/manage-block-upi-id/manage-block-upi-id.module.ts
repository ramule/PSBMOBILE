import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBlockUpiIdRoutingModule } from './manage-block-upi-id-routing.module';
import { ManageBlockUpiIdComponent } from './manage-block-upi-id.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ManageBlockUpiIdComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManageBlockUpiIdRoutingModule
  ]
})
export class ManageBlockUpiIdModule { }
