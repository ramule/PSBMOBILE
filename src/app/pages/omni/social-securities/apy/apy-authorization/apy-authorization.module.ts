import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApyAuthorizationRoutingModule } from './apy-authorization-routing.module';
import { ApyAuthorizationComponent } from './apy-authorization.component';


@NgModule({
  declarations: [ApyAuthorizationComponent],
  imports: [
    CommonModule,
    ApyAuthorizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ApyAuthorizationModule { }
