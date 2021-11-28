import { SharedModule } from '../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyStandingInstructionRoutingModule } from './modify-standing-instruction-routing.module';
import { ModifyStandingInstructionComponent } from './modify-standing-instruction.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [ModifyStandingInstructionComponent],
  imports: [
    CommonModule,
    ModifyStandingInstructionRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class ModifyStandingInstructionModule { }
