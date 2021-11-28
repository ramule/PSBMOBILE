import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionTimeoutRoutingModule } from './session-timeout-routing.module';
import { SessionTimeoutComponent } from './session-timeout.component';


@NgModule({
  declarations: [SessionTimeoutComponent],
  imports: [
    CommonModule,
    SessionTimeoutRoutingModule
  ]
})
export class SessionTimeoutModule { }
