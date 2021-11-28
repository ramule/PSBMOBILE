import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenDepositAccountAuthorizationRoutingModule } from './open-deposit-account-authorization-routing.module';
import { OpenDepositAccountAuthorizationComponent } from './open-deposit-account-authorization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [OpenDepositAccountAuthorizationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    OpenDepositAccountAuthorizationRoutingModule
  ]
})
export class OpenDepositAccountAuthorizationModule { }
