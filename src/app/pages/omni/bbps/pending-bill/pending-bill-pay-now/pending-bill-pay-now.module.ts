import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingBillPayNowRoutingModule } from './pending-bill-pay-now-routing.module';
import { PendingBillPayNowComponent } from './pending-bill-pay-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PendingBillPayNowComponent],
  imports: [
    CommonModule,
    PendingBillPayNowRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PendingBillPayNowModule { }
