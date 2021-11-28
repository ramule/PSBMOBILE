import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanCloseDetailsRoutingModule } from './loan-close-details-routing.module';
import { LoanCloseDetailsComponent } from './loan-close-details.component';


@NgModule({
  declarations: [LoanCloseDetailsComponent],
  imports: [
    CommonModule,
    LoanCloseDetailsRoutingModule
  ]
})
export class LoanCloseDetailsModule { }
