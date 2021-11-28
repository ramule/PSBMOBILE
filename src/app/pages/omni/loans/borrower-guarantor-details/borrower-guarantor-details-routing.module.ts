import { BorrowerGuarantorDetailsComponent } from './borrower-guarantor-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component : BorrowerGuarantorDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowerGuarantorDetailsRoutingModule { }
