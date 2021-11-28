import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillPayRoutingModule } from './bill-pay-routing.module';
import { BillPayComponent } from './bill-pay.component';
import {BillTypeModule} from '../bill-type/bill-type.module'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BillPayComponent],
  imports: [
    CommonModule,
    BillPayRoutingModule,
    BillTypeModule,
    SharedModule
  ]
})
export class BillPayModule { }
