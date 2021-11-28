import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfTransferSuccessRoutingModule } from './self-transfer-success-routing.module';
import { SelfTransferSuccessComponent } from './self-transfer-success.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelfTransferSuccessComponent],
  imports: [
    CommonModule,
    SelfTransferSuccessRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelfTransferSuccessModule { }
