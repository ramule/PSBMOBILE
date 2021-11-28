import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillPayComplaintRoutingModule } from './bill-pay-complaint-routing.module';
import { BillPayComplaintComponent } from './bill-pay-complaint.component';


@NgModule({
  declarations: [BillPayComplaintComponent],
  imports: [
    CommonModule,
    BillPayComplaintRoutingModule
  ]
})
export class BillPayComplaintModule { }
