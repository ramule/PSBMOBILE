import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveMandateSuccessRoutingModule } from './approve-mandate-success-routing.module';
import { ApproveMandateSuccessComponent } from './approve-mandate-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ApproveMandateSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApproveMandateSuccessRoutingModule
  ]
})
export class ApproveMandateSuccessModule { }
