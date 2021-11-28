import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBillReminderComponent } from './manage-bill-reminder.component';

const routes: Routes = [
  {path:'' , component: ManageBillReminderComponent} 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBillReminderRoutingModule { }
