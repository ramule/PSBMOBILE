import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillReminderDeleteSuccessComponent } from './bill-reminder-delete-success.component';

const routes: Routes = [
  {path:'' , component: BillReminderDeleteSuccessComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillReminderDeleteSuccessRoutingModule { }
