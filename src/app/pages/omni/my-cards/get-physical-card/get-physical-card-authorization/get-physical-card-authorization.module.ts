import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetPhysicalCardAuthorizationRoutingModule } from './get-physical-card-authorization-routing.module';
import { GetPhysicalCardAuthorizationComponent } from './get-physical-card-authorization.component';


@NgModule({
  declarations: [GetPhysicalCardAuthorizationComponent],
  imports: [
    CommonModule,
    GetPhysicalCardAuthorizationRoutingModule
  ]
})
export class GetPhysicalCardAuthorizationModule { }
