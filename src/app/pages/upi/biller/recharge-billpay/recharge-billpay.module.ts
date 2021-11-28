import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeBillpayRoutingModule } from './recharge-billpay-routing.module';
import { RechargeBillpayComponent } from './recharge-billpay.component';


@NgModule({
  declarations: [RechargeBillpayComponent],
  imports: [
    CommonModule,
    RechargeBillpayRoutingModule
  ]
})
export class RechargeBillpayModule { }
