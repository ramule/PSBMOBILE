import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetNewTpinRoutingModule } from './reset-new-tpin-routing.module';
import { ResetNewTpinComponent } from './reset-new-tpin.component';


@NgModule({
  declarations: [ResetNewTpinComponent],
  imports: [
    CommonModule,
    ResetNewTpinRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ResetNewTpinModule { }
