import { RaiseComplaintTransactionDurationSuccessComponent } from './raise-complaint-transaction-duration-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: RaiseComplaintTransactionDurationSuccessComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintTransactionDurationSuccessRoutingModule { }
