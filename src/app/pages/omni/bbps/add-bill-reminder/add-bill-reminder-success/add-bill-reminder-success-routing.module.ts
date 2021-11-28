import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBillReminderSuccessComponent } from './add-bill-reminder-success.component';

const routes: Routes = [
  { path :'', component: AddBillReminderSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBillReminderSuccessRoutingModule { }
