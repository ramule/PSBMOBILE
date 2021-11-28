import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotMpinMobRoutingModule } from './forgot-mpin-mob-routing.module';
import { ForgotMpinMobComponent } from './forgot-mpin-mob.component';


@NgModule({
  declarations: [ForgotMpinMobComponent],
  imports: [
    CommonModule,
    ForgotMpinMobRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForgotMpinMobModule { }
