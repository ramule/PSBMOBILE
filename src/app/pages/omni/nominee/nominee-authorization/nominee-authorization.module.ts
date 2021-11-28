import { SharedModule } from './../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NomineeAuthorizationRoutingModule } from './nominee-authorization-routing.module';
import { NomineeAuthorizationComponent } from './nominee-authorization.component';


@NgModule({
  declarations: [NomineeAuthorizationComponent],
  imports: [
    CommonModule,
    NomineeAuthorizationRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NomineeAuthorizationModule { }
