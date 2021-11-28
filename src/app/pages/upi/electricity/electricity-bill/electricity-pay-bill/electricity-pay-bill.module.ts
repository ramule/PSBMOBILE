import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectricityPayBillRoutingModule } from './electricity-pay-bill-routing.module';
import { ElectricityPayBillComponent } from './electricity-pay-bill.component';


@NgModule({
  declarations: [ElectricityPayBillComponent],
  imports: [
    CommonModule,
    ElectricityPayBillRoutingModule
  ]
})
export class ElectricityPayBillModule { }
