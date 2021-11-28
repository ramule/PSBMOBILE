import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRaiseComplaintAssignConfirmationRoutingModule } from './bill-raise-complaint-assign-confirmation-routing.module';
import { BillRaiseComplaintAssignConfirmationComponent } from './bill-raise-complaint-assign-confirmation.component';


@NgModule({
  declarations: [BillRaiseComplaintAssignConfirmationComponent],
  imports: [
    CommonModule,
    BillRaiseComplaintAssignConfirmationRoutingModule
  ]
})
export class BillRaiseComplaintAssignConfirmationModule { }
