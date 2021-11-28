import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackCardApplicationRoutingModule } from './track-card-application-routing.module';
import { TrackCardApplicationComponent } from './track-card-application.component';


@NgModule({
  declarations: [TrackCardApplicationComponent],
  imports: [
    CommonModule,
    TrackCardApplicationRoutingModule
  ]
})
export class TrackCardApplicationModule { }
