import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OTPSessionComponent } from './otp-session.component';
import {OTPSessionRoutingModule} from './otp-session-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [OTPSessionComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OTPSessionRoutingModule,
    SharedModule
  ]
})
export class OTPSessionModule { }
