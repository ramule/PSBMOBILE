import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequeStatusInquiryRoutingModule } from './cheque-status-inquiry-routing.module';
import { ChequeStatusInquiryComponent } from './cheque-status-inquiry.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ChequeStatusInquiryComponent],
  imports: [
    CommonModule,
    ChequeStatusInquiryRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ChequeStatusInquiryModule { }
