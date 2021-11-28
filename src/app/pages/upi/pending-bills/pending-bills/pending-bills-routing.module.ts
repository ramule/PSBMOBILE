import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingBillsComponent } from './pending-bills.component';

const routes: Routes = [
  {
    path: '', component: PendingBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingBillsRoutingModule { }
