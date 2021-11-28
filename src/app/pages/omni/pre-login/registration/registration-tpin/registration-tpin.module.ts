import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationTpinComponent } from './registration-tpin.component';
import {RegistrationTpinRoutingModule} from './registration-tpin-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModules } from '../../../../common-ui/common.module';


@NgModule({
  declarations: [RegistrationTpinComponent],
  imports: [
    CommonModule,
    RegistrationTpinRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModules,
  ],
  exports: [RegistrationTpinComponent]
})
export class RegistrationTpinModule { }
