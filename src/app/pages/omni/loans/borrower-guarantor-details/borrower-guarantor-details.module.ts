import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowerGuarantorDetailsRoutingModule } from './borrower-guarantor-details-routing.module';
import { BorrowerGuarantorDetailsComponent } from './borrower-guarantor-details.component';


@NgModule({
  declarations: [BorrowerGuarantorDetailsComponent],
  imports: [
    CommonModule,
    BorrowerGuarantorDetailsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BorrowerGuarantorDetailsModule { }
