import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotTpinRoutingModule } from './forgot-tpin-routing.module';
import { ForgotTpinComponent } from './forgot-tpin.component';


@NgModule({
  declarations: [ForgotTpinComponent],
  imports: [
    CommonModule,
    ForgotTpinRoutingModule
  ]
})
export class ForgotTpinModule { }
