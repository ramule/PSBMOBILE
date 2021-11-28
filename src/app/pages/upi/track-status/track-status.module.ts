import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackStatusRoutingModule } from './track-status-routing.module';
import { TrackStatusComponent } from './track-status.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModules } from '../../common-ui/common.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TrackStatusComponent],
  imports: [
    CommonModule,
    TrackStatusRoutingModule,
    SharedModule,
    CommonModules,
    FormsModule
  ]
})
export class TrackStatusModule { }
