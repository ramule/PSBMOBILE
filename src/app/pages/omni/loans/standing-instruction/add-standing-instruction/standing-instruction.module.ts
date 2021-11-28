import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingInstructionRoutingModule } from './standing-instruction-routing.module';
import { StandingInstructionComponent } from './standing-instruction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [StandingInstructionComponent],
  imports: [
    CommonModule,
    StandingInstructionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class StandingInstructionModule { }
