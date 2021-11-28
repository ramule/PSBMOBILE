import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePinSuccessRoutingModule } from './generate-pin-success-routing.module';
import { GeneratePinSuccessComponent } from './generate-pin-success.component';


@NgModule({
  declarations: [GeneratePinSuccessComponent],
  imports: [
    CommonModule,
    GeneratePinSuccessRoutingModule
  ]
})
export class GeneratePinSuccessModule { }
