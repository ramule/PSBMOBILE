import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationValidateRegComponent } from './registration-validate-reg-details.component';
import { RegistrationValidateRegRoutingModule } from './registration-validate-reg-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';


@NgModule({
  declarations: [RegistrationValidateRegComponent],
  imports: [
    CommonModule,
    RegistrationValidateRegRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
  ],
  exports:[
    RegistrationValidateRegComponent
  ]
})
export class RegistrationValidateRegModule { }
