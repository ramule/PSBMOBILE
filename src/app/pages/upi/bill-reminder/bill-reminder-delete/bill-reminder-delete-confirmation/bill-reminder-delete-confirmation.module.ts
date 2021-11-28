import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillReminderDeleteConfirmationRoutingModule } from './bill-reminder-delete-confirmation-routing.module';
import { BillReminderDeleteConfirmationComponent } from './bill-reminder-delete-confirmation.component';


@NgModule({
  declarations: [BillReminderDeleteConfirmationComponent],
  imports: [
    CommonModule,
    BillReminderDeleteConfirmationRoutingModule
  ]
})
export class BillReminderDeleteConfirmationModule { }
