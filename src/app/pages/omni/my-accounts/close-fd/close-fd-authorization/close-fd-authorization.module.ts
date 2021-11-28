import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseFDAuthorizationRoutingModule } from './close-fd-authorization-routing.module';
import { CloseFDAuthorizationComponent } from '../close-fd-authorization/close-fd-authorization.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CloseFDAuthorizationComponent],
  imports: [
    CommonModule,
    CloseFDAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CloseFDAuthorizationModule { }
