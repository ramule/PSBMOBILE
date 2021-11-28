import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApySuccessRoutingModule } from './apy-success-routing.module';
import { ApySuccessComponent } from './apy-success.component';


@NgModule({
  declarations: [ApySuccessComponent],
  imports: [
    CommonModule,
    ApySuccessRoutingModule
  ]
})
export class ApySuccessModule { }
