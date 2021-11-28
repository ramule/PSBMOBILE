import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseRDAuthorizationRoutingModule } from './close-rd-authorization-routing.module';
import { CloseRDAuthorizationComponent } from '../close-rd-authorization/close-rd-authorization.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CloseRDAuthorizationComponent],
  imports: [
    CommonModule,
    CloseRDAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CloseRDAuthorizationModule { }
