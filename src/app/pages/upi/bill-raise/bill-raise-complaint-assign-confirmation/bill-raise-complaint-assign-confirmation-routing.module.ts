import { BillRaiseComplaintAssignConfirmationComponent } from './bill-raise-complaint-assign-confirmation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'' , component: BillRaiseComplaintAssignConfirmationComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRaiseComplaintAssignConfirmationRoutingModule { }
