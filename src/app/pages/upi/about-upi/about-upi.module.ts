import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUpiRoutingModule } from './about-upi-routing.module';
import { AboutUpiComponent } from './about-upi.component';


@NgModule({
  declarations: [AboutUpiComponent],
  imports: [
    CommonModule,
    AboutUpiRoutingModule
  ]
})
export class AboutUpiModule { }
