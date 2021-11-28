import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BhimUpiPayRoutingModule } from './bhim-upi-pay-routing.module';
import { BhimUpiPayComponent } from './bhim-upi-pay.component';
import { RecentPayeeModule } from '../../recent-payee/recent-payee.module';


@NgModule({
  declarations: [BhimUpiPayComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BhimUpiPayRoutingModule,
    SharedModule,
    RecentPayeeModule
  ],
  exports: [BhimUpiPayComponent]
})
export class BhimUpiPayModule { }
