import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestMandateRoutingModule } from './request-mandate-routing.module';
import { RequestMandateComponent } from './request-mandate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RequestMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RequestMandateRoutingModule
  ]
})
export class RequestMandateModule { }
