import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetPaymentReminderComponent } from './set-payment-reminder.component';

const routes: Routes = [
  { path : '', component : SetPaymentReminderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetPaymentReminderRoutingModule { }
