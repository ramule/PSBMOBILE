import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationCustDetailsComponent } from './registration-cust-details.component';
import {RegistrationCustDetailsRoutingModule} from './registration-cust-details-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';
import { TermsConditonsModule } from 'src/app/pages/common-ui/terms-conditons/terms-conditons.module';

@NgModule({
  declarations: [RegistrationCustDetailsComponent],
  imports: [
    CommonModule, 
    RegistrationCustDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    TermsConditonsModule
  ],
  exports: [RegistrationCustDetailsComponent]
})
export class RegistrationCustDetailsModule { }
