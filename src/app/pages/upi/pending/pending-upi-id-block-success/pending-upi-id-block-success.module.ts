import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingUpiIdBlockSuccessRoutingModule } from './pending-upi-id-block-success-routing.module';
import { PendingUpiIdBlockSuccessComponent } from './pending-upi-id-block-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingUpiIdBlockSuccessComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PendingUpiIdBlockSuccessRoutingModule
  ]
})
export class PendingUpiIdBlockSuccessModule { }
