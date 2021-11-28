import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetPaymentReminderConfirmationComponent } from './set-payment-reminder-confirmation.component';

const routes: Routes = [
  { path : '', component : SetPaymentReminderConfirmationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetPaymentReminderConfirmationRoutingModule { }
