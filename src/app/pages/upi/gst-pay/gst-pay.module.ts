import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GstPayRoutingModule } from './gst-pay-routing.module';
import { GstPayComponent } from './gst-pay.component';


@NgModule({
  declarations: [GstPayComponent],
  imports: [
    CommonModule,
    GstPayRoutingModule
  ]
})
export class GstPayModule { }
