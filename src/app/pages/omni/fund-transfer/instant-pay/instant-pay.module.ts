import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstantPayRoutingModule } from './instant-pay-routing.module';
import { InstantPayComponent } from './instant-pay.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { RecentPayeeComponent } from 'src/app/pages/common-components/recent-payee/recent-payee.component';
import { RecentPayeeModule } from '../../recent-payee/recent-payee.module';

import { BhimUpiPayModule } from '../../bhim/bhim-upi-pay/bhim-upi-pay.module';

@NgModule({
  declarations: [InstantPayComponent],
  imports: [
    CommonModule,
    InstantPayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RecentPayeeModule,
    BhimUpiPayModule
  ],
  // exports:[RecentPayeeComponent]
})
export class InstantPayModule { }
