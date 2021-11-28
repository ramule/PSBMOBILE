import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../../shared/shared.module';
import { ExecuteMandateSuccessComponent } from './upi-mandate-execute-sucess.component';
import { ExecuteMandateSuccessRoutingModule } from './upi-mandate-execute-sucess-routing.module';


@NgModule({
  declarations: [ExecuteMandateSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExecuteMandateSuccessRoutingModule
  ]
})
export class ExecuteMandateSuccessModule { }
