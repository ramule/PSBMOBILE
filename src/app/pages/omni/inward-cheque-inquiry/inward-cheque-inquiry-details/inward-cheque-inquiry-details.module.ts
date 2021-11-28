import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InwardChequeInquiryDetailsRoutingModule } from './inward-cheque-inquiry-details-routing.module';
import { InwardChequeInquiryDetailsComponent } from './inward-cheque-inquiry-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InwardChequeInquiryDetailsComponent],
  imports: [
    CommonModule,
    InwardChequeInquiryDetailsRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InwardChequeInquiryDetailsModule { }
