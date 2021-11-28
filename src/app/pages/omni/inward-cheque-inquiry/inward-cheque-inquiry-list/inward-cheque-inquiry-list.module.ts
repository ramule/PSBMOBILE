import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InwardChequeInquiryListRoutingModule } from './inward-cheque-inquiry-list-routing.module';
import { InwardChequeInquiryListComponent } from './inward-cheque-inquiry-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [InwardChequeInquiryListComponent],
  imports: [
    CommonModule,
    InwardChequeInquiryListRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InwardChequeInquiryListModule { }
