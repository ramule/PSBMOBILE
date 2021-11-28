import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanDetailedStatementRoutingModule } from './loan-detailed-statement-routing.module';
import { LoanDetailedStatementComponent } from './loan-detailed-statement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [LoanDetailedStatementComponent],
  imports: [
    CommonModule,
    LoanDetailedStatementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class LoanDetailedStatementModule { }
