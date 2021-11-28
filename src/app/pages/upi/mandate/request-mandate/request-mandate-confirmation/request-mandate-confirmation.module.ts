import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMandateConfirmationRoutingModule } from './request-mandate-confirmation-routing.module';
import { RequestMandateConfirmationComponent } from './request-mandate-confirmation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RequestMandateConfirmationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RequestMandateConfirmationRoutingModule
  ]
})
export class RequestMandateConfirmationModule { }
