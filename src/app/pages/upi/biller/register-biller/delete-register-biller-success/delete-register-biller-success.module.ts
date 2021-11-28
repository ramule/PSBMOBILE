import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteRegisterBillerSuccessRoutingModule } from './delete-register-biller-success-routing.module';
import { DeleteRegisterBillerSuccessComponent } from './delete-register-biller-success.component';


@NgModule({
  declarations: [DeleteRegisterBillerSuccessComponent],
  imports: [
    CommonModule,
    DeleteRegisterBillerSuccessRoutingModule
  ]
})
export class DeleteRegisterBillerSuccessModule { }
