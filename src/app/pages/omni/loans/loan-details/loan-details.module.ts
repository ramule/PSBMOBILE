import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanDetailsRoutingModule } from './loan-details-routing.module';
import { LoanDetailsComponent } from './loan-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LoanDetailsComponent],
  imports: [
    CommonModule,
    LoanDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
   
  ]
})
export class LoanDetailsModule { }
