import { SetPaymentReminderDetailsComponent } from './set-payment-reminder-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : SetPaymentReminderDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetPaymentReminderDetailsRoutingModule { }
