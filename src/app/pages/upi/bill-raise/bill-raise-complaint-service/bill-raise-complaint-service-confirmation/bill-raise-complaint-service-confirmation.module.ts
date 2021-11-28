import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintServiceConfirmationRoutingModule } from './bill-raise-complaint-service-confirmation-routing.module';
import { BillRaiseComplaintServiceConfirmationComponent } from './bill-raise-complaint-service-confirmation.component';


@NgModule({
  declarations: [BillRaiseComplaintServiceConfirmationComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintServiceConfirmationRoutingModule
  ]
})
export class BillRaiseComplaintServiceConfirmationModule { }
