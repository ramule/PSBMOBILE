import { SharedModule } from './../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmjjbyAuthorizationRoutingModule } from './pmjjby-authorization-routing.module';
import { PmjjbyAuthorizationComponent } from './pmjjby-authorization.component';


@NgModule({
  declarations: [PmjjbyAuthorizationComponent],
  imports: [
    CommonModule,
    PmjjbyAuthorizationRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PmjjbyAuthorizationModule { }
