import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBillReminderRoutingModule } from './edit-bill-reminder-routing.module';
import { EditBillReminderComponent } from './edit-bill-reminder.component';


@NgModule({
  declarations: [EditBillReminderComponent],
  imports: [
    CommonModule,
    EditBillReminderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditBillReminderModule { }
