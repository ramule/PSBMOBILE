import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotTpinUserAuthenticationRoutingModule } from './forgot-tpin-user-authentication-routing.module';
import { ForgotTpinUserAuthenticationComponent } from './forgot-tpin-user-authentication.component';
import { CommonModules } from 'src/app/pages/common-ui/common.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgotTpinUserAuthenticationComponent],
  imports: [
    CommonModule,
    ForgotTpinUserAuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
  ]
})
export class ForgotTpinUserAuthenticationModule { }
