import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlistCardAuthorizationRoutingModule } from './hotlist-card-authorization-routing.module';
import { HotlistCardAuthorizationComponent } from './hotlist-card-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HotlistCardAuthorizationComponent],
  imports: [
    CommonModule,
    HotlistCardAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HotlistCardAuthorizationModule { }
