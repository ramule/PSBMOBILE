import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintServiceSuccessRoutingModule } from './bill-raise-complaint-service-success-routing.module';
import { BillRaiseComplaintServiceSuccessComponent } from './bill-raise-complaint-service-success.component';


@NgModule({
  declarations: [BillRaiseComplaintServiceSuccessComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintServiceSuccessRoutingModule
  ]
})
export class BillRaiseComplaintServiceSuccessModule { }
