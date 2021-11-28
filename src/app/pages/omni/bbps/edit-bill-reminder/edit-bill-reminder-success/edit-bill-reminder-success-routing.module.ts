import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBillReminderSuccessComponent } from './edit-bill-reminder-success.component';

const routes: Routes = [
  { path:'', component : EditBillReminderSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBillReminderSuccessRoutingModule { }
