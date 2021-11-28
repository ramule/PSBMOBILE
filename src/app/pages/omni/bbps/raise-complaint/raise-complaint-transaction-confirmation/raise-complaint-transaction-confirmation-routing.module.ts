import { RaiseComplaintTransactionConfirmationComponent } from './raise-complaint-transaction-confirmation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path :'', component : RaiseComplaintTransactionConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintTransactionConfirmationRoutingModule { }
