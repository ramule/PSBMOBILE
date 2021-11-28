import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingInstructionViewRoutingModule } from './standing-instruction-view-routing.module';
import { StandingInstructionViewComponent } from './standing-instruction-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StandingInstructionViewComponent
  ],
  imports: [
    CommonModule,
    StandingInstructionViewRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StandingInstructionViewModule { }
