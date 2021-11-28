import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPayeeAuthorizationRoutingModule } from './add-payee-authorization-routing.module';
import { AddPayeeAuthorizationComponent } from './add-payee-authorization.component';


@NgModule({
  declarations: [AddPayeeAuthorizationComponent],
  imports: [
    CommonModule,
    AddPayeeAuthorizationRoutingModule
  ]
})
export class AddPayeeAuthorizationModule { }
