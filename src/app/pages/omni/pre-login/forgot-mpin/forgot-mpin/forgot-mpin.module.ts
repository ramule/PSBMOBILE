import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotMpinRoutingModule } from './forgot-mpin-routing.module';
import { ForgotMpinComponent } from './forgot-mpin.component';


@NgModule({
  declarations: [ForgotMpinComponent],
  imports: [
    CommonModule,
    ForgotMpinRoutingModule
  ]
})
export class ForgotMpinModule { }
