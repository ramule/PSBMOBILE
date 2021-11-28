import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingBillReminderComponent } from './pending-bill-reminder.component';

const routes: Routes = [
  { path :'', component : PendingBillReminderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingBillReminderRoutingModule { }
