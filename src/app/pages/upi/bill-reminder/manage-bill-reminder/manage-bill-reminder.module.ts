import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBillReminderRoutingModule } from './manage-bill-reminder-routing.module';
import { ManageBillReminderComponent } from './manage-bill-reminder.component';


@NgModule({
  declarations: [ManageBillReminderComponent],
  imports: [
    CommonModule,
    ManageBillReminderRoutingModule
  ]
})
export class ManageBillReminderModule { }
