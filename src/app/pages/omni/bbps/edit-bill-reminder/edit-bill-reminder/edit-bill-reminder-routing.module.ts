import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBillReminderComponent } from './edit-bill-reminder.component';

const routes: Routes = [
  { path:'', component : EditBillReminderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBillReminderRoutingModule { }
