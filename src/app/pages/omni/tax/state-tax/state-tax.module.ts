import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateTaxRoutingModule } from './state-tax-routing.module';
import { StateTaxComponent } from './state-tax.component';


@NgModule({
  declarations: [StateTaxComponent],
  imports: [
    CommonModule,
    StateTaxRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StateTaxModule { }
