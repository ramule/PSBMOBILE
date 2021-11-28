import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillReminderDeleteConfirmationComponent } from './bill-reminder-delete-confirmation.component';

const routes: Routes = [
  {path:'' , component: BillReminderDeleteConfirmationComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillReminderDeleteConfirmationRoutingModule { }
