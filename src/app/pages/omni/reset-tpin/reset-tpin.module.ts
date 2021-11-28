import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetTpinRoutingModule } from './reset-tpin-routing.module';
import { ResetTpinComponent } from './reset-tpin.component';


@NgModule({
  declarations: [ResetTpinComponent],
  imports: [
    CommonModule,
    ResetTpinRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ResetTpinModule { }
