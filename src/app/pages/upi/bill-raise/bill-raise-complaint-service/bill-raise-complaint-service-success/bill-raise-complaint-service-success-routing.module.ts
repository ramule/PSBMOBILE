import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintServiceSuccessComponent } from './bill-raise-complaint-service-success.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintServiceSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintServiceSuccessRoutingModule { }
