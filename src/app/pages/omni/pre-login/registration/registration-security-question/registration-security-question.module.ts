import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSecurityQuestionComponent } from './registration-security-question.component';
import {RegistrationSecurityQuestionRoutingModule} from './registration-security-question-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';


@NgModule({
  declarations: [RegistrationSecurityQuestionComponent],
  imports: [
    CommonModule,
    RegistrationSecurityQuestionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules, 
  ]
})
export class RegistrationSecurityQuestionModule { }
