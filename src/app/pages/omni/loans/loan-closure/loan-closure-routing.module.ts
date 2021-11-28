import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanClosureComponent } from './loan-closure.component';

const routes: Routes = [
  {path : '', component : LoanClosureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanClosureRoutingModule { }
