import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBillReminderConfirmationComponent } from './edit-bill-reminder-confirmation.component';

const routes: Routes = [
  { path:'', component : EditBillReminderConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBillReminderConfirmationRoutingModule { }
