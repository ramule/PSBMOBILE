import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetPhysicalCardSuccessRoutingModule } from './get-physical-card-success-routing.module';
import { GetPhysicalCardSuccessComponent } from './get-physical-card-success.component';


@NgModule({
  declarations: [GetPhysicalCardSuccessComponent],
  imports: [
    CommonModule,
    GetPhysicalCardSuccessRoutingModule
  ]
})
export class GetPhysicalCardSuccessModule { }
