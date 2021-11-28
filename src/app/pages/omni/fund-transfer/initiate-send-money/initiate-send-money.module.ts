// import { RecentPayeeComponent } from './../../../common-components/recent-payee/recent-payee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiateSendMoneyRoutingModule } from './initiate-send-money-routing.module';
import { InitiateSendMoneyComponent } from './initiate-send-money.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RecentPayeeModule } from '../../recent-payee/recent-payee.module';
import { BhimUpiPayModule } from '../../bhim/bhim-upi-pay/bhim-upi-pay.module';
//import {TwoDigitDecimaNumberssDirective} from '../../../../directives/two-digit-decima-numberss.directive'


@NgModule({
  declarations: [InitiateSendMoneyComponent],
  imports: [
    CommonModule,
    InitiateSendMoneyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RecentPayeeModule,
    BhimUpiPayModule
  ],
  // exports:[RecentPayeeComponent]
})
export class InitiateSendMoneyModule { }
