import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenRdAccountAuthorizationRoutingModule } from './open-rd-account-authorization-routing.module';
import { OpenRdAccountAuthorizationComponent } from './open-rd-account-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OpenRdAccountAuthorizationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OpenRdAccountAuthorizationRoutingModule
  ]
})
export class OpenRdAccountAuthorizationModule { }
