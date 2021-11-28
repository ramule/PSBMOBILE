import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyLoanComponent } from './apply-loan.component';

const routes: Routes = [
  { path: '', component : ApplyLoanComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyLoanRoutingModule { }
