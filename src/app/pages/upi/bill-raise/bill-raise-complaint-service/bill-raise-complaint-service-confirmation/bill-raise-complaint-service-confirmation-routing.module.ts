import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillRaiseComplaintServiceConfirmationComponent } from './bill-raise-complaint-service-confirmation.component';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintServiceConfirmationComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintServiceConfirmationRoutingModule { }
