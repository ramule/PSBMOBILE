import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelfTransferRoutingModule } from './self-transfer-routing.module';
import { SelfTransferComponent } from './self-transfer.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SelfTransferComponent],
  imports: [
    CommonModule,
    SelfTransferRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SelfTransferModule { }
