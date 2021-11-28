import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomineeSuccessRoutingModule } from './nominee-success-routing.module';
import { NomineeSuccessComponent } from './nominee-success.component';


@NgModule({
  declarations: [NomineeSuccessComponent],
  imports: [
    CommonModule,
    NomineeSuccessRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class NomineeSuccessModule { }
