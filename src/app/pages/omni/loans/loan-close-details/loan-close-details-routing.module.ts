import { LoanCloseDetailsComponent } from './loan-close-details.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path :'', component : LoanCloseDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanCloseDetailsRoutingModule { }
