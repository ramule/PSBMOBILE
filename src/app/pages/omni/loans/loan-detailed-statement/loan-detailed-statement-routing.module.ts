import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanDetailedStatementComponent } from './loan-detailed-statement.component';

const routes: Routes = [
  { path: '', component : LoanDetailedStatementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanDetailedStatementRoutingModule { }
