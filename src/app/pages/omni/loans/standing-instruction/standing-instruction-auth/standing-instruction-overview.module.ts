import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingInstructionOverviewRoutingModule } from './standing-instruction-overview-routing.module';
import { StandingInstructionOverviewComponent } from './standing-instruction-overview.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [StandingInstructionOverviewComponent],
  imports: [
    CommonModule,
    StandingInstructionOverviewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StandingInstructionOverviewModule { }
