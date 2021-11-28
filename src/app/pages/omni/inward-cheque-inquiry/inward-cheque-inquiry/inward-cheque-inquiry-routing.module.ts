import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InwardChequeInquiryComponent } from './inward-cheque-inquiry.component';

const routes: Routes = [
  { path: '', component : InwardChequeInquiryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InwardChequeInquiryRoutingModule { }
