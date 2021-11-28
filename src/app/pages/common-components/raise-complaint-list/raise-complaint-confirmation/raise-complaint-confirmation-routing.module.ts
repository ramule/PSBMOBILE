import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseComplaintConfirmationComponent } from './raise-complaint-confirmation.component';

const routes: Routes = [
  {path: '', component: RaiseComplaintConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaiseComplaintConfirmationRoutingModule { }
