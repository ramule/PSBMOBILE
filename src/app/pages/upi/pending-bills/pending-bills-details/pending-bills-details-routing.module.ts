import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingBillsDetailsComponent } from './pending-bills-details.component';

const routes: Routes = [
  {
    path: '', component: PendingBillsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingBillsDetailsRoutingModule { }
