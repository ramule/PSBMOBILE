import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InwardChequeInquiryRoutingModule } from './inward-cheque-inquiry-routing.module';
import { InwardChequeInquiryComponent } from './inward-cheque-inquiry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [InwardChequeInquiryComponent],
  imports: [
    CommonModule,
    InwardChequeInquiryRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class InwardChequeInquiryModule { }
