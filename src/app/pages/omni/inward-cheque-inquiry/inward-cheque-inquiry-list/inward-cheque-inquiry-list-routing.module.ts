import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InwardChequeInquiryListComponent } from './inward-cheque-inquiry-list.component';

const routes: Routes = [
  { path: '', component : InwardChequeInquiryListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InwardChequeInquiryListRoutingModule { }
