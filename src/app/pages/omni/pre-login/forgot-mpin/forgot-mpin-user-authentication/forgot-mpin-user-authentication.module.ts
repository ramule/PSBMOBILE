import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotMpinUserAuthenticationRoutingModule } from './forgot-mpin-user-authentication-routing.module';
import { ForgotMpinUserAuthenticationComponent } from './forgot-mpin-user-authentication.component';

import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgotMpinUserAuthenticationComponent],
  imports: [
    CommonModule,
    ForgotMpinUserAuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ForgotMpinUserAuthenticationModule { }
