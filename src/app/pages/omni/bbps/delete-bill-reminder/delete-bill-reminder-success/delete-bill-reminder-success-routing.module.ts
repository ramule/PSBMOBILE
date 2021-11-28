import { DeleteBillReminderSuccessComponent } from './delete-bill-reminder-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : DeleteBillReminderSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteBillReminderSuccessRoutingModule { }
