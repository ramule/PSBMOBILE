import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LienEnquiryRoutingModule } from './lien-enquiry-routing.module';
import { LienEnquiryComponent } from './lien-enquiry.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LienEnquiryComponent],
  imports: [
    CommonModule,
    LienEnquiryRoutingModule,
    SharedModule
  ]
})
export class LienEnquiryModule { }
