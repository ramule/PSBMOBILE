import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { PositivePaySuccessRoutingModule } from './positive-pay-success-routing.module';
import { PositivePaySuccessComponent } from './positive-pay-success.component';


@NgModule({
  declarations: [PositivePaySuccessComponent],
  imports: [
    CommonModule,
    PositivePaySuccessRoutingModule,
    SharedModule
  ]
})
export class PositivePaySuccessModule { }
