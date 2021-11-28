import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintComponent } from './bill-raise-complaint.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintRoutingModule { }
