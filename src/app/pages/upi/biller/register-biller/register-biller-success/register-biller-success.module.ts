import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterBillerSuccessRoutingModule } from './register-biller-success-routing.module';
import { RegisterBillerSuccessComponent } from './register-biller-success.component';


@NgModule({
  declarations: [RegisterBillerSuccessComponent],
  imports: [
    CommonModule,
    RegisterBillerSuccessRoutingModule
  ]
})
export class RegisterBillerSuccessModule { }
