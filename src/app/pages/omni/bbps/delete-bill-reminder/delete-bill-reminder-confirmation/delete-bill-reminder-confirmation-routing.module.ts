import { DeleteBillReminderConfirmationComponent } from './delete-bill-reminder-confirmation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : DeleteBillReminderConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteBillReminderConfirmationRoutingModule { }
