import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EFilingRoutingModule } from './e-filing-routing.module';
import { EFilingComponent } from './e-filing.component';


@NgModule({
  declarations: [EFilingComponent],
  imports: [
    CommonModule,
    EFilingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EFilingModule { }
