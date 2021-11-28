import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonRegisterRoutingModule } from './non-register-routing.module';
import { NonRegisterComponent } from './non-register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModules } from '../../../common-ui/common.module';


@NgModule({
  declarations: [NonRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NonRegisterRoutingModule,
    SharedModule,
    CommonModules
  ],
  exports:[
    NonRegisterComponent
,
  ]
})
export class NonRegisterModule { }
