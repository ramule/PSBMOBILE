import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBillReminderComponent } from './add-bill-reminder.component';

const routes: Routes = [
  { path : '' , component : AddBillReminderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBillReminderRoutingModule { }
