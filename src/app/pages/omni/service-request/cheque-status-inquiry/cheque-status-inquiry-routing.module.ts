import { ChequeStatusInquiryComponent } from './cheque-status-inquiry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: ChequeStatusInquiryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequeStatusInquiryRoutingModule { }
