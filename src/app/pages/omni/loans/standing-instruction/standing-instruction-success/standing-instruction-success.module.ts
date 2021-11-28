import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingInstructionSuccessRoutingModule } from './standing-instruction-success-routing.module';
import { StandingInstructionSuccessComponent } from './standing-instruction-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StandingInstructionSuccessComponent],
  imports: [
    CommonModule,
    StandingInstructionSuccessRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StandingInstructionSuccessModule { }
