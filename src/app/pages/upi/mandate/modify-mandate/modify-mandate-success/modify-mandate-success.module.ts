import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyMandateSuccessRoutingModule } from './modify-mandate-success-routing.module';
import { ModifyMandateSuccessComponent } from './modify-mandate-success.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ModifyMandateSuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    ModifyMandateSuccessRoutingModule
  ]
})
export class ModifyMandateSuccessModule { }
