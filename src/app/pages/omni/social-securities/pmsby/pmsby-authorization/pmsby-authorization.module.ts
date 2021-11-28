import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsbyAuthorizationRoutingModule } from './pmsby-authorization-routing.module';
import { PmsbyAuthorizationComponent } from './pmsby-authorization.component';


@NgModule({
  declarations: [PmsbyAuthorizationComponent],
  imports: [
    CommonModule,
    PmsbyAuthorizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PmsbyAuthorizationModule { }
