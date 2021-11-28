import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetPaymentReminderSuccessComponent } from './set-payment-reminder-success.component';

const routes: Routes = [
  { path : '', component : SetPaymentReminderSuccessComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetPaymentReminderSuccessRoutingModule { }
