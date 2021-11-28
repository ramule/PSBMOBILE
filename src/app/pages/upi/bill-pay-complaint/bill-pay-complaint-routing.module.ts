import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillPayComplaintComponent } from './bill-pay-complaint.component';

const routes: Routes = [
  {path:'' , component: BillPayComplaintComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillPayComplaintRoutingModule { }
