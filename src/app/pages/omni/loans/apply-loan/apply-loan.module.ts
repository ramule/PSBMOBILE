import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyLoanRoutingModule } from './apply-loan-routing.module';
import { ApplyLoanComponent } from './apply-loan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ApplyLoanComponent],
  imports: [
    CommonModule,
    ApplyLoanRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ApplyLoanModule { }
