import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUpiIdListRoutingModule } from './pay-upi-id-list-routing.module';
import { PayUpiIdListComponent } from './pay-upi-id-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PayUpiIdListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PayUpiIdListRoutingModule
  ]
})
export class PayUpiIdListModule { }
