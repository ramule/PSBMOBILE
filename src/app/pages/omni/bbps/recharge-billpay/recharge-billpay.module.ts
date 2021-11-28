import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RechargeBillpayRoutingModule } from './recharge-billpay-routing.module';
import { RechargeBillpayComponent } from './recharge-billpay.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [RechargeBillpayComponent],
  imports: [
    CommonModule,
    RechargeBillpayRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
  ]
})
export class RechargeBillpayModule { }
