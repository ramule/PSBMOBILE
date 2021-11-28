import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentReminderComponent } from './payment-reminder.component';

const routes: Routes = [
  { path : '', component : PaymentReminderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentReminderRoutingModule { }
