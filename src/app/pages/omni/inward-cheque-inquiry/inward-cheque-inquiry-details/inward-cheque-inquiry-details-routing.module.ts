import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InwardChequeInquiryDetailsComponent } from './inward-cheque-inquiry-details.component';

const routes: Routes = [
  { path: '', component : InwardChequeInquiryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InwardChequeInquiryDetailsRoutingModule { }
