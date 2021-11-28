import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmjjbyRecordRoutingModule } from './pmjjby-record-routing.module';
import { PmjjbyRecordComponent } from './pmjjby-record.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PmjjbyRecordComponent],
  imports: [
    CommonModule,
    PmjjbyRecordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PmjjbyRecordModule { }
