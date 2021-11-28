import { RaiseComplaintTransactionSuccessComponent } from './raise-complaint-transaction-success.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : '', component : RaiseComplaintTransactionSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintTransactionSuccessRoutingModule { }
