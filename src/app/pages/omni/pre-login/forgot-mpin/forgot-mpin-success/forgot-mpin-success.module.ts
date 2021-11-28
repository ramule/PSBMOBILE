import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotMpinSuccessRoutingModule } from './forgot-mpin-success-routing.module';
import { ForgotMpinSuccessComponent } from './forgot-mpin-success.component';

import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgotMpinSuccessComponent],
  imports: [
    CommonModule,
    ForgotMpinSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ForgotMpinSuccessModule { }
