import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MandateUpiIdListRoutingModule } from './mandate-upi-id-list-routing.module';
import { MandateUpiIdListComponent } from './mandate-upi-id-list.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MandateUpiIdListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MandateUpiIdListRoutingModule
  ]
})
export class MandateUpiIdListModule { }
