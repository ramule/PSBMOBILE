import { SharedModule } from './../../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReissueCardAuthorizationRoutingModule } from './reissue-card-authorization-routing.module';
import { ReissueCardAuthorizationComponent } from './reissue-card-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReissueCardAuthorizationComponent],
  imports: [
    CommonModule,
    ReissueCardAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ReissueCardAuthorizationModule { }
