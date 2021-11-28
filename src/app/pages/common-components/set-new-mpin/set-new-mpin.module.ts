import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetNewMpinRoutingModule } from './set-new-mpin-routing.module';
import { SetNewMpinComponent } from './set-new-mpin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';



@NgModule({
  declarations: [SetNewMpinComponent],
  imports: [
    CommonModule,
    SetNewMpinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class SetNewMpinModule { }