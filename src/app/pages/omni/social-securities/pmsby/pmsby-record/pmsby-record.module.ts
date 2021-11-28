import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyRecordRoutingModule } from './pmsby-record-routing.module';
import { PmsbyRecordComponent } from './pmsby-record.component';


@NgModule({
  declarations: [PmsbyRecordComponent],
  imports: [
    CommonModule,
    PmsbyRecordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PmsbyRecordModule { }
