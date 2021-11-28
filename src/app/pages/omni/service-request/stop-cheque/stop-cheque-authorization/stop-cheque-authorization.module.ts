import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopChequeAuthorizationRoutingModule } from './stop-cheque-authorization-routing.module';
import { StopChequeAuthorizationComponent } from './stop-cheque-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [StopChequeAuthorizationComponent],
  imports: [
    CommonModule,
    StopChequeAuthorizationRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StopChequeAuthorizationModule { }
