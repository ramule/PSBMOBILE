import { SharedModule } from './../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerSuccessRoutingModule } from './register-biller-success-routing.module';
import { RegisterBillerSuccessComponent } from './register-biller-success.component';


@NgModule({
  declarations: [RegisterBillerSuccessComponent],
  imports: [
    CommonModule,
    RegisterBillerSuccessRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class RegisterBillerSuccessModule { }
