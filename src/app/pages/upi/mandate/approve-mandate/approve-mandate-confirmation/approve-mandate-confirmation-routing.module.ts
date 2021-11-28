import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproveMandateConfirmationComponent } from './approve-mandate-confirmation.component';

const routes: Routes = [
  {path: '', component: ApproveMandateConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveMandateConfirmationRoutingModule { }
