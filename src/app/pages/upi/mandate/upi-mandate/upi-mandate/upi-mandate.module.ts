import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpiMandateRoutingModule } from './upi-mandate-routing.module';
import { UpiMandateComponent } from './upi-mandate.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UpiMandateComponent],
  imports: [
    CommonModule,
    SharedModule,
    UpiMandateRoutingModule
  ]
})
export class UpiMandateModule { }
