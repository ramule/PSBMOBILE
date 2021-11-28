import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanListComponent } from './loan-list.component';

const routes: Routes = [{path: '', component: LoanListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanListRoutingModule { }
