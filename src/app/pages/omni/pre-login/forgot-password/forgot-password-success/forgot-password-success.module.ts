import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordSuccessRoutingModule } from './forgot-password-success-routing.module';
import { ForgotPasswordSuccessComponent } from './forgot-password-success.component';


@NgModule({
  declarations: [ForgotPasswordSuccessComponent],
  imports: [
    CommonModule,
    ForgotPasswordSuccessRoutingModule
  ]
})
export class ForgotPasswordSuccessModule { }
