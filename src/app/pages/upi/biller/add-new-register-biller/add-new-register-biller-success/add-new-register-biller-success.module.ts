import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewRegisterBillerSuccessRoutingModule } from './add-new-register-biller-success-routing.module';
import { AddNewRegisterBillerSuccessComponent } from './add-new-register-biller-success.component';


@NgModule({
  declarations: [AddNewRegisterBillerSuccessComponent],
  imports: [
    CommonModule,
    AddNewRegisterBillerSuccessRoutingModule
  ]
})
export class AddNewRegisterBillerSuccessModule { }
