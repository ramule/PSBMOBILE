import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndirectTaxRoutingModule } from './indirect-tax-routing.module';
import { IndirectTaxComponent } from './indirect-tax.component';


@NgModule({
  declarations: [IndirectTaxComponent],
  imports: [
    CommonModule,
    IndirectTaxRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IndirectTaxModule { }
