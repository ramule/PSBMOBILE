import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingInstructionListRoutingModule } from './standing-instruction-list-routing.module';
import { StandingInstructionListComponent } from './standing-instruction-list.component';


@NgModule({
  declarations: [StandingInstructionListComponent],
  imports: [
    CommonModule,
    StandingInstructionListRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StandingInstructionListModule { }
