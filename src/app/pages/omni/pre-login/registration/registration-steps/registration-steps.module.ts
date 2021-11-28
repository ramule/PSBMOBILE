import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationStepsRoutingModule } from './registration-steps-routing.module';
import { RegistrationStepsComponent } from './registration-steps.component';
import {RegistrationCustDetailsModule} from '../registration-cust-details/registration-cust-details.module';
import  {RegistrationValidateRegModule}from '../registration-validate-reg-details/registration-validate-reg-details.module';
import  {RegistrationUsernameModule} from '../registration-username/registration-username.module';
import {RegistrationTpinModule} from '../registration-tpin/registration-tpin.module';
import {RegistrationMpinModule} from '../registration-mpin/registration-mpin.module';
import {RegistrationCreateUpiModule} from '../registration-create-upi/registration-create-upi.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TermsConditonsModule } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.module';
@NgModule({
  declarations: [RegistrationStepsComponent ],
  imports: [
    
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RegistrationStepsRoutingModule,
    RegistrationCustDetailsModule,
    RegistrationValidateRegModule,
    RegistrationUsernameModule,
    RegistrationTpinModule,
    RegistrationMpinModule,
    RegistrationCreateUpiModule,
    TermsConditonsModule
  ]
})
export class RegistrationStepsModule { }
