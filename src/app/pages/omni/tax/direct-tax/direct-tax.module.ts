import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectTaxRoutingModule } from './direct-tax-routing.module';
import { DirectTaxComponent } from './direct-tax.component';


@NgModule({
  declarations: [DirectTaxComponent],
  imports: [
    CommonModule,
    DirectTaxRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DirectTaxModule { }
