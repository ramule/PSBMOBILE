import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratePinAuthorizationRoutingModule } from './generate-pin-authorization-routing.module';
import { GeneratePinAuthorizationComponent } from './generate-pin-authorization.component';


@NgModule({
  declarations: [GeneratePinAuthorizationComponent],
  imports: [
    CommonModule,
    GeneratePinAuthorizationRoutingModule
  ]
})
export class GeneratePinAuthorizationModule { }
