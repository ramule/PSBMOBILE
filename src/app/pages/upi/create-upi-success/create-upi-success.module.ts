import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUpiSuccessRoutingModule } from './create-upi-success-routing.module';
import { CreateUpiSuccessComponent } from './create-upi-success.component';
import { CommonModules } from '../../common-ui/common.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [CreateUpiSuccessComponent],
  imports: [
    CommonModule,
    CreateUpiSuccessRoutingModule,
    CommonModules,
    SharedModule
  ]
})
export class CreateUpiSuccessModule { }
