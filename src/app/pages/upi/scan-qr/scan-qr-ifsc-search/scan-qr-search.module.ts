import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PayIfscSearchRoutingModule } from './pay-ifsc-search-routing.module';
import { PayIfscSearchComponent } from './pay-ifsc-search.component';


@NgModule({
  declarations: [PayIfscSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PayIfscSearchRoutingModule
  ]
})
export class PayIfscSearchModule { }
