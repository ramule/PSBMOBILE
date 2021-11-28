import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMandateSuccessRoutingModule } from './request-mandate-success-routing.module';
import { RequestMandateSuccessComponent } from './request-mandate-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RequestMandateSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    RequestMandateSuccessRoutingModule
  ]
})
export class RequestMandateSuccessModule { }
