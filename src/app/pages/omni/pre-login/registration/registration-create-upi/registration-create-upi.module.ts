import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationCreateUpiComponent} from '../registration-create-upi/registration-create-upi.component'
import {RegistrationCreateUpiRoutingModule} from '../registration-create-upi/registration-create-upi-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';

@NgModule({
  declarations: [RegistrationCreateUpiComponent],
  imports: [
    CommonModule,
    RegistrationCreateUpiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
    
  ],
  exports:[RegistrationCreateUpiComponent]
})
export class RegistrationCreateUpiModule { }
