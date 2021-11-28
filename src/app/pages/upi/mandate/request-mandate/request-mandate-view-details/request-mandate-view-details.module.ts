import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMandateViewDetailsRoutingModule } from './request-mandate-view-details-routing.module';
import { RequestMandateViewDetailsComponent } from './request-mandate-view-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RequestMandateViewDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RequestMandateViewDetailsRoutingModule
  ]
})
export class RequestMandateViewDetailsModule { }
