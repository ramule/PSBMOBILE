import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsVerificationComponent } from './sms-verification.component';
import {SmsVerificationRoutingModule} from './sms-verification-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SmsVerificationComponent],
  imports: [
    CommonModule,
    SmsVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
  ]
})
export class SmsVerificationModule { }


