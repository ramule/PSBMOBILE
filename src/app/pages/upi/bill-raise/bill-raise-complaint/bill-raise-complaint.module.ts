import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintRoutingModule } from './bill-raise-complaint-routing.module';
import { BillRaiseComplaintComponent } from './bill-raise-complaint.component';


@NgModule({
  declarations: [BillRaiseComplaintComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintRoutingModule
  ]
})
export class BillRaiseComplaintModule { }
