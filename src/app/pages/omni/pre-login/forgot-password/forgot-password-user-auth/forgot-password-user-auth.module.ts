import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { ForgotPasswordUserAuthComponent } from './forgot-password-user-auth.component';
import {ForgotPasswordRoutingModule} from './forgot-password-user-auth-routing.module'


@NgModule({
  declarations: [ForgotPasswordUserAuthComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
  
})
export class ForgotPasswordUserAuthModule { }
