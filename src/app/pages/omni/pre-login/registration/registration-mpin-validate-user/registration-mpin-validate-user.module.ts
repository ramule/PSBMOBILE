import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationMpinValidateUserRoutingModule } from './registration-mpin-validate-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';
import { RegistrationMpinValidateUserComponent } from './registration-mpin-validate-user.component';


@NgModule({
  declarations: [RegistrationMpinValidateUserComponent],
  imports: [
    CommonModule,
    RegistrationMpinValidateUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ]
})
export class RegistrationMpinValidateUserModule { }
