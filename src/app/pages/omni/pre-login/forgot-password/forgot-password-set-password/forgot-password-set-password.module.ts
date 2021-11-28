import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordSetPasswordComponent } from './forgot-password-set-password.component';
import {ForgotPasswordRoutingModule} from './forgot-password-set-password-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [ForgotPasswordSetPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ForgotPasswordSetPasswordModule { }
