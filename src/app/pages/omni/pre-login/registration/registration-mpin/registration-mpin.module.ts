import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationMpinComponent } from './registration-mpin.component';
import {  RegistrationMpinRoutingModule } from './registration-mpin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';


@NgModule({
  declarations: [RegistrationMpinComponent],
  imports: [
    CommonModule, 
    RegistrationMpinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules
  ],
  exports:[RegistrationMpinComponent  ]

})
export class RegistrationMpinModule { }
