import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveMandateDeclineRoutingModule } from './approve-mandate-decline-routing.module';
import { ApproveMandateDeclineComponent } from './approve-mandate-decline.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ApproveMandateDeclineComponent],
  imports: [
    CommonModule,
    SharedModule,
    ApproveMandateDeclineRoutingModule
  ]
})
export class ApproveMandateDeclineModule { }
