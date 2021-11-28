import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSuccessComponent } from './registration-success.component';
import { RegistrationSuccessRoutingModule } from './registration-success-routing.module';
import { CommonModules } from '../../../common-ui/common.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [ RegistrationSuccessComponent ],
  imports: [
    CommonModule,
    RegistrationSuccessRoutingModule,
    SharedModule,
    CommonModules
  ]
})
export class RegistrationSuccessModule { }
