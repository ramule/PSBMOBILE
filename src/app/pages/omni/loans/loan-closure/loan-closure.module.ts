import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanClosureRoutingModule } from './loan-closure-routing.module';
import { LoanClosureComponent } from './loan-closure.component';


@NgModule({
  declarations: [LoanClosureComponent],
  imports: [
    CommonModule,
    LoanClosureRoutingModule
  ]
})
export class LoanClosureModule { }
