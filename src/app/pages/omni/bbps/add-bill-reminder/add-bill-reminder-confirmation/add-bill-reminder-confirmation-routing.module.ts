import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBillReminderConfirmationComponent } from './add-bill-reminder-confirmation.component';

const routes: Routes = [
  { path : '', component : AddBillReminderConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBillReminderConfirmationRoutingModule { }
