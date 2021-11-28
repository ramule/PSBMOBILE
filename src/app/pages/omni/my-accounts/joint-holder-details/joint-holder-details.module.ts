import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JointHolderDetailsRoutingModule } from './joint-holder-details-routing.module';
import { JointHolderDetailsComponent } from './joint-holder-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JointHolderDetailsComponent],
  imports: [
    CommonModule,
    JointHolderDetailsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JointHolderDetailsModule { }
