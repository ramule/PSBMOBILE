import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveMandateRoutingModule } from './approve-mandate-routing.module';
import { ApproveMandateComponent } from './approve-mandate.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ApproveMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ApproveMandateRoutingModule
  ]
})
export class ApproveMandateModule { }
