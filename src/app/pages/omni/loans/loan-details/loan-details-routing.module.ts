import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoanDetailsComponent} from './loan-details.component';

const routes: Routes = [
  {path:"" , component:LoanDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanDetailsRoutingModule { }
